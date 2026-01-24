/**
 * 灯光计算模块
 * @module LightComputer
 */

import { default as BaseLight } from './module_42288';
import { LightContentGroup } from './module_3442';

/**
 * 三维位置坐标
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 二维尺寸
 */
interface Size2D {
  x: number;
  y: number;
  z: number;
}

/**
 * 灯光配置
 */
interface LightConfig {
  /** 灯光类型 */
  type: HSCore.Model.LightTypeEnum;
  /** 色温 */
  temperature: number;
  /** 光强 */
  intensity: number;
  /** 位置 */
  position: Position3D;
  /** 高度 */
  height: number;
  /** IES光域网文件 */
  ies?: string;
}

/**
 * 灯光元素接口
 */
interface LightElement {
  /** 获取位置 */
  getPosition(): Position3D;
  /** 获取尺寸 */
  getSize(): Size2D;
  /** 获取旋转角度 */
  getRotation(): number;
  /** 获取轮廓点 */
  getOutline?(): Array<{ x: number; y: number }>;
  /** 获取子元素 */
  getChildren?(): Array<LightElement>;
}

/**
 * 房间接口
 */
interface Room {
  /** 检查天花板是否隐藏 */
  isCeilingFaceHidden(): boolean;
  /** 获取天花板高度 */
  getCeilingHeight(): number;
}

/**
 * 渲染选项
 */
interface RenderOptions {
  /** 模板键名 */
  templateKey: string;
}

/**
 * 最近边缘信息
 */
interface ClosestEdgeInfo {
  /** 距离 */
  distance?: number;
}

/**
 * 默认灯光属性
 */
interface DefaultLightProps {
  /** 光强 */
  intensity: number;
  /** 色温 */
  temperature: number;
  /** IES光域网文件 */
  ies?: string;
}

/**
 * 灯光计算器类
 * 用于计算室内灯光的位置和配置
 */
export default class LightComputer extends BaseLight {
  /**
   * 计算灯光配置
   * @param element - 灯光元素
   * @param room - 房间对象
   * @param options - 渲染选项
   * @param additionalParam - 额外参数
   * @returns 灯光配置数组
   */
  protected _compute(
    element: LightElement,
    room: Room,
    options: RenderOptions,
    additionalParam: unknown
  ): LightConfig[];

  /**
   * 调整位置
   * @param position - 原始位置或二维坐标
   * @param room - 房间对象
   * @param offset - 偏移量
   * @returns 调整后的位置坐标，如果无法调整则返回 null
   */
  protected _adjustPosition(
    position: Position3D | THREE.Vector2,
    room: Room,
    offset: number
  ): { x: number; y: number } | null;

  /**
   * 获取默认灯光高度
   * @param room - 房间对象
   * @returns 灯光高度值
   */
  protected getDefaultHeight(room: Room): number;

  /**
   * 获取默认灯光属性
   * @param element - 灯光元素
   * @param room - 房间对象
   * @param options - 渲染选项
   * @returns 默认灯光属性
   */
  protected getDefaultLight(
    element: LightElement,
    room: Room,
    options: RenderOptions
  ): DefaultLightProps;

  /**
   * 获取最近的边缘
   * @param room - 房间对象
   * @param point - 参考点
   * @param direction - 方向向量
   * @returns 最近边缘信息
   */
  protected getClosestEdge(
    room: Room,
    point: THREE.Vector2,
    direction: THREE.Vector2
  ): ClosestEdgeInfo;
}

/**
 * 全局常量命名空间
 */
declare namespace HSConstants {
  namespace Render {
    /** 渲染模板名称 V3 版本 */
    const TEMPLATE_NAME_V3: {
      /** 夜晚模板 */
      NIGHT: string;
      /** 冷色调模板 3 */
      CHILLY_3: string;
    };
  }

  namespace RenderLight {
    /** 安全高度比例系数 */
    const SAFE_HEIGHT_SCALE: number;
  }
}

/**
 * 核心模型命名空间
 */
declare namespace HSCore.Model {
  /** 灯光类型枚举 */
  enum LightTypeEnum {
    /** 聚光灯 */
    SpotLight = 'SpotLight',
  }
}