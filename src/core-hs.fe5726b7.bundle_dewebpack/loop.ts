import { Entity, Entity_IO } from './Entity';
import { CoEdge } from './CoEdge';
import { EntityField } from './decorators';
import { Face } from './Face';
import { Vertex } from './Vertex';
import { Line3d, Arc3d, Plane } from './geometry';
import { Logger } from './Logger';

interface DumpData {
  root?: string;
  [key: string]: unknown;
}

interface LoadContext {
  [key: string]: unknown;
}

export class Loop_IO extends Entity_IO {
  dump(
    entity: Loop,
    callback?: (dump: DumpData[], source: Loop) => void,
    includeChildren: boolean = true,
    options: Record<string, unknown> = {}
  ): DumpData[] {
    const dumpData = super.dump(entity, undefined, includeChildren, options);
    dumpData[0].root = entity.root ? entity.root.id : undefined;
    
    if (callback) {
      callback(dumpData, entity);
    }
    
    return dumpData;
  }

  load(dumpData: DumpData, context: LoadContext, options: Record<string, unknown>): void {
    super.load(dumpData, context, options);
    (dumpData as any).__root = Entity.loadFromDumpById(context.root as string, options);
  }

  migrateLoad(dumpData: DumpData, context: LoadContext, options: Record<string, unknown>): void {
    // Migration logic placeholder
  }
}

export class Loop extends Entity {
  @EntityField()
  root?: CoEdge;

  constructor(name: string = '', parent?: Entity) {
    super(name, parent);
  }

  get parent(): Entity | undefined {
    return this.getUniqueParent();
  }

  get children(): Entity[] {
    return this._children;
  }

  get lastEdge(): CoEdge | undefined {
    let edge: CoEdge | undefined = this.root;
    if (this.root?.prev) {
      edge = this.root.prev;
    }
    return edge;
  }

  get lastVertex(): Vertex | undefined {
    const edge = this.lastEdge;
    return edge?.to;
  }

  static createFromPoints(vertices: Vertex[], curves: any[] = []): Loop {
    const loop = new Loop();
    loop.initData(vertices, curves);
    return loop;
  }

  static createFromCurves(curves: any[]): Loop {
    const loop = new Loop();
    const vertices = curves
      .map(curve => curve.getStartPt())
      .map(pt => Vertex.create(pt.x, pt.y, pt.z));
    loop.initData(vertices, curves);
    return loop;
  }

  initData(vertices: Vertex[], curves: any[] = []): void {
    const vertexCount = vertices.length;
    
    for (let i = 0; i < vertexCount; i++) {
      const startVertex = vertices[i];
      const endVertex = vertices[(i + 1) % vertexCount];
      const curve = curves[i] ?? new Line3d(startVertex, endVertex);
      const coEdge = CoEdge.create(startVertex, endVertex, curve);
      this.appendCoEdge(coEdge);
    }
  }

  appendCoEdge(coEdge: CoEdge, afterEdge?: CoEdge): CoEdge {
    if (this.root) {
      const targetEdge = afterEdge ?? this.lastEdge;
      const nextEdge = targetEdge?.next ?? this.root;
      coEdge.prev = targetEdge;
      coEdge.next = nextEdge;
    } else {
      this.root = coEdge;
      coEdge.next = undefined;
      coEdge.prev = undefined;
    }
    
    this.addChild(coEdge);
    return coEdge;
  }

  removeCoEdge(coEdge: CoEdge, detach?: boolean, destroy?: boolean): void {
    const prevEdge = coEdge.prev;
    const nextEdge = coEdge.next;
    const partner = coEdge.partner;
    const edge = coEdge.edge;

    if (this.root?.id === coEdge.id) {
      this.root = coEdge.next;
    }

    if (prevEdge) {
      prevEdge.next = nextEdge;
    }

    if (nextEdge) {
      nextEdge.prev = prevEdge;
    }

    if (partner) {
      edge.coedge = partner;
      partner.partner = undefined;
    } else {
      edge.coedge = undefined;
    }

    super.removeChild(coEdge, detach, destroy);
    coEdge.prev = undefined;
    coEdge.next = undefined;
    coEdge.partner = undefined;
  }

  onChildDirty(child: Entity, flags: unknown): void {
    this.dirtyGeometry();
    super.onChildDirty(child, flags);
  }

  forEachCoEdge(callback: (coEdge: CoEdge) => boolean | void, context?: unknown): boolean {
    try {
      const visited = new Set<string>();
      const rootEdge = this.root;
      
      if (!rootEdge) {
        return true;
      }

      let currentEdge: CoEdge | undefined = rootEdge;

      while (currentEdge) {
        if (visited.has(currentEdge.id)) {
          throw new Error(`${this.tag} is corrupt at ${currentEdge.tag}`);
        }

        visited.add(currentEdge.id);

        if (callback.call(context, currentEdge)) {
          break;
        }

        currentEdge = currentEdge.next;

        if (currentEdge?.id === rootEdge.id) {
          break;
        }
      }
    } catch (error) {
      this.logger.error(error);
      return false;
    }

    return true;
  }

  forEachVertex(callback: (vertex: Vertex) => void, context?: unknown): void {
    this.forEachCoEdge(coEdge => {
      callback.call(context, coEdge.from);
    });
  }

  forEachOwnedVertex(callback: (vertex: Vertex) => void, context?: unknown): void {
    const sharedVertices = new Set<Vertex>();

    this.forEachCoEdge(coEdge => {
      if (coEdge !== coEdge.edge.coedge) {
        sharedVertices.add(coEdge.from);
        sharedVertices.add(coEdge.to);
      } else if (!sharedVertices.has(coEdge.from)) {
        callback.call(context, coEdge.from);
      }
    });
  }

