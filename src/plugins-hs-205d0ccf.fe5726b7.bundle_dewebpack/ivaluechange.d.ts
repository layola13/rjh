/**
 * Value change interface component for handling controlled value updates
 * @module IValueChange
 */

/**
 * Controller interface for managing value change events
 */
interface IValueChangeController {
  /** Signal emitted when value changes */
  singalValueChanged: unknown;
  
  /** Called when value change starts */
  onValueChangeStart?(value: unknown): void;
  
  /** Called during value change */
  onValueChanged?(value: unknown): void;
  
  /** Called when value change ends */
  onValueChangeEnd?(value: unknown): void;
}

/**
 * Props data for IValueChange component
 */
interface IValueChangeData {
  /** Optional controller instance */
  controller?: IValueChangeController;
  
  /** Callback when value change starts */
  onValueChangeStart?(value: unknown): void;
  
  /** Callback during value change */
  onValueChange?(value: unknown): void;
  
  /** Callback when value change ends */
  onValueChangeEnd?(value: unknown): void;
}

/**
 * Props interface for IValueChange component
 */
interface IValueChangeProps {
  data: IValueChangeData;
}

/**
 * State interface for IValueChange component
 */
interface IValueChangeState {
  value: unknown;
}

/**
 * Event data structure for value change signals
 */
interface ValueChangedEventData {
  data: {
    value: unknown;
  };
}

/**
 * Signal hook utility for managing event subscriptions
 */
declare class SignalHook {
  constructor(context: unknown);
  
  /**
   * Listen to a signal
   * @param signal - Signal to listen to
   * @param handler - Event handler function
   */
  listen(signal: unknown, handler: (event: ValueChangedEventData) => void): void;
  
  /** Dispose all subscriptions */
  dispose(): void;
}

declare namespace HSCore.Util {
  export { SignalHook };
}

/**
 * Base component class for value change handling
 * Manages bidirectional data flow between UI and controller
 */
export declare class IValueChange extends Component<IValueChangeProps, IValueChangeState> {
  /** Signal hook instance for event management */
  signalHook: SignalHook | undefined;
  
  /** Value change controller instance */
  controller: IValueChangeController | undefined;
  
  /** Deactivation cleanup function */
  deactive: (() => void) | undefined;
  
  /**
   * Constructor
   * @param props - Component props
   */
  constructor(props: IValueChangeProps);
  
  /**
   * Called when component is deactivated
   * Cleans up controller and signal subscriptions
   */
  onDeactive(): void;
  
  /**
   * Handler for value changed events from controller
   * @param event - Value change event data
   */
  onValueChanged(event: ValueChangedEventData): void;
  
  /**
   * Triggers value change start event
   * @param value - New value
   */
  changeStart(value: unknown): void;
  
  /**
   * Triggers value changed event
   * @param value - New value
   */
  changed(value: unknown): void;
  
  /**
   * Triggers value change end event
   * @param value - Final value
   */
  changeEnd(value: unknown): void;
}