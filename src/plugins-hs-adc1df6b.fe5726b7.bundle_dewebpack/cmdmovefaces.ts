import { HSCore, HSApp } from './types';

export class CmdMoveFaces extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveFaces {
    private _builder: any;
    protected canMove: boolean = false;

    protected _canPolygonBeMoved(face: any): boolean {
        const edgesFromLoops: any[] = [face.outerLoop]
            .concat(...face.innerLoops)
            .flatMap((loop: any) => 
                loop.coedges.map((coedge: any) => coedge.edge)
            );

        const pointsFromFace = HSCore.Util.ExtraordinarySketch2d.getAllPointsFromFaces([face]);
        const sketch = this._builder.getSketch();

        for (const point of pointsFromFace) {
            const edgesByPoint = HSCore.Util.ExtraordinarySketch2d.getAllEdgesByPoints(
                sketch,
                [point]
            );

            if (edgesByPoint.some((edge: any) => !edgesFromLoops.includes(edge))) {
                return false;
            }
        }

        return true;
    }

    onExecute(event: any): void {
        super.onExecute(event);

        if (!this.canMove) {
            LiveHint.show(this._getToposInvalidTip(), 2000, undefined);
        }
    }

    protected _getToposInvalidTip(): string {
        return ResourceManager.getString("plugin_outdoor_drawing_moveFace_invalid");
    }
}