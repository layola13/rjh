export enum ValidatorStatus {
  default = "default",
  valid = "valid",
  invalid = "invalid"
}

interface ValidatorIndicatorProps {
  status: ValidatorStatus;
  description: string;
}

interface ValidatorProps {
  isFirstFloorSelected: boolean;
  isOneFileForOneLayer: boolean;
  isFloorsContinuous: boolean;
  isInSelectRange: boolean;
  enabled: boolean;
}

const STATUS_COLORS: Record<ValidatorStatus, string> = {
  [ValidatorStatus.default]: "#D1D1D1",
  [ValidatorStatus.valid]: "#48CAB3",
  [ValidatorStatus.invalid]: "#EA5D46"
};

const STATUS_ICONS: Record<ValidatorStatus, string> = {
  [ValidatorStatus.default]: "hs_zhanshi_chenggong",
  [ValidatorStatus.valid]: "hs_zhanshi_chenggong",
  [ValidatorStatus.invalid]: "hs_zhanshi_shibai"
};

function ValidatorIndicator(props: ValidatorIndicatorProps): JSX.Element {
  const { status, description } = props;

  const renderIcon = (iconStatus: ValidatorStatus): JSX.Element => {
    return (
      <IconfontView
        customClass="validator-icon"
        showType={STATUS_ICONS[iconStatus]}
        customStyle={{
          color: STATUS_COLORS[iconStatus],
          fontSize: "16px"
        }}
      />
    );
  };

  return (
    <div className={`indicator indicator-${status}`}>
      {renderIcon(status)}
      <span>{description}</span>
    </div>
  );
}

export default function MatchLayerValidator(props: ValidatorProps): JSX.Element {
  const {
    isFirstFloorSelected,
    isOneFileForOneLayer,
    isFloorsContinuous,
    isInSelectRange,
    enabled
  } = props;

  const firstFloorStatus = enabled
    ? isFirstFloorSelected
      ? ValidatorStatus.valid
      : ValidatorStatus.invalid
    : ValidatorStatus.default;

  const oneFileForOneLayerStatus = enabled
    ? isOneFileForOneLayer
      ? ValidatorStatus.valid
      : ValidatorStatus.invalid
    : ValidatorStatus.default;

  const floorsContinuousStatus = enabled
    ? isFloorsContinuous
      ? ValidatorStatus.valid
      : ValidatorStatus.invalid
    : ValidatorStatus.default;

  const inSelectRangeStatus = enabled
    ? isInSelectRange
      ? ValidatorStatus.valid
      : ValidatorStatus.invalid
    : ValidatorStatus.default;

  return (
    <div className="match-layer-validator">
      <div className="validator-col">
        <ValidatorIndicator
          status={firstFloorStatus}
          description={ResourceManager.getString("plugin_cadunderlay_mld_validator_selected_1f")}
        />
        <ValidatorIndicator
          status={floorsContinuousStatus}
          description={ResourceManager.getString("plugin_cadunderlay_mld_no_absent")}
        />
      </div>
      <div className="validator-col">
        <ValidatorIndicator
          status={oneFileForOneLayerStatus}
          description={ResourceManager.getString("plugin_cadunderlay_mld_validator_one_for_one")}
        />
        <ValidatorIndicator
          status={inSelectRangeStatus}
          description={ResourceManager.getString("plugin_cadunderlay_mld_validator_in_range")}
        />
      </div>
    </div>
  );
}