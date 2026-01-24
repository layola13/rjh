import type HSCore from '@/types/HSCore';
import type HSConstants from '@/types/HSConstants';

/**
 * 灯光尺寸配置
 */
interface LightSize {
  /** 灯光宽度（单位：米） */
  width: number;
  /** 灯光长度（单位：米） */
  length: number;
}

/**
 * 灯光元数据扩展信息
 */
interface LightMetadataExtension {
  /** 色温值（开尔文） */
  temperature?: number;
  [key: string]: unknown;
}

/**
 * 内容项元数据
 */
interface ContentMetadata {
  /** 扩展属性 */
  extension: LightMetadataExtension;
  [key: string]: unknown;
}

/**
 * 内容项
 */
interface ContentItem {
  /** 元数据 */
  metadata: ContentMetadata;
  [key: string]: unknown;
}

/**
 * 灯光实体接口
 */
interface LightEntity {
  /** 获取实体位置 */
  getPosition(): HSCore.Math.Vector3;
  /** 获取实体旋转角度（Z轴） */
  getRotation(): number;
  /** 获取实体尺寸 */
  getSize(): HSCore.Math.Vector3;
  /** 获取内容列表 */
  getContents(): ContentItem[];
}

/**
 * 房间/空间接口
 */
interface RoomEntity {
  /** 判断天花板面是否隐藏 */
  isCeilingFaceHidden(): boolean;
  /** 获取天花板高度 */
  getCeilingHeight(): number;
}

/**
 * 渲染配置选项
 */
interface RenderOptions {
  /** 模板标识键 */
  templateKey: string;
  /** 默认色温值 */
  temperature: number;
  [key: string]: unknown;
}

/**
 * 平面灯光配置
 */
interface FlatLightConfig {
  /** 灯光类型 */
  type: HSCore.Model.LightTypeEnum.FlatLight;
  /** 色温（开尔文，范围：2700-6500） */
  temperature: number;
  /** 光照强度（流明） */
  intensity: number;
  /** 灯光位置 */
  position: HSCore.Math.Vector3;
  /** 灯光高度（距地面距离） */
  height: number;
  /** 灯光尺寸 */
  size: LightSize;
  /** IES光域文件路径（可选） */
  ies: string | undefined;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
}

/**
 * 获取灯光信息
 * @param extension - 元数据扩展对象
 * @returns 灯光信息（包含色温等属性）
 */
declare function getLightInfo(extension: LightMetadataExtension): { temperature?: number } | null;

/**
 * 判断是否为V3版本模板
 * @param templateKey - 模板标识键
 * @returns 如果是V3模板返回true，否则返回false
 */
declare function isTemplateV3(templateKey: string): boolean;

/**
 * 平面灯光计算器
 * 
 * 用于计算V3模板场景中的平面灯光配置，
 * 根据灯具实体属性和房间环境生成合适的灯光参数
 */
export default class FlatLightComputer {
  /**
   * 计算灯光配置
   * 
   * @param entity - 灯光实体对象
   * @param room - 房间/空间对象
   * @param renderOptions - 渲染配置选项
   * @param context - 计算上下文（未使用）
   * @returns 灯光配置数组，如果不满足条件则返回空数组
   * 
   * @remarks
   * - 天花板隐藏时不生成灯光
   * - 仅支持V3版本模板
   * - 夜间模板固定使用5500K色温
   * - 灯光高度必须大于天花板高度的一半
   * - 默认光照强度为4500流明
   */
  protected _compute(
    entity: LightEntity,
    room: RoomEntity,
    renderOptions: RenderOptions,
    context: unknown
  ): FlatLightConfig[];

  /**
   * 验证灯光配置是否有效
   * 
   * @param entity - 灯光实体对象
   * @param room - 房间/空间对象
   * @param renderOptions - 渲染配置选项
   * @returns 始终返回true（当前实现无额外验证逻辑）
   */
  protected _isValid(
    entity: LightEntity,
    room: RoomEntity,
    renderOptions: RenderOptions
  ): boolean;
}