import { Scene } from './Scene';
import { CustomizedPMInstanceModel } from './CustomizedPMInstanceModel';
import { Logger } from './Logger';

interface Layer {
  id: string;
  height: number;
  slabThickness: number;
  next: Layer | null;
  prev: Layer | null;
  holeBuilder: HoleBuilder;
  getUniqueParent(): Scene | null;
  forEachFloorSlab(callback: (slab: Slab) => void): void;
  forEachCeilingSlab(callback: (slab: Slab) => void): void;
  forEachSlab(callback: (slab: Slab) => void): void;
  forEachWall(callback: (wall: Wall) => void): void;
}

interface Scene {
  activeLayer: Layer | null;
  outdoorLayer: Layer | null;
  ceilingLayer: Layer | null;
  lastLayer: Layer | null;
  rootLayer: Layer;
  getLayerAltitude(layer: Layer): number;
}

interface Slab {
  baseProfile: Profile;
  getBaseLayer(): Layer | undefined;
  getUnderLayer?(): Layer | undefined;
  getFaces(faceType: SlabFaceType): Record<string, SlabFace>;
  forEachFace(callback: (face: SlabFace) => void): void;
}

interface Profile {
  forEachCoEdge(callback: (coEdge: CoEdge) => void): void;
}

interface CoEdge {
  edge: Edge;
}

interface Edge {
  id: string;
}

interface SlabFace {
  getOuterLoopPolygon(): Polygon | null;
  dirtyGeometry(): void;
}

interface Polygon {
  // Polygon structure
}

interface Wall {
  forEachFace(callback: (face: Face) => void): void;
}

interface Face {
  // Face structure
}

interface Ceiling {
  getMaster(): Entity | undefined;
}

interface HoleBuilder {
  holes: Hole[];
  buildHole(param1: unknown[], param2: undefined, openings: Opening[]): void;
}

interface Hole {
  source: Opening;
}

interface Opening {
  // Opening structure
}

enum SlabFaceType {
  top = 'top',
  bottom = 'bottom'
}

type Entity = Layer | Slab | Ceiling | CustomizedPMInstanceModel | EntityWithParent;

interface EntityWithParent {
  tag?: string;
  getFirstParent?(): Entity | undefined;
}

interface DocumentManager {
  activeDocument: Document;
  geometryManager: GeometryManager;
}

interface Document {
  scene: Scene;
  global_wall_height3d: number;
  dirtyLayerInfo(layer: Layer): void;
}

interface GeometryManager {
  dirtyLayerInfo(layer: Layer): void;
}

declare const HSCore: {
  Doc: {
    getDocManager(): DocumentManager;
  };
  Model: {
    Scene: typeof Scene;
    Layer: typeof Layer;
    Ceiling: typeof Ceiling;
    Slab: typeof Slab;
    SlabFaceType: typeof SlabFaceType;
  };
  Util: {
    Layer: typeof LayerUtil;
    Math: {
      isPolygonOverlapped(polygon1: Polygon, polygon2: Polygon): boolean;
    };
    Opening: {
      isOpeningPartialInLayer(opening: Opening, layer: Layer): boolean;
    };
  };
  Paint: {
    PaintsUtil: {
      updateFaceMixpaint(face: Face): void;
    };
  };
};

function assert(condition: unknown, message: string, source: string): asserts condition {
  if (!condition) {
    Logger.console.assert(false, message);
  }
}

