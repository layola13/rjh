/**
 * Property bar text component for displaying labels
 * @module PropertyBarText
 */

import React from 'react';

/**
 * Props for the PropertyBarText component
 */
export interface PropertyBarTextProps {
  /** The text label to display */
  label: string;
}

/**
 * Internal component that renders a property bar text element
 * @param props - Component properties
 * @returns React element containing the label
 */
declare function PropertyBarTextInternal(props: PropertyBarTextProps): React.ReactElement;

/**
 * Property bar text component wrapper
 * Creates a property bar text display with the provided label
 * @param label - The text string to display in the property bar
 * @returns React element with the formatted label
 */
export default function PropertyBarText(label: string): React.ReactElement;