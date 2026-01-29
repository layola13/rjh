import type { GenerateConfig } from 'rc-picker/lib/generate';
import type { Locale } from 'rc-picker/lib/interface';
import { useContext, useMemo, useCallback, createElement } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import { PickerPanel } from '../date-picker/PickerPanel';
import useMergedState from '../_util/hooks/useMergedState';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import enUS from '../locale/en_US';
import Header from './Header';

type PanelMode = 'month' | 'year';
type PickerMode = 'date' | 'month';

interface CalendarProps<DateType> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  dateFullCellRender?: (date: DateType) => React.ReactNode;
  dateCellRender?: (date: DateType) => React.ReactNode;
  monthFullCellRender?: (date: DateType) => React.ReactNode;
  monthCellRender?: (date: DateType) => React.ReactNode;
  headerRender?: (config: HeaderRenderConfig<DateType>) => React.ReactNode;
  value?: DateType;
  defaultValue?: DateType;
  disabledDate?: (date: DateType) => boolean;
  mode?: PanelMode;
  validRange?: [DateType, DateType];
  fullscreen?: boolean;
  onChange?: (date: DateType) => void;
  onPanelChange?: (date: DateType, mode: PanelMode) => void;
  onSelect?: (date: DateType) => void;
}

interface HeaderRenderConfig<DateType> {
  value: DateType;
  type: PanelMode;
  onChange: (date: DateType) => void;
  onTypeChange: (type: PanelMode) => void;
}

interface LocaleData {
  lang: Locale;
  locale?: string;
  shortMonths?: string[];
  getShortMonths?: (locale: string) => string[];
}

const ZERO_PAD_LENGTH = 2;
const ZERO_PAD_CHAR = '0';

function padZero(value: string, length: number, padChar: string): string {
  return value.padStart(length, padChar);
}

