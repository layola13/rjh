import { Command } from 'HSApp/Cmd/Command';
import { TransactionManager, TransactionRequest } from 'HSApp/TransactionManager';
import { MitreMolding } from 'HSApp/MitreMolding';

/**
 * Command for deleting mitre molding
 */
export class CmdDeleteMitreMolding extends Command {
    private mitre: MitreMolding;
    private transMgr: TransactionManager;
    private _request?: TransactionRequest;

    constructor(mitre: MitreMolding) {
        super();
        this.mitre = mitre;
        this.transMgr = HSApp.App.getApp().transManager;
    }

    onExecute(): void {
        this._request = this.transMgr.createRequest(
            HSFPConstants.RequestType.DeleteMitreMolding,
            [this.mitre]
        );
    }

    onReceive(response: unknown, data: unknown): boolean {
        return super.onReceive(response, data);
    }

    onComplete(): void {
        if (this._request) {
            this.transMgr.commit(this._request);
        }
    }

    getDescription(): string {
        return "删除阳角线";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.FaceOperation;
    }
}