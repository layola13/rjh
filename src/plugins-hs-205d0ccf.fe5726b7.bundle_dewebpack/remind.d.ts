/**
 * Remind module - Provides reminder/tooltip components for teaching and onboarding flows
 * Original Module ID: 384000
 */

import React from 'react';

/**
 * Theme variants for the remind component
 */
export type RemindTheme = 'teaching-light' | 'teaching-dark' | string;

/**
 * Types of remind tooltips available
 */
export type RemindType = string;

/**
 * Close state tracking
 */
type CloseState = 'close' | 'noRemind';

/**
 * Rectangle position for tooltip targeting
 */
export interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom?: number;
  right?: number;
}

/**
 * Data payload for remind content
 */
export interface RemindData {
  [key: string]: unknown;
}

/**
 * Props for RemindMain component
 */
export interface RemindMainProps {
  /** Target element rectangle for positioning */
  targetRect: TargetRect;
  
  /** Data to be displayed in the reminder */
  data: RemindData;
  
  /** Theme variant (default: 'teaching-light') */
  theme?: RemindTheme;
  
  /** Callback when reminder is closed normally */
  close?: () => void;
  
  /** Callback when user chooses 'don't remind again' */
  noRemind?: () => void;
  
  /** Callback for teaching checkpoint validation */
  checkTeaching?: () => void;
  
  /** Type of reminder to display */
  type: RemindType;
  
  /** Whether to hide the arrow pointer */
  hideArrow?: boolean;
}

/**
 * Props for RemindComp component
 */
export interface RemindCompProps {
  /** Whether the reminder is visible */
  visible: boolean;
  
  /** Type of reminder to display */
  type: RemindType;
  
  /** Data to be displayed in the reminder */
  data: RemindData;
  
  /** Target element rectangle for positioning */
  targetRect: TargetRect;
  
  /** Whether to hide the arrow pointer */
  hideArrow?: boolean;
  
  /** Callback when close animation completes */
  onClosed?: () => void;
}

/**
 * Context value for remind modal interactions
 */
export interface RemindModalContextValue {
  /** Close the reminder normally */
  close: () => void;
  
  /** Close and mark as 'don't remind again' */
  noRemind: () => void;
  
  /** Check teaching state */
  checkTeaching?: () => void;
}

/**
 * Configuration for remind content types
 */
export interface RemindContentConfig {
  /** React component to render */
  Component: React.ComponentType<any>;
  
  /** CSS class name for arrow styling */
  arrowClassName?: string;
  
  /** Arrow size in pixels */
  arrowSize?: number;
  
  /** Transition duration in milliseconds */
  transitionDuration?: number;
}

/**
 * Core remind tooltip component
 * Renders a positioned tooltip with customizable content based on type
 */
export declare function RemindComp(props: RemindCompProps): React.ReactElement | null;

/**
 * Main remind component with state management
 * Provides theme and modal context to child components
 * Manages visibility state and close callbacks
 */
export declare function RemindMain(props: RemindMainProps): React.ReactElement;