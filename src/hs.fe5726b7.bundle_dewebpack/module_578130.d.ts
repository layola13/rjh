/**
 * Checkbox component properties
 */
export interface CheckboxData {
  /** Current checkbox status: 'checked' | 'unchecked' */
  status?: 'checked' | 'unchecked';
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Checkbox type variant */
  type?: 'single-line' | string;
  /** Label text displayed next to checkbox */
  text?: string;
  /** Click event handler */
  onclick?: (event: React.MouseEvent<HTMLSpanElement>, data: CheckboxClickData) => void;
}

/**
 * Data passed to click handler
 */
export interface CheckboxClickData {
  /** Whether checkbox is now checked */
  checked: boolean;
}

/**
 * Component props interface
 */
export interface CheckboxProps {
  /** Checkbox configuration data */
  data?: CheckboxData;
}

/**
 * Component state interface
 */
export interface CheckboxState {
  /** Current checkbox status */
  status?: 'checked' | 'unchecked';
  /** Whether the checkbox is disabled */
  disabled?: boolean;
}

/**
 * Checkbox component
 * A controlled checkbox component with customizable appearance and behavior
 */
export default class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  /**
   * Default prop values
   */
  static defaultProps: CheckboxProps;
  
  /**
   * Prop type definitions
   */
  static propTypes: {
    data: PropTypes.Requireable<object>;
  };

  /**
   * Component constructor
   * @param props - Component properties
   */
  constructor(props: CheckboxProps);

  /**
   * Component state
   */
  state: CheckboxState;

  /**
   * Handle checkbox click event
   * @param event - Mouse click event
   * @param data - Checkbox data configuration
   * @param checked - New checked state
   */
  onItemClick(
    event: React.MouseEvent<HTMLSpanElement>,
    data: CheckboxData,
    checked: boolean
  ): void;

  /**
   * Legacy lifecycle method - handle prop updates
   * @param nextProps - Incoming props
   * @deprecated Use componentDidUpdate instead
   */
  UNSAFE_componentWillReceiveProps(nextProps: CheckboxProps): void;

  /**
   * Render the checkbox component
   * @returns React element
   */
  render(): React.ReactElement;
}