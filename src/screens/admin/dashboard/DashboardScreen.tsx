import { useProviders } from '../../../hooks/useProviders';
import { useCustomers } from '../../../hooks/useCustomers';
import { useBookings } from '../../../hooks/useBookings';
import { useZones } from '../../../hooks/useZones';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { StatTile } from '../../../components/common/StatTile';
import { DataTable } from '../../../components/common/DataTable';
import type { DataTableColumn } from '../../../components/common/DataTable';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { ErrorState } from '../../../components/common/ErrorState';
import { EmptyState } from '../../../components/common/EmptyState';
import { Skeleton } from '../../../components/common/Skeleton';
import { formatDateTimeLine } from '../../../utils/formatDate';
import type { Booking } from '../../../types';
import styles from './DashboardScreen.module.css';

const RECENT_BOOKINGS_COLUMNS: DataTableColumn<Booking>[] = [
  { key: 'customer', header: 'Customer', render: (b) => b.customerName },
  { key: 'provider', header: 'Provider', render: (b) => b.providerName },
  { key: 'service', header: 'Service', render: (b) => b.serviceName },
  { key: 'when', header: 'When', render: (b) => formatDateTimeLine(b.startsAt) },
  { key: 'status', header: 'Status', render: (b) => <StatusBadge status={b.status} /> },
];

export function DashboardScreen() {
  const { data: providers, isLoading: providersLoading, error: providersError } = useProviders();
  const { data: customers, isLoading: customersLoading, error: customersError } = useCustomers();
  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useBookings();
  const { data: zones, isLoading: zonesLoading, error: zonesError } = useZones();

  const isLoading = providersLoading || customersLoading || bookingsLoading || zonesLoading;
  const error = providersError ?? customersError ?? bookingsError ?? zonesError;

  const seatsTotal = (zones ?? []).reduce((sum, zone) => sum + zone.seatsTotal, 0);
  const seatsAvailable = (zones ?? []).reduce((sum, zone) => sum + zone.seatsAvailable, 0);
  const utilization =
    seatsTotal > 0 ? Math.round(((seatsTotal - seatsAvailable) / seatsTotal) * 100) : 0;

  const recentBookings = (bookings ?? []).slice(0, 5);

  return (
    <div className={styles.screen}>
      <Eyebrow>Overview</Eyebrow>

      {error ? (
        <ErrorState message="Unable to load dashboard data." />
      ) : isLoading ? (
        <div className={styles.statRow}>
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>
      ) : (
        <div className={styles.statRow}>
          <StatTile label="Total Providers" value={providers?.length ?? 0} />
          <StatTile label="Total Customers" value={customers?.length ?? 0} />
          <StatTile label="Total Bookings" value={bookings?.length ?? 0} />
          <StatTile label="Zone Utilization" value={`${utilization}%`} />
        </div>
      )}

      <div className={styles.section}>
        <Eyebrow tone="gold">Recent Bookings</Eyebrow>
        {!error && !isLoading && recentBookings.length === 0 ? (
          <EmptyState title="No Bookings" message="No bookings have been made yet." />
        ) : !error && !isLoading ? (
          <DataTable
            columns={RECENT_BOOKINGS_COLUMNS}
            rows={recentBookings}
            getRowKey={(b) => b.id}
          />
        ) : null}
      </div>
    </div>
  );
}
