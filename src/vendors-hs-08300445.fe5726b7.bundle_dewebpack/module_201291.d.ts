/**
 * DraggableCore - A low-level draggable component for React
 * Provides core dragging functionality without positioning logic
 */

import React, { Component, ReactElement, RefObject, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

/**
 * Touch event type mapping
 */
interface EventTypeMapping {
  start: string;
  move: string;
  stop: string;
}

/**
 * Position coordinates
 */
interface Position {
  x: number;
  y: number;
}

/**
 * Core drag event data passed to callbacks
 */
interface DraggableData {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
}

/**
 * DraggableCore component props
 */
export interface DraggableCoreProps {
  /**
   * Allow dragging with any mouse button (not just left-click)
   * @default false
   */
  allowAnyClick?: boolean;

  /**
   * Allow mobile devices to scroll while dragging
   * @default false
   */
  allowMobileScroll?: boolean;

  /**
   * Single React child element to make draggable
   */
  children: ReactElement;

  /**
   * Disable dragging functionality
   * @default false
   */
  disabled?: boolean;

  /**
   * Enable hack to prevent text selection during drag
   * @default true
   */
  enableUserSelectHack?: boolean;

  /**
   * Offset parent element for position calculations
   */
  offsetParent?: HTMLElement;

  /**
   * Snap dragging to a grid [x, y]
   */
  grid?: [number, number];

  /**
   * CSS selector for drag handle (only this element can initiate drag)
   */
  handle?: string;

  /**
   * CSS selector for elements that should not trigger drag
   */
  cancel?: string;

  /**
   * React ref to the DOM node (alternative to findDOMNode)
   */
  nodeRef?: RefObject<HTMLElement>;

  /**
   * Callback when drag starts
   * @returns false to cancel drag
   */
  onStart?: (e: MouseEvent | TouchEvent, data: DraggableData) => false | void;

  /**
   * Callback during dragging
   * @returns false to stop drag
   */
  onDrag?: (e: MouseEvent | TouchEvent, data: DraggableData) => false | void;

  /**
   * Callback when drag stops
   * @returns false to prevent cleanup
   */
  onStop?: (e: MouseEvent | TouchEvent, data: DraggableData) => false | void;

  /**
   * Callback for mousedown event (for custom handling)
   */
  onMouseDown?: (e: MouseEvent) => void;

  /**
   * Scale factor for position calculations
   * @default 1
   */
  scale?: number;

  /**
   * @deprecated Use styled components or CSS instead
   */
  className?: never;

  /**
   * @deprecated Use styled components or CSS instead
   */
  style?: never;

  /**
   * @deprecated Use CSS transforms instead
   */
  transform?: never;
}

/**
 * Touch event constants
 */
const TOUCH_EVENTS: EventTypeMapping = {
  start: 'touchstart',
  move: 'touchmove',
  stop: 'touchend'
};

/**
 * Mouse event constants
 */
const MOUSE_EVENTS: EventTypeMapping = {
  start: 'mousedown',
  move: 'mousemove',
  stop: 'mouseup'
};

/**
 * DraggableCore component state
 */
interface DraggableCoreState {
  dragging: boolean;
  lastX: number;
  lastY: number;
  touchIdentifier: number | null;
  mounted: boolean;
}

/**
 * DraggableCore - Low-level component for implementing draggable functionality
 * 
 * This component provides the core dragging logic without any positioning.
 * It's useful for building higher-level draggable components or implementing
 * custom drag behavior.
 * 
 * @example
 *