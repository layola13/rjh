export default class GizmoUtils {
  static materials: unknown = null;

  /**
   * Creates a gizmo material with the specified material class and options
   * @param MaterialClass - The material constructor to instantiate
   * @param options - Additional material options
   * @returns A new material instance with gizmo render group
   */
  static createGizmoMaterial<T>(
    MaterialClass: new (options: Record<string, unknown>) => T,
    options: Record<string, unknown> = {}
  ): T {
    return new MaterialClass({
      renderGroupId: HSApp.View.T3d.Constants.HS_RPG_GIZMO,
      ...options
    });
  }

  /**
   * Creates a gizmo line material with outline effect
   * @param color - The line color
   * @param width - The line width
   * @param options - Additional material options
   * @returns An outline material configured for gizmo rendering
   */
  static createGizmoLineMaterial(
    color: unknown,
    width: unknown,
    options: Record<string, unknown> = {}
  ): unknown {
    const renderGroupId = HSApp.View.T3d.Constants.HS_RPG_GIZMO;
    return HSApp.View.T3d.Material.OutlineMaterial(color, width, {
      renderGroupId,
      ...options
    });
  }

  /**
   * Converts an array of positions to line segments by duplicating intermediate vertices
   * @param positions - Array of position arrays containing coordinate values
   * @returns Flattened array of position values forming line segments
   */
  static convertPositionsToLineSegments(positions: Array<Record<string, unknown>>): unknown[] {
    const result: unknown[] = [];
    
    if (positions.length > 0) {
      result.push(...Object.values(positions[0]));
      
      for (let i = 1; i < positions.length - 1; i++) {
        result.push(...Object.values(positions[i]));
        result.push(...Object.values(positions[i]));
      }
      
      result.push(...Object.values(positions[positions.length - 1]));
    }
    
    return result;
  }

  /**
   * Creates a box mesh from axis-aligned edge definitions
   * @param edges - Array of edge pairs defining the box dimensions (2 or 3 edges)
   * @returns A streaming line mesh representing the box
   */
  static createBoxMesh(edges: Array<[Vector3, Vector3]>): unknown {
    let linePositions: number[] = [];

    if (edges.length === 2) {
      const corner1 = edges[0][0];
      const corner2 = edges[0][1];
      const offset = edges[1][1].clone().sub(edges[1][0]);
      const corner3 = corner2.clone().sub(corner1).add(offset).add(corner1);
      const corner4 = edges[1][1];

      const corners = [corner1, corner2, corner3, corner4].map((position) => {
        const viewSpace = HSApp.View.T3d.Util.ModelSpaceToViewSpace(position);
        return new Vector3(viewSpace.x, viewSpace.y, viewSpace.z);
      });

      const segments = this.convertPositionsToLineSegments(corners);
      linePositions = segments as number[];
    } else if (edges.length === 3) {
      const heightVector = edges[2][1].clone().sub(edges[2][0]);

      const bottomCorner1 = edges[0][0];
      const bottomCorner2 = edges[0][1];
      const widthDepthOffset = bottomCorner2.clone().sub(bottomCorner1).add(edges[1][1].clone().sub(edges[1][0]));
      const bottomCorner3 = widthDepthOffset.add(bottomCorner1);
      const bottomCorner4 = edges[1][1];

      const topCorner1 = bottomCorner1.clone().add(heightVector);
      const topCorner2 = bottomCorner2.clone().add(heightVector);
      const topCorner3 = bottomCorner3.clone().add(heightVector);
      const topCorner4 = bottomCorner4.clone().add(heightVector);

      const allCorners = [
        bottomCorner1, bottomCorner2, bottomCorner3, bottomCorner4,
        topCorner1, topCorner2, topCorner3, topCorner4
      ].map((position) => {
        const viewSpace = HSApp.View.T3d.Util.ModelSpaceToViewSpace(position);
        return new Vector3(viewSpace.x, viewSpace.y, viewSpace.z);
      });

      const indexedPositions: number[] = [];
      const indices = [0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7];
      
      indices.forEach((index) => {
        indexedPositions.push(allCorners[index].x, allCorners[index].y, allCorners[index].z);
      });

      linePositions = indexedPositions;
    }

    return T3Dx.Three2T3d.convertPositionsToStreamingLineMesh("box", linePositions, []);
  }
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
  clone(): Vector3;
  sub(v: Vector3): Vector3;
  add(v: Vector3): Vector3;
}

declare const Vector3: {
  new (x: number, y: number, z: number): Vector3;
};

declare const HSApp: {
  View: {
    T3d: {
      Constants: {
        HS_RPG_GIZMO: number;
      };
      Material: {
        OutlineMaterial(color: unknown, width: unknown, options: Record<string, unknown>): unknown;
      };
      Util: {
        ModelSpaceToViewSpace(position: Vector3): { x: number; y: number; z: number };
      };
    };
  };
};

declare const T3Dx: {
  Three2T3d: {
    convertPositionsToStreamingLineMesh(name: string, positions: number[], additional: unknown[]): unknown;
  };
};