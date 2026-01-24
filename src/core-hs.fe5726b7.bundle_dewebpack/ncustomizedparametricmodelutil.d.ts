/**
 * 定制化参数化模型工具类
 * 提供参数化模型的文件解压、墙体距离计算、位置计算等核心功能
 */
export declare class NCustomizedParametricModelUtil {
  /**
   * 解压文档文件
   * 将压缩的文档数据（zippedDoc）解压并还原为完整的文档对象数组
   * 
   * @template T - 文档对象类型
   * @param data - 包含文档数据的对象，可能包含doc或zippedDoc字段
   * @returns 返回解压后的数据对象，如果无需解压则返回原对象
   * 
   * @remarks
   * - 如果data.doc已存在且有长度，直接返回原对象
   * - 如果data.zippedDoc不存在或为空，直接返回原对象
   * - zippedDoc格式：[[constructorName, fieldNames, entries], ...]
   * - 每个entry格式：[[fieldIndex, value], ...]
   */
  static unZipDocFile<T extends UnzipDocData>(data: T): T;

  /**
   * 计算对象到墙面的距离
   * 根据对象的宿主面（墙、地板或天花板）计算对象中心点到墙面的垂直距离
   * 
   * @param entity - 三维实体对象，必须包含位置和尺寸信息
   * @returns 距离值（米），精确到小数点后3位；地板/天花板返回0；计算失败返回0
   * 
   * @remarks
   * - 对于地板和天花板，距离始终为0
   * - 对于墙面，计算局部坐标系Z轴距离减去对象高度的一半
   * - 使用3D转换矩阵进行坐标变换
   */
  static getDistanceToWall(entity: SpatialEntity): number;

  /**
   * 根据到墙面的距离计算对象位置
   * 给定目标距离，计算对象在世界坐标系中的新位置
   * 
   * @param entity - 三维实体对象
   * @param distanceToWall - 目标距离（米）
   * @returns 新的三维位置向量，如果计算失败返回undefined
   * 
   * @remarks
   * - 仅对墙面有效，地板和天花板返回undefined
   * - 需要宿主面具有有效的几何数据和转换矩阵
   * - 自动考虑对象的YSize（高度）进行偏移计算
   */
  static getPosByDistanceToWall(
    entity: SpatialEntity,
    distanceToWall: number
  ): Vector3 | undefined;

  /**
   * 参数变更回调处理
   * 当参数化模型的参数发生变化时触发的回调处理函数
   * 
   * @param entity - 发生变更的实体对象
   * @param params - 变更的参数对象
   * @param context - 回调上下文信息
   * 
   * @remarks
   * 内部委托给PmWallSDK.onParamsChangedCallback处理
   */
  static onParamsChangedCallback(
    entity: unknown,
    params: Record<string, unknown>,
    context: unknown
  ): void;

  /**
   * 根据EID查找装饰线节点
   * 在节点树中递归查找具有指定moldingId的装饰线节点
   * 
   * @param node - 起始搜索节点
   * @param eid - 装饰线实体ID
   * @returns 找到的装饰线节点，未找到返回undefined
   * 
   * @remarks
   * - 深度优先搜索算法
   * - 匹配条件：node.moldingId === eid
   */
  static findMoldingNodeByEid(
    node: TreeNode,
    eid: string | number
  ): MoldingNode | undefined;

  /**
   * 根据EID查找灯槽节点
   * 在节点树中递归查找具有指定slotId的灯槽节点
   * 
   * @param node - 起始搜索节点
   * @param eid - 灯槽实体ID
   * @returns 找到的灯槽节点，未找到返回undefined
   * 
   * @remarks
   * - 深度优先搜索算法
   * - 匹配条件：node.slotId === eid
   */
  static findLightSlotNodeByEid(
    node: TreeNode,
    eid: string | number
  ): LightSlotNode | undefined;
}

/**
 * 解压文档数据结构
 */
interface UnzipDocData {
  /** 已解压的文档对象数组 */
  doc?: Array<Record<string, unknown>>;
  
  /** 压缩的文档数据
   * 格式：[构造函数名, 字段名数组, 条目数组][]
   * 每个条目：[字段索引, 值][]
   */
  zippedDoc?: Array<[string, string[], Array<Array<[number, unknown]>>]>;
}

/**
 * 三维实体对象
 */
interface SpatialEntity {
  /** X坐标 */
  X: number;
  /** Y坐标 */
  Y: number;
  /** Z坐标 */
  Z: number;
  /** Y轴尺寸（高度） */
  YSize: number;
}

/**
 * 三维向量
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 树节点基础接口
 */
interface TreeNode {
  /** 子节点数组 */
  children?: TreeNode[];
}

/**
 * 装饰线节点
 */
interface MoldingNode extends TreeNode {
  /** 装饰线ID */
  moldingId: string | number;
}

/**
 * 灯槽节点
 */
interface LightSlotNode extends TreeNode {
  /** 灯槽ID */
  slotId: string | number;
}