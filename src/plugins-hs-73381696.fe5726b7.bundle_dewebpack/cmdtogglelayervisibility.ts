class CmdToggleLayerVisibility extends HSApp.Cmd.Command {
    private layer: unknown;
    private visible: boolean;
    private _request: unknown;

    constructor(layer: unknown, visible: boolean = true) {
        super();
        this.layer = layer;
        this.visible = visible;
    }

    onExecute(): void {
        this._request = this.context.transManager.createRequest(
            HSFPConstants.RequestType.ToggleLayerVisibility,
            [this.layer, this.visible]
        );
        this.context.transManager.commit(this._request);
        this.mgr.complete(this);
    }

    onCleanup(): void {
        // Cleanup logic if needed
    }

    canUndoRedo(): boolean {
        return true;
    }

    getDescription(): string {
        return "多层切换到楼层-显示楼层操作";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.WallOperation;
    }
}

export { CmdToggleLayerVisibility };