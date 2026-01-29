import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

interface PerformanceLevel {
  level: number;
  onLevelSelected?: (level: number) => void;
  signal3dPerformanceChanged?: {
    listen: (callback: (event: PerformanceChangedEvent) => void, context: unknown) => void;
  };
  onNoMoreShowStartupHint?: () => void;
  onNoMoreShowFpsLowHint?: () => void;
  onSessionlyNomoreShowStartupHint?: () => void;
}

interface PerformanceChangedEvent {
  data: {
    status: string;
    startup?: boolean;
  };
}

interface PerformanceWidgetState {
  selectedLevel: number;
  hoveredLevel?: number;
  showTooltip: boolean;
  mouseEntered?: boolean;
}

interface PerformanceWidgetProps {
  data: PerformanceLevel;
}

interface StyleObject {
  fill?: string;
  opacity?: number;
  transform?: string;
  enableBackground?: string;
}

class PerformanceWidget extends React.Component<PerformanceWidgetProps, PerformanceWidgetState> {
  static propTypes = {
    level: PropTypes.number,
    onLevelSelected: PropTypes.func
  };

  private tooltipForStartup?: boolean;

  constructor(props: PerformanceWidgetProps) {
    super(props);
    
    this.state = {
      selectedLevel: props.data.level,
      hoveredLevel: undefined,
      showTooltip: false
    };

    if (this.props.data.signal3dPerformanceChanged) {
      this.props.data.signal3dPerformanceChanged.listen(this._onPerformanceChanged, this);
    }
  }

  componentDidMount(): void {
  }

  private _getArrowDegree(level: number): number {
    let degree = -62;
    
    switch (level) {
      case 2:
        degree = 0;
        break;
      case 3:
        degree = 62;
        break;
    }
    
    return degree;
  }

  private _getArrowTransformStyle(degree: number): StyleObject {
    return {
      transform: `rotate(${degree}deg)`
    };
  }

  private _getArrowStyle(level: number): StyleObject {
    const degree = this._getArrowDegree(level);
    return this._getArrowTransformStyle(degree);
  }

  private _getLevelStyles(selectedLevel: number, hoveredLevel?: number): StyleObject[] {
    const hoverColor = "#a7d3f4";
    const selectedColor = "#55acee";
    
    return [
      {
        fill: hoveredLevel === 1 ? hoverColor : selectedLevel === 1 ? selectedColor : "#FAFAFA"
      },
      {
        fill: hoveredLevel === 2 ? hoverColor : selectedLevel === 2 ? selectedColor : "#E3E3E3"
      },
      {
        fill: hoveredLevel === 3 ? hoverColor : selectedLevel === 3 ? selectedColor : "#CFCFCF"
      }
    ];
  }

  private _onPerformanceChanged = (event: PerformanceChangedEvent): void => {
    const { data } = event;
    
    if (data.status === "low" && this.state.selectedLevel !== 3) {
      this.tooltipForStartup = data.startup;
      this.setState({
        showTooltip: true
      });
    }
  }

  private _onLevelClicked(level: number): void {
    const eventTracker = HSApp.Util.EventTrack.instance();
    let eventName: string;
    
    switch (level) {
      case 1:
        eventName = "render_speed_level_1_event";
        break;
      case 2:
        eventName = "render_speed_level_2_event";
        break;
      case 3:
        eventName = "render_speed_level_3_event";
        break;
      default:
        return;
    }
    
    eventTracker.track(HSApp.Util.EventGroupEnum.PerformanceMode, eventName);
    
    this.setState({
      selectedLevel: level
    });
    
    if (this.props.data.onLevelSelected) {
      this.props.data.onLevelSelected(level);
    }
  }

  private _onLevelHovered(level?: number): void {
    if (level !== this.state.hoveredLevel) {
      const newState: Partial<PerformanceWidgetState> = {
        hoveredLevel: level
      };
      
      if (level !== undefined && level >= 1) {
        newState.showTooltip = false;
      }
      
      this.setState(newState as PerformanceWidgetState);
      
      if (this.props.data.onSessionlyNomoreShowStartupHint) {
        this.props.data.onSessionlyNomoreShowStartupHint();
      }
    }
  }

  private _onNoMoreShowClicked(): void {
    this.setState({
      showTooltip: false
    });
    
    if (this.tooltipForStartup && this.props.data.onNoMoreShowStartupHint) {
      this.props.data.onNoMoreShowStartupHint();
    } else if (this.props.data.onNoMoreShowFpsLowHint) {
      this.props.data.onNoMoreShowFpsLowHint();
    }
  }

  private _renderLevelTooltipInfo(): JSX.Element {
    const { hoveredLevel } = this.state;
    let tooltipText = ResourceManager.getString("render_speed_level_1");
    let containerClass = "tip-container level-tip-container tip-level1";
    
    switch (hoveredLevel) {
      case 2:
        tooltipText = ResourceManager.getString("render_speed_level_2");
        containerClass = "tip-container level-tip-container tip-level2";
        break;
      case 3:
        tooltipText = ResourceManager.getString("render_speed_level_3");
        containerClass = "tip-container level-tip-container tip-level3";
        break;
    }
    
    return (
      <div className={containerClass}>
        <div className="tip-body level-tip-body">
          <p>{tooltipText}</p>
        </div>
      </div>
    );
  }

