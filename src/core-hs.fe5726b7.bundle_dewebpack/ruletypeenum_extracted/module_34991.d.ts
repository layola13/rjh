/**
 * 光照组同步和模板管理工具模块
 * 提供灯光信息提取、模板验证、光照组同步等功能
 */

/**
 * 灯光方向信息
 */
interface LightDirectionInfo {
  /** X轴方向分量 */
  dirX: number;
  /** Y轴方向分量 */
  dirY: number;
  /** Z轴方向分量 */
  dirZ: number;
  /** 色温（开尔文） */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 灯光名称列表 */
  name: string[];
  /** 是否为聚光灯 */
  spotLight: true;
}

/**
 * 基础灯光信息
 */
interface BaseLightInfo {
  /** 色温（开尔文） */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 灯光名称列表 */
  name: string[];
}

/**
 * 灯光信息联合类型
 */
type LightInfo = LightDirectionInfo | BaseLightInfo;

/**
 * 模板V3属性配置
 */
interface TemplateV3Property {
  /** 是否为智能模板 */
  isIntelligent: boolean;
  /** 应用的模板名称 */
  appliedName: string;
}

/**
 * 光照组同步结果
 */
interface SyncLightGroupResult {
  /** 吊顶灯带列表 */
  ceilingLightBands: HSCore.Model.MeshLight[];
  /** 非吊顶灯带列表 */
  notCeilingLightBands: HSCore.Model.MeshLight[];
  /** 吊顶吸附物理灯光列表 */
  ceilingSnappedPhyLights: HSCore.Model.Light[];
  /** 非吊顶吸附物理灯光列表 */
  notCeilingSnappedPhyLights: HSCore.Model.Light[];
}

/**
 * 提取实体的灯光信息
 * @param entity - 包含灯光元数据的实体对象
 * @returns 灯光信息对象，如果无有效灯光则返回 false
 */
export declare function getLightInfo(
  entity: { objInfo?: { lights?: Array<{ multiplier?: number; temperature?: number; name: string; targetDir?: { x: number; y: number; z: number } }> } }
): LightInfo | false;

/**
 * 判断是否为空模板（未应用状态）
 * @param templateName - 模板名称
 * @returns 如果是空模板返回 true
 */
export declare function isEmptyTemplate(templateName: string): boolean;

/**
 * 判断当前应用的光照组是否为空模板
 * @param templateName - 已应用的模板名称
 * @returns 如果是空模板返回 true
 */
export declare function isAppliedEmptyTemplate(templateName: string): boolean;

/**
 * 判断是否为V3版本模板（未应用状态）
 * @param templateName - 模板名称
 * @param includeEmpty - 是否包含空模板，默认 false
 * @returns 如果是V3模板返回 true
 */
export declare function isTemplateV3(templateName: string, includeEmpty?: boolean): boolean;

/**
 * 判断当前应用的光照组是否为V3版本模板
 * @param templateName - 已应用的模板名称
 * @param includeEmpty - 是否包含空模板，默认 false
 * @returns 如果是V3模板返回 true
 */
export declare function isAppliedTemplateV3(templateName: string, includeEmpty?: boolean): boolean;

/**
 * 获取V3模板的属性配置
 * 自动识别智能模板或普通模板前缀
 * @param templateName - 模板名称
 * @returns 模板属性对象
 */
export declare function getTemplateV3Property(templateName: string): TemplateV3Property;

/**
 * 获取模板的默认太阳光配置
 * @param templateName - 模板名称
 * @param context - 上下文参数
 * @returns 默认太阳光对象
 */
export declare function getDefaultSunlightForTemplate(
  templateName: string,
  context: unknown
): unknown;

/**
 * 同步光照组与场景内容
 * 遍历场景实体，创建/更新/删除光照组成员，处理灯带、物理灯光等
 * @param layer - 图层对象，包含场景内容
 * @param lightGroup - 需要同步的光照组对象
 * @returns 同步结果，包含分类后的灯光列表
 */
export declare function syncLightGroup(
  layer: {
    forEachContent(callback: (content: HSCore.Model.Entity) => void): void;
    scene: {
      getCustomizedPms(): HSCore.Model.CustomizedPMInstanceModel[];
      getNCustomizedFeatureModels(): HSCore.Model.NCustomizedFeatureModel[];
    };
  },
  lightGroup: {
    members: HSCore.Model.Light[];
    temperature: number;
    appliedTemplate: string;
    addMember(member: HSCore.Model.Light, parent?: HSCore.Model.Entity): void;
    removeMember(member: HSCore.Model.Light): void;
  }
): SyncLightGroupResult;