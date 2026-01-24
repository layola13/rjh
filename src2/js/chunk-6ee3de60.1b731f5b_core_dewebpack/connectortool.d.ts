/**
 * Module: ConnectorTool
 * Original ID: 236
 * Exports: ConnectorTool
 */

import { DragDrawTool } from './DragDrawTool';

/**
 * Point coordinates interface
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Shape manager interface for handling connectors
 */
interface ShapeManager {
  /**
   * Adds a connector at the specified point
   * @param point - The point where the connector should be added
   */
  addConnector(point: Point): void;
}

/**
 * Tool manager interface for managing tool lifecycle
 */
interface ToolManager {
  /**
   * Releases the currently active tool
   */
  releaseTool(): void;
}

/**
 * View interface containing managers for shapes and tools
 */
interface View {
  /** Manager for handling shape operations */
  shapeManager: ShapeManager;
  /** Manager for handling tool operations */
  toolManager: ToolManager;
}

/**
 * ConnectorTool class for creating connector shapes through drag operations
 * Extends DragDrawTool to provide connector-specific drawing functionality
 */
export declare class ConnectorTool extends DragDrawTool {
  /** Reference to the view containing shape and tool managers */
  protected view: View;
  
  /** Current point position during drag operation */
  protected curPt: Point;

  /**
   * Creates a new ConnectorTool instance
   * @param element - The DOM element or context for the tool
   * @param view - The view containing managers for shapes and tools
   */
  constructor(element: unknown, view: View);

  /**
   * Restarts the tool, calling parent restart and releasing the tool
   * Overrides the base class restart method
   */
  restart(): void;

  /**
   * Completes the drag operation and adds a connector at the current point
   * @param event - The event object triggered at drag end
   */
  finishDrag(event: Event): void;
}