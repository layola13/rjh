/**
 * Hotkey modal stylesheet module
 * Defines styles for a keyboard shortcut modal with theme support (dark/light)
 */

/**
 * CSS module export for hotkey modal component styles
 * 
 * Features:
 * - Dark theme (.black) and light theme (.light) support
 * - Left navigation sidebar with selectable items
 * - Right content area with scrollable shortcut cards
 * - Hover states and selection indicators
 * - "New" badge styling for recently added shortcuts
 * - Responsive layout with fixed dimensions
 */
declare module "module_277778" {
  /**
   * CSS module loader function signature
   * @param sourceMap - Whether to include source maps (false for production)
   * @returns Array containing module metadata and CSS string
   */
  export interface CSSModuleLoader {
    (sourceMap: boolean): {
      push(entry: [string, string]): void;
    };
  }

  /**
   * Module exports - CSS content as string array
   * Contains all styling rules for:
   * - .hotkey-modal: Main container with absolute positioning
   * - .hotkey-modal.black: Dark theme variant (#2b2c2e background)
   * - .hotkey-modal.light: Light theme variant (#fff background)
   * - .hotkey-title: Header with 20px font, flexbox layout
   * - .hotkey-container: Main flex container (400px height)
   * - .hotkey-container-left: Navigation sidebar (124px width)
   * - .hotkey-container-right: Content area (366px width, scrollable)
   * - .red-dot: New feature indicator (5px red circle)
   * - .new-red-icon: "NEW" badge (#EB5D46 background)
   * - .item-box: Individual key display boxes
   */
  const styles: string;
  export default styles;
}

/**
 * Type definitions for the hotkey modal CSS classes
 */
declare namespace HotkeyModalStyles {
  /**
   * Root modal container class
   */
  export type RootClass = "hotkey-modal";

  /**
   * Theme variants
   */
  export type Theme = "black" | "light";

  /**
   * Component class names used in the module
   */
  export interface ClassNames {
    /** Main modal container - absolutely positioned, overflow hidden */
    root: "hotkey-modal";
    
    /** Dark theme modifier - white text, dark backgrounds */
    themeDark: "black";
    
    /** Light theme modifier - dark text, light backgrounds */
    themeLight: "light";
    
    /** Modal header containing title and close button */
    title: "hotkey-title";
    
    /** Bold, skewed title text */
    titleText: "hotkey-title-text";
    
    /** Close button icon */
    closeIcon: "close-icon";
    
    /** Main content container with left/right split */
    container: "hotkey-container";
    
    /** Left sidebar navigation (124px) */
    containerLeft: "hotkey-container-left";
    
    /** Navigation item - clickable with hover state */
    containerLeftItem: "hotkey-container-left-item";
    
    /** Selected navigation item */
    selected: "selected";
    
    /** Red dot indicator for new features */
    redDot: "red-dot";
    
    /** Right content area (366px, scrollable) */
    containerRight: "hotkey-container-right";
    
    /** Content card wrapper */
    containerRightCard: "hotkey-container-right-card";
    
    /** Section title in right panel */
    containerRightTitle: "hotkey-container-right-title";
    
    /** Wrapper for shortcut item group */
    containerRightItemWrapper: "hotkey-container-right-item-wrapper";
    
    /** Individual shortcut row */
    containerRightItem: "hotkey-container-right-item";
    
    /** Shortcut description text */
    containerRightItemText: "hotkey-container-right-item-text";
    
    /** "NEW" badge container */
    newRedIcon: "new-red-icon";
    
    /** "NEW" badge text */
    newRedIconText: "new-red-icon-text";
    
    /** Container for key combination display */
    itemBoxWrapper: "item-box-wrapper";
    
    /** Individual key box (e.g., "Ctrl", "C") */
    itemBox: "item-box";
    
    /** Plus sign between keys */
    itemBoxAdd: "item-box-add";
    
    /** Zoom content wrapper */
    zoomContent: "zoom-content";
  }

  /**
   * Color palette used in themes
   */
  export interface ColorPalette {
    dark: {
      background: "#2b2c2e";
      backgroundHover: "#5a5b5d";
      text: "#fff";
    };
    light: {
      background: "#fff";
      backgroundHover: "#F2F2F2";
      text: "#33353B";
    };
    accent: {
      red: "#EB5D46";
      border: "#D4D7E1";
      keyBackground: "#F5F5F5";
    };
  }

  /**
   * Layout dimensions
   */
  export interface Dimensions {
    containerHeight: 400;
    leftPanelWidth: 124;
    rightPanelWidth: 366;
    itemHeight: 38;
    titleHeight: 40;
  }
}

export { HotkeyModalStyles };