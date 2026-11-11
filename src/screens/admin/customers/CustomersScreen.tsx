import { useCustomers } from '../../../hooks/useCustomers';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { DataTable } from '../../../components/common/DataTable';
import type { DataTableColumn } from '../../../components/common/DataTable';
import { ErrorState } from '../../../components/common/ErrorState';
import { EmptyState } from '../../../components/common/EmptyState';
import { Skeleton } from '../../../components/common/Skeleton';
import type { Customer } from '../../../types';
import styles from './CustomersScreen.module.css';

const COLUMNS: DataTableColumn<Customer>[] = [
  { key: 'name', header: 'Name', render: (c) => c.name },
  { key: 'email', header: 'Email', render: (c) => c.email },
  { key: 'code', header: 'Customer Code', render: (c) => c.customerCode },
  { key: 'credits', header: 'Credits', render: (c) => c.creditsBalance, align: 'right' },
];

export function CustomersScreen() {
  const { data: customers, isLoading, error } = useCustomers();

  return (
    <div className={styles.screen}>
      <Eyebrow>Customers</Eyebrow>

      {error ? (
        <ErrorState message="Unable to load customers." />
      ) : isLoading ? (
        <Skeleton height={200} />
      ) : !customers || customers.length === 0 ? (
        <EmptyState title="No Customers" message="No customers have signed up yet." />
      ) : (
        <DataTable columns={COLUMNS} rows={customers} getRowKey={(c) => c.id} />
      )}
    </div>
  );
}
