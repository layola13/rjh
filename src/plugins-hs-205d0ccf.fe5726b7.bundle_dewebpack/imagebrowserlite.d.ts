/**
 * Image Browser Lite Component
 * A React component for browsing and managing image generation tasks
 */

import { ReactElement, MouseEvent } from 'react';

/**
 * Image task view state
 * 0 = New/Unviewed
 * 1 = Viewed
 */
type TaskViewState = 0 | 1;

/**
 * Represents an image generation task
 */
interface ImageTask {
  /** Unique identifier for the task */
  taskId: string;
  
  /** Current view state of the task */
  viewState: TaskViewState;
  
  /** Additional task properties */
  [key: string]: unknown;
}

/**
 * API response when fetching all tasks
 */
interface FetchAllTaskImageResponse {
  /** List of image tasks */
  taskList?: ImageTask[];
}

/**
 * Parameters for fetching image tasks
 */
interface FetchTasksParams {
  /** Page offset (1-based) */
  offset: number;
  
  /** Maximum number of tasks to fetch */
  limit: number;
}

/**
 * Component state for controlling UI visibility
 */
interface UIState {
  /** Whether to show the tooltip */
  showTip: boolean;
  
  /** Whether to show the task list */
  showList: boolean;
}

/**
 * Props for the ImageBrowserLite component
 */
interface ImageBrowserLiteProps {
  /** Callback when the browser icon or task is clicked */
  handleClick: (event?: MouseEvent) => void;
  
  /** Mock image data for testing/preview purposes */
  mockImage?: unknown;
}

/**
 * Action API for managing image tasks
 */
declare namespace Action {
  /**
   * Fetch all image tasks with pagination
   */
  function fetchAllTaskImage(params: FetchTasksParams): Promise<FetchAllTaskImageResponse>;
  
  /**
   * Refresh the status of existing tasks
   * @returns Updated list of tasks that have changed
   */
  function refreshTasks(tasks: ImageTask[]): Promise<ImageTask[]>;
}

/**
 * Badge component props
 */
interface BadgeProps {
  /** Show a small dot indicator */
  dot?: boolean;
  
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * Badge component for displaying notification indicators
 */
export declare const Badge: React.FC<BadgeProps>;

/**
 * Icon display configuration
 */
interface IconfontViewProps {
  /** Click handler for the icon */
  iconOnclick?: () => void;
  
  /** Icon type identifier */
  showType: string;
  
  /** Custom CSS class name */
  customClass?: string;
  
  /** Custom inline styles */
  customStyle?: React.CSSProperties;
}

/**
 * Icon font view component
 */
export declare const IconfontView: React.FC<IconfontViewProps>;

/**
 * Preview card component props
 */
interface PreviewCardProps {
  /** Task data to display */
  data: ImageTask;
  
  /** Whether this is a newly created task */
  isNew: boolean;
  
  /** Callback to refresh task list */
  refresh: () => void;
  
  /** Click handler for the card */
  onClick: (event?: MouseEvent) => void;
}

/**
 * Preview card component for displaying individual tasks
 */
export declare const PreviewCard: React.FC<PreviewCardProps>;

/**
 * Global resource manager for internationalization
 */
declare const ResourceManager: {
  /**
   * Get localized string by key
   */
  getString(key: string): string;
};

/**
 * ImageBrowserLite Component
 * 
 * Displays a compact image browser interface with:
 * - Icon button with badge indicator for new items
 * - Hover-triggered tooltip and task list
 * - Auto-refresh of task status (2 second interval)
 * - Visual indicators for rendering progress
 * 
 * @example
 *