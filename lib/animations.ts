// ============================================================
// PAGE International — Framer Motion Animation Variants
// Subtle, purposeful industrial animations with reduced-motion respect
// ============================================================

import { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const megaMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
};

export const drawerVariants: Variants = {
  hidden: {
    x: '-100%',
    transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
  },
  visible: {
    x: 0,
    transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] },
  },
};

export const cardHoverVariants: Variants = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  hover: {
    y: -3,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};
