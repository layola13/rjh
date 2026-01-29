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

interface HSApp {
  App: {
    getApp: () => {
      cmdManager: unknown;
    };
  };
}

interface ResourceManager {
  getString: (key: string) => string;
}

declare const HSApp: HSApp;
declare const ResourceManager: ResourceManager;

const SCALE_FACTOR = 1.4;
const UNIT_SCALE = 100;

class LightSlotPanel extends React.Component<LightSlotPanelProps, LightSlotPanelState> {
  static propTypes = {
    parameters: PropTypes.object.isRequired,
    isManualAddLightSlot: PropTypes.bool.isRequired,
    lightSlotSizeChangeSignal: PropTypes.object.isRequired
  };

  private app: ReturnType<HSApp['App']['getApp']>;
  private cmdMgr: unknown;
  private currentLightSlotWidth: number;
  private currentLightSlotHeight: number;

  constructor(props: LightSlotPanelProps) {
    super(props);

    const maxWidth = 20;
    const maxHeight = 15;
    const defaultBlockSize = 6;

    this.state = {
      width: 3 * (props.parameters.width > maxWidth ? maxWidth : props.parameters.width),
      height: 3 * (props.parameters.height > maxHeight ? maxHeight : props.parameters.height),
      blockWidth: 3 * props.parameters.blockWidth || defaultBlockSize,
      blockHeight: 3 * props.parameters.blockHeight || defaultBlockSize,
      flipped: props.isManualAddLightSlot ? props.parameters.flip : !props.parameters.flip,
      containLightBand: props.parameters.hasLightBand
    };

    this.app = HSApp.App.getApp();
    this.cmdMgr = this.app.cmdManager;
    this.currentLightSlotWidth = props.parameters.width / UNIT_SCALE;
    this.currentLightSlotHeight = props.parameters.height / UNIT_SCALE;

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
    const maxWidth = 20;
    const maxHeight = 15;

    if (width) {
      this.currentLightSlotWidth = width / UNIT_SCALE;
      this.setState({
        width: 3 * (width > maxWidth ? maxWidth : width)
      });
    }

    if (height) {
      this.currentLightSlotHeight = height / UNIT_SCALE;
      this.setState({
        height: 3 * (height > maxHeight ? maxHeight : height)
      });
    }
  }

  private _renderSlot = (): React.ReactElement => {
    const strokeOffset = 1.2;
    const rightEdge = this.state.width + strokeOffset;
    const bottomEdge = this.state.height + strokeOffset;
    const blockWidth = this.state.blockWidth;
    const blockHeight = this.state.blockHeight;
    const innerRight = this.state.width - blockWidth + strokeOffset;
    const innerBottom = this.state.height - blockHeight + strokeOffset;

    let pathData = `M${strokeOffset}, ${bottomEdge} L${rightEdge}, ${bottomEdge} L${rightEdge}, ${strokeOffset} L${strokeOffset}, ${strokeOffset}Z`;

    if (innerBottom > 0 && innerRight > 0) {
      pathData = `M${strokeOffset}, ${bottomEdge} L${rightEdge}, ${bottomEdge} L${rightEdge}, ${strokeOffset} L${innerRight}, ${strokeOffset} L${innerRight}, ${innerBottom} L${strokeOffset}, ${innerBottom}Z`;
    }

    return React.createElement('path', {
      d: pathData,
      strokeWidth: `${strokeOffset}`
    });
  };

  private _renderLightBand = (): React.ReactElement => {
    const style = {
      display: this.state.containLightBand ? 'block' : 'none'
    };

    return React.createElement('circle', {
      cx: 5,
      cy: 5,
      r: 4,
      fill: 'rgba(243, 208, 14, 0.5)',
      stroke: 'rgb(243, 208, 14)',
      style
    });
  };

