/**
 * Custom Cabinet Component Position Change Command
 * Handles positioning validation and updates for components within a cabinet assembly
 */

import { Command } from 'HSApp.Cmd';

/**
 * Position vector in 3D space
 */
export interface Position {
  x: number;
  y: number;
  z: number;
}

/**
 * Dimension configuration for component positioning
 */
export interface Dimension {
  /** Dimension type: 'top', 'bottom', 'left', 'right', or 'toFloor' */
  type: 'top' | 'bottom' | 'left' | 'right' | 'toFloor';
}

/**
 * Component state configuration
 */
export interface ComponentStates {
  ID_board_thickness: {
    __value: number;
  };
}

/**
 * Top-level passembly (cabinet assembly) interface
 */
export interface TopPassembly {
  /** Total length in X direction */
  XLength: number;
  /** Total length in Z direction */
  ZLength: number;
  /** Component states including board thickness */
  states: ComponentStates;
}

/**
 * Component interface representing a cabinet component
 */
export interface Component {
  /** Unique local identifier */
  localId: string;
}

/**
 * Gizmo manager for handling 3D manipulators
 */
export interface GizmoManager {
  _onSelectionChanged(): void;
}

/**
 * Active view interface
 */
export interface ActiveView {
  gizmoManager: GizmoManager;
}

/**
 * Application interface
 */
export interface App {
  activeView: ActiveView;
  pluginManager: PluginManager;
}

/**
 * Plugin manager interface
 */
export interface PluginManager {
  getPlugin(pluginId: string): unknown;
}

/**
 * Transaction session interface
 */
export interface TransactionSession {
  commit(): void;
}

/**
 * Transaction manager interface
 */
export interface TransactionManager {
  startSession(options: { undoRedo: boolean }): TransactionSession;
  createRequest(requestType: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

/**
 * Command context interface
 */
export interface CommandContext {
  transManager: TransactionManager;
}

/**
 * Command manager interface
 */
export interface CommandManager {
  complete(command: Command): void;
}

/**
 * Component Position Change Command
 * Validates and executes position changes for cabinet components with boundary checks
 */
export default class ComponentPositionChangeCommand extends Command {
  /** The component being positioned */
  private _component: Component;
  
  /** Target position for the component */
  private _position: Position;
  
  /** Dimension configuration */
  private dim: Dimension;
  
  /** Top-level passembly containing this component */
  private _topPassembly: TopPassembly;
  
  /** Gizmo manager reference */
  private gizmoManager: GizmoManager;
  
  /** Flag indicating if this is an added component (vertical/horizontal/lightstrip) */
  private isAddedComponent: boolean;

  /**
   * Creates a new component position change command
   * @param component - The cabinet component to reposition
   * @param position - Target 3D position
   * @param dimension - Dimension constraints and type
   */
  constructor(component: Component, position: Position, dimension: Dimension);

  /**
   * Executes the position change with validation
   * - Validates position against board thickness boundaries
   * - Shows warnings for out-of-bounds positions
   * - Creates and commits transaction request if valid
   */
  onExecute(): void;

  /**
   * Indicates whether this command supports undo/redo
   * @returns Always false - this command does not support undo/redo
   */
  canUndoRedo(): boolean;
}