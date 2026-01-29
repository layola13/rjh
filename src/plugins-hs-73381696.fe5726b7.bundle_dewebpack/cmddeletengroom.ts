interface Floor {
  structureFaces: any[];
  forEachContent(callback: (content: any) => void, context: any): void;
}

interface Layer {
  wallFaceAssemblies: WallFaceAssembly[];
  forEachContent(callback: (content: any) => void, context: any): void;
}

interface WallFaceAssembly {
  wallFace: any;
}

interface Content {
  instanceOf(modelClass: string): boolean;
  contentType: {
    isTypeOf(type: string): boolean;
  };
}

interface Wall {
  setFlagOff(flag: number): void;
  forEachContent(callback: (content: any) => void, context: any): void;
}

interface SelectionManager {
  unselect(entity: any): void;
  unselectAll(): void;
}

interface TransactionManager {
  createRequest(requestType: string, args: any[]): any;
  startSession(): Session;
  commit(request: any): void;
}

interface Session {
  commit(): void;
}

interface CommandContext {
  transManager: TransactionManager;
  selectionManager: SelectionManager;
}

interface CommandManager {
  complete(command: Command): void;
}

interface RelatedContents {
  toBeReassign: Content[];
  toBeRemoved: Content[];
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;
  
  abstract onExecute(): void;
  abstract onCleanup(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export class CmdDeleteNGRoom extends Command {
  private floor: Floor;
  private _layer: Layer;

  constructor(floor: Floor) {
    super();
    this.floor = floor;
    this._layer = HSCore.Util.Layer.getEntityLayer(floor);
  }

  /**
   * Get contents related to the walls that need to be reassigned or removed
   */
  getRelateContents(walls: Wall[]): RelatedContents {
    const layer = this._layer;
    assert(layer, "layer is not valid");
    
    const toBeRemovedSet = new Set<Content>();
    const toBeReassignSet = new Set<Content>();

    walls.forEach((wall) => {
      wall.forEachContent((content) => {
        if (content && content.instanceOf(HSConstants.ModelClass.NgContent)) {
          // Skip corner windows
          if (content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
            return;
          }

          const isOpening = content.instanceOf(HSConstants.ModelClass.NgOpening);
          const isCustomized = content.instanceOf(HSConstants.ModelClass.NgCustomizedModel);
          const isWainscot = content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot);
          const isWallAttached = content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_WallAttached);
          const isParametricOpening = content instanceof HSCore.Model.ParametricOpening;

          if (isOpening || isCustomized || isWainscot || isWallAttached || isParametricOpening) {
            toBeRemovedSet.add(content);
          } else {
            toBeReassignSet.add(content);
          }
        }
      }, this);

      const associatedCornerWindows = HSCore.Util.Wall.getAssociatedCornerWindow(wall);
      if (associatedCornerWindows && associatedCornerWindows.length > 0) {
        associatedCornerWindows.forEach((window) => {
          toBeRemovedSet.add(window);
        });
      }
    });

    if (layer) {
      layer.forEachContent((content) => {
        if (HSCore.Util.Content.isContentInFloor(content, this.floor)) {
          toBeRemovedSet.add(content);
        }
      }, this);
    }

    return {
      toBeReassign: Array.from(toBeReassignSet),
      toBeRemoved: Array.from(toBeRemovedSet)
    };
  }

  onExecute(): void {
    const { transManager, selectionManager } = this.context;
    
    const walls = HSApp.Util.Face.getWallsRelateWithFloorOnly(this.floor);
    
    walls.forEach((wall) => {
      selectionManager.unselect(wall);
      wall.setFlagOff(HSCore.Model.WallFlagEnum.hoverOn);
    });
    
    selectionManager.unselectAll();

    const relatedContents = this.getRelateContents(walls);
    const requests: any[] = [];

    relatedContents.toBeRemoved.forEach((content) => {
      if (content.instanceOf(HSConstants.ModelClass.NgGroup)) {
        const request = transManager.createRequest(
          HSFPConstants.RequestType.DeleteAssembly,
          [content]
        );
        requests.push(request);
      } else {
        const request = transManager.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [content]
        );
        requests.push(request);
      }
    });

    const compositeRequest = new HSCore.Transaction.Common.CompositeRequest(requests);
    const session = transManager.startSession();
    
    const removeWFARequest = this._removeWFARequest();
    transManager.commit(removeWFARequest);
    transManager.commit(compositeRequest);

    const deleteWallsRequest = transManager.createRequest(
      HSFPConstants.RequestType.DeleteTGWalls,
      [walls, this._layer]
    );
    transManager.commit(deleteWallsRequest);
    
    session.commit();
    this._onComplete();
  }

  private _removeWFARequest(): any {
    const structureFaces = this.floor.structureFaces;
    const wallFaceAssembliesToRemove = this._layer.wallFaceAssemblies.filter((assembly) => {
      return structureFaces.includes(assembly.wallFace);
    });

    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.RemoveWallFaceAssembly,
      [wallFaceAssembliesToRemove, false]
    );
  }

  private _onComplete(): void {
    this.mgr.complete(this);
  }

  onCleanup(): void {
    super.onCleanup?.();
  }

  canUndoRedo(): boolean {
    return false;
  }

  getDescription(): string {
    return "删除房间";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}