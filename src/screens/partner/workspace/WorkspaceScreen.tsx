import { ZoneBookingProvider, useZoneBooking } from '../../../context/ZoneBookingContext';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { ZoneReservationForm } from './ZoneReservationForm';
import { ReservationConfirmationPanel } from './ReservationConfirmationPanel';
import styles from './WorkspaceScreen.module.css';

function WorkspaceScreenContent() {
  const { state } = useZoneBooking();

  return (
    <div className={styles.screen}>
      <Eyebrow>Book BLAQ Zones</Eyebrow>
      <p className={styles.intro}>
        Reserve a physical workstation zone at the studio for your upcoming appointments.
      </p>
      {state.phase === 'confirmed' ? (
        <ReservationConfirmationPanel reservation={state.reservation} />
      ) : (
        <ZoneReservationForm />
      )}
    </div>
  );
}

export function WorkspaceScreen() {
  return (
    <ZoneBookingProvider>
      <WorkspaceScreenContent />
    </ZoneBookingProvider>
  );
}
