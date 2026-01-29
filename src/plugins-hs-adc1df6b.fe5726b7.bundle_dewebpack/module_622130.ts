import { ClipTaskIntergration } from './ClipTaskIntergration';

export default class UpdateRoofDirectionCommand extends HSApp.Cmd.Command {
    private _roof: any;
    private _request: any;
    private _curve: any;

    constructor(roof: any, curve: any) {
        super();
        this._roof = roof;
        this._curve = curve;
    }

    onExecute(): any {
        const app = HSApp.App.getApp();
        const transManager = app.transManager;
        
        this._request = transManager.createRequest(
            HSFPConstants.RequestType.UpdateRoofDirection,
            [this._roof, this._curve]
        );
        
        const result = this._request.result;
        const currentCommand = app.cmdManager.current;
        
        if (currentCommand?.type === HSFPConstants.CommandType.UpdateRoofDirection) {
            currentCommand.mgr.complete(currentCommand);
        }
        
        return result;
    }

    private _commitRequest(): void {
        if (this._request) {
            this.context.transManager.commit(this._request);
        }
    }

    onComplete(): void {
        const clipTaskIntegration = ClipTaskIntergration.getInstance();
        clipTaskIntegration.listenClipTaskSignal();
        clipTaskIntegration.runClipTaskDefer(
            () => this._commitRequest(),
            clipTaskIntegration.isNeedShowUI(this._roof)
        );
        
        super.onComplete?.([{}]);
    }

    getDescription(): string {
        return "修改参数化屋顶方向";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.HardOperation;
    }
}