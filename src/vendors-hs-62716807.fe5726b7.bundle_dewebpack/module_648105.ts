import React, { useRef } from 'react';
import type { Locale } from './locale';
import type { GenerateConfig } from './generate';
import Select from './Select';
import { Group as RadioGroup, Button as RadioButton } from './Radio';

const YEAR_OFFSET_START = 10;
const YEAR_OFFSET_END = 20;

interface YearSelectProps<DateType> {
  fullscreen?: boolean;
  validRange?: [DateType, DateType];
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  prefixCls: string;
  value: DateType;
  onChange: (date: DateType) => void;
  divRef: React.RefObject<HTMLDivElement>;
}

interface MonthSelectProps<DateType> {
  prefixCls: string;
  fullscreen?: boolean;
  validRange?: [DateType, DateType];
  value: DateType;
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  onChange: (date: DateType) => void;
  divRef: React.RefObject<HTMLDivElement>;
}

interface ModeSwitchProps {
  prefixCls: string;
  locale: Locale;
  mode: 'month' | 'year';
  fullscreen?: boolean;
  onModeChange: (mode: 'month' | 'year') => void;
}

interface HeaderProps<DateType> {
  prefixCls: string;
  fullscreen?: boolean;
  mode: 'month' | 'year';
  onChange: (date: DateType) => void;
  onModeChange: (mode: 'month' | 'year') => void;
  validRange?: [DateType, DateType];
  generateConfig: GenerateConfig<DateType>;
  locale: Locale;
  value: DateType;
}

interface SelectOption {
  label: string;
  value: number;
}

function YearSelect<DateType>(props: YearSelectProps<DateType>): React.ReactElement {
  const { fullscreen, validRange, generateConfig, locale, prefixCls, value, onChange, divRef } = props;
  
  const currentYear = generateConfig.getYear(value);
  let startYear = currentYear - YEAR_OFFSET_START;
  let endYear = startYear + YEAR_OFFSET_END;

  if (validRange) {
    startYear = generateConfig.getYear(validRange[0]);
    endYear = generateConfig.getYear(validRange[1]) + 1;
  }

  const yearSuffix = locale?.year === '年' ? '年' : '';
  const options: SelectOption[] = [];
  
  for (let year = startYear; year < endYear; year++) {
    options.push({
      label: `${year}${yearSuffix}`,
      value: year
    });
  }

  const handleChange = (selectedYear: number): void => {
    let newDate = generateConfig.setYear(value, selectedYear);
    
    if (validRange) {
      const [rangeStart, rangeEnd] = validRange;
      const newYear = generateConfig.getYear(newDate);
      const newMonth = generateConfig.getMonth(newDate);
      
      if (newYear === generateConfig.getYear(rangeEnd) && newMonth > generateConfig.getMonth(rangeEnd)) {
        newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(rangeEnd));
      }
      
      if (newYear === generateConfig.getYear(rangeStart) && newMonth < generateConfig.getMonth(rangeStart)) {
        newDate = generateConfig.setMonth(newDate, generateConfig.getMonth(rangeStart));
      }
    }
    
    onChange(newDate);
  };

  return (
    <Select
      size={fullscreen ? undefined : 'small'}
      options={options}
      value={currentYear}
      className={`${prefixCls}-year-select`}
      onChange={handleChange}
      getPopupContainer={() => divRef.current!}
    />
  );
}

function MonthSelect<DateType>(props: MonthSelectProps<DateType>): React.ReactElement {
  const { prefixCls, fullscreen, validRange, value, generateConfig, locale, onChange, divRef } = props;
  
  const currentMonth = generateConfig.getMonth(value);
  let minMonth = 0;
  let maxMonth = 11;

  if (validRange) {
    const [rangeStart, rangeEnd] = validRange;
    const currentYear = generateConfig.getYear(value);
    
    if (generateConfig.getYear(rangeEnd) === currentYear) {
      maxMonth = generateConfig.getMonth(rangeEnd);
    }
    
    if (generateConfig.getYear(rangeStart) === currentYear) {
      minMonth = generateConfig.getMonth(rangeStart);
    }
  }

  const shortMonths = locale.shortMonths || generateConfig.locale.getShortMonths(locale.locale);
  const options: SelectOption[] = [];
  
  for (let month = minMonth; month <= maxMonth; month += 1) {
    options.push({
      label: shortMonths[month],
      value: month
    });
  }

  const handleChange = (selectedMonth: number): void => {
    onChange(generateConfig.setMonth(value, selectedMonth));
  };

  return (
    <Select
      size={fullscreen ? undefined : 'small'}
      className={`${prefixCls}-month-select`}
      value={currentMonth}
      options={options}
      onChange={handleChange}
      getPopupContainer={() => divRef.current!}
    />
  );
}

function ModeSwitch(props: ModeSwitchProps): React.ReactElement {
  const { prefixCls, locale, mode, fullscreen, onModeChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newMode = event.target.value as 'month' | 'year';
    onModeChange(newMode);
  };

  return (
    <RadioGroup
      onChange={handleChange}
      value={mode}
      size={fullscreen ? undefined : 'small'}
      className={`${prefixCls}-mode-switch`}
    >
      <RadioButton value="month">{locale.month}</RadioButton>
      <RadioButton value="year">{locale.year}</RadioButton>
    </RadioGroup>
  );
}

export default function CalendarHeader<DateType>(props: HeaderProps<DateType>): React.ReactElement {
  const { prefixCls, fullscreen, mode, onChange, onModeChange } = props;
  const divRef = useRef<HTMLDivElement>(null);

  const commonProps = {
    ...props,
    onChange,
    fullscreen,
    divRef
  };

  return (
    <div className={`${prefixCls}-header`} ref={divRef}>
      <YearSelect {...commonProps} />
      {mode === 'month' && <MonthSelect {...commonProps} />}
      <ModeSwitch {...commonProps} onModeChange={onModeChange} />
    </div>
  );
}