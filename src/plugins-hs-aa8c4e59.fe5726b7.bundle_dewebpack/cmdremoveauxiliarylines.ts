interface RemoveAuxiliaryLinesParams {
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
  isClearAll: boolean;
}

type EntityParam = unknown | unknown[];

export class CmdRemoveAuxiliaryLines extends HSApp.Cmd.Command {
  private _param: EntityParam;
  private entitys: unknown[];

  constructor(param: EntityParam) {
    super();
    this._param = param;
    this.entitys = Array.isArray(param) ? param : [param];
  }

  onExecute(): void {
    const transactionManager = this.context.transManager;
    const request = transactionManager.createRequest(
      HSFPConstants.RequestType.RemoveAuxiliaryLines,
      [this.entitys]
    );
    transactionManager.commit(request);
    this.mgr.complete(this);
  }

  getDescription(): string {
    return "删除辅助线";
  }

  isInteractive(): boolean {
    return false;
  }

  getCurrentParams(): RemoveAuxiliaryLinesParams {
    return {
      activeSection: HSFPConstants.LogGroupTypes.WallOperation,
      activeSectionName: "墙体操作",
      clicksRatio: {
        id: "removeAuxiliaryLine",
        name: "删除户型辅助线"
      },
      isClearAll: Array.isArray(this._param)
    };
  }
}