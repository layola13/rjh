import { HSCore } from './HSCore';

/**
 * Transaction for toggling entity visibility state
 */
export default class ShowHideContentTransaction extends HSCore.Transaction.Common.StateRequest {
    private _content: HSCore.Model.Entity;
    private _show: boolean;
    private _dirtyFloors: Set<HSCore.Model.Floor>;

    constructor(content: HSCore.Model.Entity, show: boolean) {
        super();
        this._content = content;
        this._show = show;
        this._dirtyFloors = new Set();
    }

    get show(): boolean {
        return this._show;
    }

    onCommit(): void {
        const isCurrentlyVisible = this._content.isFlagOff(HSCore.Model.EntityFlagEnum.hidden);
        
        if (isCurrentlyVisible !== this._show) {
            const entity = this._content;
            
            if (this._show) {
                entity.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
            } else {
                entity.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
                if (!entity.group) {
                    HSApp.Selection.Manager.unselect(entity);
                }
            }
            
            this._onFlagChanged();
            super.onCommit([]);
        }
    }

    private _onFlagChanged(): void {
        const entity = this._content;

        if (entity instanceof HSCore.Model.Wall) {
            const parent = entity.getUniqueParent();
            if (!(parent instanceof HSCore.Model.Layer)) return;
            HSCore.Util.TgWall.updateWallsFaceState(parent, [entity]);
        } else if (entity instanceof HSCore.Model.Opening || entity instanceof HSCore.Model.ParametricOpening) {
            const isHidden = entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden);
            
            entity.faceList.forEach(face => {
                if (isHidden) {
                    face.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
                } else {
                    face.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
                }
            });

            if (entity instanceof HSCore.Model.Opening || entity instanceof HSCore.Model.ParametricDoor) {
                entity.getRefreshFloors().forEach(floor => {
                    this._dirtyFloors.add(floor);
                });
            }
        } else if (entity instanceof HSCore.Model.NCustomizedStructure && !entity.isWallPart()) {
            const allFaces = [...entity.faceList, ...entity.auxFaceList];
            const isHidden = entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden);
            
            allFaces.forEach(face => {
                if (face.getMaster() === entity) {
                    if (isHidden) {
                        face.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
                    } else {
                        face.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
                    }
                }
            });
        } else if (entity instanceof HSCore.Model.NCustomizedParametricModel) {
            if (entity.isFlagOff(HSCore.Model.EntityFlagEnum.hidden)) {
                entity.dirtyChildModels();
            }

            if (entity instanceof HSCore.Model.NCustomizedParametricRoof) {
                const isHidden = entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden);
                
                if (isHidden) {
                    entity.openings.forEach(opening => 
                        opening.setFlagOn(HSCore.Model.EntityFlagEnum.hidden)
                    );
                    entity.parametricOpenings.forEach(opening => 
                        opening.setFlagOn(HSCore.Model.EntityFlagEnum.hidden)
                    );
                } else {
                    entity.openings.forEach(opening => 
                        opening.setFlagOff(HSCore.Model.EntityFlagEnum.hidden)
                    );
                    entity.parametricOpenings.forEach(opening => 
                        opening.setFlagOff(HSCore.Model.EntityFlagEnum.hidden)
                    );
                }
                
                entity.dirtyClipGeometry();
                entity.dirtyFaceMaterials();
            }
        }

        this._dirtyFloors.forEach(floor => floor.dirtyGeometry());
    }

    onUndo(): void {
        super.onUndo([]);
        this._onFlagChanged();
        this._dirtyFloors.forEach(floor => floor.dirtyGeometry());
    }

    onRedo(): void {
        super.onRedo([]);
        this._onFlagChanged();
        this._dirtyFloors.forEach(floor => floor.dirtyGeometry());
    }

    canTransactField(): boolean {
        return true;
    }

    getDescription(): string {
        return "显示隐藏物品";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.ContentOperation;
    }
}