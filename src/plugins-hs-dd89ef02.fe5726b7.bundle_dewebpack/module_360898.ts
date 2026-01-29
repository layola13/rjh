interface FloorOption {
  code: number;
  name: string;
}

interface FileInfo {
  fileName: string;
  selected: boolean;
  floorLayer: number;
  [key: string]: unknown;
}

interface MatchLayerCardProps {
  isSelectValid: boolean;
  updateFileInfo: (fileInfo: FileInfo) => void;
  selectableFloors: FloorOption[];
  imgMiniURL: string;
  imgNormalURL: string;
  floorPlanName?: string;
  isDisabled: boolean;
  fileName: string;
  selected: boolean;
  floorLayer: number;
}

const POPOVER_STYLE = {
  wordBreak: "break-all" as const
};

export default function MatchLayerCard(props: MatchLayerCardProps): JSX.Element {
  const {
    isSelectValid,
    updateFileInfo,
    selectableFloors,
    imgMiniURL,
    imgNormalURL,
    floorPlanName,
    isDisabled,
    fileName,
    selected,
    floorLayer
  } = props;

  const fileNameWithoutExtension = fileName.split(".")[0];

  const cardClassName = `match-layer-matching-card ${
    selected ? "match-layer-matching-card-selected" : ""
  }`;

  const selectClassName = `select ${isSelectValid ? "" : "tp-select-invalid"}`;

  const handleCheckboxChange = (checked: boolean): void => {
    updateFileInfo({
      ...props,
      selected: checked
    });
  };

  const handleSelectChange = (value: string): void => {
    updateFileInfo({
      ...props,
      floorLayer: Number(value)
    });
  };

  const handleSelectClose = (event: unknown): void => {
    console.log(event);
  };

  const getPreviewContainer = (): HTMLElement | null => {
    return document.getElementById("match-layer-image-preview-container");
  };

  return (
    <div className={cardClassName}>
      <div className="matching-select">
        <CheckBox
          className="checkbox"
          checked={selected}
          disabled={isDisabled}
          onChange={handleCheckboxChange}
        >
          <SmartText className="filename" popoverStyle={POPOVER_STYLE}>
            {fileNameWithoutExtension}
          </SmartText>
          {floorPlanName && (
            <SmartText className="floor-plan-name">
              {floorPlanName}
            </SmartText>
          )}
        </CheckBox>
        <Select
          disabled={isDisabled}
          className={selectClassName}
          dropdownClassName="select-dropdown"
          bindSelf={true}
          value={floorLayer}
          validOptions={{ valid: true }}
          onChange={handleSelectChange}
          onClose={handleSelectClose}
        >
          {selectableFloors.map((floor) => (
            <Option key={floor.code} value={floor.code} title={floor.name}>
              {floor.name}
            </Option>
          ))}
        </Select>
      </div>
      <Image
        src={imgMiniURL}
        alt="thumbnail of parsed floor-plan in uploaded CAD files"
        preview={{
          src: imgNormalURL,
          getContainer: getPreviewContainer
        }}
        wrapperClassName="floor-thumbnail"
      />
    </div>
  );
}