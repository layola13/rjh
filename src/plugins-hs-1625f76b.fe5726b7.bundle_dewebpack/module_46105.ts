interface MoldingData {
  profileHeight: number;
  profileWidth: number;
  profile: string;
  offsetX: number;
  offsetY: number;
  profileSizeX: number;
  profileSizeY: number;
  profileData: ProfileData;
  flipNormal: boolean;
  flipHorizontal: boolean;
}

interface ProfileData {
  contentType?: string;
  seekId: string;
}

interface MoldingPanelProps {
  data: MoldingData;
  entity: HSEntity;
  isSmartMolding: boolean;
  isXYFlip: boolean;
  moldingId: string;
  ceilingProfileType: string;
  moldingFieldChangeSignal: Signal<MoldingFieldChangeEvent>;
  needReverse: boolean;
}

interface MoldingPanelState {
  width: number;
  height: number;
  moldingPath: string;
  offsetX: number;
  offsetY: number;
  profileSizeX: number;
  profileSizeY: number;
}

interface MoldingFieldChangeEvent {
  data: {
    offsetX?: number;
    offsetY?: number;
  };
}

interface HSEntity {
  metadata: {
    parameters: Record<string, CeilingParameters>;
  };
}

interface CeilingParameters {
  offsetX?: number;
  offsetY?: number;
}

interface HSApp {
  App: {
    getApp(): AppInstance;
  };
}

interface AppInstance {
  cmdManager: CommandManager;
}

interface CommandManager {
  createCommand(type: string, args: unknown[]): Command;
  execute(command: Command): void;
  receive(event: string, data?: unknown): void;
  complete(): void;
}

interface Command {}

interface Signal<T> {
  listen(callback: (event: T) => void): void;
  unlisten(callback: (event: T) => void): void;
}

interface SliderData {
  value: number;
  className: string;
  options: {
    rules: {
      range: {
        max: number;
        min: number;
      };
    };
    readOnly: boolean;
  };
  onValueChangeStart: () => void;
  onValueChange: (value: number) => void;
  onValueChangeEnd: (value: number) => void;
}

declare const HSApp: HSApp;
declare const HSFPConstants: { CommandType: Record<string, string> };
declare const HSCatalog: {
  ContentType: new (type: string) => ContentTypeInstance;
  ContentTypeEnum: {
    Baseboard: string;
    Decoline: string;
  };
};
declare const _: { cloneDeep<T>(obj: T): T };
declare const React: typeof import('react');

interface ContentTypeInstance {
  isTypeOf(type: string): boolean;
}

const AXIS_LENGTH = 80;
const ARROW_TIP_SIZE = 2;
const ARROW_BASE_OFFSET = 77;
const MAX_ICON_SIZE = 36;
const SCALE_FACTOR = 1000;
const OFFSET_RANGE_MAX = 400;
const OFFSET_RANGE_MIN = -400;
const SNAP_THRESHOLD_MULTIPLIER = 200;
const SNAP_THRESHOLD_MIN = 10;
const OFFSET_SCALE = 10;
const VIEWBOX_SIZE = 160;
const VIEWBOX_OFFSET = -80;
const SPECIAL_PROFILE_ID_1 = "94373f9a-589d-46bd-b62d-6f881d551992";
const SPECIAL_PROFILE_ID_2 = "596c5b90-895f-4c53-883f-97d4cd2985b1";

export default class MoldingPanel extends React.Component<MoldingPanelProps, MoldingPanelState> {
  private app: AppInstance;
  private cmdMgr: CommandManager;
  private profileData: ProfileData;
  private dirSelectedItem: number;
  private mirSelectedUtem: number;

  constructor(props: MoldingPanelProps) {
    super(props);

    this.state = {
      width: props.needReverse ? props.data.profileHeight : props.data.profileWidth,
      height: props.needReverse ? props.data.profileWidth : props.data.profileHeight,
      moldingPath: props.data.profile,
      offsetX: props.data.offsetX,
      offsetY: props.data.offsetY,
      profileSizeX: props.data.profileSizeX,
      profileSizeY: props.data.profileSizeY,
    };

    this.app = HSApp.App.getApp();
    this.cmdMgr = this.app.cmdManager;
    this.profileData = props.data.profileData;
    this.dirSelectedItem = props.data.flipNormal ? 1 : 0;
    this.mirSelectedUtem = props.data.flipHorizontal ? 1 : 0;

    this._onMoldingFieldChange = this._onMoldingFieldChange.bind(this);
  }

  componentDidMount(): void {
    this.props.moldingFieldChangeSignal.listen(this._onMoldingFieldChange);
  }

  componentWillUnmount(): void {
    this.props.moldingFieldChangeSignal.unlisten(this._onMoldingFieldChange);
  }

