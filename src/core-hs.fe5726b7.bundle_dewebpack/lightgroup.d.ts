/**
 * LightGroup模块
 * 灯光组管理系统，提供灯光模板、灯光分组和序列化功能
 */

import { Entity, Entity_IO } from './Entity';
import { Light, LightTypeEnum } from './Light';
import { LightSubGroup } from './LightSubGroup';
import { CustomizedModel } from './CustomizedModel';
import { VolumeLightOption } from './VolumeLightOption';
import { Logger } from './Logger';
import { Params as SunlightParams } from './SunlightParams';

// ==================== 灯光模板枚举 ====================

/**
 * 基础灯光模板（V3版本专用）
 * 包含智能灯光和特殊模板
 */
export declare enum LightGroupTemplateV3BaseEnum {
  /** 智能-自然光3 */
  INTELLIGENT_NATURE_3 = 'intelligent-day-nature-3',
  /** 智能-夜间 */
  INTELLIGENT_NIGHT = 'intelligent-night',
  /** 智能-冷色调3 */
  INTELLIGENT_DAY_CHILLY_3 = 'intelligent-day-chilly-3',
  /** 智能-真实感 */
  INTELLIGENT_REALISTIC = 'intelligent-day-realistic',
  /** 智能-通用 */
  INTELLIGENT_GENERAL = 'intelligent-general',
  /** 智能-装配 */
  INTELLIGENT_ASSEMBLY = 'intelligent-assembly',
  /** 智能-VIFA */
  INTELLIGENT_VIFA = 'intelligent-vifa',
  /** 智能-VIFA黄昏 */
  INTELLIGENT_VIFA_DUSK = 'intelligent-vifa-dusk',
  /** 智能-VIFA夜间 */
  INTELLIGENT_VIFA_NIGHT = 'intelligent-vifa-night',
  /** 智能-ACESCG */
  INTELLIGENT_ACESCG = 'intelligent-acescg',
  /** 智能-真实感2 */
  INTELLIGENT_DAY_REALISTIC_2 = 'intelligent-day-realistic-2',
  /** 普通-室外 */
  NORMAL_OUTDOOR = 'normal-day-outdoor',
  /** 普通-特殊空白3 */
  NORMAL_SPECIAL_EMPTY_3 = 'normal-special-empty-3',
}

/**
 * 完整灯光模板枚举
 * 包含所有可用的灯光预设模板
 */
export declare enum LightGroupTemplateEnum {
  // 普通模板
  /** 普通-自然光 */
  NORMAL_NATURE = 'normal-day-nature',
  /** 普通-暖光 */
  NORMAL_WARM = 'normal-day-warm',
  /** 普通-暖白光 */
  NORMAL_WARMWHITE = 'normal-day-warm-white',
  /** 普通-冷光 */
  NORMAL_CHILLY = 'normal-day-chilly',
  /** 普通-夜间暖光 */
  NORMAL_NIGHT_WARM = 'normal-night-warm',
  /** 普通-夜间暖白光 */
  NORMAL_NIGHT_WARMWHITE = 'normal-night-warm-white',
  /** 普通-夜间冷光 */
  NORMAL_NIGHT_CHILLY = 'normal-night-chilly',
  /** 普通-夜间冷白光 */
  NORMAL_NIGHT_COLD = 'normal-night-cold',
  /** 普通-自然光2 */
  NORMAL_NATURE_2 = 'normal-day-nature-2',

  // 智能模板
  /** 智能-自然光 */
  INTELLIGENT_NATURE = 'intelligent-day-nature',
  /** 智能-暖光 */
  INTELLIGENT_WARM = 'intelligent-day-warm',
  /** 智能-暖白光 */
  INTELLIGENT_WARMWHITE = 'intelligent-day-warm-white',
  /** 智能-冷光 */
  INTELLIGENT_CHILLY = 'intelligent-day-chilly',
  /** 智能-夜间暖光 */
  INTELLIGENT_NIGHT_WARM = 'intelligent-night-warm',
  /** 智能-夜间暖白光 */
  INTELLIGENT_NIGHT_WARMWHITE = 'intelligent-night-warm-white',
  /** 智能-夜间冷光 */
  INTELLIGENT_NIGHT_CHILLY = 'intelligent-night-chilly',
  /** 智能-夜间冷白光 */
  INTELLIGENT_NIGHT_COLD = 'intelligent-night-cold',
  /** 智能-自然光2 */
  INTELLIGENT_NATURE_2 = 'intelligent-day-nature-2',

