import { HSCore } from './HSCore';

interface Entity {
  ID: string | number;
  _tempFlag: number;
  setFlagOn(flag: number, value: boolean): void;
  setFlagOff(flag: number, value: boolean): void;
}

interface Floorplan {
  scene: {
    activeLayer: Layer;
  };
  forEachRoom(callback: (room: Entity) => void): void;
  forEachCeiling(callback: (ceiling: Entity) => void): void;
  forEachWall(callback: (wall: Entity) => void): void;
  forEachStructureFace(callback: (face: Entity) => void): void;
  forEachMolding(callback: (molding: Entity) => void): void;
  forEachOpening(callback: (opening: Entity) => void): void;
  forEachParametricOpenings(callback: (opening: Entity) => void): void;
  forEachStructure(callback: (structure: Entity) => void): void;
  forEachRoof(callback: (roof: RoofEntity) => void): void;
  forEachContent(callback: (content: Entity) => void): void;
  forEachGroup(callback: (group: Entity) => void): void;
  forEachDIY2(callback: (diy: Entity) => void): void;
}

interface Layer {
  forEachCeiling(callback: (ceiling: Entity) => void): void;
}

interface RoofEntity extends Entity {
  generatedType: number;
}

export class ModeController {
  private _tempFlagStore: Map<string | number, number>;

  constructor() {
    this._tempFlagStore = new Map();
  }

  /**
   * Updates entity flags based on freeze state
   * @param entity - The entity to update
   * @param shouldFreeze - Whether to freeze or unfreeze the entity
   * @param hideEntity - Whether to hide the entity (optional)
   */
  updateEntityFlags(entity: Entity, shouldFreeze: boolean, hideEntity: boolean = false): void {
    if (shouldFreeze) {
      this._storeFlag(entity);
      entity.setFlagOn(HSCore.Model.EntityFlagEnum.freezed, true);
      entity.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable, true);
      if (hideEntity) {
        entity.setFlagOn(HSCore.Model.EntityFlagEnum.hidden, true);
      }
    } else {
      this._restoreFlag(entity);
    }
  }

  private _storeFlag(entity: Entity): void {
    if (!this._tempFlagStore.has(entity.ID)) {
      this._tempFlagStore.set(entity.ID, entity._tempFlag);
    }
  }

  private _restoreFlag(entity: Entity): void {
    if (this._tempFlagStore.has(entity.ID)) {
      const storedFlag = this._tempFlagStore.get(entity.ID)!;
      
      if (HSCore.Util.Flag.isFlagOff(storedFlag, HSCore.Model.EntityFlagEnum.freezed)) {
        entity.setFlagOff(HSCore.Model.EntityFlagEnum.freezed, true);
      }
      
      if (HSCore.Util.Flag.isFlagOff(storedFlag, HSCore.Model.EntityFlagEnum.unselectable)) {
        entity.setFlagOff(HSCore.Model.EntityFlagEnum.unselectable, true);
      }
      
      if (HSCore.Util.Flag.isFlagOff(storedFlag, HSCore.Model.EntityFlagEnum.hidden)) {
        entity.setFlagOff(HSCore.Model.EntityFlagEnum.hidden, true);
      }
      
      this._tempFlagStore.delete(entity.ID);
    }
  }

  on(): void {
    HSApp.Selection.Manager.unselectAll();
    
    const floorplan: Floorplan = HSApp.App.getApp().floorplan;
    const activeLayer = floorplan.scene.activeLayer;

    floorplan.forEachRoom((room) => {
      this.updateEntityFlags(room, true);
    });

    floorplan.forEachCeiling((ceiling) => {
      this.updateEntityFlags(ceiling, true);
    });

    activeLayer.forEachCeiling((ceiling) => {
      this.updateEntityFlags(ceiling, true);
    });

    floorplan.forEachWall((wall) => {
      this.updateEntityFlags(wall, true);
    });

    floorplan.forEachStructureFace((face) => {
      this.updateEntityFlags(face, true);
    });

    floorplan.forEachMolding((molding) => {
      this.updateEntityFlags(molding, true);
    });

    floorplan.forEachOpening((opening) => {
      this.updateEntityFlags(opening, true);
    });

    floorplan.forEachParametricOpenings((opening) => {
      this.updateEntityFlags(opening, true);
    });

    floorplan.forEachStructure((structure) => {
      this.updateEntityFlags(structure, true);
    });

    floorplan.forEachRoof((roof) => {
      if (roof.generatedType === HSCore.Model.ParametricRoofGeneratedTypeEnum.AUTO) {
        this.updateEntityFlags(roof, true);
      }
    });

    floorplan.forEachContent((content) => {
      if (!(content instanceof HSCore.Model.NCustomizedParametricRoof)) {
        this.updateEntityFlags(content, true, true);
      }
    });

    floorplan.forEachGroup((group) => {
      this.updateEntityFlags(group, true, true);
    });

    floorplan.forEachDIY2((diy) => {
      this.updateEntityFlags(diy, true, true);
    });
  }

  off(): void {
    const floorplan: Floorplan = HSApp.App.getApp().floorplan;

    floorplan.forEachRoom((room) => {
      this._restoreFlag(room);
    });

    floorplan.forEachCeiling((ceiling) => {
      this._restoreFlag(ceiling);
    });

    floorplan.forEachWall((wall) => {
      this._restoreFlag(wall);
    });

    floorplan.forEachStructureFace((face) => {
      this._restoreFlag(face);
    });

    floorplan.forEachMolding((molding) => {
      this._restoreFlag(molding);
    });

    floorplan.forEachOpening((opening) => {
      this._restoreFlag(opening);
    });

    floorplan.forEachParametricOpenings((opening) => {
      this._restoreFlag(opening);
    });

    floorplan.forEachStructure((structure) => {
      this._restoreFlag(structure);
    });

    floorplan.forEachRoof((roof) => {
      if (roof.generatedType === HSCore.Model.ParametricRoofGeneratedTypeEnum.AUTO) {
        this._restoreFlag(roof);
      }
    });

    floorplan.forEachContent((content) => {
      if (!(content instanceof HSCore.Model.NCustomizedParametricRoof)) {
        this._restoreFlag(content);
      }
    });

    floorplan.forEachGroup((group) => {
      this._restoreFlag(group);
    });

    floorplan.forEachDIY2((diy) => {
      this._restoreFlag(diy);
    });

    this._tempFlagStore.clear();
  }
}