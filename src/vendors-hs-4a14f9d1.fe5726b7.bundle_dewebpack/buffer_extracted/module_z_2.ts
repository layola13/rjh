interface TimezoneData {
  tm_zone: string;
}

const getTimezone = (data: TimezoneData): string => data.tm_zone;