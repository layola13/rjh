import type { GenerateConfig } from './GenerateConfig';
import type { Locale } from './interface';
import type { PanelMode, RangeValue } from './types';

const WEEK_DAY_COUNT = 7;

interface KeyboardConfig {
  onLeftRight?: (offset: number) => void;
  onCtrlLeftRight?: (offset: number) => void;
  onUpDown?: (offset: number) => void;
  onPageUpDown?: (offset: number) => void;
}

interface OperationRef {
  onKeyDown: (event: React.KeyboardEvent) => void;
}

interface DatePanelProps<DateType> {
  prefixCls: string;
  panelName?: string;
  keyboardConfig?: KeyboardConfig;
  active?: boolean;
  operationRef: React.MutableRefObject<OperationRef | null>;
  generateConfig: GenerateConfig<DateType>;
  value: DateType | null;
  viewDate: DateType;
  onViewDateChange: (date: DateType) => void;
  onPanelChange: (mode: PanelMode | null, date: DateType) => void;
  onSelect: (date: DateType, source: 'key' | 'mouse') => void;
  locale?: Locale;
  disabledDate?: (date: DateType) => boolean;
  hoverValue?: RangeValue<DateType>;
  onHover?: (date: DateType | null) => void;
}

function createKeyDownHandler(
  event: React.KeyboardEvent,
  config: KeyboardConfig
): void {
  // Keyboard navigation logic implementation
  const { key, ctrlKey } = event;
  
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    const offset = key === 'ArrowLeft' ? -1 : 1;
    if (ctrlKey && config.onCtrlLeftRight) {
      config.onCtrlLeftRight(offset);
    } else if (config.onLeftRight) {
      config.onLeftRight(offset);
    }
    event.preventDefault();
  } else if (key === 'ArrowUp' || key === 'ArrowDown') {
    const offset = key === 'ArrowUp' ? -1 : 1;
    if (config.onUpDown) {
      config.onUpDown(offset);
    }
    event.preventDefault();
  } else if (key === 'PageUp' || key === 'PageDown') {
    const offset = key === 'PageUp' ? -1 : 1;
    if (config.onPageUpDown) {
      config.onPageUpDown(offset);
    }
    event.preventDefault();
  }
}

function DatePanel<DateType>(props: DatePanelProps<DateType>): React.ReactElement {
  const {
    prefixCls,
    panelName = 'date',
    keyboardConfig = {},
    active,
    operationRef,
    generateConfig,
    value,
    viewDate,
    onViewDateChange,
    onPanelChange,
    onSelect,
    ...restProps
  } = props;

  const panelPrefixCls = `${prefixCls}-${panelName}-panel`;

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent) => {
      return createKeyDownHandler(event, {
        onLeftRight: (offset: number) => {
          onSelect(generateConfig.addDate(value || viewDate, offset), 'key');
        },
        onCtrlLeftRight: (offset: number) => {
          onSelect(generateConfig.addYear(value || viewDate, offset), 'key');
        },
        onUpDown: (offset: number) => {
          onSelect(generateConfig.addDate(value || viewDate, offset * WEEK_DAY_COUNT), 'key');
        },
        onPageUpDown: (offset: number) => {
          onSelect(generateConfig.addMonth(value || viewDate, offset), 'key');
        },
        ...keyboardConfig,
      });
    },
  };

  const handleYearChange = (offset: number): void => {
    const newDate = generateConfig.addYear(viewDate, offset);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  const handleMonthChange = (offset: number): void => {
    const newDate = generateConfig.addMonth(viewDate, offset);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  const panelClassName = `${panelPrefixCls}${active ? ` ${panelPrefixCls}-active` : ''}`;

  return (
    <div className={panelClassName}>
      <PanelHeader
        {...restProps}
        prefixCls={prefixCls}
        value={value}
        viewDate={viewDate}
        onPrevYear={() => handleYearChange(-1)}
        onNextYear={() => handleYearChange(1)}
        onPrevMonth={() => handleMonthChange(-1)}
        onNextMonth={() => handleMonthChange(1)}
        onMonthClick={() => onPanelChange('month', viewDate)}
        onYearClick={() => onPanelChange('year', viewDate)}
      />
      <DateBody
        {...restProps}
        onSelect={(date: DateType) => onSelect(date, 'mouse')}
        prefixCls={prefixCls}
        value={value}
        viewDate={viewDate}
        rowCount={6}
      />
    </div>
  );
}

export default DatePanel;