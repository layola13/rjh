/**
 * CSS module for task view panel component
 * Contains styles for task list, image gallery, and related UI elements
 */

/**
 * Webpack module loader function signature
 * @param e - Module exports object
 * @param t - Module metadata/context
 * @param n - Webpack require function for loading dependencies
 */
declare module 'module_329550' {
  /**
   * Module exports object containing the CSS content
   */
  interface ModuleExports {
    /** Unique module identifier */
    id: string;
    
    /** CSS content as string array */
    push(content: [string, string]): void;
  }

  /**
   * Webpack require function for resolving module dependencies
   * @param moduleId - The numeric ID of the module to require
   * @returns The required module's exports
   */
  type WebpackRequire = (moduleId: number) => unknown;

  /**
   * CSS loader helper function that processes CSS content
   * @param sourceMap - Whether to include source maps (false in this case)
   * @returns Module exports object with push method
   */
  type CssLoaderHelper = (sourceMap: boolean) => ModuleExports;

  /**
   * Main module function that exports CSS styles for the task view panel
   * 
   * Styles include:
   * - `.task-view-panel`: Main container with flex layout
   * - `.task-list`: Left sidebar for task items (274px width)
   * - `.image-list`: Right panel for image gallery
   * - `.empty-status`: Empty state display with centered content
   * - `.header`: Top header with rename and action buttons
   * - Animations for loading spinner rotation
   * 
   * @param e - Module exports object to be populated
   * @param t - Module metadata (unused)
   * @param n - Webpack require function for loading dependencies (992716, 986380, 924408)
   */
  const moduleFunction: (
    e: { exports: ModuleExports; id: string },
    t: unknown,
    n: WebpackRequire
  ) => void;

  export default moduleFunction;
}

/**
 * CSS class definitions for the task view panel
 */
declare namespace TaskViewPanelStyles {
  /**
   * Main container class for the task view panel
   * - Uses flexbox layout
   * - Full width with calculated height (100% - 56px for header)
   * - Overflow hidden to prevent scrolling at root level
   */
  interface TaskViewPanel {
    display: 'flex';
    width: '100%';
    height: 'calc(100% - 56px)';
    overflow: 'hidden';
  }

  /**
   * Task list sidebar configuration
   * - Fixed width of 274px
   * - Left padding for content spacing
   */
  interface TaskList {
    width: '274px';
    paddingLeft: '8px';
  }

  /**
   * Image gallery panel configuration
   * - Dynamic width based on task list
   * - Dark background (#222222)
   * - Rounded corners with border styling
   */
  interface ImageList {
    width: 'calc(100% - 274px)';
    backgroundColor: '#222222';
    padding: '12px 24px';
    border: '1px solid #3b3b3b';
    borderRadius: '10px';
  }

  /**
   * Empty state display configuration
   * - Centered vertically using absolute positioning
   * - Flex column layout for icon and text stacking
   */
  interface EmptyStatus {
    position: 'absolute';
    top: '50%';
    transform: 'translate(0, -50%)';
    display: 'flex';
    flexDirection: 'column';
    alignItems: 'center';
  }

  /**
   * Loading animation keyframes
   * - 360 degree rotation
   * - 1.5s duration with linear easing
   * - Infinite loop
   */
  interface RotateAnimation {
    from: { transform: 'rotate(0deg)' };
    to: { transform: 'rotate(360deg)' };
  }
}