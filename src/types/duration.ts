export interface DurationOption {
  id: string;
  label: string;
  minutes: number;
}

export const DEFAULT_DURATION: DurationOption = { id: '1h', label: '1 Hour', minutes: 60 };

export const DURATION_OPTIONS: DurationOption[] = [
  DEFAULT_DURATION,
  { id: '2h', label: '2 Hours', minutes: 120 },
  { id: 'half-day', label: 'Half Day', minutes: 240 },
  { id: 'full-day', label: 'Full Day', minutes: 480 },
];
