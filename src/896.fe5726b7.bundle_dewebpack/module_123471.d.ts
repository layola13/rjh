/**
 * User information and VIP membership UI module
 * Provides components and utilities for displaying user VIP status and pricing modals
 */

import React from 'react';

/**
 * User VIP information interface
 * Contains details about a user's VIP membership status
 */
export interface UserVipInfo {
  /** User's VIP level or tier */
  level?: number;
  /** VIP membership expiration date */
  expireDate?: string;
  /** Whether the user has an active VIP subscription */
  isActive?: boolean;
  /** Additional VIP-related metadata */
  [key: string]: unknown;
}

/**
 * Market modal type enumeration
 * Defines different types of pricing/market modals that can be displayed
 */
export enum MarketTypeEnum {
  /** Standard membership upgrade modal */
  Member = 'member',
  /** Premium tier upgrade modal */
  Premium = 'premium',
  /** Enterprise plan modal */
  Enterprise = 'enterprise'
}

/**
 * Position configuration for draggable components
 */
export interface PositionConfig {
  /** Distance from left edge in pixels */
  left?: number;
  /** Distance from right edge in pixels */
  right?: number;
  /** Distance from top edge in pixels */
  top?: number;
  /** Distance from bottom edge in pixels */
  bottom?: number;
  /** Whether the component should be expanded by default */
  isExpand?: boolean;
}

/**
 * Additional options for rendering the market modal
 */
export interface MarketModalOptions {
  /** Custom modal title */
  title?: string;
  /** Initial selected plan */
  selectedPlan?: string;
  /** Callback when modal is closed */
  onClose?: () => void;
  /** Additional custom props */
  [key: string]: unknown;
}

/**
 * Renders a user info item component
 * 
 * @param userVipInfo - User's VIP membership information
 * @param onClick - Callback function triggered when the item is clicked
 * @returns React element representing the user info item
 */
export function getUserInfoItem(
  userVipInfo: UserVipInfo,
  onClick?: (type: MarketTypeEnum, source: string) => void
): React.ReactElement;

/**
 * Renders a floating button displaying user VIP information
 * Creates and mounts a draggable float button to the DOM
 * 
 * @param userVipInfo - User's VIP membership information
 * @param onClick - Callback function when the float button is clicked
 */
export function renderFloatButton(
  userVipInfo: UserVipInfo,
  onClick?: (type: MarketTypeEnum, source: string) => void
): void;

/**
 * Renders the pricing/market modal
 * Displays upgrade options and pricing information to the user
 * 
 * @param type - Type of market modal to display
 * @param sourcePage - Identifier of the page/component triggering the modal
 * @param options - Additional configuration options for the modal
 * @returns The rendered React component or undefined if guide is showing
 */
export function renderMarketModal(
  type: MarketTypeEnum,
  sourcePage: string,
  options?: MarketModalOptions
): React.ReactElement | undefined;

/**
 * Unmounts and removes the market modal from the DOM
 * Cleans up the pricing modal component
 */
export function unmountMarketModal(): void;

/**
 * Internal: Float button component props
 */
interface FloatButtonProps {
  /** User VIP information to display */
  userVipInfo: UserVipInfo;
  /** Whether the button should be in expanded state */
  isExpand?: boolean;
}

/**
 * Internal: Draggable wrapper component props
 */
interface DraggableProps {
  /** CSS class name */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Default position of the draggable element */
  defaultPosition?: PositionConfig;
  /** Callback when position changes */
  onPositionChange?: (position: PositionConfig) => void;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Child elements */
  children?: React.ReactNode;
}