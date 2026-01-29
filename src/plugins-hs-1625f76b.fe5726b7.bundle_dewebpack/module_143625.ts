import React from 'react';

interface ProfileData {
  contentType?: string;
  seekId?: string;
}

interface MoldingData {
  profileWidth: number;
  profileHeight: number;
  profile: string;
  offsetX: number;
  offsetY: number;
  profileSizeX: number;
  profileSizeY: number;
  profileData: ProfileData;
  flipVertical: boolean;
  flipHorizontal: boolean;
}

interface CorrectedParameter {
  offsetX: number;
  offsetY: number;
}

interface MoldingPanelProps {
  data: MoldingData;
  molding: unknown;
  correctedParameter: CorrectedParameter;
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

interface SliderOptions {
  rules: {
    range: {
      max: number;
      min: number;
    };
  };
  readOnly: boolean;
}

interface SliderData {
  value: number;
  className: string;
  options: SliderOptions;
  onValueChangeStart: () => void;
  onValueChange: (value: number) => void;
  onValueChangeEnd: (value: number) => void;
}

const OFFSET_RANGE_MAX = 200;
const OFFSET_RANGE_MIN = -200;
const SCALE_FACTOR = 1000;
const MOLDING_ICON_SIZE = 36;
const ARROW_SIZE = 80;
const ARROW_TIP_SIZE = 77;
const ARROW_TIP_OFFSET = 2;
const VIEWPORT_SIZE = 160;
const VIEWPORT_CENTER = 80;
const BASEBOARD_SEEK_ID = '94373f9a-589d-46bd-b62d-6f881d551992';
const DECOLINE_SEEK_ID = '596c5b90-895f-4c53-883f-97d4cd2985b1';

class MoldingPanel extends React.Component<MoldingPanelProps, MoldingPanelState> {
  private app: any;
  private cmdMgr: any;
  private profileData: ProfileData;
  private dirSelectedItem: number;
  private mirSelectedUtem: number;

  constructor(props: MoldingPanelProps) {
    super(props);

    this.app = (window as any).HSApp?.App?.getApp();
    this.cmdMgr = this.app?.cmdManager;
    this.profileData = props.data.profileData;
    this.dirSelectedItem = props.data.flipVertical ? 1 : 0;
    this.mirSelectedUtem = props.data.flipHorizontal ? 1 : 0;

    this.state = {
      width: props.data.profileWidth,
      height: props.data.profileHeight,
      moldingPath: props.data.profile,
      offsetX: SCALE_FACTOR * props.data.offsetX,
      offsetY: SCALE_FACTOR * -props.data.offsetY,
      profileSizeX: props.data.profileSizeX,
      profileSizeY: props.data.profileSizeY,
    };
  }

  private _renderMoldingLocation(): JSX.Element {
    const horizontalArrow = `M${-ARROW_SIZE}, ${0} L${ARROW_SIZE}, ${0} M${ARROW_TIP_SIZE}, ${ARROW_TIP_OFFSET} L${ARROW_SIZE}, ${0}, L${ARROW_TIP_SIZE}, ${-ARROW_TIP_OFFSET}Z`;
    const verticalArrow = `M${0}, ${ARROW_SIZE} L${0}, ${-ARROW_SIZE} M${-ARROW_TIP_OFFSET}, ${-ARROW_TIP_SIZE} L${0}, ${-ARROW_SIZE} L${ARROW_TIP_OFFSET}, ${-ARROW_TIP_SIZE}Z`;

    return (
      <g stroke="rgb(151, 151, 151)" strokeWidth="1">
        <path d={horizontalArrow} />
        <path d={verticalArrow} />
      </g>
    );
  }

