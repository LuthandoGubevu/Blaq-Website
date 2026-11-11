import { Eyebrow } from './Eyebrow';
import styles from './StatTile.module.css';

interface StatTileProps {
  label: string;
  value: string | number;
}

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div className={styles.tile}>
      <Eyebrow>{label}</Eyebrow>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
