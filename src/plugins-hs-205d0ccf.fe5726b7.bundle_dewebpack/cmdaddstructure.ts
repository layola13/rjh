class CmdAddStructure extends HSApp.Cmd.Command {
    private structure: unknown;
    private transMgr: TransactionManager;
    private _request: TransactionRequest | null = null;

    constructor(structure: unknown) {
        super();
        this.structure = structure;
        this.transMgr = HSApp.App.getApp().transManager;
    }

    onExecute(options: unknown): void {
        this._request = this.transMgr.createRequest(
            HSFPConstants.RequestType.AddStructure,
            [this.structure, options]
        );
    }

    onComplete(): void {
        if (this._request) {
            this.transMgr.commit(this._request);
        }
    }

    onCancel(): void {
        if (this._request) {
            this.transMgr.abort(this._request);
        }
    }
}

export { CmdAddStructure };