/**
 * Module: RenderingCard
 * A React component for displaying a rendering progress card in a grid viewer.
 * Shows thumbnail, progress percentage, remaining time, and tooltip information.
 */

import React from 'react';
import { Progress } from 'antd';

/**
 * Item data structure representing a rendering task
 */
export interface RenderingItem {
  /** Display name of the image being rendered */
  imageName: string;
  /** Resolution ratio key for resource string lookup */
  resolutionRatio: string;
  [key: string]: unknown;
}

/**
 * Tooltip item configuration
 */
export interface TooltipItem {
  /** Label text for the tooltip item */
  label?: string;
  /** Value or content for the tooltip item */
  value?: string | number;
  [key: string]: unknown;
}

/**
 * Props for the RenderingCard component
 */
export interface RenderingCardProps {
  /** The rendering item data */
  item: RenderingItem;
  /** Thumbnail image source URL */
  src: string;
  /** Current rendering progress percentage (0-100) */
  processSchedule: number;
  /** Remaining duration in seconds */
  processRemainingDuration: number;
  /** Array of tooltip items to display on hover */
  tooltipItems?: TooltipItem[];
}

/**
 * RenderingCard Component
 * 
 * Displays a card showing the rendering progress of an image/video with:
 * - Thumbnail preview with resolution badge
 * - Progress percentage and remaining time
 * - Progress bar visualization
 * - File name
 * - Hover tooltip with additional information
 * 
 * @param props - Component props
 * @returns React element representing the rendering card
 */
export declare function RenderingCard(props: RenderingCardProps): React.ReactElement;

/**
 * Global ResourceManager interface for i18n string lookups
 */
declare global {
  const ResourceManager: {
    getString(key: string): string;
  };
}