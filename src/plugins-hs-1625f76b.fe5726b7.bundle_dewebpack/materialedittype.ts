import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DraggableModal } from './DraggableModal';
import { Icons } from './Icons';

export enum MaterialEditType {
  Angle = "Angle",
  VerticalScale = "VerticalScale",
  VerticalOffset = "VerticlaOffset",
  HorizontalScale = "HorizontalScale",
  HorizontalOffset = "HorizontalOffset",
}

export enum MaterialEditResetType {
  Position = "position",
  Scale = "scale",
}

interface MaterialInfo {
  rotation: number;
  sliderOffsetX: number;
  sliderOffsetY: number;
  scaleX: number;
  scaleY: number;
}

interface PositionHandlers {
  onRotateChangeStart: (value: number) => void;
  onRotateChange: (value: number) => void;
  onRotateChangeEnd: (value: number) => void;
  onOffsetXChangeStart: (value: number) => void;
  onOffsetXChange: (value: number) => void;
  onOffsetXChangeEnd: (value: number) => void;
  onOffsetYChangeStart: (value: number) => void;
  onOffsetYChange: (value: number) => void;
  onOffsetYChangeEnd: (value: number) => void;
}

interface ScaleHandlers {
  onScaleXChangeStart: (value: number, equalScale: boolean) => void;
  onScaleXChange: (value: number, equalScale: boolean) => void;
  onScaleXChangeEnd: (value: number, equalScale: boolean) => void;
  onScaleYChangeStart: (value: number, equalScale: boolean) => void;
  onScaleYChange: (value: number, equalScale: boolean) => void;
  onScaleYChangeEnd: (value: number, equalScale: boolean) => void;
}

interface MaterialEditProps {
  seekId: string;
  rotation: number;
  sliderOffsetX: number;
  sliderOffsetY: number;
  scaleX: number;
  scaleY: number;
  maxSliderX: number;
  maxSliderY: number;
  replaceDisabled: boolean;
  position: PositionHandlers;
  scale: ScaleHandlers;
  onPositionReset: () => void;
  onScaleReset: () => void;
  onRotateIconClick: () => void;
  onReplaceBtnClick: () => void;
  updateMaterialInfo: () => MaterialInfo;
}

interface MaterialEditCardProps {
  rootDom: HTMLElement;
  materialEditProps: MaterialEditProps;
}

interface MaterialEditCardState {
  equalScale: boolean;
  position: boolean;
  scale: boolean;
  angle: number;
  hOffset: number;
  vOffset: number;
  hScale: number;
  vScale: number;
}

interface PropertyBarPlugin {
  handler: {
    getWidgetsByType: (type: string) => React.ComponentType<any> | null;
  };
}

interface ThumbnailViewPosition {
  height?: number;
  left: number;
}

interface PropertyBarSize {
  width: number;
  height: number;
}

interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

export class MaterialEditCard extends React.Component<MaterialEditCardProps, MaterialEditCardState> {
  private _propertyBarPlugin?: PropertyBarPlugin;
  private _documentClickedHidePopup: (event: MouseEvent) => void;

  constructor(props: MaterialEditCardProps) {
    super(props);

    this._propertyBarPlugin = (HSApp.App.getApp() as any).pluginManager.getPlugin(
      (HSFPConstants as any).PluginType.PropertyBar
    );
    this._documentClickedHidePopup = this.documentClickedHidePopup.bind(this);

    this.state = {
      equalScale: false,
      position: true,
      scale: true,
      angle: props.materialEditProps.rotation,
      hOffset: props.materialEditProps.sliderOffsetX,
      vOffset: props.materialEditProps.sliderOffsetY,
      hScale: props.materialEditProps.scaleX,
      vScale: props.materialEditProps.scaleY,
    };
  }

  componentDidMount(): void {
    document.addEventListener('mousedown', this._documentClickedHidePopup);
  }

  componentWillUnmount(): void {
    this._close();
  }

