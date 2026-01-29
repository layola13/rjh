import React from 'react';
import PropTypes from 'prop-types';

interface LightSlotParameters {
  width: number;
  height: number;
  blockWidth: number;
  blockHeight: number;
  flip: boolean;
  hasLightBand: boolean;
}

interface LightSlotPanelProps {
  parameters: LightSlotParameters;
  isManualAddLightSlot: boolean;
  lightSlotSizeChangeSignal: {
    listen: (callback: (event: LightSlotSizeChangeEvent) => void) => void;
    unlisten: (callback: (event: LightSlotSizeChangeEvent) => void) => void;
  };
}

interface LightSlotSizeChangeEvent {
  data: {
    width?: number;
    height?: number;
  };
}

interface LightSlotPanelState {
  width: number;
  height: number;
  blockWidth: number;
  blockHeight: number;
  flipped: boolean;
  containLightBand: boolean;
}

interface LightSlotMsgData {
  profile: Array<{ x: number; y: number }>;
  width: number;
  height: number;
  lightBandPosIndex: number;
}

const SCALE_FACTOR = 1.4;
const UNIT_CONVERSION = 100;
const STROKE_WIDTH = 1.2;
const MAX_WIDTH = 20;
const MAX_HEIGHT = 15;
const DEFAULT_BLOCK_SIZE = 6;
const WIDTH_SCALE = 3;

export default class LightSlotPanel extends React.Component<LightSlotPanelProps, LightSlotPanelState> {
  static propTypes = {
    parameters: PropTypes.object.isRequired,
    isManualAddLightSlot: PropTypes.bool.isRequired,
    lightSlotSizeChangeSignal: PropTypes.object.isRequired,
  };

  private app: any;
  private cmdMgr: any;
  private currentLightSlotWidth: number;
  private currentLightSlotHeight: number;

  constructor(props: LightSlotPanelProps) {
    super(props);

    const { parameters, isManualAddLightSlot } = props;

    this.state = {
      width: WIDTH_SCALE * (parameters.width > MAX_WIDTH ? MAX_WIDTH : parameters.width),
      height: WIDTH_SCALE * (parameters.height > MAX_HEIGHT ? MAX_HEIGHT : parameters.height),
      blockWidth: WIDTH_SCALE * parameters.blockWidth || DEFAULT_BLOCK_SIZE,
      blockHeight: WIDTH_SCALE * parameters.blockHeight || DEFAULT_BLOCK_SIZE,
      flipped: isManualAddLightSlot ? parameters.flip : !parameters.flip,
      containLightBand: parameters.hasLightBand,
    };

    this.app = (window as any).HSApp.App.getApp();
    this.cmdMgr = this.app.cmdManager;
    this.currentLightSlotWidth = parameters.width / UNIT_CONVERSION;
    this.currentLightSlotHeight = parameters.height / UNIT_CONVERSION;

    this._onLightSlotSizeChange = this._onLightSlotSizeChange.bind(this);
  }

  componentDidMount(): void {
    this.props.lightSlotSizeChangeSignal.listen(this._onLightSlotSizeChange);
  }

  componentWillUnmount(): void {
    this.props.lightSlotSizeChangeSignal.unlisten(this._onLightSlotSizeChange);
  }

  private _onLightSlotSizeChange(event: LightSlotSizeChangeEvent): void {
    const { width, height } = event.data;

    if (width) {
      this.currentLightSlotWidth = width / UNIT_CONVERSION;
      this.setState({
        width: WIDTH_SCALE * (width > MAX_WIDTH ? MAX_WIDTH : width),
      });
    }

    if (height) {
      this.currentLightSlotHeight = height / UNIT_CONVERSION;
      this.setState({
        height: WIDTH_SCALE * (height > MAX_HEIGHT ? MAX_HEIGHT : height),
      });
    }
  }

