interface FilterProps {
  bedRoomRange: string;
  grossAreaRange: string;
  dialogStatus: string;
  onClickFilterHouseStyle: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onClickFilterHouseArea: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

interface FilterState {
  bedRoomRange: string;
  grossAreaRange: string;
  dialogStatus: string;
}

type BedRoomRangeType = "to" | "1to1" | "2to2" | "3to3" | "4to4" | "5to";
type GrossAreaRangeType = "to" | "0to60" | "60to80" | "80to120" | "120to150" | "150to";

const BED_ROOM_RANGES: BedRoomRangeType[] = ["to", "1to1", "2to2", "3to3", "4to4", "5to"];
const GROSS_AREA_RANGES: GrossAreaRangeType[] = ["to", "0to60", "60to80", "80to120", "120to150", "150to"];
const AREA_LABELS = ["", "60㎡", "60-80㎡", "80-120㎡", "120-150㎡", "150㎡"];

const DIALOG_STATUS_RESULT = "result";
const FIRST_INDEX = 0;

declare const ResourceManager: {
  getString(key: string): string;
};

export default class FpCollectionFilter extends React.Component<FilterProps, FilterState> {
  static defaultProps: Partial<FilterProps> = {
    bedRoomRange: "to",
    grossAreaRange: "to",
    dialogStatus: "init"
  };

  constructor(props: FilterProps) {
    super(props);
    this.state = {
      bedRoomRange: props.bedRoomRange,
      grossAreaRange: props.grossAreaRange,
      dialogStatus: props.dialogStatus
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: FilterProps): void {
    this.setState({
      bedRoomRange: nextProps.bedRoomRange,
      grossAreaRange: nextProps.grossAreaRange,
      dialogStatus: nextProps.dialogStatus
    });
  }

  render(): React.ReactElement {
    return (
      <div className="fpcollection-filter">
        <div className="house-style">
          <span className="house-style-title">
            {ResourceManager.getString("plugin_fpCollection_filter_house_style")}
          </span>
          <span className="house-style-filter">
            {BED_ROOM_RANGES.map((rangeValue, index) => {
              const isFirstItem = index === FIRST_INDEX;
              let className = isFirstItem ? "house-style-all" : "house-style-filter-item";
              const label = isFirstItem
                ? ResourceManager.getString("plugin_fpCollection_filter_all")
                : ResourceManager.getString(`plugin_fpCollection_filter_house_style${index}`);

              if (
                rangeValue === this.state.bedRoomRange &&
                this.state.dialogStatus === DIALOG_STATUS_RESULT
              ) {
                className += " selected";
              }

              return (
                <span
                  key={rangeValue}
                  className={className}
                  id={`house-style-${rangeValue}`}
                  onClick={this.props.onClickFilterHouseStyle}
                >
                  {label}
                </span>
              );
            })}
          </span>
        </div>

        <div className="house-area">
          <span className="house-area-title">
            {ResourceManager.getString("plugin_fpCollection_filter_house_area")}
          </span>
          <span className="house-area-filter">
            {GROSS_AREA_RANGES.map((rangeValue, index, array) => {
              const isFirstItem = index === FIRST_INDEX;
              const isLastItem = index === array.length - 1;
              let className = isFirstItem ? "house-area-all" : "house-area-filter-item";
              let label = isFirstItem
                ? ResourceManager.getString("plugin_fpCollection_filter_all")
                : AREA_LABELS[index];

              if (index === 1) {
                label += ResourceManager.getString("plugin_fpCollection_filter_house_area_under");
              } else if (isLastItem) {
                label += ResourceManager.getString("plugin_fpCollection_filter_house_area_above");
              }

              if (
                rangeValue === this.state.grossAreaRange &&
                this.state.dialogStatus === DIALOG_STATUS_RESULT
              ) {
                className += " selected";
              }

              return (
                <span
                  key={rangeValue}
                  className={className}
                  id={`house-area-${rangeValue}`}
                  onClick={this.props.onClickFilterHouseArea}
                >
                  {label}
                </span>
              );
            })}
          </span>
        </div>
      </div>
    );
  }
}