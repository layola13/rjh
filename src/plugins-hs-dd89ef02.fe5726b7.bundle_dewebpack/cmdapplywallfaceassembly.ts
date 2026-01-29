import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { WallFaceAssemblyUtil } from './WallFaceAssemblyUtil';
import { WFAAssetUtil } from './WFAAssetUtil';
import { ClipTaskIntergration } from './ClipTaskIntergration';

interface WallFaceAssemblyMeta {
  thumbnail: string;
  assets: Asset[];
  [key: string]: unknown;
}

interface Asset {
  meta: unknown;
  [key: string]: unknown;
}

interface MouseEventData {
  entity?: HSCore.Model.Face;
  event?: MouseEvent;
  modelPos?: unknown;
}

interface Position {
  x: number;
  y: number;
}

interface ProcessedAssets {
  ncpBgWallAssets: Asset[];
  windowAssets: Asset[];
  doorAssets: Asset[];
}

interface TargetContents {
  ncpBgWalls: unknown[];
  windows: unknown[];
  doors: unknown[];
}

interface LiveHintOptions {
  status: string;
  duration: number;
  callback?: () => void;
  canclose: boolean;
}

interface MiniImagePreviewOptions {
  title: string;
  icon: string;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const MiniImagePreviewCtrl: {
  new (options: MiniImagePreviewOptions): {
    init(): void;
    render(pos: Position): void;
    destroy(): void;
  };
};

declare const LiveHint: {
  statusEnum: {
    warning: string;
    completed: string;
  };
  show(
    message: string,
    duration: number,
    callback?: () => void,
    options?: {
      canclose: boolean;
      status: string;
      onClose?: () => void;
    }
  ): void;
  hide(): void;
};

declare const HSFPConstants: {
  RequestType: {
    CreateNCPBgWallsInWFA: string;
    CreateWallFaceAssembly: string;
    UpdateDoorWindowInWFA: string;
    ReplaceProduct: string;
  };
  PluginType: {
    WallFaceAssembly: string;
  };
};

export class CmdApplyWallFaceAssembly extends HSApp.Cmd.Command {
  private readonly _meta: WallFaceAssemblyMeta;
  private _miniImagePreviewCtrl?: ReturnType<typeof MiniImagePreviewCtrl.prototype.constructor>;
  private readonly _canvas3d: unknown;
  private _lastFace3ds: Array<{ hideOutline(): void; drawOutline(): void; id: string }> = [];
  private readonly _validFaceTypes: HSCore.Model.WallFaceType[];
  private readonly _app: HSApp.App;

  constructor(meta: WallFaceAssemblyMeta) {
    super();
    this._meta = meta;
    this._app = HSApp.App.getApp();
    this._canvas3d = this._app.getActive3DView();
    this._validFaceTypes = [
      HSCore.Model.WallFaceType.left,
      HSCore.Model.WallFaceType.right
    ];
    this._app.selectionManager.unselectAll();
  }

  onReceive(eventType: string, eventData?: MouseEventData): boolean {
    if (!this._app.is3DView(this._app.activeView)) {
      return false;
    }

    switch (eventType) {
      case 'mousemove':
        return this._onMouseMove(eventData);
      case 'mouseout':
        return this._onMouseOut(eventData);
      case 'click':
        return this._onMouseClick(eventData);
      case 'keydown':
        if (eventData?.keyCode === 27) {
          this._onCancel();
        }
        return true;
      default:
        return super.onReceive(eventType, eventData);
    }
  }

  onCleanup(): void {
    if (this._lastFace3ds.length > 0) {
      this._lastFace3ds.forEach((face3d) => face3d.hideOutline());
      this._lastFace3ds.length = 0;
    }

    if (this._miniImagePreviewCtrl) {
      this._miniImagePreviewCtrl.destroy();
      this._miniImagePreviewCtrl = undefined;
    }
  }

  private _onCancel(): void {
    this.mgr.cancel();
  }

