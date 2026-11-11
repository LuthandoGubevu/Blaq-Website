import styles from './SettingsList.module.css';

interface SettingsRow {
  label: string;
  value: string;
}

export function SettingsList({ rows }: { rows: SettingsRow[] }) {
  return (
    <div className={styles.list}>
      {rows.map((row) => (
        <button key={row.label} type="button" className={styles.row} onClick={() => undefined}>
          <span className={styles.label}>{row.label}</span>
          <span className={styles.value}>{row.value}</span>
        </button>
      ))}
    </div>
  );
}
