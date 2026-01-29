import { HSApp } from './HSApp';
import { HSConstants } from './HSConstants';

interface Layer {
  contents: Record<string, ModelContent>;
  wallFaceAssemblies: WallFaceAssembly[];
}

interface ModelContent {
  Class: string;
}

interface WallFaceAssembly {
  // Define properties as needed
}

interface Scene {
  layers: Record<string, Layer>;
  activeLayer: Layer;
  getCustomizedPms(): CustomizedPM[];
}

interface Floorplan {
  scene: Scene;
}

interface TransactionManager {
  startSession(): Session | undefined;
  createRequest(type: string, args: unknown[]): Request;
  commit(request: Request): void;
}

interface Session {
  commit(): void;
}

interface Request {
  // Define properties as needed
}

interface App {
  transManager: TransactionManager;
  floorplan: Floorplan;
}

interface CustomizedPM {
  // Define properties as needed
}

const EXCLUDED_WINDOW_CLASSES = [
  HSConstants.ModelClass.NgCornerWindow,
  HSConstants.ModelClass.NgBayWindow,
  HSConstants.ModelClass.NgCornerFlatWindow,
  HSConstants.ModelClass.NgPOrdinaryWindow,
  HSConstants.ModelClass.NgPSlidingDoor,
  HSConstants.ModelClass.NgPSlidingDoorLeaf
];

class ClearDecorationCommand extends HSApp.Cmd.Command {
  private readonly _app: App;
  private readonly _checkSelection: boolean;
  private readonly _currentRoom: unknown;
  private readonly _clearAll: boolean;
  private readonly needSession: boolean;

  constructor(
    checkSelection: boolean,
    currentRoom: unknown,
    needSession: boolean = true,
    clearAll: boolean = false
  ) {
    super();
    this._app = HSApp.App.getApp();
    this._checkSelection = checkSelection;
    this._currentRoom = currentRoom;
    this._clearAll = clearAll;
    this.needSession = needSession;
  }

  onExecute(): void {
    let contentsToDelete: ModelContent[] = [];
    const transManager = this._app.transManager;
    const floorplan = this._app.floorplan;
    const layersToProcess = this._clearAll 
      ? Object.values(floorplan.scene.layers) 
      : [floorplan.scene.activeLayer];
    
    let targetRoom = this._currentRoom;
    if (this._checkSelection) {
      targetRoom = HSApp.Util.Room.getSelectedFloor();
    }

    const customizedPms = floorplan.scene.getCustomizedPms();
    const wallFaceAssembliesToRemove: WallFaceAssembly[] = [];

    layersToProcess.forEach((layer) => {
      const filteredContents = Object.values(layer.contents).filter(
        (content) => !EXCLUDED_WINDOW_CLASSES.includes(content.Class)
      );
      contentsToDelete = contentsToDelete.concat(filteredContents);
      wallFaceAssembliesToRemove.push(...layer.wallFaceAssemblies);
    });

    const session = this.needSession ? transManager.startSession() : undefined;

    const removeWallFaceRequest = transManager.createRequest(
      HSFPConstants.RequestType.RemoveWallFaceAssembly,
      [wallFaceAssembliesToRemove, false]
    );
    transManager.commit(removeWallFaceRequest);

    const deleteContentsRequests = this.getDeleteContentsRequests(contentsToDelete, targetRoom);
    const deleteCustomizedPMRequests = this.getDeleteCustomizedPMModelsRequests(customizedPms, targetRoom);
    const combinedRequests = deleteContentsRequests.concat(deleteCustomizedPMRequests);
    const compositeRequest = transManager.createRequest(
      HSConstants.RequestType.Composite,
      [combinedRequests]
    );
    transManager.commit(compositeRequest);

    const deleteFaceDecorationsRequests = this.getDeleteFaceDecorationsRequests(targetRoom, layersToProcess);
    const deleteDoorStoneRequests = this.getDeletedDoorStoneRequests(targetRoom, layersToProcess);
    const decorationCompositeRequest = transManager.createRequest(
      HSConstants.RequestType.Composite,
      [deleteFaceDecorationsRequests.concat(deleteDoorStoneRequests)]
    );
    transManager.commit(decorationCompositeRequest);

    session?.commit();
  }

  getDescription(): string {
    return "清空装修";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  isInteractive(): boolean {
    return true;
  }

  private getDeleteContentsRequests(contents: ModelContent[], room: unknown): Request[] {
    // Implementation from imported utility
    return [];
  }

  private getDeleteCustomizedPMModelsRequests(pms: CustomizedPM[], room: unknown): Request[] {
    // Implementation from imported utility
    return [];
  }

  private getDeleteFaceDecorationsRequests(room: unknown, layers: Layer[]): Request[] {
    // Implementation from imported utility
    return [];
  }

  private getDeletedDoorStoneRequests(room: unknown, layers: Layer[]): Request[] {
    // Implementation from imported utility
    return [];
  }
}

export default ClearDecorationCommand;