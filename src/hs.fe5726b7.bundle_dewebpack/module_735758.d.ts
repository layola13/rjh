/**
 * Vertical Divider Component
 * A simple React component that renders a vertical divider with optional custom className
 */

import React from 'react';

/**
 * Props for the VDivider component
 */
export interface VDividerProps {
  /**
   * Configuration data for the divider
   */
  data?: {
    /**
     * Optional CSS class name to apply to the divider
     */
    className?: string;
  };
}

/**
 * VDivider Component
 * Renders a vertical divider span element with the base class 'vdivider'
 * and any additional classes specified in props.data.className
 */
declare const VDivider: React.ComponentType<VDividerProps>;

export default VDivider;