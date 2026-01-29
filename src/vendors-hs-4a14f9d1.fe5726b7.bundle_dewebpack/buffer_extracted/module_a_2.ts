interface TimeStruct {
  tm_wday: number;
}

type WeekdayNames = string[];

const getWeekdayName = (timeStruct: TimeStruct, weekdayNames: WeekdayNames): string => {
  return weekdayNames[timeStruct.tm_wday];
};