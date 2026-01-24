/**
 * Module: StackPanel Control
 * Babylon.js GUI 2D stack panel container that arranges children in a vertical or horizontal stack
 */

import { Container } from './container';
import { Control } from './control';
import { Observable, Tools, serialize, RegisterClass } from 'core/Misc/observable';
import { TextBlock, TextWrapping } from './textBlock';

/**
 * Represents a container that arranges child controls in a vertical or horizontal stack.
 * Children are automatically positioned based on the stack direction and spacing.
 * @extends Container
 */
export declare class StackPanel extends Container {
  /**
   * The name of the stack panel
   */
  name: string;

  /**
   * Indicates whether warnings about invalid layout configurations should be suppressed
   * @default false
   */
  ignoreLayoutWarnings: boolean;

  /**
   * Internal flag tracking if width was manually set by the user
   * @internal
   */
  private _manualWidth: boolean;

  /**
   * Internal flag tracking if height was manually set by the user
   * @internal
   */
  private _manualHeight: boolean;

  /**
   * Internal flag to prevent tracking changes during automatic sizing
   * @internal
   */
  private _doNotTrackManualChanges: boolean;

  /**
   * Whether the stack panel arranges children vertically
   * @internal
   */
  private _isVertical: boolean;

  /**
   * Spacing in pixels between child controls
   * @internal
   */
  private _spacing: number;

  /**
   * Gets or sets whether the stack panel arranges children vertically.
   * When true, children are stacked top-to-bottom. When false, children are stacked left-to-right.
   * @default true
   */
  get isVertical(): boolean;
  set isVertical(value: boolean);

  /**
   * Gets or sets the spacing in pixels between child controls.
   * This spacing is applied between each pair of adjacent children.
   * @default 0
   */
  get spacing(): number;
  set spacing(value: number);

  /**
   * Gets or sets the width of the stack panel as a string value.
   * Can be specified in pixels (e.g., "100px") or percentage (e.g., "50%").
   * When not set manually, width is automatically calculated based on children.
   */
  get width(): string;
  set width(value: string);

  /**
   * Gets or sets the height of the stack panel as a string value.
   * Can be specified in pixels (e.g., "100px") or percentage (e.g., "50%").
   * When not set manually, height is automatically calculated based on children.
   */
  get height(): string;
  set height(value: string);

  /**
   * Creates a new StackPanel instance
   * @param name - The name identifier for this stack panel
   */
  constructor(name: string);

  /**
   * Returns the type name of this control for serialization and debugging purposes
   * @returns "StackPanel"
   * @internal
   */
  protected _getTypeName(): string;

  /**
   * Pre-measurement hook that sets alignment for children based on stack direction.
   * Vertical stacks align children to the top, horizontal stacks align to the left.
   * @param parentMeasure - The parent container's measure
   * @param context - The rendering context
   * @internal
   */
  protected _preMeasure(parentMeasure: unknown, context: unknown): void;

  /**
   * Additional processing after basic measurement to set up measurement boundaries for children
   * @param parentMeasure - The parent container's measure
   * @param context - The rendering context
   * @internal
   */
  protected _additionalProcessing(parentMeasure: unknown, context: unknown): void;

  /**
   * Post-measurement hook that:
   * - Positions children according to stack direction and spacing
   * - Auto-calculates panel size if not manually set
   * - Validates layout configurations and emits warnings
   * @internal
   */
  protected _postMeasure(): void;

  /**
   * Serializes the stack panel configuration to a plain object
   * @param serializationObject - The object to populate with serialized data
   */
  serialize(serializationObject: Record<string, unknown>): void;

  /**
   * Parses and restores stack panel state from serialized content
   * @param serializedObject - The serialized data object
   * @param host - The GUI host context
   * @internal
   */
  protected _parseFromContent(serializedObject: Record<string, unknown>, host: unknown): void;
}

/**
 * Register the StackPanel class with the Babylon.js class registry
 */
RegisterClass('BABYLON.GUI.StackPanel', StackPanel);