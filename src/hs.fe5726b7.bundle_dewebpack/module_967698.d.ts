/**
 * jQuery inline edit plugin type definitions
 * Allows elements to be edited inline by clicking on them
 */

/**
 * Configuration options for the inline edit plugin
 */
interface InlineEditOptions {
  /**
   * Name attribute for the input element
   * @default "temp"
   */
  name?: string;

  /**
   * Type attribute for the input element (e.g., "text", "email", "number")
   * @default "text"
   */
  type?: string;

  /**
   * Custom event name triggered when data is saved
   * @default "savedata"
   */
  eventname?: string;
}

/**
 * Event parameter object passed when save event is triggered
 */
interface InlineEditEventParameter {
  /**
   * The jQuery element that was edited
   */
  element: JQuery;

  /**
   * The new value after editing
   */
  value: string;
}

/**
 * Custom event interface for inline edit save event
 */
interface InlineEditEvent extends JQuery.TriggeredEvent {
  /**
   * Event type (matches the configured eventname)
   */
  type: string;

  /**
   * Event parameters containing element and new value
   */
  parameter: InlineEditEventParameter;
}

/**
 * jQuery plugin extension
 */
interface JQuery {
  /**
   * Initialize inline editing on selected elements
   * 
   * @param options - Configuration options for inline editing behavior
   * @returns The jQuery object for chaining
   * 
   * @example
   *