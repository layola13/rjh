/**
 * Module: RemindContent
 * Original ID: 516628
 * Exports: RemindContent
 */

import { Theme } from './theme-module';
import { ContentConfig } from './content-config';

/**
 * Data payload for the remind content component
 */
export interface RemindContentData {
  [key: string]: unknown;
}

/**
 * Props for the RemindContent component
 */
export interface RemindContentProps {
  /**
   * Type of reminder content to display
   */
  type: string;
  
  /**
   * Data to be passed to the content component
   */
  data: RemindContentData;
}

/**
 * Configuration for content components
 */
export declare const contentConfig: ContentConfig;

/**
 * Hook to retrieve the current theme
 * @returns The current theme identifier
 */
export declare function useTheme(): Theme;

/**
 * RemindContent component displays different types of reminder content
 * based on the provided type and data.
 * 
 * @param props - Component properties
 * @returns React element displaying the reminder content, or null if no matching component found
 */
export declare function RemindContent(props: RemindContentProps): JSX.Element | null;