  // V3扩展模板
  INTELLIGENT_NATURE_3 = 'intelligent-day-nature-3',
  INTELLIGENT_NIGHT = 'intelligent-night',
  INTELLIGENT_DAY_CHILLY_3 = 'intelligent-day-chilly-3',
  INTELLIGENT_REALISTIC = 'intelligent-day-realistic',
  INTELLIGENT_GENERAL = 'intelligent-general',
  INTELLIGENT_ASSEMBLY = 'intelligent-assembly',
  INTELLIGENT_VIFA = 'intelligent-vifa',
  INTELLIGENT_VIFA_DUSK = 'intelligent-vifa-dusk',
  INTELLIGENT_VIFA_NIGHT = 'intelligent-vifa-night',
  INTELLIGENT_ACESCG = 'intelligent-acescg',
  INTELLIGENT_DAY_REALISTIC_2 = 'intelligent-day-realistic-2',
  NORMAL_OUTDOOR = 'normal-day-outdoor',
  NORMAL_SPECIAL_EMPTY_3 = 'normal-special-empty-3',
}

/**
 * V3版本灯光模板集合
 * 用于快速检查模板是否为V3版本
 */
export declare const LightGroupTemplateV3Set: ReadonlySet<string>;

/**
 * 空白灯光模板枚举
 * 用于无预设灯光的场景
 */
export declare enum LightGroupEmptyTemplateEnum {
  /** 默认空白模板 */
  Default = 'normal-empty',
  /** V3空白模板 */
  V3 = 'normal-empty-3',
}

/**
 * 空白模板集合
 * 用于判断模板是否为空白类型
 */
export declare const LightGroupEmptyTemplateSet: ReadonlySet<string>;

// ==================== 接口定义 ====================

/**
 * 灯光组序列化数据结构
 */
interface LightGroupDumpData {
  /** 色温 */
  temperature: string;
  /** 灯光组名称 */
  name: string;
  /** 阳光选项配置 */
  sunlightOptions: SunlightParams;
  /** 是否为智能灯光 */
  isSmart: boolean;
  /** 是否自动曝光 */
  isAutoExposure: boolean;
  /** 高光过曝参数 */
  highlightBurn?: number;
  /** 成员灯光ID列表 */
  members: string[];
  /** 应用的模板类型 */
  appliedTemplate: LightGroupTemplateEnum;
  /** 体积光属性 */
  volumeLightAttr: Record<string, unknown>;
  /** 渲染绑定类型 */
  renderBindingType: HSConstants.Render.TemplateRenderBinding;
}

/**
 * 灯光组加载配置
 */
interface LightGroupLoadContext {
  /** 版本号 */
  version: string;
  [key: string]: unknown;
}

/**
 * 灯光组创建选项
 */
interface LightGroupCreateOptions {
  /** 是否为智能灯光组 */
  isSmart?: boolean;
}

/**
 * 灯光实体类型
 * 支持的灯光类型联合
 */
type LightEntity = Light | HSCore.Model.MeshLight | HSCore.Model.PhysicalLight | HSCore.Model.SpotPhysicalLight;

// ==================== 序列化类 ====================

/**
 * 灯光组序列化处理类
 * 负责灯光组的持久化和还原
 */
export declare class LightGroup_IO extends Entity_IO {
  /**
   * 序列化灯光组
   * @param entity - 灯光组实体
   * @param callback - 序列化完成回调
   * @param includeMembers - 是否包含成员灯光
   * @param options - 额外选项
   * @returns 序列化数据数组
   */
  dump(
    entity: LightGroup,
    callback?: (data: unknown[], entity: Entity) => void,
    includeMembers?: boolean,
    options?: Record<string, unknown>
  ): LightGroupDumpData[];

  /**
   * 反序列化灯光组
   * @param entity - 目标灯光组实体
   * @param data - 序列化数据
   * @param context - 加载上下文
   */
  load(entity: LightGroup, data: LightGroupDumpData, context: LightGroupLoadContext): void;

  /**
   * 反序列化后处理
   * @param entity - 灯光组实体
   * @param context - 加载上下文
   */
  postLoad(entity: LightGroup, context: LightGroupLoadContext): void;

  /**
   * 迁移虚拟灯光（版本兼容处理）
   * @param entity - 灯光组实体
   * @private
   */
  private _migrateVirtualLights(entity: LightGroup): void;
}

