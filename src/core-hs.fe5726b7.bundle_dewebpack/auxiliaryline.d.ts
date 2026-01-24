/**
 * 辅助线模块
 * 提供辅助线实体的创建、操作和序列化功能
 */

import { Line2d } from './Line2d';
import { Entity, Entity_IO } from './Entity';
import { Loader } from './Loader';
import { Matrix3 } from './Matrix3';
import { Vector2 } from './Vector2';

/**
 * 辅助线标志枚举
 * 定义辅助线的状态标志位
 */
export declare const AuxiliaryLineFlagEnum: {
  /** 激活状态标志 */
  readonly active: 256;
};

/**
 * 辅助线序列化/反序列化接口
 * 处理辅助线实体的导入导出操作
 */
export declare class AuxiliaryLine_IO extends Entity_IO {
  /**
   * 将辅助线实体序列化为JSON对象
   * @param entity - 要序列化的辅助线实体
   * @param callback - 序列化后的回调函数
   * @param includeGeometry - 是否包含几何数据
   * @param options - 额外的序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: AuxiliaryLine,
    callback?: (data: unknown[], entity: AuxiliaryLine) => void,
    includeGeometry?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 从JSON数据反序列化辅助线实体
   * @param entity - 目标辅助线实体
   * @param data - 序列化的数据对象
   * @param loader - 加载器实例
   */
  load(
    entity: AuxiliaryLine,
    data: { line: unknown },
    loader: typeof Loader
  ): void;

  /**
   * 获取单例实例
   */
  static instance(): AuxiliaryLine_IO;
}

/**
 * 辅助线实体类
 * 表示图形编辑器中的辅助线对象，用于辅助绘图和对齐
 */
export declare class AuxiliaryLine extends Entity {
  /** 辅助线的几何数据（二维直线） */
  line: Line2d;

  /**
   * 构造函数
   * @param id - 实体唯一标识符
   * @param flags - 实体标志位
   */
  constructor(id?: string, flags?: number);

  /**
   * 静态工厂方法：根据给定直线创建辅助线
   * @param sourceLine - 源直线对象（可选）
   * @returns 新创建的辅助线实例
   * @remarks 如果提供源直线，会克隆该直线并在两端延伸100个单位
   */
  static create(sourceLine?: Line2d): AuxiliaryLine;

  /**
   * 镜像变换
   * @param transform - 包含变换矩阵的对象
   * @remarks 应用镜像变换后会标记几何数据为脏状态
   */
  mirror(transform: { matrix3: Matrix3 }): void;

  /**
   * 平移变换
   * @param offset - 平移向量
   * @remarks 应用平移后会标记几何数据为脏状态
   */
  translate(offset: Vector2): void;

  /**
   * 获取对应的IO处理器实例
   * @returns 辅助线的IO处理器
   */
  getIO(): AuxiliaryLine_IO;

  /**
   * 标记几何数据为需要更新状态
   * @protected
   */
  protected dirtyGeometry(): void;
}

/**
 * 全局常量命名空间
 */
declare global {
  const HSConstants: {
    ModelClass: {
      AuxiliaryLine: string;
    };
  };
}