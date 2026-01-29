import React from 'react';
import ReactDOM from 'react-dom';
import { SmartText, Button, Tooltip } from './common-ui';
import { Icons } from './icons';

interface AsyncParam {
  imgSrc?: string;
}

interface AsyncTextParam {
  text?: string;
}

interface MetaData {
  name?: string;
  iconSmallURI?: string;
  color?: string | number;
  customizedLargeViewData?: unknown;
  getCustomizedLargeViewData?: unknown;
  categoryId?: string;
  jid?: string;
  materialId?: string;
}

interface CornerIcon {
  icon: string;
  status?: string;
}

interface LabelIcon {
  type: string;
  style?: React.CSSProperties;
}

interface ImageButtonData {
  src?: string;
  color?: string | number;
  asyncParam?: Promise<AsyncParam>;
  asyncTextParam?: Promise<AsyncTextParam>;
  meta?: MetaData;
  seekId?: string;
  jid?: string;
  materialId?: string;
  categoryId?: string;
  customizedLargeViewData?: unknown;
  getCustomizedLargeViewData?: unknown;
  className?: string;
  disabled?: boolean;
  titleLabel?: string;
  size?: string;
  disableIcon?: boolean;
  icon?: string;
  tooltipEle?: React.ReactNode;
  materialEditIcon?: boolean;
  resetable?: boolean;
  cornerIcon?: CornerIcon;
  labelIcon?: LabelIcon;
  label?: string;
  onClick?: (event: React.MouseEvent) => void;
  onIconClick?: (event: React.MouseEvent) => void;
  materialResetClick?: (event: React.MouseEvent) => void;
  materialEditClick?: (event: React.MouseEvent) => void;
}

interface ImageButtonProps {
  id?: string;
  data: ImageButtonData;
}

interface ImageButtonState {
  src?: string;
  color?: string;
  text?: string;
  meta: MetaData | null;
  hoverOnImage: boolean;
}

export default class PropertyBarImageButton extends React.Component<ImageButtonProps, ImageButtonState> {
  constructor(props: ImageButtonProps) {
    super(props);
    
    const { data } = props;
    this.state = {
      src: data.src,
      color: undefined,
      text: undefined,
      meta: null,
      hoverOnImage: false
    };
  }

