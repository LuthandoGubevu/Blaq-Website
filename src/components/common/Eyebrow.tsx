import type { ElementType, ReactNode } from 'react';
import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  tone?: 'muted' | 'gold';
  as?: ElementType;
  className?: string;
  id?: string;
}

export function Eyebrow({
  children,
  tone = 'muted',
  as: Tag = 'span',
  className,
  id,
}: EyebrowProps) {
  const classes = [styles.eyebrow, tone === 'gold' ? styles.gold : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
}
