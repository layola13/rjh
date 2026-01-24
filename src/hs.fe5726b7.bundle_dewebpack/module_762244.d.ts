/**
 * Toggle button component configuration options
 */
export interface ToggleButtonOptions {
  /** Initial toggle state (true for ON, false for OFF) */
  value?: boolean;
  /** Label text displayed before the toggle button */
  label?: string;
  /** Custom text for the ON state button */
  onLabel?: string;
  /** Custom text for the OFF state button */
  offLabel?: string;
  /** Callback function triggered when toggle state changes */
  onValueChange?: (isActive: boolean) => void;
}

/**
 * Toggle button component state
 */
interface ToggleButtonState {
  /** Current active state of the toggle */
  isOnActive: boolean;
  /** Whether the component is hidden */
  hidden?: boolean;
}

/**
 * Props interface for internal React component
 */
interface ToggleButtonProps extends ToggleButtonOptions {
  value: boolean;
  label: string;
}

/**
 * Internal React component for rendering toggle button UI
 * @internal
 */
declare class ToggleButtonComponent extends React.Component<ToggleButtonProps, ToggleButtonState> {
  static defaultProps: {
    value: boolean;
    label: string;
    onValueChange: undefined;
  };

  constructor(props: ToggleButtonProps);

  /**
   * Updates the component with new configuration
   * @param options - New configuration options
   */
  update(options: ToggleButtonOptions): void;

  /**
   * Renders the toggle button UI
   */
  render(): React.ReactElement;

  /**
   * Internal click handler for toggle items
   * @param event - Mouse click event
   * @internal
   */
  private _onItemClick(event: React.MouseEvent<HTMLLIElement>): boolean;

  /** Callback invoked when value changes */
  private onValueChange: ((isActive: boolean) => void) | undefined;
  
  /** Default localized label for ON state */
  private _defaultOnLabel: string;
  
  /** Default localized label for OFF state */
  private _defaultOffLabel: string;
}

/**
 * Toggle button controller class
 * Manages a toggle button component with ON/OFF states
 */
export default class ToggleButton {
  /**
   * Creates a new toggle button instance
   * @param options - Configuration options for the toggle button
   * @param container - Parent DOM element to mount the component
   */
  constructor(options: ToggleButtonOptions, container: HTMLElement);

  /**
   * Factory method to create a toggle button instance
   * @param options - Configuration options for the toggle button
   * @param container - Parent DOM element to mount the component
   * @returns New ToggleButton instance
   */
  static create(options: ToggleButtonOptions, container: HTMLElement): ToggleButton;

  /**
   * Updates the toggle button with new configuration
   * @param options - New configuration options
   */
  update(options: ToggleButtonOptions): void;

  /**
   * Destroys the toggle button and unmounts the React component
   */
  destroy(): void;

  /**
   * @deprecated Use destroy() instead
   * Typo version of destroy method
   */
  destory(): void;

  /** Container div element for the React component */
  private newDiv: HTMLDivElement;
  
  /** Reference to the mounted React component instance */
  private instance: ToggleButtonComponent;
}