  private _onMoldingFieldChange(event: MoldingFieldChangeEvent): void {
    const { offsetX, offsetY } = event.data;

    if (offsetX) {
      this.setState({ offsetX });
    }

    if (offsetY) {
      this.setState({ offsetY: -offsetY });
    }
  }

  private _renderMoldingLocation(): JSX.Element {
    const xAxisPath = `M${-AXIS_LENGTH}, ${0} L${AXIS_LENGTH}, ${0} M${ARROW_BASE_OFFSET}, ${ARROW_TIP_SIZE} L${AXIS_LENGTH}, ${0}, L${ARROW_BASE_OFFSET}, ${-ARROW_TIP_SIZE}Z`;
    const yAxisPath = `M${0}, ${AXIS_LENGTH} L${0}, ${-AXIS_LENGTH} M${-ARROW_TIP_SIZE}, ${-ARROW_BASE_OFFSET} L${0}, ${-AXIS_LENGTH} L${ARROW_TIP_SIZE}, ${-ARROW_BASE_OFFSET}Z`;

    return React.createElement(
      "g",
      {
        stroke: "rgb(151, 151, 151)",
        strokeWidth: "1",
      },
      React.createElement("path", { d: xAxisPath }),
      React.createElement("path", { d: yAxisPath })
    );
  }

  private _renderMoldingIcon(): JSX.Element {
    let iconWidth: number;
    let iconHeight: number;
    const aspectRatio = this.state.height / this.state.width;

    if (this.state.width >= this.state.height) {
      iconWidth = MAX_ICON_SIZE;
      iconHeight = MAX_ICON_SIZE * aspectRatio;
    } else {
      iconHeight = MAX_ICON_SIZE;
      iconWidth = MAX_ICON_SIZE / aspectRatio;
    }

    const scaleX = this.mirSelectedUtem === 1 ? -iconWidth : iconWidth;
    let scaleY = this.dirSelectedItem === 1 ? -iconHeight : iconHeight;

    if (this.profileData.contentType) {
      const contentType = new HSCatalog.ContentType(this.profileData.contentType);
      if (contentType && (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Baseboard) || contentType.isTypeOf(HSCatalog.ContentTypeEnum.Decoline))) {
        scaleY = this.dirSelectedItem === 1 ? iconHeight : -iconHeight;
      }
    }

    const scaleFactorX = Math.abs(scaleX) / (SCALE_FACTOR * this.state.width);
    const scaleFactorY = Math.abs(scaleY) / (SCALE_FACTOR * this.state.height);
    const translatedOffsetX = scaleFactorX * this.state.offsetX;
    const translatedOffsetY = scaleFactorY * this.state.offsetY;
    const seekId = this.props.data.profileData.seekId;

    let pathData = "";
    if (seekId === SPECIAL_PROFILE_ID_1 || seekId === SPECIAL_PROFILE_ID_2) {
      pathData = `${this.state.moldingPath}Z`;
    } else {
      pathData = `${this.state.moldingPath}L0.0, 0.0Z`;
    }

