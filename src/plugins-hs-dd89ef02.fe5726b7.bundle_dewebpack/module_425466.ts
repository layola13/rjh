import { HSConstants } from './635589';
import { HSApp } from './518193';

export const obstacleTypes: string[] = [
  HSConstants.ModelClass.NgCustomizedModel,
  HSConstants.ModelClass.CustomizedBackgroundWall,
  HSConstants.ModelClass.NgFlue,
  HSConstants.ModelClass.NgColumn,
  HSConstants.ModelClass.NgObstacle,
  HSConstants.ModelClass.NgBeam,
  HSConstants.ModelClass.CustomizedCeilingModel,
  HSConstants.ModelClass.CustomizedPlatform,
  HSConstants.ModelClass.NCustomizedBackgroundWall,
  HSConstants.ModelClass.NCustomizedCeilingModel,
  HSConstants.ModelClass.NCustomizedFeatureModel,
  HSConstants.ModelClass.NCustomizedModelLightBand,
  HSConstants.ModelClass.NCustomizedModelLightSlot,
  HSConstants.ModelClass.NCustomizedModelMolding,
  HSConstants.ModelClass.NCustomizedParametricCeiling,
  HSConstants.ModelClass.NCustomizedPlatform,
  HSConstants.ModelClass.NCustomizedSketchModel,
  HSConstants.ModelClass.NCustomizedParametricBackgroundWall,
  HSConstants.ModelClass.NCPBackgroundWallUnit,
];

/**
 * Command to clear hard decoration elements from the scene
 */
export default class ClearHardDecorationCommand extends HSApp.Cmd.Command {
  private readonly _app: typeof HSApp.App;
  private readonly _checkSelection: boolean;
  private readonly _currentRoom: unknown;
  private readonly _clearAll: boolean;
  private readonly needSession: boolean;

  constructor(
    checkSelection: boolean,
    currentRoom: unknown,
    clearAll: boolean = false,
    needSession: boolean = true
  ) {
    super();
    this._app = HSApp.App.getApp();
    this._checkSelection = checkSelection;
    this._currentRoom = currentRoom;
    this._clearAll = clearAll;
    this.needSession = needSession;
  }

  onExecute(): void {
    const transactionManager = this._app.transManager;
    const floorplan = this._app.floorplan;
    let contentToRemove: unknown[] = [];

    const layersToProcess = this._clearAll
      ? Object.values(floorplan.scene.layers)
      : [floorplan.scene.activeLayer];

    let targetRoom = this._currentRoom;
    if (this._checkSelection) {
      targetRoom = HSApp.Util.Room.getSelectedFloor();
    }

    const wallFaceAssemblies: unknown[] = [];

    layersToProcess.forEach((layer: any) => {
      const filteredContents = Object.values(layer.contents).filter((content: any) =>
        obstacleTypes.includes(content.Class)
      );
      contentToRemove = contentToRemove.concat(filteredContents);
      wallFaceAssemblies.push(...layer.wallFaceAssemblies);
    });

    const session = this.needSession ? transactionManager.startSession() : undefined;

    const removeWallFaceRequest = transactionManager.createRequest(
      HSFPConstants.RequestType.RemoveWallFaceAssembly,
      [wallFaceAssemblies, false]
    );
    transactionManager.commit(removeWallFaceRequest);

    const deleteContentsRequests = this.getDeleteContentsRequests(contentToRemove, targetRoom);
    const compositeContentRequest = transactionManager.createRequest(
      HSConstants.RequestType.Composite,
      [deleteContentsRequests]
    );
    transactionManager.commit(compositeContentRequest);

    const deleteFaceDecorationsRequests = this.getDeleteFaceDecorationsRequests(
      targetRoom,
      layersToProcess
    );
    const deleteDoorStoneRequests = this.getDeletedDoorStoneRequests(targetRoom, layersToProcess);
    const compositeDecorationRequest = transactionManager.createRequest(
      HSConstants.RequestType.Composite,
      [deleteFaceDecorationsRequests.concat(deleteDoorStoneRequests)]
    );
    transactionManager.commit(compositeDecorationRequest);

    session?.commit();
  }

  getDescription(): string {
    return '清空硬装';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.HardOperation;
  }

  isInteractive(): boolean {
    return true;
  }

  private getDeleteContentsRequests(contents: unknown[], room: unknown): unknown[] {
    // Implementation depends on external utility
    return [];
  }

  private getDeleteFaceDecorationsRequests(room: unknown, layers: unknown[]): unknown[] {
    // Implementation depends on external utility
    return [];
  }

  private getDeletedDoorStoneRequests(room: unknown, layers: unknown[]): unknown[] {
    // Implementation depends on external utility
    return [];
  }
}