interface AreaOption {
  id: string;
  label: string;
  tooltipText: string;
}

interface DropdownAreaListData {
  defaultKey: string;
  options: AreaOption[];
  onChange?: (value: string) => void;
  calcArea: (key: string) => string | number;
}

interface DropdownAreaListProps {
  data: DropdownAreaListData;
}

export default function DropdownAreaList({ data }: DropdownAreaListProps): JSX.Element {
  const { defaultKey, options, onChange, calcArea } = data;

  const isImperialUnit = [
    HSCore.Util.Unit.LengthUnitTypeEnum.foot,
    HSCore.Util.Unit.LengthUnitTypeEnum.inch
  ].includes(HSApp.App.getApp().floorplan.displayLengthUnit);

  const selectedOption = options.find(option => option.id === defaultKey);

  const handleChange = (value: string): void => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="property-bar-dropdownarealist-container">
      <div>
        <Select
          className="DropDownAreaList-select"
          onChange={handleChange}
          dropdownClassName="dropdownarealist-popdom"
          hideCurrent={true}
          noBorder={true}
          tooltip={{
            text: selectedOption?.tooltipText ?? '',
            icon: "hs_shuxingmianban_xiangqing",
            hoverIcon: "hs_shuxingmianban_xiangqinghover"
          }}
          value={defaultKey}
        >
          {options?.map((option) => (
            <Option
              key={option.id}
              value={option.id}
              title={option.label}
            >
              <SmartText>{option.label}</SmartText>
            </Option>
          ))}
        </Select>
      </div>
      <div className="dropdownarealist-area">
        <SmartText className="dropdownarealist-area-value">
          {calcArea(defaultKey)}
        </SmartText>
        <SmartText className="dropdownarealist-area-unit">
          {isImperialUnit ? "ft²" : "m²"}
        </SmartText>
      </div>
    </div>
  );
}