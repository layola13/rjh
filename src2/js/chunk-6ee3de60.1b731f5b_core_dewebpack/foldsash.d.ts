/**
 * 折叠窗扇模块
 * 提供折叠窗扇的创建、序列化和硬件管理功能
 */

import { Sash, ShapeType } from './base-sash';
import { FoldHardwareManager } from './fold-hardware-manager';
import { DrawParams } from './draw-params';

/**
 * 窗扇序列化数据接口
 */
interface SashSerializedData {
  /** 是否为门 */
  isDoor?: boolean;
  [key: string]: unknown;
}

/**
 * 折叠窗扇类
 * 继承自基础窗扇类，添加折叠窗扇特有的门属性和硬件管理
 */
export class FoldSash extends Sash {
  /** 是否为门类型 */
  isDoor: boolean;

  /** 折叠窗扇硬件管理器 */
  hardwareManager: FoldHardwareManager;

  /**
   * 创建折叠窗扇实例
   * @param param1 - 第一个参数（具体类型需根据父类Sash定义）
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   * @param shapeType - 窗扇形状类型，默认为普通窗扇
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    shapeType: ShapeType = ShapeType.Sash
  );

  /**
   * 获取窗扇的包围盒
   * 合并硬件手柄尺寸盒和父类盒
   * @returns 合并后的包围盒对象
   */
  box(): unknown;

  /**
   * 序列化窗扇数据为JSON对象
   * @returns 包含isDoor属性的序列化数据
   */
  toJSON(): SashSerializedData;

  /**
   * 从序列化数据反序列化窗扇
   * @param data - 序列化的窗扇数据
   * @returns 当前实例（支持链式调用）
   */
  deserialize(data: SashSerializedData): this;
}