/**
 * Preview card component for displaying task items with status indicators
 * @module PreviewCard
 */

import type { ReactElement, CSSProperties } from 'react';

/**
 * Task business status codes
 */
export enum TaskBizStatusCode {
  /** Task has been dispatched */
  DISPATCHED = 'DISPATCHED',
  /** Task is pending */
  PENDING = 'PENDING',
  /** Task completed successfully */
  SUCCESS = 'SUCCESS',
}

/**
 * Task data structure
 */
export interface TaskData {
  /** Current business status of the task */
  bizStatus: TaskBizStatusCode;
  /** Unique identifier for the task */
  id?: string;
  /** Task title or name */
  title?: string;
  /** Additional task metadata */
  [key: string]: unknown;
}

/**
 * Icon font view component properties
 */
export interface IconfontViewProps {
  /** Icon type identifier */
  showType: string;
  /** Custom CSS styles */
  customStyle?: CSSProperties;
  /** Hover state color */
  hoverColor?: string;
}

/**
 * Task card component properties
 */
export interface TaskCardProps {
  /** Task data to display */
  data: TaskData;
  /** Whether the card is selected */
  selected: boolean;
}

/**
 * Badge component properties
 */
export interface BadgeProps {
  /** Show notification dot */
  dot: boolean;
  /** Child elements */
  children: ReactElement | ReactElement[];
}

/**
 * Preview card component properties
 */
export interface PreviewCardProps {
  /** Whether this is a new/unread task */
  isNew: boolean;
  /** Task data to display */
  data: TaskData;
  /** Callback to refresh the task list */
  refresh: () => void;
  /** Click handler for viewing task details */
  onClick: (data: TaskData) => void;
}

/**
 * Action utilities for task management
 */
export namespace Action {
  /**
   * Delete a task
   * @param data - Task to delete
   * @param callback - Callback to execute after deletion
   */
  export function deleteTask(data: TaskData, callback: () => void): void;
}

/**
 * Resource manager for internationalization
 */
export namespace ResourceManager {
  /**
   * Get localized string by key
   * @param key - Resource key
   * @returns Localized string
   */
  export function getString(key: string): string;
}

/**
 * Preview card component for displaying task items with interactive overlays
 * 
 * Features:
 * - Shows new task indicator badge
 * - Displays task card with status
 * - Provides hover overlay for completed tasks
 * - Allows viewing details and deleting tasks
 * 
 * @param props - Component properties
 * @returns React element
 */
export declare function PreviewCard(props: PreviewCardProps): ReactElement;

/**
 * Iconfont view component for rendering icon fonts
 */
export declare function IconfontView(props: IconfontViewProps): ReactElement;

/**
 * Task card component for displaying task information
 */
export declare function TaskCard(props: TaskCardProps): ReactElement;

/**
 * Badge component for showing notification indicators
 */
export declare function Badge(props: BadgeProps): ReactElement;