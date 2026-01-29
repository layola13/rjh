import React from 'react';

interface HeightSettings {
  layerHeight: number;
  doorHeight: number;
  windowHeight: number;
  windowfloorHeight: number;
  bayWindowHeight: number;
  bayWindowfloorHeight: number;
}

interface SettingItemConfig {
  title: string;
  value: number;
  max: number;
  min: number;
  relatedValue?: number;
  outOfWallTips?: string;
  onValueChange: (value: number) => void;
}

interface CadSettingDialogState extends HeightSettings {
  focusKey: number;
  visible: boolean;
}

interface CadSettingDialogProps {
  onClose?: () => void;
  onCommit: () => Promise<void>;
  onCommitUnderlayImg: () => void;
}

const DEFAULT_HEIGHT_SETTINGS: HeightSettings = {
  layerHeight: 2.8,
  doorHeight: 2.2,
  windowHeight: 1.6,
  windowfloorHeight: 0.85,
  bayWindowHeight: 1.6,
  bayWindowfloorHeight: 0.5,
};

export default class CadSettingDialog extends React.Component<CadSettingDialogProps, CadSettingDialogState> {
  private _unit: string = 'm';
  private _unitParam: number = 1;

  constructor(props: CadSettingDialogProps) {
    super(props);
    this.state = {
      ...DEFAULT_HEIGHT_SETTINGS,
      focusKey: -1,
      visible: false,
    };
  }

  public show(): void {
    this._unit = (window as any).HSApp.App.getApp().floorplan.displayLengthUnit;
    this._unitParam = this.getUnitParam();
    this.setState({
      ...DEFAULT_HEIGHT_SETTINGS,
      focusKey: -1,
      visible: true,
    });
  }

  public hide(): void {
    this.setState({ visible: false });
  }

  public getHeights(): CadSettingDialogState {
    return this.state;
  }

  private getUnitParam(): number {
    // Placeholder for actual implementation
    return 1;
  }

  private _onCloseBtnClick(): void {
    this.hide();
    this.props.onClose?.();
  }

  private _getSetting(): React.ReactElement[] {
    const {
      layerHeight,
      doorHeight,
      windowHeight,
      windowfloorHeight,
      bayWindowHeight,
      bayWindowfloorHeight,
      focusKey,
    } = this.state;

    const settingsConfig: SettingItemConfig[] = [
      {
        title: (window as any).ResourceManager.getString('setting_cad_height_layer'),
        value: layerHeight,
        max: (window as any).HSConstants.Constants.MAX_WALL_3D_HEIGHT,
        min: (window as any).HSConstants.Constants.MIN_WALL_3D_HEIGHT,
        onValueChange: (value: number) => this.setState({ layerHeight: value }),
      },
      {
        title: (window as any).ResourceManager.getString('setting_cad_height_door'),
        value: doorHeight,
        max: 6.5,
        min: 1,
        outOfWallTips: (window as any).ResourceManager.getString('setting_cad_height_door_tips'),
        onValueChange: (value: number) => this.setState({ doorHeight: value }),
      },
      {
        title: (window as any).ResourceManager.getString('setting_cad_height_window'),
        value: windowHeight,
        relatedValue: windowfloorHeight,
        max: 2.8,
        min: 0.2,
        outOfWallTips: (window as any).ResourceManager.getString('setting_cad_height_window_tips'),
        onValueChange: (value: number) => this.setState({ windowHeight: value }),
      },
      {
        title: (window as any).ResourceManager.getString('setting_cad_height_window_floor'),
        value: windowfloorHeight,
        relatedValue: windowHeight,
        max: layerHeight,
        min: 0,
        outOfWallTips: (window as any).ResourceManager.getString('setting_cad_height_window_tips'),
        onValueChange: (value: number) => this.setState({ windowfloorHeight: value }),
      },
      {
        title: (window as any).ResourceManager.getString('setting_cad_height_baywindow'),
        value: bayWindowHeight,
        relatedValue: bayWindowfloorHeight,
        max: 2.8,
        min: 0.1,
        outOfWallTips: (window as any).ResourceManager.getString('setting_cad_height_baywindow_tips'),
        onValueChange: (value: number) => this.setState({ bayWindowHeight: value }),
      },
      {
        title: (window as any).ResourceManager.getString('setting_cad_height_baywindow_floor'),
        value: bayWindowfloorHeight,
        relatedValue: bayWindowHeight,
        max: layerHeight,
        min: 0,
        outOfWallTips: (window as any).ResourceManager.getString('setting_cad_height_baywindow_tips'),
        onValueChange: (value: number) => this.setState({ bayWindowfloorHeight: value }),
      },
    ];

    return settingsConfig.map((config, index) => {
      const SettingItem = (window as any).SettingItemComponent;
      return React.createElement(SettingItem, {
        key: index,
        title: config.title,
        value: config.value,
        max: config.max,
        min: config.min,
        focus: index === focusKey,
        relatedValue: config.relatedValue,
        layerHeight: layerHeight,
        unit: this._unit,
        unitParam: this._unitParam,
        outOfWallTips: config.outOfWallTips,
        onValueChange: config.onValueChange,
        onEnter: (newValue: number, shouldApply: boolean) => {
          const nextFocusKey = index + (shouldApply ? 1 : 0);
          if (nextFocusKey < 6) {
            this.setState({ focusKey: nextFocusKey });
          } else {
            this.setState({ focusKey: -1 });
          }
          if (shouldApply) {
            config.onValueChange(newValue);
          }
        },
      });
    });
  }

  public render(): React.ReactNode {
    if (!this.state.visible) {
      return null;
    }

    const settingItems = this._getSetting();
    const { IconfontView, Scroll, Button } = (window as any).UIComponents;

    return (
      <div className="cad-setting-dialog-wrapper">
        <div className="cad-setting-dialog-overLay" />
        <div className="cad-setting-dialog-main">
          <div className="cad-setting-dialog-head">
            <span className="cad-setting-dialog-title">
              {(window as any).ResourceManager.getString('cad_height_setting')}
            </span>
            <span onClick={this._onCloseBtnClick.bind(this)}>
              {React.createElement(IconfontView, {
                customClass: 'cad-setting-dialog-close-btn',
                showType: 'hs_xian_guanbi',
                clickColor: '#396EFE',
                hoverBgColor: '#f5f5f5',
                bgExtendSize: 10,
              })}
            </span>
          </div>
          <div className="cad-setting-dialog-content">
            {React.createElement(Scroll, {
              option: { suppressScrollX: true },
              className: 'cad-setting-scrollbar',
            }, settingItems)}
          </div>
          <div className="cad-setting-dialog-bottom">
            {React.createElement(Button, {
              className: 'cad-setting-dialog-button cad-setting-dialog-button-save',
              type: 'primary',
              onClick: async () => {
                await this.props.onCommit();
              },
            }, (window as any).ResourceManager.getString('setting_generate_floorplan'))}
            {React.createElement(Button, {
              className: 'cad-setting-dialog-button cad-setting-dialog-button-cancel',
              type: 'primary',
              onClick: this.props.onCommitUnderlayImg,
            }, (window as any).ResourceManager.getString('setting_generate_underlay_img'))}
          </div>
        </div>
      </div>
    );
  }
}