interface Signal3dPerformanceChangedData {
  status: string;
  startup: boolean;
}

interface Signal3dPerformanceChanged {
  listen(callback: (event: { data: Signal3dPerformanceChangedData }) => void, context: any): void;
}

interface PerformanceLevel3dProps {
  data: {
    level: number;
    signal3dPerformanceChanged?: Signal3dPerformanceChanged;
    onLevelSelected?: (level: number) => void;
    onSessionlyNomoreShowStartupHint?: () => void;
  };
}

interface PerformanceLevel3dState {
  selectedLevel: number;
  hoveredLevel?: number;
  showTooltip?: boolean;
}

interface ArrowTransformStyle {
  transform: string;
}

interface LevelStyle {
  fill: string;
}

declare const HSApp: {
  Util: {
    EventTrack: {
      instance(): EventTrackInstance;
    };
    EventGroupEnum: {
      PerformanceMode: string;
    };
  };
};

interface EventTrackInstance {
  track(group: string, event: string): void;
}

declare const ResourceManager: {
  getString(key: string): string;
};

class PerformanceLevel3d extends React.Component<PerformanceLevel3dProps, PerformanceLevel3dState> {
  static propTypes = {
    level: PropTypes.number,
    onLevelSelected: PropTypes.func,
    data: PropTypes.object
  };

  static defaultProps = {
    level: 1,
    onLevelSelected: () => {},
    data: {}
  };

  private tooltipForStartup?: boolean;

  constructor(props: PerformanceLevel3dProps) {
    super(props);
    
    this.state = {
      selectedLevel: props.data.level,
      hoveredLevel: undefined
    };

    if (this.props.data.signal3dPerformanceChanged) {
      this.props.data.signal3dPerformanceChanged.listen(this._onPerformanceChanged, this);
    }
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

  private _getArrowTransformStyle(degree: number): ArrowTransformStyle {
    return {
      transform: `rotate(${degree}deg)`
    };
  }

  private _getArrowStyle(level: number): ArrowTransformStyle {
    const degree = this._getArrowDegree(level);
    return this._getArrowTransformStyle(degree);
  }

  private _getLevelStyles(selectedLevel: number, hoveredLevel?: number): LevelStyle[] {
    const HOVER_COLOR = "#c2d8ff";
    const SELECTED_COLOR = "#327dff";
    
    let level1Fill = selectedLevel === 1 ? SELECTED_COLOR : "#f0f0f0";
    let level2Fill = selectedLevel === 2 ? SELECTED_COLOR : "#e0e0e0";
    let level3Fill = selectedLevel === 3 ? SELECTED_COLOR : "#c9c9c9";

    if (hoveredLevel === 1) {
      level1Fill = HOVER_COLOR;
    }
    if (hoveredLevel === 2) {
      level2Fill = HOVER_COLOR;
    }
    if (hoveredLevel === 3) {
      level3Fill = HOVER_COLOR;
    }

    return [
      { fill: level1Fill },
      { fill: level2Fill },
      { fill: level3Fill }
    ];
  }

  private _onPerformanceChanged = (event: { data: Signal3dPerformanceChangedData }): void => {
    const { data } = event;
    
    if (data.status === "low" && this.state.selectedLevel !== 3) {
      this.tooltipForStartup = data.startup;
    }
  };

  private _onLevelClicked = (level: number): void => {
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
  };

  private _onLevelHovered = (level?: number): void => {
    if (level === this.state.hoveredLevel) {
      return;
    }

    const newState: Partial<PerformanceLevel3dState> = {
      hoveredLevel: level
    };

    if (level && level >= 1) {
      newState.showTooltip = false;
    }

    this.setState(newState as PerformanceLevel3dState);

    if (this.props.data.onSessionlyNomoreShowStartupHint) {
      this.props.data.onSessionlyNomoreShowStartupHint();
    }
  };

  private _renderLevelTooltipInfo(): JSX.Element {
    const { hoveredLevel } = this.state;
    let tooltipText = ResourceManager.getString("render_speed_level_1");
    let className = "tip-container level-tip-container tip-level1";

    switch (hoveredLevel) {
      case 2:
        tooltipText = ResourceManager.getString("render_speed_level_2");
        className = "tip-container level-tip-container tip-level2";
        break;
      case 3:
        tooltipText = ResourceManager.getString("render_speed_level_3");
        className = "tip-container level-tip-container tip-level3";
        break;
    }

    return (
      <div className={className}>
        <div className="tip-body level-tip-body">
          <p>{tooltipText}</p>
        </div>
      </div>
    );
  }

  render(): JSX.Element {
    const arrowStyle = this._getArrowStyle(this.state.selectedLevel);
    const levelStyles = this._getLevelStyles(this.state.selectedLevel, this.state.hoveredLevel);

    return (
      <div id="performance-3d-container">
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
                onMouseLeave={() => this._onLevelHovered(undefined)}
                onClick={() => this._onLevelClicked(1)}
              >
                <path
                  style={levelStyles[0]}
                  d="M12.322,34.04l30.64-0.137L27.615,7.063c0,0-6.877,3.675-11.253,11.254S12.322,34.04,12.322,34.04z"
                />
              </g>
              <g
                id="level2"
                onMouseEnter={() => this._onLevelHovered(2)}
                onMouseLeave={() => this._onLevelHovered(undefined)}
                onClick={() => this._onLevelClicked(2)}
              >
                <path
                  style={levelStyles[1]}
                  d="M27.325,7.322l15.637,26.352L58.335,7.078c0,0-6.621-4.118-15.373-4.118S27.325,7.322,27.325,7.322z"
                />
              </g>
              <g
                id="level3"
                onMouseEnter={() => this._onLevelHovered(3)}
                onMouseLeave={() => this._onLevelHovered(undefined)}
                onClick={() => this._onLevelClicked(3)}
              >
                <path
                  style={levelStyles[2]}
                  d="M57.965,7.185L42.962,33.903l30.719,0.015c0,0,0.256-7.793-4.12-15.372C65.185,10.967,57.965,7.185,57.965,7.185z"
                />
              </g>
            </g>
            <g id="arrow" style={arrowStyle}>
              <polygon points="37.975,25.362 43,10.603 43,33.714" fill="#fff" />
              <polygon points="48.025,25.362 43,10.603 43,33.714" fill="#a1a1a1" />
            </g>
            <g id="center">
              <g>
                <path
                  d="M43,24c-5.523,0-10,4.477-10,10h20C53,28.477,48.523,24,43,24z"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>
          {this.state.hoveredLevel && this._renderLevelTooltipInfo()}
        </div>
      </div>
    );
  }
}

export default PerformanceLevel3d;