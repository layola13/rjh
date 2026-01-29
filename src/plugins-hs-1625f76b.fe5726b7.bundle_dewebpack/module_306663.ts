interface MoldingState {
  width: number;
  height: number;
  moldingPath: string;
  offsetX: number;
  offsetY: number;
  profileSizeX: number;
  profileSizeY: number;
}

interface ProfileData {
  contentType?: string;
  seekId?: string;
}

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

interface Entity {
  metadata: {
    parameters: Record<string, CeilingParameter>;
  };
}

interface CeilingParameter {
  offsetX?: number;
  offsetY?: number;
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

interface MoldingFieldChangeEvent {
  data: {
    offsetX?: number;
    offsetY?: number;
  };
}

interface MoldingLocationProps {
  data: MoldingData;
  entity: Entity;
  isSmartMolding: boolean;
  isXYFlip: boolean;
  moldingId: string;
  ceilingProfileType: string;
  moldingFieldChangeSignal: {
    listen: (callback: (event: MoldingFieldChangeEvent) => void) => void;
    unlisten: (callback: (event: MoldingFieldChangeEvent) => void) => void;
  };
  needReverse: boolean;
}

interface App {
  cmdManager: CommandManager;
}

interface CommandManager {
  createCommand: (type: string, args: unknown[]) => unknown;
  execute: (command: unknown) => void;
  receive: (event: string, data?: unknown) => void;
  complete: () => void;
}

declare const HSApp: {
  App: {
    getApp: () => App;
  };
};

declare const HSFPConstants: {
  CommandType: {
    EditParametricCeiling: string;
    EditCustomizedMolding: string;
  };
};

declare const HSCatalog: {
  ContentType: new (type: string) => ContentType;
  ContentTypeEnum: {
    Baseboard: string;
    Decoline: string;
  };
};

interface ContentType {
  isTypeOf: (type: string) => boolean;
}

declare const _: {
  cloneDeep: <T>(value: T) => T;
};

declare const React: {
  Component: new <P, S>(props: P) => {
    props: P;
    state: S;
    setState: (state: Partial<S>) => void;
    render: () => React.ReactElement;
  };
  createElement: (
    type: string | React.ComponentType,
    props?: Record<string, unknown> | null,
    ...children: React.ReactNode[]
  ) => React.ReactElement;
};

export default class MoldingLocation extends React.Component<MoldingLocationProps, MoldingState> {
  private app: App;
  private cmdMgr: CommandManager;
  private profileData: ProfileData;
  private dirSelectedItem: number;
  private mirSelectedUtem: number;

  constructor(props: MoldingLocationProps) {
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

  private _renderMoldingLocation(): React.ReactElement {
    const horizontalPath = `M${-80}, ${0} L${80}, ${0} M${77}, ${2} L${80}, ${0}, L${77}, ${-2}Z`;
    const verticalPath = `M${0}, ${80} L${0}, ${-80} M${-2}, ${-77} L${0}, ${-80} L${2}, ${-77}Z`;

    return React.createElement(
      'g',
      {
        stroke: 'rgb(151, 151, 151)',
        strokeWidth: '1',
      },
      React.createElement('path', { d: horizontalPath }),
      React.createElement('path', { d: verticalPath })
    );
  }

  private _renderMoldingIcon(): React.ReactElement {
    let iconWidth: number;
    let iconHeight: number;
    const aspectRatio = this.state.height / this.state.width;

    if (this.state.width >= this.state.height) {
      iconWidth = 36;
      iconHeight = 36 * aspectRatio;
    } else {
      iconHeight = 36;
      iconWidth = 36 / aspectRatio;
    }

    const scaleX = this.mirSelectedUtem === 1 ? -iconWidth : iconWidth;
    let scaleY = this.dirSelectedItem === 1 ? -iconHeight : iconHeight;

    if (this.profileData.contentType) {
      const contentType = new HSCatalog.ContentType(this.profileData.contentType);
      if (contentType && (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Baseboard) || contentType.isTypeOf(HSCatalog.ContentTypeEnum.Decoline))) {
        scaleY = this.dirSelectedItem === 1 ? iconHeight : -iconHeight;
      }
    }

    const scaleFactorX = Math.abs(scaleX) / (1000 * this.state.width);
    const scaleFactorY = Math.abs(scaleY) / (1000 * this.state.height);
    const translateX = scaleFactorX * this.state.offsetX;
    const translateY = scaleFactorY * this.state.offsetY;

    const seekId = this.props.data.profileData.seekId;
    let pathData = '';

    const isSpecialProfile =
      seekId === '94373f9a-589d-46bd-b62d-6f881d551992' ||
      seekId === '596c5b90-895f-4c53-883f-97d4cd2985b1';

    pathData = `${this.state.moldingPath}${isSpecialProfile ? 'Z' : 'L0.0, 0.0Z'}`;

    return React.createElement(
      'g',
      {
        stroke: 'rgb(151, 151, 151)',
        strokeWidth: '0.05',
        fill: 'none',
        transform: `translate(${translateX}, ${translateY}) scale(${scaleX}, ${scaleY})`,
      },
      React.createElement('path', {
        d: pathData,
        style: {
          transform: 'rotate(90deg)',
        },
      })
    );
  }

