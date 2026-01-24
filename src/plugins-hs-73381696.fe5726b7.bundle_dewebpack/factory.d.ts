import type { Context } from './Context';
import type { DisplayLayer } from './DisplayLayer';
import type { Entity, Edge, Vertex, CoEdge } from './HSCore/Model';
import type { Layer, Floor } from './HSCore/Model';
import type { Selection } from './Selection';
import type { GizmoFactory } from './HSApp/View/Base/GizmoFactory';

/**
 * Gizmo interface representing interactive visual controls
 */
export interface Gizmo {
  /** Renders the gizmo on the canvas */
  render(): void;
  /** Updates gizmo state */
  update(): void;
  /** Destroys the gizmo and cleans up resources */
  destroy(): void;
}

/**
 * Selection item containing an entity reference
 */
export interface SelectionItem {
  /** The selected entity */
  entity: Entity;
}

/**
 * Factory class for creating gizmos (interactive visual controls) based on selections and entities.
 * Extends the base GizmoFactory to provide specialized gizmo creation for architectural elements.
 * 
 * @remarks
 * This factory creates different types of gizmos depending on the selected entity type:
 * - Split edge dimensions for split edges
 * - Profile edge repositioning controls for slab profile edges
 * - Profile point repositioning controls for slab profile vertices
 * - Wall dimensions for layer entities
 * - Floor dimensions for floor entities
 * 
 * Module: Factory
 * Original ID: 129746
 */
export declare class Factory extends GizmoFactory {
  /**
   * Creates a new Factory instance
   * @param options - Configuration options for the factory
   */
  constructor(options: unknown);

  /**
   * Creates gizmos based on the current selection.
   * Analyzes selected entities and generates appropriate interactive controls.
   * 
   * @param selection - Array of selected items containing entity references
   * @returns Array of created gizmo instances for the selection
   * 
   * @remarks
   * Handles special cases:
   * - Single split edge: Creates a SplitEdgeDimension gizmo
   * - Slab profile co-edge: Creates a RepositionProfileEdge gizmo
   * - Slab profile vertex: Creates a RepositionProfilePoint gizmo
   */
  createSelectionGizmo(selection: SelectionItem[]): Gizmo[];

  /**
   * Creates gizmos for a specific entity.
   * Generates dimension and control gizmos based on entity type.
   * 
   * @param entity - The entity for which to create gizmos
   * @returns Array of created gizmo instances for the entity
   * 
   * @remarks
   * Supported entity types:
   * - Layer: Creates WallDimension gizmo
   * - Floor: Creates FloorDimension gizmo
   * - CoEdge (slab profile): Creates ProfileEdgeDimension gizmo
   */
  createEntityGizmo(entity: Entity): Gizmo[];
}

/**
 * Split edge dimension gizmo for displaying and editing split edge measurements
 */
declare class SplitEdgeDimension implements Gizmo {
  constructor(context: Context, displayLayer: DisplayLayer, edge: Edge);
  render(): void;
  update(): void;
  destroy(): void;
}

/**
 * Gizmo for repositioning slab profile edges
 */
declare class RepositionProfileEdge implements Gizmo {
  constructor(context: Context, displayLayer: DisplayLayer, coEdge: CoEdge);
  render(): void;
  update(): void;
  destroy(): void;
}

/**
 * Gizmo for repositioning slab profile vertices
 */
declare class RepositionProfilePoint implements Gizmo {
  constructor(context: Context, displayLayer: DisplayLayer, vertex: Vertex);
  render(): void;
  update(): void;
  destroy(): void;
}

/**
 * Wall dimension gizmo for displaying and editing wall measurements
 */
declare class WallDimension implements Gizmo {
  constructor(context: Context, displayLayer: DisplayLayer, layer: Layer);
  render(): void;
  update(): void;
  destroy(): void;
}

/**
 * Floor dimension gizmo for displaying and editing floor measurements
 */
declare class FloorDimension implements Gizmo {
  constructor(context: Context, displayLayer: DisplayLayer, floor: Floor);
  render(): void;
  update(): void;
  destroy(): void;
}

/**
 * Profile edge dimension gizmo for slab profile edges
 */
declare class ProfileEdgeDimension implements Gizmo {
  constructor(context: Context, displayLayer: DisplayLayer, coEdge: CoEdge);
  render(): void;
  update(): void;
  destroy(): void;
}