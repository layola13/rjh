/**
 * 吊顶灯光计算模块
 * 用于计算和生成天花板平面光源的参数
 */

import BaseComputer from './BaseComputer';
import { isTemplateV3, getLightInfo } from './TemplateUtils';

/**
 * 光源尺寸接口
 */
interface LightSize {
  /** 光源宽度（米） */
  width: number;
  /** 光源长度（米） */
  length: number;
}

/**
 * 光源配置接口
 */
interface LightConfig {
  /** 光源类型 */
  type: HSCore.Model.LightTypeEnum;
  /** 色温（开尔文） */
  temperature: number;
  /** 光照强度 */
  intensity: number;
  /** 光源位置 */
  position: Vector3;
  /** 光源高度（米） */
  height: number;
  /** 光源尺寸 */
  size: LightSize;
  /** IES光度文件（可选） */
  ies?: string;
  /** X轴旋转角度（度） */
  XRotation: number;
  /** Y轴旋转角度（度） */
  YRotation: number;
  /** Z轴旋转角度（度） */
  ZRotation: number;
}

/**
 * 模板配置接口
 */
interface TemplateConfig {
  /** 模板标识符 */
  templateKey: string;
  /** 默认色温（开尔文） */
  temperature: number;
}

/**
 * 实体接口
 */
interface Entity {
  /** 获取实体位置 */
  getPosition(): Vector3;
  /** 获取实体旋转角度 */
  getRotation(): number;
  /** 获取实体尺寸 */
  getSize(): Vector3;
  /** 获取实体内容 */
  getContents(): Array<{ metadata: { extension: unknown } }>;
}

/**
 * 空间接口
 */
interface Space {
  /** 获取天花板高度（米） */
  getCeilingHeight(): number;
  /** 判断天花板面是否隐藏 */
  isCeilingFaceHidden(): boolean;
}

/**
 * 三维向量接口
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 夜间模式色温常量（开尔文）
 */
const NIGHT_MODE_TEMPERATURE = 5500;

/**
 * 默认光照强度
 */
const DEFAULT_LIGHT_INTENSITY = 4500;

/**
 * 光源与天花板的安全距离（米）
 */
const CEILING_OFFSET = 0.1;

/**
 * 吊顶灯光计算器
 * 负责计算吊顶灯具产生的平面光源参数
 */
export default class CeilingLightComputer extends BaseComputer {
  /**
   * 计算光源配置
   * @param entity - 灯具实体对象
   * @param space - 所在空间对象
   * @param templateConfig - 模板配置
   * @param context - 上下文参数（未使用）
   * @returns 光源配置数组
   */
  _compute(
    entity: Entity,
    space: Space,
    templateConfig: TemplateConfig,
    context?: unknown
  ): LightConfig[] {
    // 如果天花板面被隐藏，不生成光源
    if (space.isCeilingFaceHidden()) {
      return [];
    }

    // 仅支持V3版本模板
    if (!isTemplateV3(templateConfig.templateKey)) {
      return [];
    }

    // 获取光源元数据信息
    const lightInfo = getLightInfo(entity.getContents()[0]?.metadata?.extension);
    
    // 确定色温：优先使用元数据，否则使用模板默认值
    let temperature = lightInfo?.temperature ?? templateConfig.temperature;

    // 夜间模式使用固定色温
    if (templateConfig.templateKey === HSConstants.Render.TEMPLATE_NAME_V3.NIGHT) {
      temperature = NIGHT_MODE_TEMPERATURE;
    }

    const position = entity.getPosition();
    const rotation = entity.getRotation();
    const height = position.z - CEILING_OFFSET;

    // 光源必须位于天花板高度的一半以上
    if (height < space.getCeilingHeight() / 2) {
      return [];
    }

    const entitySize = entity.getSize();
    const lightSize: LightSize = {
      width: entitySize.x / 2,
      length: entitySize.y / 2,
    };

    const lightConfig: LightConfig = {
      type: HSCore.Model.LightTypeEnum.FlatLight,
      temperature,
      intensity: DEFAULT_LIGHT_INTENSITY,
      position,
      height,
      size: lightSize,
      ies: undefined,
      XRotation: 0,
      YRotation: 0,
      ZRotation: rotation,
    };

    return [lightConfig];
  }

  /**
   * 验证参数有效性
   * @param entity - 灯具实体对象
   * @param space - 所在空间对象
   * @param templateConfig - 模板配置
   * @returns 始终返回true
   */
  _isValid(entity: Entity, space: Space, templateConfig: TemplateConfig): boolean {
    return true;
  }
}