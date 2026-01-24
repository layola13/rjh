/**
 * Light slot panel component for customized modeling
 * Renders a visual representation of a light slot with dimensions and optional light band
 */

import React from 'react';

/**
 * Light slot parameters configuration
 */
export interface LightSlotParameters {
  /** Width of the light slot in centimeters */
  width: number;
  /** Height of the light slot in centimeters */
  height: number;
  /** Width of the blocking element in centimeters */
  blockWidth: number;
  /** Height of the blocking element in centimeters */
  blockHeight: number;
  /** Whether the slot orientation is flipped */
  flip: boolean;
  /** Whether the slot contains a light band */
  hasLightBand: boolean;
}

/**
 * Signal event data for light slot size changes
 */
export interface LightSlotSizeChangeEvent {
  data: {
    /** New width value in millimeters */
    width?: number;
    /** New height value in millimeters */
    height?: number;
  };
}

/**
 * Signal interface for listening to light slot size changes
 */
export interface LightSlotSizeChangeSignal {
  /** Subscribe to size change events */
  listen(callback: (event: LightSlotSizeChangeEvent) => void): void;
  /** Unsubscribe from size change events */
  unlisten(callback: (event: LightSlotSizeChangeEvent) => void): void;
}

/**
 * Component props for LightSlotPanel
 */
export interface LightSlotPanelProps {
  /** Light slot configuration parameters */
  parameters: LightSlotParameters;
  /** Whether this is a manually added light slot (affects flip behavior) */
  isManualAddLightSlot: boolean;
  /** Signal for listening to light slot size changes */
  lightSlotSizeChangeSignal: LightSlotSizeChangeSignal;
}

/**
 * Component state for LightSlotPanel
 */
export interface LightSlotPanelState {
  /** Scaled width for display (3x actual, max 60) */
  width: number;
  /** Scaled height for display (3x actual, max 45) */
  height: number;
  /** Scaled block width for display */
  blockWidth: number;
  /** Scaled block height for display */
  blockHeight: number;
  /** Whether the slot is displayed in flipped orientation */
  flipped: boolean;
  /** Whether the slot contains a light band indicator */
  containLightBand: boolean;
}

/**
 * Light slot profile data for messaging
 */
export interface LightSlotProfileData {
  /** Profile points defining the slot shape */
  profile: Array<{ x: number; y: number }>;
  /** Total width in millimeters */
  width: number;
  /** Total height in millimeters */
  height: number;
  /** Index position for light band in profile array */
  lightBandPosIndex: number;
}

/**
 * Light slot panel component
 * Displays an interactive visualization of a light slot with dimensions, orientation, and optional light band
 */
export default class LightSlotPanel extends React.Component<LightSlotPanelProps, LightSlotPanelState> {
  static propTypes: {
    parameters: PropTypes.Validator<object>;
    isManualAddLightSlot: PropTypes.Validator<boolean>;
    lightSlotSizeChangeSignal: PropTypes.Validator<object>;
  };

  /** Application instance reference */
  private app: unknown;
  
  /** Command manager reference */
  private cmdMgr: unknown;
  
  /** Current light slot width in centimeters */
  private currentLightSlotWidth: number;
  
  /** Current light slot height in centimeters */
  private currentLightSlotHeight: number;

  constructor(props: LightSlotPanelProps);

  /**
   * Subscribe to light slot size change events on mount
   */
  componentDidMount(): void;

  /**
   * Unsubscribe from light slot size change events on unmount
   */
  componentWillUnmount(): void;

  /**
   * Handle light slot size change events
   * @param event - Size change event containing new width and/or height
   */
  private _onLightSlotSizeChange(event: LightSlotSizeChangeEvent): void;

  /**
   * Render the light slot path for normal (non-flipped) orientation
   * @returns React SVG path element
   */
  private _renderSlot(): React.ReactElement;

  /**
   * Render the light band indicator circle for normal orientation
   * @returns React SVG circle element
   */
  private _renderLightBand(): React.ReactElement;

  /**
   * Render the width dimension line and label for normal orientation
   * @returns React SVG group element with dimension annotation
   */
  private _renderSlotLineWidthDimension(): React.ReactElement;

  /**
   * Render the height dimension line and label for normal orientation
   * @returns React SVG group element with dimension annotation
   */
  private _renderSlotLineHeightDimension(): React.ReactElement;

  /**
   * Render the light slot path for flipped orientation
   * @returns React SVG path element
   */
  private _renderFlippedSlot(): React.ReactElement;

  /**
   * Render the light band indicator circle for flipped orientation
   * @returns React SVG circle element
   */
  private _renderFlippedLightBand(): React.ReactElement;

  /**
   * Render the width dimension line and label for flipped orientation
   * @returns React SVG group element with dimension annotation
   */
  private _renderFlippedSlotLineWidthDimension(): React.ReactElement;

  /**
   * Render the height dimension line and label for flipped orientation
   * @returns React SVG group element with dimension annotation
   */
  private _renderFlippedSlotLineHeightDimension(): React.ReactElement;

  /**
   * Get light slot profile data for messaging
   * Generates profile points, dimensions, and light band position
   * @returns Profile data object
   */
  private _getLightSlotMsgData(): LightSlotProfileData;

  /**
   * Render the component
   * @returns React element displaying the light slot visualization
   */
  render(): React.ReactElement;
}