/**
 * Decoration bar prairie settings module
 * Manages prairie-style decoration bar configuration with horizontal and vertical edge/middle elements
 */

import { DecorationBarSettings } from './DecorationBarSettings';

/**
 * Interface for decoration bar component
 */
interface IDecorationBar {
  /** Horizontal edge separation distance */
  horEdgeSep: number;
  /** Vertical edge separation distance */
  verEdgeSep: number;
  /** Horizontal edge element count */
  horEdgeCount: number;
  /** Vertical edge element count */
  verEdgeCount: number;
  /** Middle section element count */
  middleCount: number;
  /** Middle section separation distance */
  middleSep: number;
  /** Vertical middle section element count */
  vMiddleCount: number;
  /** Vertical middle section separation distance */
  vMiddleSep: number;
  /** Recreate all bar components */
  recreateComponents(): void;
}

/**
 * Interface for decoration shape
 */
interface IDecorationShape {
  /** Update polygon geometry */
  updatePoly(): void;
  /** Draw shape to view */
  draw(view: IView): void;
}

/**
 * Interface for memento manager (undo/redo)
 */
interface IMomentoManager {
  /** Create checkpoint for undo/redo */
  checkPoint(): void;
}

/**
 * Interface for view component
 */
interface IView {
  /** Memento manager for state management */
  mometoManager: IMomentoManager;
  /** Refresh view display */
  refresh(): void;
}

/**
 * Prairie-style decoration bar settings
 * Extends base decoration bar settings with prairie-specific configuration
 * for horizontal and vertical edge/middle elements
 */
export declare class DecorationBarPrairieSettings extends DecorationBarSettings {
  /** The decoration bar instance being configured */
  protected decorationBar?: IDecorationBar;
  /** The decoration shape instance */
  protected decorationShape: IDecorationShape;
  /** The view instance */
  protected view: IView;

  /**
   * Horizontal edge separation distance (pixels)
   * @remarks Updates view and creates checkpoint on change
   */
  get horEdgeSep(): number;
  set horEdgeSep(value: number);

  /**
   * Vertical edge separation distance (pixels)
   * @remarks Updates view and creates checkpoint on change
   */
  get verEdgeSep(): number;
  set verEdgeSep(value: number);

  /**
   * Number of horizontal edge elements
   * @remarks Updates view and creates checkpoint on change
   */
  get horEdgeCount(): number;
  set horEdgeCount(value: number);

  /**
   * Number of vertical edge elements
   * @remarks Updates view and creates checkpoint on change
   */
  get verEdgeCount(): number;
  set verEdgeCount(value: number);

  /**
   * Number of horizontal middle section elements
   * @remarks Updates view and creates checkpoint on change
   */
  get horMiddleCount(): number;
  set horMiddleCount(value: number);

  /**
   * Horizontal middle section separation distance (pixels)
   * @remarks Updates view but does not create checkpoint
   */
  get horMiddleSep(): number;
  set horMiddleSep(value: number);

  /**
   * Number of vertical middle section elements
   * @remarks Updates view and creates checkpoint on change
   */
  get verMiddleCount(): number;
  set verMiddleCount(value: number);

  /**
   * Vertical middle section separation distance (pixels)
   * @remarks Updates view but does not create checkpoint
   */
  get verMiddleSep(): number;
  set verMiddleSep(value: number);
}