  componentDidMount(): void {
    const { data } = this.props;
    this.asyncUpdateParam(data);
    
    if (data.meta) {
      this.setState({ meta: { ...data.meta } });
    } else if (data.seekId) {
      this.setMetaBySeekId(data.seekId);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: ImageButtonProps): void {
    const { data } = nextProps;
    
    if (data.src !== this.state.src) {
      this.setState({ src: data.src });
    }
    
    this.asyncUpdateParam(data);
    
    if (data.meta) {
      this.setState({ meta: { ...data.meta } });
    } else if (data.seekId) {
      this.setMetaBySeekId(data.seekId);
    } else {
      this.setState({ meta: null });
    }
  }

  asyncUpdateParam(data: ImageButtonData): void {
    if (data.asyncParam instanceof Promise) {
      data.asyncParam.then((result) => {
        if (result?.imgSrc) {
          this.setState({ src: result.imgSrc });
        }
      });
    }
    
    if (data.asyncTextParam instanceof Promise) {
      data.asyncTextParam.then((result) => {
        if (result?.text) {
          this.setState({ text: result.text });
        }
      });
    }
  }

  setMetaBySeekId(seekId: string): void {
    if (seekId && seekId !== 'local' && seekId !== 'generated') {
      const app = (window as any).HSApp.App.getApp();
      const metaData = app.materialManager.getMetaData(seekId);
      
      if (metaData) {
        this.setState({ meta: { ...metaData } });
      } else {
        app.catalogManager.getProductBySeekId(seekId)
          .then((product: MetaData) => {
            this.setState({ meta: { ...product } });
          })
          .catch((error: Error) => {
            // Handle error silently
          });
      }
    } else {
      this.setState({ meta: null });
    }
  }

  showDetailsPanel(): void {
    const { meta } = this.state;
    if (!meta) return;

    const { data } = this.props;
    const { jid, materialId, categoryId } = data;
    
    const enrichedMeta = { ...meta };
    
    if (data.customizedLargeViewData) {
      Object.assign(enrichedMeta, { customizedLargeViewData: data.customizedLargeViewData });
    }
    
    if (data.getCustomizedLargeViewData) {
      Object.assign(enrichedMeta, { getCustomizedLargeViewData: data.getCustomizedLargeViewData });
    }
    
    Object.assign(enrichedMeta, { categoryId, jid, materialId });
    
    const app = (window as any).HSApp.App.getApp();
    const guidePlugin = app.pluginManager.getPlugin((window as any).HSFPConstants.PluginType.Guide);
    
    if (!guidePlugin || !guidePlugin.showGuide()) {
      const propertyBarPosition = app.layoutMgr.getPosition('PropertyBar');
      const element = ReactDOM.findDOMNode(this) as Element;
      const rect = element.getBoundingClientRect();
      const top = rect.top;
      const left = propertyBarPosition.left;
      const position = {
        top,
        right: document.documentElement.offsetWidth - left + 8
      };
      
      (window as any).LargeView.showLargeView(enrichedMeta, position, false);
    }
  }

  hideDetailsPanel(): void {
    if (this.state.meta) {
      (window as any).LargeView.hideLargeView();
    }
  }

  handleClick(event: React.MouseEvent): void {
    const { data } = this.props;
    const { disabled = false, onClick } = data;
    
    if (!disabled && onClick) {
      onClick(event);
    }
  }

  handleIconClick(event: React.MouseEvent): void {
    const { onIconClick } = this.props.data;
    if (onIconClick) {
      onIconClick(event);
    }
  }

  handleMaterialResetClick(event: React.MouseEvent): void {
    event.stopPropagation();
    const { materialResetClick } = this.props.data;
    if (materialResetClick) {
      materialResetClick(event);
    }
  }

  handleMaterialEditClick(event: React.MouseEvent): void {
    const { materialEditClick } = this.props.data;
    if (materialEditClick) {
      materialEditClick(event);
    }
  }

  getNameFromMeta(meta: MetaData | null): string {
    return meta?.name ?? '';
  }

  getSrcFromMeta(meta: MetaData | null): string {
    return meta?.iconSmallURI ?? '';
  }

  renderCornerIcon(): React.ReactNode {
    const { data } = this.props;
    const { disabled, cornerIcon } = data;
    
    let containerClass = 'property-bar-image-triangle-container';
    let triangleClass = 'property-bar-image-triangle';
    let iconType = 'hs_xiao_shijiantou_tuozhan';
    
    if (cornerIcon) {
      containerClass += '-cornericon';
      iconType = cornerIcon.icon;
      
      if (cornerIcon.status) {
        triangleClass += ` property-bar-image-triangle_${cornerIcon.status}`;
      }
    }
    
    if (disabled) {
      containerClass += '_disabled';
      iconType = 'hs_xiao_jinyong';
    }
    
    return (
      <div className={containerClass}>
        <div className={triangleClass}>
          <Icons type={iconType} />
        </div>
      </div>
    );
  }

  renderLabel(): React.ReactNode {
    const { data } = this.props;
    const { labelIcon, label } = data;
    const { meta } = this.state;
    
    const iconStyle = labelIcon?.style ?? { color: '#f5aea3' };
    const iconType = labelIcon?.type;
    const displayText = label ?? this.getNameFromMeta(meta);
    
    return (
      <div className="property-bar-image-button-label-text-container">
        {iconType && <Icons type={iconType} style={iconStyle} />}
        <SmartText className="property-bar-image-button-label-text" placement="right">
          {displayText}
        </SmartText>
      </div>
    );
  }

  render(): React.ReactNode {
    const { id, data } = this.props;
    const {
      className = '',
      disabled = false,
      titleLabel,
      size,
      disableIcon = true,
      icon = 'hs_shuxingmianban_xuanzhuan45',
      tooltipEle,
      materialEditIcon,
      resetable
    } = data;
    
    const { text, meta } = this.state;
    let { src, color } = this.state;
    
    let labelMode = '';
    if (disableIcon || materialEditIcon) {
      if (!disableIcon && materialEditIcon) {
        labelMode = 'mini-label';
      }
    } else {
      labelMode = 'short-label';
    }
    
    src = src ?? meta?.iconSmallURI;
    
    if (!src) {
      color = color ?? meta?.color ?? data.color;
      
      if (color) {
        const colorNum = typeof color === 'string' ? parseInt(color) : color;
        let hexStr = colorNum.toString(16);
        hexStr = '#' + '0'.repeat(6 - hexStr.length) + hexStr;
        color = hexStr;
      }
    }
    
    src = src ?? this.getSrcFromMeta(meta);
    
    const wrapStyle: React.CSSProperties = color ? { backgroundColor: color } : {};
    
    let content = (
      <div className="property-bar-image-button-area">
        <div
          className="property-bar-image-panel"
          onMouseEnter={() => {
            this.showDetailsPanel();
            this.setState({ hoverOnImage: true });
          }}
          onMouseLeave={() => {
            this.hideDetailsPanel();
            this.setState({ hoverOnImage: false });
          }}
          onClick={(event) => this.handleClick(event)}
        >
          <div className="property-bar-image-button-image">
            <div className="property-bar-image-wrap" style={wrapStyle}>
              {src && (
                <img
                  src={(window as any).HSApp.Util.Url.getCNameURL(src, 5)}
                  alt=""
                />
              )}
            </div>
            <span className="property-bar-image-text">{text}</span>
            {this.state.hoverOnImage && !disabled && (
              <div className="property-bar-image-hover-icon">
                <Icons type="replace" />
              </div>
            )}
            {this.renderCornerIcon()}
          </div>
          <div className={`property-bar-image-button-label ${labelMode}`}>
            {titleLabel && (
              <SmartText className="property-bar-image-button-title-label" placement="right">
                {titleLabel}
              </SmartText>
            )}
            {this.renderLabel()}
            {size && (
              <SmartText className="property-bar-image-button-size-label" placement="right">
                {size}
              </SmartText>
            )}
          </div>
          {resetable && (
            <Button
              ghost
              className="material-reset"
              onClick={(event) => this.handleMaterialResetClick(event)}
            >
              <span>恢复默认</span>
            </Button>
          )}
        </div>
        {!disableIcon && (
          <div
            className="property-bar-image-button-icon"
            onClick={(event) => this.handleIconClick(event)}
          >
            <Icons type={icon} />
          </div>
        )}
        {materialEditIcon && (
          <div
            className="property-bar-image-button-icon"
            onClick={(event) => this.handleMaterialEditClick(event)}
          >
            <Icons type="hs_icon_tiaozheng" />
          </div>
        )}
      </div>
    );
    
    if (tooltipEle) {
      content = (
        <Tooltip
          overlayClassName="property-bar-image-button-tooltip"
          color="dark"
          placement="top"
          title={tooltipEle}
        >
          {content}
        </Tooltip>
      );
    }
    
    return (
      <div
        id={id}
        className={`property-bar-image-button ${className}${disabled ? ' disabled' : ''}`}
      >
        {content}
      </div>
    );
  }
}