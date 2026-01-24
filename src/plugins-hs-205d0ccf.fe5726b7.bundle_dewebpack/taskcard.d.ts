/**
 * TaskCard component module
 * Renders task cards with different states based on business status
 */

import React from 'react';
import { TaskBizStatusCode } from './task-types';
import { ProgressContainer, ProgressModeEnum } from './progress';

/**
 * Task data structure containing task information
 */
export interface TaskData {
  /** Business status code of the task */
  bizStatus: TaskBizStatusCode;
  /** List of image results */
  imageResultList: Array<unknown>;
  /** URL of the cover image */
  coverImageUrl: string;
  /** Progress schedule percentage (0-100) */
  processSchedule: number;
}

/**
 * Props for TaskCard component
 */
export interface TaskCardProps {
  /** Task data object */
  data: TaskData;
  /** Whether the task card is selected */
  selected?: boolean;
}

/**
 * Props for internal card wrapper component
 */
interface TaskCardWrapperProps extends TaskCardProps {
  /** Child content to render inside the card */
  children?: React.ReactNode;
}

/**
 * Main TaskCard component
 * Renders different card states based on task business status
 * 
 * @param props - Component props containing task data and selection state
 * @returns React element representing the task card
 */
export declare function TaskCard(props: TaskCardProps): React.ReactElement;

/**
 * Card wrapper component that provides the base card structure
 * Displays image count and layered shadow effects
 * 
 * @param props - Wrapper props with task data and children
 * @returns React element with card container structure
 */
declare function TaskCardWrapper(props: TaskCardWrapperProps): React.ReactElement;

/**
 * Success state content component
 * Displays the cover image when task is completed successfully
 * 
 * @param props - Component props with task data
 * @returns React element with cover image
 */
declare function SuccessContent(props: TaskCardProps): React.ReactElement;

/**
 * Dispatched state content component
 * Shows progress bar when task is being processed
 * 
 * @param props - Component props with task data
 * @returns React element with progress indicator
 */
declare function DispatchedContent(props: TaskCardProps): React.ReactElement;

/**
 * Pending state content component
 * Shows pending status message when task is waiting
 * 
 * @param props - Component props with task data
 * @returns React element with pending message
 */
declare function PendingContent(props: TaskCardProps): React.ReactElement;

/**
 * Failed state content component
 * Shows error message when task has failed
 * 
 * @param props - Component props with task data
 * @returns React element with failure message
 */
declare function FailedContent(props: TaskCardProps): React.ReactElement;

/**
 * Global ResourceManager for internationalized strings
 */
declare global {
  const ResourceManager: {
    /**
     * Get localized string by key
     * @param key - Resource string key
     * @returns Localized string value
     */
    getString(key: string): string;
  };
}