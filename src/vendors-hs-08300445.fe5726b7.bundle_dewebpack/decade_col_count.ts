export const DECADE_COL_COUNT = 3;

interface DecadePanelBodyProps<DateType> {
  prefixCls: string;
  viewDate: DateType;
  generateConfig: GenerateConfig<DateType>;
  locale?: Locale;
  onSelect?: (date: DateType) => void;
}

interface GenerateConfig<DateType> {
  getYear(date: DateType): number;
  setYear(date: DateType, year: number): DateType;
  addYear(date: DateType, diff: number): DateType;
}

interface Locale {
  // Define locale properties as needed
}

const DECADE_UNIT_DIFF = 10;
const DECADE_DISTANCE_COUNT = 100;

function DecadePanelBody<DateType>(props: DecadePanelBodyProps<DateType>): JSX.Element {
  const decadeUnitDiff = DECADE_UNIT_DIFF - 1;
  const { prefixCls, viewDate, generateConfig } = props;
  const cellPrefixCls = `${prefixCls}-cell`;
  
  const currentYear = generateConfig.getYear(viewDate);
  const startDecade = Math.floor(currentYear / DECADE_UNIT_DIFF) * DECADE_UNIT_DIFF;
  const startCentury = Math.floor(currentYear / DECADE_DISTANCE_COUNT) * DECADE_DISTANCE_COUNT;
  const endCentury = startCentury + DECADE_DISTANCE_COUNT - 1;
  
  const baseYear = startCentury - Math.ceil((4 * DECADE_COL_COUNT * DECADE_UNIT_DIFF - DECADE_DISTANCE_COUNT) / 2);
  const baseDate = generateConfig.setYear(viewDate, baseYear);

  const getCellText = (date: DateType): string => {
    const year = generateConfig.getYear(date);
    return `${year}-${year + decadeUnitDiff}`;
  };

  const getCellClassName = (date: DateType): Record<string, boolean> => {
    const startYear = generateConfig.getYear(date);
    const endYear = startYear + decadeUnitDiff;
    
    return {
      [`${cellPrefixCls}-in-view`]: startCentury <= startYear && endYear <= endCentury,
      [`${cellPrefixCls}-selected`]: startYear === startDecade,
    };
  };

  const getCellDate = (baseDate: DateType, offset: number): DateType => {
    return generateConfig.addYear(baseDate, offset * DECADE_UNIT_DIFF);
  };

  return (
    <PanelBody
      {...props}
      rowNum={4}
      colNum={DECADE_COL_COUNT}
      baseDate={baseDate}
      getCellText={getCellText}
      getCellClassName={getCellClassName}
      getCellDate={getCellDate}
    />
  );
}

export default DecadePanelBody;