import React, { useMemo, cloneElement, MutableRefObject } from 'react';
import { leftPad } from './utils';
import { setTime } from './timeUtils';
import TimeUnit from './TimeUnit';

interface GenerateConfig<DateType> {
  getNow(): DateType;
  getHour(date: DateType): number;
  getMinute(date: DateType): number;
  getSecond(date: DateType): number;
}

interface TimeUnit {
  label: string;
  value: number;
  disabled: boolean;
}

interface ColumnNode {
  node: React.ReactElement;
  onSelect: (value: number) => void;
  value: number;
  units: TimeUnit[];
}

interface OperationRef {
  onUpDown: (offset: number) => void;
}

interface TimeBodyProps<DateType> {
  generateConfig: GenerateConfig<DateType>;
  prefixCls: string;
  operationRef: MutableRefObject<OperationRef | undefined>;
  activeColumnIndex: number;
  value: DateType | null;
  showHour: boolean;
  showMinute: boolean;
  showSecond: boolean;
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
  hideDisabledOptions?: boolean;
  onSelect: (date: DateType, type: 'mouse' | 'keyboard') => void;
}

function hasDisabledChanged(prevUnits: TimeUnit[], nextUnits: TimeUnit[]): boolean {
  if (prevUnits.length !== nextUnits.length) {
    return true;
  }
  
  for (let i = 0; i < prevUnits.length; i += 1) {
    if (prevUnits[i].disabled !== nextUnits[i].disabled) {
      return true;
    }
  }
  
  return false;
}

function generateUnits(
  start: number,
  end: number,
  step: number,
  disabledValues?: number[]
): TimeUnit[] {
  const units: TimeUnit[] = [];
  
  for (let value = start; value <= end; value += step) {
    units.push({
      label: leftPad(value, 2),
      value,
      disabled: (disabledValues || []).includes(value)
    });
  }
  
  return units;
}

function useMemoCompare<T>(
  factory: () => T,
  deps: T,
  compare: (prev: T, next: T) => boolean
): T {
  const ref = React.useRef<T>(deps);
  
  if (compare(ref.current, deps)) {
    ref.current = factory();
  }
  
  return ref.current;
}

export default function TimeBody<DateType>(props: TimeBodyProps<DateType>): React.ReactElement {
  const {
    generateConfig,
    prefixCls,
    operationRef,
    activeColumnIndex,
    value,
    showHour,
    showMinute,
    showSecond,
    use12Hours = false,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,
    onSelect
  } = props;

  const columns: ColumnNode[] = [];
  const contentClassName = `${prefixCls}-content`;
  const timePanelClassName = `${prefixCls}-time-panel`;

  const currentHour = value ? generateConfig.getHour(value) : -1;
  let displayHour = currentHour;
  const currentMinute = value ? generateConfig.getMinute(value) : -1;
  const currentSecond = value ? generateConfig.getSecond(value) : -1;

  const setDateTime = (
    isPM: boolean | undefined,
    hour: number,
    minute: number,
    second: number
  ): DateType => {
    const baseDate = value || generateConfig.getNow();
    const validHour = Math.max(0, hour);
    const validMinute = Math.max(0, minute);
    const validSecond = Math.max(0, second);
    const actualHour = use12Hours && isPM ? validHour + 12 : validHour;
    
    return setTime(generateConfig, baseDate, actualHour, validMinute, validSecond);
  };

  const allHourUnits = generateUnits(0, 23, hourStep, disabledHours?.());
  
  const memoizedHourUnits = useMemoCompare(
    () => allHourUnits,
    allHourUnits,
    hasDisabledChanged
  );

  let isPM: boolean | undefined;
  if (use12Hours) {
    isPM = displayHour >= 12;
    displayHour %= 12;
  }

  const [isAMDisabled, isPMDisabled] = useMemo(() => {
    if (!use12Hours) {
      return [false, false];
    }
    
    const disabled = [true, true];
    
    memoizedHourUnits.forEach(({ disabled: isDisabled, value: hourValue }) => {
      if (!isDisabled) {
        if (hourValue >= 12) {
          disabled[1] = false;
        } else {
          disabled[0] = false;
        }
      }
    });
    
    return disabled;
  }, [use12Hours, memoizedHourUnits]);

  const displayHourUnits = useMemo(() => {
    if (!use12Hours) {
      return memoizedHourUnits;
    }
    
    const filterFn = isPM 
      ? (unit: TimeUnit) => unit.value >= 12
      : (unit: TimeUnit) => unit.value < 12;
    
    return memoizedHourUnits
      .filter(filterFn)
      .map(unit => {
        const hour12 = unit.value % 12;
        const label = hour12 === 0 ? '12' : leftPad(hour12, 2);
        
        return {
          ...unit,
          label,
          value: hour12
        };
      });
  }, [use12Hours, isPM, memoizedHourUnits]);

  const minuteUnits = generateUnits(0, 59, minuteStep, disabledMinutes?.(currentHour));
  const secondUnits = generateUnits(0, 59, secondStep, disabledSeconds?.(currentHour, currentMinute));

  function addColumn(
    shouldShow: boolean,
    element: React.ReactElement,
    currentValue: number,
    units: TimeUnit[],
    onSelectValue: (value: number) => void
  ): void {
    if (shouldShow === false) {
      return;
    }
    
    columns.push({
      node: cloneElement(element, {
        prefixCls: timePanelClassName,
        value: currentValue,
        active: activeColumnIndex === columns.length,
        onSelect: onSelectValue,
        units,
        hideDisabledOptions
      }),
      onSelect: onSelectValue,
      value: currentValue,
      units
    });
  }

  operationRef.current = {
    onUpDown: (offset: number): void => {
      const column = columns[activeColumnIndex];
      
      if (!column) {
        return;
      }
      
      const currentIndex = column.units.findIndex(unit => unit.value === column.value);
      const totalUnits = column.units.length;
      
      for (let step = 1; step < totalUnits; step += 1) {
        const targetIndex = (currentIndex + offset * step + totalUnits) % totalUnits;
        const targetUnit = column.units[targetIndex];
        
        if (targetUnit.disabled !== true) {
          column.onSelect(targetUnit.value);
          break;
        }
      }
    }
  };

  addColumn(
    showHour,
    <TimeUnit key="hour" />,
    displayHour,
    displayHourUnits,
    (hour: number) => {
      onSelect(setDateTime(isPM, hour, currentMinute, currentSecond), 'mouse');
    }
  );

  addColumn(
    showMinute,
    <TimeUnit key="minute" />,
    currentMinute,
    minuteUnits,
    (minute: number) => {
      onSelect(setDateTime(isPM, displayHour, minute, currentSecond), 'mouse');
    }
  );

  addColumn(
    showSecond,
    <TimeUnit key="second" />,
    currentSecond,
    secondUnits,
    (second: number) => {
      onSelect(setDateTime(isPM, displayHour, currentMinute, second), 'mouse');
    }
  );

  let meridiemValue = -1;
  if (typeof isPM === 'boolean') {
    meridiemValue = isPM ? 1 : 0;
  }

  addColumn(
    use12Hours === true,
    <TimeUnit key="12hours" />,
    meridiemValue,
    [
      { label: 'AM', value: 0, disabled: isAMDisabled },
      { label: 'PM', value: 1, disabled: isPMDisabled }
    ],
    (meridiemIndex: number) => {
      onSelect(setDateTime(!!meridiemIndex, displayHour, currentMinute, currentSecond), 'mouse');
    }
  );

  return (
    <div className={contentClassName}>
      {columns.map(column => column.node)}
    </div>
  );
}