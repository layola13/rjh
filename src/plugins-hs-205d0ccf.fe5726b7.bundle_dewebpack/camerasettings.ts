import { PureComponent } from 'react';
import React from 'react';
import { SectionalSlider } from './SectionalSlider';
import { LengthInput } from './LengthInput';
import { SliderInput } from './SliderInput';
import { DoubleSliderInput } from './DoubleSliderInput';
import { getCurrentCamera, getRefreshSignal, getCeilingLayerHeight, getString } from './cameraUtils';

interface CameraSettingsState {
  cameraElevation: number;
  cameraFOV: number;
  cameraPitch: number;
  heightRange: [number, number];
}

interface SliderControllerConfig {
  onValueChanged: (value: number | CustomEvent) => void;
}

interface SliderRangeRules {
  checkMax: boolean;
  checkMin: boolean;
  max: number;
  min: number;
}

interface SliderOptionsRules {
  positiveOnly: boolean;
  range: SliderRangeRules;
}

interface SliderOptions {
  unitType: string;
  displayDigits?: number;
  includeUnit?: boolean;
  readOnly?: boolean;
  rules: SliderOptionsRules;
  startFromMin?: boolean;
  disabledTooltip?: boolean;
}

interface SliderMarks {
  [key: number]: string;
}

interface LengthInputData {
  className: string;
  label: string;
  iconSrc: string;
  value: number;
  listValues?: unknown;
  labelPosition: string;
  onValueChangeStart: string;
  onValueChange: (value: number | CustomEvent) => void;
  options: SliderOptions;
}

interface DoubleSliderData {
  className: string;
  label: string;
  value: number;
  delay: boolean;
  onValueChangeStart: string;
  onValueChange: (value: number) => void;
  onValueChangeEnd: string;
  options: {
    readOnly: boolean;
    rules: {
      range: {
        min: number;
        max: number;
      };
    };
  };
}

interface SliderData {
  className: string;
  controller: SliderControllerConfig;
  value: number;
  step: number;
  options: SliderOptions;
  marks?: SliderMarks;
  tip?: boolean;
  snappingStep?: number;
  lengthInputData?: LengthInputData;
  label?: string;
  startValue?: number;
  doubleSliderData?: DoubleSliderData;
  twoWays?: boolean;
}

interface ValueChangedEventData {
  fieldName?: string;
  value?: string;
}

interface ValueChangedEvent {
  data?: ValueChangedEventData;
}

interface CustomEventDetail {
  value: number;
}

interface CustomEvent {
  detail?: CustomEventDetail;
}

const CAMERA_CONSTANTS = {
  MIN_FOV: 10,
  MAX_FOV: 120,
  MIN_ANGLE: -90,
  MAX_ANGLE: 90,
  MIN_ELEVATION: 0,
  METERS_TO_MILLIMETERS: 1000,
  MILLIMETERS_TO_METERS: 0.001,
};

export class CameraSettings extends PureComponent<Record<string, unknown>, CameraSettingsState> {
  private signalHook: unknown;

  constructor(props: Record<string, unknown>) {
    super(props);

    const app = (window as any).HSApp.App.getApp();
    const displayMode = app.appSettings.displayMode;
    const heightRange = this.getLayerRange(displayMode);

    this.state = {
      cameraElevation: 1200,
      cameraFOV: 55,
      cameraPitch: 0,
      heightRange,
    };

    this.signalHook = new (window as any).HSCore.Util.SignalHook(this);
    const valueChangedSignal = app.appSettings.signalValueChanged;
    const refreshSignal = getRefreshSignal();

    (this.signalHook as any)
      .listen(valueChangedSignal, this.onLayerViewModeChanged)
      .listen(app.floorplan.scene.signalActiveLayerChanged, this.onActiveLayerChanged)
      .listen(refreshSignal, this.cameraRefresh);
  }

  componentDidMount(): void {
    this.cameraRefresh();
  }

  componentWillUnmount(): void {
    (this.signalHook as any).unlistenAll();
  }

  private onLayerViewModeChanged = (event: ValueChangedEvent): void => {
    if (event?.data?.fieldName === 'displayMode') {
      const layerRange = this.getLayerRange(event.data.value);
      this.updateCameraHeightParams(layerRange);
    }
  };

  private onActiveLayerChanged = (): void => {
    const app = (window as any).HSApp.App.getApp();
    const layerRange = this.getLayerRange(app.appSettings.displayMode);
    this.updateCameraHeightParams(layerRange);
  };

  private updateCameraHeightParams = (heightRange: [number, number]): void => {
    const currentElevation = CAMERA_CONSTANTS.METERS_TO_MILLIMETERS * getCurrentCamera().z;
    this.setState({
      heightRange,
      cameraElevation: currentElevation,
    });
  };

