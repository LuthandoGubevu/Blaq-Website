import { Modal } from '../../../components/common/Modal';
import { OptionRow } from '../../../components/common/OptionRow';
import { BOOKING_STATUS_OPTIONS, STATUS_DISPLAY_MAP } from '../../../types';
import type { BookingStatus } from '../../../types';

interface StatusPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: BookingStatus;
  onSelect: (status: BookingStatus) => void;
}

export function StatusPickerModal({ isOpen, onClose, status, onSelect }: StatusPickerModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Set Status">
      <div role="listbox" aria-label="Set booking status">
        {BOOKING_STATUS_OPTIONS.map((option) => (
          <OptionRow
            key={option}
            label={STATUS_DISPLAY_MAP[option].label}
            isSelected={option === status}
            onSelect={() => onSelect(option)}
          />
        ))}
      </div>
    </Modal>
  );
}