  private _renderSlotLineWidthDimension = (): React.ReactElement => {
    const strokeOffset = 1.2;
    const scaledWidth = SCALE_FACTOR * (this.state.width + strokeOffset);
    const scaledHeight = SCALE_FACTOR * (this.state.height + strokeOffset + 6);
    const leftTickPath = `M${strokeOffset}, ${scaledHeight - 4} L${strokeOffset}, ${scaledHeight + 4}`;
    const horizontalLinePath = `M${strokeOffset}, ${scaledHeight} L${scaledWidth}, ${scaledHeight}Z`;
    const rightTickPath = `M${scaledWidth}, ${scaledHeight - 4} L${scaledWidth}, ${scaledHeight + 4}`;
    const textXOffset = (scaledWidth - 37.2) / 2 - 1;

    return React.createElement('g', null,
      React.createElement('path', { d: leftTickPath }),
      React.createElement('path', { d: horizontalLinePath, id: 'slotLineWidth' }),
      React.createElement('path', { d: rightTickPath }),
      React.createElement('text', {
        'text-anchor': 'left',
        x: `${textXOffset > 0 ? textXOffset : 0}`,
        y: `${scaledHeight + 15}`,
        style: {
          font: '11px Verdana, Helvetica, Arial, sans-serif',
          color: '#979797'
        }
      }, ResourceManager.getString('plugin_customizedModeling_lightslot_a_label') + ' ' + Math.round(1000 * this.currentLightSlotWidth))
    );
  };

  private _renderSlotLineHeightDimension = (): React.ReactElement => {
    const strokeOffset = 1.2;
    const scaledWidth = SCALE_FACTOR * (this.state.width + strokeOffset + 6);
    const scaledHeight = SCALE_FACTOR * (this.state.height + strokeOffset);
    const bottomTickPath = `M${scaledWidth - 4}, ${scaledHeight} L${scaledWidth + 4}, ${scaledHeight}Z`;
    const verticalLinePath = `M${scaledWidth}, ${scaledHeight} L${scaledWidth}, ${strokeOffset}Z`;
    const topTickPath = `M${scaledWidth - 4}, ${strokeOffset} L${scaledWidth + 4}, ${strokeOffset}Z`;

    return React.createElement('g', null,
      React.createElement('path', { d: bottomTickPath }),
      React.createElement('path', { d: verticalLinePath, id: 'slotLineWidth' }),
      React.createElement('path', { d: topTickPath }),
      React.createElement('text', {
        'text-anchor': 'middle',
        x: `${scaledWidth + 5}`,
        y: `${(scaledHeight - strokeOffset) / 2 + 5}`,
        style: {
          font: '11px Verdana, Helvetica, Arial, sans-serif',
          color: '#979797'
        }
      }, ResourceManager.getString('plugin_customizedModeling_lightslot_b_label') + ' ' + Math.round(1000 * this.currentLightSlotHeight))
    );
  };

  private _renderFlippedSlot = (): React.ReactElement => {
    const strokeOffset = 1.2;
    const rightEdge = this.state.width + strokeOffset;
    const bottomEdge = this.state.height + strokeOffset;
    const blockWidth = this.state.blockWidth;
    const blockHeight = this.state.blockHeight;
    const innerBottom = this.state.height - blockHeight + strokeOffset;
    const innerRight = this.state.width - blockWidth + strokeOffset;

    let pathData = `M${strokeOffset}, ${rightEdge} L${bottomEdge}, ${rightEdge} L${bottomEdge}, ${strokeOffset} L${strokeOffset}, ${strokeOffset}Z`;

    if (innerRight > 0 && innerBottom > 0) {
      pathData = `M${strokeOffset}, ${rightEdge} L${bottomEdge}, ${rightEdge} L${bottomEdge}, ${strokeOffset} L${innerBottom}, ${strokeOffset} L${innerBottom}, ${innerRight} L${strokeOffset}, ${innerRight}Z`;
    }

    return React.createElement('path', {
      d: pathData,
      id: 'slotLineHeight',
      strokeWidth: `${strokeOffset}`
    });
  };

