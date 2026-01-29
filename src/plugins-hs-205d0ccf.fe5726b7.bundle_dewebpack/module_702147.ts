import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';
import { IconfontView } from './IconfontView';
import { ImageView } from './ImageView';

interface UnderlaySettings {
  disable?: boolean;
}

interface UnderlaySettingsProps {
  data: UnderlaySettings;
}

interface UnderlaySettingsState {
  showPopup: boolean;
  bgPngDelete: boolean;
  showImageView: boolean;
}

interface WallOpacitySliderData {
  className: string;
  label: string;
  value: number;
  delay: boolean;
  options: {
    unitType: string;
    displayDigits: number;
    includeUnit: string;
    readOnly: boolean;
    rules: {
      range: {
        min: number;
        max: number;
      };
      positiveOnly: boolean;
    };
  };
  onValueChange: (event: { detail: { value: number } }) => void;
}

interface CheckboxData {
  className: string;
  disabled: boolean;
  status: string;
  text: string;
  onclick: () => void;
}

declare const HSApp: any;
declare const HSCore: any;
declare const HSFPConstants: any;
declare const ResourceManager: any;
declare const adskUser: any;
declare const $: any;

class UnderlayImgSettingPopup extends React.Component<UnderlaySettingsProps, UnderlaySettingsState> {
  static defaultProps: UnderlaySettingsProps = {
    data: {}
  };

  private app: any;
  private containerDom: HTMLDivElement | null = null;
  private signalHook: any;
  private x: number = 0;
  private y: number = 0;

  constructor(props: UnderlaySettingsProps) {
    super(props);

    this.app = HSApp.App.getApp();
    this.state = {
      showPopup: false,
      bgPngDelete: false,
      showImageView: false
    };

    this.updatePopupStatus = this.updatePopupStatus.bind(this);
    this.recordMouseDown = this.recordMouseDown.bind(this);
    this.signalHook = new HSCore.Util.SignalHook(this);

    this.init();
  }

  componentDidMount(): void {
    document.addEventListener('mousedown', this.recordMouseDown);
    document.addEventListener('click', this.updatePopupStatus);
  }

  componentWillUnmount(): void {
    this.handleClosePop();
    document.removeEventListener('mousedown', this.recordMouseDown);
    document.removeEventListener('click', this.updatePopupStatus);
    this.signalHook.unlisten(this.app.floorplan.scene.signalActiveLayerChanged);
  }

  private init(): void {
    const pluginContainer = document.querySelector('#plugin-container');

    if (!this.containerDom) {
      const container = document.createElement('div');
      container.className = 'underlayimg-popup-container';
      this.containerDom = container;
      pluginContainer?.appendChild(container);
    }

    this.app.floorplan.scene.forEachLayer((layer: any) => {
      const underlayUrl = layer.underlay?.url;
      if (underlayUrl) {
        ResourceManager.load(underlayUrl, HSApp.Io.Load.LoadTypeEnum.ContentTopView);
      }
    });

    this.signalHook.listen(this.app.floorplan.scene.signalActiveLayerChanged, () => {
      if (this.state.showImageView) {
        this.openImageView();
      }
    });
  }

  private handleClosePop = (): void => {
    this.signalHook.unlisten(this.app.floorplan.scene.signalActiveLayerChanged);
    if (this.containerDom) {
      ReactDOM.unmountComponentAtNode(this.containerDom);
    }
  };

  private onOpenBackgroundPngClk = (): void => {
    this.openImageView();
  };

  private openImageView(): void {
    if (!this.containerDom) return;

    const imageSrc = HSApp.App.getApp().floorplan.scene.activeLayer.underlay?.url;

    ReactDOM.render(
      <ImageView
        imageSrc={imageSrc}
        onClose={() => this.setState({ showImageView: false })}
      />,
      this.containerDom
    );

    this.setState({
      showPopup: false,
      showImageView: true
    });
  }

  private onMouseEnter(): void {
    this.setState({ showPopup: true });
  }

  private onMouseLeave(): void {
    this.setState({ showPopup: false });
  }

  private onRescaleClick(): void {
    // Implementation placeholder
  }

  private onDeleteBackgroundPngClk(): void {
    if (adskUser.isLogin()) {
      this.deleteUnderlayimgMsgBox();
    } else {
      adskUser.openLoginWindow();
      $('body')
        .unbind(adskUser.EVENT_CALLBACK_FUN)
        .bind(adskUser.EVENT_CALLBACK_FUN, () => {
          this.deleteUnderlayimgMsgBox();
        });
    }
  }

  private recordMouseDown(event: MouseEvent): void {
    this.x = event.clientX;
    this.y = event.clientY;
  }

