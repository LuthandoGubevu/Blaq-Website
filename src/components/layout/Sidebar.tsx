import { NavLink } from 'react-router-dom';
import { useSignOut } from '../../hooks/useSignOut';
import { Eyebrow } from '../common/Eyebrow';
import { GridIcon } from '../icons/GridIcon';
import { BriefcaseIcon } from '../icons/BriefcaseIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { CalendarIcon } from '../icons/CalendarIcon';
import { MapPinIcon } from '../icons/MapPinIcon';
import { SignOutIcon } from '../icons/SignOutIcon';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', Icon: GridIcon },
  { to: '/admin/providers', label: 'Providers', Icon: BriefcaseIcon },
  { to: '/admin/customers', label: 'Customers', Icon: UsersIcon },
  { to: '/admin/bookings', label: 'Bookings', Icon: CalendarIcon },
  { to: '/admin/zones', label: 'Zones', Icon: MapPinIcon },
];

export function Sidebar() {
  const handleSignOut = useSignOut();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <p className={styles.wordmark}>BLAQ</p>
        <Eyebrow tone="gold">Admin</Eyebrow>
      </div>

      <nav className={styles.nav} aria-label="Primary">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
          >
            <Icon size={19} aria-hidden />
            <span className={styles.linkLabel}>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <button type="button" className={styles.signOutButton} onClick={handleSignOut}>
          <SignOutIcon size={19} aria-hidden />
          <span className={styles.linkLabel}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