  private _onMouseClick(eventData?: MouseEventData): boolean {
    const entity = eventData?.entity;
    
    if (!this._isValidFace(entity)) {
      return true;
    }

    this._clearHighlight();

    const connectedFaces = HSCore.Util.SameLineFace.getSameLineConnectedFaces(entity);
    const sameLineFacesSet = new Set(connectedFaces);
    const sameLineFacesArray = Array.from(sameLineFacesSet);
    const validAreaOuter = WallFaceAssemblyUtil.getFacesVaildAreaOuter(
      entity,
      sameLineFacesArray,
      eventData.modelPos
    );

    if (validAreaOuter.length) {
      const clipTask = ClipTaskIntergration.getInstance();
      clipTask.listenClipTaskSignal(
        ResourceManager.getString('plugin_wallface_assembly_loading_tip')
      );
      clipTask.runClipTaskDefer(
        () => this._doRequest(entity, sameLineFacesArray, validAreaOuter),
        true
      );
    }

    return true;
  }

  private _onMouseMove(eventData?: MouseEventData): boolean {
    const entity = eventData?.entity;

    if (this._isValidFace(entity)) {
      const connectedFaces = HSCore.Util.SameLineFace.getSameLineConnectedFaces(entity);
      this._highlightFace(connectedFaces);
    }

    this._renderMiniImagePreview(eventData);
    return true;
  }

  private _onMouseOut(eventData?: MouseEventData): boolean {
    const entity = eventData?.entity;

    if (this._isValidFace(entity)) {
      this._clearHighlight();
    }

    this._renderMiniImagePreview(eventData);
    return true;
  }

  private _isCtrl(keyCode: number): boolean {
    if (HSApp.Util.UserAgent.isMAC()) {
      return (
        keyCode === HSApp.Util.Keyboard.KeyCodes.CTRL ||
        keyCode === HSApp.Util.Keyboard.KeyCodes.MAC_WK_CMD_LEFT ||
        keyCode === HSApp.Util.Keyboard.KeyCodes.MAC_WK_CMD_RIGHT
      );
    }
    return keyCode === HSApp.Util.Keyboard.KeyCodes.CTRL;
  }

  private _highlightFace(faces: HSCore.Model.Face[]): void {
    faces.forEach((face) => {
      const face3d = (this._canvas3d as any).displayList[face.id];
      if (!this._lastFace3ds.includes(face3d)) {
        face3d.drawOutline();
        this._lastFace3ds.push(face3d);
      }
    });
  }

  private _clearHighlight(): void {
    this._lastFace3ds.forEach((face3d) => face3d.hideOutline());
    this._lastFace3ds.length = 0;
  }

  private _isValidFace(entity?: HSCore.Model.Face): entity is HSCore.Model.Face {
    return (
      entity instanceof HSCore.Model.Face &&
      this._validFaceTypes.includes(HSCore.Util.Face.getFaceType(entity)) &&
      entity.surfaceObj.surface.isPlane()
    );
  }

  private _renderMiniImagePreview(eventData?: MouseEventData): void {
    if (!this._miniImagePreviewCtrl) {
      const title = ResourceManager.getString('plugin_wallface_assembly_apply_select_face_tip');
      const icon = this._meta.thumbnail;
      this._miniImagePreviewCtrl = new MiniImagePreviewCtrl({ title, icon });
      this._miniImagePreviewCtrl.init();
    }

    if (eventData?.event) {
      const mouseEvent = eventData.event;
      const position: Position = {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      };
      this._miniImagePreviewCtrl.render(position);
    }
  }

