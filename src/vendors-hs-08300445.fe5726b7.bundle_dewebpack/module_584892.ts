import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { createKeyDownHandler } from './utils/keyboardUtils';

interface GenerateConfig<DateType> {
  getNow: () => DateType;
}

interface OperationRef {
  onUpDown: (offset: number) => void;
}

interface PanelOperationRef {
  onKeyDown: (event: React.KeyboardEvent) => boolean;
  onBlur: () => void;
}

interface TimePanelProps<DateType> {
  generateConfig: GenerateConfig<DateType>;
  format?: string;
  prefixCls: string;
  active: boolean;
  operationRef: React.MutableRefObject<PanelOperationRef | undefined>;
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
  use12Hours?: boolean;
  onSelect: (value: DateType, source: string) => void;
  value?: DateType;
}

interface TimeHeaderProps<DateType> {
  generateConfig: GenerateConfig<DateType>;
  format: string;
  prefixCls: string;
  value?: DateType;
}

interface TimeBodyProps<DateType> {
  generateConfig: GenerateConfig<DateType>;
  prefixCls: string;
  activeColumnIndex: number;
  operationRef: React.MutableRefObject<OperationRef | undefined>;
  showHour?: boolean;
  showMinute?: boolean;
  showSecond?: boolean;
  use12Hours?: boolean;
  value?: DateType;
  onSelect: (value: DateType, source: string) => void;
}

const TimeHeader: React.FC<TimeHeaderProps<any>> = (props) => {
  return null; // Placeholder implementation
};

const TimeBody: React.FC<TimeBodyProps<any>> = (props) => {
  return null; // Placeholder implementation
};

function TimePanel<DateType>(props: TimePanelProps<DateType>): React.ReactElement {
  const {
    generateConfig,
    format = 'HH:mm:ss',
    prefixCls,
    active,
    operationRef,
    showHour,
    showMinute,
    showSecond,
    use12Hours = false,
    onSelect,
    value,
  } = props;

  const timePanelPrefixCls = `${prefixCls}-time-panel`;
  const columnOperationRef = useRef<OperationRef>();
  const [activeColumnIndex, setActiveColumnIndex] = useState<number>(-1);

  const visibleColumnCount = [showHour, showMinute, showSecond, use12Hours].filter(
    (item) => item !== false
  ).length;

  operationRef.current = {
    onKeyDown: (event: React.KeyboardEvent): boolean => {
      return createKeyDownHandler(event, {
        onLeftRight: (offset: number) => {
          setActiveColumnIndex((activeColumnIndex + offset + visibleColumnCount) % visibleColumnCount);
        },
        onUpDown: (offset: number) => {
          if (activeColumnIndex === -1) {
            setActiveColumnIndex(0);
          } else if (columnOperationRef.current) {
            columnOperationRef.current.onUpDown(offset);
          }
        },
        onEnter: () => {
          onSelect(value ?? generateConfig.getNow(), 'key');
          setActiveColumnIndex(-1);
        },
      });
    },
    onBlur: () => {
      setActiveColumnIndex(-1);
    },
  };

  return (
    <div
      className={classNames(timePanelPrefixCls, {
        [`${timePanelPrefixCls}-active`]: active,
      })}
    >
      <TimeHeader
        {...props}
        format={format}
        prefixCls={prefixCls}
      />
      <TimeBody
        {...props}
        prefixCls={prefixCls}
        activeColumnIndex={activeColumnIndex}
        operationRef={columnOperationRef}
      />
    </div>
  );
}

export default TimePanel;