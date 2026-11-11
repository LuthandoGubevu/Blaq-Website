import type { Service } from '../../types';
import { BottomSheet } from '../common/BottomSheet';
import { PickerOptionRow } from './PickerOptionRow';
import { formatDurationShort } from '../../utils/formatDate';

interface ServicePickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  selectedServiceId: string | null;
  onSelect: (service: Service) => void;
}

export function ServicePickerSheet({
  isOpen,
  onClose,
  services,
  selectedServiceId,
  onSelect,
}: ServicePickerSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select Service">
      <div role="listbox" aria-label="Select service">
        {services.map((service) => (
          <PickerOptionRow
            key={service.id}
            label={service.name}
            subLabel={`${formatDurationShort(service.durationMinutes)} · R${service.price}`}
            isSelected={service.id === selectedServiceId}
            onSelect={() => onSelect(service)}
          />
        ))}
      </div>
    </BottomSheet>
  );
}
