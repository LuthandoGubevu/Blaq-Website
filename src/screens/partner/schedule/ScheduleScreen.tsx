import { useAppointments } from '../../../hooks/useAppointments';
import { useZones } from '../../../hooks/useZones';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { ErrorState } from '../../../components/common/ErrorState';
import { EmptyState } from '../../../components/common/EmptyState';
import { AppointmentCard } from './AppointmentCard';
import { AppointmentCardSkeleton } from './AppointmentCardSkeleton';
import styles from './ScheduleScreen.module.css';

export function ScheduleScreen() {
  const {
    data: appointments,
    isLoading: appointmentsLoading,
    error: appointmentsError,
  } = useAppointments();
  const { data: zones, isLoading: zonesLoading, error: zonesError } = useZones();

  const isLoading = appointmentsLoading || zonesLoading;
  const error = appointmentsError ?? zonesError;

  const zoneNameById = new Map((zones ?? []).map((zone) => [zone.id, zone.name]));

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <Eyebrow>Upcoming Appointments</Eyebrow>
        {!isLoading && !error ? (
          <span className={styles.count}>{appointments?.length ?? 0}</span>
        ) : null}
      </div>

      {isLoading ? (
        <div className={styles.list}>
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
        </div>
      ) : error ? (
        <ErrorState message="Unable to load your appointments." />
      ) : appointments && appointments.length > 0 ? (
        <div className={styles.list}>
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              zoneName={zoneNameById.get(appointment.zoneId) ?? 'Unassigned zone'}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Appointments"
          message="You have no upcoming appointments scheduled."
        />
      )}
    </div>
  );
}
