import { SmoothPoly3d, SmoothPoly2d } from './SmoothPoly';
import type { Coedge } from './Coedge';
import type { Edge } from './Edge';
import type { Point2d, Point3d } from './Point';

export class ContinuousCurve3d extends SmoothPoly3d {
    private readonly _coedges: Coedge[];
    private readonly _map: Map<Edge, Coedge>;

    constructor(coedges: Coedge[]) {
        const points: Point3d[] = [];
        
        for (let index = 0; index < coedges.length; ++index) {
            points.push(coedges[index].getStartVertex().getPoint());
            
            if (index + 1 === coedges.length) {
                points.push(coedges[index].getEndVertex().getPoint());
            }
        }
        
        super(points);
        
        this._coedges = coedges;
        this._map = new Map<Edge, Coedge>();
        
        for (let index = 0; index < coedges.length; ++index) {
            this._map.set(coedges[index].getEdge(), coedges[index]);
        }
    }

    clone(): SmoothPoly3d {
        return new SmoothPoly3d(this.discrete());
    }

    getCoedges(): Coedge[] {
        return this._coedges;
    }

    isSeamDirection(coedge: Coedge): boolean {
        const mappedCoedge = this._map.get(coedge.getEdge());
        return coedge.getSameDirWithEdge() === mappedCoedge?.getSameDirWithEdge();
    }
}

export class ContinuousCurve2d extends SmoothPoly2d {
    clone(): SmoothPoly2d {
        return new SmoothPoly2d(this.getPoints().slice());
    }

    getSectorArea(): number {
        const points = this.getPoints();
        let area = 0;
        
        for (let index = 1; index < points.length; ++index) {
            area += points[index - 1].cross(points[index]);
        }
        
        return 0.5 * area;
    }
}