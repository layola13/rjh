import { Layer } from './Layer';
import { Content } from './Content';
import { TransactionManager } from './TransactionManager';
import { Request } from './Request';

interface Floor {
  getUniqueParent(): any;
}

interface CommandManager {
  complete(cmd: Command): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

abstract class Command {
  protected mgr!: CommandManager;
  protected context!: CommandContext;
  
  abstract onExecute(): void;
  onCleanup(args: any[]): void {}
  canUndoRedo(): boolean {
    return true;
  }
}

interface RelatedContents {
  toBeReassign: Content[];
  toBeRemoved: Content[];
}

export class CmdDeleteOutdoorSpace extends Command {
  private floor: Floor;
  private _request?: Request;

  constructor(floor: Floor) {
    super();
    this.floor = floor;
  }

  private getRelateContents(): RelatedContents {
    const layer = HSCore.Util.Layer.getEntityLayer(this.floor);
    assert(layer, "layer is not valid");

    const toBeRemovedSet = new Set<Content>();
    const toBeReassignSet = new Set<Content>();

    if (layer) {
      layer.forEachContent((content: Content) => {
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
    const transManager = this.context.transManager;
    const relatedContents = this.getRelateContents();
    const requests: Request[] = [];

    relatedContents.toBeRemoved.forEach((content: Content) => {
      if (content.instanceOf(HSConstants.ModelClass.NgGroup)) {
        const deleteAssemblyRequest = transManager.createRequest(
          HSFPConstants.RequestType.DeleteAssembly,
          [content]
        );
        requests.push(deleteAssemblyRequest);
      } else {
        const deleteProductRequest = transManager.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [content]
        );
        requests.push(deleteProductRequest);
      }
    }, this);

    const parentSlab = this.floor.getUniqueParent();
    const deleteSlabRequest = transManager.createRequest(
      HSFPConstants.RequestType.DeleteSlab,
      [parentSlab]
    );
    requests.push(deleteSlabRequest);

    this._request = transManager.createRequest(
      HSConstants.RequestType.Composite,
      [requests]
    );
    
    transManager.commit(this._request);
    this._onComplete();
  }

  private _onComplete(): void {
    this.mgr.complete(this);
  }

  onCleanup(): void {
    super.onCleanup([]);
  }

  canUndoRedo(): boolean {
    return false;
  }
}