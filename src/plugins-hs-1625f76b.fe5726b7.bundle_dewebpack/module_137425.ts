import React from 'react';

const SCALE_FACTOR = 1.4;
const BASE_OFFSET = 1.2;
const STROKE_WIDTH = 1.2;
const LIGHT_BAND_RADIUS = 4;
const LIGHT_BAND_CENTER = 5;
const DIMENSION_OFFSET = 6;
const DIMENSION_LINE_LENGTH = 4;
const TEXT_WIDTH_ESTIMATE = 37.2;
const FONT_STYLE = '11px Verdana, Helvetica, Arial, sans-serif';
const TEXT_COLOR = '#979797';
const TEXT_COLOR_DARK = '#333';
const MAX_WIDTH = 0.2;
const MAX_HEIGHT = 0.15;
const SIZE_MULTIPLIER = 300;
const BLOCK_SIZE = 6;

interface LightSlotParameters {
  aLength: number;
  bLength: number;
}

interface LightSlotPanelProps {
  parameters: LightSlotParameters;
  isFlip: boolean;
  hasSelsHostLightBands: boolean;
}

interface LightSlotPanelState {
  width: number;
  height: number;
  blockWidth: number;
  blockHeight: number;
  flipped: boolean;
  containLightBand: boolean;
}

interface App {
  cmdManager: unknown;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSApp;
declare const ResourceManager: {
  getString(key: string): string;
};

export default class LightSlotPanel extends React.Component<LightSlotPanelProps, LightSlotPanelState> {
  private app: App;
  private cmdMgr: unknown;

  constructor(props: LightSlotPanelProps) {
    super(props);

    this.state = {
      width: SIZE_MULTIPLIER * (props.parameters.bLength > MAX_WIDTH ? MAX_WIDTH : props.parameters.bLength),
      height: SIZE_MULTIPLIER * (props.parameters.aLength > MAX_HEIGHT ? MAX_HEIGHT : props.parameters.aLength),
      blockWidth: BLOCK_SIZE,
      blockHeight: BLOCK_SIZE,
      flipped: props.isFlip,
      containLightBand: props.hasSelsHostLightBands
    };

    this.app = HSApp.App.getApp();
    this.cmdMgr = this.app.cmdManager;
  }

  private _renderSlot = (): JSX.Element => {
    const { width, height, blockWidth, blockHeight } = this.state;
    const startX = BASE_OFFSET;
    const endX = width + BASE_OFFSET;
    const endY = height + BASE_OFFSET;
    const innerX = width - blockWidth + BASE_OFFSET;
    const innerY = height - blockHeight + BASE_OFFSET;

    let pathData = `M${startX}, ${endY} L${endX}, ${endY} L${endX}, ${startX} L${startX}, ${startX}Z`;

    if (innerY > 0 && innerX > 0) {
      pathData = `M${startX}, ${endY} L${endX}, ${endY} L${endX}, ${startX} L${innerX}, ${startX} L${innerX}, ${innerY} L${startX}, ${innerY}Z`;
    }

    return (
      <path d={pathData} strokeWidth={`${BASE_OFFSET}`} />
    );
  };

  private _renderLightBand = (): JSX.Element => {
    const style = {
      display: this.state.containLightBand ? 'block' : 'none'
    };

    return (
      <circle
        cx={LIGHT_BAND_CENTER}
        cy={LIGHT_BAND_CENTER}
        r={LIGHT_BAND_RADIUS}
        fill="rgba(243, 208, 14, 0.5)"
        stroke="rgb(243, 208, 14)"
        style={style}
      />
    );
  };

