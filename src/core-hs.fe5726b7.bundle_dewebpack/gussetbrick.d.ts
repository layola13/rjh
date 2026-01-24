/**
 * GussetBrick模块 - 用于处理加强板（Gusset）的3D建模实例
 * 原始模块ID: 8066
 */

import * as THREE from 'three';

/**
 * 加强板元数据装饰器
 * 负责处理加强板的厚度和尺寸计算
 */
declare class GussetMetaDecorator {
  /**
   * 元数据对象
   */
  readonly meta: GussetMetaData;

  /**
   * 加强板厚度（单位：米）
   */
  readonly thickness: number;

  /**
   * Z轴长度的一半
   */
  readonly hZLength: number;

  /**
   * @param meta - 加强板元数据
   */
  constructor(meta: GussetMetaData);

  /**
   * 计算加强板的实际厚度
   * @returns 厚度值，如果有attrBaseline属性则使用该值（转换为米），否则使用ZLength
   */
  private _getThickness(): number;
}

/**
 * 加强板元数据接口
 */
interface GussetMetaData {
  /**
   * Z轴方向长度
   */
  ZLength: number;

  /**
   * 基准线属性（单位：毫米），用于定义厚度
   */
  attrBaseline?: number;
}

/**
 * 加强板砖块类
 * 表示3D场景中的一个加强板实例，包含位置、旋转、缩放等变换信息
 */
export declare class GussetBrick {
  /**
   * 唯一标识符
   */
  readonly id: string | number;

  /**
   * 元数据装饰器
   */
  readonly metaDecorator: GussetMetaDecorator;

  /**
   * 视图空间的平移向量
   */
  viewTranslation: THREE.Vector3;

  /**
   * 视图空间的旋转四元数
   */
  viewRotation: THREE.Quaternion;

  /**
   * 视图空间的缩放向量
   */
  viewScale: THREE.Vector3;

  /**
   * @param id - 加强板实例的唯一标识
   * @param metaDecorator - 元数据装饰器
   */
  constructor(id: string | number, metaDecorator: GussetMetaDecorator);

  /**
   * 将世界坐标转换为局部中心坐标
   * @param point - 世界坐标点
   * @param boundingBox - 可选的边界框，用于验证点是否在范围内
   * @param shouldValidate - 是否需要验证点在边界框内
   * @returns 局部坐标（相对于边界框最小点），如果验证失败则返回undefined
   */
  static toLocalCenter(
    point: THREE.Vector2,
    boundingBox?: THREE.Box2,
    shouldValidate?: boolean
  ): THREE.Vector2 | undefined;

  /**
   * 设置视图变换矩阵
   * @param position - 平移位置（x, y坐标）
   * @param rotationY - 绕Y轴的旋转角度（弧度）
   * @param target - 目标对象，可以是Face或其他类型，决定Z轴偏移方向
   */
  setViewTransfrom(
    position: THREE.Vector2,
    rotationY: number,
    target: HSCore.Model.Face | unknown
  ): void;
}

/**
 * 加强板模型实例
 * 管理多个加强板砖块的集合
 */
export declare class GussetModelInstance {
  /**
   * 加强板砖块数组
   */
  bricks: GussetBrick[];

  /**
   * 元数据装饰器
   */
  readonly metaDecorator: GussetMetaDecorator;

  /**
   * 原始元数据
   */
  readonly metaData: GussetMetaData;

  /**
   * @param metaData - 加强板元数据
   */
  constructor(metaData: GussetMetaData);
}

/**
 * HSCore命名空间声明（外部依赖）
 */
declare namespace HSCore.Model {
  /**
   * 面对象类型
   */
  interface Face {
    // 具体属性由HSCore库定义
  }
}