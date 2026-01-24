/**
 * Default Empty State Image Component
 * 
 * A React component that renders an SVG illustration for empty states.
 * This component uses the Ant Design ConfigContext to apply consistent
 * theming and CSS class prefixes.
 * 
 * @module EmptyImageDefault
 */

import React, { useContext, type ReactElement } from 'react';
import { ConfigContext } from './config-context';

/**
 * Props for the EmptyImageDefault component
 */
export interface EmptyImageDefaultProps {
  /** Optional CSS class name to apply to the SVG root element */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
}

/**
 * Renders the default empty state illustration.
 * 
 * This component displays a stylized illustration commonly used in UI
 * to indicate that no data or content is available. The illustration
 * consists of layered geometric shapes forming a generic "empty folder"
 * or "no content" visual metaphor.
 * 
 * The component automatically retrieves the CSS class prefix from the
 * ConfigContext to ensure consistent theming across the application.
 * 
 * @returns A React element containing the SVG illustration
 * 
 * @example
 *