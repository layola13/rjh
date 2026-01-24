/**
 * 灯光子组模块
 * 提供灯光组的序列化/反序列化和组管理功能
 */

import type { Entity, EntityFlagEnum } from './Entity';
import type { Light, Light_IO, LightTypeEnum } from './Light';
import type { EntityField } from './EntityField';

/**
 * 成员属性配置基类
 */
interface MemberPropertiesConfig {
  // 成员属性配置的基础接口
}

/**
 * 点光源子组成员属性
 */
declare class PointLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 平面光源子组成员属性
 */
declare class FlatLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 虚拟区域光源子组成员属性
 */
declare class VirtualAreaLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 聚光灯子组成员属性
 */
declare class SpotLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 衰减聚光灯子组成员属性
 */
declare class AttenuatedSpotLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 网格光源子组成员属性
 */
declare class MeshLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 物理光源子组成员属性
 */
declare class PhysicalLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 聚光物理光源子组成员属性
 */
declare class SpotPhysicalLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 通用光源子组成员属性
 */
declare class GeneralLightSubGroupMemberProperties implements MemberPropertiesConfig {}

/**
 * 序列化转储选项
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * 序列化数据格式
 */
interface SerializedData {
  /** 成员ID列表 */
  members: string[];
  /** 成员属性配置 */
  memberPropertiesConfig?: MemberPropertiesConfig;
  /** 组交互模式 */
  groupInteractionMode?: boolean;
  /** 内容ID */
  contentID?: string;
  [key: string]: unknown;
}

/**
 * 3D坐标点
 */
interface Vec2 {
  x: number;
  y: number;
}

/**
 * 3D坐标点
 */
interface Vec3 extends Vec2 {
  z: number;
}

/**
 * 包围盒
 */
interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
  reset(): void;
  appendBound(bound: Bound): void;
}

/**
 * 灯光子组序列化/反序列化处理器
 * 负责灯光子组的持久化操作
 */
export declare class LightSubGroup_IO extends Light_IO {
  /**
   * 将灯光子组导出为可序列化的数据结构
   * @param entity - 要导出的灯光子组实体
   * @param callback - 导出完成后的回调函数
   * @param recursive - 是否递归导出子成员（默认true）
   * @param options - 导出选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: LightSubGroup,
    callback?: (data: SerializedData[], entity: LightSubGroup) => void,
    recursive?: boolean,
    options?: DumpOptions
  ): SerializedData[];

  /**
   * 从序列化数据加载灯光子组
   * @param entity - 要加载到的目标实体
   * @param data - 序列化的数据
   * @param context - 加载上下文
   */
  load(
    entity: LightSubGroup,
    data: SerializedData,
    context: unknown
  ): void;
}

/**
 * 灯光子组
 * 管理多个灯光实体作为一个组，支持组级别的变换和属性配置
 */
export declare class LightSubGroup extends Light {
  /**
   * 内部成员列表
   * @private
   */
  private __members: Light[];

  /**
   * 内部X坐标
   * @private
   */
  private __x: number;

  /**
   * 内部Y坐标
   * @private
   */
  private __y: number;

  /**
   * 内部Z坐标
   * @private
   */
  private __z: number;

  /**
   * X轴旋转角度（度）
   */
  XRotation: number;

  /**
   * Y轴旋转角度（度）
   */
  YRotation: number;

  /**
   * Z轴旋转角度（度）
   */
  ZRotation: number;

  /**
   * 组成员列表
   */
  members: Light[];

  /**
   * 成员属性配置
   * 根据成员类型动态确定配置类
   */
  memberPropertiesConfig?: MemberPropertiesConfig;

  /**
   * 组交互模式
   * true: 作为整体交互, false: 可单独选择成员
   */
  groupInteractionMode: boolean;

  /**
   * 成员代理对象
   * 用于代表整个组的典型成员
   * @private
   */
  private _memberProxy?: Light;

  /**
   * 灯光类型（固定为SubGroup）
   */
  readonly type: LightTypeEnum.SubGroup;

  /**
   * 构造函数
   * @param id - 实体唯一标识符（可选）
   */
  constructor(id?: string);

  /**
   * 静态工厂方法：从灯光列表创建子组
   * @param lights - 要组合的灯光列表
   * @param updateProperties - 是否自动更新成员属性（默认true）
   * @returns 新创建的灯光子组
   */
  static create(lights: Light[], updateProperties?: boolean): LightSubGroup;

  /**
   * 克隆当前子组
   * @returns 包含克隆成员的新子组
   */
  clone(): LightSubGroup;

  /**
   * 根据灯光类型创建对应的成员属性配置
   * @param lightType - 灯光类型枚举
   * @returns 对应的成员属性配置实例
   */
  static createMemberPropertiesConfig(lightType: LightTypeEnum): MemberPropertiesConfig;

