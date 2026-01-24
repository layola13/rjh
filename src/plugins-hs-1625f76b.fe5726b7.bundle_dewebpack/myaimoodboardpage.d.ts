/**
 * Module: MyAiMoodboardPage
 * Component for displaying and managing AI-generated moodboard results
 */

import { RefObject } from 'react';

/**
 * Props for the MyAiMoodboardPage component
 */
export interface MyAiMoodboardPageProps {
  /**
   * Callback function to close the panel
   */
  closePanel?: () => void;

  /**
   * Whether to show the back button
   */
  showBack?: boolean;

  /**
   * Callback function when back button is clicked
   */
  backClick?: () => void;

  /**
   * Flag indicating if the modeler should be refreshed
   */
  isRefreshModeler?: boolean;

  /**
   * Callback to update the refresh modeler state
   */
  setRefreshModeler?: (refresh: boolean) => void;

  /**
   * Flag indicating if content is currently generating
   */
  isGenerating?: boolean;

  /**
   * Callback to update the generating state
   */
  setIsGenerating?: (generating: boolean) => void;

  /**
   * Reference to the page container element
   */
  pageRef?: RefObject<HTMLDivElement>;
}

/**
 * Refresh trigger type
 */
type RefreshTrigger = 'manual' | 'auto';

/**
 * MyAiMoodboardPage component
 * Displays AI-generated moodboard results with refresh and navigation controls
 * 
 * @param props - Component props
 * @returns React functional component
 */
export declare function MyAiMoodboardPage(props: MyAiMoodboardPageProps): JSX.Element;

/**
 * Module exports
 */
export { MyAiMoodboardPage as default };