/**
 * Toggle catalog sidebar manager
 * Manages the visibility and behavior of a catalog sidebar component
 */
declare class ToggleCatalogSidebarManager {
  /**
   * Container element for the toggle catalog sidebar
   */
  private toggleCon: HTMLElement | null;

  /**
   * Creates a new instance of ToggleCatalogSidebarManager
   */
  constructor();

  /**
   * Initializes the sidebar container and renders the React component
   * Creates the container if it doesn't exist and mounts the sidebar component
   */
  init(): void;

  /**
   * Unmounts the React component from the sidebar container
   * Cleans up the sidebar when it's no longer needed
   */
  unmountSideBar(): void;

  /**
   * Checks if the current app is running in the default environment
   * @returns true if the active environment ID is "default"
   */
  isDefaultApp(): boolean;

  /**
   * Expands or collapses the sidebar based on the provided flag
   * @param shouldExpand - true to show the sidebar, false to hide it
   */
  expandSideBar(shouldExpand: boolean): void;

  /**
   * Shows the sidebar by adding visibility classes and recovering its display
   * Also removes the folded state from the button content
   */
  showSideBar(): void;

  /**
   * Hides the sidebar by removing visibility classes
   * Adds folded state to button content if not in customized PM environment
   */
  hideSideBar(): void;

  /**
   * Completely removes the sidebar from view by setting display to none
   */
  removeSideBar(): void;

  /**
   * Recovers the sidebar display by setting display to block
   */
  recoverSideBar(): void;

  /**
   * Adjusts the top margin of the sidebar
   * @param topOffset - The margin top value in pixels (default: 0)
   */
  changeTop(topOffset?: number): void;
}

/**
 * Default export of a singleton instance of ToggleCatalogSidebarManager
 */
declare const _default: ToggleCatalogSidebarManager;
export default _default;