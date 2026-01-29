import { PureComponent } from 'react';
import { Switch, Row, Col } from 'antd';
import { Slider } from './Slider';
import { LengthInput } from './LengthInput';
import { InfoPopover } from './InfoPopover';
import { getCurrentCamera, getCurrentFirstViewCamera, getRefreshSignal } from './utils/cameraUtils';

interface CameraClipState {
  clipValue: number;
  clipEnable: boolean;
}

interface CameraClipProps {}

interface Camera {
  near: number;
  clip: boolean;
}

interface Bound {
  width: number;
  height: number;
}

interface SliderData {
  controller: {
    onValueChanged: (value: number | CustomEvent) => void;
    onValueChangeEnd: () => void;
  };
  value: number;
  options: {
    readOnly: boolean;
    rules: {
      positiveOnly: boolean;
      range: {
        checkMax: boolean;
        checkMin: boolean;
        max: number;
        min: number;
      };
    };
  };
  inputData?: {
    className: string;
    value: number;
    onValueChange: (value: number | CustomEvent) => void;
    onValueChangeEnd: () => void;
    options: {
      unitType: string;
      displayDigits: number;
      readOnly: boolean;
      rules: {
        range: {
          min: number;
          max: number;
          checkMin: boolean;
          checkMax: boolean;
        };
        positiveOnly: boolean;
      };
    };
  };
}

interface Signal {
  listen: (callback: () => void, context: unknown) => void;
  unlisten: (callback: () => void, context: unknown) => void;
}

const CAMERA_CONSTANTS = {
  MIN_CLIP_VALUE: 1,
  MAX_CLIP_VALUE: 500
};

const USER_TRACK_ID = 'camera_clip_adjustment';

export class CameraClip extends PureComponent<CameraClipProps, CameraClipState> {
  private boundLength: number = 0;
  private signal: Signal;

  constructor(props: CameraClipProps) {
    super(props);

    this.signal = getRefreshSignal();
    this.signal.listen(this._cameraRefresh, this);
    this.onClipEnableChange = this.onClipEnableChange.bind(this);

    const camera = getCurrentFirstViewCamera();
    this.state = {
      clipValue: camera ? Number.parseInt((100 * camera.near).toString(), 10) : 1,
      clipEnable: !!camera && !!camera.clip
    };
  }

  componentWillUnmount(): void {
    this.signal.unlisten(this._cameraRefresh, this);
  }

  private _cameraRefresh = (): void => {
    const camera = getCurrentFirstViewCamera();
    this.setState({
      clipValue: camera ? Number.parseInt((100 * camera.near).toString(), 10) : 1,
      clipEnable: !!camera && !!camera.clip
    });
  };

  private onClipEnableChange = (enabled: boolean): void => {
    this.setState({ clipEnable: enabled }, () => {
      if (enabled) {
        this.onClipValueChange(this.state.clipValue);
      }
    });

    const cmdManager = HSApp.App.getApp().cmdManager;
    const camera = getCurrentCamera();
    const command = cmdManager.createCommand(HSFPConstants.CommandType.ChangeCameraClip, [camera]);
    cmdManager.execute(command);
    cmdManager.receive('update_clip_enable', { value: enabled });
    cmdManager.complete();
  };

  private onClipValueChange = (value: number | CustomEvent): void => {
    if (!this.state.clipEnable) {
      return;
    }

    let clipValue: number;
    if (value && typeof value === 'object' && 'detail' in value) {
      clipValue = value.detail.value;
    } else {
      clipValue = value as number;
    }

    clipValue = clipValue ? parseInt(clipValue.toString()) : 0;
    if (isNaN(clipValue)) {
      clipValue = 0;
    }

    this.setState({ clipValue });

    const cmdManager = HSApp.App.getApp().cmdManager;
    const camera = getCurrentCamera();
    const command = cmdManager.createCommand(HSFPConstants.CommandType.ChangeCameraClip, [camera]);
    cmdManager.execute(command);
    cmdManager.receive('update_clip_value', { value: clipValue });
    cmdManager.complete();
  };

  private onClipInputBlur = (value: number): void => {
    HSApp.App.getApp().userTrackLogger.push(
      USER_TRACK_ID,
      {
        description: `调整相机剪切:${value}`,
        activeSection: 'SparkPic.RightPanel',
        group: HSFPConstants.LogGroupTypes.SparkPic
      },
      {}
    );
  };

  private buildSliderData(value: number): SliderData {
    const bound: Bound = HSApp.App.getApp().floorplan.scene.bound;
    this.boundLength = Math.ceil(100 * Math.sqrt(Math.pow(bound.width, 2) + Math.pow(bound.height, 2)));

    const maxClipValue = this.boundLength > 500 ? this.boundLength : CAMERA_CONSTANTS.MAX_CLIP_VALUE;

    const sliderData: SliderData = {
      controller: {
        onValueChanged: this.onClipValueChange.bind(this),
        onValueChangeEnd: () => this.onClipInputBlur(value)
      },
      value: value || 0,
      options: {
        readOnly: !this.state.clipEnable,
        rules: {
          positiveOnly: true,
          range: {
            checkMax: false,
            checkMin: true,
            max: maxClipValue,
            min: CAMERA_CONSTANTS.MIN_CLIP_VALUE
          }
        }
      }
    };

    sliderData.inputData = {
      className: '',
      value: sliderData.value,
      onValueChange: sliderData.controller.onValueChanged,
      onValueChangeEnd: sliderData.controller.onValueChangeEnd,
      options: {
        unitType: ' ',
        displayDigits: 0,
        readOnly: sliderData.options.readOnly,
        rules: {
          range: {
            min: sliderData.options.rules.range.min,
            max: sliderData.options.rules.range.max,
            checkMin: sliderData.options.rules.range.checkMin,
            checkMax: sliderData.options.rules.range.checkMax
          },
          positiveOnly: sliderData.options.rules.positiveOnly
        }
      }
    };

    return sliderData;
  }

  render(): JSX.Element {
    const { clipValue, clipEnable } = this.state;
    const sliderData = this.buildSliderData(clipValue);

    return (
      <div className={`camera-clip${clipEnable ? '' : ' disable-clip'}`}>
        <div className="title" style={{ position: 'relative' }}>
          <span>{ResourceManager.getString('plugin_render_style_viewport_clip')}</span>
          <InfoPopover
            data={{
              text: 'render_camera_clip_hint',
              anchor: 'topLeft',
              items: [{ icon: require('./assets/info-icon.png'), label: '' }]
            }}
          />
          <Switch
            className="camera-clip-switch"
            checked={clipEnable}
            onChange={this.onClipEnableChange}
          />
        </div>
        {clipEnable && (
          <div className="content camera-clip-slider">
            <Row>
              <Col span={15}>
                <div className="slide-name">
                  {ResourceManager.getString('render_camera_clip_depth_without_unittype')}
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={24} className="camera-clip-slider-container">
                <Slider
                  min={sliderData.options.rules.range.min}
                  max={sliderData.options.rules.range.max}
                  step={1}
                  value={clipValue}
                  onChange={sliderData.controller.onValueChanged}
                  onAfterChange={sliderData.controller.onValueChangeEnd}
                  tooltipVisible={false}
                  sliderHandleMaskColor="#6B6C6D"
                />
                <LengthInput data={sliderData.inputData!} />
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}