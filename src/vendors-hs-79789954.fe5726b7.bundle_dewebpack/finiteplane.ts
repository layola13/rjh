import { Plane, Box3 } from './Plane';
import { transformHSBox } from './transform';

/**
 * A finite plane with defined U and V dimensions
 */
export class FinitePlane extends Plane {
  private _uSize: number = 100;
  private _vSize: number = 100;

  get uSize(): number {
    return this._uSize;
  }

  set uSize(value: number) {
    this._uSize = value;
  }

  get vSize(): number {
    return this._vSize;
  }

  set vSize(value: number) {
    this._vSize = value;
  }

  /**
   * Set both U and V size dimensions
   * @param uSize - The size in U direction
   * @param vSize - The size in V direction
   * @returns This instance for chaining
   */
  setUVSize(uSize: number, vSize: number): this {
    this._uSize = uSize;
    this._vSize = vSize;
    return this;
  }

  /**
   * Create a deep copy of this finite plane
   * @returns A new FinitePlane instance with the same properties
   */
  clone(): FinitePlane {
    const cloned = new FinitePlane(this.getOrigin(), this.getNorm());
    cloned.uSize = this._uSize;
    cloned.vSize = this._vSize;
    return cloned;
  }

  /**
   * Calculate the bounding box of this finite plane
   * @returns The bounding box in world space
   */
  getBoundingBox(): Box3 {
    const boundingBox = new Box3();
    boundingBox.setFromCenterAndSize(
      { x: 0, y: 0, z: 0 },
      { x: this._uSize, y: this._vSize, z: 0 }
    );
    const localToWorldMatrix = this.getCoord().getLocalToWorldMatrix();
    transformHSBox(boundingBox, localToWorldMatrix);
    return boundingBox;
  }

  /**
   * Serialize this finite plane to a plain object
   * @returns Serialized representation
   */
  dump(): Record<string, unknown> {
    const data = super.dump();
    data.uSize = this._uSize;
    data.vSize = this._vSize;
    return data;
  }

  /**
   * Deserialize and load data into this finite plane
   * @param data - Serialized data object
   * @returns This instance for chaining
   */
  load(data: Record<string, unknown>): this {
    super.load(data);
    this._uSize = (data.uSize as number) ?? 100;
    this._vSize = (data.vSize as number) ?? 100;
    return this;
  }
}