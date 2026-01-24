/**
 * Utility functions for Ant Design Icons rendering and manipulation
 * @module IconUtils
 */

import React from 'react';

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name */
  name: string;
  /** Icon theme type */
  theme: string;
  /** Icon SVG content or render function */
  icon: object | Function;
}

/**
 * Icon node representing SVG element structure
 */
export interface IconNode {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs?: Record<string, unknown>;
  /** Child nodes */
  children?: IconNode[];
}

/**
 * Normalized HTML attributes
 */
export interface NormalizedAttrs {
  /** CSS class name */
  className?: string;
  [key: string]: unknown;
}

/**
 * CSP (Content Security Policy) configuration
 */
export interface CSPConfig {
  nonce?: string;
}

/**
 * Icon context value
 */
export interface IconContextValue {
  /** CSP configuration */
  csp?: CSPConfig;
}

/**
 * Base SVG properties for icon rendering
 */
export const svgBaseProps: {
  width: string;
  height: string;
  fill: string;
  'aria-hidden': string;
  focusable: string;
};

/**
 * Default icon styles (CSS string)
 */
export const iconStyles: string;

/**
 * Recursively generates React elements from icon node structure
 * @param node - Icon node to render
 * @param key - React key for the element
 * @param rootProps - Additional props to merge into root element
 * @returns React element
 */
export function generate(
  node: IconNode,
  key: string,
  rootProps?: Record<string, unknown>
): React.ReactElement;

/**
 * Normalizes HTML attributes (converts 'class' to 'className', kebab-case to camelCase)
 * @param attrs - Raw attributes object
 * @returns Normalized attributes
 */
export function normalizeAttrs(attrs?: Record<string, unknown>): NormalizedAttrs;

/**
 * Normalizes two-tone color input to array format
 * @param twoToneColor - Single color or array of colors
 * @returns Array of colors (empty if none provided)
 */
export function normalizeTwoToneColors(twoToneColor?: string | string[]): string[];

/**
 * Generates secondary color from primary color
 * @param primaryColor - Primary theme color
 * @returns Secondary color
 */
export function getSecondaryColor(primaryColor: string): string;

/**
 * Type guard to check if object is a valid icon definition
 * @param icon - Object to check
 * @returns True if object matches IconDefinition structure
 */
export function isIconDefinition(icon: unknown): icon is IconDefinition;

/**
 * Displays warning message in development mode
 * @param condition - Condition to trigger warning
 * @param message - Warning message
 */
export function warning(condition: boolean, message: string): void;

/**
 * Hook to insert icon styles into document
 * @param styles - CSS styles to insert (defaults to iconStyles)
 */
export function useInsertStyles(styles?: string): void;