// ==================== 灯光组类 ====================

/**
 * 灯光组实体
 * 管理一组相关灯光的容器，支持模板应用、批量操作和友好索引
 */
export declare class LightGroup extends Entity {
  /**
   * 灯光类型与友好索引的映射表
   * 用于为新灯光分配唯一的友好索引
   * @private
   */
  private _friendlyIndices: Map<LightTypeEnum, Map<string, Set<number>>>;

  /** 成员灯光列表 */
  members: LightEntity[];

  /** 搜索ID（用于快速查找） */
  seekId: string;

  /** 色温值 */
  temperature: string;

  /** 灯光组名称 */
  name: string;

  /** 阳光配置选项 */
  sunlightOptions: SunlightParams;

  /** 是否为智能灯光模式 */
  isSmart: boolean;

  /** 是否启用自动曝光 */
  isAutoExposure: boolean;

  /** 高光过曝阈值 */
  highlightBurn?: number;

  /** 体积光配置 */
  volumeLightConfig: VolumeLightOption;

  /** 当前应用的模板类型 */
  appliedTemplate: LightGroupTemplateEnum;

  /** 渲染绑定类型（控制哪些渲染类型使用此灯光组） */
  renderBindingType: HSConstants.Render.TemplateRenderBinding;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param doc - 所属文档
   */
  constructor(id?: string, doc?: unknown);

  /**
   * 创建灯光组
   * @param options - 创建选项
   * @returns 新的灯光组实例
   */
  static create(options?: LightGroupCreateOptions): LightGroup;

  /**
   * 判断是否绑定到指定渲染类型
   * @param renderType - 渲染类型
   * @returns 是否绑定
   */
  isBindingTo(renderType: HSConstants.Render.RenderType): boolean;

  /**
   * 根据ID查找成员
   * @param id - 实体ID
   * @returns 找到的实体或undefined
   */
  findMember(id: string): LightGroup | LightEntity | undefined;

  /**
   * 检查是否包含指定成员
   * @param entity - 灯光实体
   * @returns 是否包含
   */
  hasMember(entity: LightEntity): boolean;

  /**
   * 添加成员灯光
   * @param entity - 灯光实体
   * @param parent - 父节点（用于场景树管理）
   * @param index - 插入索引
   */
  addMember(entity: LightEntity, parent?: Entity, index?: number): void;

  /**
   * 批量设置属性
   * @param properties - 属性键值对
   */
  set(properties: Partial<LightGroup>): void;

  /**
   * 移除成员灯光
   * @param entity - 灯光实体
   */
  removeMember(entity: LightEntity): void;

  /**
   * 为新灯光添加友好索引
   * @param entity - 灯光实体
   */
  addFriendlyIndex(entity: Light): void;

  /**
   * 移除灯光的友好索引
   * @param entity - 灯光实体
   */
  removeFriendlyIndex(entity: Light): void;

  /**
   * 遍历所有成员
   * @param callback - 回调函数
   * @param thisArg - this上下文
   */
  forEachMember(callback: (entity: LightEntity) => void, thisArg?: unknown): void;

  /**
   * 包含成员（触发更新）
   * @param entity - 灯光实体
   */
  include(entity: LightEntity): void;

  /**
   * 获取序列化处理器
   * @returns IO实例
   */
  getIO(): LightGroup_IO;

  /**
   * 克隆灯光组
   * @param name - 新名称
   * @param sunlightOptions - 阳光配置（可选）
   * @returns 克隆的灯光组
   */
  clone(name?: string, sunlightOptions?: SunlightParams): LightGroup;

  /**
   * 移除所有成员灯光
   */
  removeAllMembers(): void;

  /**
   * 更新所有成员的友好索引
   * 在加载或大量修改后调用
   */
  updateFriendlyIndex(): void;

  /**
   * 更改灯光的友好索引分组
   * @param entity - 灯光实体
   * @param oldGroup - 旧分组标识
   */
  changeFriendlyIndex(entity: Light, oldGroup: string): void;

  /**
   * 获取可用的友好索引
   * @param lightType - 灯光类型
   * @param group - 分组标识
   * @returns 可用的最小正整数索引
   */
  getAvailableFriendlyIndex(lightType: LightTypeEnum, group: string): number;

  /**
   * 内部方法：添加灯光友好索引到映射表
   * @param entity - 灯光实体
   * @private
   */
  private _addLightFriendlyIndex(entity: Light): void;
}