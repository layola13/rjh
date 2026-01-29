class CmdCopyPasteStructure extends HSApp.Cmd.Command {
    private structure: any;
    private transManager: any;
    private _request: any;

    constructor(params: { selectedContents: any[] }) {
        super();
        this.structure = params.selectedContents[0];
    }

    onExecute(): void {
        this.transManager = this.context.transManager;
        this._request = this.transManager.createRequest(
            HSFPConstants.RequestType.CopyPasteStructure,
            [this.structure]
        );
        this.mgr.complete(this);
    }

    onComplete(): void {
        const result = this.transManager.commit(this._request);
        this.output = [result];
    }

    getDescription(): string {
        return "复制粘贴结构体";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.ContentOperation;
    }
}

export { CmdCopyPasteStructure };