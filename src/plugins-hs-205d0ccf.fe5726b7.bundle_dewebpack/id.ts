import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface SelectedEntity {
  ID: string;
  metadata?: {
    contentType?: ContentType;
    seekId?: string;
  };
  contentType?: ContentType;
  group?: SelectedEntity;
  isFlagOn?: (flag: number) => boolean;
  instanceOf: (modelClass: string) => boolean;
  getHost?: () => SelectedEntity | null;
}

interface ContentType {
  getTypeString: () => string;
  isTypeOf: (type: string) => boolean;
}

interface TransactionManager {
  startSession: () => TransactionSession;
  createRequest: (requestType: string, args: unknown[]) => TransactionRequest;
  commit: (request: TransactionRequest, updateWallMoldings?: boolean) => void;
}

interface TransactionSession {
  commit: () => void;
}

interface TransactionRequest {}

interface CommandContext {
  transManager: TransactionManager;
  app: {
    environmentManager: {
      isWallCeilingPlatformEnv: () => boolean;
    };
  };
}

interface CommandManager {
  cancel: (command: Command) => void;
  complete: (command: Command) => void;
  createCommand: (commandType: string, args: unknown[]) => Command;
  execute: (command: Command) => void;
  receive: (event: string, data?: Record<string, unknown>) => void;
}

interface Logger {
  warning: (message: string) => void;
}

const logger: Logger = {
  warning: (message: string) => {
    console.warn(message);
  }
};

abstract class Command {
  protected selected: SelectedEntity[] = [];
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export default class DeleteSelectionCommand extends Command {
  public onExecute(): void {
    const selectionManager = HSApp.Selection.Manager;
    this.selected = selectionManager.selected();

    const mixPaintUtil = HSApp.PaintPluginHelper.Util.MixPaintUtil;
    if (mixPaintUtil && !mixPaintUtil.disconnectFaceGroupWithPrompt(this.selected, undefined, this._executeCmd.bind(this))) {
      return;
    }

    this._executeCmd();
  }

  private _executeCmd(): void {
    if (!this._isValid(this.selected)) {
      logger.warning("Can only deal with the entities with the same type. Cancel this command.");
      this.mgr.cancel(this);
      return;
    }

    const pickedMoldingId = this._getPickedMolding(this.selected);
    const transManager = this.context.transManager;
    const session = transManager.startSession();

    const deletableEntities = this.selected.filter((entity) => {
      let isDeletable = true;
      const contentType = entity.metadata?.contentType;

      if (contentType) {
        const typeString = contentType.getTypeString().split("/").pop();
        const isUndeletableType = HSCatalog.ContentTypeEnum.ext_Undeletable.find((undeletableType) => undeletableType === typeString);

        if (isUndeletableType) {
          isDeletable = !HSCore.Util.PAssemblyBody.isContentHasPAssemblyParent(entity);
        }
      }

      if (HSCore.Model.Light.isPhysicalLight(entity) || 
          entity instanceof HSCore.Model.MeshLight || 
          entity.isFlagOn?.(HSCore.Model.ContentFlagEnum.EditLight)) {
        isDeletable = false;
      }

      return isDeletable;
    });

    const validEntities = deletableEntities.filter((entity) => {
      if (entity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_ShouldBeRemovedWithHost)) {
        const host = entity.getHost?.();
        const hostInSelection = deletableEntities.find((selected) => host && host.ID === selected.ID);
        if (hostInSelection) {
          return false;
        }
      }

      if (entity instanceof HSCore.Model.Content) {
        let currentGroup = entity.group;
        let hasSeekId = false;

        while (currentGroup) {
          const seekId = currentGroup.metadata?.seekId;
          if (seekId && seekId !== "none") {
            hasSeekId = true;
            break;
          }
          currentGroup = currentGroup.group;
        }

        if (hasSeekId) {
          HSApp.UI.HSModal.confirm({
            title: ResourceManager.getString("customized_products_prompt"),
            content: ResourceManager.getString("customized_products_can_not_delete_hint"),
            enableCheckbox: false,
            hideCancelButton: true,
            okButtonContent: ResourceManager.getString("customized_products_get_it")
          });
          return false;
        }
      }

      return true;
    });

    validEntities.forEach((entity) => {
      let request: TransactionRequest | undefined;

      if (entity instanceof HSCore.Model.Content) {
        if (pickedMoldingId) {
          this._deleteMolding(entity, pickedMoldingId);
        } else if (entity instanceof HSCore.Model.CustomizedFeatureModel) {
          this._deleteCustomizedFeatureModel(entity);
        } else if (entity instanceof HSCore.Model.NCustomizedSketchModel) {
          this._deleteNCustomizedSketchModel(entity);
        } else {
          let shouldUpdateWallMoldings = false;
          if (entity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot)) {
            shouldUpdateWallMoldings = HSApp.Util.Room.updateWallMoldingsBoundToContent(entity, HSCatalog.ContentTypeEnum.ext_Wainscot);
          }
          request = transManager.createRequest(HSFPConstants.RequestType.DeleteProduct, [entity]);
          transManager.commit(request, shouldUpdateWallMoldings);
        }
      } else if (entity.instanceOf(HSConstants.ModelClass.NgWall)) {
        const deleteWallCommand = this.mgr.createCommand(HSFPConstants.CommandType.DeleteNGWall, [entity]);
        deleteWallCommand.onExecute();
      } else if (entity.instanceOf(HSConstants.ModelClass.NgLight)) {
        request = transManager.createRequest(HSFPConstants.RequestType.DeleteLightRequest, [entity]);
        transManager.commit(request);
      } else if (HSApp.Util.Face.isOutdoorSpace(entity)) {
        const deleteOutdoorCommand = this.mgr.createCommand(HSFPConstants.CommandType.DeleteOutdoorSpace, [entity]);
        deleteOutdoorCommand.onExecute();
      } else if (HSApp.Util.Face.canDeleteWithWalls(entity)) {
        const deleteRoomCommand = this.mgr.createCommand(HSFPConstants.CommandType.DeleteNGRoom, [entity]);
        deleteRoomCommand.onExecute();
      }
    });

