import React, { Component, createRef, RefObject } from 'react';
import classNames from 'classnames';
import CalendarOutlined from '@ant-design/icons/CalendarOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import SwapRightOutlined from '@ant-design/icons/SwapRightOutlined';
import { RangePicker as RcRangePicker } from 'rc-picker';
import defaultLocale from './locale/en_US';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { getRangePlaceholder } from './util';
import { getTimeProps, Components } from './generatePicker';

interface PickerLocale {
  lang: Record<string, any>;
  [key: string]: any;
}

interface RangePickerProps {
  prefixCls?: string;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  className?: string;
  size?: SizeType;
  bordered?: boolean;
  placeholder?: [string, string];
  format?: string;
  showTime?: boolean | object;
  picker?: 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';
  locale?: Partial<PickerLocale>;
  [key: string]: any;
}

interface RangePickerState {}

export default function generateRangePicker<DateType>(generateConfig: any) {
  class RangePicker extends Component<RangePickerProps, RangePickerState> {
    static contextType = ConfigContext;
    context!: ConfigConsumerProps;

    private pickerRef: RefObject<any> = createRef();

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

    getDefaultLocale = (): PickerLocale => {
      const { locale } = this.props;
      const mergedLocale: PickerLocale = {
        ...defaultLocale,
        ...locale,
      };
      mergedLocale.lang = {
        ...mergedLocale.lang,
        ...(locale?.lang || {}),
      };
      return mergedLocale;
    };

    renderPicker = (locale: PickerLocale): React.ReactNode => {
      const { getPrefixCls, direction, getPopupContainer: contextGetPopupContainer } = this.context;
      const {
        prefixCls: customizePrefixCls,
        getPopupContainer: customizeGetPopupContainer,
        className,
        size: customizeSize,
        bordered = true,
        placeholder,
        format,
        showTime,
        picker,
        ...restProps
      } = this.props;

      const prefixCls = getPrefixCls('picker', customizePrefixCls);
      const getPopupContainer = customizeGetPopupContainer || contextGetPopupContainer;

      let additionalProps: Record<string, any> = {};

      if (showTime) {
        additionalProps = {
          ...additionalProps,
          ...getTimeProps({
            format,
            picker,
            ...showTime,
          }),
        };
      }

      if (picker === 'time') {
        additionalProps = {
          ...additionalProps,
          ...getTimeProps({
            format,
            ...this.props,
            picker,
          }),
        };
      }

      return (
        <SizeContext.Consumer>
          {(contextSize: SizeType) => {
            const size = customizeSize || contextSize;
            const pickerClassName = classNames(
              {
                [`${prefixCls}-${size}`]: size,
                [`${prefixCls}-borderless`]: !bordered,
              },
              className
            );

            return (
              <RcRangePicker<DateType>
                separator={
                  <span aria-label="to" className={`${prefixCls}-separator`}>
                    <SwapRightOutlined />
                  </span>
                }
                ref={this.pickerRef}
                placeholder={getRangePlaceholder(picker, locale, placeholder)}
                suffixIcon={picker === 'time' ? <ClockCircleOutlined /> : <CalendarOutlined />}
                clearIcon={<CloseCircleFilled />}
                allowClear={true}
                transitionName="slide-up"
                {...restProps}
                {...additionalProps}
                className={pickerClassName}
                locale={locale.lang}
                prefixCls={prefixCls}
                getPopupContainer={getPopupContainer}
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
        <LocaleReceiver componentName="DatePicker" defaultLocale={this.getDefaultLocale}>
          {this.renderPicker}
        </LocaleReceiver>
      );
    }
  }

  return RangePicker;
}