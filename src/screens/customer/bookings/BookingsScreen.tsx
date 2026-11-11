import { useBookings } from '../../../hooks/useBookings';
import { useProviders } from '../../../hooks/useProviders';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { ErrorState } from '../../../components/common/ErrorState';
import { EmptyState } from '../../../components/common/EmptyState';
import { BookingCard } from './BookingCard';
import { BookingCardSkeleton } from './BookingCardSkeleton';
import styles from './BookingsScreen.module.css';

export function BookingsScreen() {
  const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useBookings();
  const { data: providers, isLoading: providersLoading, error: providersError } = useProviders();

  const isLoading = bookingsLoading || providersLoading;
  const error = bookingsError ?? providersError;

  const zoneNameByProviderId = new Map((providers ?? []).map((p) => [p.id, p.zoneName]));

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <Eyebrow>My Bookings</Eyebrow>
        {!isLoading && !error ? (
          <span className={styles.count}>{bookings?.length ?? 0}</span>
        ) : null}
      </div>

      {isLoading ? (
        <div className={styles.list}>
          <BookingCardSkeleton />
          <BookingCardSkeleton />
          <BookingCardSkeleton />
        </div>
      ) : error ? (
        <ErrorState message="Unable to load your bookings." />
      ) : bookings && bookings.length > 0 ? (
        <div className={styles.list}>
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              zoneName={zoneNameByProviderId.get(booking.providerId) ?? 'Unassigned zone'}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No Bookings" message="You have no upcoming bookings scheduled." />
      )}
    </div>
  );
}
