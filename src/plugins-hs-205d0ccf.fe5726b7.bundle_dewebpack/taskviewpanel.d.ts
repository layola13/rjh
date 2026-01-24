/**
 * Task View Panel Component
 * Displays a grid of AI-generated images organized by tasks with management capabilities
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Task business status codes
 */
export enum TaskBizStatusCode {
  /** Task is dispatched and processing */
  DISPATCHED = 'DISPATCHED',
  /** Task is pending in queue */
  PENDING = 'PENDING',
  /** Task completed successfully */
  SUCCESS = 'SUCCESS',
}

/**
 * Image result data structure
 */
export interface ImageResult {
  /** Unique identifier for the sub-task/image */
  subTaskId: string;
  /** URL or path to the generated image */
  imageUrl?: string;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
  /** Creation timestamp */
  createdAt?: number;
  /** Current processing status */
  status?: string;
}

/**
 * Task data structure containing generation parameters and results
 */
export interface Task {
  /** Unique task identifier */
  taskId: string;
  /** User-defined task name */
  taskName: string;
  /** Current business status of the task */
  bizStatus: TaskBizStatusCode;
  /** Array of generated images */
  imageResultList: ImageResult[];
  /** Aspect ratio width proportion */
  proportionWidth: number;
  /** Aspect ratio height proportion */
  proportionHeight: number;
  /** Additional task metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Statistics for all user tasks
 */
export interface TaskTotal {
  /** Total number of tasks */
  taskCount: number;
  /** Total number of generated images across all tasks */
  subTaskCount: number;
}

/**
 * Image dimensions for rendering
 */
export interface ImageDimensions {
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels */
  height?: number;
}

/**
 * Grid layout configuration
 */
export interface GridLayout {
  /** Number of columns */
  wNum: number;
  /** Number of rows */
  hNum: number;
}

/**
 * Container style for image grid
 */
export interface ContainerStyle {
  /** Content alignment */
  alignContent?: string;
  /** Total width of the container */
  width?: number;
}

/**
 * Props for TaskViewPanel component
 */
export interface TaskViewPanelProps {
  /** Controls panel visibility */
  show: boolean;
  /** Callback to update spark pic coupon status */
  updateSparkPicCoupon: () => void | Promise<void>;
  /** Default task to display on mount */
  defaultTask?: Task;
}

/**
 * Main task view panel component for managing and displaying AI-generated images
 * 
 * Features:
 * - Display all user tasks in a sidebar
 * - Show image grid for selected task
 * - Rename, repaint, download, and delete tasks
 * - Remove watermarks (member feature)
 * - View full-size image details
 * - Auto-refresh for pending tasks
 * 
 * @param props - Component props
 * @returns Task view panel React element
 */
export declare function TaskViewPanel(props: TaskViewPanelProps): React.ReactElement;

/**
 * Internal action handlers (imported from Action module)
 */
declare namespace Action {
  /**
   * Fetch all tasks with pagination
   */
  function fetchAllTaskImage(params: { offset: number; limit: number }): Promise<{ taskList: Task[] }>;
  
  /**
   * Get total task and image statistics
   */
  function getTotal(): Promise<TaskTotal>;
  
  /**
   * Track image view event for analytics
   */
  function viewedImage(subTaskId?: string, taskId?: string): void;
  
  /**
   * Update task information (e.g., name)
   */
  function updateTaskInfo(params: { taskId: string; taskName: string }): Promise<{ result: boolean }>;
  
  /**
   * Resubmit an existing task with same parameters
   */
  function reSubmitTask(task: Task, callback: (task?: Task) => void): void;
  
  /**
   * Remove watermark from images (requires membership)
   */
  function removeWatermark(images: ImageResult[], sourcePage: string): Promise<{ msg?: string }>;
  
  /**
   * Download all images in a task as a batch
   */
  function batchDownloadTask(task: Task): Promise<void>;
  
  /**
   * Delete an entire task
   */
  function deleteTask(task: Task, callback: () => void): void;
  
  /**
   * Delete a single rendered image
   */
  function deleteRender(image: ImageResult, callback: (image: ImageResult) => void): void;
  
  /**
   * Upgrade image resolution (upscale)
   */
  function upgradeResolution(image: ImageResult): Promise<boolean>;
  
  /**
   * Regenerate image using existing image as reference
   */
  function submitByImage(image: ImageResult, task: Task, callback: (task?: Task) => void): void;
  
  /**
   * Refresh task list to get latest status
   */
  function refreshTasks(tasks: Task[]): Promise<Task[]>;
  
  /**
   * Refresh individual image jobs to get latest status
   */
  function refreshJobs(images: ImageResult[]): Promise<ImageResult[]>;
  
  /**
   * Check if user has member grade privileges
   */
  function isMemberGrade(): boolean;
}

/**
 * Image card component props
 */
export interface ImageCardProps {
  /** Image data to display */
  data: ImageResult;
  /** Custom styling for dimensions */
  style: ImageDimensions;
  /** Delete handler */
  handleDelete: () => void;
  /** Resolution upgrade handler */
  handleUpdateResolution: (image: ImageResult) => void;
  /** View detail handler */
  viewDetail: (image: ImageResult) => void;
  /** Repaint handler */
  rePaint: () => void;
}

/**
 * Task card component props
 */
export interface TaskCardProps {
  /** Task data to display */
  data: Task;
  /** Whether this task is currently selected */
  selected: boolean;
}

/**
 * Image detail modal props
 */
export interface ImageDetailProps {
  /** Current image to display */
  data: ImageResult;
  /** All images in the task for navigation */
  dataList: ImageResult[];
  /** Parent task information */
  task: Task;
  /** Close handler with optional refresh */
  handleClose: (shouldRefresh?: boolean, task?: Task) => void;
  /** Delete handler */
  handleDelete: (image: ImageResult) => void;
}

/**
 * Name input component props
 */
export interface NameInputProps {
  /** Current name value */
  value: string;
  /** Maximum character limit */
  characterLimit: number;
  /** Callback when editing is committed */
  commitEditingName: (newName: string) => void;
}