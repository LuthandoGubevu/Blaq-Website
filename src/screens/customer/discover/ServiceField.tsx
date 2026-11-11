import type { Service } from '../../../types';
import { PickerTriggerRow } from '../../../components/pickers/PickerTriggerRow';
import { ServicePickerSheet } from '../../../components/pickers/ServicePickerSheet';
import { formatDurationShort } from '../../../utils/formatDate';
import styles from './ServiceField.module.css';

interface ServiceFieldProps {
  services: Service[];
  selectedService: Service | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (service: Service) => void;
  disabled: boolean;
}

export function ServiceField({
  services,
  selectedService,
  isOpen,
  onOpen,
  onClose,
  onSelect,
  disabled,
}: ServiceFieldProps) {
  return (
    <div>
      <PickerTriggerRow
        label="Select Service"
        placeholder="Choose a service…"
        value={selectedService?.name ?? null}
        onClick={onOpen}
        isOpen={isOpen}
        ariaHasPopup="listbox"
        subLabel={
          selectedService
            ? `${formatDurationShort(selectedService.durationMinutes)} · R${selectedService.price}`
            : undefined
        }
      />
      {disabled ? <p className={styles.hint}>Select a provider first.</p> : null}
      <ServicePickerSheet
        isOpen={isOpen}
        onClose={onClose}
        services={services}
        selectedServiceId={selectedService?.id ?? null}
        onSelect={onSelect}
      />
    </div>
  );
}
