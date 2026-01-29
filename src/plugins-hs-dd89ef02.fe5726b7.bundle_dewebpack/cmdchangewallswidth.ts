class CmdChangeWallsWidth extends HSApp.Cmd.Command {
    private _walls: unknown;
    private _request: unknown;
    private transMgr: unknown;

    constructor(walls: unknown) {
        super();
        this._walls = walls;
        this.transMgr = HSApp.App.getApp().transManager;
        this._request = this.transMgr.createRequest(
            HSFPConstants.RequestType.ChangeWallsWidth,
            [this._walls]
        );
    }

    onReceive(event: string, params: Record<string, unknown> = {}): boolean {
        switch (event) {
            case "sliderdragmove":
                this._request.receive("change", params);
                break;
            case "sliderdragend":
                this.mgr.complete(this);
                break;
            default:
                return super.onReceive(event, params);
        }
        return true;
    }

    onComplete(): void {
        this.transMgr.commit(this._request);
    }

    getCurrentParams(): {
        activeSection: string;
        activeSectionName: string;
        clicksRatio: { id: string; name: string };
    } {
        return {
            activeSection: HSFPConstants.LogGroupTypes.WallOperation,
            activeSectionName: "墙体操作",
            clicksRatio: {
                id: "changeWallsWidth",
                name: "墙体厚度设置"
            }
        };
    }

    isInteractive(): boolean {
        return true;
    }

    getDescription(): string {
        return "修改墙体厚度";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.WallOperation;
    }
}

export { CmdChangeWallsWidth };