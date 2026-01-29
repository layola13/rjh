interface DateComponents {
  tm_wday: number;
}

const getWeekday = (dateComponents: DateComponents): number => dateComponents.tm_wday;