  private onElevationChange = (event: number | CustomEvent): void => {
    let elevation = 0;
    if (typeof event === 'object' && event.detail) {
      elevation = parseFloat((CAMERA_CONSTANTS.METERS_TO_MILLIMETERS * event.detail.value).toString());
    } else {
      elevation = event as number;
    }

    const minElevation = Math.round(CAMERA_CONSTANTS.METERS_TO_MILLIMETERS * this.state.heightRange[0]);
    const validatedElevation = this.validateValue(elevation, minElevation, Number.MAX_SAFE_INTEGER);

    this.setState({ cameraElevation: validatedElevation });

    const app = (window as any).HSApp.App.getApp();
    const cmdManager = app.cmdManager;
    const camera = getCurrentCamera();
    const command = cmdManager.createCommand((window as any).HSFPConstants.CommandType.MoveCamera3D, [camera]);

    cmdManager.execute(command);
    cmdManager.receive('movealongaxis', {
      type: 'z',
      value: validatedElevation * CAMERA_CONSTANTS.MILLIMETERS_TO_METERS,
    });
    cmdManager.complete();
  };

  private onFOVChange = (event: number | CustomEvent): void => {
    let fov = 0;
    if (typeof event === 'object' && event.detail) {
      fov = event.detail.value;
    } else {
      fov = event as number;
    }

    this.setState({ cameraFOV: fov });

    const validatedFOV = this.validateValue(fov, CAMERA_CONSTANTS.MIN_FOV, CAMERA_CONSTANTS.MAX_FOV);
    if (validatedFOV === fov) {
      const app = (window as any).HSApp.App.getApp();
      const cmdManager = app.cmdManager;
      const camera = getCurrentCamera();
      const command = cmdManager.createCommand((window as any).HSFPConstants.CommandType.ChangeCameraFov, [camera]);

      cmdManager.execute(command);
      cmdManager.receive('update_horizontal_fov', { value: validatedFOV });
      cmdManager.complete();
    }
  };

  private onPitchChange = (event: number | CustomEvent): void => {
    let pitch = 0;
    if (typeof event === 'object' && event.detail) {
      pitch = event.detail.value;
    } else {
      pitch = event as number;
    }

    const validatedPitch = this.validateValue(pitch, CAMERA_CONSTANTS.MIN_ANGLE, CAMERA_CONSTANTS.MAX_ANGLE);
    this.setState({ cameraPitch: validatedPitch });
    this.receivePitchCommand(validatedPitch, false);
  };

  private onPitchChangeSlide = (pitch: number): void => {
    const validatedPitch = this.validateValue(pitch, CAMERA_CONSTANTS.MIN_ANGLE, CAMERA_CONSTANTS.MAX_ANGLE);
    this.receivePitchCommand(validatedPitch, true);
  };

  getLayerRange(displayMode: string): [number, number] {
    let minHeight = 0;
    let maxHeight = 0;
    const app = (window as any).HSApp.App.getApp();
    const scene = app.floorplan.scene;

    if (displayMode === (window as any).HSApp.App.DisplayModeEnum.SingleLayer) {
      const activeLayer = scene.activeLayer;
      minHeight = (window as any).HSCore.Util.Layer.getEntityBaseHeight(activeLayer);
      maxHeight = minHeight + activeLayer.height;
    } else {
      const previousLayer = scene.rootLayer.prev;
      minHeight = previousLayer
        ? (window as any).HSCore.Util.Layer.getEntityBaseHeight(previousLayer)
        : CAMERA_CONSTANTS.MIN_ELEVATION;

      const ceilingHeight = getCeilingLayerHeight();
      maxHeight = ceilingHeight ? ceilingHeight * CAMERA_CONSTANTS.MILLIMETERS_TO_METERS : ceilingHeight;
    }

    return [minHeight, maxHeight];
  }

  private receivePitchCommand(pitch: number, snap: boolean): void {
    const app = (window as any).HSApp.App.getApp();
    const cmdManager = app.cmdManager;
    const camera = getCurrentCamera();
    const command = cmdManager.createCommand((window as any).HSFPConstants.CommandType.MoveCamera3D, [camera]);

    cmdManager.execute(command);
    cmdManager.receive('pitch', { pitch, snap });
    cmdManager.complete();
  }

  private cameraRefresh = (): void => {
    const camera = getCurrentCamera();
    if (camera) {
      const elevation = CAMERA_CONSTANTS.METERS_TO_MILLIMETERS * camera.z;
      const minElevation = Math.round(CAMERA_CONSTANTS.METERS_TO_MILLIMETERS * this.state.heightRange[0]);
      const validatedElevation = this.validateValue(elevation, minElevation, Number.MAX_SAFE_INTEGER);

      this.setState({
        cameraElevation: validatedElevation,
        cameraPitch: Math.round(camera.pitch),
        cameraFOV: camera.horizontal_fov,
      });
    }
  };

  private validateValue(value: number, min: number, max: number): number {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  }

