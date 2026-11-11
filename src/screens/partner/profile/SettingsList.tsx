import styles from './SettingsList.module.css';

const SETTINGS_ROWS = [
  { label: 'Disciplines', value: 'Hair · Makeup' },
  { label: 'Notifications', value: 'Push, Email' },
  { label: 'Payouts', value: 'Weekly, Fri' },
];

export function SettingsList() {
  return (
    <div className={styles.list}>
      {SETTINGS_ROWS.map((row) => (
        <button key={row.label} type="button" className={styles.row} onClick={() => undefined}>
          <span className={styles.label}>{row.label}</span>
          <span className={styles.value}>{row.value}</span>
        </button>
      ))}
    </div>
  );
}
