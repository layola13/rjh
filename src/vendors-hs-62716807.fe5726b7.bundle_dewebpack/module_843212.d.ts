/**
 * Anchor component for navigation links
 * Provides a sidebar navigation with anchor links that automatically highlight based on scroll position
 * @module Anchor
 */

import * as React from 'react';
import { ConfigContext } from '../config-provider/context';

/**
 * Container for anchor link
 */
export interface AnchorLinkData {
  /** The anchor link URL (hash) */
  link: string;
  /** The vertical scroll position of the anchor element */
  top: number;
}

/**
 * Props for the Anchor component
 */
export interface AnchorProps {
  /** Custom CSS class name */
  className?: string;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** Child elements (typically AnchorLink components) */
  children?: React.ReactNode;
  
  /** Pixels to offset from top when calculating position of scroll */
  offsetTop?: number;
  
  /** Pixels to offset from top when calculating target offset */
  targetOffset?: number;
  
  /** Scrolling range boundary (in pixels) for determining active links */
  bounds?: number;
  
  /** Whether the Anchor should be affixed to the container */
  affix?: boolean;
  
  /** Whether to show ink indicator when affixed */
  showInkInFixed?: boolean;
  
  /** Custom CSS class prefix */
  prefixCls?: string;
  
  /** Callback executed when active link changes */
  onChange?: (currentActiveLink: string) => void;
  
  /** Callback executed when a link is clicked */
  onClick?: (
    event: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string }
  ) => void;
  
  /** Customize the scrolling container */
  getContainer?: () => HTMLElement | Window;
  
  /** Customize the calculation method of anchor highlight */
  getCurrentAnchor?: () => string;
}

/**
 * Internal state for the Anchor component
 */
export interface AnchorState {
  /** Currently active anchor link */
  activeLink: string | null;
}

/**
 * Context value provided to AnchorLink children
 */
export interface AnchorContextValue {
  /** Register an anchor link */
  registerLink: (link: string) => void;
  
  /** Unregister an anchor link */
  unregisterLink: (link: string) => void;
  
  /** Currently active link */
  activeLink: string | null;
  
  /** Scroll to specified anchor */
  scrollTo: (link: string) => void;
  
  /** Click handler for links */
  onClick?: (
    event: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string }
  ) => void;
}

/**
 * Anchor component class
 * Provides a sidebar navigation with automatically highlighted anchor links based on scroll position
 * 
 * @example
 *