export default function createCalendar<DateType>(generateConfig: GenerateConfig<DateType>) {
  function isSameYear(date1: DateType | null, date2: DateType | null): boolean {
    return !!(date1 && date2 && generateConfig.getYear(date1) === generateConfig.getYear(date2));
  }

  function isSameMonth(date1: DateType | null, date2: DateType | null): boolean {
    return isSameYear(date1, date2) && 
           generateConfig.getMonth(date1!) === generateConfig.getMonth(date2!);
  }

  function isSameDate(date1: DateType | null, date2: DateType | null): boolean {
    return isSameMonth(date1, date2) && 
           generateConfig.getDate(date1!) === generateConfig.getDate(date2!);
  }

  return function Calendar(props: CalendarProps<DateType>) {
    const {
      prefixCls: customizePrefixCls,
      className,
      style,
      dateFullCellRender,
      dateCellRender,
      monthFullCellRender,
      monthCellRender,
      headerRender,
      value,
      defaultValue,
      disabledDate,
      mode,
      validRange,
      fullscreen = true,
      onChange,
      onPanelChange,
      onSelect,
    } = props;

    const { getPrefixCls, direction } = useContext(ConfigContext);
    const prefixCls = getPrefixCls('picker', customizePrefixCls);
    const calendarPrefixCls = `${prefixCls}-calendar`;
    const now = generateConfig.getNow();

    const [mergedValue, setMergedValue] = useMergedState<DateType>(
      () => value || generateConfig.getNow(),
      {
        defaultValue,
        value,
      }
    );

    const [panelMode, setPanelMode] = useMergedState<PanelMode>('month', {
      value: mode,
    });

    const pickerMode = useMemo<PickerMode>(() => {
      return panelMode === 'year' ? 'month' : 'date';
    }, [panelMode]);

    const isDateDisabled = useCallback(
      (date: DateType): boolean => {
        if (validRange) {
          if (generateConfig.isAfter(validRange[0], date) || 
              generateConfig.isAfter(date, validRange[1])) {
            return true;
          }
        }
        return disabledDate?.(date) ?? false;
      },
      [disabledDate, validRange]
    );

    const triggerPanelChange = (date: DateType, newMode: PanelMode): void => {
      onPanelChange?.(date, newMode);
    };

    const handleModeChange = (newMode: PanelMode): void => {
      setPanelMode(newMode);
      triggerPanelChange(mergedValue, newMode);
    };

    const handleDateChange = (date: DateType): void => {
      setMergedValue(date);

      const shouldTriggerChange = !isSameDate(date, mergedValue) && (
        (pickerMode === 'date' && !isSameMonth(date, mergedValue)) ||
        (pickerMode === 'month' && !isSameYear(date, mergedValue))
      );

      if (shouldTriggerChange) {
        triggerPanelChange(date, panelMode);
        onChange?.(date);
      }
    };

    const handleSelect = (date: DateType): void => {
      handleDateChange(date);
      onSelect?.(date);
    };

    const renderDateCell = useCallback(
      (date: DateType): React.ReactNode => {
        if (dateFullCellRender) {
          return dateFullCellRender(date);
        }

        const isToday = isSameDate(now, date);
        const dateValue = generateConfig.getDate(date);

        return createElement('div', {
          className: classNames(
            `${prefixCls}-cell-inner`,
            `${calendarPrefixCls}-date`,
            {
              [`${calendarPrefixCls}-date-today`]: isToday,
            }
          ),
        },
          createElement('div', {
            className: `${calendarPrefixCls}-date-value`,
          }, padZero(String(dateValue), ZERO_PAD_LENGTH, ZERO_PAD_CHAR)),
          createElement('div', {
            className: `${calendarPrefixCls}-date-content`,
          }, dateCellRender?.(date))
        );
      },
      [dateFullCellRender, dateCellRender, now, prefixCls, calendarPrefixCls]
    );

    const renderMonthCell = useCallback(
      (date: DateType, locale: LocaleData): React.ReactNode => {
        if (monthFullCellRender) {
          return monthFullCellRender(date);
        }

        const isToday = isSameMonth(now, date);
        const monthIndex = generateConfig.getMonth(date);
        const shortMonths = locale.shortMonths || 
                           generateConfig.locale.getShortMonths?.(locale.locale!) || [];

        return createElement('div', {
          className: classNames(
            `${prefixCls}-cell-inner`,
            `${calendarPrefixCls}-date`,
            {
              [`${calendarPrefixCls}-date-today`]: isToday,
            }
          ),
        },
          createElement('div', {
            className: `${calendarPrefixCls}-date-value`,
          }, shortMonths[monthIndex]),
          createElement('div', {
            className: `${calendarPrefixCls}-date-content`,
          }, monthCellRender?.(date))
        );
      },
      [monthFullCellRender, monthCellRender, now, prefixCls, calendarPrefixCls]
    );

    const getDefaultLocale = (): LocaleData => {
      const mergedLocale = {
        ...enUS,
        ...props.locale,
      };
      mergedLocale.lang = {
        ...mergedLocale.lang,
        ...(props.locale || {}).lang,
      };
      return mergedLocale;
    };

    return createElement(LocaleReceiver, {
      componentName: 'Calendar',
      defaultLocale: getDefaultLocale,
    }, (locale: LocaleData) => {
      const calendarClassName = classNames(
        calendarPrefixCls,
        {
          [`${calendarPrefixCls}-full`]: fullscreen,
          [`${calendarPrefixCls}-mini`]: !fullscreen,
          [`${calendarPrefixCls}-rtl`]: direction === 'rtl',
        },
        className
      );

      return createElement('div', {
        className: calendarClassName,
        style,
      },
        headerRender ? headerRender({
          value: mergedValue,
          type: panelMode,
          onChange: handleSelect,
          onTypeChange: handleModeChange,
        }) : createElement(Header, {
          prefixCls: calendarPrefixCls,
          value: mergedValue,
          generateConfig,
          mode: panelMode,
          fullscreen,
          locale: locale.lang,
          validRange,
          onChange: handleSelect,
          onModeChange: handleModeChange,
        }),
        createElement(PickerPanel, {
          value: mergedValue,
          prefixCls,
          locale: locale.lang,
          generateConfig,
          dateRender: renderDateCell,
          monthCellRender: (date: DateType) => renderMonthCell(date, locale.lang),
          onSelect: handleSelect,
          mode: pickerMode,
          picker: pickerMode,
          disabledDate: isDateDisabled,
          hideHeader: true,
        })
      );
    });
  };
}