import type { Provider } from '../../types';
import { BottomSheet } from '../common/BottomSheet';
import { PickerOptionRow } from './PickerOptionRow';

interface ProviderPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  providers: Provider[];
  selectedProviderId: string | null;
  onSelect: (provider: Provider) => void;
}

export function ProviderPickerSheet({
  isOpen,
  onClose,
  providers,
  selectedProviderId,
  onSelect,
}: ProviderPickerSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select Provider">
      <div role="listbox" aria-label="Select provider">
        {providers.map((provider) => (
          <PickerOptionRow
            key={provider.id}
            label={provider.name}
            subLabel={`${provider.discipline} · ${provider.zoneName}`}
            isSelected={provider.id === selectedProviderId}
            onSelect={() => onSelect(provider)}
          />
        ))}
      </div>
    </BottomSheet>
  );
}
