export const DECADE_UNIT_DIFF = 10;
export const DECADE_DISTANCE_COUNT = 10 * DECADE_UNIT_DIFF;

interface GenerateConfig<DateType> {
  addYear(date: DateType, amount: number): DateType;
}

interface OperationRef {
  onKeyDown(event: React.KeyboardEvent): boolean;
}

interface DecadePanelProps<DateType> {
  prefixCls: string;
  onViewDateChange(date: DateType): void;
  generateConfig: GenerateConfig<DateType>;
  viewDate: DateType;
  operationRef: React.MutableRefObject<OperationRef>;
  onSelect(date: DateType, source: 'key' | 'mouse'): void;
  onPanelChange(mode: 'year' | null, date: DateType): void;
}

const DECADE_COL_COUNT = 3;

function DecadePanel<DateType>(props: DecadePanelProps<DateType>): React.ReactElement {
  const {
    prefixCls,
    onViewDateChange,
    generateConfig,
    viewDate,
    operationRef,
    onSelect,
    onPanelChange,
  } = props;

  const panelPrefixCls = `${prefixCls}-decade-panel`;

  operationRef.current = {
    onKeyDown(event: React.KeyboardEvent): boolean {
      return createKeyDownHandler(event, {
        onLeftRight(offset: number): void {
          onSelect(generateConfig.addYear(viewDate, offset * DECADE_UNIT_DIFF), 'key');
        },
        onCtrlLeftRight(offset: number): void {
          onSelect(generateConfig.addYear(viewDate, offset * DECADE_DISTANCE_COUNT), 'key');
        },
        onUpDown(offset: number): void {
          onSelect(generateConfig.addYear(viewDate, offset * DECADE_UNIT_DIFF * DECADE_COL_COUNT), 'key');
        },
        onEnter(): void {
          onPanelChange('year', viewDate);
        },
      });
    },
  };

  const handleDecadeChange = (offset: number): void => {
    const newDate = generateConfig.addYear(viewDate, offset * DECADE_DISTANCE_COUNT);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  return (
    <div className={panelPrefixCls}>
      <DecadeHeader
        {...props}
        prefixCls={prefixCls}
        onPrevDecades={() => handleDecadeChange(-1)}
        onNextDecades={() => handleDecadeChange(1)}
      />
      <DecadeBody
        {...props}
        prefixCls={prefixCls}
        onSelect={(date: DateType) => {
          onSelect(date, 'mouse');
          onPanelChange('year', date);
        }}
      />
    </div>
  );
}

export default DecadePanel;