  getCoEdges(): CoEdge[] {
    const edges: CoEdge[] = [];
    this.forEachCoEdge(coEdge => {
      edges.push(coEdge);
    });
    return edges;
  }

  getLoopEdges(): any[] {
    const edges: any[] = [];
    this.forEachCoEdge(coEdge => {
      edges.push(coEdge.edge);
    });
    return edges;
  }

  getLoopCurves(): any[] {
    const curves: any[] = [];
    this.forEachCoEdge(coEdge => {
      curves.push(coEdge.edge.curve);
    });
    return curves;
  }

  getLoopCurves2d(): any[] {
    const curves = this.getLoopCurves();
    
    if (this.parent instanceof Face) {
      return this.parent.surfaceObj.getCurve2ds(curves);
    }
    
    return curves.map(curve => Plane.XOY().getCurve2d(curve));
  }

  getLoopVertices(): Vertex[] {
    const vertices: Vertex[] = [];
    this.forEachVertex(vertex => {
      vertices.push(vertex);
    });
    return vertices;
  }

  findCoEdge(predicate: (coEdge: CoEdge) => boolean, context?: unknown): CoEdge | undefined {
    let foundEdge: CoEdge | undefined;

    this.forEachCoEdge(coEdge => {
      const matches = predicate.call(context, coEdge);
      if (matches) {
        foundEdge = coEdge;
      }
      return matches;
    });

    return foundEdge;
  }

  findCoEdgeToVertex(vertex: Vertex): CoEdge | undefined {
    return this.findCoEdge(coEdge => coEdge.to === vertex);
  }

  toPolygon(closePath: boolean = true): Array<{ x: number; y: number; z: number }> | undefined {
    const points: Array<{ x: number; y: number; z: number }> = [];
    
    HSCore.Util.TgWall.getVectorsFromCurves(this.getLoopCurves()).forEach(vec => {
      points.push({
        x: vec.x,
        y: vec.y,
        z: vec.z ?? 0
      });
    });

    if (points.length < 3) {
      return undefined;
    }

    if (closePath) {
      points.push({ ...points[0] });
    }

    return points;
  }

  toDiscretePolygon(): any[] | undefined {
    const points: any[] = [];

    this.forEachCoEdge(coEdge => {
      points.pop();

      const startPoint = GeLib.VectorUtils.toTHREEVector3(coEdge.from);
      const endPoint = GeLib.VectorUtils.toTHREEVector3(coEdge.to);
      const arcInfo = coEdge.arcInfo;

      if (arcInfo) {
        let arcPoints = GeLib.ArcUtils.createArcFromPoints(
          startPoint,
          endPoint,
          arcInfo.center,
          arcInfo.radius,
          arcInfo.clockwise
        ).getPoints();

        arcPoints = arcPoints.map(pt => GeLib.VectorUtils.toTHREEVector3(pt));
        points.push(...arcPoints);
      } else {
        points.push(startPoint);
        points.push(endPoint);
      }
    });

    return points.length >= 3 ? points : undefined;
  }

  invert(): void {
    const edges: CoEdge[] = [this.root!];
    let currentEdge = this.root!.next;

    while (currentEdge && currentEdge.id !== this.root!.id) {
      edges.push(currentEdge);
      currentEdge = currentEdge.next;
    }

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      const nextEdge = edges[(i + 1) % edges.length];
      edge.prev = nextEdge;
      nextEdge.next = edge;
      edge.reversed = !edge.reversed;
    }

    this.dirtyGeometry();
  }

  clear(): void {
    this.root = undefined;
    this.removeAllChildren(false, true);
  }

  getMassProps(): any | undefined {
    const polygon = this.toPolygon();
    return polygon ? HSCore.Util.Math.getMassProperties(polygon) : undefined;
  }

  getIO(): Loop_IO {
    return Loop_IO.instance();
  }

  verify(): boolean {
    return this.validate(true);
  }

  validate(strict: boolean = false): boolean {
    if (!(this.root instanceof HSCore.Model.CoEdge)) {
      log.error(`${this.tag}: invalid root.`, 'HSCore.Verify.Error', true);
      return false;
    }

    let isValid = true;
    const coEdges = this.getCoEdges();

    try {
      if (coEdges.length === 1 && 
          coEdges[0].edge.curve instanceof Arc3d && 
          coEdges[0].edge.curve.isClosed()) {
        return isValid;
      }
    } catch (error) {
      log.error(`${this.tag}: invalid face.`, 'HSCore.Verify.Error', true);
      const parentEntity = this.getUniqueParent();
      parentEntity?.getUniqueParent()?.removeChild(parentEntity);
      return false;
    }

    let previousEdge: CoEdge | undefined;

    const validationResult = this.forEachCoEdge(coEdge => {
      isValid = coEdge instanceof HSCore.Model.CoEdge && 
                coEdge.getUniqueParent() === this && 
                coEdge.validate(strict);

      if (previousEdge) {
        Logger.console.assert(
          previousEdge.next === coEdge && 
          coEdge.prev === previousEdge && 
          previousEdge.to === coEdge.from,
          'invalid loop!'
        );
      }

      previousEdge = coEdge;
      return !isValid;
    });

    isValid = isValid && validationResult;

    if (!isValid) {
      log.error(`${this.tag} is corrupted.`, 'HSCore.Verify.Error', true);
    }

    return isValid;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgLoop, Loop);