  private _renderSlotLineWidthDimension = (): JSX.Element => {
    const { width, height } = this.state;
    const endX = SCALE_FACTOR * (width + BASE_OFFSET);
    const lineY = SCALE_FACTOR * (height + BASE_OFFSET + DIMENSION_OFFSET);
    const leftTickPath = `M${BASE_OFFSET}, ${lineY - DIMENSION_LINE_LENGTH} L${BASE_OFFSET}, ${lineY + DIMENSION_LINE_LENGTH}`;
    const horizontalLinePath = `M${BASE_OFFSET}, ${lineY} L${endX}, ${lineY}Z`;
    const rightTickPath = `M${endX}, ${lineY - DIMENSION_LINE_LENGTH} L${endX}, ${lineY + DIMENSION_LINE_LENGTH}`;
    const textX = (endX - TEXT_WIDTH_ESTIMATE) / 2 - 1;

    return (
      <g>
        <path d={leftTickPath} />
        <path d={horizontalLinePath} id="slotLineWidth" />
        <path d={rightTickPath} />
        <text
          textAnchor="left"
          x={`${textX > 0 ? textX : 0}`}
          y={`${lineY + 15}`}
          style={{ font: FONT_STYLE, color: TEXT_COLOR }}
        >
          {ResourceManager.getString('plugin_customizedModeling_lightslot_a_label')} {Math.round(1000 * this.props.parameters.bLength)}
        </text>
      </g>
    );
  };

  private _renderSlotLineHeightDimension = (): JSX.Element => {
    const { width, height } = this.state;
    const lineX = SCALE_FACTOR * (width + BASE_OFFSET + DIMENSION_OFFSET);
    const endY = SCALE_FACTOR * (height + BASE_OFFSET);
    const bottomTickPath = `M${lineX - DIMENSION_LINE_LENGTH}, ${endY} L${lineX + DIMENSION_LINE_LENGTH}, ${endY}Z`;
    const verticalLinePath = `M${lineX}, ${endY} L${lineX}, ${BASE_OFFSET}Z`;
    const topTickPath = `M${lineX - DIMENSION_LINE_LENGTH}, ${BASE_OFFSET} L${lineX + DIMENSION_LINE_LENGTH}, ${BASE_OFFSET}Z`;

    return (
      <g>
        <path d={bottomTickPath} />
        <path d={verticalLinePath} id="slotLineWidth" />
        <path d={topTickPath} />
        <text
          textAnchor="middle"
          x={`${lineX + 5}`}
          y={`${(endY - BASE_OFFSET) / 2 + 5}`}
          style={{ font: FONT_STYLE, color: TEXT_COLOR }}
        >
          {ResourceManager.getString('plugin_customizedModeling_lightslot_b_label')} {Math.round(1000 * this.props.parameters.aLength)}
        </text>
      </g>
    );
  };

  private _renderFlippedSlot = (): JSX.Element => {
    const { width, height, blockWidth, blockHeight } = this.state;
    const startX = BASE_OFFSET;
    const endX = width + BASE_OFFSET;
    const endY = height + BASE_OFFSET;
    const innerX = height - blockHeight + BASE_OFFSET;
    const innerY = width - blockWidth + BASE_OFFSET;

    let pathData = `M${startX}, ${endX} L${endY}, ${endX} L${endY}, ${startX} L${startX}, ${startX}Z`;

    if (innerY > 0 && innerX > 0) {
      pathData = `M${startX}, ${endX} L${endY}, ${endX} L${endY}, ${startX} L${innerX}, ${startX} L${innerX}, ${innerY} L${startX}, ${innerY}Z`;
    }

    return (
      <path d={pathData} id="slotLineHeight" strokeWidth={`${BASE_OFFSET}`} />
    );
  };

  private _renderFlippedSlotLineWidthDimension = (): JSX.Element => {
    const { width, height } = this.state;
    const endX = SCALE_FACTOR * (width + BASE_OFFSET);
    const lineY = SCALE_FACTOR * (height + BASE_OFFSET + DIMENSION_OFFSET);
    const bottomTickPath = `M${lineY - DIMENSION_LINE_LENGTH}, ${endX} L${lineY + DIMENSION_LINE_LENGTH}, ${endX}Z`;
    const verticalLinePath = `M${lineY}, ${endX} L${lineY}, ${BASE_OFFSET}Z`;
    const topTickPath = `M${lineY - DIMENSION_LINE_LENGTH}, ${BASE_OFFSET} L${lineY + DIMENSION_LINE_LENGTH}, ${BASE_OFFSET}Z`;

    return (
      <g>
        <path d={bottomTickPath} />
        <path d={verticalLinePath} id="slotLineWidth" />
        <path d={topTickPath} />
        <text
          textAnchor="middle"
          x={`${lineY + 4}`}
          y={`${(endX - BASE_OFFSET) / 2 + 6}`}
          style={{ font: FONT_STYLE, color: TEXT_COLOR_DARK }}
        >
          {ResourceManager.getString('plugin_customizedModeling_lightslot_a_label')} {Math.round(1000 * this.props.parameters.bLength)}
        </text>
      </g>
    );
  };

