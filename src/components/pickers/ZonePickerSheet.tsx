import type { Zone } from '../../types';
import { BottomSheet } from '../common/BottomSheet';
import { PickerOptionRow } from './PickerOptionRow';

interface ZonePickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  zones: Zone[];
  selectedZoneId: string | null;
  onSelect: (zone: Zone) => void;
}

export function ZonePickerSheet({
  isOpen,
  onClose,
  zones,
  selectedZoneId,
  onSelect,
}: ZonePickerSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select Zone">
      <div role="listbox" aria-label="Select zone">
        {zones.map((zone) => (
          <PickerOptionRow
            key={zone.id}
            label={zone.name}
            subLabel={`${zone.seatsAvailable} seat${zone.seatsAvailable === 1 ? '' : 's'} available`}
            isSelected={zone.id === selectedZoneId}
            onSelect={() => onSelect(zone)}
          />
        ))}
      </div>
    </BottomSheet>
  );
}
