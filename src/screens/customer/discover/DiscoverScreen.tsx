import { BookingProvider, useBooking } from '../../../context/BookingContext';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { BookingForm } from './BookingForm';
import { BookingConfirmationPanel } from './BookingConfirmationPanel';
import styles from './DiscoverScreen.module.css';

function DiscoverScreenContent() {
  const { state } = useBooking();

  return (
    <div className={styles.screen}>
      <Eyebrow>Discover Providers</Eyebrow>
      <p className={styles.intro}>Browse BLAQ service providers and book your next appointment.</p>
      {state.phase === 'confirmed' ? (
        <BookingConfirmationPanel booking={state.booking} />
      ) : (
        <BookingForm />
      )}
    </div>
  );
}

export function DiscoverScreen() {
  return (
    <BookingProvider>
      <DiscoverScreenContent />
    </BookingProvider>
  );
}
