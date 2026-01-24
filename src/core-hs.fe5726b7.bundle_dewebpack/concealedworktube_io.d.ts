/**
 * Concealed work tube module for managing conduit routing and node connections
 * @module ConcealedWorkTube_IO
 */

import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';
import { Loader, Vector3 } from './geometry';
import { StrongElecComp } from './components/StrongElecComp';
import { WeakElecComp } from './components/WeakElecComp';
import { CWTubeDiameterEnum } from './enums';

/**
 * Flags for concealed work tube states
 * @enum {number}
 */
export const CWFlagEnum = Object.freeze({
  /** Indicates the tube is in a moving/transitioning state */
  Moving: 256
} as const);

export type CWFlagEnum = typeof CWFlagEnum[keyof typeof CWFlagEnum];

/**
 * Serialization interface for route segment data
 */
interface RouteSegmentData {
  dump(): unknown;
}

/**
 * Route segment with spatial properties
 */
interface RouteSegment extends RouteSegmentData {
  /**
   * Calculate the length of this route segment
   * @returns Length in model units
   */
  getLength(): number;
  
  /**
   * Get the midpoint of this route segment
   * @returns 3D vector representing the center point
   */
  getMidPt(): Vector3;
}

/**
 * Serialized tube data structure
 */
interface SerializedTubeData {
  /** Node identifiers */
  nds?: string[];
  /** Route segments */
  rte?: unknown[];
  [key: string]: unknown;
}

/**
 * Tree container interface for node lookup
 */
interface TubeTree {
  /**
   * Find a node by its identifier
   * @param id - Node identifier
   * @returns Found node or undefined
   */
  findById(id: string): unknown | undefined;
  
  /** Default tube diameter for this tree */
  diameter?: number;
  
  /**
   * Get component by type
   * @param type - Component type identifier
   * @returns Component instance or undefined
   */
  getComponent(type: string): unknown | undefined;
}

/**
 * Node entity in the tube network
 */
interface TubeNode {
  id: string;
  [key: string]: unknown;
}

/**
 * Serializer/deserializer for ConcealedWorkTube entities
 * Handles persistence of tube routing and node connection data
 */
export class ConcealedWorkTube_IO extends Entity_IO {
  private static _instance?: ConcealedWorkTube_IO;

  /**
   * Get singleton instance
   * @returns The shared IO instance
   */
  static instance(): ConcealedWorkTube_IO {
    if (!ConcealedWorkTube_IO._instance) {
      ConcealedWorkTube_IO._instance = new ConcealedWorkTube_IO();
    }
    return ConcealedWorkTube_IO._instance;
  }

  /**
   * Serialize tube entity to plain object
   * @param entity - Tube entity to serialize
   * @param target - Optional target object to merge into
   * @param includeDefaults - Whether to include default values
   * @param options - Additional serialization options
   * @returns Tuple of [serialized data, metadata]
   */
  dump(
    entity: ConcealedWorkTube,
    target?: unknown,
    includeDefaults: boolean = true,
    options: Record<string, unknown> = {}
  ): [SerializedTubeData, unknown] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const data = result[0] as SerializedTubeData;

    // Serialize node IDs if present
    if (entity.nodeIds.length) {
      data.nds = entity.nodeIds.map(id => id);
    }

    // Serialize route segments if present
    if (entity.route.length) {
      data.rte = entity.route.map(segment => segment.dump());
    }

    return result as [SerializedTubeData, unknown];
  }

  /**
   * Deserialize tube entity from plain object
   * @param entity - Target entity to populate
   * @param data - Serialized data
   * @param context - Deserialization context
   */
  load(
    entity: ConcealedWorkTube,
    data: SerializedTubeData,
    context: unknown
  ): void {
    super.load(entity, data, context);

    // Restore route segments
    if (data.rte) {
      Entity_IO.setEntityFields(entity, {
        route: data.rte.map(segmentData => Loader.load(segmentData) as RouteSegment)
      });
    }

    // Restore node IDs
    if (data.nds) {
      Entity_IO.setEntityFields(entity, {
        nodeIds: data.nds
      });
    }
  }
}

/**
 * Represents a concealed conduit/tube routing through a building structure
 * Manages connections between nodes and the physical routing path
 */
export class ConcealedWorkTube extends Entity {
  /**
   * Ordered list of node identifiers this tube connects
   */
  @EntityField()
  nodeIds: string[] = [];

  /**
   * Ordered list of route segments defining the physical path
   */
  @EntityField()
  route: RouteSegment[] = [];

  /**
   * Get the IO handler for this entity type
   * @returns Serialization handler instance
   */
  getIO(): ConcealedWorkTube_IO {
    return ConcealedWorkTube_IO.instance();
  }

  /**
   * Get the parent tree container
   * @returns Parent tree or undefined if not attached
   */
  get tree(): TubeTree | undefined {
    return (this.getUniqueParent() as TubeTree | null) ?? undefined;
  }

  /**
   * Resolve node entities from stored IDs
   * @returns Array of resolved nodes, or empty if any node is missing
   */
  get nodes(): TubeNode[] {
    const parentTree = this.tree;
    const resolvedNodes = this.nodeIds
      .map(id => parentTree?.findById(id) as TubeNode | undefined)
      .filter((node): node is TubeNode => node !== undefined);

    // Only return if all nodes were successfully resolved
    return resolvedNodes.length === this.nodeIds.length ? resolvedNodes : [];
  }

  /**
   * Get the starting node of this tube
   * @returns First node in the connection sequence
   */
  get startNode(): TubeNode | undefined {
    const nodeList = this.nodes;
    return nodeList && nodeList.length > 0 ? nodeList[0] : undefined;
  }

  /**
   * Get the ending node of this tube
   * @returns Last node in the connection sequence
   */
  get endNode(): TubeNode | undefined {
    const nodeList = this.nodes;
    return nodeList && nodeList.length > 0 ? nodeList[nodeList.length - 1] : undefined;
  }

  /**
   * Calculate the tube diameter based on parent tree and component type
   * @returns Tube diameter enum value (defaults to D25, D16 for electrical)
   */
  get diameter(): number {
    let calculatedDiameter = CWTubeDiameterEnum.D25;
    const parentTree = this.tree;

    if (parentTree) {
      const treeDiameter = parentTree.diameter;
      if (treeDiameter !== undefined) {
        calculatedDiameter = treeDiameter;
      } else {
        // Use smaller diameter for electrical components
        const hasElectricalComponent = 
          parentTree.getComponent(StrongElecComp.Type) || 
          parentTree.getComponent(WeakElecComp.Type);
        
        if (hasElectricalComponent) {
          calculatedDiameter = CWTubeDiameterEnum.D16;
        }
      }
    }

    return calculatedDiameter;
  }

  /**
   * Calculate total length of all route segments
   * @returns Total length in model units
   */
  get length(): number {
    return this.route.reduce((total, segment) => total + segment.getLength(), 0);
  }

  /**
   * Calculate the geometric center of the tube routing
   * @returns 3D center point, or origin if no route exists
   */
  getCenter(): Vector3 {
    const primaryRoute = this.getUniqueRoute();
    return primaryRoute ? primaryRoute.getMidPt() : Vector3.O();
  }

  /**
   * Get the primary route segment (first segment if multiple exist)
   * @returns First route segment or undefined
   */
  getUniqueRoute(): RouteSegment | undefined {
    return this.route.length ? this.route[0] : undefined;
  }

  /**
   * Get directional vectors with associated weights (currently unimplemented)
   * @returns Empty array (placeholder for future functionality)
   */
  getDirsWithWeight(): unknown[] {
    return [];
  }
}

// Register the entity class with the model system
Entity.registerClass(HSConstants.ModelClass.ConcealedWorkTube, ConcealedWorkTube);