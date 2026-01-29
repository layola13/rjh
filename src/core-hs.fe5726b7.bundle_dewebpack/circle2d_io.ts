import { Curve2d_IO, Curve2d } from './Curve2d';
import { CircleArc2d } from './CircleArc2d';
import { Entity } from './Entity';
import { EntityField } from './decorators';
import { isSamePoint } from './utils';
import { Logger } from './Logger';

interface Point2D {
  x: number;
  y: number;
}

interface DumpOptions {
  [key: key]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface CircleData {
  center: { x: number; y: number; z: number };
  radius: number;
  [key: string]: unknown;
}

export class Circle2d_IO extends Curve2d_IO {
  private static _Circle2d_IO_instance?: Circle2d_IO;

  static instance(): Circle2d_IO {
    if (!Circle2d_IO._Circle2d_IO_instance) {
      Circle2d_IO._Circle2d_IO_instance = new Circle2d_IO();
    }
    return Circle2d_IO._Circle2d_IO_instance;
  }

  dump(
    entity: Circle2d,
    callback?: (data: unknown[], entity: Circle2d) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpedData = super.dump(entity, undefined, includeMetadata, options);
    const circleData = dumpedData[0] as CircleData;
    
    circleData.center = new THREE.Vector3(
      entity.__center.x,
      entity.__center.y,
      0
    );
    circleData.radius = entity.__radius;
    
    if (callback) {
      callback(dumpedData, entity);
    }
    
    return dumpedData;
  }

  load(
    entity: Circle2d,
    data: CircleData,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);
    entity.__center = new THREE.Vector3(data.center.x, data.center.y, 0);
    entity.__radius = data.radius;
  }
}

export class Circle2d extends Curve2d {
  @EntityField({ binaryEqual: isSamePoint })
  center!: Point2D;

  @EntityField()
  radius!: number;

  __center!: THREE.Vector3;
  __radius: number = 0;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
  }

  static create(center: THREE.Vector3, radius: number): Circle2d {
    const circle = new Circle2d();
    circle.__center = center;
    circle.__radius = radius;
    return circle;
  }

  get topPoint(): Point2D {
    return {
      x: this.center.x,
      y: this.center.y + this.radius
    };
  }

  get bottomPoint(): Point2D {
    return {
      x: this.center.x,
      y: this.center.y - this.radius
    };
  }

  get leftPoint(): Point2D {
    return {
      x: this.center.x - this.radius,
      y: this.center.y
    };
  }

  get rightPoint(): Point2D {
    return {
      x: this.center.x + this.radius,
      y: this.center.y
    };
  }

  get discretePoints(): Point2D[] {
    return this.getDiscretePoints();
  }

  get geometry(): [Point2D, number] | [] {
    if (!this.__center) {
      return [];
    }
    return [
      {
        x: this.__center.x,
        y: this.__center.y
      },
      this.__radius
    ];
  }

  get key(): string {
    return `Circle2d-${this.center.x.toFixed(2)}-${this.center.y.toFixed(2)}-${this.radius.toFixed(2)}`;
  }

  createSubCurve(
    startParam: number,
    endParam: number,
    counterClockwise: boolean = false
  ): unknown {
    return CircleArc2d.create(
      startParam,
      endParam,
      this.__center,
      this.__radius,
      counterClockwise
    );
  }

  getDiscretePoints(): Point2D[] {
    return this.getArcPoints(this.toTHREECurve(), undefined).map(point => ({
      x: point.x,
      y: point.y
    }));
  }

  refreshBoundInternal(): void {
    const bounds = this.boundInternal;
    bounds.reset();

    const { leftPoint, rightPoint, topPoint, bottomPoint } = this;

    if (leftPoint) bounds.appendPoint(leftPoint);
    if (rightPoint) bounds.appendPoint(rightPoint);
    if (topPoint) bounds.appendPoint(topPoint);
    if (bottomPoint) bounds.appendPoint(bottomPoint);
  }

  offset(offsetX: number, offsetY: number): void {
    this.center.x += offsetX;
    this.center.y += offsetY;
  }

  toTHREECurve(): THREE.ArcCurve {
    return new THREE.ArcCurve(
      this.center.x,
      this.center.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  }

  getTangent(t: number): unknown {
    if (t < 0 || t > 1) {
      log.error(
        "getPointOnArc() only accept input number between [0, 1]",
        "HSCore.GetPointOnArc"
      );
      return;
    }

    const tangent = this.toTHREECurve().getTangent(t);
    return HSCore.Util.Math.Vec2.fromCoordinate(tangent);
  }

  getOuterFace2D(): unknown {
    const outerWires = this.getOuterWires();
    
    if (outerWires.length === 1) {
      return outerWires[0].getUniqueParent();
    }
    
    Logger.console.log("more than one outer wires has this circle!");
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    if (["center", "radius"].includes(fieldName)) {
      this.dirtyGeometry();
    }
    super.onFieldChanged(fieldName, newValue, oldValue);
  }

  verify(): boolean {
    return super.verify();
  }

  getIO(): Circle2d_IO {
    return Circle2d_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.Circle2d, Circle2d);