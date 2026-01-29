import { PerformanceLogCategory, PerformanceOperationTypes } from './constants';

interface RelateContents {
  toBeReassign: any[];
  toBeRemoved: any[];
}

interface ExecuteParams {
  source?: string;
}

interface ReceiveEventData {
  room?: any;
}

interface CurrentParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

export class CmdDeleteNGWall extends HSApp.Cmd.Command {
  private wall: any;
  private _perfLog: any;
  private room?: any;
  private partnerRoom?: any;

  constructor(wall: any) {
    super();
    this.wall = wall;
    this._perfLog = log.logger(PerformanceLogCategory.Operation);
  }

  getRelateContents(): RelateContents {
    const toBeRemoved: any[] = [];
    const toBeReassign: any[] = [];

    this.wall.forEachContent((content: any) => {
      if (!content || !content.instanceOf(HSConstants.ModelClass.NgContent)) {
        return;
      }

      if (content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
        return;
      }

      if (
        content.instanceOf(HSConstants.ModelClass.NgOpening) ||
        content.instanceOf(HSConstants.ModelClass.NgCustomizedModel) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_WallAttached) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParametricOpening)
      ) {
        toBeRemoved.push(content);
      } else {
        toBeReassign.push(content);
      }
    });

    this.wall.forEachOpening((opening: any) => {
      const uniqueParent = opening.getUniqueParent();
      if (
        opening.instanceOf(HSConstants.ModelClass.DHole) &&
        uniqueParent &&
        uniqueParent.instanceOf(HSConstants.ModelClass.DAssembly)
      ) {
        toBeRemoved.push(uniqueParent);
      }
    });

    const associatedCornerWindows = HSCore.Util.Wall.getAssociatedCornerWindow(this.wall);
    if (associatedCornerWindows?.length > 0) {
      associatedCornerWindows.forEach((window: any) => {
        toBeRemoved.push(window);
      });
    }

    return {
      toBeReassign,
      toBeRemoved
    };
  }

  onCleanup(params?: ExecuteParams): void {
    if (params?.source === 'ESC') {
      this.mgr.cancel();
    }
  }

  private _onComplete(): void {
    this.mgr.complete(this);
  }

  onExecute(): void {
    const mixPaintUtil = HSApp.PaintPluginHelper?.Util?.MixPaintUtil;
    if (mixPaintUtil && !mixPaintUtil.disconnectFaceGroupWithPrompt([this.wall], undefined, this._executeCmd.bind(this))) {
      return;
    }
    this._executeCmd();
  }

  private _executeCmd(): void {
    this._perfLog.time(PerformanceOperationTypes.WallRemoved);

    const { transManager, selectionManager } = this.context;

    selectionManager.unselect(this.wall);
    this.wall.setFlagOff(HSCore.Model.WallFlagEnum.hoverOn);

    const relateContents = this.getRelateContents();
    const requests: any[] = [];

    relateContents.toBeRemoved.forEach((item: any) => {
      if (item.instanceOf(HSConstants.ModelClass.NgGroup)) {
        const request = transManager.createRequest(HSFPConstants.RequestType.DeleteAssembly, [item]);
        requests.push(request);
      } else {
        let shouldDelete: boolean | undefined;
        if (item instanceof HSCore.Model.Opening || item instanceof HSCore.Model.ParametricOpening) {
          shouldDelete = false;
        }
        const request = transManager.createRequest(HSFPConstants.RequestType.DeleteProduct, [item, shouldDelete]);
        requests.push(request);
      }
    });

    const compositeRequest = transManager.createRequest(HSConstants.RequestType.Composite, [requests]);
    const session = transManager.startSession();
    transManager.commit(compositeRequest);

    const deleteWallRequest = transManager.createRequest(HSFPConstants.RequestType.DeleteTGWall, [this.wall]);
    transManager.commit(deleteWallRequest);

    session.commit();
    this._onComplete();
    this._perfLog.timeEnd(PerformanceOperationTypes.WallRemoved, true);
  }

  onReceive(event: string, data: ReceiveEventData): any {
    if (event === 'gizmo.mouseup') {
      const eventRoom = data.room;
      if (!eventRoom) {
        return;
      }

      assert(eventRoom === this.room || eventRoom === this.partnerRoom);

      const roomToMerge = eventRoom === this.room ? this.partnerRoom : this.room;
      HSCore.Util.Room.mergeRooms(eventRoom, [roomToMerge]);
      this._onComplete();
      return;
    }

    return super.onReceive?.(event, data);
  }

  canUndoRedo(): boolean {
    return false;
  }

  isInteractive(): boolean {
    return true;
  }

  getCurrentParams(): CurrentParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: '墙体操作',
      clicksRatio: {
        id: 'deleteWall',
        name: '删除墙'
      }
    };
  }

  getDescription(): string {
    return '删除墙体';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}