  private _renderMoldingIcon(): JSX.Element {
    const aspectRatio = this.state.height / this.state.width;
    let iconWidth = 0;
    let iconHeight = 0;

    if (this.state.width >= this.state.height) {
      iconWidth = MOLDING_ICON_SIZE;
      iconHeight = MOLDING_ICON_SIZE * aspectRatio;
    } else {
      iconHeight = MOLDING_ICON_SIZE;
      iconWidth = MOLDING_ICON_SIZE / aspectRatio;
    }

    const mirroredWidth = this.mirSelectedUtem === 1 ? -iconWidth : iconWidth;
    let directedHeight = this.dirSelectedItem === 1 ? -iconHeight : iconHeight;

    const contentType = this.profileData.contentType;
    if (contentType) {
      const contentTypeObj = new (window as any).HSCatalog.ContentType(contentType);
      const isBaseboard = contentTypeObj?.isTypeOf((window as any).HSCatalog.ContentTypeEnum.Baseboard);
      const isDecoline = contentTypeObj?.isTypeOf((window as any).HSCatalog.ContentTypeEnum.Decoline);
      
      if (contentTypeObj && (isBaseboard || isDecoline)) {
        directedHeight = this.dirSelectedItem === 1 ? iconHeight : -iconHeight;
      }
    }

    const scaleX = Math.abs(mirroredWidth) / (SCALE_FACTOR * this.state.width);
    const scaleY = Math.abs(directedHeight) / (SCALE_FACTOR * this.state.height);
    const translateX = scaleX * this.state.offsetX;
    const translateY = scaleY * this.state.offsetY;

    const seekId = this.props.data.profileData.seekId;
    const isSpecialProfile = seekId === BASEBOARD_SEEK_ID || seekId === DECOLINE_SEEK_ID;
    const pathData = `${this.state.moldingPath}${isSpecialProfile ? 'Z' : 'L0.0, 0.0Z'}`;

    return (
      <g
        stroke="rgb(151, 151, 151)"
        strokeWidth="0.05"
        fill="none"
        transform={`translate(${translateX}, ${translateY}) scale(${mirroredWidth}, ${directedHeight})`}
      >
        <path d={pathData} style={{ transform: 'rotate(0deg)' }} />
      </g>
    );
  }

  render(): JSX.Element {
    const { molding, data, correctedParameter } = this.props;

    this.dirSelectedItem = data.flipVertical ? 1 : 0;
    this.mirSelectedUtem = data.flipHorizontal ? 1 : 0;

    const horizontalSliderData: SliderData = {
      value: this.state.offsetX || 0,
      className: ' mold-panel-slider-bar',
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
        const command = this.cmdMgr.createCommand(
          (window as any).HSFPConstants.CommandType.EditNCustomizedMolding,
          [molding]
        );
        this.cmdMgr.execute(command);
      },
      onValueChange: (value: number) => {
        let adjustedValue = value;
        const threshold = Math.min(OFFSET_RANGE_MAX * this.state.width, 10);
        
        if (Math.abs(adjustedValue) < threshold && adjustedValue !== 0) {
          adjustedValue = 0;
        }

        this.setState({ offsetX: adjustedValue });

        const offsetX = adjustedValue / SCALE_FACTOR + correctedParameter.offsetX;
        this.cmdMgr.receive('onParametersChange', { offsetX });
      },
      onValueChangeEnd: (value: number) => {
        const offsetX = value / SCALE_FACTOR + correctedParameter.offsetX;
        this.cmdMgr.receive('onParametersChangeEnd', { offsetX });
        this.cmdMgr.complete();
      },
    };

    const verticalSliderData: SliderData = {
      value: this.state.offsetY,
      className: ' mold-panel-slider-bar',
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
        const command = this.cmdMgr.createCommand(
          (window as any).HSFPConstants.CommandType.EditNCustomizedMolding,
          [molding]
        );
        this.cmdMgr.execute(command);
      },
      onValueChange: (value: number) => {
        let adjustedValue = value;
        const threshold = Math.min(OFFSET_RANGE_MAX * this.state.height, 10);
        
        if (Math.abs(adjustedValue) < threshold && adjustedValue !== 0) {
          adjustedValue = 0;
        }

        this.setState({ offsetY: adjustedValue });

        const offsetY = -adjustedValue / SCALE_FACTOR;
        this.cmdMgr.receive('onParametersChange', { offsetY });
      },
      onValueChangeEnd: (value: number) => {
        const offsetY = -value / SCALE_FACTOR;
        this.cmdMgr.receive('onParametersChangeEnd', { offsetY });
        this.cmdMgr.complete();
      },
    };

    const SliderBarX = (window as any).c?.default;
    const SliderBarY = (window as any).u?.default;

    return (
      <div className="panel-body panel-molding-body">
        <div className="panel-molding-context">
          <div className="panel-molding-contnt">
            <div className="panel-molding-location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                style={{ width: '160', height: '160' }}
                viewBox={`-${VIEWPORT_CENTER} -${VIEWPORT_CENTER} ${VIEWPORT_SIZE} ${VIEWPORT_SIZE}`}
              >
                {this._renderMoldingLocation()}
                {this._renderMoldingIcon()}
              </svg>
            </div>
            <div className="panel-molding-slider-x">
              <SliderBarX data={horizontalSliderData} />
            </div>
            <div className="panel-molding-slider-y">
              <SliderBarY data={verticalSliderData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoldingPanel;