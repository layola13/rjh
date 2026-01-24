/**
 * Vertex module - 3D point representation with validation and geometry operations
 */

import { Entity, Entity_IO } from './Entity';
import { nearlyEquals } from './MathUtils';
import { isValidNumber, EntityField } from './Validation';
import { Line3d } from './Line3d';

/**
 * Vertex movement type enumeration
 */
export enum VertexMoveTypeEnum {
  /** T-shaped movement constraint */
  T = "T",
  /** Free movement in all directions */
  freeMove = "freeMove",
  /** Other movement types */
  other = "other"
}

/**
 * Parent edge reference interface
 */
interface ParentEdge {
  /** The curve connecting vertices */
  curve: Line3d | any;
  /** Start vertex of the edge */
  from: Vertex;
  /** End vertex of the edge */
  to: Vertex;
}

/**
 * Geometry representation of a vertex
 */
interface VertexGeometry {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate */
  z: number;
}

/**
 * Dump options for serialization
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Input/Output handler for Vertex serialization and deserialization
 */
export class Vertex_IO extends Entity_IO {
  /**
   * Serialize a Vertex instance to plain object
   * @param entity - The vertex to serialize
   * @param callback - Optional callback for custom serialization
   * @param includeMetadata - Whether to include metadata
   * @param options - Additional serialization options
   * @returns Array of serialized data
   */
  dump(
    entity: Vertex,
    callback?: (data: unknown[], entity: Vertex) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const serialized = super.dump(entity, undefined, includeMetadata, options);
    const data = serialized[0] as Record<string, unknown>;
    
    data.x = entity.x;
    data.y = entity.y;
    data.z = entity.z;
    
    if (callback) {
      callback(serialized, entity);
    }
    
    return serialized;
  }

  /**
   * Deserialize plain object to Vertex instance
   * @param entity - The vertex instance to populate
   * @param data - Serialized vertex data
   * @param context - Deserialization context
   */
  load(entity: Vertex, data: VertexGeometry, context: unknown): void {
    super.load(entity, data, context);
    
    const vertex = entity as Vertex;
    vertex.__x = data.x;
    vertex.__y = data.y;
    vertex.__z = data.z;
  }
}

/**
 * Decorator factory for vertex coordinate validation
 * @returns Property decorator
 */
function ValidateCoordinate(): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    const validationConfig = {
      validate(this: Vertex, value: unknown): boolean {
        return this._validateInput(propertyKey as string, value);
      }
    };
    
    EntityField(validationConfig)(target, propertyKey);
  };
}

/**
 * 3D Vertex entity with coordinate validation and geometry operations
 */
export class Vertex extends Entity {
  /** Internal X coordinate storage */
  private __x: number = 0;
  
  /** Internal Y coordinate storage */
  private __y: number = 0;
  
  /** Internal Z coordinate storage */
  private __z: number = 0;
  
  /** Drag state flag */
  private _onDrag: boolean = false;
  
  /** Parent edges connected to this vertex */
  private _parents!: Record<string, ParentEdge>;

  /**
   * X coordinate with validation
   */
  @ValidateCoordinate()
  get x(): number {
    return this.__x;
  }
  set x(value: number) {
    this.__x = value;
  }

  /**
   * Y coordinate with validation
   */
  @ValidateCoordinate()
  get y(): number {
    return this.__y;
  }
  set y(value: number) {
    this.__y = value;
  }

  /**
   * Z coordinate with validation
   */
  @ValidateCoordinate()
  get z(): number {
    return this.__z;
  }
  set z(value: number) {
    this.__z = value;
  }

  constructor(id: string = "", tag?: string) {
    super(id, tag);
  }

  /**
   * Factory method to create a vertex with coordinates
   * @param x - X coordinate (default: 0)
   * @param y - Y coordinate (default: 0)
   * @param z - Z coordinate (default: 0)
   * @returns New Vertex instance
   */
  static create(x: number = 0, y: number = 0, z: number = 0): Vertex {
    const vertex = new Vertex();
    vertex.__x = Number(x);
    vertex.__y = Number(y);
    vertex.__z = Number(z);
    return vertex;
  }

  /**
   * Get parent edges connected to this vertex
   */
  get parents(): Record<string, ParentEdge> {
    return this._parents;
  }

