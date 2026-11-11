import type { DurationOption } from '../../types';
import { DURATION_OPTIONS } from '../../types';
import { BottomSheet } from '../common/BottomSheet';
import { PickerOptionRow } from './PickerOptionRow';

interface DurationPickerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDurationId: string;
  onSelect: (duration: DurationOption) => void;
}

export function DurationPickerSheet({
  isOpen,
  onClose,
  selectedDurationId,
  onSelect,
}: DurationPickerSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select Duration">
      <div role="listbox" aria-label="Select duration">
        {DURATION_OPTIONS.map((duration) => (
          <PickerOptionRow
            key={duration.id}
            label={duration.label}
            isSelected={duration.id === selectedDurationId}
            onSelect={() => onSelect(duration)}
          />
        ))}
      </div>
    </BottomSheet>
  );
}
