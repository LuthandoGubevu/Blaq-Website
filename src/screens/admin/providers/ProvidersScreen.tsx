import { useState } from 'react';
import { useProviders } from '../../../hooks/useProviders';
import { useUpdateProviderVisibility } from '../../../hooks/useUpdateProviderVisibility';
import { Eyebrow } from '../../../components/common/Eyebrow';
import { DataTable } from '../../../components/common/DataTable';
import type { DataTableColumn } from '../../../components/common/DataTable';
import { ErrorState } from '../../../components/common/ErrorState';
import { EmptyState } from '../../../components/common/EmptyState';
import { Skeleton } from '../../../components/common/Skeleton';
import { VisibilityBadge } from './VisibilityBadge';
import { VisibilityPickerModal } from './VisibilityPickerModal';
import type { Provider } from '../../../types';
import styles from './ProvidersScreen.module.css';

export function ProvidersScreen() {
  const { data: providers, isLoading, error } = useProviders();
  const { mutate } = useUpdateProviderVisibility();
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [editingProviderId, setEditingProviderId] = useState<string | null>(null);

  const resolvedProviders = (providers ?? []).map((provider) => ({
    ...provider,
    isPublic: overrides[provider.id] ?? provider.isPublic,
  }));

  const editingProvider = resolvedProviders.find((p) => p.id === editingProviderId) ?? null;

  async function handleSelectVisibility(isPublic: boolean) {
    if (!editingProviderId) return;
    const updated = await mutate(editingProviderId, isPublic);
    if (updated) {
      setOverrides((prev) => ({ ...prev, [editingProviderId]: updated.isPublic }));
    }
    setEditingProviderId(null);
  }

  const columns: DataTableColumn<Provider>[] = [
    { key: 'name', header: 'Name', render: (p) => p.name },
    { key: 'discipline', header: 'Discipline', render: (p) => p.discipline },
    { key: 'zone', header: 'Zone', render: (p) => p.zoneName },
    {
      key: 'visibility',
      header: 'Visibility',
      render: (p) => (
        <VisibilityBadge isPublic={p.isPublic} onClick={() => setEditingProviderId(p.id)} />
      ),
    },
  ];

  return (
    <div className={styles.screen}>
      <Eyebrow>Providers</Eyebrow>

      {error ? (
        <ErrorState message="Unable to load providers." />
      ) : isLoading ? (
        <Skeleton height={200} />
      ) : resolvedProviders.length === 0 ? (
        <EmptyState title="No Providers" message="No providers have been added yet." />
      ) : (
        <DataTable columns={columns} rows={resolvedProviders} getRowKey={(p) => p.id} />
      )}

      <VisibilityPickerModal
        isOpen={editingProvider !== null}
        onClose={() => setEditingProviderId(null)}
        isPublic={editingProvider?.isPublic ?? true}
        onSelect={handleSelectVisibility}
      />
    </div>
  );
}