  private _renderSlot = (): JSX.Element => {
    const offset = STROKE_WIDTH;
    const rightEdge = this.state.width + offset;
    const bottomEdge = this.state.height + offset;
    const { blockWidth, blockHeight } = this.state;
    const innerRight = this.state.width - blockWidth + offset;
    const innerTop = this.state.height - blockHeight + offset;

    let pathData = `M${offset}, ${bottomEdge} L${rightEdge}, ${bottomEdge} L${rightEdge}, ${offset} L${offset}, ${offset}Z`;

    if (innerTop > 0 && innerRight > 0) {
      pathData = `M${offset}, ${bottomEdge} L${rightEdge}, ${bottomEdge} L${rightEdge}, ${offset} L${innerRight}, ${offset} L${innerRight}, ${innerTop} L${offset}, ${innerTop}Z`;
    }

    return <path d={pathData} strokeWidth={`${offset}`} />;
  };

  private _renderLightBand = (): JSX.Element => {
    const style = {
      display: this.state.containLightBand ? 'block' : 'none',
    };

    return (
      <circle
        cx={5}
        cy={5}
        r={4}
        fill="rgba(243, 208, 14, 0.5)"
        stroke="rgb(243, 208, 14)"
        style={style}
      />
    );
  };

  private _renderSlotLineWidthDimension = (): JSX.Element => {
    const offset = STROKE_WIDTH;
    const scaledWidth = SCALE_FACTOR * (this.state.width + offset);
    const scaledHeight = SCALE_FACTOR * (this.state.height + offset + 6);
    const leftTick = `M${offset}, ${scaledHeight - 4} L${offset}, ${scaledHeight + 4}`;
    const horizontalLine = `M${offset}, ${scaledHeight} L${scaledWidth}, ${scaledHeight}Z`;
    const rightTick = `M${scaledWidth}, ${scaledHeight - 4} L${scaledWidth}, ${scaledHeight + 4}`;
    const textXPosition = (scaledWidth - 37.2) / 2 - 1;

    return (
      <g>
        <path d={leftTick} />
        <path d={horizontalLine} id="slotLineWidth" />
        <path d={rightTick} />
        <text
          textAnchor="middle"
          x={`${textXPosition > 0 ? textXPosition : 0}`}
          y={`${scaledHeight + 15}`}
          style={{
            font: '11px Verdana, Helvetica, Arial, sans-serif',
            color: '#979797',
          }}
        >
          {(window as any).ResourceManager.getString('plugin_customizedModeling_lightslot_a_label')} {Math.round(1000 * this.currentLightSlotWidth)}
        </text>
      </g>
    );
  };

  private _renderSlotLineHeightDimension = (): JSX.Element => {
    const offset = STROKE_WIDTH;
    const scaledWidth = SCALE_FACTOR * (this.state.width + offset + 6);
    const scaledHeight = SCALE_FACTOR * (this.state.height + offset);
    const bottomTick = `M${scaledWidth - 4}, ${scaledHeight} L${scaledWidth + 4}, ${scaledHeight}Z`;
    const verticalLine = `M${scaledWidth}, ${scaledHeight} L${scaledWidth}, ${offset}Z`;
    const topTick = `M${scaledWidth - 4}, ${offset} L${scaledWidth + 4}, ${offset}Z`;

    return (
      <g>
        <path d={bottomTick} />
        <path d={verticalLine} id="slotLineWidth" />
        <path d={topTick} />
        <text
          textAnchor="middle"
          x={`${scaledWidth + 5}`}
          y={`${(scaledHeight - offset) / 2 + 5}`}
          style={{
            font: '11px Verdana, Helvetica, Arial, sans-serif',
            color: '#979797',
          }}
        >
          {(window as any).ResourceManager.getString('plugin_customizedModeling_lightslot_b_label')} {Math.round(1000 * this.currentLightSlotHeight)}
        </text>
      </g>
    );
  };

