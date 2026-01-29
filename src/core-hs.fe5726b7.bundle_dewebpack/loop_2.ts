import { Entity, Entity_IO } from './Entity';
import { CoEdge } from './CoEdge';
import { EntityField } from './decorators';
import { Logger } from './Logger';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ArcInfo {
  center: Point3D;
  radius: number;
  clockwise: boolean;
}

interface MassProperties {
  area: number;
  centroid: Point3D;
  momentOfInertia: number;
}

export class Loop_IO extends Entity_IO {
  load(
    entity: Loop,
    data: any,
    context: any,
    options: any
  ): void {
    super.load(entity, data, context, options);
    entity.__root = Entity.loadFromDumpById(data.root, context, false, options);
  }
}

export class Loop extends Entity {
  @EntityField()
  root?: CoEdge;

  constructor(id: string = "") {
    super(id);
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

  get lastVertex(): any {
    const edge = this.lastEdge;
    if (edge) {
      return edge.to;
    }
  }

  static createFromPoints(points: Point3D[]): Loop {
    const loop = new Loop();
    loop.initData(points);
    return loop;
  }

  initData(points: Point3D[]): void {
    const pointCount = points.length;
    for (let i = 0; i < pointCount; i++) {
      const fromPoint = points[i];
      const toPoint = points[(i + 1) % pointCount];
      const coEdge = CoEdge.create(fromPoint, toPoint);
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

  forEachCoEdge(
    callback: (coEdge: CoEdge) => boolean | void,
    context?: any
  ): boolean {
    try {
      const visitedIds = new Set<string>();
      const startEdge = this.root;
      if (!startEdge) {
        return true;
      }

      let currentEdge: CoEdge | undefined = startEdge;
      while (currentEdge) {
        if (visitedIds.has(currentEdge.id)) {
          throw `${this.tag} is corrupt at ${currentEdge.tag}`;
        }
        visitedIds.add(currentEdge.id);

        if (callback.call(context, currentEdge)) {
          break;
        }

        currentEdge = currentEdge.next;
        if (currentEdge?.id === startEdge.id) {
          break;
        }
      }
    } catch (error) {
      this.logger.error(error);
      return false;
    }
    return true;
  }

  forEachVertex(
    callback: (vertex: any) => void,
    context?: any
  ): void {
    this.forEachCoEdge((coEdge) => {
      callback.call(context, coEdge.from);
    });
  }

  forEachOwnedVertex(
    callback: (vertex: any) => void,
    context?: any
  ): void {
    const processedVertices = new Set();
    this.forEachCoEdge((coEdge) => {
      if (coEdge !== coEdge.edge.coedge) {
        processedVertices.add(coEdge.from);
        processedVertices.add(coEdge.to);
      } else if (!processedVertices.has(coEdge.from)) {
        callback.call(context, coEdge.from);
      }
    });
  }

  getCoEdges(): CoEdge[] {
    const edges: CoEdge[] = [];
    this.forEachCoEdge((coEdge) => {
      edges.push(coEdge);
    });
    return edges;
  }

  getLoopEdges(): any[] {
    const edges: any[] = [];
    this.forEachCoEdge((coEdge) => {
      edges.push(coEdge.edge);
    });
    return edges;
  }

  getLoopVertices(): any[] {
    const vertices: any[] = [];
    this.forEachVertex((vertex) => {
      vertices.push(vertex);
    });
    return vertices;
  }

  findCoEdge(
    predicate: (coEdge: CoEdge) => boolean,
    context?: any
  ): CoEdge | undefined {
    let foundEdge: CoEdge | undefined;
    this.forEachCoEdge((coEdge) => {
      const matches = predicate.call(context, coEdge);
      if (matches) {
        foundEdge = coEdge;
      }
      return matches;
    });
    return foundEdge;
  }

  findCoEdgeToVertex(vertex: any): CoEdge | undefined {
    return this.findCoEdge((coEdge) => coEdge.to === vertex);
  }

  toPolygon(closePath: boolean = true): Point3D[] | undefined {
    const points: Point3D[] = [];
    this.forEachVertex((vertex) => {
      points.push({
        x: vertex.x,
        y: vertex.y,
        z: vertex.z
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

  toDiscretePolygon(): Point3D[] | undefined {
    const points: Point3D[] = [];
    this.forEachCoEdge((coEdge) => {
      points.pop();

      const fromVector = GeLib.VectorUtils.toTHREEVector3(coEdge.from);
      const toVector = GeLib.VectorUtils.toTHREEVector3(coEdge.to);
      const arcInfo = coEdge.arcInfo;

      if (arcInfo) {
        let arcPoints = GeLib.ArcUtils.createArcFromPoints(
          fromVector,
          toVector,
          arcInfo.center,
          arcInfo.radius,
          arcInfo.clockwise
        ).getPoints();
        arcPoints = arcPoints.map((point: any) =>
          GeLib.VectorUtils.toTHREEVector3(point)
        );
        points.push(...arcPoints);
      } else {
        points.push(fromVector);
        points.push(toVector);
      }
    });

    return points.length >= 3 ? points : undefined;
  }

  clear(): void {
    this.root = undefined;
    this.removeAllChildren(false, true);
  }

  getMassProps(): MassProperties | undefined {
    const polygon = this.toPolygon();
    if (!polygon) {
      return undefined;
    }
    return HSCore.Util.Math.getMassProperties(polygon);
  }

  getIO(): Loop_IO {
    return Loop_IO.instance();
  }

  verify(): boolean {
    return this.validate(true);
  }

  validate(logErrors: boolean = false): boolean {
    if (!(this.root instanceof CoEdge)) {
      log.error(`${this.tag}: invalid root.`, "HSCore.Verify.Error", true);
      return false;
    }

    let previousEdge: CoEdge | undefined;
    let isValid = true;

    const traversalComplete = this.forEachCoEdge((currentEdge) => {
      isValid =
        currentEdge instanceof CoEdge &&
        currentEdge.getUniqueParent() === this &&
        currentEdge.validate(logErrors);

      if (previousEdge) {
        Logger.console.assert(
          previousEdge.next === currentEdge &&
            currentEdge.prev === previousEdge &&
            previousEdge.to === currentEdge.from,
          "invalid loop!"
        );
      }

      previousEdge = currentEdge;
      return !isValid;
    });

    isValid = isValid && traversalComplete;

    if (!isValid) {
      log.error(`${this.tag} is corrupted.`, "HSCore.Verify.Error", true);
    }

    return isValid;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgLoop, Loop);