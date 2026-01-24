/**
 * Layout component module with Header, Footer, Content, and Sider sub-components.
 * Provides a standardized layout structure for applications.
 * 
 * @module Layout
 */

/**
 * Main layout component interface.
 * A container component that provides standard page layout functionality.
 */
export interface LayoutComponent {
  /**
   * Layout header component.
   * Typically used for navigation bars, logos, and top-level actions.
   */
  Header: React.ComponentType<HeaderProps>;

  /**
   * Layout footer component.
   * Typically used for copyright information, links, and bottom content.
   */
  Footer: React.ComponentType<FooterProps>;

  /**
   * Layout content component.
   * The main content area of the layout.
   */
  Content: React.ComponentType<ContentProps>;

  /**
   * Layout sider component.
   * A collapsible sidebar typically used for navigation menus.
   */
  Sider: React.ComponentType<SiderProps>;
}

/**
 * Props for the Header component.
 */
export interface HeaderProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * Props for the Footer component.
 */
export interface FooterProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * Props for the Content component.
 */
export interface ContentProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * Props for the Sider component.
 */
export interface SiderProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Child elements */
  children?: React.ReactNode;
  /** Whether the sider is collapsible */
  collapsible?: boolean;
  /** Whether the sider is collapsed */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapse?: (collapsed: boolean) => void;
  /** Width of the sider when expanded */
  width?: number | string;
  /** Width of the sider when collapsed */
  collapsedWidth?: number | string;
}

/**
 * Layout component with attached sub-components.
 * Use this to create structured page layouts.
 * 
 * @example
 *