export const LayerUtil = {
  isActiveLayer(layer: Layer): boolean {
    const parent = layer.getUniqueParent();
    return !!parent && parent.activeLayer === layer;
  },

  getActiveLayer(): Layer | null {
    return HSCore.Doc.getDocManager().activeDocument.scene.activeLayer;
  },

  getOutdoorLayer(): Layer | null {
    return HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer;
  },

  isTopLayer(layer: Layer): boolean {
    const parent = layer.getUniqueParent();
    assert(
      parent,
      `isTopLayer: failed to get parent of Layer ${layer.id}.`,
      'HSCore.Util'
    );
    return !!parent && layer === parent.lastLayer;
  },

  getUnderLayer(layer: Layer | undefined): Layer | null | undefined {
    if (!layer) return;
    const parent = layer.getUniqueParent();
    return parent instanceof HSCore.Model.Scene && parent.ceilingLayer === layer
      ? parent.lastLayer
      : layer.prev;
  },

  getNextLayer(layer: Layer): Layer | null | undefined {
    return layer.next
      ? layer.next
      : HSCore.Util.Layer.isTopLayer(layer)
      ? layer.getUniqueParent()?.ceilingLayer
      : undefined;
  },

  getEntityLayer(entity: Entity | undefined): Layer | undefined {
    if (!entity) return;

    if (entity instanceof HSCore.Model.Ceiling) {
      const master = entity.getMaster();
      if (!(master instanceof HSCore.Model.Slab)) return;
      assert(
        master.getUnderLayer,
        `unexpected parent ${master.tag}.`,
        'HSCore.Util'
      );
      return master.getUnderLayer?.();
    }

    if (entity instanceof HSCore.Model.Layer) return entity;

    if (entity instanceof HSCore.Model.Slab) return entity.getBaseLayer();

    const parent = (entity as EntityWithParent).getFirstParent?.();
    return parent ? this.getEntityLayer(parent) : undefined;
  },

  getLayerHeight(entity?: Entity): number {
    const defaultHeight = HSCore.Doc.getDocManager().activeDocument.global_wall_height3d;
    const layer = entity ? this.getEntityLayer(entity) : undefined;
    return layer ? layer.height : defaultHeight;
  },

  getEntityBaseHeight(entity: Entity): number {
    const layer = this.getEntityLayer(entity);
    return layer ? this.getAltitude(layer) : 0;
  },

  getAltitude(layer: Layer | undefined): number {
    if (!layer) {
      Logger.console.assert(false, 'undefined layer');
      return 0;
    }
    const parent = layer.getUniqueParent();
    return parent && parent instanceof HSCore.Model.Scene
      ? parent.getLayerAltitude(layer)
      : 0;
  },

  getLayerIndex(layer: Layer | undefined): number {
    if (!layer) {
      Logger.console.assert(false, 'undefined layer');
      return 1;
    }

    const parent = layer.getUniqueParent();
    if (!parent) return 1;
    if (parent.rootLayer === layer) return 1;

    const findIndex = (forward: boolean): number => {
      let currentLayer: Layer | null = forward ? parent.rootLayer.next : parent.rootLayer.prev;
      let index = forward ? 2 : -1;

      while (currentLayer) {
        if (currentLayer === layer) return index;
        currentLayer = forward ? currentLayer.next : currentLayer.prev;
        index = forward ? index + 1 : index - 1;
      }
      return 0;
    };

    return findIndex(true) || findIndex(false);
  },

  isInSameLayer(entity1: Entity, entity2: Entity): boolean {
    return this.getEntityLayer(entity1) === this.getEntityLayer(entity2);
  },

  getLayerProfileEdges(layer: Layer): Edge[] {
    const edgeMap: Record<string, Edge> = {};

    layer.forEachFloorSlab((slab: Slab) => {
      slab.baseProfile.forEachCoEdge((coEdge: CoEdge) => {
        const edge = coEdge.edge;
        edgeMap[edge.id] = edge;
      });
    });

    const edges: Edge[] = [];
    for (const edgeId in edgeMap) {
      edges.push(edgeMap[edgeId]);
    }
    return edges;
  },

  dirtyLayerInfo(layer: Layer): void {
    HSCore.Doc.getDocManager().geometryManager.dirtyLayerInfo(layer);
    HSCore.Doc.getDocManager().activeDocument.dirtyLayerInfo(layer);
  },

  dirtyLayerSlabFaces(layer: Layer, polygons?: Polygon[]): void {
    const processFace = (face: SlabFace): void => {
      const outerPolygon = face.getOuterLoopPolygon();
      if (!outerPolygon) return;

      if (polygons) {
        if (polygons.some(polygon => HSCore.Util.Math.isPolygonOverlapped(outerPolygon, polygon))) {
          face.dirtyGeometry();
        }
      } else {
        face.dirtyGeometry();
      }
    };

    layer.forEachFloorSlab((slab: Slab) => {
      Object.values(slab.getFaces(HSCore.Model.SlabFaceType.top)).forEach(processFace);
    });

    layer.forEachCeilingSlab((slab: Slab) => {
      Object.values(slab.getFaces(HSCore.Model.SlabFaceType.bottom)).forEach(processFace);
    });
  },

  getFloorLayerByHeight(height: number, scene: Scene): Layer | null {
    let currentLayer: Layer | null = scene.rootLayer;
    let bottomHeight = scene.getLayerAltitude(currentLayer) - currentLayer.slabThickness;
    let topHeight = 0;
    let direction = 1;

    while (currentLayer) {
      if (direction === 1) {
        topHeight = bottomHeight + currentLayer.slabThickness + currentLayer.height;
      } else {
        bottomHeight = topHeight - currentLayer.slabThickness - currentLayer.height;
      }

      if (height >= bottomHeight && height <= topHeight) {
        break;
      }

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

    return currentLayer;
  },

  refreshFaceMixpaint(layer: Layer): void {
    const faces = new Set<Face>();

    layer.forEachSlab((slab: Slab) =>
      slab.forEachFace((face: Face) => faces.add(face))
    );

    layer.forEachWall((wall: Wall) =>
      wall.forEachFace((face: Face) => faces.add(face))
    );

    faces.forEach((face: Face) => HSCore.Paint.PaintsUtil.updateFaceMixpaint(face));
  },

  isEntityInLayer(entity: Entity | undefined, layer: Layer | undefined): boolean {
    if (!entity || !layer) return false;

    return entity instanceof CustomizedPMInstanceModel
      ? entity.isInstanceInLayer(layer)
      : this.getEntityLayer(entity) === layer;
  },

  extendsCrossLayerOpenings(sourceLayer: Layer | undefined, targetLayer: Layer): void {
    if (!sourceLayer) return;

    const crossLayerOpenings = sourceLayer.holeBuilder.holes
      .filter((hole: Hole) =>
        HSCore.Util.Opening.isOpeningPartialInLayer(hole.source, targetLayer)
      )
      .map((hole: Hole) => hole.source);

    if (crossLayerOpenings.length) {
      targetLayer.holeBuilder.buildHole([], undefined, crossLayerOpenings);
    }
  }
};