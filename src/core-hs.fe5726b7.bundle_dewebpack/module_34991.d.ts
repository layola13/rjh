/**
 * 灯光组同步与模板工具类型定义
 * @module LightGroupUtils
 */

/**
 * 灯光方向和属性信息
 */
export interface LightInfo {
  /** 灯光方向X分量（仅聚光灯） */
  dirX?: number;
  /** 灯光方向Y分量（仅聚光灯） */
  dirY?: number;
  /** 灯光方向Z分量（仅聚光灯） */
  dirZ?: number;
  /** 色温（开尔文） */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 灯光名称列表 */
  name: string[];
  /** 是否为聚光灯 */
  spotLight?: boolean;
}

/**
 * 模板V3属性配置
 */
export interface TemplateV3Property {
  /** 是否为智能模板 */
  isIntelligent: boolean;
  /** 应用的模板名称 */
  appliedName: string;
}

/**
 * 灯光组同步结果
 */
export interface LightGroupSyncResult {
  /** 天花板灯带列表 */
  ceilingLightBands: HSCore.Model.MeshLight[];
  /** 非天花板灯带列表 */
  notCeilingLightBands: HSCore.Model.MeshLight[];
  /** 天花板吸顶物理灯光列表 */
  ceilingSnappedPhyLights: HSCore.Model.Light[];
  /** 非天花板吸顶物理灯光列表 */
  notCeilingSnappedPhyLights: HSCore.Model.Light[];
}

/**
 * 从实体元数据扩展信息中提取灯光属性
 * @param entity - 包含元数据的实体对象
 * @returns 返回灯光信息对象，如果实体不包含有效灯光则返回false
 */
export function getLightInfo(entity: {
  objInfo?: {
    lights?: Array<{
      multiplier?: number;
      temperature?: number;
      name: string;
      targetDir?: { x: number; y: number; z: number };
    }>;
  };
}): LightInfo | false;

/**
 * 判断模板名称是否为空模板（V3版本之前）
 * @param templateName - 模板名称
 * @returns 如果是空模板返回true
 */
export function isEmptyTemplate(templateName: string): boolean;

/**
 * 判断已应用的模板是否为空模板
 * @param templateName - 已应用的模板名称
 * @returns 如果是空模板返回true
 */
export function isAppliedEmptyTemplate(templateName: string): boolean;

/**
 * 判断模板是否为V3版本模板
 * @param templateName - 模板名称
 * @param includeEmpty - 是否包含空模板，默认false
 * @returns 如果是V3模板返回true
 */
export function isTemplateV3(templateName: string, includeEmpty?: boolean): boolean;

/**
 * 判断已应用的模板是否为V3版本模板
 * @param templateName - 已应用的模板名称
 * @param includeEmpty - 是否包含空模板，默认false
 * @returns 如果是V3模板返回true
 */
export function isAppliedTemplateV3(templateName: string, includeEmpty?: boolean): boolean;

/**
 * 获取V3模板的属性配置
 * 自动检测并返回智能版或普通版模板的实际应用名称
 * @param templateName - 原始模板名称
 * @returns 返回模板属性配置对象
 */
export function getTemplateV3Property(templateName: string): TemplateV3Property;

/**
 * 获取指定模板的默认太阳光配置
 * @param templateName - 模板名称
 * @param scene - 场景对象
 * @returns 返回默认太阳光配置
 */
export function getDefaultSunlightForTemplate(
  templateName: string,
  scene: unknown
): unknown;

/**
 * 同步图层与灯光组的所有灯光实体
 * 
 * 功能说明：
 * - 扫描图层中所有内容，识别包含灯光的实体
 * - 同步或创建对应的灯光对象（MeshLight、PhysicalLight、SpotPhysicalLight）
 * - 处理灯带路径、参数化楼梯灯光、组装件灯光等复杂场景
 * - 清理已删除实体的灯光引用
 * - 分类返回不同类型的灯光列表
 * 
 * @param layer - 需要同步的图层对象
 * @param lightGroup - 目标灯光组对象
 * @returns 返回分类后的灯光同步结果
 */
export function syncLightGroup(
  layer: HSCore.Model.Layer,
  lightGroup: HSCore.Model.LightGroup
): LightGroupSyncResult;