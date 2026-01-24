/**
 * Module: Room Selection Dialog
 * Provides functionality to display a room selection dialog for community inspiration features
 */

import type { ReactElement } from 'react';

/**
 * Inspiration action interface for managing 2D views
 */
export interface InspirationAction {
  /**
   * Creates an auxiliary 2D view in the specified container
   * @param container - DOM element to render the 2D view
   */
  createAux2DView(container: HTMLElement): void;

  /**
   * Destroys the currently active auxiliary 2D view
   */
  destroyAux2DView(): void;

  /**
   * Resizes the auxiliary 2D view to fit the container
   */
  resizeAux2DView(): void;
}

/**
 * Layer data structure representing a single layer in the editor
 */
export interface LayerData {
  /** Layer instance */
  layer: {
    /** Unique identifier for the layer */
    id: string | number;
  };
  /** Display text for the layer */
  text: string;
}

/**
 * Layers edit data containing all layer information
 */
export interface LayersEditData {
  /** Currently active layer data */
  activeLayerData: LayerData;
  /** Array of all available layers */
  allLayersData: LayerData[];
}

/**
 * Configuration options for the select room dialog
 */
export interface SelectRoomDialogOptions {
  /**
   * Whether the OK button should be disabled initially
   * @default false
   */
  disableOkButton?: boolean;

  /**
   * Callback to execute command when OK is clicked
   * @param templateId - Template identifier from query string
   */
  executeCmd(templateId?: string): void;
}

/**
 * Props for the SelectRoom component
 */
export interface SelectRoomComponentProps {
  /** Inspiration action instance for managing the 2D view */
  inspirationAction: InspirationAction;
}

/**
 * Displays a modal dialog for selecting a room from available layers.
 * Integrates with the application's plugin system and selection manager.
 *
 * @param inspirationAction - The inspiration action instance for managing 2D views
 * @param options - Configuration options for the dialog behavior
 *
 * @example
 *