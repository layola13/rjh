/**
 * Command for duplicating content items in the application.
 * This command extends the base Command class and implements undo/redo functionality.
 * 
 * @module DuplicateContentCommand
 */

/**
 * Interface representing a content item that can be cloned and managed.
 */
interface IContentItem {
  /** Unique identifier for the content item */
  ID: string;
  
  /** X-coordinate position */
  x: number;
  
  /** Y-coordinate position */
  y: number;
  
  /** Parent containers of this content item */
  parents: Record<string, IContainer>;
  
  /**
   * Creates a deep copy of this content item
   * @returns A new instance with the same properties
   */
  clone(): IContentItem;
  
  /**
   * Assigns this content item to a host
   * @param host - The host to assign to, or null to unassign
   */
  assignTo(host: IHost | null): void;
  
  /**
   * Gets the host container for this content item
   * @returns The current host
   */
  getHost(): IHost;
}

/**
 * Interface representing a container that can hold content items.
 */
interface IContainer {
  /**
   * Checks if this container has a specific child
   * @param child - The child content item to check
   * @returns True if the child exists in this container
   */
  hasChild(child: IContentItem): boolean;
  
  /**
   * Removes a child from this container
   * @param childId - Unique identifier of the child to remove
   * @param param2 - Additional removal flag
   * @param param3 - Additional removal flag
   */
  removeChild(childId: string, param2: boolean, param3: boolean): void;
  
  /**
   * Adds a child content item to this container
   * @param child - The content item to add
   */
  addChild(child: IContentItem): void;
}

/**
 * Interface representing a host environment for content items.
 */
interface IHost {
  // Host implementation details
}

/**
 * Base command class from HSApp framework.
 * All commands must extend this class to participate in undo/redo operations.
 */
declare class Command {
  constructor();
}

/**
 * Constants used throughout the HSFPConstants namespace.
 */
declare namespace HSFPConstants {
  /**
   * Enumeration of log group types for categorizing operations.
   */
  enum LogGroupTypes {
    /** Operations related to content manipulation */
    ContentOperation = "ContentOperation"
  }
}

/**
 * Command class for duplicating content items.
 * Creates a clone of the source item with a slight offset and adds it to the parent container.
 * Supports full undo/redo functionality.
 * 
 * @extends Command
 */
declare class DuplicateContentCommand extends Command {
  /** The original source content item to duplicate */
  private src: IContentItem;
  
  /** The newly created duplicate content item */
  private dup?: IContentItem;
  
  /** Reference to the saved duplicate for undo/redo operations */
  private saved?: IContentItem;
  
  /** The host environment for the duplicated content */
  private host?: IHost;
  
  /**
   * Creates a new duplicate content command.
   * 
   * @param source - The content item to duplicate
   */
  constructor(source: IContentItem);
  
  /**
   * Executes the duplicate operation.
   * Clones the source item, positions it with a slight offset (0.5, -0.5),
   * and adds it to the parent container.
   */
  onExecute(): void;
  
  /**
   * Cleanup method called when the command is finalized.
   * Currently no cleanup operations are performed.
   */
  onCleanup(): void;
  
  /**
   * Handles receiving data during command execution.
   * 
   * @param param1 - First parameter (unused)
   * @param param2 - Second parameter (unused)
   */
  onReceive(param1: unknown, param2: unknown): void;
  
  /**
   * Undoes the duplicate operation.
   * Removes the duplicated item from its parent container and unassigns it from the host.
   */
  onUndo(): void;
  
  /**
   * Redoes the duplicate operation.
   * Re-adds the duplicated item to its parent container and reassigns it to the host.
   */
  onRedo(): void;
  
  /**
   * Gets a human-readable description of this command.
   * 
   * @returns Localized string "复制物品" (Duplicate Item)
   */
  getDescription(): string;
  
  /**
   * Gets the category for logging/grouping purposes.
   * 
   * @returns The content operation category type
   */
  getCategory(): HSFPConstants.LogGroupTypes.ContentOperation;
}

export default DuplicateContentCommand;