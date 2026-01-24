/**
 * Utility functions for managing layers in the HSCore scene hierarchy.
 * Provides methods for layer traversal, height calculations, and layer-related operations.
 */

import { Scene } from './Scene';
import { CustomizedPMInstanceModel } from './CustomizedPMInstanceModel';
import { Logger } from './Logger';

/**
 * Represents any entity that can exist within a layer
 */
type LayerEntity = 
  | HSCore.Model.Layer 
  | HSCore.Model.Ceiling 
  | HSCore.Model.Slab 
  | HSCore.Model.Wall
  | CustomizedPMInstanceModel
  | { getFirstParent?(): LayerEntity | undefined };

/**
 * Represents a polygon structure used for spatial calculations
 */
interface Polygon {
  // Add specific polygon properties based on HSCore.Util.Math implementation
}

/**
 * Represents an edge in a layer profile
 */
interface ProfileEdge {
  id: string | number;
  // Add other edge properties as needed
}

/**
 * Represents a face of a slab (floor or ceiling surface)
 */
interface SlabFace {
  /**
   * Gets the outer boundary polygon of this face
   */
  getOuterLoopPolygon(): Polygon | null;
  
  /**
   * Marks this face's geometry as needing recalculation
   */
  dirtyGeometry(): void;
}

/**
 * Layer utility class providing operations for layer management,
 * height calculations, and spatial relationships in the scene hierarchy.
 */
export class LayerUtil {
  /**
   * Checks if the given layer is the active layer of its parent scene
   * @param layer - The layer to check
   * @returns True if this is the active layer
   */
  static isActiveLayer(layer: HSCore.Model.Layer): boolean {
    const parent = layer.getUniqueParent();
    return !!parent && parent.activeLayer === layer;
  }

  /**
   * Gets the currently active layer from the active document
   * @returns The active layer
   */
  static getActiveLayer(): HSCore.Model.Layer {
    return HSCore.Doc.getDocManager().activeDocument.scene.activeLayer;
  }

  /**
   * Gets the outdoor layer from the active document's scene
   * @returns The outdoor layer
   */
  static getOutdoorLayer(): HSCore.Model.Layer {
    return HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer;
  }

  /**
   * Checks if the given layer is the topmost layer in its parent
   * @param layer - The layer to check
   * @returns True if this is the top layer
   */
  static isTopLayer(layer: HSCore.Model.Layer): boolean {
    const parent = layer.getUniqueParent();
    assert(
      parent,
      `isTopLayer: failed to get parent of Layer ${layer.id}.`,
      'HSCore.Util'
    );
    return !!parent && layer === parent.lastLayer;
  }

  /**
   * Gets the layer directly below the given layer in the vertical hierarchy
   * @param layer - The reference layer
   * @returns The layer below, or undefined if none exists
   */
  static getUnderLayer(layer?: HSCore.Model.Layer): HSCore.Model.Layer | undefined {
    if (!layer) return undefined;
    
    const parent = layer.getUniqueParent();
    if (parent instanceof Scene && parent.ceilingLayer === layer) {
      return parent.lastLayer;
    }
    return layer.prev;
  }

  /**
   * Gets the next layer above the given layer in the vertical hierarchy
   * @param layer - The reference layer
   * @returns The next layer, ceiling layer if at top, or undefined
   */
  static getNextLayer(layer: HSCore.Model.Layer): HSCore.Model.Layer | undefined {
    if (layer.next) {
      return layer.next;
    }
    if (LayerUtil.isTopLayer(layer)) {
      return layer.getUniqueParent().ceilingLayer;
    }
    return undefined;
  }

  /**
   * Gets the layer that contains the given entity
   * @param entity - The entity to find the layer for
   * @returns The containing layer, or undefined if not found
   */
  static getEntityLayer(entity?: LayerEntity): HSCore.Model.Layer | undefined {
    if (!entity) return undefined;

    // Handle ceiling entities
    if (entity instanceof HSCore.Model.Ceiling) {
      const master = entity.getMaster();
      if (!(master instanceof HSCore.Model.Slab)) return undefined;
      
      assert(
        master.getUnderLayer,
        `unexpected parent ${master.tag}.`,
        'HSCore.Util'
      );
      return master.getUnderLayer?.();
    }

    // Direct layer reference
    if (entity instanceof HSCore.Model.Layer) {
      return entity;
    }

    // Slab entities
    if (entity instanceof HSCore.Model.Slab) {
      return entity.getBaseLayer();
    }

    // Traverse parent hierarchy
    const parent = entity.getFirstParent?.call(entity);
    return parent ? this.getEntityLayer(parent) : undefined;
  }

