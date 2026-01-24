/**
 * Module: PushableHardwareManager
 * Hardware manager for pushable window/door components with hinge and handle edge tracking.
 */

import { Segment, Arc } from './geometry';
import { EdgeFinder } from './edge-finder';
import { HardwareOnFrame } from './hardware-on-frame';
import { HardwareManager, OpenDirection } from './hardware-manager';

/**
 * Enum representing the direction in which a pushable element opens.
 */
export enum OpenToward {
  /** Opens inward towards the interior */
  Inward = 'inward',
  /** Opens outward towards the exterior */
  Outward = 'outward'
}

/**
 * Interface for serialized pushable hardware data.
 */
interface SerializedPushableHardware {
  openToward: OpenToward;
  [key: string]: unknown;
}

/**
 * Interface representing a polygon edge.
 */
interface PolygonEdge {
  // Placeholder - actual implementation depends on geometry module
}

/**
 * Interface representing a polygon with edges.
 */
interface Polygon {
  edges: (Segment | Arc)[];
  edge(index: number): PolygonEdge | undefined;
}

/**
 * Interface representing a sash component.
 */
interface Sash {
  polygon: Polygon;
}

/**
 * Manages hardware configuration for pushable window/door elements.
 * Handles hinge placement, handle positioning, and opening direction logic.
 * 
 * @extends HardwareManager
 */
export class PushableHardwareManager extends HardwareManager {
  private _openToward: OpenToward = OpenToward.Outward;

  /**
   * Gets the direction (inward/outward) in which the element opens.
   */
  get openToward(): OpenToward {
    return this._openToward;
  }

  /**
   * Sets the direction (inward/outward) in which the element opens.
   */
  set openToward(value: OpenToward) {
    this._openToward = value;
  }

  /**
   * Gets the edge of the polygon where the hinge is located.
   * Returns undefined if hinge edge index is invalid (-1).
   */
  get hingeEdge(): PolygonEdge | undefined {
    if (this.hingeEdgeIndex !== -1) {
      return this.sash.polygon.edge(this.hingeEdgeIndex);
    }
    return undefined;
  }

  /**
   * Gets the edge of the polygon where the handle is located.
   * Returns undefined if handle edge index is invalid (-1).
   */
  get handleEdge(): PolygonEdge | undefined {
    if (this.handleEdgeIndex !== -1) {
      return this.sash.polygon.edge(this.handleEdgeIndex);
    }
    return undefined;
  }

  /**
   * Gets the index of the hinge edge in the polygon.
   * Override in subclasses to provide actual implementation.
   * 
   * @returns The hinge edge index, or -1 if not set.
   */
  get hingeEdgeIndex(): number {
    return -1;
  }

  /**
   * Gets the index of the handle edge in the polygon.
   * Override in subclasses to provide actual implementation.
   * 
   * @returns The handle edge index, or -1 if not set.
   */
  get handleEdgeIndex(): number {
    return -1;
  }

  /**
   * Determines the edge to rotate based on the opening direction.
   * 
   * @returns The edge corresponding to the current open direction.
   */
  protected edgeRotateBasedByOpenDirection(): Segment | Arc {
    const edgeDirection = HardwareOnFrame.directionByOpenDirection(this.openDirection);
    const edgeIndex = EdgeFinder.Instance.findIndex(edgeDirection, this.sash.polygon);
    return this.sash.polygon.edges[edgeIndex];
  }

  /**
   * Calculates the appropriate hinge edge index based on the handle edge index.
   * Finds the opposite edge (halfway around the polygon), preferring segments over arcs.
   * 
   * @param handleIndex - The index of the handle edge.
   * @returns The calculated hinge edge index, or undefined if not applicable.
   */
  protected properHingeIndexByHandle(handleIndex: number): number | undefined {
    if (!this.handleEdge) {
      return undefined;
    }

    const edges = this.sash.polygon.edges;
    const oppositeIndex = Math.floor((handleIndex + edges.length / 2) % edges.length);

    // If opposite edge is not an arc, use it
    if (!(edges[oppositeIndex] instanceof Arc)) {
      return oppositeIndex;
    }

    // Otherwise, find first segment edge that isn't the handle edge
    const segmentEdges = edges.filter((edge): edge is Segment => edge instanceof Segment);
    for (let i = 0; i < segmentEdges.length; i++) {
      if (i !== handleIndex) {
        return i;
      }
    }

    return undefined;
  }

  /**
   * Calculates the appropriate handle edge index based on the hinge edge index.
   * Finds the opposite edge (halfway around the polygon).
   * 
   * @param hingeIndex - The index of the hinge edge.
   * @returns The calculated handle edge index, or undefined if not applicable.
   */
  protected properHandleIndexByHinge(hingeIndex: number): number | undefined {
    if (!this.hingeEdge) {
      return undefined;
    }

    const edges = this.sash.polygon.edges;
    const oppositeIndex = Math.floor((hingeIndex + edges.length / 2) % edges.length);

    return oppositeIndex !== hingeIndex ? oppositeIndex : undefined;
  }

  /**
   * Automatically determines and sets the open direction based on hinge/handle edge positions.
   * Also sets openToward based on whether it's an up or down opening.
   */
  protected matchOpenDirection(): void {
    // Filter to segment edges only
    const segmentEdges = this.sash.polygon.edges.filter(
      (edge): edge is Segment => edge instanceof Segment
    );

    const allDirections = [
      OpenDirection.Left,
      OpenDirection.Right,
      OpenDirection.Up,
      OpenDirection.Down
    ];

    let matchedDirection: OpenDirection | undefined;

    if (this.hingeEdge) {
      // Match direction based on hinge edge
      matchedDirection = allDirections.find(direction => {
        const edgeDirection = HardwareOnFrame.directionByOpenDirection(direction);
        const foundIndex = EdgeFinder.Instance.findIndex(edgeDirection, this.sash.polygon);
        return foundIndex === this.hingeEdgeIndex;
      });
    } else if (this.handleEdge) {
      // Match direction based on handle edge (inverted)
      matchedDirection = allDirections.find(direction => {
        const edgeDirection = HardwareOnFrame.directionByOpenDirection(direction, true);
        const foundIndex = EdgeFinder.Instance.findIndex(edgeDirection, this.sash.polygon);
        return foundIndex === this.handleEdgeIndex;
      });
    }

    this._openDirection = matchedDirection ?? OpenDirection.Custom;

    // Set openToward based on vertical direction
    if (this.isUpOpen) {
      this._openToward = OpenToward.Outward;
    }
    if (this.isDownOpen) {
      this._openToward = OpenToward.Inward;
    }
  }

  /**
   * Serializes the pushable hardware manager to a JSON-compatible object.
   * 
   * @returns Serialized hardware data including openToward property.
   */
  toJSON(): SerializedPushableHardware {
    const baseData = super.toJSON();
    return {
      ...baseData,
      openToward: this._openToward
    };
  }

  /**
   * Deserializes JSON data to restore the pushable hardware manager state.
   * 
   * @param data - The serialized hardware data.
   * @returns This instance for method chaining.
   */
  deserialize(data: SerializedPushableHardware): this {
    super.deserialize(data);
    this._openToward = data.openToward;
    return this;
  }
}