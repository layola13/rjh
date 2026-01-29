import { SnapHelper } from './SnapHelper';
import { HSCore } from './HSCore';
import * as MathAlg from './MathAlg';

interface PosEntities {
  walls: any[];
  structures: any[];
  beams: any[];
  holes: any[];
  room: any | undefined;
}

interface ExtractSnapGeomOptions {
  includeRoomCurves: boolean;
}

export class HoleSnapHelper extends SnapHelper {
  private _posEntities: PosEntities = {
    walls: [],
    structures: [],
    beams: [],
    holes: [],
    room: undefined
  };

  private _snapGeometries: any[] = [];

  protected _getSnapObjs(): void {
    this._posEntities = this._filter();
    const outdoorLayer = HSApp.App.getApp().floorplan.scene.outdoorLayer;
    const isOutdoorLayer = this.currentLayer === outdoorLayer;
    this._snapGeometries = this._extractSnapGeom(this._posEntities, {
      includeRoomCurves: isOutdoorLayer
    });
  }

  private _filter(): PosEntities {
    const entities: PosEntities = {
      walls: [],
      structures: [],
      beams: [],
      holes: [],
      room: undefined
    };

    entities.room = HSCore.Util.Room.getRoomContentIn(
      this.currentMaster,
      this.currentLayer
    );

    if (entities.room) {
      this._filter_inroom(entities.room, entities);
    } else {
      this._filter_outroom(this.currentLayer, entities);
    }

    return entities;
  }

  private inOutdoorLayer(point: any): boolean {
    if (!HSCore.Util.Content.isSlabOpening(this.currentMaster)) {
      return false;
    }

    const outdoorLayer = HSApp.App.getApp().floorplan.scene.outdoorLayer;
    const slabLoops = Object.values(outdoorLayer.slabs).map((slab: any) => {
      return new MathAlg.Loop(slab.path.outer);
    });

    const vector = new MathAlg.Vector2(point);

    return slabLoops.some((loop: any) => {
      return MathAlg.MathAlg.PositionJudge.ptToLoop(vector, loop).type === 
        MathAlg.MathAlg.PtLoopPositonType.IN;
    });
  }

  public reClacLayer(): void {
    if (
      this.currentMaster instanceof HSCore.Model.Hole &&
      HSCore.Util.Content.isSlabOpening(this.currentMaster)
    ) {
      const outdoorLayer = HSApp.App.getApp().floorplan.scene.outdoorLayer;
      const isInOutdoor = this.inOutdoorLayer(this.currentMaster);

      if (this.currentLayer !== outdoorLayer || isInOutdoor) {
        if (this.currentLayer !== outdoorLayer && isInOutdoor) {
          this.resetCurrentLayer(outdoorLayer);
        }
      } else {
        const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;
        this.resetCurrentLayer(activeLayer);
      }
    }
  }

  public resetCurrentLayer(layer: any): void {
    this.currentLayer = layer;
    this._posEntities = {
      walls: [],
      structures: [],
      beams: [],
      holes: [],
      room: undefined
    };
    this._snapGeometries = [];
  }

  private _extractSnapGeom(entities: PosEntities, options: ExtractSnapGeomOptions): any[] {
    // Implementation to be provided based on parent class
    return [];
  }

  private _filter_inroom(room: any, entities: PosEntities): void {
    // Implementation to be provided based on business logic
  }

  private _filter_outroom(layer: any, entities: PosEntities): void {
    // Implementation to be provided based on business logic
  }
}