  /**
   * Gets the height of the layer containing the given entity
   * @param entity - The entity to get layer height for
   * @returns The layer height, or global wall height if no layer found
   */
  static getLayerHeight(entity?: LayerEntity): number {
    const globalWallHeight = HSCore.Doc.getDocManager().activeDocument.global_wall_height3d;
    const layer = entity ? this.getEntityLayer(entity) : undefined;
    return layer ? layer.height : globalWallHeight;
  }

  /**
   * Gets the base height (altitude) of the layer containing the given entity
   * @param entity - The entity to get base height for
   * @returns The base height in world coordinates
   */
  static getEntityBaseHeight(entity: LayerEntity): number {
    const layer = this.getEntityLayer(entity);
    return layer ? this.getAltitude(layer) : 0;
  }

  /**
   * Calculates the absolute altitude of a layer in world space
   * @param layer - The layer to calculate altitude for
   * @returns The altitude value
   */
  static getAltitude(layer?: HSCore.Model.Layer): number {
    if (!layer) {
      Logger.console.assert(false, 'undefined layer');
      return 0;
    }

    const parent = layer.getUniqueParent();
    if (parent && parent instanceof HSCore.Model.Scene) {
      return parent.getLayerAltitude(layer);
    }
    return 0;
  }

  /**
   * Gets the 1-based index of a layer within its parent scene
   * @param layer - The layer to get index for
   * @returns The layer index (1 for root layer, increases going up/down)
   */
  static getLayerIndex(layer?: HSCore.Model.Layer): number {
    if (!layer) {
      Logger.console.assert(false, 'undefined layer');
      return 1;
    }

    const parent = layer.getUniqueParent();
    if (parent.rootLayer === layer) {
      return 1;
    }

    const traverse = (ascending: boolean): number => {
      let currentLayer = ascending ? parent.rootLayer.next : parent.rootLayer.prev;
      let index = ascending ? 2 : -1;

      while (currentLayer) {
        if (currentLayer === layer) {
          return index;
        }
        currentLayer = ascending ? currentLayer.next : currentLayer.prev;
        index = ascending ? index + 1 : index - 1;
      }
      return 0;
    };

    return traverse(true) || traverse(false);
  }

  /**
   * Checks if two entities are in the same layer
   * @param entityA - First entity
   * @param entityB - Second entity
   * @returns True if both entities are in the same layer
   */
  static isInSameLayer(entityA: LayerEntity, entityB: LayerEntity): boolean {
    return this.getEntityLayer(entityA) === this.getEntityLayer(entityB);
  }

  /**
   * Collects all unique profile edges from floor slabs in a layer
   * @param layer - The layer to extract edges from
   * @returns Array of profile edges
   */
  static getLayerProfileEdges(layer: HSCore.Model.Layer): ProfileEdge[] {
    const edgeMap: Record<string | number, ProfileEdge> = {};

    layer.forEachFloorSlab((slab: HSCore.Model.Slab) => {
      slab.baseProfile.forEachCoEdge((coEdge: any) => {
        const edge = coEdge.edge;
        edgeMap[edge.id] = edge;
      });
    });

    const edges: ProfileEdge[] = [];
    for (const id in edgeMap) {
      edges.push(edgeMap[id]);
    }
    return edges;
  }

  /**
   * Marks layer information as dirty, triggering recalculation
   * @param layer - The layer to mark as dirty
   */
  static dirtyLayerInfo(layer: HSCore.Model.Layer): void {
    HSCore.Doc.getDocManager().geometryManager.dirtyLayerInfo(layer);
    HSCore.Doc.getDocManager().activeDocument.dirtyLayerInfo(layer);
  }

