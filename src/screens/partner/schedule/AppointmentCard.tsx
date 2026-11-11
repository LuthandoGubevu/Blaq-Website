import type { Appointment } from '../../../types';
import { MapPinIcon } from '../../../components/icons/MapPinIcon';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { formatDateTimeLine, formatDurationShort } from '../../../utils/formatDate';
import styles from './AppointmentCard.module.css';

interface AppointmentCardProps {
  appointment: Appointment;
  zoneName: string;
}

export function AppointmentCard({ appointment, zoneName }: AppointmentCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.dateLine}>{formatDateTimeLine(appointment.startsAt)}</p>
      <h3 className={styles.serviceTitle}>{appointment.service}</h3>
      <p className={styles.clientLine}>
        <span className={styles.clientLabel}>Client: </span>
        <span className={styles.clientName}>{appointment.clientName}</span>
      </p>
      <p className={styles.zoneLine}>
        <MapPinIcon size={16} />
        {zoneName}
      </p>
      <hr className={styles.divider} />
      <div className={styles.footer}>
        <StatusBadge status={appointment.status} />
        <span className={styles.duration}>{formatDurationShort(appointment.durationMinutes)}</span>
      </div>
    </article>
  );
}
