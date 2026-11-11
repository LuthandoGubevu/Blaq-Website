import type { Zone } from '../../../types';
import { PickerTriggerRow } from '../../../components/pickers/PickerTriggerRow';
import { ZonePickerSheet } from '../../../components/pickers/ZonePickerSheet';

interface ZoneFieldProps {
  zones: Zone[];
  selectedZone: Zone | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (zone: Zone) => void;
}

export function ZoneField({
  zones,
  selectedZone,
  isOpen,
  onOpen,
  onClose,
  onSelect,
}: ZoneFieldProps) {
  return (
    <>
      <PickerTriggerRow
        label="Select Zone"
        placeholder="Choose your station…"
        value={selectedZone?.name ?? null}
        onClick={onOpen}
        isOpen={isOpen}
        ariaHasPopup="listbox"
        subLabel={
          selectedZone
            ? `${selectedZone.seatsAvailable} seat${selectedZone.seatsAvailable === 1 ? '' : 's'} available`
            : undefined
        }
      />
      <ZonePickerSheet
        isOpen={isOpen}
        onClose={onClose}
        zones={zones}
        selectedZoneId={selectedZone?.id ?? null}
        onSelect={onSelect}
      />
    </>
  );
}