    return React.createElement(
      "g",
      {
        stroke: "rgb(151, 151, 151)",
        strokeWidth: "0.05",
        fill: "none",
        transform: `translate(${translatedOffsetX}, ${translatedOffsetY}) scale(${scaleX}, ${scaleY})`,
      },
      React.createElement("path", {
        d: pathData,
        style: {
          transform: "rotate(90deg)",
        },
      })
    );
  }

  render(): JSX.Element {
    const { entity, isSmartMolding, isXYFlip, moldingId, ceilingProfileType, data } = this.props;

    this.dirSelectedItem = (isSmartMolding && !isXYFlip ? data.flipHorizontal : data.flipNormal) ? 1 : 0;
    this.mirSelectedUtem = (isSmartMolding && !isXYFlip ? data.flipNormal : data.flipHorizontal) ? 1 : 0;

    const xSliderData: SliderData = {
      value: this.state.offsetX || 0,
      className: " mold-panel-slider-bar",
      options: {
        rules: {
          range: {
            max: OFFSET_RANGE_MAX,
            min: OFFSET_RANGE_MIN,
          },
        },
        readOnly: false,
      },
      onValueChangeStart: () => {
        if (isSmartMolding) {
          const command = this.cmdMgr.createCommand(HSFPConstants.CommandType.EditParametricCeiling, [entity, ceilingProfileType]);
          this.cmdMgr.execute(command);
        } else {
          const command = this.cmdMgr.createCommand(HSFPConstants.CommandType.EditCustomizedMolding, [entity, moldingId]);
          this.cmdMgr.execute(command);
        }
        this.cmdMgr.receive("ceilingchangebegin");
      },
      onValueChange: (value: number) => {
        let adjustedValue = value;
        const snapThreshold = Math.min(SNAP_THRESHOLD_MULTIPLIER * this.state.width, SNAP_THRESHOLD_MIN);
        if (Math.abs(adjustedValue) < snapThreshold && adjustedValue !== 0) {
          adjustedValue = 0;
        }
        this.setState({ offsetX: adjustedValue });

        const scaledOffset = adjustedValue / OFFSET_SCALE;
        if (isSmartMolding) {
          const parameters = _.cloneDeep(entity.metadata.parameters);
          const ceilingParams = parameters[ceilingProfileType];
          if (ceilingParams) {
            if (isXYFlip) {
              ceilingParams.offsetX = scaledOffset;
            } else {
              ceilingParams.offsetY = scaledOffset;
            }
          }
          this.cmdMgr.receive("ceilingchanging", { parameters });
        } else {
          this.cmdMgr.receive("ceilingchanging", { offsetX: scaledOffset });
        }
      },
      onValueChangeEnd: (value: number) => {
        const scaledOffset = value / OFFSET_SCALE;
        if (isSmartMolding) {
          const parameters = _.cloneDeep(entity.metadata.parameters);
          const ceilingParams = parameters[ceilingProfileType];
          if (ceilingParams) {
            if (isXYFlip) {
              ceilingParams.offsetX = scaledOffset;
            } else {
              ceilingParams.offsetY = scaledOffset;
            }
          }
          this.cmdMgr.receive("ceilingchangeend", { parameters });
        } else {
          this.cmdMgr.receive("ceilingchangeend");
        }
        this.cmdMgr.complete();
      },
    };

    const ySliderData: SliderData = {
      value: this.state.offsetY,
      className: " mold-panel-slider-bar",
      options: {
        rules: {
          range: {
            max: OFFSET_RANGE_MAX,
            min: OFFSET_RANGE_MIN,
          },
        },
        readOnly: false,
      },
      onValueChangeStart: () => {
        if (isSmartMolding) {
          const command = this.cmdMgr.createCommand(HSFPConstants.CommandType.EditParametricCeiling, [entity, ceilingProfileType]);
          this.cmdMgr.execute(command);
        } else {
          const command = this.cmdMgr.createCommand(HSFPConstants.CommandType.EditCustomizedMolding, [entity, moldingId]);
          this.cmdMgr.execute(command);
        }
        this.cmdMgr.receive("ceilingchangebegin");
      },
      onValueChange: (value: number) => {
        let adjustedValue = value;
        const snapThreshold = Math.min(SNAP_THRESHOLD_MULTIPLIER * this.state.height, SNAP_THRESHOLD_MIN);
        if (Math.abs(adjustedValue) < snapThreshold && adjustedValue !== 0) {
          adjustedValue = 0;
        }
        this.setState({ offsetY: adjustedValue });

        const scaledOffset = -adjustedValue / OFFSET_SCALE;
        if (isSmartMolding) {
          const parameters = _.cloneDeep(entity.metadata.parameters);
          const ceilingParams = parameters[ceilingProfileType];
          if (ceilingParams) {
            if (isXYFlip) {
              ceilingParams.offsetY = scaledOffset;
            } else {
              ceilingParams.offsetX = scaledOffset;
            }
          }
          this.cmdMgr.receive("ceilingchanging", { parameters });
        } else {
          this.cmdMgr.receive("ceilingchanging", { offsetY: scaledOffset });
        }
      },
      onValueChangeEnd: (value: number) => {
        const scaledOffset = -value / OFFSET_SCALE;
        if (isSmartMolding) {
          const parameters = _.cloneDeep(entity.metadata.parameters);
          const ceilingParams = parameters[ceilingProfileType];
          if (ceilingParams) {
            if (isXYFlip) {
              ceilingParams.offsetY = scaledOffset;
            } else {
              ceilingParams.offsetX = scaledOffset;
            }
          }
          this.cmdMgr.receive("ceilingchangeend", { parameters });
        } else {
          this.cmdMgr.receive("ceilingchangeend");
        }
        this.cmdMgr.complete();
      },
    };

    return React.createElement(
      "div",
      { className: "panel-body panel-molding-body" },
      React.createElement(
        "div",
        { className: "panel-molding-context" },
        React.createElement(
          "div",
          { className: "panel-molding-contnt" },
          React.createElement(
            "div",
            { className: "panel-molding-location" },
            React.createElement(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                version: "1.1",
                style: {
                  width: "160",
                  height: "160",
                },
                viewBox: `${VIEWBOX_OFFSET} ${VIEWBOX_OFFSET} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`,
              },
              this._renderMoldingLocation(),
              this._renderMoldingIcon()
            )
          ),
          React.createElement(
            "div",
            { className: "panel-molding-slider-x" },
            React.createElement("div", { data: xSliderData })
          ),
          React.createElement(
            "div",
            { className: "panel-molding-slider-y" },
            React.createElement("div", { data: ySliderData })
          )
        )
      )
    );
  }
}