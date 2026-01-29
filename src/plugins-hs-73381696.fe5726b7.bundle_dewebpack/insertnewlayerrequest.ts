import * as HSCore from './HSCore';

interface LayerInsertOptions {
  previousLayer?: HSCore.Model.Layer;
  nextLayer?: HSCore.Model.Layer;
}

interface SlabBuildOptions {
  slabOption: {
    cleanBuildUp: boolean;
    ceilingSlabRegionsForInter?: any[];
  };
}

type LayerType = 'up' | 'bottom';

export class InsertNewLayerRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _type: LayerType;
  private readonly _needCopyWall: boolean;
  private floorplan!: any;
  private scene!: any;
  private activeLayer!: HSCore.Model.Layer;
  private activeLayerIndex!: number;
  private _topBottom!: boolean;

  constructor(type: LayerType, needCopyWall: boolean) {
    super();
    this._type = type;
    this._needCopyWall = needCopyWall;

    this.floorplan = HSApp.App.getApp().floorplan;
    this.scene = this.floorplan.scene;
    this.activeLayer = this.scene.activeLayer;
    this.activeLayerIndex = HSCore.Util.Layer.getLayerIndex(this.activeLayer);

    const lastLayer = this.scene.lastLayer;
    const lowestLayer = this.scene.lowestLayer;

    this._topBottom = 
      (this._type === 'up' && this.activeLayer === lastLayer) ||
      (this._type === 'bottom' && this.activeLayer === lowestLayer);
  }

  canTransactField(): boolean {
    return true;
  }

  onCommit(): HSCore.Model.Layer {
    const newLayer = this._type === 'up' 
      ? this.insertUpLayer() 
      : this.insertDownLayer();

    if (!newLayer) {
      return super.onCommit();
    }

    const newOpeningWallMap = this.copyLayerWall(newLayer);
    const slabOpenings = this.copyLayerSlabOpening();
    this.copySketchSlabHoles(newLayer);
    this.buildLayers(newLayer);

    if (!this._topBottom) {
      this.disconnectGroupedFaces(newLayer);
    }

    this.buildOpenings(newLayer, newOpeningWallMap, slabOpenings);

    super.onCommit();

    return newLayer;
  }

  private insertUpLayer(): HSCore.Model.Layer | undefined {
    const MAX_ABOVE_GROUND_LAYERS = 33;

    if (this.activeLayerIndex >= MAX_ABOVE_GROUND_LAYERS) {
      console.assert(false, '添加上层：地上最多添加33层.');
      return undefined;
    }

    const isTopLayer = HSCore.Util.Layer.isTopLayer(this.activeLayer);
    const newLayer = isTopLayer 
      ? this.scene.ceilingLayer 
      : HSCore.Model.Layer.create();

    if (isTopLayer) {
      this.scene.ceilingLayer = HSCore.Model.Layer.create();
    }

    const previousLayer = this.activeLayer;
    const nextLayer = this.activeLayer.next;

    this.scene.addLayer(newLayer, this.activeLayerIndex <= -1, {
      previousLayer,
      nextLayer
    });

    newLayer.height = this.floorplan.global_wall_height3d;

    newLayer.forEachSlab((slab: any) => {
      slab.forEachFace((face: any) => {
        face.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
      });
    });

    newLayer.setFlagOff(HSCore.Model.EntityFlagEnum.hidden, false);

    return newLayer;
  }

  private insertDownLayer(): HSCore.Model.Layer | undefined {
    const MIN_UNDERGROUND_LAYERS = -3;
    const layerIndex = HSCore.Util.Layer.getLayerIndex(this.activeLayer);

    if (layerIndex <= MIN_UNDERGROUND_LAYERS) {
      console.assert(false, '添加下层：最多三层地下室.');
      return undefined;
    }

    const newLayer = HSCore.Model.Layer.create();
    const nextLayer = this.activeLayer;
    const previousLayer = this.activeLayer.prev;

    this.scene.addLayer(newLayer, layerIndex <= 1, {
      previousLayer,
      nextLayer
    });

    newLayer.height = this.floorplan.global_wall_height3d;

    return newLayer;
  }

  private copyLayerWall(targetLayer: HSCore.Model.Layer): Map<any, any> | undefined {
    if (!this._needCopyWall) {
      return undefined;
    }

    const walls: any[] = [];
    const structures: any[] = [];
    const beams: any[] = [];

    this.activeLayer.forEachWall((wall: any) => {
      walls.push(wall);
    });

    this.activeLayer.forEachStructure((structure: any) => {
      if (structure.isWallPart()) {
        structures.push(structure);
      }
    });

    this.activeLayer.forEachBeam((beam: any) => {
      beams.push(beam);
    });

    let newOpeningWallMap: Map<any, any> | undefined;

    if (walls.length > 0) {
      const { newWalls, newOpeningWallMp } = HSCore.Util.Wall.copyWallsWithOpenings(walls);
      targetLayer.addChild(newWalls);

      newWalls.forEach((wall: any) => {
        if (wall.isFlagOff(HSCore.Model.WallFlagEnum.heightEditable)) {
          wall.height3d = this.floorplan.global_wall_height3d;
        }
      });

      newOpeningWallMap = newOpeningWallMp;
    }

    if (structures.length > 0) {
      for (const structure of structures) {
        const copiedStructure = structure.copy();
        copiedStructure.parent.removeChild(copiedStructure);
        targetLayer.addChild(copiedStructure);

        if (copiedStructure.isWallPart() && copiedStructure.ZScale === 1) {
          copiedStructure.syncLayerHeight();
        }
      }
    }

    if (beams.length > 0) {
      for (const beam of beams) {
        const copiedBeam = beam.copy();
        copiedBeam.parent?.removeChild(copiedBeam);
        targetLayer.addChild(copiedBeam);
      }
    }

    return newOpeningWallMap;
  }

  private copyLayerSlabOpening(): any[] {
    const openings: any[] = [];

    this.activeLayer.forEachFloorSlab((floorSlab: any) => {
      const slabOpenings = Object.values(floorSlab.openings);
      const copiedOpenings: any[] = [];

      slabOpenings.forEach((opening: any) => {
        const copiedOpening = HSCore.Util.Opening.copyOpening(opening);
        if (copiedOpening) {
          copiedOpenings.push(copiedOpening);
        }
      });

      openings.push(...copiedOpenings);
    });

    return openings;
  }

  private copySketchSlabHoles(targetLayer: HSCore.Model.Layer): void {
    targetLayer.slabSketch2dGuildLines = this.activeLayer.slabSketch2dGuildLines.map(
      (guideline: any) => {
        return HSCore.Model.ExtraordinaryGuideline.create(
          guideline.curve.clone(),
          guideline.fromAnchor,
          guideline.endAnchor,
          guideline.type
        );
      }
    );

    targetLayer.slabSketch2dHoles = this.activeLayer.slabSketch2dHoles.map(
      (hole: any) => {
        return {
          loop: hole.loop.clone(),
          id: hole.id
        };
      }
    );
  }

  private buildOpenings(
    layer: HSCore.Model.Layer,
    openingWallMap?: Map<any, any>,
    slabOpenings?: any[]
  ): void {
    if (!openingWallMap?.size && !slabOpenings?.length) {
      return;
    }

    if (openingWallMap && openingWallMap.size > 0) {
      for (const [opening, wall] of openingWallMap) {
        layer.addChild(opening);
        opening.assignTo(wall);
      }
    }

    layer.roomBuilder.build();

    if (slabOpenings && slabOpenings.length > 0) {
      for (const opening of slabOpenings) {
        layer.addChild(opening);
        HSCore.Util.Opening.refreshSlabOpeningHost(opening);
        opening.build();
      }
    }
  }

  private buildLayers(newLayer: HSCore.Model.Layer): void {
    const floorSlabPaths = HSCore.Util.TgSlab.getLayerFloorSlabPaths(
      this.scene.activeLayer
    );

    const layers = [newLayer.prev, newLayer, newLayer.next];

    layers.forEach((layer, index) => {
      if (!layer) {
        return;
      }

      const buildOptions: SlabBuildOptions = {
        slabOption: {
          cleanBuildUp: index === 0,
          ceilingSlabRegionsForInter: index === 0 ? floorSlabPaths : undefined
        }
      };

      if (!this._topBottom && buildOptions.slabOption.cleanBuildUp) {
        HSCore.Util.Layer.cleanLayerCeiling(layer);
      }

      layer.roomBuilder.build(buildOptions);

      if (layer === newLayer) {
        const splitHelper = new HSCore.Model.Geom.SplitHelper(layer);
        const layerFloorSlabPaths = HSCore.Util.TgSlab.getLayerFloorSlabPaths(layer);
        splitHelper.refreshRoomSplitCurvesBySlab(layerFloorSlabPaths);
      }

      HSCore.Util.Layer.refreshFaceMixpaint(layer);

      if (this._type !== 'up' && index === 2) {
        new HSCore.Model.Geom.SplitHelper(layer).reset(true);
      }
    });

    this.scene.activeLayer = newLayer;
    this.floorplan.scene.ceilingLayer.dirtyPosition();

    HSCore.Util.Layer.extendsCrossLayerOpenings(newLayer.prev, newLayer);
    HSCore.Util.Layer.extendsCrossLayerOpenings(newLayer, newLayer.next);
    HSCore.Util.Layer.dirtyLayerInfo(newLayer);
  }

  private disconnectGroupedFaces(newLayer: HSCore.Model.Layer): void {
    const adjacentLayers = [newLayer.prev, newLayer.next];

    adjacentLayers.forEach((layer) => {
      if (!layer) {
        return;
      }

      layer.forEachFace((face: any) => {
        if (!HSCore.Util.FaceGroup.isFaceGroup(face)) {
          return;
        }

        const groupFaces = HSCore.Util.FaceGroup.getGroupFaces(face);

        if (!HSCore.Util.Face.isFacesConnected(groupFaces)) {
          groupFaces.forEach((groupedFace: any) => {
            return HSCore.Util.Paints.disconnectFromFaceGroup(groupedFace);
          });
        }
      });
    });
  }
}