  buildSliderData(value: number, type: string): SliderData {
    const app = (window as any).HSApp.App.getApp();
    const data: SliderData = {
      className: `camera-${type}`,
      controller: {
        onValueChanged: this.onElevationChange.bind(this),
      },
      value: type === 'height' && value ? value * CAMERA_CONSTANTS.MILLIMETERS_TO_METERS : value,
      step: 1,
      options: {
        unitType: app.floorplan.displayLengthUnit,
        rules: {
          positiveOnly: true,
          range: {
            checkMax: false,
            checkMin: false,
            max: this.state.heightRange[1],
            min: this.state.heightRange[0],
          },
        },
      },
    };

    if (type === 'fov') {
      data.controller.onValueChanged = this.onFOVChange.bind(this);
      data.options.unitType = '°';
      data.options.displayDigits = 0;
      data.options.rules.range.max = CAMERA_CONSTANTS.MAX_FOV;
      data.options.rules.range.min = CAMERA_CONSTANTS.MIN_FOV;
      data.value = value;
      data.marks = {
        10: getString('plugin_render_long_focus'),
        40: getString('plugin_render_eye'),
        55: getString('plugin_render_standard'),
        120: getString('plugin_render_wide_angle'),
      };
      data.step = 1;
      data.tip = false;
      data.snappingStep = 0.04;
      data.lengthInputData = this.buildLengthInputData(data, type);
    }

    if (type === 'height') {
      data.options.rules.positiveOnly = false;
      data.options.startFromMin = true;
      data.label = getString('plugin_manuallighting_attr_height_without_unittype');
      data.lengthInputData = this.buildLengthInputData(data, type);
      data.startValue = this.state.heightRange[0];
    }

    if (type === 'pitch') {
      data.controller.onValueChanged = this.onPitchChange.bind(this);
      data.options.unitType = '°';
      data.options.displayDigits = 0;
      data.options.rules.range.max = CAMERA_CONSTANTS.MAX_ANGLE;
      data.options.rules.range.min = CAMERA_CONSTANTS.MIN_ANGLE;
      data.options.rules.positiveOnly = false;
      data.options.disabledTooltip = true;
      data.doubleSliderData = this.buildDoubleSliderData(data);
      data.lengthInputData = this.buildLengthInputData(data, type);
      data.label = getString('plugin_render_pitch_angle');
      data.twoWays = true;
      data.startValue = 0;
    }

    return data;
  }

  buildDoubleSliderData(sliderData: SliderData): DoubleSliderData {
    return {
      className: '',
      label: '',
      value: sliderData.value,
      delay: false,
      onValueChangeStart: '',
      onValueChange: this.onPitchChangeSlide.bind(this),
      onValueChangeEnd: '',
      options: {
        readOnly: false,
        rules: {
          range: {
            min: sliderData.options.rules.range.min,
            max: sliderData.options.rules.range.max,
          },
        },
      },
    };
  }

  buildLengthInputData(sliderData: SliderData, type: string): LengthInputData {
    return {
      className: `${sliderData.className}`,
      label: '',
      iconSrc: '',
      value: sliderData.value,
      listValues: undefined,
      labelPosition: '',
      onValueChangeStart: '',
      onValueChange: sliderData.controller.onValueChanged,
      options: {
        unitType: sliderData.options.unitType,
        displayDigits: sliderData.options.displayDigits,
        includeUnit: sliderData.options.includeUnit,
        readOnly: sliderData.options.readOnly,
        rules: {
          range: {
            min: sliderData.options.rules.range.min,
            max: sliderData.options.rules.range.max,
            checkMin: sliderData.options.rules.range.checkMin,
            checkMax: sliderData.options.rules.range.checkMax,
          },
          positiveOnly: sliderData.options.rules.positiveOnly,
        },
      },
    };
  }

  render(): React.ReactElement {
    const { cameraElevation, cameraFOV, cameraPitch } = this.state;
    const fovSliderData = this.buildSliderData(cameraFOV, 'fov');

    return React.createElement(
      'div',
      { className: 'camera-settings' },
      React.createElement(
        'div',
        { className: 'title' },
        React.createElement('span', null, (window as any).ResourceManager.getString('plugin_render_edit_image_param'))
      ),
      React.createElement(
        'div',
        { className: 'content' },
        React.createElement(
          'div',
          { className: 'setting-view' },
          React.createElement(
            'div',
            { className: 'camera-fov-container' },
            React.createElement(
              'div',
              { className: 'slide-name' },
              (window as any).ResourceManager.getString('render_camera_fov_without_unittype')
            ),
            React.createElement(LengthInput, { data: fovSliderData.lengthInputData })
          ),
          React.createElement(
            'div',
            { className: 'sectional-slider-container' },
            React.createElement(SectionalSlider, { data: fovSliderData })
          )
        ),
        React.createElement(SliderInput, { data: this.buildSliderData(cameraElevation, 'height') }),
        React.createElement(DoubleSliderInput, { data: this.buildSliderData(cameraPitch, 'pitch') })
      )
    );
  }
}