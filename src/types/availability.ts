export interface AvailabilitySlot {
  /** 24h time, e.g. 09:00 */
  time: string;
  isAvailable: boolean;
}

/** Bookable slots for one day, for either a zone (partner) or a provider (customer). */
export interface Availability {
  zoneId?: string;
  providerId?: string;
  date: string;
  slots: AvailabilitySlot[];
}
