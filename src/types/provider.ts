export interface Provider {
  id: string;
  name: string;
  /** e.g. "Hair Stylist" */
  discipline: string;
  /** Home zone the provider normally works from */
  zoneId: string;
  zoneName: string;
  providerCode: string;
  /** Hidden providers are not listed to customers and cannot receive new bookings */
  isPublic: boolean;
}
