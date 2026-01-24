/**
 * Loading component module
 * Provides a full-screen loading overlay with rotating animation
 */

/**
 * Props for the loading panel component
 */
export interface LoadingPanelProps {
  /**
   * Color of the loading spinner
   * @default "#237ab9"
   */
  loadingcolor?: string;
  
  /**
   * CSS class name for panel positioning
   * @default "panelcenter"
   */
  panelclass?: string;
  
  /**
   * Background color of the full-screen cover
   * @default "transparent"
   */
  covercolor?: string;
}

/**
 * Loading manager class
 * Manages the creation and rendering of loading overlays
 */
export default class LoadingManager {
  /**
   * Creates a new instance of LoadingManager
   */
  constructor();
  
  /**
   * Creates a loading overlay instance
   * @param options - Configuration options for the loading overlay
   */
  static create(options?: LoadingPanelProps): void;
  
  /**
   * Returns a React element for the loading component
   * @param props - Properties to configure the loading component
   * @returns React element representing the loading overlay
   */
  static getReactElement(props?: LoadingPanelProps): React.ReactElement<LoadingPanelProps>;
}

/**
 * Internal loading component (not exported)
 * Renders a full-screen overlay with centered rotating loading animation
 */
declare const LoadingComponent: React.ComponentType<LoadingPanelProps>;