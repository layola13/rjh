class ChangeParametricStairPropertyCmd extends HSApp.Cmd.Command {
    private _request: any;
    private _stair: any;
    private _propertyName: string;
    private _propertyValue: any;

    constructor(stair: any, propertyName: string, propertyValue: any) {
        super();
        this._stair = stair;
        this._propertyName = propertyName;
        this._propertyValue = propertyValue;
    }

    onExecute(): any {
        const app = HSApp.App.getApp();
        const transManager = app.transManager;
        
        this._request = transManager.createRequest(
            HSFPConstants.RequestType.ChangeParametricStairProperty,
            [this._stair, this._propertyName, this._propertyValue]
        );
        
        transManager.commit(this._request);
        
        const result = this._request.result;
        const currentCmd = app.cmdManager.current;
        
        if (
            currentCmd &&
            currentCmd.type &&
            currentCmd.type === HSFPConstants.CommandType.ChangeParametricStairProperty &&
            currentCmd.mgr
        ) {
            currentCmd.mgr.complete(currentCmd);
        }
        
        return result;
    }

    getDescription(): string {
        return "修改参数化楼梯参数";
    }

    getCategory(): any {
        return HSFPConstants.LogGroupTypes.HardOperation;
    }
}

export { ChangeParametricStairPropertyCmd };