  render(): React.ReactElement {
    const { entity, isSmartMolding, isXYFlip, moldingId, ceilingProfileType, data } = this.props;

    this.dirSelectedItem = (isSmartMolding && !isXYFlip ? data.flipHorizontal : data.flipNormal) ? 1 : 0;
    this.mirSelectedUtem = (isSmartMolding && !isXYFlip ? data.flipNormal : data.flipHorizontal) ? 1 : 0;

    const sliderXData: SliderData = {
      value: this.state.offsetX || 0,
      className: ' mold-panel-slider-bar',
      options: {
        rules: {
          range: {
            max: 400,
            min: -400,
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
        this.cmdMgr.receive('ceilingchangebegin');
      },
      onValueChange: (value: number) => {
        let adjustedValue = value;
        const threshold = Math.min(200 * this.state.width, 10);

        if (Math.abs(adjustedValue) < threshold && adjustedValue !== 0) {
          adjustedValue = 0;
        }

        this.setState({ offsetX: adjustedValue });

        const offsetValue = adjustedValue / 10;

        if (isSmartMolding) {
          const parameters = _.cloneDeep(entity.metadata.parameters);
          const param = parameters[ceilingProfileType];
          if (param) {
            if (isXYFlip) {
              param.offsetX = offsetValue;
            } else {
              param.offsetY = offsetValue;
            }
          }
          this.cmdMgr.receive('ceilingchanging', { parameters });
        } else {
          this.cmdMgr.receive('ceilingchanging', { offsetX: offsetValue });
        }
      },
      onValueChangeEnd: (value: number) => {
        const offsetValue = value / 10;

        if (isSmartMolding) {
          const parameters = _.cloneDeep(entity.metadata.parameters);
          const param = parameters[ceilingProfileType];
          if (param) {
            if (isXYFlip) {
              param.offsetX = offsetValue;
            } else {
              param.offsetY = offsetValue;
            }
          }
          this.cmdMgr.receive('ceilingchangeend', { parameters });
        } else {
          this.cmdMgr.receive('ceilingchangeend');
        }
        this.cmdMgr.complete();
      },
    };

    const sliderYData: SliderData = {
      value: this.state.offsetY,
      className: ' mold-panel-slider-bar',
      options: {
        rules: {
          range: {
            max: 400,
            min: -400,
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
        this.cmdMgr.receive('ceilingchangebegin');
      },
      onValueChange: (value: number) => {
        let adjustedValue = value;
        const threshold = Math.min(200 * this.state.height, 10);

        if (Math.abs(adjustedValue) < threshold && adjustedValue !== 0) {
          adjustedValue = 0;
        }

        this.setState({ offsetY: adjustedValue });

        const offsetValue = -adjustedValue / 10;

        if (isSmartMolding) {
          const parameters = _.cloneDeep(entity.metadata.parameters);
          const param = parameters[ceilingProfileType];
          if (param) {
            if (isXYFlip) {
              param.offsetY = offsetValue;
            } else {
              param.offsetX = offsetValue;
            }
          }
          this.cmdMgr.receive('ceilingchanging', { parameters });
        } else {
          this.cmdMgr.receive('ceilingchanging', { offsetY: offsetValue });
        }
      },
      onValueChangeEnd: (value: number) => {
        const offsetValue = -value / 10;

        if (isSmartMolding) {
          const parameters = _.cloneDeep(entity.metadata.parameters);
          const param = parameters[ceilingProfileType];
          if (param) {
            if (isXYFlip) {
              param.offsetY = offsetValue;
            } else {
              param.offsetX = offsetValue;
            }
          }
          this.cmdMgr.receive('ceilingchangeend', { parameters });
        } else {
          this.cmdMgr.receive('ceilingchangeend');
        }
        this.cmdMgr.complete();
      },
    };

    return React.createElement(
      'div',
      { className: 'panel-body panel-molding-body' },
      React.createElement(
        'div',
        { className: 'panel-molding-context' },
        React.createElement(
          'div',
          { className: 'panel-molding-contnt' },
          React.createElement(
            'div',
            { className: 'panel-molding-location' },
            React.createElement(
              'svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                version: '1.1',
                style: {
                  width: '160',
                  height: '160',
                },
                viewBox: '-80 -80 160 160',
              },
              this._renderMoldingLocation(),
              this._renderMoldingIcon()
            )
          ),
          React.createElement(
            'div',
            { className: 'panel-molding-slider-x' },
            React.createElement('SliderX', { data: sliderXData })
          ),
          React.createElement(
            'div',
            { className: 'panel-molding-slider-y' },
            React.createElement('SliderY', { data: sliderYData })
          )
        )
      )
    );
  }
}