  render(): React.ReactElement {
    const propertyConfig = [
      {
        label: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_replace'),
        children: [
          {
            compType: (HSFPConstants as any).PropertyBarType.ImageButton,
          },
        ],
      },
      {
        resetType: MaterialEditResetType.Position,
        label: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_position'),
        children: [
          {
            compType: (HSFPConstants as any).PropertyBarType.SliderInput,
            label: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_rotation'),
            type: MaterialEditType.Angle,
            unit: '˚',
            value: this.state.angle,
            range: { min: -180, max: 180 },
          },
          {
            compType: (HSFPConstants as any).PropertyBarType.SliderInput,
            label: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_horizontal_offset'),
            type: MaterialEditType.HorizontalOffset,
            unit: 'mm',
            value: this.state.hOffset,
            range: {
              max: this.props.materialEditProps.maxSliderX,
              min: -this.props.materialEditProps.maxSliderX,
            },
          },
          {
            compType: (HSFPConstants as any).PropertyBarType.SliderInput,
            label: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_vertical_offset'),
            type: MaterialEditType.VerticalOffset,
            unit: 'mm',
            value: this.state.vOffset,
            range: {
              max: this.props.materialEditProps.maxSliderY,
              min: -this.props.materialEditProps.maxSliderY,
            },
          },
        ],
      },
      {
        resetType: MaterialEditResetType.Scale,
        label: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_scale'),
        children: [
          {
            compType: (HSFPConstants as any).PropertyBarType.SliderInputGroup,
            unit: (ResourceManager as any).getString('plugin_contentmaterialreplace_unittype_times'),
            displayDigits: 1,
            scaleStep: 0.1,
            range: { min: 0.1, max: 10 },
          },
        ],
      },
    ];

    const modalStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 120,
      top: (this.getThumbnailView().height ?? -10) + 60,
      right: 8,
    };

    const propertyBarSize = this.getPropertyBarSize();
    const modalOptions = {
      className: 'hs-hover-shadow',
      initialWidth: propertyBarSize.width,
      initialHeight: propertyBarSize.height,
      titleSetting: {
        title: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_edit'),
        enableCloseBtn: true,
      },
      scrollYTip: false,
      enableYScroll: false,
      scrollXTip: false,
      enableXScroll: false,
    };

