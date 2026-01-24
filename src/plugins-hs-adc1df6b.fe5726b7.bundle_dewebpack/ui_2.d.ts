/**
 * UI module for managing auxiliary 2D rendering containers
 * @module UI
 * @originalId 214977
 */

/**
 * UI class responsible for managing auxiliary 2D container elements
 * in the outdoor drawing editor environment
 */
export declare class UI {
  /**
   * Reference to the environment instance
   * @private
   */
  private readonly _environment: unknown;

  /**
   * The auxiliary 2D container HTML element
   * @private
   */
  private _aux2DContainer: HTMLDivElement | undefined;

  /**
   * Creates a new UI instance
   * @param environment - The environment configuration object
   */
  constructor(environment: unknown);

  /**
   * Gets the auxiliary 2D container element
   * @returns The auxiliary 2D container div element, or undefined if not yet created
   */
  get aux2DContainer(): HTMLDivElement | undefined;

  /**
   * Renders and initializes the auxiliary 2D container
   * Creates a div element with class "outdoordrawing-aux2d" and appends it
   * to the ".editor2dContainer" element if it doesn't already exist
   */
  renderAux2D(): void;

  /**
   * Destroys the UI instance and removes the auxiliary 2D container
   * Removes the container element from the DOM and clears the reference
   */
  destroy(): void;
}