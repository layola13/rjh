import React from 'react';
import { IconfontView } from './IconfontView';
import { HSCore } from './HSCore';
import './CompassWidget.css';

interface Point {
  x: number;
  y: number;
}

interface CompassWidgetProps {
  degree?: number;
  onDragStop: (degree: number) => void;
}

interface CompassWidgetState {
  degree: number;
  active: boolean;
  dragging: boolean;
  show: boolean;
  isMouseOver: boolean;
}

interface Position {
  top: number;
  left: number;
}

interface DragEvent {
  clientX: number;
  clientY: number;
}

interface JQueryDragUIPosition {
  position: {
    top: number;
    left: number;
  };
}

export class CompassWidget extends React.Component<CompassWidgetProps, CompassWidgetState> {
  private readonly defaultPosition: Position;
  private readonly compassWidth: number;
  private readonly circleRadius: number;
  private readonly circleStrokeWidth: number;
  private readonly circleStroke: string;
  private readonly centerPoint: Point;
  private startPoint: Point;
  private startDegree: number;
  private signalHook: HSCore.Util.SignalHook;

  constructor(props: CompassWidgetProps) {
    super(props);

    this.state = {
      degree: props.degree || 0,
      active: false,
      dragging: false,
      show: true,
      isMouseOver: false
    };

    this.defaultPosition = {
      top: 80,
      left: 380
    };

    this.compassWidth = 80;
    this.circleRadius = 28;
    this.circleStrokeWidth = 3;
    this.circleStroke = '#396EFE';

    this.centerPoint = {
      x: this.defaultPosition.left + this.compassWidth / 2,
      y: this.defaultPosition.top + this.compassWidth / 2
    };

    this.startPoint = {
      x: this.centerPoint.x,
      y: this.centerPoint.y
    };

    this.startDegree = 0;
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  componentDidMount(): void {
    $('#compass .dragarea').draggable({
      drag: this.onDrag.bind(this),
      start: this.onStart.bind(this),
      stop: this.onStop.bind(this)
    });
  }

  componentWillUnmount(): void {
    this.signalHook.unlistenAll();
  }

  show(): void {
    this.setState({
      show: true
    });
  }

  hide(): void {
    this.setState({
      show: false
    });
  }

  updateDegree(degree: number): void {
    this.setState({
      degree
    });
  }

  private handleMouseOver = (): void => {
    this.setState({
      isMouseOver: true
    });
  };

  private handleMouseOut = (): void => {
    this.setState({
      isMouseOver: false
    });
  };

  private onStart(event: DragEvent): void {
    this.startPoint.x = event.clientX;
    this.startPoint.y = event.clientY;
    this.startDegree = this.state.degree;
    this.setState({
      dragging: true
    });
  }

  private onStop(): void {
    this.setState({
      dragging: false
    });
    this.props.onDragStop(this.state.degree);
  }

  private onDrag(event: DragEvent, ui: JQueryDragUIPosition): void {
    const offsetTop = Math.round(ui.position.top - this.defaultPosition.top);
    if (!isNaN(offsetTop) && offsetTop !== 0) {
      const nowDegree = this.getNowDegree({
        x: event.clientX,
        y: event.clientY
      });
      this.setState({
        degree: nowDegree
      });
    }
  }

  private getStrokeDashArray(degree: number): string {
    const ratio = degree / 360;
    const circumference = 2 * Math.PI * this.circleRadius;
    return `${circumference * ratio} ${circumference * (1 - ratio)}`;
  }

  private getTransformStyle(degree: number): React.CSSProperties {
    return {
      transform: `rotate(${degree}deg)`,
      WebkitTransform: `rotate(${degree}deg)`,
      MozTransform: `rotate(${degree}deg)`
    };
  }

  private getNowDegree(point: Point): number {
    const angleDiff = -Math.round(
      HSCore.Util.Math.lineLineAngleCCW(
        this.centerPoint,
        this.startPoint,
        this.centerPoint,
        point
      )
    );
    let newDegree = this.startDegree + angleDiff;
    if (newDegree < 0) {
      newDegree += 360;
    }
    return newDegree % 360;
  }

  private getCircleTransformMatrix(): string {
    return `matrix(0, -1, 1, 0, 0, ${this.compassWidth})`;
  }

  private toggleCompass(active: boolean): void {
    this.setState({
      active
    });
  }

  render(): React.ReactNode {
    const transformStyle = this.getTransformStyle(this.state.degree);
    const strokeDashArray = this.getStrokeDashArray(this.state.degree);
    const { active, dragging, degree, show, isMouseOver } = this.state;

    return (
      <div
        className="compasswidget"
        style={{
          ...this.defaultPosition,
          display: show ? 'block' : 'none'
        }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        <div
          className="compasspercentage"
          style={{
            display: isMouseOver ? 'block' : 'none'
          }}
        >
          <svg width={this.compassWidth} height={this.compassWidth}>
            <circle
              cx={this.compassWidth / 2}
              cy={this.compassWidth / 2}
              r={this.circleRadius}
              strokeWidth={this.circleStrokeWidth}
              stroke="#CED0D5"
              fill="none"
            />
          </svg>
          <svg width={this.compassWidth} height={this.compassWidth}>
            <circle
              cx={this.compassWidth / 2}
              cy={this.compassWidth / 2}
              r={this.circleRadius}
              strokeWidth={this.circleStrokeWidth}
              stroke={this.circleStroke}
              fill="none"
              transform={this.getCircleTransformMatrix()}
              strokeDasharray={strokeDashArray}
            />
          </svg>
        </div>
        <div
          id="compass"
          style={transformStyle}
          draggable={true}
          onMouseEnter={() => this.toggleCompass(true)}
          onMouseLeave={() => this.toggleCompass(false)}
        >
          <IconfontView
            customClass="dragarea ui-draggable"
            showType={active || dragging ? 'hs_huabu_zhibeizhen_hover' : 'hs_huabu_zhibeizhen'}
            customStyle={{
              fontSize: '30px'
            }}
          />
        </div>
        <div
          className="compassdegree"
          style={{
            display: isMouseOver ? 'block' : 'none'
          }}
        >
          <div className="anglediv">
            <IconfontView
              showType="hs_huabu_zhibeizhenjiaodu"
              customStyle={{
                fontSize: '18px'
              }}
            />
          </div>
          <span>{degree}°</span>
          <div className="clear" />
        </div>
      </div>
    );
  }
}