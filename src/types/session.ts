import type { AdminUser } from './admin';
import type { Customer } from './customer';
import type { Provider } from './provider';

export type UserRole = 'customer' | 'partner' | 'admin';

export type SessionUser =
  | { role: 'customer'; profile: Customer }
  | { role: 'partner'; profile: Provider }
  | { role: 'admin'; profile: AdminUser };

export interface RoleDisplay {
  /** Shown on the login role switch */
  label: string;
  /** Shown under the wordmark on the login screen */
  appName: string;
  /** First screen after sign-in */
  homePath: string;
}

export const ROLE_DISPLAY_MAP: Record<UserRole, RoleDisplay> = {
  customer: { label: 'Customer', appName: 'Customer Dashboard', homePath: '/customer/discover' },
  partner: { label: 'Partner', appName: 'Creative Partner App', homePath: '/partner/schedule' },
  admin: { label: 'Admin', appName: 'Admin Dashboard', homePath: '/admin/dashboard' },
};

export const USER_ROLES: UserRole[] = ['customer', 'partner', 'admin'];
