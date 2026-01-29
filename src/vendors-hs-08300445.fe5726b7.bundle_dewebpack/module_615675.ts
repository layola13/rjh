import { useContext } from 'react';
import type { GenerateConfig } from './generate';
import type { Locale } from './interface';
import type { NullableDateType } from './interface';
import { getWeekStartDate, WEEK_DAY_COUNT, isSameDate, isSameMonth, formatValue } from './dateUtils';
import PanelContext from './PanelContext';
import useCellClassName from './useCellClassName';
import PanelBody from './PanelBody';

interface DateBodyProps<DateType> {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  prefixColumn?: boolean;
  locale: Locale;
  rowCount: number;
  viewDate: DateType;
  value?: NullableDateType<DateType>;
  dateRender?: (date: DateType, today: DateType) => React.ReactNode;
}

interface PanelContextValue<DateType> {
  rangedValue?: [NullableDateType<DateType>, NullableDateType<DateType>] | null;
  hoverRangedValue?: [NullableDateType<DateType>, NullableDateType<DateType>] | null;
}

export default function DateBody<DateType>(props: DateBodyProps<DateType>): JSX.Element {
  const {
    prefixCls,
    generateConfig,
    prefixColumn,
    locale,
    rowCount,
    viewDate,
    value,
    dateRender
  } = props;

  const { rangedValue, hoverRangedValue } = useContext<PanelContextValue<DateType>>(PanelContext);

  const weekStartDate = getWeekStartDate(locale.locale, generateConfig, viewDate);
  const cellPrefixCls = `${prefixCls}-cell`;
  const weekFirstDay = generateConfig.locale.getWeekFirstDay(locale.locale);
  const today = generateConfig.getNow();

  const headerCells: React.ReactElement[] = [];
  const shortWeekDays = locale.shortWeekDays || 
    (generateConfig.locale.getShortWeekDays 
      ? generateConfig.locale.getShortWeekDays(locale.locale) 
      : []);

  if (prefixColumn) {
    headerCells.push(
      <th key="empty" aria-label="empty cell" />
    );
  }

  for (let index = 0; index < WEEK_DAY_COUNT; index += 1) {
    headerCells.push(
      <th key={index}>
        {shortWeekDays[(index + weekFirstDay) % WEEK_DAY_COUNT]}
      </th>
    );
  }

  const getCellClassName = useCellClassName({
    cellPrefixCls,
    today,
    value,
    generateConfig,
    rangedValue: prefixColumn ? null : rangedValue,
    hoverRangedValue: prefixColumn ? null : hoverRangedValue,
    isSameCell: (current: DateType, target: DateType) => isSameDate(generateConfig, current, target),
    isInView: (date: DateType) => isSameMonth(generateConfig, date, viewDate),
    offsetCell: (date: DateType, offset: number) => generateConfig.addDate(date, offset)
  });

  const getCellNode = dateRender 
    ? (date: DateType) => dateRender(date, today) 
    : undefined;

  const titleCell = (date: DateType): string => {
    return formatValue(date, {
      locale,
      format: 'YYYY-MM-DD',
      generateConfig
    });
  };

  return (
    <PanelBody
      {...props}
      rowNum={rowCount}
      colNum={WEEK_DAY_COUNT}
      baseDate={weekStartDate}
      getCellNode={getCellNode}
      getCellText={generateConfig.getDate}
      getCellClassName={getCellClassName}
      getCellDate={generateConfig.addDate}
      titleCell={titleCell}
      headerCells={headerCells}
    />
  );
}