  private updatePopupStatus(event: MouseEvent): void {
    if (this.x !== event.clientX || this.y !== event.clientY) return;

    const targetElement = event.target as HTMLElement;
    const hasRelevantParent = Array.prototype.find.call(
      $(targetElement).parents(),
      (element: HTMLElement) => {
        if (typeof element.className === 'string') {
          const hasUnderlayWrapper = element.className.indexOf('underlayimg-setting-wrapper') > -1;
          const hasZoomView = element.className.indexOf('zoom-view-wrapper') > -1;
          const hasFitButton = element.className.indexOf('fit-button-in-2d') > -1;
          return hasUnderlayWrapper || hasZoomView || hasFitButton;
        }
        return false;
      }
    );

    if (!hasRelevantParent) {
      this.setState({ showPopup: false });
    }
  }

  private deleteUnderlayimgMsgBox(): void {
    const scene = this.app.floorplan.scene;
    const commandManager = this.app.cmdManager;
    const command = commandManager.createCommand(HSFPConstants.CommandType.UpdateUnderlay);

    command.receive('removeunderlay', { layer: scene.activeLayer });
    commandManager.execute(command);
    commandManager.complete();

    this.app.pluginManager.getPlugin(HSFPConstants.PluginType.StatusBar).show();
    this.app.pluginManager
      .getPlugin(HSFPConstants.PluginType.ContextualTools)
      .refresh(undefined, { refreshStatusBar: true });
  }

  render(): React.ReactElement {
    const isBackgroundVisible = this.app.floorplan.scene.activeLayer.underlay?.show;
    const { showPopup } = this.state;
    const isDisabled = this.props.data.disable ?? false;

    let popupClassName = 'underlayimg-setting-popup ';
    let textClassName = 'underlayimg-setting-text ';

    if (showPopup) {
      textClassName += ' focus';
    } else {
      popupClassName += 'hide ';
    }

    const wallOpacitySliderData: WallOpacitySliderData = {
      className: 'bottom-bar-wall-opacity-setting',
      label: '',
      value: 100 * this.app.appSettings.svgWallOpacity,
      delay: false,
      options: {
        unitType: '%',
        displayDigits: 0,
        includeUnit: 'true',
        readOnly: !isBackgroundVisible,
        rules: {
          range: {
            min: 0,
            max: 100
          },
          positiveOnly: true
        }
      },
      onValueChange: (event: { detail: { value: number } }) => {
        const newValue = event.detail.value;
        const opacity = Math.round(newValue) / 100;
        this.app.appSettings.svgWallOpacity = opacity;
      }
    };

    const checkboxData: CheckboxData = {
      className: 'underlayimg-check-box',
      disabled: false,
      status: isBackgroundVisible ? 'checked' : '',
      text: ResourceManager.getString('plugin_statusBarPopup_bgsetting_show_background_png'),
      onclick: () => {
        if (!this.state.bgPngDelete) {
          this.app.floorplan.scene.activeLayer.underlay?.showBackground(!isBackgroundVisible);
          this.app.appSettings.setViewItem('backgroundVisible', !isBackgroundVisible);
          this.setState({});
        }
      }
    };

    return (
      <div
        onMouseLeave={() => this.onMouseLeave()}
        className={`underlayimg-setting-wrapper ${isDisabled ? 'disable' : ''}`}
      >
        <div
          className={textClassName}
          onMouseEnter={() => this.onMouseEnter()}
        >
          <div className="underlayimg-setting-label">
            {ResourceManager.getString('statusbar_underlayimg_setting')}
          </div>
          <IconfontView
            showType="hs_xiao_shijiantou_tuozhan"
            customClass="underlayimg-setting-arrow"
            customStyle={{ fontSize: '6px' }}
          />
        </div>

        <div className={popupClassName}>
          <div className="underlayimg-title">
            {ResourceManager.getString('statusbar_underlayimg')}
          </div>

          <div className="wall-opacity-background">
            <div className="wall-opacity-label">
              {ResourceManager.getString('statusbar_underlayimg_wall_opacity')}
            </div>
            <WallOpacitySlider data={wallOpacitySliderData} />
          </div>

          <div className="underlayimg-part">
            <Checkbox data={checkboxData} />
          </div>

          <div className="underlayimg-action">
            <Button
              type="default"
              className="underlayimg-button-label"
              onClick={this.onOpenBackgroundPngClk}
            >
              {ResourceManager.getString('plugin_statusBarPopup_bgsetting_view_background_png')}
            </Button>
            <Button
              type="default"
              className="underlayimg-button-label"
              onClick={() => this.onDeleteBackgroundPngClk()}
            >
              {ResourceManager.getString('statusbar_underlayimg_delete')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UnderlayImgSettingPopup;