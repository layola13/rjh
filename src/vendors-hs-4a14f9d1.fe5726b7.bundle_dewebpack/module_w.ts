interface TimeStruct {
  tm_wday: number;
}

const getWeekday = (timeStruct: TimeStruct): number => timeStruct.tm_wday;

export default getWeekday;