/**
 * PAGE INTERNATIONAL — ENTERPRISE IN-MEMORY RATE LIMITER & PRIVACY SHIELD
 * Features:
 *  - Sliding-window counter with automatic LRU capacity eviction (Max 50,000 keys)
 *  - Dual-keying (IP address + targeted account identifier)
 *  - Per-Reference-ID lockout (10 failed phone suffix attempts locks quotation/order for 30 min)
 *  - Clean async API adaptable to distributed stores (Redis / Upstash)
 */

interface RateLimitRecord {
  timestamps: number[];
  lastAccessed: number;
}

interface LockoutRecord {
  failedAttempts: number;
  lockedUntil: number;
  lastAccessed: number;
}

const MAX_KEYS = 50_000;
const rateLimitStore = new Map<string, RateLimitRecord>();
const lockoutStore = new Map<string, LockoutRecord>();

/**
 * Enforces LRU size cap by evicting oldest accessed keys if map exceeds MAX_KEYS
 */
function evictOldestIfNeeded<K, V extends { lastAccessed: number }>(map: Map<K, V>) {
  if (map.size <= MAX_KEYS) return;
  let oldestKey: K | null = null;
  let oldestTime = Infinity;

  for (const [key, record] of map.entries()) {
    if (record.lastAccessed < oldestTime) {
      oldestTime = record.lastAccessed;
      oldestKey = key;
    }
  }

  if (oldestKey !== null) {
    map.delete(oldestKey);
  }
}

/**
 * Evaluates whether a request is allowed under a sliding-window rate limit.
 *
 * @param key Unique rate limit key (e.g. `auth:login:ip:127.0.0.1` or `auth:login:acc:test@domain.com`)
 * @param maxRequests Maximum requests allowed in the time window
 * @param windowMs Duration of the window in milliseconds
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): {
  allowed: boolean;
  remaining: number;
  resetAfterMs: number;
  retryAfterSec: number;
} {
  const now = Date.now();
  const windowStart = now - windowMs;

  let record = rateLimitStore.get(key);
  if (!record) {
    record = { timestamps: [], lastAccessed: now };
    rateLimitStore.set(key, record);
    evictOldestIfNeeded(rateLimitStore);
  }

  // Remove timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);
  record.lastAccessed = now;

  const currentCount = record.timestamps.length;
  if (currentCount >= maxRequests) {
    const oldest = record.timestamps[0] || now;
    const resetAfterMs = Math.max(0, oldest + windowMs - now);
    const retryAfterSec = Math.max(1, Math.ceil(resetAfterMs / 1000));
    return {
      allowed: false,
      remaining: 0,
      resetAfterMs,
      retryAfterSec,
    };
  }

  record.timestamps.push(now);
  const remaining = Math.max(0, maxRequests - record.timestamps.length);
  return {
    allowed: true,
    remaining,
    resetAfterMs: windowMs,
    retryAfterSec: 0,
  };
}

/**
 * Resets/clears rate limit timestamps for a specific key (e.g. on successful login)
 */
export function clearRateLimit(key: string) {
  rateLimitStore.delete(key);
}

/**
 * Checks if a specific order or quotation reference is currently locked due to
 * repeated incorrect phone suffix attempts.
 */
export function checkReferenceLockout(referenceId: string): {
  locked: boolean;
  lockedUntil: number;
  remainingSeconds: number;
} {
  const normRef = referenceId.trim().toLowerCase();
  const now = Date.now();
  const record = lockoutStore.get(normRef);

  if (!record) {
    return { locked: false, lockedUntil: 0, remainingSeconds: 0 };
  }

  record.lastAccessed = now;

  if (record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { locked: true, lockedUntil: record.lockedUntil, remainingSeconds };
  }

  // Lock expired
  if (record.lockedUntil > 0 && record.lockedUntil <= now) {
    lockoutStore.delete(normRef);
  }

  return { locked: false, lockedUntil: 0, remainingSeconds: 0 };
}

/**
 * Records a failed verification attempt against a reference ID.
 * If failed attempts reach `threshold` (default 10), locks the reference globally for `lockoutDurationMs` (default 30 mins).
 */
export function recordFailedReferenceAttempt(
  referenceId: string,
  threshold: number = 10,
  lockoutDurationMs: number = 30 * 60 * 1000
): { locked: boolean; failedAttempts: number; remainingAttempts: number; retryAfterSec: number } {
  const normRef = referenceId.trim().toLowerCase();
  const now = Date.now();

  let record = lockoutStore.get(normRef);
  if (!record) {
    record = { failedAttempts: 0, lockedUntil: 0, lastAccessed: now };
    lockoutStore.set(normRef, record);
    evictOldestIfNeeded(lockoutStore);
  }

  record.lastAccessed = now;

  // If already locked, calculate remaining
  if (record.lockedUntil > now) {
    return {
      locked: true,
      failedAttempts: record.failedAttempts,
      remainingAttempts: 0,
      retryAfterSec: Math.ceil((record.lockedUntil - now) / 1000),
    };
  }

  record.failedAttempts++;

  if (record.failedAttempts >= threshold) {
    record.lockedUntil = now + lockoutDurationMs;
    const retryAfterSec = Math.ceil(lockoutDurationMs / 1000);
    return {
      locked: true,
      failedAttempts: record.failedAttempts,
      remainingAttempts: 0,
      retryAfterSec,
    };
  }

  return {
    locked: false,
    failedAttempts: record.failedAttempts,
    remainingAttempts: threshold - record.failedAttempts,
    retryAfterSec: 0,
  };
}

/**
 * Clears failed attempts upon a successful phone verification match
 */
export function clearReferenceLockout(referenceId: string) {
  lockoutStore.delete(referenceId.trim().toLowerCase());
}

/**
 * Utility for tests: completely resets in-memory rate limiting and lockout state
 */
export function resetAllRateLimits() {
  rateLimitStore.clear();
  lockoutStore.clear();
}
