/**
 * User Guide Component Module
 * Provides a guided tour interface with navigation and state management
 */

/**
 * Data item for a single guide step
 */
export interface GuideDataItem {
  /** Icon/background image URL for this guide step */
  icon: string;
  /** Localization key or text for the tip content */
  tip: string;
}

/**
 * Props for the FeatureUserGuide component
 */
export interface FeatureUserGuideProps {
  /** Callback function triggered when user completes the guide */
  next: () => void;
  /** Array of guide step data */
  data: GuideDataItem[];
  /** Custom text for the "Got It" button (optional) */
  gotItText?: string;
}

/**
 * State for the FeatureUserGuide component
 */
export interface FeatureUserGuideState {
  /** Current active guide step index */
  currentGuideIndex: number;
  /** Whether the left arrow is being hovered */
  hoverLeftArrow: boolean;
  /** Whether the right arrow is being hovered */
  hoverRightArrow: boolean;
}

/**
 * React component for displaying a multi-step user guide with navigation
 */
export interface FeatureUserGuideComponent extends React.Component<FeatureUserGuideProps, FeatureUserGuideState> {
  /** Navigate to the previous guide step */
  pageUp(): void;
  
  /** Navigate to the next guide step */
  pageDown(): void;
  
  /** Parse and resolve resource URL */
  parseURL(url: string): string;
  
  /** Handler for mouse over event on left arrow */
  onMouseOverLeftEvent(event: React.MouseEvent): void;
  
  /** Handler for mouse out event on left arrow */
  onMouseoutLeftEvent(): void;
  
  /** Handler for mouse over event on right arrow */
  onMouseOverRightEvent(): void;
  
  /** Handler for mouse out event on right arrow */
  onMouseOutRightEvent(): void;
}

/**
 * Configuration options for showing the user guide popup
 */
export interface ShowUserGuideOptions {
  /** Cookie key to track if tutorial has been viewed */
  tutorialCookieKey?: string;
  /** Array of guide step data */
  data: GuideDataItem[];
  /** Header title for the popup window */
  headerName: string;
  /** Callback when guide is marked as read/completed */
  readed?: () => void;
  /** CSS class name for the popup window */
  windowClassName?: string;
  /** Custom text for the "Got It" button */
  gotItText?: string;
  /** Callback when popup is cancelled/closed */
  cancelcall?: () => void;
}

/**
 * Popup window instance interface
 */
export interface PopupWindow {
  /** Close the popup window */
  close(): void;
}

/**
 * User Guide Manager
 * Manages the display and lifecycle of user guide popups
 */
export interface UserGuideManager {
  /** Reference to the current popup window instance */
  popupwindow: PopupWindow | undefined;
  
  /**
   * Display the user guide popup
   * @param options Configuration for the user guide display
   */
  show(options: ShowUserGuideOptions): void;
  
  /**
   * Close the current user guide popup
   */
  close(): void;
}

/**
 * Default export: User Guide Manager instance
 */
declare const userGuideManager: UserGuideManager;

export default userGuideManager;