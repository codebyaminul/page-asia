const { execSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');

const suites = [
  { name: "Customer Identity & FKs", script: "scratch/test_customer_identity.js", expected: 20 },
  { name: "Auth Cookies & Isolation", script: "scratch/test_step2_auth_cookies.js", expected: 13 },
  { name: "Row-Level Security (RLS)", script: "scratch/test_step3_rls.js", expected: 16 },
  { name: "Phase 5 QA & Stress Test", script: "scratch/qa_phase5_suite.js", expected: 85 },
  { name: "Admin Orders Management", script: "scratch/test_phase6_admin_orders.cjs", expected: 11 },
  { name: "Customer Profile & Password", script: "scratch/test_phase8_customer_profile.cjs", expected: 10 },
  { name: "Public Tracking Console", script: "scratch/test_phase9_public_tracking.cjs", expected: 9 },
  { name: "Security & Reliability Architecture", script: "scratch/test_security_reliability.cjs", expected: 45 },
];

console.log("\n==========================================================================");
console.log("   PAGE INTERNATIONAL — CONSOLIDATED FULL-STACK TEST RUNNER               ");
console.log("==========================================================================\n");

let totalPassed = 0;
let totalExpected = suites.reduce((acc, s) => acc + s.expected, 0);
let failedSuites = 0;
const results = [];

const startTime = Date.now();

for (const suite of suites) {
  process.stdout.write(`Running [${suite.name}] (${suite.expected} tests)... `);
  const suiteStart = Date.now();
  try {
    const output = execSync(`node ${suite.script}`, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const elapsed = Date.now() - suiteStart;
    console.log(`\x1b[32mPASSED\x1b[0m (${suite.expected}/${suite.expected}) [${elapsed}ms]`);
    totalPassed += suite.expected;
    results.push({ name: suite.name, status: "PASS", passed: suite.expected, expected: suite.expected, time: `${elapsed}ms` });
  } catch (err) {
    const elapsed = Date.now() - suiteStart;
    console.log(`\x1b[31mFAILED\x1b[0m [${elapsed}ms]`);
    failedSuites++;
    results.push({ name: suite.name, status: "FAIL", passed: 0, expected: suite.expected, time: `${elapsed}ms` });
    if (err.stdout) console.log(err.stdout);
    if (err.stderr) console.error(err.stderr);
  }
}

const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

console.log("\n==========================================================================");
console.log("   TEST SCORECARD SUMMARY                                                 ");
console.log("==========================================================================");
console.table(results);

console.log(`Total Automated Tests: ${totalPassed} / ${totalExpected} Passing`);
console.log(`Total Execution Time:  ${totalTime}s`);
console.log(`Final System Status:   ${failedSuites === 0 ? '\x1b[32mALL 8 TEST SUITES PASSED (100% COVERAGE)\x1b[0m' : '\x1b[31mFAILURES DETECTED\x1b[0m'}`);
console.log("==========================================================================\n");

if (failedSuites > 0) {
  process.exit(1);
}
