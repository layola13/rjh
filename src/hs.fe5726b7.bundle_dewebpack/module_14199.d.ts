/**
 * HSCore Signal-based value change notification class
 * 
 * A utility class that provides a signal mechanism for tracking value changes.
 * This class is typically used in reactive programming patterns to notify
 * subscribers when a value has changed.
 */
declare class ValueChangeNotifier {
  /**
   * Signal emitted when a single value has changed.
   * 
   * Subscribers can connect to this signal to receive notifications
   * when the monitored value is updated.
   * 
   * @type {HSCore.Util.Signal}
   */
  singalValueChanged: HSCore.Util.Signal<this>;

  /**
   * Constructs a new ValueChangeNotifier instance.
   * Initializes the signal for value change notifications.
   */
  constructor();
}

/**
 * HSCore utility namespace containing the Signal class
 */
declare namespace HSCore {
  namespace Util {
    /**
     * Generic Signal class for event-driven communication
     * 
     * @template T The type of the signal context
     */
    class Signal<T = unknown> {
      constructor(context: T);
    }
  }
}

export default ValueChangeNotifier;