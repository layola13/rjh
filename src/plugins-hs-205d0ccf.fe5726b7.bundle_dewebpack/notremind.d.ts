/**
 * NotRemind Component
 * A clickable div component that triggers a "no remind" action in a modal context.
 * Displays localized text for "do not remind me again" functionality.
 */

import React from 'react';

/**
 * Props for the NotRemind component
 */
export interface NotRemindProps {
  /**
   * Theme variant for styling (e.g., 'light', 'dark')
   */
  theme: string;

  /**
   * Additional CSS class name(s) to apply
   */
  className?: string;
}

/**
 * Context value returned by useRemindModalContext hook
 */
export interface RemindModalContextValue {
  /**
   * Callback function to execute when user chooses not to be reminded
   */
  noRemind: () => void;
}

/**
 * Hook to access remind modal context
 * @returns Context value containing noRemind callback
 */
export declare function useRemindModalContext(): RemindModalContextValue;

/**
 * NotRemind functional component
 * Renders a clickable element that allows users to dismiss reminders permanently
 * 
 * @param props - Component props
 * @returns React element representing the "not remind" UI control
 */
export declare function NotRemind(props: NotRemindProps): React.ReactElement;