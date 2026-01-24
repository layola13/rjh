/**
 * Survey component status enumeration
 */
declare enum SurveyStatus {
  /** Initial state */
  init = "init",
  /** Component is visible */
  show = "show",
  /** Component is hidden */
  hide = "hide"
}

/**
 * Configuration options for initializing the survey component
 */
interface SurveyComponentOptions {
  /** The page number threshold to trigger survey display */
  limitPage: number;
  /** The DOM node where the survey component will be mounted */
  node: HTMLElement;
  /** The current page number */
  currentPage: number;
}

/**
 * Survey component class that manages visibility based on page navigation
 */
declare class SurveyComponent {
  /**
   * The page number threshold for showing the survey
   */
  limitPage: number | undefined;

  /**
   * Reference to the DOM element containing the survey
   */
  JQDom: HTMLElement | null;

  /**
   * Current visibility status of the survey component
   */
  currStatus: SurveyStatus;

  /**
   * Creates a new survey component instance
   * @param options - Configuration options for the survey component
   */
  constructor(options: SurveyComponentOptions);

  /**
   * Initializes the survey component
   * @param node - The DOM element to mount the survey component
   * @private
   */
  private _init(node: HTMLElement): void;

  /**
   * Renders the survey component into the specified DOM element
   * @param node - The DOM element to render into
   * @returns False if node is invalid, void otherwise
   * @private
   */
  private _renderSurveyCom(node: HTMLElement | null): false | void;

  /**
   * Handles the visibility of the survey based on current page
   * @param currentPage - The current page number
   */
  handleView(currentPage: number): void;

  /**
   * Shows the survey component
   */
  show(): void;

  /**
   * Hides the survey component
   */
  hide(): void;
}

export default SurveyComponent;