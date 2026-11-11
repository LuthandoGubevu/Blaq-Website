import { Modal } from '../../../components/common/Modal';
import { OptionRow } from '../../../components/common/OptionRow';

interface VisibilityPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPublic: boolean;
  onSelect: (isPublic: boolean) => void;
}

export function VisibilityPickerModal({
  isOpen,
  onClose,
  isPublic,
  onSelect,
}: VisibilityPickerModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Set Visibility">
      <div role="listbox" aria-label="Set visibility">
        <OptionRow label="Public" isSelected={isPublic} onSelect={() => onSelect(true)} />
        <OptionRow label="Hidden" isSelected={!isPublic} onSelect={() => onSelect(false)} />
      </div>
    </Modal>
  );
}
