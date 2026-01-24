/**
 * 实体工具模块
 * 提供实体查询、遍历和属性设置等功能
 */

/**
 * 实体内容类型（需根据实际HSCatalog定义补充）
 */
declare enum ContentTypeEnum {
  ParamSwingDoor = 'ParamSwingDoor',
  ParamDrawer = 'ParamDrawer',
  // ... 其他内容类型
}

/**
 * 实体内容类型接口
 */
interface ContentType {
  /**
   * 检查是否为指定类型
   * @param type - 目标内容类型
   */
  isTypeOf(type: ContentTypeEnum): boolean;
}

/**
 * 基础实体接口
 */
interface Entity {
  /** 实体内容类型 */
  contentType?: ContentType;
  /** 子实体集合 */
  children?: Record<string, Entity>;
  /**
   * 遍历子实体
   * @param callback - 对每个子实体执行的回调函数
   */
  forEachChild?(callback: (child: Entity) => void): void;
}

/**
 * 参数化装配体（门板装配）
 */
declare class PAssembly {
  /**
   * 根据ID获取状态
   * @param id - 状态标识符
   */
  getStateById(id: string): State | null;
  /**
   * 重新计算装配体
   */
  compute(): void;
}

/**
 * 状态对象接口
 */
interface State {
  /** 状态值（私有属性，通过__value访问） */
  __value: number;
}

/**
 * 带Y轴长度属性的实体接口
 */
interface EntityWithYLength extends Entity {
  /** Y轴长度参数 */
  __YLength: {
    value: number;
  };
  /**
   * 重新计算实体
   */
  compute(): void;
}

/**
 * 过滤回调函数类型
 * @param entity - 当前实体
 * @returns 如果返回true则包含该实体，false则排除
 */
type FilterCallback = (entity: Entity) => boolean;

/**
 * 从实体数组中递归查找指定内容类型的所有实体
 * 
 * @param entities - 实体数组
 * @param contentType - 目标内容类型
 * @param result - 累积结果数组（可选）
 * @param filterCallback - 过滤回调函数（可选，返回true时跳过该实体）
 * @returns 匹配的实体数组
 */
export function getEntitiesByContentTypeFromEntities(
  entities: Entity[],
  contentType: ContentTypeEnum,
  result?: Entity[],
  filterCallback?: FilterCallback | null
): Entity[];

/**
 * 从单个实体递归查找指定内容类型的所有实体
 * 
 * @param entity - 根实体
 * @param contentType - 目标内容类型
 * @param result - 累积结果数组（可选）
 * @param filterCallback - 过滤回调函数（可选，返回true时跳过该实体）
 * @returns 匹配的实体数组
 */
export function getEntitiesByContentType(
  entity: Entity,
  contentType: ContentTypeEnum,
  result?: Entity[],
  filterCallback?: FilterCallback | null
): Entity[];

/**
 * 根据路径数组从对象中获取嵌套值
 * 
 * @param path - 属性路径数组，如 ['a', 'b', 'c'] 对应 obj.a.b.c
 * @param obj - 目标对象
 * @returns 路径对应的值，如果路径不存在则返回null
 * 
 * @example
 *