/**
 * CSS Transition Group Child Component
 * Handles CSS transition animations for enter, leave, and appear lifecycle events
 */

import { Component, ReactElement, CSSProperties, ReactNode } from 'react';

/**
 * Name configuration for transition classes
 * Can be a string or an object with specific transition phase names
 */
export type TransitionName = 
  | string
  | {
      appear?: string;
      appearActive?: string;
      enter?: string;
      enterActive?: string;
      leave?: string;
      leaveActive?: string;
    };

/**
 * Shape for name validation (PropTypes equivalent)
 */
export interface NameShape {
  appear?: string;
  appearActive?: string;
  enter?: string;
  enterActive?: string;
  leave?: string;
  leaveActive?: string;
}

/**
 * Props for CSSTransitionGroupChild component
 */
export interface CSSTransitionGroupChildProps {
  /** Transition name or name object for different transition phases */
  name: TransitionName;
  
  /** Enable appear transition on initial mount */
  appear?: boolean;
  
  /** Enable enter transition when component enters */
  enter?: boolean;
  
  /** Enable leave transition when component leaves */
  leave?: boolean;
  
  /** Timeout duration for appear transition (in milliseconds) */
  appearTimeout?: number;
  
  /** Timeout duration for enter transition (in milliseconds) */
  enterTimeout?: number;
  
  /** Timeout duration for leave transition (in milliseconds) */
  leaveTimeout?: number;
  
  /** Single React child element to apply transitions to */
  children: ReactElement;
}

/**
 * Internal queue item for managing class name applications
 */
interface ClassNameAndNodeQueueItem {
  /** CSS class name to apply */
  className: string;
  
  /** DOM node to apply the class to */
  node: Element;
}

/**
 * Transition lifecycle type
 */
type TransitionType = 'appear' | 'enter' | 'leave';

/**
 * Callback function type for transition completion
 */
type TransitionCallback = () => void;

/**
 * CSSTransitionGroupChild component
 * Manages CSS transitions for a single child element during lifecycle events
 */
export default class CSSTransitionGroupChild extends Component<CSSTransitionGroupChildProps> {
  static displayName: string;
  static propTypes: Record<string, unknown>;
  
  /** Queue for managing className applications with RAF */
  private classNameAndNodeQueue: ClassNameAndNodeQueueItem[];
  
  /** Array of active transition timeout IDs */
  private transitionTimeouts: number[];
  
  /** General purpose timeout ID */
  private timeout?: number;
  
  /** RequestAnimationFrame handle */
  private rafHandle?: number;
  
  /** Flag indicating component has been unmounted */
  private unmounted: boolean;
  
  /**
   * Lifecycle hook called when component appears (initial mount with appear enabled)
   * @param done - Callback to signal completion
   */
  componentWillAppear(done: TransitionCallback): void;
  
  /**
   * Lifecycle hook called when component enters the DOM
   * @param done - Callback to signal completion
   */
  componentWillEnter(done: TransitionCallback): void;
  
  /**
   * Lifecycle hook called when component leaves the DOM
   * @param done - Callback to signal completion
   */
  componentWillLeave(done: TransitionCallback): void;
  
  /**
   * Execute a transition animation
   * @param transitionType - Type of transition (appear, enter, or leave)
   * @param callback - Callback to invoke when transition completes
   * @param timeout - Optional timeout duration in milliseconds
   */
  private transition(
    transitionType: TransitionType,
    callback: TransitionCallback,
    timeout?: number
  ): void;
  
  /**
   * Queue a class name to be applied to a node on next animation frame
   * @param className - CSS class name to apply
   * @param node - DOM element to receive the class
   */
  private queueClassAndNode(className: string, node: Element): void;
  
  /**
   * Flush all queued class names and apply them to their respective nodes
   */
  private flushClassNameAndNodeQueue(): void;
}

/**
 * Browser-specific transition and animation end event names
 */
export const transitionEndEvents: string[];

/**
 * Attach transition end event listeners to an element
 * @param element - DOM element to attach listeners to
 * @param handler - Event handler callback
 * @returns Cleanup function to remove listeners
 */
export function addEndEventListener(
  element: Element,
  handler: EventListener
): () => void;