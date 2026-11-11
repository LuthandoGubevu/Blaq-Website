import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomTabBar } from './BottomTabBar';
import styles from './AppShell.module.css';

export function AppShell() {
  return (
    <div className={styles.shell}>
      <Header />
      <main className={styles.scrollRegion}>
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
