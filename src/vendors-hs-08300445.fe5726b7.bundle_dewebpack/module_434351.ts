/**
 * Dropdown alignment configuration for different placement positions
 */
interface AlignConfig {
  /** Alignment points: [source point, target point] */
  points: [string, string];
  /** Offset values: [x, y] */
  offset: [number, number];
  /** Overflow adjustment settings */
  overflow: {
    /** Whether to adjust X axis on overflow (0 = no, 1 = yes) */
    adjustX: 0 | 1;
    /** Whether to adjust Y axis on overflow (0 = no, 1 = yes) */
    adjustY: 0 | 1;
  };
}

/**
 * Built-in placement configurations for dropdown positioning
 */
interface BuiltinPlacements {
  /** Bottom-right placement */
  bottomRight: AlignConfig;
  /** Bottom-left placement */
  bottomLeft: AlignConfig;
  /** Top-right placement */
  topRight: AlignConfig;
  /** Top-left placement */
  topLeft: AlignConfig;
}

/**
 * Dropdown option item structure
 */
interface DropdownOption {
  /** Option label */
  label: string;
  /** Option value */
  value: string | number;
  /** Whether option is disabled */
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Props for the Dropdown component
 */
interface DropdownProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** Dropdown menu options */
  options: DropdownOption[];
  /** Visibility state of dropdown */
  visible: boolean;
  /** Dropdown placement position */
  placement?: 'top' | 'bottom';
  /** Text direction for RTL support */
  direction?: 'ltr' | 'rtl';
  /** CSS transition name for animations */
  transitionName?: string;
  /** Custom container for dropdown portal */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** Child elements (trigger) */
  children?: React.ReactNode;
}

/**
 * Internal Trigger component props
 */
interface TriggerProps {
  /** CSS class prefix */
  prefixCls: string;
  /** Whether popup is visible */
  popupVisible: boolean;
  /** Popup content element */
  popup: React.ReactElement;
  /** Popup placement position */
  popupPlacement: keyof BuiltinPlacements;
  /** CSS transition name */
  popupTransitionName?: string;
  /** Built-in placement configurations */
  builtinPlacements: BuiltinPlacements;
  /** Custom popup container getter */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** Trigger element */
  children: React.ReactNode;
}

/**
 * Dropdown menu options component props
 */
interface DropdownMenuProps {
  /** CSS class prefix */
  prefixCls: string;
  /** Menu options array */
  options: DropdownOption[];
}

/**
 * React Component class type
 */
declare class Component<P = {}, S = {}> {
  props: Readonly<P>;
  state: Readonly<S>;
  constructor(props: P);
  render(): React.ReactNode;
}

/**
 * React createElement function type
 */
declare const createElement: <P>(
  type: React.ComponentType<P> | string,
  props?: P | null,
  ...children: React.ReactNode[]
) => React.ReactElement<P>;

/**
 * Main Dropdown component class
 * Provides a dropdown menu with configurable placement and animations
 */
declare class Dropdown extends Component<DropdownProps> {
  /**
   * Get the CSS class prefix for dropdown elements
   * @returns The prefixed class name for dropdown
   */
  getDropdownPrefix(): string;

  /**
   * Generate the dropdown menu element
   * @returns React element containing the dropdown options
   */
  getDropdownElement(): React.ReactElement<DropdownMenuProps>;

  /**
   * Calculate the dropdown placement based on direction and placement prop
   * @returns The resolved placement key
   */
  getDropDownPlacement(): keyof BuiltinPlacements;

  /**
   * Render the dropdown component
   * @returns React element tree
   */
  render(): React.ReactElement<TriggerProps>;
}

export default Dropdown;