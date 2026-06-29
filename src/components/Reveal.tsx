'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

/*
  One restrained, orchestrated reveal — soft scroll fade-up (§5.5). Honors
  prefers-reduced-motion by rendering statically.
*/
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li';
}) {
  const reduce = useReducedMotion();
  const MotionTag = as === 'section' ? motion.section : as === 'li' ? motion.li : motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
