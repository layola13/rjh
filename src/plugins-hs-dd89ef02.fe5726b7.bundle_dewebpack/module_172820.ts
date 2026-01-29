import { HSApp } from './518193';
import { HSConstants } from './635589';
import { obstacleTypes } from './425466';

/**
 * Command to clear furniture from the floor plan
 */
export default class ClearFurnitureCommand extends HSApp.Cmd.Command {
  private _app: any;
  private _checkSelection: boolean;
  private _currentRoom: any;
  private _clearAll: boolean;
  private needSession: boolean;

  constructor(
    checkSelection: boolean,
    currentRoom: any,
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
    const transManager = this._app.transManager;
    const floorplan = this._app.floorplan;
    let contentItems: any[] = [];

    const windowAndDoorClasses = [
      HSConstants.ModelClass.NgCornerWindow,
      HSConstants.ModelClass.NgBayWindow,
      HSConstants.ModelClass.NgCornerFlatWindow,
      HSConstants.ModelClass.NgPOrdinaryWindow,
      HSConstants.ModelClass.NgPSlidingDoor,
      HSConstants.ModelClass.NgPSlidingDoorLeaf
    ];

    const layers = this._clearAll
      ? Object.values(floorplan.scene.layers)
      : [floorplan.scene.activeLayer];

    let targetRoom = this._currentRoom;
    if (this._checkSelection) {
      targetRoom = HSApp.Util.Room.getSelectedFloor();
    }

    const excludedClasses = windowAndDoorClasses.concat(obstacleTypes);

    layers.forEach((layer: any) => {
      const filteredContents = Object.values(layer.contents).filter((content: any) => {
        return !content.group && !excludedClasses.includes(content.Class);
      });
      contentItems = contentItems.concat(filteredContents, Object.values(layer.groups));
    });

    const session = this.needSession ? transManager.startSession() : undefined;
    const deleteRequest = getDeleteContentsRequests(contentItems, targetRoom);
    const compositeRequest = transManager.createRequest(
      HSConstants.RequestType.Composite,
      [deleteRequest]
    );
    
    transManager.commit(compositeRequest);
    session?.commit();
  }

  getDescription(): string {
    return "清空家具";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  isInteractive(): boolean {
    return true;
  }
}

function getDeleteContentsRequests(contents: any[], room: any): any {
  // Implementation placeholder - this function was imported from module 829660
  // Actual implementation would be in that module
  return {};
}