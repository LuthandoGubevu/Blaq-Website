import type { Provider } from '../../../types';
import { PickerTriggerRow } from '../../../components/pickers/PickerTriggerRow';
import { ProviderPickerSheet } from '../../../components/pickers/ProviderPickerSheet';

interface ProviderFieldProps {
  providers: Provider[];
  selectedProvider: Provider | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (provider: Provider) => void;
}

export function ProviderField({
  providers,
  selectedProvider,
  isOpen,
  onOpen,
  onClose,
  onSelect,
}: ProviderFieldProps) {
  return (
    <>
      <PickerTriggerRow
        label="Select Provider"
        placeholder="Choose a provider…"
        value={selectedProvider?.name ?? null}
        onClick={onOpen}
        isOpen={isOpen}
        ariaHasPopup="listbox"
        subLabel={selectedProvider ? selectedProvider.discipline : undefined}
      />
      <ProviderPickerSheet
        isOpen={isOpen}
        onClose={onClose}
        providers={providers}
        selectedProviderId={selectedProvider?.id ?? null}
        onSelect={onSelect}
      />
    </>
  );
}
