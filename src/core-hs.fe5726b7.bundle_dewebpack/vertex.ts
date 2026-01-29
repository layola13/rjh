import { Entity, Entity_IO } from './Entity';
import { nearlyEquals } from './MathUtils';
import { EntityField, isValidNumber } from './EntityUtils';

export enum VertexMoveTypeEnum {
  T = "T",
  freeMove = "freeMove",
  other = "other"
}

export class Vertex_IO extends Entity_IO {
  load(
    entity: Vertex,
    geometry: { x: number; y: number; z: number },
    options?: unknown,
    context?: unknown
  ): void {
    super.load(entity, geometry, options, context);
    entity.__x = geometry.x;
    entity.__y = geometry.y;
    entity.__z = geometry.z;
  }
}

interface GeometryData {
  x: number;
  y: number;
  z: number;
}

function VertexFieldDecorator() {
  return (target: any, propertyKey: string): void => {
    const descriptor = {
      validate(value: number): boolean {
        return (target as Vertex)._validateInput(propertyKey, value);
      }
    };
    EntityField(descriptor)(target, propertyKey);
  };
}

export class Vertex extends Entity {
  __x: number = 0;
  __y: number = 0;
  __z: number = 0;

  constructor(id: string = "") {
    super(id);
  }

  static create(x: number = 0, y: number = 0, z: number = 0): Vertex {
    const vertex = new Vertex();
    vertex.__x = Number(x);
    vertex.__y = Number(y);
    vertex.__z = Number(z);
    return vertex;
  }

  get parents(): unknown[] {
    return this._parents;
  }

  @VertexFieldDecorator()
  x!: number;

  @VertexFieldDecorator()
  y!: number;

  @VertexFieldDecorator()
  z!: number;

  set(
    x: number,
    y: number,
    z: number = this.z,
    updateGeometry: boolean = true
  ): boolean {
    if (![x, y, z].every(isValidNumber)) {
      log.error(
        `${this.tag}: set invalid values (${x}, ${y}, ${z}).`,
        "HSCore.Data.Error"
      );
      return false;
    }

    const xChanged = !nearlyEquals(this.__x, x);
    const yChanged = !nearlyEquals(this.__y, y);
    const zChanged = !nearlyEquals(this.__z, z);

    if (!xChanged && !yChanged && !zChanged) {
      return false;
    }

    if (
      Math.abs(x) > HSConstants.Constants.Max_Vertex_Value ||
      Math.abs(y) > HSConstants.Constants.Max_Vertex_Value
    ) {
      log.error(
        `${this.tag}: set values (${x}, ${y}, ${z}) out of range.`,
        "HSCore.Data.Error"
      );
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

    if (updateGeometry) {
      this.dirtyGeometry();
    }

    return true;
  }

  get geometry(): GeometryData {
    return {
      x: this.__x,
      y: this.__y,
      z: this.__z
    };
  }

  _validateInput(propertyKey: string, value: number): boolean {
    if (!isValidNumber(value)) {
      log.error(
        `${this.tag}: invalid value for ${propertyKey}.`,
        "HSCore.Data.Error"
      );
      return false;
    }

    if (
      ["x", "y"].includes(propertyKey) &&
      Math.abs(value) > HSConstants.Constants.Max_Vertex_Value
    ) {
      log.error(
        `${this.tag}: input value for ${propertyKey} out of range.`,
        "HSCore.Data.Error"
      );
      return false;
    }

    return true;
  }

  getIO(): Vertex_IO {
    return Vertex_IO.instance();
  }

  verify(): boolean {
    if (![this.__x, this.__y, this.__z].every(isValidNumber)) {
      log.error(
        `${this.tag}: invalid xyz (${this.__x}, ${this.__y}, ${this.__z}).`,
        "HSCore.Verify.Error",
        true
      );
      return false;
    }

    if (
      Math.abs(this.__x) > HSConstants.Constants.Max_Vertex_Value ||
      Math.abs(this.__y) > HSConstants.Constants.Max_Vertex_Value
    ) {
      log.error(
        `${this.tag}: xy (${this.__x}, ${this.__y}) out of range.`,
        "HSCore.Verify.Error",
        true
      );
      return false;
    }

    return super.verify();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgVertex, Vertex);