import { HSApp } from './518193';

export class CmdResizeBeam extends HSApp.Cmd.Command {
    private beam: any;
    private transMgr: any;
    private _draggingGizmo: any;
    private _request: any;

    constructor(beam: any, draggingGizmo: any) {
        super();
        this.beam = beam;
        this.transMgr = HSApp.App.getApp().transManager;
        this._draggingGizmo = draggingGizmo;
        this._request = undefined;
    }

    onExecute(): void {
        this._request = this.transMgr.createRequest(
            HSFPConstants.RequestType.ResizeBeam,
            [this.beam, this._draggingGizmo]
        );
    }

    onReceive(event: string, data: any): boolean {
        switch (event) {
            case "dragmove":
                return !!data.offset && !!this._request?.receive(event, data);
            
            case "dragend":
                this._onComplete();
                return true;
            
            default:
                return super.onReceive(event, data);
        }
    }

    private _onComplete(): void {
        if (this._request) {
            this.transMgr.commit(this._request);
        }
        this.mgr.complete(this);
    }
}