/**
 * 差异工具辅助模块
 * Module: DiffToolGizmoUtil
 * Original ID: 325192
 */

import { HSCore } from './HSCore';

/**
 * 差异工具 Gizmo 参数接口
 */
interface DiffToolGizmoParams {
  /** 实体对象 */
  entity: unknown;
  [key: string]: unknown;
}

/**
 * 差异工具高亮 Gizmo 基类
 */
interface IDiffToolHighlightGizmo {
  // 基类 Gizmo 接口定义
}

/**
 * 默认高亮 Gizmo 实现
 */
declare class DefaultHighlightGizmo implements IDiffToolHighlightGizmo {
  constructor(
    param1: unknown,
    param2: unknown,
    params: DiffToolGizmoParams,
    param4: unknown
  );
}

/**
 * 自定义结构高亮 Gizmo 实现
 */
declare class CustomizedStructureHighlightGizmo implements IDiffToolHighlightGizmo {
  constructor(
    param1: unknown,
    param2: unknown,
    params: DiffToolGizmoParams,
    param4: unknown
  );
}

/**
 * 差异工具 Gizmo 工具类
 * 提供创建和管理差异工具可视化组件的静态方法
 */
export declare class DiffToolGizmoUtil {
  private constructor();

  /**
   * 获取差异工具高亮 Gizmo
   * 根据实体类型自动选择合适的 Gizmo 实现
   * 
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @param params - 包含实体信息的参数对象
   * @param param4 - 第四个参数
   * @returns 对应类型的高亮 Gizmo 实例
   * 
   * @remarks
   * - 如果实体是 NCustomizedStructure 类型，返回 CustomizedStructureHighlightGizmo
   * - 否则返回 DefaultHighlightGizmo
   */
  static getDiffToolHighLightGizmo(
    param1: unknown,
    param2: unknown,
    params: DiffToolGizmoParams,
    param4: unknown
  ): IDiffToolHighlightGizmo;
}