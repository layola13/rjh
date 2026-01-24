/**
 * Dialog component props interface
 */
export interface DialogProps {
  /** CSS class prefix for dialog elements */
  prefixCls?: string;
  /** Z-index for dialog stacking context */
  zIndex?: number;
  /** Whether the dialog is visible */
  visible?: boolean;
  /** Enable keyboard interactions (ESC to close) */
  keyboard?: boolean;
  /** Focus the trigger element after dialog closes */
  focusTriggerAfterClose?: boolean;
  /** Scroll locker instance to prevent body scrolling */
  scrollLocker?: ScrollLocker;
  /** Dialog title content */
  title?: React.ReactNode;
  /** Inline styles for the dialog wrapper */
  wrapStyle?: React.CSSProperties;
  /** Additional CSS class for the dialog wrapper */
  wrapClassName?: string;
  /** Additional props for the dialog wrapper element */
  wrapProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Callback fired when dialog requests to close */
  onClose?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** Callback fired after dialog close animation completes */
  afterClose?: () => void;
  /** CSS transition name for dialog animation */
  transitionName?: string;
  /** Animation configuration object */
  animation?: AnimationConfig;
  /** Whether to show close button */
  closable?: boolean;
  /** Whether to show mask overlay */
  mask?: boolean;
  /** CSS transition name for mask animation */
  maskTransitionName?: string;
  /** Animation configuration for mask */
  maskAnimation?: AnimationConfig;
  /** Whether clicking mask closes the dialog */
  maskClosable?: boolean;
  /** Inline styles for the mask overlay */
  maskStyle?: React.CSSProperties;
  /** Additional props for the mask element */
  maskProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Dialog content */
  children?: React.ReactNode;
}

/**
 * Scroll locker interface for managing body scroll state
 */
export interface ScrollLocker {
  /** Lock body scroll */
  lock(): void;
  /** Unlock body scroll */
  unLock(): void;
}

/**
 * Animation configuration object
 */
export interface AnimationConfig {
  /** Animation name */
  name?: string;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation timing function */
  easing?: string;
}

/**
 * RC Dialog component
 * 
 * A flexible dialog/modal component with support for:
 * - Keyboard navigation (ESC to close, TAB focus trap)
 * - Click-outside-to-close with mask
 * - Customizable animations and transitions
 * - Focus management and restoration
 * - Body scroll locking
 * 
 * @param props - Dialog component props
 * @returns React dialog component
 */
export default function Dialog(props: DialogProps): React.ReactElement;