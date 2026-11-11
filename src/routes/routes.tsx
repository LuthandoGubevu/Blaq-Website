import { Navigate, Route, Routes } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { ROLE_DISPLAY_MAP } from '../types';
import { AppShell } from '../components/layout/AppShell';
import { AdminShell } from '../components/layout/AdminShell';
import { LoginScreen } from '../screens/login/LoginScreen';
import { DiscoverScreen } from '../screens/customer/discover/DiscoverScreen';
import { BookingsScreen as CustomerBookingsScreen } from '../screens/customer/bookings/BookingsScreen';
import { ProfileScreen as CustomerProfileScreen } from '../screens/customer/profile/ProfileScreen';
import { ScheduleScreen } from '../screens/partner/schedule/ScheduleScreen';
import { WorkspaceScreen } from '../screens/partner/workspace/WorkspaceScreen';
import { ProfileScreen as PartnerProfileScreen } from '../screens/partner/profile/ProfileScreen';
import { DashboardScreen } from '../screens/admin/dashboard/DashboardScreen';
import { ProvidersScreen } from '../screens/admin/providers/ProvidersScreen';
import { CustomersScreen } from '../screens/admin/customers/CustomersScreen';
import { BookingsScreen as AdminBookingsScreen } from '../screens/admin/bookings/BookingsScreen';
import { ZonesScreen } from '../screens/admin/zones/ZonesScreen';
import { ProtectedRoute } from './ProtectedRoute';

/** Unknown URLs go to the signed-in role's home screen, or to login. */
function HomeRedirect() {
  const { state } = useSession();
  const to = state.status === 'signedIn' ? ROLE_DISPLAY_MAP[state.user.role].homePath : '/login';
  return <Navigate to={to} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />

      <Route
        path="/customer"
        element={
          <ProtectedRoute allow="customer">
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="discover" element={<DiscoverScreen />} />
        <Route path="bookings" element={<CustomerBookingsScreen />} />
        <Route path="profile" element={<CustomerProfileScreen />} />
      </Route>

      <Route
        path="/partner"
        element={
          <ProtectedRoute allow="partner">
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="schedule" element={<ScheduleScreen />} />
        <Route path="workspace" element={<WorkspaceScreen />} />
        <Route path="profile" element={<PartnerProfileScreen />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute allow="admin">
            <AdminShell />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardScreen />} />
        <Route path="providers" element={<ProvidersScreen />} />
        <Route path="customers" element={<CustomersScreen />} />
        <Route path="bookings" element={<AdminBookingsScreen />} />
        <Route path="zones" element={<ZonesScreen />} />
      </Route>

      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}
