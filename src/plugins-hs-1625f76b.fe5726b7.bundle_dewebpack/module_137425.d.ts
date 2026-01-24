/**
 * Light slot visualization component for customized modeling plugin.
 * Renders a 2D representation of a light slot with dimensions and optional light band indicator.
 */

import * as React from 'react';

/**
 * Parameters defining the light slot geometry.
 */
interface LightSlotParameters {
  /** Length of the slot in the A direction (meters) */
  aLength: number;
  /** Length of the slot in the B direction (meters) */
  bLength: number;
}

/**
 * Props for the LightSlotPanel component.
 */
interface LightSlotPanelProps {
  /** Geometric parameters of the light slot */
  parameters: LightSlotParameters;
  /** Whether the slot view should be flipped/rotated */
  isFlip: boolean;
  /** Whether the selected host contains light bands */
  hasSelsHostLightBands: boolean;
}

/**
 * Internal state for the LightSlotPanel component.
 */
interface LightSlotPanelState {
  /** Rendered width of the slot in pixels */
  width: number;
  /** Rendered height of the slot in pixels */
  height: number;
  /** Width of the blocking/cutout area in pixels */
  blockWidth: number;
  /** Height of the blocking/cutout area in pixels */
  blockHeight: number;
  /** Whether the slot visualization is flipped */
  flipped: boolean;
  /** Whether to display the light band indicator */
  containLightBand: boolean;
}

/**
 * Application instance interface (from HSApp framework).
 */
interface HSApplication {
  cmdManager: unknown;
}

/**
 * Global HSApp namespace.
 */
declare global {
  const HSApp: {
    App: {
      getApp(): HSApplication;
    };
  };
  
  const ResourceManager: {
    getString(key: string): string;
  };
}

/**
 * Default export: React component class for rendering light slot panels.
 * Displays a visual representation of a light slot with dimensional annotations
 * and optional light band indicator. Supports both normal and flipped orientations.
 */
declare const LightSlotPanelComponent: {
  new (props: LightSlotPanelProps): React.Component<LightSlotPanelProps, LightSlotPanelState>;
  prototype: React.Component<LightSlotPanelProps, LightSlotPanelState>;
};

export default LightSlotPanelComponent;

/**
 * Scaling factor for dimension line positioning.
 * @internal
 */
export declare const SCALE_FACTOR: 1.4;

/**
 * Maximum displayable A-direction length (meters).
 * @internal
 */
export declare const MAX_A_LENGTH: 0.15;

/**
 * Maximum displayable B-direction length (meters).
 * @internal
 */
export declare const MAX_B_LENGTH: 0.2;

/**
 * Pixel scaling factor for parameter conversion.
 * @internal
 */
export declare const PIXEL_SCALE: 300;