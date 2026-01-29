interface AppSettings {
  defaultDisplayLengthUnit?: string | number;
  defaultDisplayLengthDigits?: number;
  defaultDisplayAreaUnit?: string | number;
  defaultDisplayAreaDigits?: number;
  gridVisible?: boolean;
  dimensionVisiable?: boolean;
  dimensionType?: string;
  roomAreaVisible?: boolean;
  roomTypeVisible?: boolean;
  showHalfWall?: boolean;
  contentPrecisionLocation?: boolean;
  contentPrecisionLocation3d?: boolean;
  lightingPrecisionLocation?: boolean;
  orthoModeOn?: boolean;
  wallWidth?: number;
  wallMode?: string;
  wallIsBearing?: boolean;
  wallArcHeight?: boolean;
  autoSaveInterval?: number;
  renderSpeedLevel?: number;
  svgColorModel?: number;
  showProductInfo?: boolean;
  enableLightTarget?: boolean;
  primaryViewCameraVisible2D?: boolean;
  auxiliaryLineVisible?: boolean;
  isGlobalSetting(key: string): boolean;
  getViewItem(key: string): unknown;
  setViewItem(key: string, value: unknown): void;
  signalValueChanged: unknown;
}

interface App {
  appSettings: AppSettings;
  appParams: {
    tenant: string;
  };
}

interface ValueChangedEvent {
  data: {
    fieldName: string;
    temp: boolean;
    value: unknown;
  };
}

interface SignalHook {
  listen(signal: unknown, handler: (event: ValueChangedEvent) => void): void;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSCore: {
  Util: {
    SignalHook: new (context: unknown) => SignalHook;
    Math: {
      nearlyEquals(a: unknown, b: unknown): boolean;
    };
    Unit: {
      LengthUnitTypeEnum: {
        inch: string | number;
        millimeter: string | number;
      };
      AreaUnitTypeEnum: {
        foot: string | number;
        meter: string | number;
      };
    };
  };
};

const TENANT_FP = 'fp';
const DEFAULT_WALL_WIDTH = 0.24;

const settingsKeys = [
  'defaultDisplayLengthUnit',
  'defaultDisplayLengthDigits',
  'defaultDisplayAreaUnit',
  'defaultDisplayAreaDigits',
  'gridVisible',
  'dimensionVisiable',
  'dimensionType',
  'roomAreaVisible',
  'roomTypeVisible',
  'showHalfWall',
  'contentPrecisionLocation',
  'contentPrecisionLocation3d',
  'lightingPrecisionLocation',
  'orthoModeOn',
  'wallWidth',
  'wallMode',
  'wallIsBearing',
  'wallArcHeight',
  'autoSaveInterval',
  'renderSpeedLevel',
  'svgColorModel',
  'showProductInfo',
  'enableLightTarget',
  'primaryViewCameraVisible2D',
  'auxiliaryLineVisible'
] as const;

type SettingKey = typeof settingsKeys[number];

class AppSettingsManager {
  appSettings: AppSettings | null = null;
  keys: ReadonlyArray<SettingKey> = settingsKeys;
  private _signalHook?: SignalHook;

  [key: string]: unknown;

  init(): void {
    this.appSettings = HSApp.App.getApp().appSettings;
    this.load();
    this.bindSignal();
  }

  bindSignal(): void {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook.listen(
      HSApp.App.getApp().appSettings.signalValueChanged,
      this.updateByAppSetting.bind(this)
    );
  }

  updateByAppSetting(event: ValueChangedEvent): void {
    if (!this.keys.includes(event.data.fieldName as SettingKey)) {
      return;
    }

    const isTemporary = event.data.temp;
    const newValue = event.data.value;
    const fieldName = event.data.fieldName;

    if (this[fieldName] !== newValue && newValue != null) {
      this[fieldName] = newValue;
    }

    if (!isTemporary) {
      this.save(fieldName);
    }
  }

  save(targetKey?: string): void {
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      let localValue = this[key];
      const appSettingValue = this.appSettings?.[key];

      if (targetKey && targetKey !== key) {
        continue;
      }

      if (HSCore.Util.Math.nearlyEquals(localValue, appSettingValue)) {
        continue;
      }

      const isFpTenant = HSApp.App.getApp().appParams.tenant === TENANT_FP;

      if (!isFpTenant) {
        if (key === 'defaultDisplayLengthUnit' && localValue === HSCore.Util.Unit.LengthUnitTypeEnum.inch) {
          localValue = HSCore.Util.Unit.LengthUnitTypeEnum.millimeter;
        } else if (key === 'defaultDisplayAreaUnit' && localValue === HSCore.Util.Unit.AreaUnitTypeEnum.foot) {
          localValue = HSCore.Util.Unit.AreaUnitTypeEnum.meter;
        }
      }

      if (this.appSettings?.isGlobalSetting(key)) {
        localStorage.getItem(key);
        localValue = this.appSettings.getViewItem(key);
      } else if (this.appSettings) {
        this.appSettings[key] = localValue;
      }

      localStorage.setItem(key, String(localValue));
    }
  }

  load(): void {
    for (let i = 0; i < this.keys.length; i++) {
      const key = this.keys[i];
      let storedValue: string | number | boolean | null = localStorage.getItem(key);

      switch (key) {
        case 'wallWidth':
          storedValue = parseFloat(storedValue as string);
          if (isNaN(storedValue as number)) {
            storedValue = DEFAULT_WALL_WIDTH;
          }
          break;

        case 'defaultDisplayLengthDigits':
        case 'defaultDisplayAreaDigits':
        case 'autoSaveInterval':
        case 'renderSpeedLevel':
        case 'svgColorModel':
          storedValue = parseInt(storedValue as string);
          if (isNaN(storedValue as number)) {
            storedValue = undefined as unknown as null;
          }
          break;

        case 'defaultDisplayLengthUnit':
          if (
            HSApp.App.getApp().appParams.tenant !== TENANT_FP &&
            storedValue === HSCore.Util.Unit.LengthUnitTypeEnum.inch
          ) {
            storedValue = HSCore.Util.Unit.LengthUnitTypeEnum.millimeter;
          }
          break;

        case 'defaultDisplayAreaUnit':
          if (
            HSApp.App.getApp().appParams.tenant !== TENANT_FP &&
            storedValue === HSCore.Util.Unit.AreaUnitTypeEnum.foot
          ) {
            storedValue = HSCore.Util.Unit.AreaUnitTypeEnum.meter;
          }
          break;

        case 'gridVisible':
        case 'dimensionVisiable':
        case 'roomAreaVisible':
        case 'roomTypeVisible':
        case 'showHalfWall':
        case 'contentPrecisionLocation':
        case 'contentPrecisionLocation3d':
        case 'lightingPrecisionLocation':
        case 'orthoModeOn':
        case 'wallIsBearing':
        case 'wallArcHeight':
        case 'enableLightTarget':
        case 'primaryViewCameraVisible2D':
          if (storedValue != null) {
            storedValue = storedValue !== 'false';
          }
          break;
      }

      if (storedValue != null) {
        if (this.appSettings?.isGlobalSetting(key)) {
          this.appSettings.setViewItem(key, storedValue);
        } else if (this.appSettings) {
          this.appSettings[key] = storedValue;
        }
      }
    }

    if (this.appSettings) {
      Object.assign(this, this.appSettings);
    }
  }
}

export default new AppSettingsManager();