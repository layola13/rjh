interface Position {
  x: number;
  y: number;
}

interface TooltipProps {
  position: Position;
  icon?: string;
  title?: string;
  color?: string;
  blend?: boolean;
}

interface TooltipConfig {
  icon?: string;
  title?: string;
  color?: string;
  blend?: boolean;
}

/**
 * Tooltip component that displays icon, title, and color information
 */
class TooltipComponent extends React.Component<TooltipProps> {
  render(): React.ReactNode {
    const { position, icon, title, color, blend } = this.props;

    const containerStyle: React.CSSProperties = {
      position: 'fixed',
      left: `${position.x + 10}px`,
      top: `${position.y + 15}px`,
      zIndex: 1000,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: '12px',
      color: '#fff',
      height: '28px',
      padding: '0 10px',
      lineHeight: '28px',
      background: 'rgba(25, 25, 30, 0.8)',
      boxShadow: '0px 0px 8px 0px rgba(25, 25, 50, 0.15)',
      borderRadius: '2px',
      marginBottom: '10px',
    };

    const iconContainerStyle: React.CSSProperties = {
      width: '54px',
      height: '54px',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '2px',
      boxShadow: '0px 0px 5px 0px rgba(25, 25, 35, 0.4)',
    };

    const imageStyle: React.CSSProperties = {
      width: '48px',
      height: '48px',
    };

    const colorOverlayStyle: React.CSSProperties = {
      background: color,
    };

    const colorBackgroundStyle: React.CSSProperties = {
      width: '48px',
      height: '48px',
      backgroundColor: color,
    };

    return (
      <div style={containerStyle}>
        {title ? (
          <div
            style={titleStyle}
            dangerouslySetInnerHTML={{ __html: title }}
          />
        ) : null}
        {blend ? (
          <div style={iconContainerStyle}>
            <div style={colorBackgroundStyle}>
              <img
                style={{ ...imageStyle, mixBlendMode: 'darken' }}
                src={icon}
                alt=""
              />
            </div>
          </div>
        ) : icon ? (
          <div style={iconContainerStyle}>
            <img style={imageStyle} src={icon} alt="" />
          </div>
        ) : color ? (
          <div style={iconContainerStyle}>
            <div style={{ ...imageStyle, ...colorOverlayStyle }} />
          </div>
        ) : undefined}
      </div>
    );
  }
}

/**
 * Tooltip manager class that handles rendering and lifecycle of tooltips
 */
class TooltipManager {
  private container: HTMLDivElement | null;
  private icon?: string;
  private title?: string;
  private color?: string;
  private blend?: boolean;
  private position?: Position;

  constructor(config: TooltipConfig) {
    this.container = document.createElement('div');
    this.icon =
      config.icon && !HSApp.Util.Url.isDataUrl(config.icon)
        ? HSCore.Material.Util.getIconURI(config.icon)
        : config.icon;
    this.title = config.title;
    this.color = config.color;
    this.blend = config.blend;
  }

  /**
   * Initialize the tooltip by appending container to document body
   */
  init(): void {
    document.body.appendChild(this.container);
  }

  /**
   * Render the tooltip at the specified position
   * @param position - The position to render the tooltip
   * @param customTitle - Optional custom title to override the default
   */
  render(position?: Position, customTitle?: string): void {
    this.position = position ?? this.position;

    if (!this.container) {
      return;
    }

    if (this.blend) {
      ReactDOM.render(
        <TooltipComponent
          position={this.position!}
          icon={this.icon}
          title={this.title}
          color={this.color}
          blend={this.blend}
        />,
        this.container
      );
    } else if (this.icon) {
      ReactDOM.render(
        <TooltipComponent
          position={this.position!}
          icon={this.icon}
          title={this.title}
        />,
        this.container
      );
    } else if (this.color || this.title) {
      ReactDOM.render(
        <TooltipComponent
          position={this.position!}
          color={this.color}
          title={this.title}
        />,
        this.container
      );
    }

    if (customTitle) {
      ReactDOM.render(
        <TooltipComponent
          position={this.position!}
          icon={this.icon}
          color={this.color}
          title={customTitle}
          blend={this.blend}
        />,
        this.container
      );
    }

    if (customTitle !== undefined) {
      ReactDOM.render(
        <TooltipComponent
          position={this.position!}
          icon={this.icon}
          color={this.color}
          title={customTitle}
          blend={this.blend}
        />,
        this.container
      );
    }
  }

  /**
   * Destroy the tooltip and clean up resources
   */
  destroy(): void {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
      document.body.removeChild(this.container);
    }
    this.container = null;
  }
}

export default TooltipManager;