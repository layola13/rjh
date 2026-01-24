import type { HSApp } from './vendor/HSApp';
import type { HSCore } from './vendor/HSCore';
import type { HSCatalog } from './vendor/HSCatalog';

/**
 * Gizmo types available for creation by name
 */
export enum GizmoType {
  LinearDimension = 'LinearDimension',
  CurveDimension = 'CurveDimension'
}

/**
 * Selection data containing entity information
 */
export interface SelectionData {
  entity?: HSCore.Model.Entity;
}

/**
 * 2D View context interface
 */
export interface View2DContext {
  context: CanvasRenderingContext2D;
  displayLayers: {
    temp: DisplayLayer;
    [key: string]: DisplayLayer;
  };
}

/**
 * Display layer for rendering gizmos
 */
export interface DisplayLayer {
  // Add specific display layer properties as needed
}

/**
 * Base gizmo interface
 */
export interface IGizmo {
  render(): void;
  update(): void;
  destroy(): void;
}

/**
 * Command data for gizmo creation
 */
export interface CommandData {
  type: string;
  [key: string]: unknown;
}

/**
 * Extended Gizmo Factory for creating selection, command, and entity gizmos in 2D view.
 * Handles various model types including openings, windows, doors, furniture, lights, etc.
 */
export default class ExtendedGizmoFactory extends HSApp.View.Base.GizmoFactory {
  /**
   * Creates selection gizmos based on selected entities.
   * 
   * @param selection - Array of selected items containing entity references
   * @returns Array of created gizmo instances
   */
  createSelectionGizmo(selection: SelectionData[]): IGizmo[];

  /**
   * Creates dimension gizmos for light entities in manual lighting environment.
   * 
   * @param context - Canvas rendering context
   * @param layer - Display layer for rendering
   * @param light - Light model entity
   * @returns Array of light dimension gizmos
   */
  private _createLightDimension(
    context: CanvasRenderingContext2D,
    layer: DisplayLayer,
    light: HSCore.Model.Light
  ): IGizmo[];

  /**
   * Creates command-specific gizmos (e.g., export image, resize content, arc array).
   * 
   * @param command - Command data containing type and parameters
   * @returns Array of command gizmos
   */
  createCommandGizmo(command: CommandData | null): IGizmo[];

  /**
   * Creates entity-specific gizmos.
   * Currently not implemented - returns empty array.
   * 
   * @param entity - Entity to create gizmo for
   * @returns Empty array
   */
  createEntityGizmo(entity: HSCore.Model.Entity): IGizmo[];

  /**
   * Creates a gizmo by name with optional parameters.
   * 
   * @param name - Name of the gizmo type to create (e.g., 'LinearDimension', 'CurveDimension')
   * @param context - Optional canvas rendering context (defaults to active 2D view context)
   * @param layer - Optional display layer (defaults to active 2D view temp layer)
   * @param param1 - First parameter for gizmo constructor
   * @param param2 - Second parameter for gizmo constructor
   * @returns Created gizmo instance or undefined if type not found
   */
  createGizmoByName(
    name: string,
    context?: CanvasRenderingContext2D,
    layer?: DisplayLayer,
    param1?: unknown,
    param2?: unknown
  ): IGizmo | undefined;
}