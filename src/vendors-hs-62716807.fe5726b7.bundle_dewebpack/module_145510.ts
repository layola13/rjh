import React, { forwardRef, useMemo } from 'react';
import DatePicker from 'antd/es/date-picker';
import warning from 'rc-util/lib/warning';

type PickerMode = 'time' | 'date' | 'month' | 'year' | 'decade';

interface TimePickerProps extends Omit<React.ComponentPropsWithoutRef<typeof DatePicker>, 'picker' | 'mode'> {
  addon?: () => React.ReactNode;
  renderExtraFooter?: () => React.ReactNode;
  popupClassName?: string;
}

interface RangePickerProps extends Omit<React.ComponentPropsWithoutRef<typeof DatePicker.RangePicker>, 'picker' | 'mode'> {
  picker?: never;
  mode?: never;
}

const { TimePicker: AntdTimePicker, RangePicker: AntdRangePicker } = DatePicker;

const TimeRangePicker = forwardRef<any, RangePickerProps>((props, ref) => {
  return (
    <AntdRangePicker
      {...props}
      picker="time"
      mode={undefined}
      ref={ref}
    />
  );
});

TimeRangePicker.displayName = 'TimeRangePicker';

const TimePicker = forwardRef<any, TimePickerProps>((props, ref) => {
  const {
    addon,
    renderExtraFooter,
    popupClassName,
    ...restProps
  } = props;

  const extraFooter = useMemo(() => {
    if (renderExtraFooter) {
      return renderExtraFooter;
    }
    
    if (addon) {
      warning(
        false,
        'TimePicker',
        '`addon` is deprecated. Please use `renderExtraFooter` instead.'
      );
      return addon;
    }
    
    return undefined;
  }, [addon, renderExtraFooter]);

  return (
    <AntdTimePicker
      {...restProps}
      dropdownClassName={popupClassName}
      mode={undefined}
      ref={ref}
      renderExtraFooter={extraFooter}
    />
  );
});

TimePicker.displayName = 'TimePicker';

interface TimePickerComponent extends React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<any>> {
  RangePicker: typeof TimeRangePicker;
}

(TimePicker as TimePickerComponent).RangePicker = TimeRangePicker;

export default TimePicker as TimePickerComponent;