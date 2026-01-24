/**
 * 数据规范化工具模块
 * 提供数据的normalize和denormalize功能,用于处理复杂对象结构
 */

/**
 * 不可变数据工具类型检查接口
 */
interface ImmutableUtils {
  /**
   * 检查对象是否为不可变类型
   * @param obj - 待检查的对象
   * @returns 是否为不可变对象
   */
  isImmutable(obj: unknown): boolean;
}

/**
 * Schema基类接口
 */
interface SchemaBase {
  /**
   * Schema的唯一标识键
   */
  key: string;

  /**
   * 获取实体的ID
   * @param entity - 实体对象
   * @returns 实体的唯一标识
   */
  getId(entity: Record<string, unknown>): string | number;
}

/**
 * 实体Schema接口
 */
interface EntitySchema extends SchemaBase {
  /**
   * 反规范化实体
   * @param entity - 规范化后的实体数据
   * @param denormalizeFunc - 递归反规范化函数
   * @returns 完整的实体对象
   */
  denormalize<T>(entity: unknown, denormalizeFunc: DenormalizeFunc): T;

  /**
   * 规范化实体
   * @param entity - 原始实体对象
   * @param parent - 父级对象
   * @param key - 当前键名
   * @param normalizeFunc - 递归规范化函数
   * @param addEntity - 添加实体回调
   * @returns 规范化后的数据
   */
  normalize?(
    entity: unknown,
    parent: unknown,
    key: string,
    normalizeFunc: NormalizeFunc,
    addEntity: AddEntityCallback
  ): unknown;
}

/**
 * 包含denormalize方法的Schema接口
 */
interface DenormalizableSchema {
  /**
   * 反规范化方法
   * @param input - 输入数据
   * @param denormalizeFunc - 递归反规范化函数
   * @returns 反规范化后的数据
   */
  denormalize<T>(input: unknown, denormalizeFunc: DenormalizeFunc): T;
}

/**
 * 包含normalize方法的Schema接口
 */
interface NormalizableSchema {
  /**
   * 标准化方法
   * @param input - 输入数据
   * @param parent - 父级对象
   * @param key - 当前键名
   * @param normalizeFunc - 递归规范化函数
   * @param addEntity - 添加实体回调
   * @returns 标准化后的数据
   */
  normalize(
    input: unknown,
    parent: unknown,
    key: string,
    normalizeFunc: NormalizeFunc,
    addEntity: AddEntityCallback
  ): unknown;
}

/**
 * Schema类型联合
 */
type Schema = EntitySchema | DenormalizableSchema | NormalizableSchema;

/**
 * 规范化函数类型
 */
type NormalizeFunc = (
  data: unknown,
  parent: unknown,
  key: string,
  schema: Schema,
  addEntity: AddEntityCallback
) => unknown;

/**
 * 反规范化函数类型
 */
type DenormalizeFunc = (id: unknown, schema: Schema) => unknown;

/**
 * 添加实体回调函数类型
 */
type AddEntityCallback = (schema: SchemaBase, entity: unknown) => void;

/**
 * 规范化后的实体存储结构
 */
interface NormalizedEntities {
  [schemaKey: string]: {
    [entityId: string]: Record<string, unknown>;
  };
}

/**
 * 实体获取函数类型
 */
type GetEntityFunc = (id: unknown, schema: SchemaBase) => unknown;

/**
 * 规范化数据
 * 将嵌套的对象结构扁平化为规范化的实体存储
 * 
 * @param data - 待规范化的数据
 * @param parent - 父级对象引用
 * @param key - 当前数据的键名
 * @param schema - 数据Schema定义(可选)
 * @param addEntity - 添加实体的回调函数
 * @returns 规范化后的数据引用(通常为ID)
 */
export declare function normalize(
  data: unknown,
  parent: unknown,
  key: string,
  schema: Schema | Schema[] | undefined,
  addEntity: AddEntityCallback
): unknown;

/**
 * 反规范化数据
 * 将规范化的实体存储还原为完整的嵌套对象结构
 * 
 * @param entities - 规范化的实体存储对象
 * @returns 反规范化函数,接收ID和Schema返回完整对象
 */
export declare function createDenormalizer(
  entities: Record<string, Record<string, unknown>> | ImmutableMap
): DenormalizeFunc;

/**
 * 创建实体获取器
 * 支持普通对象和不可变数据结构
 * 
 * @param entities - 实体存储对象
 * @returns 实体获取函数
 */
declare function createEntityGetter(
  entities: Record<string, Record<string, unknown>> | ImmutableMap
): GetEntityFunc;

/**
 * 不可变Map类型(如Immutable.js的Map)
 */
interface ImmutableMap {
  /**
   * 按路径获取值
   * @param path - 访问路径数组
   * @returns 获取的值
   */
  getIn(path: Array<string | number>): unknown;
}

/**
 * 反规范化入口函数
 * 将ID或ID数组通过Schema还原为完整对象
 * 
 * @param input - 规范化的数据(ID或ID数组)
 * @param schema - Schema定义
 * @param denormalizeFunc - 递归反规范化函数
 * @returns 完整的对象或对象数组
 */
export declare function denormalize<T>(
  input: unknown,
  schema: Schema | Schema[],
  denormalizeFunc: DenormalizeFunc
): T;

/**
 * 缓存对象,用于存储反规范化过程中的中间结果
 * 防止循环引用导致的无限递归
 */
type DenormalizeCache = NormalizedEntities;

/**
 * 默认导出的反规范化工厂函数
 * 
 * @param entities - 规范化后的实体存储
 * @returns 反规范化函数,接收(input, schema)返回完整对象
 */
export default function createDenormalizerWithCache(
  entities: Record<string, Record<string, unknown>> | ImmutableMap
): (input: unknown, schema: Schema | Schema[]) => unknown;