  /**
   * Set vertex coordinates with validation
   * @param x - New X coordinate
   * @param y - New Y coordinate
   * @param z - New Z coordinate (default: current z)
   * @param updateGeometry - Whether to trigger geometry update (default: true)
   * @returns true if set successfully, false otherwise
   */
  set(x: number, y: number, z: number = this.z, updateGeometry: boolean = true): boolean {
    // Validate all inputs are numbers
    if (![x, y, z].every(isValidNumber)) {
      log.error(
        `${this.tag}: set invalid values (${x}, ${y}, ${z}).`,
        "HSCore.Data.Error"
      );
      return false;
    }

    // Check if any coordinate changed
    const xChanged = !nearlyEquals(this.__x, x);
    const yChanged = !nearlyEquals(this.__y, y);
    const zChanged = !nearlyEquals(this.__z, z);

    if (!xChanged && !yChanged && !zChanged) {
      return false;
    }

    // Validate coordinate range
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

    // Apply changes
    if (xChanged) this.x = x;
    if (yChanged) this.y = y;
    if (zChanged) this.z = z;

    // Update geometry and parent edges
    if (updateGeometry) {
      this.dirtyGeometry();
    }

    Object.values(this.parents).forEach((parent: ParentEdge) => {
      if (parent.curve.isLine3d()) {
        parent.curve = new Line3d(parent.from, parent.to);
      }
    });

    return true;
  }

  /**
   * Drag state accessor
   */
  get onDrag(): boolean {
    return this._onDrag;
  }
  set onDrag(value: boolean) {
    this._onDrag = value;
  }

  /**
   * Get geometry representation
   */
  get geometry(): VertexGeometry {
    return {
      x: this.__x,
      y: this.__y,
      z: this.__z
    };
  }

  /**
   * Validate input value for a coordinate
   * @param propertyName - Name of the property (x, y, or z)
   * @param value - Value to validate
   * @returns true if valid, false otherwise
   */
  private _validateInput(propertyName: string, value: unknown): boolean {
    if (!isValidNumber(value)) {
      log.error(
        `${this.tag}: invalid value for ${propertyName}.`,
        "HSCore.Data.Error"
      );
      return false;
    }

    // Check range for x and y coordinates
    if (["x", "y"].includes(propertyName)) {
      if (Math.abs(value as number) > HSConstants.Constants.Max_Vertex_Value) {
        log.error(
          `${this.tag}: input value for ${propertyName} out of range.`,
          "HSCore.Data.Error"
        );
        return false;
      }
    }

    return true;
  }

  /**
   * Offset vertex by given deltas
   * @param deltaX - X offset
   * @param deltaY - Y offset
   * @param deltaZ - Z offset (default: 0)
   */
  offset(deltaX: number, deltaY: number, deltaZ: number = 0): void {
    if (deltaX !== 0 || deltaY !== 0 || deltaZ !== 0) {
      const newX = this.__x + deltaX;
      const newY = this.__y + deltaY;
      const newZ = this.__z + deltaZ;
      this.set(newX, newY, newZ);
    }
  }

  /**
   * Mirror vertex across an axis
   * @param axisValue - The axis value to mirror across
   * @param isHorizontal - true for horizontal (X-axis), false for vertical (Y-axis)
   */
  mirror(axisValue: number, isHorizontal: boolean): void {
    let newX = this.x;
    let newY = this.y;
    const newZ = this.z;

    if (isHorizontal) {
      newX = axisValue - this.x;
    } else {
      newY = axisValue - this.y;
    }

    this.set(newX, newY, newZ);
  }

  /**
   * Get IO handler for this entity
   */
  getIO(): Vertex_IO {
    return Vertex_IO.instance();
  }

  /**
   * Verify vertex integrity
   * @returns true if valid, false otherwise
   */
  verify(): boolean {
    // Check if all coordinates are valid numbers
    if (![this.__x, this.__y, this.__z].every(isValidNumber)) {
      log.error(
        `${this.tag}: invalid xyz (${this.__x}, ${this.__y}, ${this.__z}).`,
        "HSCore.Verify.Error",
        true
      );
      return false;
    }

    // Check coordinate range
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

// Register Vertex class with the entity system
Entity.registerClass(HSConstants.ModelClass.NgVertex, Vertex);