/**
 * Bootstrap Modal Plugin Type Definitions
 * Based on Bootstrap v3.3.7 Modal Component
 */

/**
 * Modal configuration options
 */
export interface ModalOptions {
  /**
   * Whether to show a backdrop overlay
   * - true: show backdrop with click-to-close
   * - false: no backdrop
   * - "static": backdrop without click-to-close
   * @default true
   */
  backdrop?: boolean | "static";

  /**
   * Whether to close modal on ESC key press
   * @default true
   */
  keyboard?: boolean;

  /**
   * Whether to show modal immediately after initialization
   * @default true
   */
  show?: boolean;

  /**
   * Remote URL to load content into .modal-content
   * @default false
   */
  remote?: string | false;
}

/**
 * Bootstrap Modal event object extending jQuery Event
 */
export interface ModalEvent extends JQuery.TriggeredEvent {
  /**
   * The related target element that triggered the modal
   */
  relatedTarget?: Element;
}

/**
 * Bootstrap Modal component class
 * Provides modal dialog functionality with backdrop, keyboard navigation, and remote content loading
 */
export class Modal {
  /**
   * Plugin version number
   */
  static readonly VERSION: string;

  /**
   * Modal transition duration in milliseconds
   * @default 300
   */
  static readonly TRANSITION_DURATION: number;

  /**
   * Backdrop transition duration in milliseconds
   * @default 150
   */
  static readonly BACKDROP_TRANSITION_DURATION: number;

  /**
   * Default configuration options
   */
  static readonly DEFAULTS: Required<ModalOptions>;

  /**
   * Modal configuration options
   */
  options: ModalOptions;

  /**
   * jQuery reference to document body
   */
  $body: JQuery;

  /**
   * jQuery reference to the modal element
   */
  $element: JQuery;

  /**
   * jQuery reference to the .modal-dialog element
   */
  $dialog: JQuery;

  /**
   * jQuery reference to the backdrop element
   */
  $backdrop: JQuery | null;

  /**
   * Whether the modal is currently shown
   */
  isShown: boolean | null;

  /**
   * Original body padding-right value before modal opened
   */
  originalBodyPad: string | null;

  /**
   * Calculated scrollbar width in pixels
   */
  scrollbarWidth: number;

  /**
   * Flag to ignore next backdrop click event
   */
  ignoreBackdropClick: boolean;

  /**
   * Whether body has vertical overflow
   */
  bodyIsOverflowing: boolean;

  /**
   * Creates a new Modal instance
   * @param element - The modal DOM element
   * @param options - Configuration options
   */
  constructor(element: Element, options: ModalOptions);

  /**
   * Toggles the modal visibility
   * @param relatedTarget - The element that triggered the toggle
   * @returns Current Modal instance
   */
  toggle(relatedTarget?: Element): this;

  /**
   * Shows the modal
   * @param relatedTarget - The element that triggered the show action
   */
  show(relatedTarget?: Element): void;

  /**
   * Hides the modal
   * @param event - Optional event object
   */
  hide(event?: Event): void;

  /**
   * Enforces focus to remain within the modal
   * @internal
   */
  enforceFocus(): void;

  /**
   * Handles keyboard events (ESC key)
   * @internal
   */
  escape(): void;

  /**
   * Handles window resize events
   * @internal
   */
  resize(): void;

  /**
   * Hides the modal element and triggers cleanup
   * @internal
   */
  hideModal(): void;

  /**
   * Removes the backdrop element from DOM
   * @internal
   */
  removeBackdrop(): void;

  /**
   * Shows or hides the backdrop
   * @param callback - Callback function to execute after backdrop transition
   * @internal
   */
  backdrop(callback: () => void): void;

  /**
   * Handles modal update events
   * @internal
   */
  handleUpdate(): void;

  /**
   * Adjusts modal padding based on scrollbar presence
   * @internal
   */
  adjustDialog(): void;

  /**
   * Resets modal padding adjustments
   * @internal
   */
  resetAdjustments(): void;

  /**
   * Checks if body has scrollbar and calculates width
   * @internal
   */
  checkScrollbar(): void;

  /**
   * Sets body padding to compensate for scrollbar
   * @internal
   */
  setScrollbar(): void;

  /**
   * Resets body padding to original value
   * @internal
   */
  resetScrollbar(): void;

  /**
   * Measures scrollbar width by creating temporary element
   * @returns Scrollbar width in pixels
   * @internal
   */
  measureScrollbar(): number;
}

/**
 * jQuery plugin interface for Modal
 */
declare global {
  interface JQuery {
    /**
     * Initialize or invoke modal methods
     * @param options - Configuration options or method name
     * @param relatedTarget - Related target element for show/toggle methods
     * @returns jQuery object for chaining
     */
    modal(options?: ModalOptions | "show" | "hide" | "toggle", relatedTarget?: Element): this;

    /**
     * Modal plugin namespace
     */
    modal: {
      /**
       * Reference to Modal constructor
       */
      Constructor: typeof Modal;

      /**
       * Restores previous modal plugin and returns current implementation
       * @returns Current modal plugin function
       */
      noConflict(): typeof JQuery.prototype.modal;
    };
  }

  interface JQueryStatic {
    /**
     * Bootstrap support detection utilities
     */
    support: {
      /**
       * Whether CSS transitions are supported
       */
      transition: boolean;
    };
  }
}

/**
 * jQuery data key for storing Modal instances
 */
export type ModalDataKey = "bs.modal";

/**
 * Modal event names
 */
export type ModalEventName =
  | "show.bs.modal"
  | "shown.bs.modal"
  | "hide.bs.modal"
  | "hidden.bs.modal"
  | "loaded.bs.modal";

export {};