  /**
   * 将嵌套的子组展平为单层成员列表
   * @returns 所有叶子节点灯光的数组
   */
  toFlatMemberList(): Light[];

  /**
   * 标记位置脏数据（需要更新）
   * @param options - 脏数据标记选项
   */
  dirtyPosition(options?: Record<string, unknown>): void;

  /**
   * 标记几何形状脏数据（需要更新）
   * @param options - 脏数据标记选项
   */
  dirtyGeometry(options?: Record<string, unknown>): void;

  /**
   * 字段变更回调
   * @param fieldName - 变更的字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * 添加成员到组
   * @param light - 要添加的灯光实体
   */
  addMember(light: Light): void;

  /**
   * 从组中移除成员
   * @param light - 要移除的灯光实体
   */
  removeMember(light: Light): void;

  /**
   * 判断是否为虚拟光源
   * @returns 如果成员代理是虚拟光源则返回true
   */
  isVirtual(): boolean;

  /**
   * 判断是否具有区域尺寸
   * @returns 始终返回true（子组总是有区域）
   */
  hasAreaSize(): boolean;

  /**
   * 内部方法：设置成员列表
   * @param newMembers - 新的成员数组
   * @private
   */
  private _setMembers(newMembers: Light[]): void;

  /**
   * 内部方法：添加成员
   * @param light - 要添加的灯光
   * @returns 是否添加成功
   * @private
   */
  private _addMember(light: Light): boolean;

  /**
   * 内部方法：移除成员
   * @param light - 要移除的灯光
   * @returns 是否移除成功
   * @private
   */
  private _removeMember(light: Light): boolean;

  /**
   * 获取成员代理对象
   * 代理对象代表组中最典型的成员
   */
  get memberProxy(): Light;

  /**
   * 设置成员代理对象
   * @param light - 新的代理成员（必须是组的子成员）
   */
  set memberProxy(light: Light);

  /**
   * 遍历所有成员
   * @param callback - 对每个成员执行的回调函数
   * @param context - 回调函数的this上下文
   */
  forEachMember(
    callback: (member: Light) => void,
    context?: unknown
  ): void;

  /**
   * 检查是否包含指定成员
   * @param light - 要检查的灯光实体
   * @param recursive - 是否递归检查子组（默认true）
   * @returns 如果包含该成员则返回true
   */
  hasMember(light: Light, recursive?: boolean): boolean;

  /**
   * 内部方法：旋转组
   * @param angle - 旋转角度（度）
   * @param center - 旋转中心点（可选）
   * @private
   */
  private _rotate(angle: number, center?: Vec2): void;

  /**
   * 设置实体标志位为开启状态
   * @param flag - 标志位枚举
   * @param triggerEvent - 是否触发事件
   * @param applyToMembers - 是否应用到所有成员（默认true）
   */
  setFlagOn(
    flag: EntityFlagEnum,
    triggerEvent: boolean,
    applyToMembers?: boolean
  ): void;

  /**
   * 设置实体标志位为关闭状态
   * @param flag - 标志位枚举
   * @param triggerEvent - 是否触发事件
   * @param applyToMembers - 是否应用到所有成员（默认true）
   */
  setFlagOff(
    flag: EntityFlagEnum,
    triggerEvent: boolean,
    applyToMembers?: boolean
  ): void;

  /**
   * 获取IO处理器实例
   * @returns 对应的序列化处理器
   */
  getIO(): LightSubGroup_IO;

  /**
   * 刷新内部包围盒
   * 根据所有成员重新计算组的边界和尺寸
   * @private
   */
  private refreshBoundInternal(): void;

  /**
   * 内部方法：处理XYZ坐标变更
   * @param fieldName - 变更的坐标字段名（'x'|'y'|'z'）
   * @param oldValue - 旧坐标值
   * @private
   */
  private _onXYZChanged(fieldName: string, oldValue: number): void;

  /**
   * 内部方法：移动组
   * @param offset - 各轴的偏移量 {x?, y?, z?}
   * @private
   */
  private _move(offset: Partial<Vec3>): void;

  /**
   * 验证组的有效性
   * 移除无效成员，若成员不足则标记为删除
   * @returns 验证后组是否仍然有效
   */
  verify(): boolean;

  /**
   * 检查组是否有效
   * @returns 成员数量大于1则返回true
   */
  isValid(): boolean;

  /**
   * 标志位变更回调
   * @param event - 标志位变更事件
   */
  onFlagChanged(event: { data: { flag: EntityFlagEnum } }): void;

  /**
   * 成员代理选择方法
   * 选择坐标和最大的成员作为代理
   * @param prev - 前一个候选成员
   * @param current - 当前候选成员
   * @returns 更合适的代理成员
   */
  static MemberProxyMethod(prev: Light, current: Light): Light;
}