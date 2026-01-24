/**
 * Header component for rendering application header with navigation and action buttons
 * @module Header
 */

import { Component, ReactNode } from 'react';

/**
 * Data structure for browser lite functionality
 */
export interface BrowserLiteData {
  /** Image URL or data */
  imageUrl?: string;
  /** Additional metadata */
  [key: string]: unknown;
}

/**
 * Props for the Header component
 */
export interface HeaderProps {
  /** Title text to display in the header */
  title: string;
  
  /** Custom CSS class name to apply to the header container */
  customClass?: string;
  
  /** Callback function triggered when the back button is clicked */
  onBackClick: () => void;
  
  /** Whether to show the browser lite button */
  showBrowserLite?: boolean;
  
  /** Whether to show the teaching ability button */
  showTeachingBtn?: boolean;
  
  /** Data passed to browser lite functionality */
  data?: BrowserLiteData;
}

/**
 * Internal state for the Header component
 */
interface HeaderState {
  // Add state properties if needed
}

/**
 * Teaching ability button configuration
 */
interface TeachingAbilityConfig {
  /** Theme identifier for the button */
  theme: string;
  /** CSS class name for the button */
  className: string;
}

/**
 * Environment configuration for teaching ability plugin
 */
interface TeachingEnvConfig {
  /** Function to retrieve the current theme */
  getTheme: () => string;
  /** Function to get the target element's bounding rectangle */
  getTargetRect: () => DOMRect | undefined;
}

/**
 * Full screen component render options
 */
interface FullScreenRenderOptions {
  /** Font size for the full screen icon */
  fontSize: string;
  /** Color for the full screen icon */
  color: string;
}

/**
 * Header component that displays a navigation bar with back button and action items
 * 
 * Features:
 * - Back navigation button with icon and title
 * - User info button (optional)
 * - Teaching ability button (optional)
 * - Full screen toggle (optional)
 * - Browser lite integration (optional)
 */
export declare class Header extends Component<HeaderProps, HeaderState> {
  /**
   * Teaching ability button element
   * @private
   */
  private _teachingAbilityButton: ReactNode | undefined;
  
  /**
   * Full screen component element
   * @private
   */
  private _fullScreenCom: ReactNode | undefined;
  
  /**
   * User info button element
   * @private
   */
  private _userInfoButton: ReactNode | null;
  
  /**
   * SparkPic image plugin instance
   * @private
   */
  private sparkpicImagePlugin: unknown;
  
  /**
   * Constructs a new Header component instance
   * @param props - Component properties
   */
  constructor(props: HeaderProps);
  
  /**
   * Renders the header component
   * @returns React element representing the header
   */
  render(): JSX.Element;
}