import * as React from 'react';

/**
 * Shape of the transition name prop
 * Can be a string or an object with specific transition stage names
 */
export interface TransitionNameShape {
  /** CSS class for appear transition */
  appear?: string;
  /** CSS class for appear-active transition */
  appearActive?: string;
  /** CSS class for enter transition */
  enter?: string;
  /** CSS class for enter-active transition */
  enterActive?: string;
  /** CSS class for leave transition */
  leave?: string;
  /** CSS class for leave-active transition */
  leaveActive?: string;
}

/**
 * Props for CSSTransitionGroup component
 * Provides declarative CSS-based transitions for React children
 */
export interface CSSTransitionGroupProps {
  /**
   * Name or object defining CSS classes for transitions
   */
  transitionName: string | TransitionNameShape;

  /**
   * Enable transition when component first mounts
   * @default false
   */
  transitionAppear?: boolean;

  /**
   * Enable transition when child enters
   * @default true
   */
  transitionEnter?: boolean;

  /**
   * Enable transition when child leaves
   * @default true
   */
  transitionLeave?: boolean;

  /**
   * Duration in milliseconds for appear transition
   */
  transitionAppearTimeout?: number;

  /**
   * Duration in milliseconds for enter transition
   */
  transitionEnterTimeout?: number;

  /**
   * Duration in milliseconds for leave transition
   */
  transitionLeaveTimeout?: number;

  /**
   * Component to render as the container element
   * @default 'span'
   */
  component?: string | React.ComponentType<any>;

  /**
   * Additional props passed to the container component
   */
  [key: string]: any;
}

/**
 * CSSTransitionGroup component
 * 
 * A higher-level API built on top of TransitionGroup for easily implementing
 * basic CSS transitions and animations when React components enter or leave the DOM.
 * 
 * @example
 *