  private _renderFlippedSlotLineHeightDimension = (): JSX.Element => {
    const { width, height } = this.state;
    const lineX = SCALE_FACTOR * (width + BASE_OFFSET + 5);
    const endY = SCALE_FACTOR * (height + BASE_OFFSET);
    const leftTickPath = `M${BASE_OFFSET}, ${lineX - DIMENSION_LINE_LENGTH} L${BASE_OFFSET}, ${lineX + DIMENSION_LINE_LENGTH}`;
    const horizontalLinePath = `M${BASE_OFFSET}, ${lineX} L${endY}, ${lineX}Z`;
    const rightTickPath = `M${endY}, ${lineX - DIMENSION_LINE_LENGTH} L${endY}, ${lineX + DIMENSION_LINE_LENGTH}`;
    const textX = (endY - TEXT_WIDTH_ESTIMATE) / 2 - 1;

    return (
      <g>
        <path d={leftTickPath} />
        <path d={horizontalLinePath} id="slotLineWidth" />
        <path d={rightTickPath} />
        <text
          textAnchor="left"
          x={`${textX > 0 ? textX : 0}`}
          y={`${lineX + 16}`}
          style={{ font: FONT_STYLE, color: TEXT_COLOR_DARK }}
        >
          {ResourceManager.getString('plugin_customizedModeling_lightslot_b_label')} {Math.round(1000 * this.props.parameters.aLength)}
        </text>
      </g>
    );
  };

  private _renderFlippedLightBand = (): JSX.Element => {
    const style = {
      display: this.state.containLightBand ? 'block' : 'none'
    };

    return (
      <circle
        cx={LIGHT_BAND_CENTER}
        cy={LIGHT_BAND_CENTER}
        r={LIGHT_BAND_RADIUS}
        fill="rgba(243, 208, 14, 0.5)"
        stroke="rgb(243, 208, 14)"
        style={style}
      />
    );
  };

  render(): JSX.Element {
    const { width, height, flipped, blockHeight } = this.state;

    const normalSlotStyle: React.CSSProperties = {
      display: flipped ? 'none' : 'inline-block'
    };

    const normalLightBandStyle: React.CSSProperties = {
      display: flipped ? 'none' : 'block',
      position: 'absolute',
      left: 62 + width * SCALE_FACTOR,
      top: 68 - blockHeight * SCALE_FACTOR
    };

    const flippedSlotStyle: React.CSSProperties = {
      display: flipped ? 'block' : 'none',
      position: 'absolute',
      left: 78 - height * SCALE_FACTOR,
      bottom: 110 - width * SCALE_FACTOR
    };

    const flippedLightBandStyle: React.CSSProperties = {
      display: flipped ? 'block' : 'none',
      position: 'absolute',
      left: 69 - blockHeight * SCALE_FACTOR,
      top: 60 + width * SCALE_FACTOR
    };

    const svgWidth = (width + 2) * SCALE_FACTOR;
    const svgHeight = (height + 2) * SCALE_FACTOR;

    return (
      <div className="light-slot-panel-body">
        <div className="ceiling-indicator" />
        <div className="slot" style={normalSlotStyle}>
          <div style={{ position: 'absolute', bottom: 110 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width={svgWidth + 55}
              height={svgHeight + 25}
            >
              <g
                fill="rgba(174, 215, 250, 0.2)"
                stroke="rgb(85, 172, 238)"
                transform="scale(1.4, 1.4)"
              >
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={svgHeight + 55}
            height={svgWidth + 25}
          >
            <g
              fill="rgba(174, 215, 250, 0.2)"
              stroke="rgb(85, 172, 238)"
              transform="scale(1.4, 1.4)"
            >
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