  private _renderFlippedSlotLineWidthDimension = (): React.ReactElement => {
    const strokeOffset = 1.2;
    const scaledWidth = SCALE_FACTOR * (this.state.width + strokeOffset);
    const scaledHeight = SCALE_FACTOR * (this.state.height + strokeOffset + 6);
    const bottomTickPath = `M${scaledHeight - 4}, ${scaledWidth} L${scaledHeight + 4}, ${scaledWidth}Z`;
    const verticalLinePath = `M${scaledHeight}, ${scaledWidth} L${scaledHeight}, ${strokeOffset}Z`;
    const topTickPath = `M${scaledHeight - 4}, ${strokeOffset} L${scaledHeight + 4}, ${strokeOffset}Z`;

    return React.createElement('g', null,
      React.createElement('path', { d: bottomTickPath }),
      React.createElement('path', { d: verticalLinePath, id: 'slotLineWidth' }),
      React.createElement('path', { d: topTickPath }),
      React.createElement('text', {
        'text-anchor': 'middle',
        x: `${scaledHeight + 4}`,
        y: `${(scaledWidth - strokeOffset) / 2 + 6}`,
        style: {
          font: '11px Verdana, Helvetica, Arial, sans-serif',
          color: '#333'
        }
      }, ResourceManager.getString('plugin_customizedModeling_lightslot_a_label') + ' ' + Math.round(1000 * this.currentLightSlotWidth))
    );
  };

  private _renderFlippedSlotLineHeightDimension = (): React.ReactElement => {
    const strokeOffset = 1.2;
    const scaledWidth = SCALE_FACTOR * (this.state.width + strokeOffset + 5);
    const scaledHeight = SCALE_FACTOR * (this.state.height + strokeOffset);
    const leftTickPath = `M${strokeOffset}, ${scaledWidth - 4} L${strokeOffset}, ${scaledWidth + 4}`;
    const horizontalLinePath = `M${strokeOffset}, ${scaledWidth} L${scaledHeight}, ${scaledWidth}Z`;
    const rightTickPath = `M${scaledHeight}, ${scaledWidth - 4} L${scaledHeight}, ${scaledWidth + 4}`;
    const textXOffset = (scaledHeight - 37.2) / 2 - 1;

    return React.createElement('g', null,
      React.createElement('path', { d: leftTickPath }),
      React.createElement('path', { d: horizontalLinePath, id: 'slotLineWidth' }),
      React.createElement('path', { d: rightTickPath }),
      React.createElement('text', {
        'text-anchor': 'left',
        x: `${textXOffset > 0 ? textXOffset : 0}`,
        y: `${scaledWidth + 16}`,
        style: {
          font: '11px Verdana, Helvetica, Arial, sans-serif',
          color: '#333'
        }
      }, ResourceManager.getString('plugin_customizedModeling_lightslot_b_label') + ' ' + Math.round(1000 * this.currentLightSlotHeight))
    );
  };

  private _renderFlippedLightBand = (): React.ReactElement => {
    const style = {
      display: this.state.containLightBand ? 'block' : 'none'
    };

    return React.createElement('circle', {
      cx: 5,
      cy: 5,
      r: 4,
      fill: 'rgba(243, 208, 14, 0.5)',
      stroke: 'rgb(243, 208, 14)',
      style
    });
  };

  private _getLightSlotMsgData(): LightSlotMsgData {
    const scaledWidth = UNIT_SCALE * this.currentLightSlotWidth;
    const scaledHeight = UNIT_SCALE * this.currentLightSlotHeight;
    const lightBandThickness = 4;
    const innerWidth = 2;

    let profile: Array<{ x: number; y: number }> = [
      { x: 0, y: 0 },
      { x: scaledWidth, y: 0 },
      { x: scaledWidth, y: scaledHeight },
      { x: scaledWidth - innerWidth, y: scaledHeight },
      { x: scaledWidth - innerWidth, y: lightBandThickness },
      { x: 0, y: lightBandThickness }
    ];

    let lightBandPosIndex = 4;

    if (scaledHeight <= lightBandThickness) {
      profile = [
        { x: 0, y: 0 },
        { x: scaledWidth, y: 0 },
        { x: scaledWidth, y: lightBandThickness },
        { x: 0, y: lightBandThickness }
      ];
      lightBandPosIndex = 2;
    }

    return {
      profile,
      width: scaledWidth,
      height: scaledHeight,
      lightBandPosIndex
    };
  }

