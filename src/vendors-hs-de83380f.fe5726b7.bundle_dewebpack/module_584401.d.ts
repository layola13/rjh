import type { CSSProperties, ReactElement, Context } from 'react';

/**
 * Icon definition structure
 */
export interface IconDefinition {
  /** Icon name identifier */
  name: string;
  /** Theme type (e.g., 'filled', 'outlined', 'twotone') */
  theme: string;
  /** Icon shape data or render function */
  icon: object | Function;
}

/**
 * Icon node structure for rendering
 */
export interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs?: Record<string, unknown>;
  /** Child nodes */
  children?: IconNode[];
}

/**
 * Context shape for icon configuration
 */
export interface IconContext {
  /** Content Security Policy configuration */
  csp?: {
    nonce?: string;
  };
}

/**
 * Base SVG properties for all icons
 */
export const svgBaseProps: {
  width: string;
  height: string;
  fill: string;
  'aria-hidden': string;
  focusable: string;
};

/**
 * Global icon styles CSS string
 */
export const iconStyles: string;

/**
 * Normalize HTML attributes to React props format
 * Converts 'class' to 'className' and kebab-case to camelCase
 * 
 * @param attrs - Raw HTML attributes object
 * @returns Normalized React props object
 */
export function normalizeAttrs(attrs?: Record<string, unknown>): Record<string, unknown>;

/**
 * Recursively generate React elements from icon node tree
 * 
 * @param node - Icon node structure
 * @param key - React key for the element
 * @param additionalProps - Optional additional props to merge
 * @returns Generated React element
 */
export function generate(
  node: IconNode,
  key: string,
  additionalProps?: Record<string, unknown>
): ReactElement;

/**
 * Extract secondary color from primary color for two-tone icons
 * 
 * @param primaryColor - Primary color value
 * @returns Secondary color value
 */
export function getSecondaryColor(primaryColor: string): string;

/**
 * Normalize two-tone color input to array format
 * 
 * @param colors - Single color string or array of colors
 * @returns Array of color values
 */
export function normalizeTwoToneColors(colors?: string | string[]): string[];

/**
 * Type guard to check if object is a valid icon definition
 * 
 * @param obj - Object to validate
 * @returns True if object matches IconDefinition structure
 */
export function isIconDefinition(obj: unknown): obj is IconDefinition;

/**
 * Display warning message with icon library prefix
 * 
 * @param condition - Whether to show the warning
 * @param message - Warning message content
 */
export function warning(condition: boolean, message: string): void;

/**
 * React hook to inject global icon styles into document
 * Should be called once at the application root level
 * 
 * @param styles - Optional custom CSS string (defaults to iconStyles)
 */
export function useInsertStyles(styles?: string): void;