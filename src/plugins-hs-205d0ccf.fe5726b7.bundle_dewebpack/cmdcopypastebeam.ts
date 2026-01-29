class CmdCopyPasteBeam extends HSApp.Cmd.Command {
  private beam: any;
  private _request: any;

  constructor(options: { selectedContents: any[] }) {
    super();
    this.beam = options.selectedContents[0];
  }

  onExecute(): void {
    const transactionManager = this.context.transManager;
    this._request = transactionManager.createRequest(
      HSFPConstants.RequestType.CopyPasteBeam,
      [this.beam]
    );
    const result = transactionManager.commit(this._request);
    this.output = [result];
    this.mgr.complete(this);
  }

  canUndoRedo(): boolean {
    return false;
  }

  canSuspend(): boolean {
    return false;
  }

  getDescription(): string {
    return "复制粘贴结构体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}

export { CmdCopyPasteBeam };