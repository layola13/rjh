export default class ChangeArcWallRadiusCommand extends HSApp.Cmd.Command {
    private entity: any;
    private wall: any;
    private param: ChangeArcWallRadiusParams;

    constructor(entity: any, param: ChangeArcWallRadiusParams) {
        super(entity, param);
        this.entity = entity;
        this.wall = entity;
        this.param = param;
    }

    private getCenterWallSagitta(wall: Wall, radius: number): number | null {
        const halfDistance = 0.5 * HSCore.Util.Math.getDistance(wall.from, wall.to);
        
        const cubicCoeffA = radius * radius;
        const cubicCoeffB = -(radius + 2 * (0.5 * wall.width)) * radius;
        const cubicCoeffC = halfDistance * halfDistance;
        const cubicCoeffD = -cubicCoeffC;
        
        const roots = HSCore.Util.Math.cubicRoots(
            cubicCoeffA,
            cubicCoeffB,
            cubicCoeffC,
            cubicCoeffD
        );
        
        return roots.length > 0 ? radius * roots[0] : null;
    }

    onExecute(): void {
        const { value, oldValue, inner } = this.param;
        
        if (GeLib.MathUtils.smallerOrEqual(value, 0.05) || GeLib.MathUtils.nearlyEqual(value, oldValue)) {
            this.mgr.cancel(this);
            return;
        }
        
        const transManager = this.context.transManager;
        
        const applyWallCurveChange = (sagitta: number): void => {
            const request = transManager.createRequest(
                HSFPConstants.RequestType.ChangeTgWallCurve,
                [this.wall]
            );
            const arcCurve = HSCore.Util.makeArcCurveByWallSagitta(this.wall, sagitta);
            request.receive("change", { curve: arcCurve });
            transManager.commit(request);
        };
        
        if (inner) {
            if (!HSApp.Util.Wall.hasIsolatedPoint(this.wall)) {
                this.mgr.cancel(this);
                const toArcWallCommand = this.mgr.createCommand(
                    HSFPConstants.CommandType.ToArcWall,
                    [this.entity, value]
                );
                this.mgr.execute(toArcWallCommand);
                return;
            }
            
            const centerSagitta = this.getCenterWallSagitta(this.wall, value);
            if (centerSagitta !== null) {
                applyWallCurveChange(centerSagitta);
            }
            this.mgr.complete(this);
        } else {
            applyWallCurveChange(value);
            this.mgr.complete(this);
        }
    }

    isInteractive(): boolean {
        return true;
    }

    getDescription(): string {
        return "修改弧形墙内径";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.WallOperation;
    }
}

interface ChangeArcWallRadiusParams {
    value: number;
    oldValue: number;
    inner: boolean;
}

interface Wall {
    from: Point;
    to: Point;
    width: number;
}

interface Point {
    x: number;
    y: number;
}