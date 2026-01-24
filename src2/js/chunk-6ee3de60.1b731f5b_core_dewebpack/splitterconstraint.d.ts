/**
 * SplitterConstraint 模块
 * 用于管理位置约束和旋转约束的双向关系
 */

/**
 * 约束标识符类型
 */
export type ConstraintId = string | number;

/**
 * SplitterConstraint 类
 * 管理元素之间的位置约束（posConstr）和旋转约束（rotConstr）
 */
export class SplitterConstraint {
  /**
   * 位置约束映射表
   * 键：约束 ID，值：与该 ID 存在位置约束关系的其他 ID 集合
   */
  private posConstr: Map<ConstraintId, Set<ConstraintId>>;

  /**
   * 旋转约束映射表
   * 键：约束 ID，值：与该 ID 存在旋转约束关系的其他 ID 集合
   */
  private rotConstr: Map<ConstraintId, Set<ConstraintId>>;

  /**
   * 构造函数
   * 初始化位置约束和旋转约束的映射表
   */
  constructor();

  /**
   * 设置位置约束关系
   * @param source - 源约束 ID
   * @param target - 目标约束 ID
   * @param bidirectional - 是否建立双向约束关系，默认为 true
   */
  setPosConstr(source: ConstraintId, target: ConstraintId, bidirectional?: boolean): void;

  /**
   * 设置旋转约束关系
   * @param source - 源约束 ID
   * @param target - 目标约束 ID
   * @param bidirectional - 是否建立双向约束关系，默认为 true
   */
  setRotConstr(source: ConstraintId, target: ConstraintId, bidirectional?: boolean): void;

  /**
   * 移除指定 ID 的所有位置约束
   * 同时从其他约束的关系集合中删除该 ID
   * @param id - 要移除的约束 ID
   */
  rmPosConstr(id: ConstraintId): void;

  /**
   * 移除指定 ID 的所有旋转约束
   * 同时从其他约束的关系集合中删除该 ID
   * @param id - 要移除的约束 ID
   */
  rmRotConstr(id: ConstraintId): void;

  /**
   * 获取与指定 ID 存在位置约束关系的所有 ID
   * @param id - 查询的约束 ID
   * @returns 相关联的约束 ID 数组，若不存在则返回空数组
   */
  getPos(id: ConstraintId): ConstraintId[];

  /**
   * 获取与指定 ID 存在旋转约束关系的所有 ID
   * @param id - 查询的约束 ID
   * @returns 相关联的约束 ID 数组，若不存在则返回空数组
   */
  getRot(id: ConstraintId): ConstraintId[];
}