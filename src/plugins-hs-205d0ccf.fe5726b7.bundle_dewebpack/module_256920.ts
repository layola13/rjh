import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { HSConstants } from './HSConstants';

interface SelectableEntity extends HSCore.Model.Entity {
  canSelect(): boolean;
  ignoreSel?: boolean;
}

interface CustomizedStructure extends SelectableEntity {
  dirtyPosition(): void;
}

interface CustomizedBeam extends SelectableEntity {
  dirtyPosition(): void;
}

interface SelectionFilter {
  filter(entity: SelectableEntity, context: unknown): SelectableEntity;
}

interface SelectionManager {
  getCurrentFilter(): SelectionFilter | null;
  selected(): SelectableEntity[];
  hasSelected(entity: SelectableEntity): boolean;
  select(entity: SelectableEntity, context: unknown): void;
  unselect(entity: SelectableEntity): void;
  unselectAll(): void;
}

interface CommandManager {
  complete(): void;
}

interface ExecuteContext {
  [key: string]: unknown;
}

export default class SelectCommand extends HSApp.Cmd.Command {
  private _selectionMgr: SelectionManager;

  constructor() {
    super();
    this._selectionMgr = HSApp.Selection.Manager;
  }

  onExecute(entity: SelectableEntity, isMultiSelect: boolean, context: ExecuteContext): void {
    if (HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.MixPaint) {
      const mixPaintHandler = HSApp.PaintPluginHelper.Kernel.MixPaintPluginHandler;
      if (mixPaintHandler && mixPaintHandler.environment.paintMode.current === 'free') {
        this.mgr.complete();
        return;
      }
    }

    const isMulti = isMultiSelect === true;
    const selectionMgr = this._selectionMgr;
    const currentFilter = selectionMgr.getCurrentFilter();

    if (currentFilter && !(entity instanceof HSCore.Model.Face)) {
      entity = currentFilter.filter(entity, context);

      let rootContent = HSCore.Util.Content.getRootContent(entity);
      if (rootContent instanceof HSCore.Model.ParametricOpening) {
        entity = rootContent;
      }

      if (
        entity instanceof HSCore.Model.ParametricContentSubpart ||
        entity instanceof HSCore.Model.ParametricModelContent ||
        entity instanceof HSCore.Model.ParametricModelArray
      ) {
        entity = HSApp.View.Util.getParentByEntityType(entity, [
          HSConstants.ModelClass.NCPBackgroundWallUnit,
          HSConstants.ModelClass.NCustomizedParametricBackgroundWall,
          HSConstants.ModelClass.ParametricCurtain,
          HSConstants.ModelClass.ParametricBathroomCabinet,
        ]);
      }

      if (
        entity instanceof HSCore.Model.NCustomizedModelMolding ||
        entity instanceof HSCore.Model.NCustomizedModelLightSlot ||
        entity instanceof HSCore.Model.NCustomizedModelLightBand
      ) {
        const uniqueParent = entity.getUniqueParent();
        if (uniqueParent && uniqueParent instanceof HSCore.Model.NCPBackgroundWallBase) {
          entity =
            HSApp.View.Util.getParentByEntityType(entity, HSConstants.ModelClass.NCPBackgroundWallUnit) ||
            HSApp.View.Util.getParentByEntityType(entity, HSConstants.ModelClass.NCustomizedParametricBackgroundWall);
        }
      }

      if (entity instanceof HSCore.Model.NCustomizedModelMolding && entity.contentType.isTypeOf('necking outline')) {
        entity = entity.getUniqueParent();
      }
    }

    const previousSelection = selectionMgr.selected();

    if (entity instanceof HSCore.Model.Face) {
      const master = entity.getMaster();
      if (master && selectionMgr.hasSelected(master)) {
        selectionMgr.unselect(master);
      }
    }

    if (!entity || !entity.canSelect()) {
      if (!isMulti) {
        selectionMgr.unselectAll();
      }
      this.mgr.complete();

      for (const selectedEntity of previousSelection) {
        if (selectedEntity && selectedEntity instanceof HSCore.Model.NCustomizedStructure) {
          selectedEntity.dirtyPosition();
        }
        if (selectedEntity && selectedEntity instanceof HSCore.Model.NCustomizedBeam) {
          selectedEntity.dirtyPosition();
        }
      }

      return;
    }

    const isAlreadySelected = selectionMgr.hasSelected(entity);
    const currentSelection = selectionMgr.selected();

    if (isMulti) {
      if (entity && isAlreadySelected) {
        selectionMgr.unselect(entity);
      } else if (
        (entity && entity instanceof HSCore.Model.NCustomizedStructure) ||
        (entity && entity instanceof HSCore.Model.NCustomizedBeam) ||
        (entity &&
          (entity instanceof HSCore.Model.NCPBackgroundWallUnit ||
            entity instanceof HSCore.Model.NCustomizedParametricBackgroundWall))
      ) {
        selectionMgr.unselectAll();
        selectionMgr.select(entity, context);
      } else if (entity) {
        if (!HSApp.Util.Selection.canMultiSelect(entity)) {
          selectionMgr.unselectAll();
        }
        selectionMgr.select(entity, context);
      }
    } else {
      selectionMgr.unselectAll();
      if (entity) {
        if (currentSelection.length > 0 && isAlreadySelected) {
          currentSelection.forEach((selectedEntity: SelectableEntity) => {
            selectionMgr.select(selectedEntity, context);
          }, this);
        } else if (!entity.ignoreSel) {
          selectionMgr.select(entity, context);
        }
      }
    }

    if (entity && entity instanceof HSCore.Model.NCustomizedStructure) {
      entity.dirtyPosition();
    }
    if (entity && entity instanceof HSCore.Model.NCustomizedBeam) {
      entity.dirtyPosition();
    }

    for (const selectedEntity of previousSelection) {
      if (selectedEntity && selectedEntity instanceof HSCore.Model.NCustomizedStructure) {
        selectedEntity.dirtyPosition();
      }
      if (selectedEntity && selectedEntity instanceof HSCore.Model.NCustomizedBeam) {
        selectedEntity.dirtyPosition();
      }
    }

    this.mgr.complete();
  }

  onCleanup(): void {}

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return '选择操作';
  }
}