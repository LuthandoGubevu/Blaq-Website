import { PickerTriggerRow } from '../../../components/pickers/PickerTriggerRow';
import { InlineCalendar } from '../../../components/pickers/InlineCalendar';
import { CalendarIcon } from '../../../components/icons/CalendarIcon';

interface DateFieldProps {
  selectedDate: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (date: string) => void;
  onClear: () => void;
}

export function DateField({ selectedDate, isOpen, onToggle, onSelect, onClear }: DateFieldProps) {
  return (
    <div>
      <PickerTriggerRow
        label="Date"
        placeholder="Choose a date…"
        value={selectedDate}
        icon={<CalendarIcon size={16} />}
        onClick={onToggle}
        isOpen={isOpen}
        ariaHasPopup="grid"
      />
      {isOpen ? (
        <InlineCalendar selectedDate={selectedDate} onSelect={onSelect} onClear={onClear} />
      ) : null}
    </div>
  );
}