  private _renderFlippedSlot = (): JSX.Element => {
    const offset = STROKE_WIDTH;
    const rightEdge = this.state.width + offset;
    const bottomEdge = this.state.height + offset;
    const { blockWidth, blockHeight } = this.state;
    const innerTop = this.state.height - blockHeight + offset;
    const innerRight = this.state.width - blockWidth + offset;

    let pathData = `M${offset}, ${rightEdge} L${bottomEdge}, ${rightEdge} L${bottomEdge}, ${offset} L${offset}, ${offset}Z`;

    if (innerRight > 0 && innerTop > 0) {
      pathData = `M${offset}, ${rightEdge} L${bottomEdge}, ${rightEdge} L${bottomEdge}, ${offset} L${innerTop}, ${offset} L${innerTop}, ${innerRight} L${offset}, ${innerRight}Z`;
    }

    return <path d={pathData} id="slotLineHeight" strokeWidth={`${offset}`} />;
  };

  private _renderFlippedSlotLineWidthDimension = (): JSX.Element => {
    const offset = STROKE_WIDTH;
    const scaledWidth = SCALE_FACTOR * (this.state.width + offset);
    const scaledHeight = SCALE_FACTOR * (this.state.height + offset + 6);
    const bottomTick = `M${scaledHeight - 4}, ${scaledWidth} L${scaledHeight + 4}, ${scaledWidth}Z`;
    const verticalLine = `M${scaledHeight}, ${scaledWidth} L${scaledHeight}, ${offset}Z`;
    const topTick = `M${scaledHeight - 4}, ${offset} L${scaledHeight + 4}, ${offset}Z`;

    return (
      <g>
        <path d={bottomTick} />
        <path d={verticalLine} id="slotLineWidth" />
        <path d={topTick} />
        <text
          textAnchor="middle"
          x={`${scaledHeight + 4}`}
          y={`${(scaledWidth - offset) / 2 + 6}`}
          style={{
            font: '11px Verdana, Helvetica, Arial, sans-serif',
            color: '#333',
          }}
        >
          {(window as any).ResourceManager.getString('plugin_customizedModeling_lightslot_a_label')} {Math.round(1000 * this.currentLightSlotWidth)}
        </text>
      </g>
    );
  };

  private _renderFlippedSlotLineHeightDimension = (): JSX.Element => {
    const offset = STROKE_WIDTH;
    const scaledWidth = SCALE_FACTOR * (this.state.width + offset + 5);
    const scaledHeight = SCALE_FACTOR * (this.state.height + offset);
    const leftTick = `M${offset}, ${scaledWidth - 4} L${offset}, ${scaledWidth + 4}`;
    const horizontalLine = `M${offset}, ${scaledWidth} L${scaledHeight}, ${scaledWidth}Z`;
    const rightTick = `M${scaledHeight}, ${scaledWidth - 4} L${scaledHeight}, ${scaledWidth + 4}`;
    const textXPosition = (scaledHeight - 37.2) / 2 - 1;

    return (
      <g>
        <path d={leftTick} />
        <path d={horizontalLine} id="slotLineWidth" />
        <path d={rightTick} />
        <text
          textAnchor="middle"
          x={`${textXPosition > 0 ? textXPosition : 0}`}
          y={`${scaledWidth + 16}`}
          style={{
            font: '11px Verdana, Helvetica, Arial, sans-serif',
            color: '#333',
          }}
        >
          {(window as any).ResourceManager.getString('plugin_customizedModeling_lightslot_b_label')} {Math.round(1000 * this.currentLightSlotHeight)}
        </text>
      </g>
    );
  };

  private _renderFlippedLightBand = (): JSX.Element => {
    const style = {
      display: this.state.containLightBand ? 'block' : 'none',
    };

    return (
      <circle
        cx={5}
        cy={5}
        r={4}
        fill="rgba(243, 208, 14, 0.5)"
        stroke="rgb(243, 208, 14)"
        style={style}
      />
    );
  };