  private async _doRequest(
    targetFace: HSCore.Model.Face,
    sameLineFaces: HSCore.Model.Face[],
    validAreaOuter: unknown[]
  ): Promise<void> {
    const processedAssets = await WFAAssetUtil.handleAssemblyAssets(this._meta.assets);
    const { ncpBgWallAssets, windowAssets, doorAssets } = processedAssets;

    const targetContents = WallFaceAssemblyUtil.getTargetContents(sameLineFaces, validAreaOuter);
    const { ncpBgWalls, windows, doors } = targetContents;

    const matrix4 = WallFaceAssemblyUtil.getToTargetFaceMatrix4(
      this._meta,
      targetFace,
      validAreaOuter
    );

    const transManager = this.context.app.transManager;
    const session = transManager.startSession();

    const createdDoorWindows: unknown[] = [];

    if (windowAssets.length > 0) {
      const windows = this._createDoorWindow(windowAssets, targetContents.windows, sameLineFaces, matrix4);
      createdDoorWindows.push(...windows);
    }

    if (doorAssets.length > 0) {
      const doors = this._createDoorWindow(doorAssets, targetContents.doors, sameLineFaces, matrix4);
      createdDoorWindows.push(...doors);
    }

    const sizeLimitUnlock = HSApp.App.getApp().designMetadata.get('sizeLimitUnlock') as boolean;
    const bgWallMatrix4 = sizeLimitUnlock
      ? matrix4
      : WallFaceAssemblyUtil.getToTargetFaceMatrix4(this._meta, targetFace, validAreaOuter, !sizeLimitUnlock);

    const bgWallRequest = transManager.createRequest(HSFPConstants.RequestType.CreateNCPBgWallsInWFA, [
      {
        sameLineFaces,
        matrix4: bgWallMatrix4,
        assets: ncpBgWallAssets,
        contents: ncpBgWalls
      }
    ]);

    const bgWalls = transManager.commit(bgWallRequest);
    createdDoorWindows.push(...bgWalls);

    const assemblyParams = [targetFace, createdDoorWindows];
    const assemblyRequest = transManager.createRequest(
      HSFPConstants.RequestType.CreateWallFaceAssembly,
      assemblyParams
    );
    const assembly = transManager.commit(assemblyRequest);

    session.commit();

    this._app.selectionManager.select(assembly, {});

    const hasScaleChanged = !matrix4.getScale().equals(bgWallMatrix4.getScale());
    this._showLiveHint(hasScaleChanged);

    this.mgr.complete(this);
  }

  private _createDoorWindow(
    assets: Asset[],
    targetContents: unknown[],
    sameLineFaces: HSCore.Model.Face[],
    matrix4: unknown
  ): unknown[] {
    const assetCount = assets.length;
    const transManager = this._app.transManager;

    if (targetContents.length === 0) {
      const request = transManager.createRequest(HSFPConstants.RequestType.UpdateDoorWindowInWFA, [
        {
          sameLineFaces,
          matrix4,
          assets,
          contents: []
        }
      ]);
      return transManager.commit(request);
    }

    const replacedProducts: unknown[] = [];
    const usedAssets: Asset[] = [];

    targetContents.forEach((content, index) => {
      const asset = assets[index] ?? assets[assetCount - 1];
      const replaceRequest = transManager.createRequest(HSFPConstants.RequestType.ReplaceProduct, [
        content,
        asset.meta,
        { isSmartReplace: true }
      ]);
      const product = transManager.commit(replaceRequest);
      replacedProducts.push(product);
      usedAssets.push(asset);
    });

    const updateRequest = transManager.createRequest(HSFPConstants.RequestType.UpdateDoorWindowInWFA, [
      {
        matrix4,
        assets: usedAssets,
        contents: replacedProducts
      }
    ]);

    return transManager.commit(updateRequest);
  }

  private _showLiveHint(hasScaleChanged: boolean): void {
    const hintMap = new Map<string, LiveHintOptions>();

    if (hasScaleChanged) {
      hintMap.set('plugin_wallface_assembly_backgroundwall_limittip', {
        status: LiveHint.statusEnum.warning,
        duration: 5000,
        callback: undefined,
        canclose: true
      });
    }

    const SUB_TIP_KEY = 'plugin_wallface_assembly_select_sub_tip';
    const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.WallFaceAssembly);

    if (storage.get(SUB_TIP_KEY) !== true) {
      hintMap.set(SUB_TIP_KEY, {
        status: LiveHint.statusEnum.completed,
        duration: 5000,
        callback: () => {
          LiveHint.hide();
          storage.set(SUB_TIP_KEY, true);
        },
        canclose: true
      });
    }

    const showNextHint = (key: string): void => {
      const options = hintMap.get(key);
      if (!options) return;

      LiveHint.show(ResourceManager.getString(key), options.duration, options.callback, {
        canclose: options.canclose,
        status: options.status,
        onClose: () => {
          hintMap.delete(key);
          if (hintMap.size !== 0) {
            const nextKey = hintMap.keys().next().value;
            showNextHint(nextKey);
          }
        }
      });
    };

    showNextHint('plugin_wallface_assembly_backgroundwall_limittip');
  }
}