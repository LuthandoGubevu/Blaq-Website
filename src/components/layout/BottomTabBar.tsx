import type { ComponentType } from 'react';
import { NavLink } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';
import type { UserRole } from '../../types';
import type { IconProps } from '../icons/IconProps';
import { CalendarIcon } from '../icons/CalendarIcon';
import { MapPinIcon } from '../icons/MapPinIcon';
import { PersonIcon } from '../icons/PersonIcon';
import { SearchIcon } from '../icons/SearchIcon';
import styles from './BottomTabBar.module.css';

interface Tab {
  to: string;
  label: string;
  Icon: ComponentType<IconProps>;
}

const TABS_BY_ROLE: Partial<Record<UserRole, Tab[]>> = {
  customer: [
    { to: '/customer/discover', label: 'Discover', Icon: SearchIcon },
    { to: '/customer/bookings', label: 'Bookings', Icon: CalendarIcon },
    { to: '/customer/profile', label: 'Profile', Icon: PersonIcon },
  ],
  partner: [
    { to: '/partner/schedule', label: 'Schedule', Icon: CalendarIcon },
    { to: '/partner/workspace', label: 'Workspace', Icon: MapPinIcon },
    { to: '/partner/profile', label: 'Profile', Icon: PersonIcon },
  ],
};

export function BottomTabBar() {
  const { state } = useSession();
  const tabs = state.status === 'signedIn' ? (TABS_BY_ROLE[state.user.role] ?? []) : [];

  return (
    <nav className={styles.tabBar} aria-label="Primary">
      <div className={styles.inner}>
        {tabs.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${styles.tab} ${isActive ? styles.active : ''}`}
          >
            <Icon aria-hidden />
            <span className={styles.label}>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