  private _getLightSlotMsgData(): LightSlotMsgData {
    const widthInCm = UNIT_CONVERSION * this.currentLightSlotWidth;
    const heightInCm = UNIT_CONVERSION * this.currentLightSlotHeight;
    let profile = [
      { x: 0, y: 0 },
      { x: widthInCm, y: 0 },
      { x: widthInCm, y: heightInCm },
      { x: widthInCm - 2, y: heightInCm },
      { x: widthInCm - 2, y: 4 },
      { x: 0, y: 4 },
    ];
    let lightBandPosIndex = 4;

    if (heightInCm <= 4) {
      profile = [
        { x: 0, y: 0 },
        { x: widthInCm, y: 0 },
        { x: widthInCm, y: 4 },
        { x: 0, y: 4 },
      ];
      lightBandPosIndex = 2;
    }

    return {
      profile,
      width: widthInCm,
      height: heightInCm,
      lightBandPosIndex,
    };
  }

  render(): JSX.Element {
    const { width, height, flipped, blockHeight } = this.state;

    const normalSlotStyle = {
      display: flipped ? 'none' : 'inline-block',
    };

    const normalLightBandStyle = {
      display: flipped ? 'none' : 'block',
      position: 'absolute' as const,
      left: 75 + (width / 2) * SCALE_FACTOR,
      top: 65 - blockHeight * SCALE_FACTOR,
    };

    const flippedSlotStyle = {
      display: flipped ? 'block' : 'none',
      position: 'absolute' as const,
      left: 78 - height * SCALE_FACTOR,
      bottom: 91 - width * SCALE_FACTOR,
    };

    const flippedLightBandStyle = {
      display: flipped ? 'block' : 'none',
      position: 'absolute' as const,
      left: 68 - blockHeight * SCALE_FACTOR,
      top: 71 + (width / 2) * SCALE_FACTOR,
    };

    const svgWidth = (width + 2) * SCALE_FACTOR;
    const svgHeight = (height + 2) * SCALE_FACTOR;

    return (
      <div className="light-slot-panel-body">
        <div className="ceiling-indicator" />
        <div className="slot" style={normalSlotStyle}>
          <div style={{ position: 'absolute', bottom: 91 }}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={svgWidth + 55} height={svgHeight + 25}>
              <g fill="rgba(174, 215, 250, 0.2)" stroke="rgb(85, 172, 238)" transform="scale(1.4, 1.4)">
                {this._renderSlot()}
              </g>
              <g stroke="rgb(151, 151, 151)" strokeWidth="0.4">
                {this._renderSlotLineWidthDimension()}
              </g>
              <g stroke="rgb(151, 151, 151)" strokeWidth="0.4">
                {this._renderSlotLineHeightDimension()}
              </g>
            </svg>
          </div>
        </div>
        <div className="slot" style={normalLightBandStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="10px" height="10px">
            <g fill="rgba(174, 215, 250, 0.2)" stroke="rgb(85, 172, 238)" strokeWidth="1.2">
              {this._renderLightBand()}
            </g>
          </svg>
        </div>
        <div className="slot-flipped" style={flippedSlotStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={svgHeight + 55} height={svgWidth + 25}>
            <g fill="rgba(174, 215, 250, 0.2)" stroke="rgb(85, 172, 238)" transform="scale(1.4, 1.4)">
              {this._renderFlippedSlot()}
            </g>
            <g stroke="rgb(151, 151, 151)" strokeWidth="0.4">
              {this._renderFlippedSlotLineWidthDimension()}
            </g>
            <g stroke="rgb(151, 151, 151)" strokeWidth="0.4">
              {this._renderFlippedSlotLineHeightDimension()}
            </g>
          </svg>
        </div>
        <div className="slot-flipped" style={flippedLightBandStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="10px" height="10px">
            <g fill="rgba(174, 215, 250, 0.2)" stroke="rgb(85, 172, 238)" strokeWidth="1.2">
              {this._renderFlippedLightBand()}
            </g>
          </svg>
        </div>
      </div>
    );
  }
}