  private _renderWidgetTooltipInfo(): JSX.Element | undefined {
    if ((this.state.hoveredLevel ?? 0) >= 1 || !this.state.showTooltip) {
      return undefined;
    }
    
    let title = ResourceManager.getString("render_speed_low_tooltip_title");
    
    if (this.tooltipForStartup) {
      title = ResourceManager.getString("render_speed_tooltip_title");
    }
    
    const body = ResourceManager.getString("render_speed_tooltip_body");
    const noMoreText = ResourceManager.getString("render_speed_tooltip_nomore");
    
    return (
      <div className="tip-container widget-tip-container">
        <div className="tip-body widget-tip-body">
          <p>{title}</p>
          <p>{body}</p>
          <p className="nomore-show" onClick={() => this._onNoMoreShowClicked()}>
            {noMoreText}
          </p>
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const arrowStyle = this._getArrowStyle(this.state.selectedLevel);
    const levelStyles = this._getLevelStyles(this.state.selectedLevel, this.state.hoveredLevel);
    const hiddenStyle: StyleObject = { opacity: 0 };
    
    return (
      <div
        id="performance3dContainer"
        onMouseOver={() => this.setState({ mouseEntered: true })}
        onMouseOut={() => this.setState({ mouseEntered: false })}
      >
        <div id="performanceBoard">
          <svg
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 86 34"
            style={{ enableBackground: "new 0 0 86 34" }}
          >
            <g id="background">
              <g>
                <path
                  style={{ fill: "#F0F0F0" }}
                  d="M43,3C25.879,3,12,16.879,12,34h62C74,16.879,60.121,3,43,3z"
                />
              </g>
            </g>
            
            <g id="levels">
              <g
                id="level1"
                onMouseEnter={() => this._onLevelHovered(1)}
                onMouseOut={() => this._onLevelHovered(undefined)}
                onClick={() => this._onLevelClicked(1)}
              >
                <path
                  style={levelStyles[0]}
                  d="M12.322,34.04l30.64-0.137L27.615,7.063c0,0-6.877,3.675-11.253,11.254S12.322,34.04,12.322,34.04z"
                />
                <path style={hiddenStyle} d="M0,0L0,34L43,34L23,0z" />
              </g>
              
              <g
                id="level2"
                onMouseEnter={() => this._onLevelHovered(2)}
                onMouseOut={() => this._onLevelHovered(undefined)}
                onClick={() => this._onLevelClicked(2)}
              >
                <path
                  style={levelStyles[1]}
                  d="M27.325,7.322l15.637,26.352L58.335,7.078c0,0-6.621-4.118-15.373-4.118S27.325,7.322,27.325,7.322z"
                />
                <path style={hiddenStyle} d="M23,0L43,34L43,34L62,0z" />
              </g>
              
              <g
                id="level3"
                onMouseEnter={() => this._onLevelHovered(3)}
                onMouseOut={() => this._onLevelHovered(undefined)}
                onClick={() => this._onLevelClicked(3)}
              >
                <path
                  style={levelStyles[2]}
                  d="M57.965,7.185L42.962,33.903l30.719,0.015c0,0,0.256-7.793-4.12-15.372C65.185,10.967,57.965,7.185,57.965,7.185z"
                />
                <path style={hiddenStyle} d="M62,0L43,34L86,34L86,0z" />
              </g>
            </g>
            
            <g id="arrow" style={arrowStyle}>
              <polygon
                style={{ fill: "#FFFFFF" }}
                points="37.975,25.362 43,10.603 43,33.714"
              />
              <polygon
                style={{ fill: "#7A7A7A" }}
                points="48.025,25.362 43,10.603 43,33.714"
              />
            </g>
            
            <g id="center">
              <g>
                <path
                  style={{ opacity: 0.26, fill: "#696969" }}
                  d="M43,23.417c-1.444,0-2.82,0.293-4.072,0.822c-3.755,1.588-6.389,5.306-6.389,9.639h20.922c0-4.271-2.56-7.944-6.229-9.57C45.939,23.735,44.506,23.417,43,23.417z"
                />
                <path
                  style={{ fill: "#EBEBEB" }}
                  d="M43,24c-5.523,0-10,4.477-10,10h20C53,28.477,48.523,24,43,24z"
                />
              </g>
            </g>
          </svg>
          
          {this.state.hoveredLevel && this._renderLevelTooltipInfo()}
          {this._renderWidgetTooltipInfo()}
        </div>
      </div>
    );
  }
}

export default class Performance3DWidget {
  private _containerElement: HTMLElement;
  private _data: PerformanceLevel;

  constructor(data: PerformanceLevel, containerElement: HTMLElement) {
    this._containerElement = containerElement;
    this._data = data;
    this._render(data, containerElement);
  }

  static create(data: PerformanceLevel, containerElement: HTMLElement): Performance3DWidget {
    return new Performance3DWidget(data, containerElement);
  }

  update(data: Partial<PerformanceLevel>): void {
    Object.assign(this._data, data);
    this._render(this._data, this._containerElement);
  }

  destroy(): void {
    ReactDOM.unmountComponentAtNode(this._containerElement);
  }

  destory(): void {
    console.warn("deprecated, use destroy instead!");
    this.destroy();
  }

  private _render(data: PerformanceLevel, containerElement: HTMLElement): void {
    ReactDOM.render(<PerformanceWidget data={data} />, containerElement);
  }
}