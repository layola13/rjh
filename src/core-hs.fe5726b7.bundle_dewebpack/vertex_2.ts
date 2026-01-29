import { Entity, Entity_IO } from './Entity';
import { nearlyEquals } from './MathUtils';
import { isValidNumber, EntityField } from './Utils';
import { Line3d } from './Line3d';

export enum VertexMoveTypeEnum {
  T = "T",
  freeMove = "freeMove",
  other = "other"
}

interface VertexGeometry {
  x: number;
  y: number;
  z: number;
}

interface EdgeParent {
  curve: any;
  from: Vertex;
  to: Vertex;
}

type ParentsMap = Record<string, EdgeParent>;

export class Vertex_IO extends Entity_IO {
  dump(entity: Vertex, callback?: (data: any[], entity: Vertex) => void, includeMetadata: boolean = true, options: Record<string, any> = {}): any[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const data = result[0];
    data.x = entity.x;
    data.y = entity.y;
    data.z = entity.z;
    if (callback) {
      callback(result, entity);
    }
    return result;
  }

  load(entity: Vertex, data: any, context: any): void {
    super.load(entity, data, context);
    const vertex = entity as any;
    vertex.__x = data.x;
    vertex.__y = data.y;
    vertex.__z = data.z;
  }
}

function VertexCoordinateField() {
  return (target: any, propertyKey: string): void => {
    const fieldConfig = {
      validate(value: any): boolean {
        return this._validateInput(propertyKey, value);
      }
    };
    EntityField(fieldConfig)(target, propertyKey);
  };
}

export class Vertex extends Entity {
  private __x: number = 0;
  private __y: number = 0;
  private __z: number = 0;
  private _onDrag: boolean = false;
  private _parents!: ParentsMap;

  constructor(id: string = "", metadata?: any) {
    super(id, metadata);
  }

  static create(x: number = 0, y: number = 0, z: number = 0): Vertex {
    const vertex = new Vertex();
    vertex.__x = Number(x);
    vertex.__y = Number(y);
    vertex.__z = Number(z);
    return vertex;
  }

  @VertexCoordinateField()
  get x(): number {
    return this.__x;
  }

  set x(value: number) {
    this.__x = value;
  }

  @VertexCoordinateField()
  get y(): number {
    return this.__y;
  }

  set y(value: number) {
    this.__y = value;
  }

  @VertexCoordinateField()
  get z(): number {
    return this.__z;
  }

  set z(value: number) {
    this.__z = value;
  }

  get parents(): ParentsMap {
    return this._parents;
  }

  get onDrag(): boolean {
    return this._onDrag;
  }

  set onDrag(value: boolean) {
    this._onDrag = value;
  }

  get geometry(): VertexGeometry {
    return {
      x: this.__x,
      y: this.__y,
      z: this.__z
    };
  }

  set(x: number, y: number, z: number = this.z, shouldDirtyGeometry: boolean = true): boolean {
    if (![x, y, z].every(isValidNumber)) {
      log.error(`${this.tag}: set invalid values (${x}, ${y}, ${z}).`, "HSCore.Data.Error");
      return false;
    }

    const xChanged = !nearlyEquals(this.__x, x);
    const yChanged = !nearlyEquals(this.__y, y);
    const zChanged = !nearlyEquals(this.__z, z);

    if (!xChanged && !yChanged && !zChanged) {
      return false;
    }

    if (Math.abs(x) > HSConstants.Constants.Max_Vertex_Value || Math.abs(y) > HSConstants.Constants.Max_Vertex_Value) {
      log.error(`${this.tag}: set values (${x}, ${y}, ${z}) out of range.`, "HSCore.Data.Error");
      return false;
    }

    if (xChanged) {
      this.x = x;
    }
    if (yChanged) {
      this.y = y;
    }
    if (zChanged) {
      this.z = z;
    }

    if (shouldDirtyGeometry) {
      this.dirtyGeometry();
    }

    Object.values(this.parents).forEach((parent: EdgeParent) => {
      if (parent.curve.isLine3d()) {
        parent.curve = new Line3d(parent.from, parent.to);
      }
    });

    return true;
  }

  _validateInput(propertyKey: string, value: any): boolean {
    if (!isValidNumber(value)) {
      log.error(`${this.tag}: invalid value for ${propertyKey}.`, "HSCore.Data.Error");
      return false;
    }

    if (["x", "y"].includes(propertyKey) && Math.abs(value) > HSConstants.Constants.Max_Vertex_Value) {
      log.error(`${this.tag}: input value for ${propertyKey} out of range.`, "HSCore.Data.Error");
      return false;
    }

    return true;
  }

  offset(dx: number, dy: number, dz: number = 0): void {
    if (dx !== 0 || dy !== 0 || dz !== 0) {
      const newX = this.__x + dx;
      const newY = this.__y + dy;
      const newZ = this.__z + dz;
      this.set(newX, newY, newZ);
    }
  }

  mirror(axisValue: number, isVertical: boolean): void {
    let newX = this.x;
    let newY = this.y;
    const newZ = this.z;

    if (isVertical) {
      newX = axisValue - this.x;
    } else {
      newY = axisValue - this.y;
    }

    this.set(newX, newY, newZ);
  }

  getIO(): Vertex_IO {
    return Vertex_IO.instance();
  }

  verify(): boolean {
    if (![this.__x, this.__y, this.__z].every(isValidNumber)) {
      log.error(`${this.tag}: invalid xyz (${this.__x}, ${this.__y}, ${this.__z}).`, "HSCore.Verify.Error", true);
      return false;
    }

    if (Math.abs(this.__x) > HSConstants.Constants.Max_Vertex_Value || Math.abs(this.__y) > HSConstants.Constants.Max_Vertex_Value) {
      log.error(`${this.tag}: xy (${this.__x}, ${this.__y}) out of range.`, "HSCore.Verify.Error", true);
      return false;
    }

    return super.verify();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgVertex, Vertex);