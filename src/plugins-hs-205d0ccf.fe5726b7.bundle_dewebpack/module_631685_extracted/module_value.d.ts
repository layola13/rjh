/**
 * Signal hook listener registration interface
 * Manages event subscriptions for menu, property bar, command, and document lifecycle events
 */
interface SignalHookRegistration {
  /**
   * Registers listeners for various application signals
   * 
   * @remarks
   * This method chains multiple event listeners:
   * - Menu plugin's custom item population
   * - Property bar population
   * - Command manager lifecycle (start/terminating)
   * - Document closing events
   */
  registerSignalListeners(): void;
}

/**
 * Menu plugin signal for populating customized menu items
 */
interface MenuPluginSignal {
  /** Signal emitted when custom menu items need to be populated */
  signalPopulateCustomizedItems: Signal<unknown>;
}

/**
 * Property bar plugin signal for populating the property bar
 */
interface PropertyBarPluginSignal {
  /** Signal emitted when property bar needs to be populated */
  signalPopulatePropertyBar: Signal<unknown>;
}

/**
 * Command manager signals for command lifecycle events
 */
interface CommandManagerSignals {
  /** Signal emitted when a command starts execution */
  signalCommandStarted: Signal<unknown>;
  
  /** Signal emitted when a command is terminating */
  signalCommandTerminating: Signal<unknown>;
}

/**
 * Application signals for document lifecycle events
 */
interface ApplicationSignals {
  /** Signal emitted when a document is closing */
  signalDocumentClosing: Signal<unknown>;
}

/**
 * Generic signal type for event handling
 * @template T - The payload type of the signal
 */
type Signal<T> = {
  emit(data: T): void;
  subscribe(handler: (data: T) => void): void;
};

/**
 * Signal hook utility for managing event listeners
 */
interface SignalHook {
  /**
   * Registers a listener for a specific signal
   * @template T - The signal payload type
   * @param signal - The signal to listen to
   * @param handler - The callback function to handle the signal
   * @returns The SignalHook instance for method chaining
   */
  listen<T>(signal: Signal<T>, handler: (data: T) => void): this;
}

/**
 * Event handler declarations
 */
declare namespace EventHandlers {
  /** Handles population of customized right-click menu items */
  function onPopulateRightmenuCustomized(data: unknown): void;
  
  /** Handles population of the property bar */
  function onPopulatePropertyBar(data: unknown): void;
  
  /** Handles the beginning of a create room command */
  function createRoomCommandBegin(data: unknown): void;
  
  /** Handles the end of a create room command */
  function createRoomCommandEnd(data: unknown): void;
}

/**
 * Module context containing required dependencies
 */
interface ModuleContext {
  /** Signal hook manager for event listener registration */
  readonly _signalHook: SignalHook;
  
  /** Menu plugin providing menu customization signals */
  readonly _menuPlugin: MenuPluginSignal;
  
  /** Property bar plugin providing property bar signals */
  readonly _propertyBarPlugin: PropertyBarPluginSignal;
  
  /** Command manager providing command lifecycle signals */
  readonly cmdMgr: CommandManagerSignals;
  
  /** Application instance providing document lifecycle signals */
  readonly _app: ApplicationSignals;
  
  /** Handler for right-click menu customization */
  onPopulateRightmenuCustomized: typeof EventHandlers.onPopulateRightmenuCustomized;
  
  /** Handler for property bar population */
  onPopulatePropertyBar: typeof EventHandlers.onPopulatePropertyBar;
  
  /** Handler for create room command start */
  createRoomCommandBegin: typeof EventHandlers.createRoomCommandBegin;
  
  /** Handler for create room command end */
  createRoomCommandEnd: typeof EventHandlers.createRoomCommandEnd;
}

export type { 
  SignalHookRegistration,
  MenuPluginSignal,
  PropertyBarPluginSignal,
  CommandManagerSignals,
  ApplicationSignals,
  Signal,
  SignalHook,
  ModuleContext 
};

export { EventHandlers };