    return (
      <DraggableModal style={modalStyle} {...modalOptions}>
        <div className="material-edit-card-property">
          {propertyConfig.map((config, index) => this._getChildNode(config, index))}
        </div>
      </DraggableModal>
    );
  }

  getThumbnailView(): ThumbnailViewPosition {
    const position = (HSApp.App.getApp() as any).layoutMgr.getPosition('ThumbnailView');
    if (position.left >= document.documentElement.clientWidth) {
      position.height = 0;
    }
    return position;
  }

  getPropertyBarSize(): PropertyBarSize {
    return (HSApp.App.getApp() as any).layoutMgr.getPosition('PropertyBar');
  }

  private _resetClick = (resetType: MaterialEditResetType): void => {
    if (resetType === MaterialEditResetType.Position) {
      this.props.materialEditProps.onPositionReset();
    } else if (resetType === MaterialEditResetType.Scale) {
      this.props.materialEditProps.onScaleReset();
    }
    this._updateMaterialInfo();
  };

  private _equalScale = (): void => {
    this.setState({ equalScale: !this.state.equalScale });
  };

  private _close = (): void => {
    document.removeEventListener('mousedown', this._documentClickedHidePopup);
    ReactDOM.unmountComponentAtNode(this.props.rootDom);
  };

  private _hideList = (resetType?: MaterialEditResetType): void => {
    if (resetType) {
      if (resetType === MaterialEditResetType.Position) {
        this.setState({ position: !this.state.position });
      } else if (resetType === MaterialEditResetType.Scale) {
        this.setState({ scale: !this.state.scale });
      }
    }
  };

  private _getChildNode(config: any, index: number): React.ReactElement {
    const shouldShowContent = config.resetType ? this.state[config.resetType] : true;

    return (
      <div key={`parent_${index}`} className="material-edit-item">
        <div className="title">
          <span className="text">{config.label}</span>
          {config.resetType && (
            <div className="reset">
              <span
                className="reset-text"
                onClick={() => this._resetClick(config.resetType)}
              >
                {(ResourceManager as any).getString('customized_products_restore_default')}
              </span>
              {this.state[config.resetType] ? (
                <Icons
                  type="hs_xiao_shijiantou_zuo1"
                  className="arrow-img"
                  onClick={() => this._hideList(config.resetType)}
                />
              ) : (
                <Icons
                  type="hs_xiao_shijiantou_xia"
                  className="arrow-img"
                  onClick={() => this._hideList(config.resetType)}
                />
              )}
            </div>
          )}
        </div>
        {shouldShowContent && (
          <div className="content">
            {config.children.map((child: any, childIndex: number) =>
              this._getComponentByType(child.compType, child, childIndex)
            )}
          </div>
        )}
      </div>
    );
  }

  private _getComponentByType(
    compType: string,
    config: any,
    index: number
  ): React.ReactElement | null {
    const WidgetComponent = this._propertyBarPlugin?.handler.getWidgetsByType(compType);
    if (!WidgetComponent) return null;

    switch (compType) {
      case (HSFPConstants as any).PropertyBarType.ImageButton:
        const imageButtonData = {
          seekId: this.props.materialEditProps.seekId,
          disableIcon: false,
          disabled: this.props.materialEditProps.replaceDisabled,
          icon: 'hs_shuxingmianban_xuanzhuan45',
          onIconClick: () => {
            this.props.materialEditProps.onRotateIconClick();
            this._updateMaterialInfo();
          },
          onClick: this.props.materialEditProps.onReplaceBtnClick,
        };
        return <WidgetComponent key={index} className="image-button" data={imageButtonData} />;

      case (HSFPConstants as any).PropertyBarType.SliderInput:
        const sliderInputData = {
          label: config.label ?? '',
          value: config.value ?? config.range?.min,
          className: '',
          options: {
            displayDigits: config.displayDigits ?? 0,
            unitType: config.unit,
            rules: { range: config.range },
          },
          scaleStep: config.scaleStep ?? 1,
          onValueChangeStart: (event: ValueChangeEvent) => {
            if (config.type) {
              this._onValueChangeStart(config.type, event.detail.value);
            }
          },
          onValueChange: (event: ValueChangeEvent) => {
            if (config.type) {
              this._onValueChange(config.type, event.detail.value);
            }
          },
          onValueChangeEnd: (event: ValueChangeEvent) => {
            if (config.type) {
              this._onValueChangeEnd(config.type, event.detail.value);
            }
          },
        };
        return <WidgetComponent key={index} className="slider-input" data={sliderInputData} />;

      case (HSFPConstants as any).PropertyBarType.SliderInputGroup:
        const sliderInputGroupData = {
          sliderInputOptions: [
            {
              label: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_horizontal_scale'),
              options: {
                unitType: config.unit,
                displayDigits: config.displayDigits,
                rules: { range: config.range },
              },
              value: this.state.hScale,
              scaleStep: config.scaleStep ?? 1,
              controller: {
                onValueChangeStart: (event: ValueChangeEvent) => {
                  this._onValueChangeStart(MaterialEditType.HorizontalScale, event.detail.value);
                },
                onValueChange: (event: ValueChangeEvent) => {
                  this._onValueChange(MaterialEditType.HorizontalScale, event.detail.value);
                },
                onValueChangeEnd: (event: ValueChangeEvent) => {
                  this._onValueChangeEnd(MaterialEditType.HorizontalScale, event.detail.value);
                },
              },
            },
            {
              label: (ResourceManager as any).getString('plugin_parametric_background_propertybar_material_vertical_scale'),
              options: {
                unitType: config.unit,
                displayDigits: config.displayDigits,
                rules: { range: config.range },
              },
              value: this.state.vScale,
              scaleStep: config.scaleStep ?? 1,
              controller: {
                onValueChangeStart: (event: ValueChangeEvent) => {
                  this._onValueChangeStart(MaterialEditType.VerticalScale, event.detail.value);
                },
                onValueChange: (event: ValueChangeEvent) => {
                  this._onValueChange(MaterialEditType.VerticalScale, event.detail.value);
                },
                onValueChangeEnd: (event: ValueChangeEvent) => {
                  this._onValueChangeEnd(MaterialEditType.VerticalScale, event.detail.value);
                },
              },
            },
          ],
          proportionalOption: {
            checked: this.state.equalScale,
            showTooltip: true,
            onChange: () => {
              this._equalScale();
            },
          },
        };
        return <WidgetComponent key={index} data={sliderInputGroupData} />;

      default:
        return null;
    }
  }

  private _onValueChangeStart(editType: MaterialEditType, value: number): void {
    const { position, scale } = this.props.materialEditProps;

    switch (editType) {
      case MaterialEditType.Angle:
        position.onRotateChangeStart(value);
        break;
      case MaterialEditType.HorizontalOffset:
        position.onOffsetXChangeStart(value);
        break;
      case MaterialEditType.VerticalOffset:
        position.onOffsetYChangeStart(value);
        break;
      case MaterialEditType.HorizontalScale:
        scale.onScaleXChangeStart(value, this.state.equalScale);
        break;
      case MaterialEditType.VerticalScale:
        scale.onScaleYChangeStart(value, this.state.equalScale);
        break;
    }
  }

  private _onValueChange(editType: MaterialEditType, value: number): void {
    const { position, scale } = this.props.materialEditProps;

    switch (editType) {
      case MaterialEditType.Angle:
        position.onRotateChange(value);
        break;
      case MaterialEditType.HorizontalOffset:
        position.onOffsetXChange(value);
        break;
      case MaterialEditType.VerticalOffset:
        position.onOffsetYChange(value);
        break;
      case MaterialEditType.HorizontalScale:
        scale.onScaleXChange(value, this.state.equalScale);
        break;
      case MaterialEditType.VerticalScale:
        scale.onScaleYChange(value, this.state.equalScale);
        break;
    }
  }

  private _onValueChangeEnd(editType: MaterialEditType, value: number): void {
    const { position, scale } = this.props.materialEditProps;

    switch (editType) {
      case MaterialEditType.Angle:
        position.onRotateChangeEnd(value);
        break;
      case MaterialEditType.HorizontalOffset:
        position.onOffsetXChangeEnd(value);
        break;
      case MaterialEditType.VerticalOffset:
        position.onOffsetYChangeEnd(value);
        break;
      case MaterialEditType.HorizontalScale:
        scale.onScaleXChangeEnd(value, this.state.equalScale);
        break;
      case MaterialEditType.VerticalScale:
        scale.onScaleYChangeEnd(value, this.state.equalScale);
        break;
    }

    this._updateMaterialInfo();
  }

  private _updateMaterialInfo(): void {
    const materialInfo = this.props.materialEditProps.updateMaterialInfo();
    this.setState({
      angle: materialInfo.rotation,
      hOffset: materialInfo.sliderOffsetX,
      vOffset: materialInfo.sliderOffsetY,
      hScale: materialInfo.scaleX,
      vScale: materialInfo.scaleY,
    });
  }

  private documentClickedHidePopup(event: MouseEvent): void {
    const container = ($('#plugin-container .materialeditcard-container') as any);
    if (!container.is(event.target) && container.has(event.target).length === 0) {
      this._close();
    }
  }
}

export function ShowMaterialEditComponent(props: MaterialEditProps): void {
  let container = document.querySelector<HTMLElement>('#plugin-container .materialeditcard-container');

  if (!container) {
    container = document.createElement('div');
    container.className = 'materialeditcard-container';
    const pluginContainer = document.querySelector('#plugin-container');
    pluginContainer?.append(container);
  }

  ReactDOM.render(
    <MaterialEditCard rootDom={container} materialEditProps={props} />,
    container
  );
}