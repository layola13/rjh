import React, { Component, createRef, RefObject } from 'react';
import classNames from 'classnames';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import RCPicker from 'rc-picker';
import type { PickerProps, PickerMode, PickerRef } from 'rc-picker/lib/Picker';
import { ConfigContext } from '../config-provider/context';
import SizeContext from '../config-provider/SizeContext';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import warning from '../_util/warning';
import { getPlaceholder } from './util';
import { getTimeProps, Components } from './generatePicker';

type SizeType = 'small' | 'middle' | 'large';

interface GenerateConfig {
  // Generate config interface for date library adapter
}

interface LocaleData {
  lang: Record<string, any>;
  [key: string]: any;
}

interface DatePickerProps<DateType = any> extends Omit<PickerProps<DateType>, 'prefixCls' | 'getPopupContainer'> {
  prefixCls?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  className?: string;
  size?: SizeType;
  bordered?: boolean;
  placeholder?: string;
  locale?: Partial<LocaleData>;
  format?: string | string[];
  showTime?: boolean | Record<string, any>;
  picker?: PickerMode;
}

interface DatePickerState {}

interface ConfigContextType {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
}

interface DatePickerComponents {
  DatePicker: React.ComponentClass<DatePickerProps>;
  WeekPicker: React.ComponentClass<DatePickerProps>;
  MonthPicker: React.ComponentClass<DatePickerProps>;
  YearPicker: React.ComponentClass<DatePickerProps>;
  TimePicker: React.ComponentClass<DatePickerProps>;
  QuarterPicker: React.ComponentClass<DatePickerProps>;
}

export default function generateDatePicker(generateConfig: GenerateConfig): DatePickerComponents {
  function createPicker(pickerMode?: PickerMode, displayName?: string): React.ComponentClass<DatePickerProps> {
    class DatePickerComponent extends Component<DatePickerProps, DatePickerState> {
      static contextType = ConfigContext;
      static displayName = displayName;

      context!: ConfigContextType;
      pickerRef: RefObject<PickerRef> = createRef();

      focus = (): void => {
        if (this.pickerRef.current) {
          this.pickerRef.current.focus();
        }
      };

      blur = (): void => {
        if (this.pickerRef.current) {
          this.pickerRef.current.blur();
        }
      };

      getDefaultLocale = (): LocaleData => {
        const { locale } = this.props;
        const mergedLocale: LocaleData = {
          ...defaultLocale,
          ...locale,
        };
        mergedLocale.lang = {
          ...mergedLocale.lang,
          ...(locale?.lang || {}),
        };
        return mergedLocale;
      };

      renderPicker = (locale: LocaleData): React.ReactNode => {
        const { getPrefixCls, direction, getPopupContainer: contextGetPopupContainer } = this.context;
        const {
          prefixCls: customizePrefixCls,
          getPopupContainer,
          className,
          size,
          bordered = true,
          placeholder,
          format,
          showTime,
          ...restProps
        } = this.props;

        const prefixCls = getPrefixCls('picker', customizePrefixCls);
        
        const additionalProps: Record<string, any> = {
          showToday: true,
        };

        const additionalOverrideProps: Record<string, any> = {};

        if (pickerMode) {
          additionalOverrideProps.picker = pickerMode;
        }

        const picker = pickerMode || this.props.picker;

        const mergedProps = {
          ...additionalOverrideProps,
          ...(showTime ? getTimeProps({ format, picker, ...showTime }) : {}),
          ...(picker === 'time' ? getTimeProps({ format, ...this.props, picker }) : {}),
        };

        return (
          <SizeContext.Consumer>
            {(contextSize) => {
              const mergedSize = size || contextSize;

              return (
                <RCPicker
                  ref={this.pickerRef}
                  placeholder={getPlaceholder(picker, locale, placeholder)}
                  suffixIcon={
                    picker === 'time' ? (
                      <ClockCircleOutlined />
                    ) : (
                      <CalendarOutlined />
                    )
                  }
                  clearIcon={<CloseCircleFilled />}
                  allowClear={true}
                  transitionName="slide-up"
                  {...additionalProps}
                  {...restProps}
                  {...mergedProps}
                  locale={locale.lang}
                  className={classNames(
                    {
                      [`${prefixCls}-${mergedSize}`]: mergedSize,
                      [`${prefixCls}-borderless`]: !bordered,
                    },
                    className
                  )}
                  prefixCls={prefixCls}
                  getPopupContainer={getPopupContainer || contextGetPopupContainer}
                  generateConfig={generateConfig}
                  prevIcon={<span className={`${prefixCls}-prev-icon`} />}
                  nextIcon={<span className={`${prefixCls}-next-icon`} />}
                  superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
                  superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
                  components={Components}
                  direction={direction}
                />
              );
            }}
          </SizeContext.Consumer>
        );
      };

      render(): React.ReactNode {
        return (
          <LocaleReceiver
            componentName="DatePicker"
            defaultLocale={this.getDefaultLocale}
          >
            {this.renderPicker}
          </LocaleReceiver>
        );
      }

      constructor(props: DatePickerProps) {
        super(props);
        
        if (pickerMode === 'quarter' && displayName) {
          warning(
            false,
            displayName,
            `DatePicker.${displayName} is legacy usage. Please use DatePicker[picker='${pickerMode}'] directly.`
          );
        }
      }
    }

    return DatePickerComponent;
  }

  const DatePicker = createPicker();
  const WeekPicker = createPicker('week', 'WeekPicker');
  const MonthPicker = createPicker('month', 'MonthPicker');
  const YearPicker = createPicker('year', 'YearPicker');
  const TimePicker = createPicker('time', 'TimePicker');
  const QuarterPicker = createPicker('quarter', 'QuarterPicker');

  return {
    DatePicker,
    WeekPicker,
    MonthPicker,
    YearPicker,
    TimePicker,
    QuarterPicker,
  };
}