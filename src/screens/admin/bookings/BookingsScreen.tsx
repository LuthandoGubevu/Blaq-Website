import { useState } from 'react';
import { useBookings } from '../../../hooks/useBookings';
import { useUpdateBookingStatus } from '../../../hooks/useUpdateBookingStatus';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { DataTable } from '../../../components/common/DataTable';
import type { DataTableColumn } from '../../../components/common/DataTable';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { ErrorState } from '../../../components/common/ErrorState';
import { EmptyState } from '../../../components/common/EmptyState';
import { Skeleton } from '../../../components/common/Skeleton';
import { StatusPickerModal } from './StatusPickerModal';
import { formatDateTimeLine, formatDurationShort } from '../../../utils/formatDate';
import type { Booking, BookingStatus } from '../../../types';
import styles from './BookingsScreen.module.css';

export function BookingsScreen() {
  const { data: bookings, isLoading, error } = useBookings();
  const { mutate } = useUpdateBookingStatus();
  const [overrides, setOverrides] = useState<Record<string, BookingStatus>>({});
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);

  const resolvedBookings = (bookings ?? []).map((booking) => ({
    ...booking,
    status: overrides[booking.id] ?? booking.status,
  }));

  const editingBooking = resolvedBookings.find((b) => b.id === editingBookingId) ?? null;

  async function handleSelectStatus(status: BookingStatus) {
    if (!editingBookingId) return;
    const updated = await mutate(editingBookingId, status);
    if (updated) {
      setOverrides((prev) => ({ ...prev, [editingBookingId]: updated.status }));
    }
    setEditingBookingId(null);
  }

  const columns: DataTableColumn<Booking>[] = [
    { key: 'customer', header: 'Customer', render: (b) => b.customerName },
    { key: 'provider', header: 'Provider', render: (b) => b.providerName },
    { key: 'service', header: 'Service', render: (b) => b.serviceName },
    { key: 'zone', header: 'Zone', render: (b) => b.zoneName },
    { key: 'when', header: 'When', render: (b) => formatDateTimeLine(b.startsAt) },
    { key: 'duration', header: 'Duration', render: (b) => formatDurationShort(b.durationMinutes) },
    {
      key: 'status',
      header: 'Status',
      render: (b) => <StatusBadge status={b.status} onClick={() => setEditingBookingId(b.id)} />,
    },
  ];

  return (
    <div className={styles.screen}>
      <Eyebrow>Bookings</Eyebrow>

      {error ? (
        <ErrorState message="Unable to load bookings." />
      ) : isLoading ? (
        <Skeleton height={200} />
      ) : resolvedBookings.length === 0 ? (
        <EmptyState title="No Bookings" message="No bookings have been made yet." />
      ) : (
        <DataTable columns={columns} rows={resolvedBookings} getRowKey={(b) => b.id} />
      )}

      <StatusPickerModal
        isOpen={editingBooking !== null}
        onClose={() => setEditingBookingId(null)}
        status={editingBooking?.status ?? 'pending'}
        onSelect={handleSelectStatus}
      />
    </div>
  );
}
