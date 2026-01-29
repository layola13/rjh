import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface UpdateMetaData {
  iconImg?: string;
  icon?: string;
  [key: string]: unknown;
}

interface PickResult {
  meshName?: string;
  [key: string]: unknown;
}

interface MouseEventData {
  event: MouseEvent;
  pickResults: PickResult[];
}

interface DragEventData {
  event: MouseEvent;
}

interface Position {
  x: number;
  y: number;
}

interface Entity {
  metadata: unknown;
  [key: string]: unknown;
}

interface TransactionManager {
  createRequest(
    requestType: string,
    params: [Entity, string, unknown, unknown]
  ): unknown;
  commit(request: unknown): void;
}

interface Context {
  transManager: TransactionManager;
}

interface CommandManager {
  cancel(): void;
  complete(): void;
}

interface Handler {
  updateToolbarResetItems(items: string[], states: boolean[]): void;
}

declare class MiniImagePreviewCtrl {
  constructor(metadata: UpdateMetaData);
  init(): void;
  render(position: Position): void;
  destroy(): void;
}

declare const HSFPConstants: {
  RequestType: {
    ContentMaterialReplaceRequest: string;
  };
};

export class CmdContentMaterialMoveReplace extends HSApp.Cmd.Command {
  private _entity: Entity;
  private _updateMetaData: UpdateMetaData;
  private _handler: Handler;
  private miniImagePreviewCtrl?: MiniImagePreviewCtrl | null;
  private _lastPickResult?: PickResult;
  protected mgr?: CommandManager;
  protected context!: Context;

  constructor(entity: Entity, updateMetaData: UpdateMetaData, handler: Handler) {
    super();
    this._entity = entity;
    this._updateMetaData = updateMetaData;
    this._handler = handler;
    this.miniImagePreviewCtrl = undefined;
    this._lastPickResult = undefined;
  }

  onExecute(): void {
    this._createMiniImagePreview(this._updateMetaData);
  }

  onCleanup(): void {
    this._destroyMiniImagePreview();
  }

  onReceive(eventType: string, eventData: unknown): boolean {
    switch (eventType) {
      case 'mousemove':
        return this.onMouseMove(eventData as MouseEventData);
      case 'mousedown':
        this.onMouseDown(eventData as MouseEventData);
        return false;
      case 'dragMove':
        this._renderMiniImagePreview(eventData as DragEventData);
        return true;
      case 'dragEnd':
        this.onDragEnd();
        return true;
      default:
        return super.onReceive(eventType, eventData);
    }
  }

  onMouseMove(eventData: MouseEventData): boolean {
    if (this.miniImagePreviewCtrl) {
      this._renderMiniImagePreview(eventData);
    }
    const pickResult = eventData.pickResults[0];
    this._lastPickResult = pickResult;
    return true;
  }

  onMouseDown(eventData: MouseEventData): void {
    if (eventData.event.which === 3) {
      this.mgr?.cancel();
    } else {
      const pickResult = eventData.pickResults[0];
      if (pickResult?.meshName) {
        this._replaceMaterial(pickResult.meshName);
      }
    }
  }

  onDragEnd(): void {
    const pickResult = this._lastPickResult;
    if (pickResult?.meshName) {
      this._replaceMaterial(pickResult.meshName);
      HSApp.Selection.Manager.select(this._entity, pickResult);
    } else {
      this.mgr?.cancel();
    }
  }

  private _replaceMaterial(meshName: string): void {
    if (!meshName) {
      return;
    }

    const materialData = HSCore.Material.Util.getMaterialData(this._updateMetaData);
    const transManager = this.context.transManager;
    const entityCustomizeSize = HSApp.Util.Entity.getEntityCustomizeSize(
      this._entity.metadata
    );
    const request = transManager.createRequest(
      HSFPConstants.RequestType.ContentMaterialReplaceRequest,
      [this._entity, meshName, materialData, entityCustomizeSize]
    );
    transManager.commit(request);

    this._handler.updateToolbarResetItems(
      [
        'plugin_contentmaterialreplace_toobar_all_recovery',
        'plugin_contentmaterialreplace_toobar_origin_material'
      ],
      [true, true]
    );

    this.mgr?.complete();
  }

  private _createMiniImagePreview(metadata: UpdateMetaData): void {
    if (metadata.iconImg) {
      metadata.icon = metadata.iconImg;
    }
    this._destroyMiniImagePreview();
    this.miniImagePreviewCtrl = new MiniImagePreviewCtrl(metadata);
    this.miniImagePreviewCtrl.init();
  }

  private _renderMiniImagePreview(eventData: DragEventData | MouseEventData): boolean {
    if (this.miniImagePreviewCtrl && eventData?.event) {
      const mouseEvent = eventData.event;
      const position: Position = {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      };
      this.miniImagePreviewCtrl.render(position);
      return true;
    }
    return false;
  }

  private _destroyMiniImagePreview(): void {
    if (this.miniImagePreviewCtrl) {
      this.miniImagePreviewCtrl.destroy();
      this.miniImagePreviewCtrl = null;
    }
  }
}