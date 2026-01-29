import { HSConstants, HSCore } from './635589';

interface Logger {
  debug(message: string): void;
}

interface Entity {
  ID: string;
  _tempFlag: number;
  instanceOf(modelClass: string): boolean;
  setFlagOn(flag: number, value: boolean): void;
  setFlagOff(flag: number, value: boolean): void;
}

interface SelectionManager {
  unselectAll(): void;
}

interface Floorplan {
  grid: Entity;
  forEachContent(callback: (entity: Entity) => void): void;
  forEachWall(callback: (entity: Entity) => void): void;
  forEachGroup(callback: (entity: Entity) => void): void;
  forEachDIY2(callback: (entity: Entity) => void): void;
  forEachRoom(callback: (entity: Entity) => void): void;
}

interface App {
  Selection: {
    Manager: SelectionManager;
  };
  App: {
    getApp(): {
      floorplan: Floorplan;
    };
  };
}

declare const HSApp: App;
declare const log: {
  logger(name: string): Logger;
};

export default class CmdEditLayerSlabs {
  private _tempFlagStore: Map<string, number>;
  private _furnitureVisibleFlag?: boolean;
  public isLightControlMode?: boolean;
  private _logger: Logger;

  constructor() {
    this._tempFlagStore = new Map();
    this._logger = log.logger('CmdEditLayerSlabs');
  }

  /**
   * Updates entity flags based on mode state
   */
  updateEntityFlags(entity: Entity, shouldHide: boolean): void {
    if (shouldHide) {
      if (
        entity.instanceOf(HSConstants.ModelClass.NgContent) ||
        entity.instanceOf(HSConstants.ModelClass.NgPocket) ||
        entity instanceof HSCore.Model.CustomizedPMInstanceModel
      ) {
        this._storeFlag(entity);
        entity.setFlagOn(HSCore.Model.EntityFlagEnum.freezed, true);
        entity.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable, true);
        entity.setFlagOn(HSCore.Model.ContentFlagEnum.transparent, true);
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
      if (HSCore.Util.Flag.isFlagOff(storedFlag, HSCore.Model.ContentFlagEnum.transparent)) {
        entity.setFlagOff(HSCore.Model.ContentFlagEnum.transparent, true);
      }
      if (HSCore.Util.Flag.isFlagOff(storedFlag, HSCore.Model.EntityFlagEnum.hidden)) {
        entity.setFlagOff(HSCore.Model.EntityFlagEnum.hidden, true);
      }
      if (HSCore.Util.Flag.isFlagOff(storedFlag, HSCore.Model.GridFlagEnum.toggleOff)) {
        entity.setFlagOff(HSCore.Model.GridFlagEnum.toggleOff, true);
      }

      this._tempFlagStore.delete(entity.ID);
    }
  }

  /**
   * Activates edit slab mode
   */
  on(): void {
    this._logger.debug('edit slab mode on');

    const selectionManager = HSApp.Selection.Manager;
    const floorplan = HSApp.App.getApp().floorplan;

    selectionManager.unselectAll();

    floorplan.forEachContent((entity) => {
      this.updateEntityFlags(entity, true);
    });

    floorplan.forEachWall((entity) => {
      this.updateEntityFlags(entity, true);
    });

    floorplan.forEachGroup((entity) => {
      this.updateEntityFlags(entity, true);
    });

    floorplan.forEachDIY2((entity) => {
      this.updateEntityFlags(entity, true);
    });

    this.updateEntityFlags(floorplan.grid, true);
    this.setFurnitureVisible(this._furnitureVisibleFlag, true);
  }

  /**
   * Deactivates edit slab mode
   */
  off(): void {
    this._logger.debug('edit slab mode off');

    const floorplan = HSApp.App.getApp().floorplan;

    if (this.isLightControlMode) {
      this.endLightControl();
    }

    floorplan.forEachContent((entity) => {
      this._restoreFlag(entity);
    });

    floorplan.forEachWall((entity) => {
      this._restoreFlag(entity);
    });

    floorplan.forEachGroup((entity) => {
      this._restoreFlag(entity);
    });

    floorplan.forEachDIY2((entity) => {
      this._restoreFlag(entity);
    });

    this._restoreFlag(floorplan.grid);
    this._tempFlagStore.clear();
  }

  /**
   * Controls furniture visibility
   */
  setFurnitureVisible(visible: boolean | undefined, isTemporary: boolean): void {
    if (!isTemporary) {
      this._furnitureVisibleFlag = visible;
    }

    HSApp.App.getApp().floorplan.forEachContent((entity) => {
      if (
        !entity.instanceOf(HSConstants.ModelClass.NgOpening) &&
        !entity.instanceOf(HSConstants.ModelClass.NgCornerWindow)
      ) {
        if (visible) {
          entity.setFlagOff(HSCore.Model.EntityFlagEnum.hidden, true);
        } else {
          entity.setFlagOn(HSCore.Model.EntityFlagEnum.hidden, true);
        }
      }
    });
  }

  /**
   * Starts light control mode
   */
  startLightControl(): void {
    this.isLightControlMode = true;

    const selectionManager = HSApp.Selection.Manager;
    const floorplan = HSApp.App.getApp().floorplan;

    selectionManager.unselectAll();

    floorplan.forEachContent((entity) => {
      entity.setFlagOn(HSCore.Model.EntityFlagEnum.freezed, true);
      entity.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable, true);
    });

    floorplan.forEachRoom((entity) => {
      entity.setFlagOn(HSCore.Model.EntityFlagEnum.unselectable, true);
    });
  }

  /**
   * Ends light control mode
   */
  endLightControl(): void {
    this.isLightControlMode = false;

    const floorplan = HSApp.App.getApp().floorplan;

    floorplan.forEachContent((entity) => {
      entity.setFlagOff(HSCore.Model.EntityFlagEnum.freezed, true);
      entity.setFlagOff(HSCore.Model.EntityFlagEnum.unselectable, true);
    });

    floorplan.forEachRoom((entity) => {
      entity.setFlagOff(HSCore.Model.EntityFlagEnum.unselectable, true);
    });
  }
}