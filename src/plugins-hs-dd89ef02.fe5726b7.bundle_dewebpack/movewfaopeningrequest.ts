import { Vector2 } from './Vector2';
import { HSCore } from './HSCore';
import { HSDevice } from './HSDevice';
import { HSApp } from './HSApp';

/**
 * Request handler for moving wall face openings
 */
export class MoveWFAOpeningRequest extends MoveOpeningRequest {
    private _moveDir?: Vector2;
    private _wallFace?: HSCore.Model.WallFace;
    private _mouseStart?: { x: number; y: number };
    private _openingStart?: { x: number; y: number };
    private _opening?: HSCore.Model.Opening | HSCore.Model.DOpening;
    private _followMouse?: boolean;
    private _preStatus?: {
        hostId: string;
        opening: Array<{
            viewObject: HSCore.Model.Opening;
            isInvalid: boolean;
        }>;
    };
    
    public snapHelper?: HSCore.Util.OpeningSnapHelper;

    constructor(opening: HSCore.Model.Opening | HSCore.Model.DOpening, wallFace?: HSCore.Model.WallFace) {
        super(opening);
        
        this._wallFace = wallFace;
        
        if (wallFace) {
            const master = wallFace.getMaster();
            if (master instanceof HSCore.Model.Wall) {
                this._moveDir = new Vector2(master.direction).normalize();
            }
        }
    }

    public onReceive(
        event: HSDevice.MouseEvents,
        eventData: {
            position?: { x: number; y: number };
            pickResults?: Array<{ viewObject: { entity: unknown } }>;
            ignoreValidate?: boolean;
        }
    ): boolean {
        if (!eventData.position) {
            return true;
        }

        if (event === HSDevice.MouseEvents.DragStart) {
            this._mouseStart = this.getMousePos(eventData);
            return true;
        }

        if (event === HSDevice.MouseEvents.Move || event === HSDevice.MouseEvents.DragMove) {
            this.restoreScale();

            const currentMousePos = this.getMousePos(eventData);
            let targetX: number;
            let targetY: number;

            if (this._followMouse) {
                targetX = currentMousePos.x;
                targetY = currentMousePos.y;
            } else {
                let delta = new Vector2(
                    currentMousePos.x - this._mouseStart!.x,
                    currentMousePos.y - this._mouseStart!.y
                );

                if (this._moveDir) {
                    delta = this._moveDir.multiplied(delta.dot(this._moveDir));
                }

                targetX = this._openingStart!.x + delta.x;
                targetY = this._openingStart!.y + delta.y;
            }

            if (this._opening instanceof HSCore.Model.DOpening) {
                this._opening.__x = targetX;
                this._opening.__y = targetY;
                this._opening.dirtyPosition();
            } else {
                this._opening!.x = targetX;
                this._opening!.y = targetY;
            }

            if (this.snapHelper instanceof HSCore.Util.OpeningSnapHelper) {
                const isOverWallFace = this._wallFace && eventData.pickResults?.some(
                    (result) => result.viewObject.entity === this._wallFace
                );
                
                if (!this._wallFace || !isOverWallFace) {
                    this.snapHelper.snapToWall();
                }
            }

            if (this._opening instanceof HSCore.Model.Opening) {
                HSCore.Util.Opening.resizeContent(this._opening);
            }

            if (this._preStatus && this._opening!.host && this._opening!.host.id !== this._preStatus.hostId) {
                this._preStatus.opening.forEach((item) => {
                    item.viewObject.signalValidityChanged.dispatch(item.isInvalid);
                });
                this._preStatus = undefined;
            }

            if (!eventData.ignoreValidate && this._opening!.host) {
                const activeView = HSApp.App.getApp().getActive2DView();
                
                if (!this._preStatus && activeView instanceof HSApp.View.Base.CanvasBase) {
                    const layer = HSCore.Util.Layer.getEntityLayer(this._opening!);
                    
                    if (layer) {
                        const allOpenings = [
                            ...Object.values(layer.openings),
                            ...Object.values(layer.parametricOpenings)
                        ];

                        this._preStatus = {
                            hostId: this._opening!.host.id,
                            opening: allOpenings
                                .filter((opening) => 
                                    opening.host === this._opening!.host && 
                                    opening !== this._opening
                                )
                                .map((opening) => ({
                                    viewObject: opening,
                                    isInvalid: activeView.displayList[opening.id].isInValid
                                }))
                        };
                    }
                }

                this._validate();
            }

            return true;
        }

        return super.onReceive(event, eventData);
    }

    private getMousePos(eventData: { position: { x: number; y: number } }): { x: number; y: number } {
        // Implementation provided by parent class or needs to be defined
        throw new Error('Method getMousePos must be implemented');
    }

    private restoreScale(): void {
        // Implementation provided by parent class or needs to be defined
        throw new Error('Method restoreScale must be implemented');
    }

    private _validate(): void {
        // Implementation needs to be defined
        throw new Error('Method _validate must be implemented');
    }
}

// Base class stub (would be imported from actual module)
class MoveOpeningRequest {
    constructor(opening: unknown) {}
    
    protected onReceive(event: unknown, eventData: unknown): boolean {
        return false;
    }
}