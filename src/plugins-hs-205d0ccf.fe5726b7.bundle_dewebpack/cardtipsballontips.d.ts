/**
 * CardTipsBallonTips Module
 * 
 * This module provides balloon tooltip components for displaying card tips with automatic visibility timing.
 * The tips appear near a target element and automatically dismiss after a timeout.
 * 
 * @module CardTipsBallonTips
 */

import React from 'react';

/**
 * Theme configuration for styling the balloon tips
 */
export interface Theme {
  /** Primary color scheme identifier or custom theme properties */
  [key: string]: unknown;
}

/**
 * Rectangle coordinates for positioning the tooltip relative to a target element
 */
export interface TargetRect {
  /** X-coordinate (left position) of the target element */
  readonly x: number;
  /** Y-coordinate (top position) of the target element */
  readonly y: number;
  /** Width of the target element */
  readonly width: number;
  /** Height of the target element */
  readonly height: number;
  /** Optional top position (alternative to y) */
  readonly top?: number;
  /** Optional left position (alternative to x) */
  readonly left?: number;
  /** Optional right boundary position */
  readonly right?: number;
  /** Optional bottom boundary position */
  readonly bottom?: number;
}

/**
 * Props for the CardTipsBallonTipsContent component
 */
export interface CardTipsBallonTipsContentProps {
  /** Theme configuration for styling */
  readonly theme?: Theme;
}

/**
 * Props for the CardTipsBallonTips component
 */
export interface CardTipsBallonTipsProps {
  /** Target element's bounding rectangle for positioning */
  readonly targetRect: TargetRect;
  /** Theme configuration for styling */
  readonly theme?: Theme;
  /** Callback invoked when the tooltip is closed */
  readonly onClosed?: () => void;
}

/**
 * Options for showing the card tips balloon
 */
export interface ShowCardTipsBallonTipsOptions {
  /** Target element's bounding rectangle for positioning */
  readonly targetRect: TargetRect;
  /** Theme configuration for styling */
  readonly theme?: Theme;
  /** Optional callback invoked when the tooltip is closed */
  readonly onClosed?: () => void;
}

/**
 * Content component for the balloon tip
 * 
 * Renders the inner content of the tooltip, displaying a localized message
 * prompting users to click and check the article.
 * 
 * @param props - Component properties
 * @returns React element containing the tip content
 */
export declare function CardTipsBallonTipsContent(
  props: CardTipsBallonTipsContentProps
): React.ReactElement;

/**
 * Main balloon tip component
 * 
 * Displays a positioned tooltip that automatically dismisses after 2 seconds.
 * Uses the PositionTooltip wrapper for placement and animation.
 * 
 * Features:
 * - Auto-dismiss after 2000ms
 * - Positioned relative to target element
 * - Smooth transition animations (200ms)
 * - Arrow indicator (12px width)
 * 
 * @param props - Component properties including target rect, theme, and callbacks
 * @returns React element containing the positioned balloon tip
 */
export declare function CardTipsBallonTips(
  props: CardTipsBallonTipsProps
): React.ReactElement;

/**
 * Utility function to render and display card tips balloon
 * 
 * Programmatically creates and appends the balloon tip to the document body.
 * Manages the container element lifecycle - creates on first call and reuses
 * for subsequent calls. The tooltip is automatically unmounted when closed.
 * 
 * Usage:
 *