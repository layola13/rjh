/**
 * Module: module_value
 * Original ID: value
 * 
 * User guide module configuration and initialization
 */

/**
 * User guide step options interface
 */
interface StepOptions {
  [key: string]: unknown;
}

/**
 * Dependencies configuration for the guide module
 */
interface GuideDependencies {
  [key: string]: unknown;
}

/**
 * Application configuration
 */
interface App {
  [key: string]: unknown;
}

/**
 * Initialization parameters for the guide module
 */
interface GuideModuleParams {
  /** Main application instance */
  app: App;
  /** Module dependencies */
  dependencies: GuideDependencies;
}

/**
 * User guide module class declaration
 */
declare class GuideModule {
  /** Application instance reference */
  private _app: App;
  
  /** Module dependencies */
  dependencies: GuideDependencies;
  
  /** Whether to show guide value */
  showGuideValue: boolean;
  
  /** Current step number (1-based index) */
  currentStepNum: number;
  
  /** Options for the current step */
  currentStepOptions: StepOptions;
  
  /** Number of current step options */
  currentStepOptionsNum: number;
  
  /** Timeout handle for delayed operations */
  setTimeoutHandle: number | null;
  
  /** DOM element for mask center overlay */
  maskCenterDom: HTMLElement | null;
  
  /** Flag indicating if user guide has been used */
  hasUsedUserGuide: boolean;
  
  /** Previous step index */
  preIndex: number;
  
  /** Timer for user guide operations */
  userGuideTimer: number | undefined;
  
  /** Flag indicating if guide has started */
  isStarted: boolean;
  
  /** Flag to disable the guide */
  disabled: boolean;
  
  /** New user design identifier */
  newUserDesignId: string;
  
  /** Start component reference */
  startComp: unknown;
  
  /** End component reference */
  endComp: unknown;
  
  /** Array of step titles */
  stepsTitle: string[];
  
  /**
   * Constructor - Initializes the guide module
   * @param params - Module initialization parameters
   */
  constructor(params: GuideModuleParams);
  
  /**
   * Handles rendering of guide widget
   */
  handleRenderGuideWidget(): void;
  
  /**
   * Removes event listener for render panel mouse wheel
   */
  removeEventListenerForRenderPanelMouseWheel(): void;
  
  /**
   * Adds event listener for render panel mouse wheel
   */
  addEventListenerForRenderPanelMouseWheel(): void;
  
  /**
   * Sets whether the close timer is needed
   * @param needClose - Whether to set close timer
   */
  setNeedToCloseTimer(needClose: boolean): void;
  
  /**
   * Gets default steps title array
   * @returns Array of default step titles
   */
  private _getDefaultStepsTitle(): string[];
  
  /**
   * Retrieves A/B test configuration for guide
   */
  getGuideABTest(): void;
}

export default GuideModule;