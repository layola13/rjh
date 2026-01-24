/**
 * Light slot component for customized modeling plugin
 * Renders a visual representation of a light slot with dimensions and optional light band
 */

import React from 'react';

/**
 * Light slot parameters configuration
 */
export interface LightSlotParameters {
  /** Width of the light slot in millimeters */
  width: number;
  /** Height of the light slot in millimeters */
  height: number;
  /** Width of the blocking area in millimeters */
  blockWidth: number;
  /** Height of the blocking area in millimeters */
  blockHeight: number;
  /** Whether the slot should be flipped 90 degrees */
  flip: boolean;
  /** Whether the slot contains a light band indicator */
  hasLightBand: boolean;
}

/**
 * Signal event data for light slot size changes
 */
export interface LightSlotSizeChangeEvent {
  data: {
    /** New width in millimeters (optional) */
    width?: number;
    /** New height in millimeters (optional) */
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
 * Props for the LightSlotPanel component
 */
export interface LightSlotPanelProps {
  /** Configuration parameters for the light slot */
  parameters: LightSlotParameters;
  /** Whether this is a manually added light slot */
  isManualAddLightSlot: boolean;
  /** Signal for listening to size changes */
  lightSlotSizeChangeSignal: LightSlotSizeChangeSignal;
}

/**
 * Component state for the LightSlotPanel
 */
export interface LightSlotPanelState {
  /** Scaled width for rendering (3x scale factor) */
  width: number;
  /** Scaled height for rendering (3x scale factor) */
  height: number;
  /** Scaled block width for rendering */
  blockWidth: number;
  /** Scaled block height for rendering */
  blockHeight: number;
  /** Whether the slot is currently flipped */
  flipped: boolean;
  /** Whether to display the light band indicator */
  containLightBand: boolean;
}

/**
 * Light slot profile data for messaging
 */
export interface LightSlotProfileData {
  /** Array of profile points defining the slot shape */
  profile: Array<{ x: number; y: number }>;
  /** Width in centimeters */
  width: number;
  /** Height in centimeters */
  height: number;
  /** Index of the light band position in the profile */
  lightBandPosIndex: number;
}

/**
 * React component for rendering a light slot visualization with dimensions
 * Supports both normal and flipped orientations, with optional light band indicator
 */
export default class LightSlotPanel extends React.Component<LightSlotPanelProps, LightSlotPanelState> {
  static propTypes: {
    parameters: PropTypes.Validator<Record<string, unknown>>;
    isManualAddLightSlot: PropTypes.Validator<boolean>;
    lightSlotSizeChangeSignal: PropTypes.Validator<Record<string, unknown>>;
  };

  /**
   * Subscribe to light slot size change events
   */
  componentDidMount(): void;

  /**
   * Unsubscribe from light slot size change events
   */
  componentWillUnmount(): void;

  /**
   * Render the main component with slot visualization and dimensions
   */
  render(): React.ReactElement;
}