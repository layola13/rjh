import { DragDrawTool } from './DragDrawTool';
import { Area } from './Area';

/**
 * Polygon identifier interface
 */
interface PolyId {
  equalTo(other: PolyId): boolean;
}

/**
 * Polygon geometry interface
 */
interface Polygon {
  /**
   * Calculate intersection points with another polygon
   */
  intersect(other: Polygon): unknown[];
  
  /**
   * Check if this polygon contains another polygon
   */
  contains(other: Polygon): boolean;
}

/**
 * Available polygon area definition
 */
interface AvailablePoly {
  polyId: PolyId;
  polygon: Polygon;
}

/**
 * Fixed area with used polygons
 */
interface FixedArea {
  usedPoly: PolyId[];
  avaiablePoly: AvailablePoly[];
}

/**
 * Filler manager for handling fill operations
 */
interface FillerManager {
  // Filler manager methods would be defined here
}

/**
 * Multi-layer manager containing filler functionality
 */
interface MulManager {
  fillerManager: FillerManager;
}

/**
 * Sash component with available polygons
 */
interface Sash extends FixedArea {
  mulManager: MulManager;
}

/**
 * Sash manager handling all sash instances
 */
interface SashManager {
  allSashes: Sash[];
}

/**
 * Shape element with polygons and sash manager
 */
interface Shape extends FixedArea {
  mulManager: MulManager;
  sashManager: SashManager;
}

/**
 * Shape manager containing all shapes
 */
interface ShapeManager {
  shapem: Shape[];
}

/**
 * Tool manager for managing active tools
 */
interface ToolManager {
  /**
   * Release the currently active tool
   */
  releaseTool(): void;
}

/**
 * View context containing managers
 */
interface View {
  shapeManager: ShapeManager;
  toolManager: ToolManager;
}

/**
 * Draggable element with polygon
 */
interface DraggableElement {
  polygon: Polygon;
}

/**
 * FillersTool - Tool for filling areas with patterns or materials
 * Extends DragDrawTool to provide drag-and-drop filling functionality
 */
export declare class FillersTool extends DragDrawTool {
  protected view: View;

  /**
   * Check if a fixed area is invalid (already used)
   * @param poly - The polygon area to check
   * @param fixedArea - The fixed area containing used polygons
   * @returns True if the area is invalid/already used
   */
  protected invalidFixedArea(poly: AvailablePoly, fixedArea: FixedArea): boolean;

  /**
   * Change the filler type for a specific polygon area
   * @param fillerManager - The filler manager to update
   * @param poly - The polygon area to modify
   */
  protected changeFillerType(fillerManager: FillerManager, poly: AvailablePoly): void;

  /**
   * Complete the drag operation and apply filler to intersecting areas
   * @param draggedElement - The dragged element containing the target polygon
   */
  protected finishDrag(draggedElement: DraggableElement): void;
}