    session.commit();
    this.mgr.complete(this);

    const activeView = HSApp.App.getApp().activeView;
    if (activeView?.pixiContext) {
      activeView.pixiContext.dirty = true;
    }
  }

  private _deleteCustomizedFeatureModel(entity: HSCore.Model.CustomizedFeatureModel): void {
    const transManager = this.context.transManager;
    const requests: TransactionRequest[] = [];

    if (this.context.app.environmentManager.isWallCeilingPlatformEnv()) {
      const clearRequest = transManager.createRequest(HSFPConstants.RequestType.CustomizedFeatureModel.ClearAll, [entity]);
      requests.push(clearRequest);
    } else {
      const deleteRequest = transManager.createRequest(HSFPConstants.RequestType.DeleteProduct, [entity]);
      requests.push(deleteRequest);
    }

    if (requests.length > 1) {
      const compositeRequest = transManager.createRequest(HSConstants.RequestType.Composite, [requests]);
      transManager.commit(compositeRequest);
    } else if (requests.length === 1) {
      transManager.commit(requests[0]);
    }
  }

  private _deleteNCustomizedSketchModel(entity: HSCore.Model.NCustomizedSketchModel): void {
    const transManager = this.context.transManager;
    const requests: TransactionRequest[] = [];
    const breps = entity.breps;
    const selectedItems = HSApp.App.getApp().selectionManager.selected(false);

    if (this.context.app.environmentManager.isWallCeilingPlatformEnv()) {
      if (entity instanceof HSCore.Model.NCustomizedPlatform && breps.length > 1) {
        if (!selectedItems[0]) return;
        const deletePlatformRequest = transManager.createRequest(HSFPConstants.RequestType.DeletePlatform, [entity, selectedItems[0].meshName]);
        requests.push(deletePlatformRequest);
      } else {
        const clearAllRequest = transManager.createRequest(HSFPConstants.RequestType.NCustomizedFeatureModel.ClearAll, [entity]);
        requests.push(clearAllRequest);
      }
    } else {
      if (entity instanceof HSCore.Model.NCustomizedPlatform && breps.length > 1) {
        if (!selectedItems[0]) return;
        const deletePlatformRequest = transManager.createRequest(HSFPConstants.RequestType.DeletePlatform, [entity, selectedItems[0].meshName]);
        requests.push(deletePlatformRequest);
      } else {
        const deleteProductRequest = transManager.createRequest(HSFPConstants.RequestType.DeleteProduct, [entity]);
        requests.push(deleteProductRequest);
      }
    }

    if (requests.length > 1) {
      const compositeRequest = transManager.createRequest(HSConstants.RequestType.Composite, [requests]);
      transManager.commit(compositeRequest);
    } else if (requests.length === 1) {
      transManager.commit(requests[0]);
    }
  }

  private _deleteMolding(entity: HSCore.Model.Content, moldingId: string): void {
    const isManuallyAdded = moldingId?.includes("manualAddMolding");

    if (entity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling) && !isManuallyAdded) {
      const editCeilingCommand = this.mgr.createCommand(HSFPConstants.CommandType.EditParametricCeiling, [entity]);
      this.mgr.execute(editCeilingCommand);
      this.mgr.receive("deletesmartmolding", { moldingId });
      this.mgr.complete();
    } else {
      const editMoldingCommand = this.mgr.createCommand(HSFPConstants.CommandType.EditCustomizedMolding, [entity, moldingId]);
      this.mgr.execute(editMoldingCommand);
      this.mgr.receive("deletemolding");
      this.mgr.complete();
    }
  }

  private _getPickedMolding(entities: SelectedEntity[]): string | undefined {
    const selectedWithDetails = HSApp.App.getApp().selectionManager.selected(true);

    if (selectedWithDetails.length && selectedWithDetails[0].instanceOf(HSConstants.ModelClass.CustomizedModelMolding)) {
      const moldingId = selectedWithDetails[0].moldingId;
      if (entities?.length > 0 && entities[0] instanceof HSCore.Model.CustomizedModel && moldingId) {
        return moldingId;
      }
    }

    return undefined;
  }

  public canUndoRedo(): boolean {
    return false;
  }

  private _isValid(entities: SelectedEntity[]): boolean {
    const validTypes = [HSCore.Model.Content, HSCore.Model.Light, HSCore.Model.Floor];

    if (!entities || entities.length === 0) {
      return false;
    }

    return validTypes.some((validType) => {
      return entities.every((entity) => entity instanceof validType);
    });
  }

  public getDescription(): string {
    return "删除操作";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}