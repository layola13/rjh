/**
 * 应用N个定制化模型材质的请求类
 * 用于处理3D模型面材质的应用、撤销和重做操作
 */

import { HSCore } from 'HSCore';
import { HSApp } from 'HSApp';

/**
 * 脏数据实体信息接口
 */
interface DirtyEntityInfo {
  /** 实体对象 */
  entity: HSCore.Entity;
  /** 面ID列表 */
  faceIds: string[];
}

/**
 * 请求选项配置接口
 */
interface ApplyMaterialOptions {
  /** 是否刷新所有相关内容 */
  refreshAll?: boolean;
}

/**
 * 应用定制化模型材质请求类
 * 继承自状态请求基类，实现材质应用的事务性操作
 */
export declare class ApplyNCustomizedModelMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 混合绘制工具类实例
   */
  private MixPaintUtil: typeof HSApp.PaintPluginHelper.Util.MixPaintUtil;

  /**
   * 需要标记为脏的材质面标签列表
   */
  private dirtyMaterialFaceTag: string[];

  /**
   * 需要标记为脏的实体列表
   */
  private dirtyEntities: DirtyEntityInfo[];

  /**
   * 目标实体对象
   */
  private _entity: HSCore.Entity;

  /**
   * 面ID到材质的映射表
   * key: 面ID
   * value: 材质数据或混合绘制对象
   */
  private _materialMap: Map<string, HSCore.Material.MaterialData | HSCore.Model.MixPaint>;

  /**
   * 请求选项配置
   */
  private _options: ApplyMaterialOptions;

  /**
   * 构造函数
   * @param entity - 目标实体对象
   * @param materialMap - 面ID到材质的映射表
   * @param options - 可选配置参数
   */
  constructor(
    entity: HSCore.Entity,
    materialMap: Map<string, HSCore.Material.MaterialData | HSCore.Model.MixPaint>,
    options?: ApplyMaterialOptions
  );

  /**
   * 检查是否满足应用到单个面的条件
   * 条件：
   * 1. 所有材质都是MixPaint类型
   * 2. 只有一个面，或者所有面都属于同一个面组
   * @returns 是否满足条件
   */
  private _meetConditionForApplyOneFace(): boolean;

  /**
   * 应用材质到单个面ID
   * 处理面组和普通面的材质应用逻辑
   */
  private _applyToOneFaceId(): void;

  /**
   * 提交事务时执行
   * 主要逻辑：
   * 1. 判断是否可以简化为单面处理
   * 2. 提取面组ID并处理
   * 3. 应用材质到各个面
   * 4. 更新面组背景材质
   * 5. 标记脏数据触发重绘
   * @param args - 传递给父类的参数
   */
  onCommit(args?: unknown[]): void;

  /**
   * 撤销事务时执行
   * 恢复到事务执行前的状态
   * @param args - 传递给父类的参数
   */
  onUndo(args?: unknown[]): void;

  /**
   * 重做事务时执行
   * 重新应用事务操作
   * @param args - 传递给父类的参数
   */
  onRedo(args?: unknown[]): void;

  /**
   * 标记材质为脏，触发渲染更新
   * 根据脏数据类型选择几何体刷新或面材质刷新
   */
  private dirtyMaterial(): void;

  /**
   * 判断是否可以进行字段级事务处理
   * @returns 始终返回true，表示支持字段级事务
   */
  canTransactField(): boolean;

  /**
   * 序列化请求参数为字符串数组
   * 用于事务记录和持久化
   * @param args - 请求参数数组 [entity, materialMap, options]
   * @returns 序列化后的字符串数组，包含材质引用的seekId列表
   */
  static stringifyRequestArgs(args: [HSCore.Entity, Map<string, HSCore.Material.MaterialData | HSCore.Model.MixPaint>, ApplyMaterialOptions?]): string[];

  /**
   * 异步解析请求参数字符串
   * 从序列化的参数中恢复材质引用
   * @param args - 序列化的参数字符串数组
   * @returns Promise，解析完成后返回产品数据
   */
  static parseRequestArgsAsync(args: string[]): Promise<void>;
}