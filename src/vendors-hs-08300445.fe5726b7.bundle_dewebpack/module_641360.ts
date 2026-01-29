import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import { setDateTime } from '../utils/timeUtil';
import type { GenerateConfig } from '../generate';
import type { Locale } from '../interface';
import DatePanel from './DatePanel';
import TimePanel from './TimePanel';

type PanelMode = 'date' | 'time';

const PANEL_MODES: readonly PanelMode[] = ['date', 'time'] as const;

interface ShowTimeConfig {
  defaultValue?: any;
  [key: string]: any;
}

interface DisabledTime {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
}

interface OperationRef {
  onKeyDown?: (event: React.KeyboardEvent) => boolean | void;
  onBlur?: (event: React.FocusEvent) => void;
  onClose?: () => void;
}

interface DateTimePanelProps<DateType> {
  prefixCls: string;
  operationRef: React.MutableRefObject<OperationRef>;
  generateConfig: GenerateConfig<DateType>;
  value?: DateType | null;
  defaultValue?: DateType;
  disabledTime?: (date: DateType | null) => DisabledTime;
  showTime?: boolean | ShowTimeConfig;
  onSelect?: (value: DateType, type: 'mouse' | 'keyboard') => void;
  locale?: Locale;
  [key: string]: any;
}

function DateTimePanel<DateType>(props: DateTimePanelProps<DateType>): React.ReactElement {
  const {
    prefixCls,
    operationRef,
    generateConfig,
    value,
    defaultValue,
    disabledTime,
    showTime,
    onSelect,
    ...restProps
  } = props;

  const panelPrefixCls = `${prefixCls}-datetime-panel`;

  const [activePanel, setActivePanel] = useState<PanelMode | null>(null);
  const datePanelRef = useRef<OperationRef>({});
  const timePanelRef = useRef<OperationRef>({});

  const showTimeConfig: ShowTimeConfig =
    typeof showTime === 'object' ? { ...showTime } : {};

  const handleBlur = (event: React.FocusEvent): void => {
    if (timePanelRef.current.onBlur) {
      timePanelRef.current.onBlur(event);
    }
    setActivePanel(null);
  };

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent): boolean => {
      if (event.which === KeyCode.TAB) {
        const offset = event.shiftKey ? -1 : 1;
        const currentIndex = PANEL_MODES.indexOf(activePanel!);
        const nextIndex = currentIndex + offset;
        const nextPanel = PANEL_MODES[nextIndex] || null;

        setActivePanel(nextPanel);
        if (nextPanel) {
          event.preventDefault();
        }
        return true;
      }

      if (activePanel) {
        const targetRef = activePanel === 'date' ? datePanelRef : timePanelRef;
        if (targetRef.current?.onKeyDown) {
          targetRef.current.onKeyDown(event);
        }
        return true;
      }

      const navigationKeys = [
        KeyCode.LEFT,
        KeyCode.RIGHT,
        KeyCode.UP,
        KeyCode.DOWN,
      ];
      if (navigationKeys.includes(event.which)) {
        setActivePanel('date');
        return true;
      }

      return false;
    },
    onBlur: handleBlur,
    onClose: handleBlur,
  };

  const handlePanelSelect = (date: DateType, panelType: PanelMode): void => {
    let updatedDate = date;

    if (panelType === 'date' && !value && showTimeConfig.defaultValue) {
      const timeDefault = showTimeConfig.defaultValue;
      updatedDate = generateConfig.setHour(updatedDate, generateConfig.getHour(timeDefault));
      updatedDate = generateConfig.setMinute(updatedDate, generateConfig.getMinute(timeDefault));
      updatedDate = generateConfig.setSecond(updatedDate, generateConfig.getSecond(timeDefault));
    } else if (panelType === 'time' && !value && defaultValue) {
      updatedDate = generateConfig.setYear(updatedDate, generateConfig.getYear(defaultValue));
      updatedDate = generateConfig.setMonth(updatedDate, generateConfig.getMonth(defaultValue));
      updatedDate = generateConfig.setDate(updatedDate, generateConfig.getDate(defaultValue));
    }

    if (onSelect) {
      onSelect(updatedDate, 'mouse');
    }
  };

  const handleDateSelect = (date: DateType): void => {
    const mergedDate = setDateTime(
      generateConfig,
      date,
      typeof showTime === 'object' ? showTime.defaultValue : null
    );
    handlePanelSelect(mergedDate, 'date');
  };

  const handleTimeSelect = (time: DateType): void => {
    handlePanelSelect(time, 'time');
  };

  const disabledTimeConfig: DisabledTime = disabledTime ? disabledTime(value || null) : {};

  return (
    <div
      className={classNames(panelPrefixCls, {
        [`${panelPrefixCls}-active`]: activePanel,
      })}
    >
      <DatePanel
        {...restProps}
        prefixCls={prefixCls}
        generateConfig={generateConfig}
        value={value}
        operationRef={datePanelRef}
        active={activePanel === 'date'}
        onSelect={handleDateSelect}
      />
      <TimePanel
        {...restProps}
        prefixCls={prefixCls}
        generateConfig={generateConfig}
        value={value}
        format={undefined}
        {...showTimeConfig}
        {...disabledTimeConfig}
        defaultValue={undefined}
        operationRef={timePanelRef}
        active={activePanel === 'time'}
        onSelect={handleTimeSelect}
      />
    </div>
  );
}

export default DateTimePanel;