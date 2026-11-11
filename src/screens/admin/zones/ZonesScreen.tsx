import { useZones } from '../../../hooks/useZones';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { DataTable } from '../../../components/common/DataTable';
import type { DataTableColumn } from '../../../components/common/DataTable';
import { ErrorState } from '../../../components/common/ErrorState';
import { EmptyState } from '../../../components/common/EmptyState';
import { Skeleton } from '../../../components/common/Skeleton';
import type { Zone } from '../../../types';
import styles from './ZonesScreen.module.css';

const COLUMNS: DataTableColumn<Zone>[] = [
  { key: 'name', header: 'Zone', render: (z) => z.name },
  { key: 'seatsTotal', header: 'Seats Total', render: (z) => z.seatsTotal, align: 'right' },
  {
    key: 'seatsAvailable',
    header: 'Seats Available',
    render: (z) => z.seatsAvailable,
    align: 'right',
  },
];

export function ZonesScreen() {
  const { data: zones, isLoading, error } = useZones();

  return (
    <div className={styles.screen}>
      <Eyebrow>Zones &amp; Facilities</Eyebrow>

      {error ? (
        <ErrorState message="Unable to load zones." />
      ) : isLoading ? (
        <Skeleton height={200} />
      ) : !zones || zones.length === 0 ? (
        <EmptyState title="No Zones" message="No zones have been configured yet." />
      ) : (
        <DataTable columns={COLUMNS} rows={zones} getRowKey={(z) => z.id} />
      )}
    </div>
  );
}
