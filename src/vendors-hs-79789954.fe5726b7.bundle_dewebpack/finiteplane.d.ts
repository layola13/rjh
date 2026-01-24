import { Plane, Box3 } from './Plane';
import { transformHSBox } from './TransformUtils';

/**
 * 有限平面类
 * 表示一个在U、V方向上具有有限尺寸的平面几何体
 * 继承自基础Plane类，添加了尺寸约束
 */
export class FinitePlane extends Plane {
  /**
   * U方向的尺寸（宽度）
   * @private
   * @default 100
   */
  private _uSize: number = 100;

  /**
   * V方向的尺寸（高度）
   * @private
   * @default 100
   */
  private _vSize: number = 100;

  /**
   * 获取U方向的尺寸
   * @returns U方向尺寸值
   */
  get uSize(): number {
    return this._uSize;
  }

  /**
   * 设置U方向的尺寸
   * @param value - 新的U方向尺寸值
   */
  set uSize(value: number) {
    this._uSize = value;
  }

  /**
   * 获取V方向的尺寸
   * @returns V方向尺寸值
   */
  get vSize(): number {
    return this._vSize;
  }

  /**
   * 设置V方向的尺寸
   * @param value - 新的V方向尺寸值
   */
  set vSize(value: number) {
    this._vSize = value;
  }

  /**
   * 同时设置U和V方向的尺寸
   * @param uSize - U方向尺寸
   * @param vSize - V方向尺寸
   * @returns 当前实例，支持链式调用
   */
  setUVSize(uSize: number, vSize: number): this {
    this._uSize = uSize;
    this._vSize = vSize;
    return this;
  }

  /**
   * 克隆当前有限平面
   * @returns 新的FinitePlane实例，具有相同的原点、法线和尺寸
   */
  clone(): FinitePlane {
    const cloned = new FinitePlane(this.getOrigin(), this.getNorm());
    cloned.uSize = this._uSize;
    cloned.vSize = this._vSize;
    return cloned;
  }

  /**
   * 获取有限平面的包围盒
   * 计算基于平面中心点和UV尺寸的3D包围盒，并应用局部到世界坐标系的变换
   * @returns 变换后的Box3包围盒对象
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
   * 序列化为普通对象
   * @returns 包含父类数据及uSize、vSize的对象
   */
  dump(): Record<string, unknown> {
    const data = super.dump();
    data.uSize = this._uSize;
    data.vSize = this._vSize;
    return data;
  }

  /**
   * 从序列化数据加载
   * @param data - 包含uSize和vSize的序列化数据对象
   * @returns 当前实例，支持链式调用
   */
  load(data: { uSize?: number; vSize?: number; [key: string]: unknown }): this {
    super.load(data);
    this._uSize = data.uSize ?? 100;
    this._vSize = data.vSize ?? 100;
    return this;
  }
}