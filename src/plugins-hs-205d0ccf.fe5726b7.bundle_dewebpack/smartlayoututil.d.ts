/**
 * Vector3 类型：表示三维空间中的向量 [x, y, z]
 */
type Vector3 = [number, number, number];

/**
 * 实体位置、旋转、缩放信息
 */
interface EntityTransform {
  /** 实体ID */
  entityId: string;
  /** 唯一标识符 */
  id: string;
  /** 宿主类型 */
  hostType: string;
  /** 材质配置（键值对） */
  materials: Record<string, unknown>;
  /** 旋转角度 [x, y, z]（单位：弧度） */
  rotation: Vector3;
  /** 缩放比例 [x, y, z] */
  scale: Vector3;
  /** 位置坐标 [x, y, z]（单位：米） */
  position: Vector3;
  /** 子实体列表 */
  sub_list: EntityTransform[];
}

/**
 * 智能布局数据结构
 */
interface SmartLayoutData {
  /** 房间唯一标识：格式为 "{roomType}-{id}" */
  id: string;
  /** 房间类型 */
  type: string;
  /** 房间风格 */
  style: string;
  /** 房间面积（单位：平方米） */
  area: number;
  /** 家具信息列表 */
  furniture_info: unknown[];
}

/**
 * 智能布局响应数据
 */
interface SmartLayoutResponse {
  /** 橱柜布局配置：键为橱柜ID，值为内容数组 */
  cabinet: Record<string, EntityTransform[][]>;
  /** 台面布局配置 */
  countertop: Record<string, unknown>;
  /** 桌面布局配置 */
  desktop: Record<string, unknown>;
  /** 结果标签：succeed/failed */
  resultTag: string;
  /** 结果消息 */
  resultMsg: string;
}

/**
 * 房间信息接口
 */
interface RoomInfo {
  /** 房间ID */
  id: string | number;
  /** 房间类型 */
  roomType: string;
  /** 房间面积（可选，如未提供则通过 HSCore.Util.Room.getArea 计算） */
  area?: number;
}

/**
 * 内容模型接口（假设基于 HSCore.Model.Content）
 */
interface ContentModel {
  /** 内容ID */
  id: string;
  /** 查找ID */
  seekId: string;
  /** 获取第一个父节点 */
  getFirstParent(): unknown;
}

/**
 * 智能布局工具类
 * 提供智能布局相关的数据准备、验证和查询功能
 */
export declare class SmartLayoutUtil {
  /**
   * 准备智能布局所需的数据结构
   * @param roomInfo - 房间信息对象
   * @param style - 房间风格
   * @returns 格式化后的智能布局数据
   */
  static prepareSmartLayoutData(
    roomInfo: RoomInfo,
    style: string
  ): SmartLayoutData;

  /**
   * 从内容模型数组中收集所有的 seekId
   * @param contents - 内容模型数组
   * @returns seekId 字符串数组
   */
  static collectJids(contents: ContentModel[]): string[];

  /**
   * 判断模型是否为顶层自定义产品
   * 检查模型是否为以下类型之一：
   * - DAssembly（组装件）
   * - DContent（内容）
   * - DExtruding（拉伸体）
   * - DSweep（扫掠体）
   * - DMolding（造型）
   * - Group（且成员包含上述类型）
   * 
   * @param model - 待检查的模型对象
   * @returns 如果是顶层自定义产品返回 true，否则返回 false
   */
  static isTopLevelCustomizedProduct(model: unknown): boolean;

  /**
   * 判断模型是否为顶层对象
   * 通过检查其第一个父节点是否为 Layer 类型来判断
   * 
   * @param model - 待检查的模型对象
   * @returns 如果是顶层对象返回 true，否则返回 false
   */
  static isToplevel(model: { getFirstParent(): unknown }): boolean;

  /**
   * 获取模拟数据（用于测试）
   * @returns 模拟的智能布局响应数据
   */
  static mockData(): SmartLayoutResponse;

  /**
   * 判断内容模型是否为智能布局内容
   * 需满足以下条件：
   * 1. 是 HSCore.Model.Content 实例
   * 2. 存在目标空间
   * 3. 是推荐配件锚点内容
   * 
   * @param content - 待检查的内容模型
   * @returns 如果是智能布局内容返回 true，否则返回 false
   */
  static isSmartLayoutContent(content: unknown): boolean;

  /**
   * 根据ID获取设计模型
   * 遍历当前应用的平面图，查找匹配ID的内容模型
   * 
   * @param id - 模型ID
   * @returns 匹配的内容模型，如果未找到则返回 undefined
   */
  static getDModelById(id: string): ContentModel | undefined;
}