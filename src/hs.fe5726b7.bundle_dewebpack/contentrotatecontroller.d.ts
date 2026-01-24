/**
 * Content rotation controller for managing entity rotation changes.
 * Listens to entity field changes and updates rotation values accordingly.
 */
export declare class ContentRotateController extends BaseController {
  /**
   * The entity being controlled
   */
  readonly entity: IRotatableEntity;

  /**
   * Internal signal hook for listening to entity changes
   */
  private _contentSignalHook: SignalHook | undefined;

  /**
   * Creates a new ContentRotateController instance
   * @param entity - The entity to control rotation for
   * @param options - Controller configuration options
   */
  constructor(entity: IRotatableEntity, options: ControllerOptions);

  /**
   * Handles entity field change events.
   * Updates rotation value when ZRotation field changes.
   * @param event - The field change event data
   */
  onEntityFieldChange(event: IFieldChangeEvent): void;

  /**
   * Deactivates the controller and cleans up resources.
   * Disposes the signal hook and removes event listeners.
   */
  deactive(): void;
}

/**
 * Interface for entities that support rotation
 */
interface IRotatableEntity {
  /** Signal emitted when entity fields change */
  signalFieldChanged: Signal<IFieldChangeEvent>;
}

/**
 * Field change event data structure
 */
interface IFieldChangeEvent {
  data?: {
    /** Field name that changed */
    fieldName: string;
    /** Previous value before change */
    oldValue: number;
    /** New value after change */
    newValue: number;
  };
}

/**
 * Controller configuration options
 */
interface ControllerOptions {
  [key: string]: unknown;
}

/**
 * Base controller class
 */
declare class BaseController {
  constructor(options: ControllerOptions);
  
  /**
   * Sets the rotation value
   * @param value - The rotation value to set
   */
  protected setValue(value: number): void;
}

/**
 * Signal hook utility for managing event subscriptions
 */
declare class SignalHook {
  constructor(context: unknown);
  
  /**
   * Listen to a signal
   * @param signal - The signal to listen to
   * @param callback - Callback function to execute
   */
  listen<T>(signal: Signal<T>, callback: (data: T) => void): void;
  
  /**
   * Dispose the signal hook and clean up subscriptions
   */
  dispose(): void;
}

/**
 * Signal type for event emission
 */
declare class Signal<T> {
  emit(data: T): void;
}