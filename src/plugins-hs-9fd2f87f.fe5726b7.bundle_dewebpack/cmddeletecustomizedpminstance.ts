class CmdDeleteCustomizedPMInstance extends HSApp.Cmd.Command {
    private readonly _instances: unknown[];
    private _request?: unknown;

    constructor(instances: unknown[]) {
        super();
        this._instances = instances;
    }

    onExecute(): void {
        const transactionManager = this.context.transManager;
        this._request = transactionManager.createRequest(
            HSFPConstants.RequestType.DeleteCustomizedPMInstanceModel,
            [this._instances]
        );
        transactionManager.commit(this._request);
        this.mgr?.complete(this);
    }

    getDescription(): string {
        return "删除自由造型模型";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.ContentOperation;
    }
}

export { CmdDeleteCustomizedPMInstance };