  render(): React.ReactElement {
    const { width, height, flipped, blockHeight } = this.state;

    const normalSlotStyle: React.CSSProperties = {
      display: flipped ? 'none' : 'inline-block'
    };

    const normalLightBandStyle: React.CSSProperties = {
      display: flipped ? 'none' : 'block',
      position: 'absolute',
      left: 75 + width / 2 * SCALE_FACTOR,
      top: 65 - blockHeight * SCALE_FACTOR
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
      left: 68 - blockHeight * SCALE_FACTOR,
      top: 71 + width / 2 * SCALE_FACTOR
    };

    const svgWidth = (width + 2) * SCALE_FACTOR;
    const svgHeight = (height + 2) * SCALE_FACTOR;

    return React.createElement('div', {
      className: 'light-slot-panel-body'
    },
      React.createElement('div', { className: 'ceiling-indicator' }),
      React.createElement('div', { className: 'slot', style: normalSlotStyle },
        React.createElement('div', {
          style: {
            position: 'absolute',
            bottom: 110
          }
        },
          React.createElement('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            width: svgWidth + 55,
            height: svgHeight + 25
          },
            React.createElement('g', {
              fill: 'rgba(174, 215, 250, 0.2)',
              stroke: 'rgb(85, 172, 238)',
              transform: 'scale(1.4, 1.4)'
            }, this._renderSlot()),
            React.createElement('g', {
              stroke: 'rgb(151, 151, 151)',
              strokeWidth: '0.4'
            }, this._renderSlotLineWidthDimension()),
            React.createElement('g', {
              stroke: 'rgb(151, 151, 151)',
              strokeWidth: '0.4'
            }, this._renderSlotLineHeightDimension())
          )
        )
      ),
      React.createElement('div', { className: 'slot', style: normalLightBandStyle },
        React.createElement('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          version: '1.1',
          width: '10px',
          height: '10px'
        },
          React.createElement('g', {
            fill: 'rgba(174, 215, 250, 0.2)',
            stroke: 'rgb(85, 172, 238)',
            strokeWidth: '1.2'
          }, this._renderLightBand())
        )
      ),
      React.createElement('div', { className: 'slot-flipped', style: flippedSlotStyle },
        React.createElement('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          version: '1.1',
          width: svgHeight + 55,
          height: svgWidth + 25
        },
          React.createElement('g', {
            fill: 'rgba(174, 215, 250, 0.2)',
            stroke: 'rgb(85, 172, 238)',
            transform: 'scale(1.4, 1.4)'
          }, this._renderFlippedSlot()),
          React.createElement('g', {
            stroke: 'rgb(151, 151, 151)',
            strokeWidth: '0.4'
          }, this._renderFlippedSlotLineWidthDimension()),
          React.createElement('g', {
            stroke: 'rgb(151, 151, 151)',
            strokeWidth: '0.4'
          }, this._renderFlippedSlotLineHeightDimension())
        )
      ),
      React.createElement('div', { className: 'slot-flipped', style: flippedLightBandStyle },
        React.createElement('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          version: '1.1',
          width: '10px',
          height: '10px'
        },
          React.createElement('g', {
            fill: 'rgba(174, 215, 250, 0.2)',
            stroke: 'rgb(85, 172, 238)',
            strokeWidth: '1.2'
          }, this._renderFlippedLightBand())
        )
      )
    );
  }
}

export default LightSlotPanel;