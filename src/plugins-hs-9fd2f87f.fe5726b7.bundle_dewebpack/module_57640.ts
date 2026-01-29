import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';
import { LiveHint } from './LiveHint';
import { ResourceManager } from './ResourceManager';

/**
 * Command to apply door stone material to all doors in the floorplan
 */
export default class ApplyDoorStoneToAllDoorsCommand extends HSApp.Cmd.CompositeCommand {
    private entity: HSCore.Model.Door;
    private app: HSApp.App;

    constructor(entity: HSCore.Model.Door) {
        super();
        this.entity = entity;
        this.app = HSApp.App.getApp();
    }

    /**
     * Execute the command to apply door stone to all other doors
     */
    onExecute(): void {
        const floorplan = this.app.floorplan;
        const doors: HSCore.Model.Door[] = [];
        const hostFaces: unknown[] = [];

        floorplan.forEachOpening((opening: HSCore.Model.Opening) => {
            if (opening instanceof HSCore.Model.Door && opening.id !== this.entity.id) {
                doors.push(opening);
                hostFaces.push(opening.hostFace);
            }
        });

        const disconnected = HSApp.PaintPluginHelper.Util.MixPaintUtil.disconnectFaceGroupWithPrompt(
            hostFaces,
            {
                type: 'doorstone',
                includeWallFaceGroup: true,
                includeFloorGroup: true
            },
            this.applyRequest.bind(this),
            doors
        );

        if (!disconnected) {
            this.applyRequest(doors);
        }
    }

    /**
     * Apply the door stone material to the specified doors
     */
    private applyRequest(doors: HSCore.Model.Door[]): void {
        const material = this.entity.bottomFaceMaterial.clone();
        const request = this.app.transManager.createRequest(
            HSFPConstants.RequestType.ApplyDoorStoneToAllDoorsRequest,
            [doors, material]
        );

        this.app.transManager.commit(request);

        const HINT_DURATION_MS = 3000;
        LiveHint.show(
            ResourceManager.getString('plugin_contentstyler_door_stone_applied_all'),
            HINT_DURATION_MS,
            undefined,
            { canclose: true }
        );
    }

    canUndoRedo(): boolean {
        return false;
    }

    getDescription(): string {
        return '过门石应用到其他门';
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.ContentOperation;
    }
}