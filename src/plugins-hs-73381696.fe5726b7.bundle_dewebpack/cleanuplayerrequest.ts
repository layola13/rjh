interface Layer {
  traverse(callback: (entity: any) => void): void;
  removeAllChildrenByTypes(types: string[]): void;
  parent?: any;
}

interface DModelEntity {
  parent?: Layer;
  getProxyObject(): EntityProxy | null;
}

interface EntityProxy {
  removeFromFloorplan(entity: DModelEntity): void;
}

declare namespace HSCore {
  namespace Util {
    namespace DEntityUtils {
      function isDModel(entity: any): entity is DModelEntity;
    }
    namespace Content {
      function removeContent(entity: DModelEntity): void;
    }
    namespace TgWall {
      function updateLayer(layer: Layer): void;
    }
    namespace Layer {
      function dirtyLayerInfo(layer: Layer): void;
    }
  }
  namespace Transaction {
    namespace Common {
      class StateRequest {
        protected tryCreateEntityProxyUndoRedoObject(entity: DModelEntity): void;
        onCommit(args: any[]): void;
        onUndo(args: any[]): void;
        onRedo(args: any[]): void;
      }
    }
  }
}

declare namespace HSFPConstants {
  enum LogGroupTypes {
    WallOperation = "WallOperation"
  }
}

/**
 * Request to clean up all walls and related entities in a layer
 */
export class CleanupLayerRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _layer: Layer;
  private readonly _beforeData: Record<string, any>;

  constructor(layer: Layer) {
    super();
    this._layer = layer;
    this._beforeData = {};
  }

  /**
   * Execute the cleanup operation
   */
  doRequest(): void {
    const layer = this._layer;
    let hasCreatedProxy = false;

    this._layer.traverse((entity: any) => {
      if (HSCore.Util.DEntityUtils.isDModel(entity) && entity.parent === this._layer) {
        if (!hasCreatedProxy) {
          this.tryCreateEntityProxyUndoRedoObject(entity);
          hasCreatedProxy = true;
        }

        const proxyObject = entity.getProxyObject();
        if (proxyObject) {
          proxyObject.removeFromFloorplan(entity);
        } else {
          HSCore.Util.Content.removeContent(entity);
        }
      }
    });

    layer.removeAllChildrenByTypes([
      "molding",
      "opening",
      "popening",
      "beam",
      "structure",
      "content",
      "group",
      "lightgroup",
      "wall"
    ]);

    HSCore.Util.TgWall.updateLayer(layer);
  }

  onCommit(): void {
    this.doRequest();
    HSCore.Util.Layer.dirtyLayerInfo(this._layer);
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  onUndo(): void {
    super.onUndo([]);
    HSCore.Util.Layer.dirtyLayerInfo(this._layer);
  }

  onRedo(): void {
    super.onRedo([]);
    HSCore.Util.Layer.dirtyLayerInfo(this._layer);
  }

  getDescription(): string {
    return "删除设计中所有墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}