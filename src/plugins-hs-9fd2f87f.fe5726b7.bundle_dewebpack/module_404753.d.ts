/**
 * Light slot preview panel module for customized modeling plugin
 * Provides UI components for configuring and previewing light slots in ceiling designs
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Scale factor for SVG rendering
 */
const SCALE_FACTOR = 1.4;

/**
 * Default light slot dimensions (in meters)
 */
const DEFAULT_LIGHT_SLOT_WIDTH = 0.15;
const DEFAULT_LIGHT_SLOT_HEIGHT = 0.07;

/**
 * Light slot configuration data structure
 */
interface LightSlotConfig {
  /** Command name for plugin communication */
  commandName: string;
  /** Width of the light slot (scaled) */
  width: number;
  /** Height of the light slot (scaled) */
  height: number;
  /** Whether the slot is flipped 90 degrees */
  flipped: boolean;
  /** Whether the slot contains a light band */
  containLightBand: boolean;
}

/**
 * Light slot message data for plugin communication
 */
interface LightSlotMessageData {
  /** Profile points defining the slot shape */
  profile: Array<{ x: number; y: number }>;
  /** Width in centimeters */
  width: number;
  /** Height in centimeters */
  height: number;
  /** Index position for light band placement */
  lightBandPosIndex: number;
}

/**
 * Component props for LightSlotPreviewPanel
 */
interface LightSlotPreviewPanelProps {
  data: LightSlotConfig;
}

/**
 * Component state for LightSlotPreviewPanel
 */
interface LightSlotPreviewPanelState {
  width: number;
  height: number;
  flipped: boolean;
  containLightBand: boolean;
  commandName: string;
}

/**
 * Value change event detail
 */
interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

/**
 * Toggle button configuration
 */
interface ToggleButtonConfig {
  label: string;
  btns: Array<{ src: unknown[] }>;
  onchange: (index: number) => void;
  selectedIndex: number;
}

/**
 * Number input field configuration with validation rules
 */
interface NumberInputConfig {
  className: string;
  label: string;
  value: number;
  delay: boolean;
  options: {
    unitType: string;
    displayDigits: number;
    includeUnit: boolean;
    readOnly: boolean;
    startFromMin: boolean;
    tips: string;
    rules: {
      range: {
        min: number;
        max: number;
      };
      positiveOnly: boolean;
    };
  };
  onValueChangeStart: () => void;
  onValueChange: (event: ValueChangeEvent) => void;
  onValueChangeEnd: (event: ValueChangeEvent) => void;
}

/**
 * Switch control configuration
 */
interface SwitchConfig {
  label: string;
  checkedChildren: string;
  unCheckedChildren: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

/**
 * React component for light slot preview panel
 * Displays interactive preview of ceiling light slot with dimension controls
 */
declare class LightSlotPreviewPanel extends React.Component<
  LightSlotPreviewPanelProps,
  LightSlotPreviewPanelState
> {
  /** Current light slot width in meters */
  currentLightSlotWidth: number;
  
  /** Current light slot height in meters */
  currentLightSlotHeight: number;
  
  /** Currently selected orientation index (0: normal, 1: flipped) */
  selectedIndex: number;

  constructor(props: LightSlotPreviewPanelProps);

  /**
   * Renders the slot path for normal orientation
   * @returns SVG path element representing the slot shape
   */
  _renderSlot(): JSX.Element;

  /**
   * Renders the light band indicator circle
   * @returns SVG circle element for light band visualization
   */
  _renderLightBand(): JSX.Element;

  /**
   * Renders width dimension line with arrows and label for normal orientation
   * @returns SVG group containing dimension visualization
   */
  _renderSlotLineWidthDimension(): JSX.Element;

  /**
   * Renders height dimension line with arrows and label for normal orientation
   * @returns SVG group containing dimension visualization
   */
  _renderSlotLineHeightDimension(): JSX.Element;

  /**
   * Renders the slot path for flipped (90° rotated) orientation
   * @returns SVG path element representing the flipped slot shape
   */
  _renderFlippedSlot(): JSX.Element;

  /**
   * Renders width dimension line with arrows and label for flipped orientation
   * @returns SVG group containing dimension visualization
   */
  _renderFlippedSlotLineWidthDimension(): JSX.Element;

  /**
   * Renders height dimension line with arrows and label for flipped orientation
   * @returns SVG group containing dimension visualization
   */
  _renderFlippedSlotLineHeightDimension(): JSX.Element;

  /**
   * Renders the light band indicator circle for flipped orientation
   * @returns SVG circle element for light band visualization
   */
  _renderFlippedLightBand(): JSX.Element;

  /**
   * Calculates light slot message data for plugin communication
   * Converts current dimensions to profile points and metadata
   * @returns Message data object with profile, dimensions, and light band position
   */
  _getLightSlotMsgData(): LightSlotMessageData;

  componentDidMount(): void;

  render(): JSX.Element;
}

/**
 * Static manager class for light slot preview panel lifecycle
 * Handles creation, updates, and destruction of the preview panel
 */
declare class LightSlotPreviewPanelManager {
  /** Singleton instance of the preview panel component */
  private static instance?: LightSlotPreviewPanel;

  /**
   * Creates and mounts the light slot preview panel
   * @param config - Initial configuration for the light slot
   */
  static create(config: {
    commandName: string;
    width: number;
    height: number;
    flip: boolean;
    hasLightBand: boolean;
  }): void;

  /**
   * Updates the complete state of the preview panel
   * @param config - New configuration to apply
   */
  static updateState(config: {
    commandName: string;
    width: number;
    height: number;
    flip: boolean;
    hasLightBand: boolean;
  }): void;

  /**
   * Updates only the dimensions of the light slot
   * @param widthCm - Width in centimeters
   * @param heightCm - Height in centimeters
   */
  static updateSize(widthCm: number, heightCm: number): void;

  /**
   * Updates the light band visibility state
   * @param visible - Whether light band should be shown
   */
  static updateLightband(visible: boolean): void;

  /**
   * Toggles or sets the flipped state of the slot orientation
   * @param flipped - Optional explicit flipped state; toggles current state if undefined
   */
  static flip(flipped?: boolean): void;

  /**
   * Updates whether the slot contains a light band
   * @param hasLightBand - Whether light band is present
   */
  static createLightBand(hasLightBand: boolean): void;

  /**
   * Destroys and unmounts the preview panel from DOM
   */
  static destroy(): void;
}

export default LightSlotPreviewPanelManager;