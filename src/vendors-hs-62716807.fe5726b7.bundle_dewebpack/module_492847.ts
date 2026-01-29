interface TimePropsInput {
  format?: string | string[];
  picker?: string;
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
  use12Hours?: boolean;
  [key: string]: unknown;
}

interface TimePropsOutput {
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
  use12Hours?: boolean;
  format?: string | string[];
  [key: string]: unknown;
}

interface TimePickerOutput {
  showTime: TimePropsOutput;
}

interface PickerComponents {
  button: unknown;
  rangeItem: unknown;
}

interface GenerateConfig<DateType> {
  [key: string]: unknown;
}

interface PickerProps<DateType> {
  [key: string]: unknown;
}

interface DatePickerComponent<DateType> {
  WeekPicker: unknown;
  MonthPicker: unknown;
  YearPicker: unknown;
  RangePicker: unknown;
  TimePicker: unknown;
  QuarterPicker: unknown;
  (props: PickerProps<DateType>): JSX.Element;
}

interface GeneratedPickers<DateType> {
  DatePicker: DatePickerComponent<DateType>;
  WeekPicker: unknown;
  MonthPicker: unknown;
  YearPicker: unknown;
  TimePicker: unknown;
  QuarterPicker: unknown;
}

export const Components: PickerComponents = {
  button: undefined,
  rangeItem: undefined
};

export function getTimeProps(props: TimePropsInput): TimePropsOutput | TimePickerOutput {
  const { format, picker, showHour, showMinute, showSecond, use12Hours } = props;

  const normalizeFormat = (formatValue: string | string[] | undefined): string | undefined => {
    if (!formatValue) return undefined;
    return Array.isArray(formatValue) ? formatValue[0] : formatValue;
  };

  const normalizedFormat = normalizeFormat(format);
  const result: TimePropsOutput = { ...props };

  if (normalizedFormat && typeof normalizedFormat === 'string') {
    if (!normalizedFormat.includes('s') && showSecond === undefined) {
      result.showSecond = false;
    }
    if (!normalizedFormat.includes('m') && showMinute === undefined) {
      result.showMinute = false;
    }
    if (!normalizedFormat.includes('H') && !normalizedFormat.includes('h') && showHour === undefined) {
      result.showHour = false;
    }
    if ((normalizedFormat.includes('a') || normalizedFormat.includes('A')) && use12Hours === undefined) {
      result.use12Hours = true;
    }
  }

  if (picker === 'time') {
    return result;
  }

  if (typeof normalizedFormat === 'function') {
    delete result.format;
  }

  return {
    showTime: result
  };
}

export default function generatePicker<DateType>(config: GenerateConfig<DateType>): DatePickerComponent<DateType> {
  const { DatePicker, WeekPicker, MonthPicker, YearPicker, TimePicker, QuarterPicker } = {} as GeneratedPickers<DateType>;

  const composedDatePicker = DatePicker as DatePickerComponent<DateType>;
  composedDatePicker.WeekPicker = WeekPicker;
  composedDatePicker.MonthPicker = MonthPicker;
  composedDatePicker.YearPicker = YearPicker;
  composedDatePicker.RangePicker = undefined;
  composedDatePicker.TimePicker = TimePicker;
  composedDatePicker.QuarterPicker = QuarterPicker;

  return composedDatePicker;
}