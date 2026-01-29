import { HSApp } from './518193';
import { HSCore } from './635589';
import { ParametricopeingRequestType } from './88182';
import { IPropertybarEditParametricopeingHoldAction } from './900079';

export default class EditParametricOpeningCommand extends HSApp.Cmd.Command {
    private _parametricOpening: HSCore.Model.ParametricOpening;
    private _app: HSApp.App;

    constructor(parametricOpening: HSCore.Model.ParametricOpening) {
        super();
        this._parametricOpening = parametricOpening;
        this._app = HSApp.App.getApp();
    }

    onExecute(): void {
        // Implementation empty
    }

    onReceive(action: IPropertybarEditParametricopeingHoldAction, value: { value: boolean }): boolean {
        const session = this._app.transManager.startSession();
        
        const editRequest = this._app.transManager.createRequest(
            ParametricopeningRequestType.EditParametricOpeningHoleRequest,
            [this._parametricOpening]
        );
        editRequest.receive(action, value);

        if (action === IPropertybarEditParametricopeingHoldAction.SplitFaceSwitch) {
            if (value.value) {
                this._app.transManager.commit(editRequest);
                const splitRequest = this._app.transManager.createRequest(
                    HSFPConstants.RequestType.SplitParamOpening,
                    [this._parametricOpening]
                );
                this._app.transManager.commit(splitRequest);
            } else {
                const splitFaces = this._parametricOpening.splitFaceList;
                this._clearFaceMaterial(splitFaces);
                this._app.transManager.commit(editRequest);
            }
        } else if (action === IPropertybarEditParametricopeingHoldAction.AFaceMaterialSwitch) {
            this._app.transManager.commit(editRequest);
            if (!value.value) {
                const decorator = new HSCore.Model.ParametricOpeningDecorator(this._parametricOpening);
                const aFaces = decorator.getSplitABFacePairs().aFaces;
                this._clearFaceMaterial(aFaces);
            }
        } else if (action === IPropertybarEditParametricopeingHoldAction.BFaceMaterialSwitch) {
            this._app.transManager.commit(editRequest);
            if (!value.value) {
                const decorator = new HSCore.Model.ParametricOpeningDecorator(this._parametricOpening);
                const bFaces = decorator.getSplitABFacePairs().bFaces;
                this._clearFaceMaterial(bFaces);
            }
        }

        session.commit();
        this._app.cmdManager.complete(this);
        
        return super.onReceive?.(action, value) ?? true;
    }

    private _clearFaceMaterial = (faces: HSCore.Model.Face[]): void => {
        const clearMaterialMsg = HSApp.PaintPluginHelper.Enum.PaintCmdMessageEnum.clearMaterial;
        
        faces.forEach((face) => {
            const faceType = HSCore.Util.Face.getFaceType(face);
            const request = this._app.transManager.createRequest(
                HSFPConstants.RequestType.EditMaterial,
                [face, faceType, { msg: clearMaterialMsg }]
            );
            this._app.transManager.commit(request);
        });
    };
}