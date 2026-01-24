/**
 * Divider component module
 * Represents a divider UI element that extends a base component
 */

/**
 * Properties for the Divider component
 * @interface DividerProps
 */
export interface DividerProps {
  /** The name identifier for the divider */
  name: string;
  /** Additional data properties for the divider component */
  [key: string]: unknown;
}

/**
 * Divider component class
 * A UI component that creates a visual divider/separator element
 * @class Divider
 * @extends BaseComponent
 */
export default class Divider extends BaseComponent {
  /**
   * Creates a new Divider instance
   * @constructor
   * @param {DividerProps} props - The properties object containing name and other data
   * @param {unknown} context - Additional context parameter passed to the base component
   */
  constructor(props: DividerProps, context: unknown);

  /**
   * Gets the component type identifier
   * @readonly
   * @type {string}
   * @returns The constant divider type identifier
   */
  get type(): string;

  /**
   * Sets the component data
   * @protected
   * @param {Omit<DividerProps, 'name'>} data - Component data excluding the name property
   * @returns {void}
   */
  protected setData(data: Omit<DividerProps, 'name'>): void;
}

/**
 * Base component class that Divider extends from
 * @internal
 */
declare class BaseComponent {
  constructor(name: string, context: unknown);
}

/**
 * Component type constants
 * @internal
 */
declare const ComponentTypes: {
  readonly divider: string;
};