  /**
   * Marks slab faces in a layer as dirty, optionally filtering by polygons
   * @param layer - The layer containing slabs to dirty
   * @param filterPolygons - Optional array of polygons to filter which faces are dirtied
   */
  static dirtyLayerSlabFaces(layer: HSCore.Model.Layer, filterPolygons?: Polygon[]): void {
    const dirtyFace = (face: SlabFace): void => {
      const polygon = face.getOuterLoopPolygon();
      if (!polygon) return;

      if (filterPolygons) {
        if (filterPolygons.some(filter => HSCore.Util.Math.isPolygonOverlapped(polygon, filter))) {
          face.dirtyGeometry();
        }
      } else {
        face.dirtyGeometry();
      }
    };

    // Dirty floor slab top faces
    layer.forEachFloorSlab((slab: HSCore.Model.Slab) => {
      Object.values(slab.getFaces(HSCore.Model.SlabFaceType.top)).forEach(dirtyFace);
    });

    // Dirty ceiling slab bottom faces
    layer.forEachCeilingSlab((slab: HSCore.Model.Slab) => {
      Object.values(slab.getFaces(HSCore.Model.SlabFaceType.bottom)).forEach(dirtyFace);
    });
  }

  /**
   * Finds the floor layer at a specific height in the scene
   * @param height - The height to query
   * @param scene - The scene to search within
   * @returns The layer at the specified height, or undefined
   */
  static getFloorLayerByHeight(height: number, scene: Scene): HSCore.Model.Layer | undefined {
    let currentLayer: HSCore.Model.Layer | undefined = scene.rootLayer;
    let bottomHeight = scene.getLayerAltitude(currentLayer) - currentLayer.slabThickness;
    let topHeight = 0;
    let direction = 1; // 1 = ascending, -1 = descending

    while (currentLayer) {
      if (direction === 1) {
        topHeight = bottomHeight + currentLayer.slabThickness + currentLayer.height;
      } else {
        bottomHeight = topHeight - currentLayer.slabThickness - currentLayer.height;
      }

      // Check if height is within current layer bounds
      if (height >= bottomHeight && height <= topHeight) {
        return currentLayer;
      }

      // Move to next layer
      if (height > topHeight) {
        direction = 1;
        bottomHeight = topHeight;
        currentLayer = currentLayer.next;
      } else {
        direction = -1;
        topHeight = bottomHeight;
        currentLayer = currentLayer.prev;
      }
    }

    return undefined;
  }

  /**
   * Refreshes mixed paint materials on all faces in a layer
   * @param layer - The layer to refresh paint for
   */
  static refreshFaceMixpaint(layer: HSCore.Model.Layer): void {
    const faces = new Set<SlabFace>();

    layer.forEachSlab((slab: HSCore.Model.Slab) => {
      slab.forEachFace((face: SlabFace) => faces.add(face));
    });

    layer.forEachWall((wall: HSCore.Model.Wall) => {
      wall.forEachFace((face: SlabFace) => faces.add(face));
    });

    faces.forEach(face => {
      HSCore.Paint.PaintsUtil.updateFaceMixpaint(face);
    });
  }

  /**
   * Checks if an entity is contained within a specific layer
   * @param entity - The entity to check
   * @param layer - The layer to check against
   * @returns True if the entity is in the layer
   */
  static isEntityInLayer(entity?: LayerEntity, layer?: HSCore.Model.Layer): boolean {
    if (!entity || !layer) return false;

    if (entity instanceof CustomizedPMInstanceModel) {
      return entity.isInstanceInLayer(layer);
    }
    return this.getEntityLayer(entity) === layer;
  }

  /**
   * Extends cross-layer openings from a source layer to a target layer
   * @param sourceLayer - The layer containing original openings
   * @param targetLayer - The layer to extend openings into
   */
  static extendsCrossLayerOpenings(sourceLayer?: HSCore.Model.Layer, targetLayer?: HSCore.Model.Layer): void {
    if (!sourceLayer || !targetLayer) return;

    const crossLayerOpenings = sourceLayer.holeBuilder.holes
      .filter(hole => HSCore.Util.Opening.isOpeningPartialInLayer(hole.source, targetLayer))
      .map(hole => hole.source);

    if (crossLayerOpenings.length > 0) {
      targetLayer.holeBuilder.buildHole([], undefined, crossLayerOpenings);
    }
  }
}