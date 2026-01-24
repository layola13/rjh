/**
 * 假内容模块
 * 用于表示3D场景中的虚拟内容对象，支持位置、缩放、旋转等变换操作
 * @module FakeContent
 */

import { HSCore } from '@/core';
import { ContentType } from '@/content/ContentType';
import { Vector3 } from '@/math/Vector3';

/**
 * 内容元数据接口
 */
export interface ContentMetadata {
  /** 内容分类列表 */
  categories?: string[];
}

/**
 * 内容盒子转储数据接口
 * 用于序列化和反序列化FakeContent对象
 */
export interface ContentBoxDump {
  /** 内容检索ID */
  seekId?: string;
  /** X轴位置 */
  x: number;
  /** Y轴位置 */
  y: number;
  /** Z轴位置 */
  z: number;
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
  /** X轴原始长度 */
  XLength: number;
  /** Y轴原始长度 */
  YLength: number;
  /** Z轴原始长度 */
  ZLength: number;
  /** X轴旋转角度（度） */
  XRotation: number;
  /** Y轴旋转角度（度） */
  YRotation: number;
  /** Z轴旋转角度（度） */
  ZRotation: number;
  /** 翻转标志 */
  flip?: number;
  /** 内容类型字符串 */
  contentType: string;
  /** 内容分类 */
  categories?: string[];
  /** 自定义标签 */
  tag?: string;
}

/**
 * 内容元信息接口
 */
export interface ContentMeta {
  /** 内容检索ID */
  seekId?: string;
  /** X轴原始长度 */
  XLength: number;
  /** Y轴原始长度 */
  YLength: number;
  /** Z轴原始长度 */
  ZLength: number;
  /** 内容类型 */
  contentType: ContentType;
  /** 内容分类 */
  categories?: string[];
}

/**
 * 楼层数据接口
 */
export interface FloorData {
  /** 楼层边界矩形 */
  bound: {
    /** 左边界 */
    left: number;
    /** 上边界 */
    top: number;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
  };
  /** 楼层高度 */
  layerHeight: number;
}

/**
 * 2D坐标点接口
 */
export interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 假内容类
 * 表示3D场景中的虚拟内容对象，支持完整的3D变换（平移、旋转、缩放）
 */
export declare class FakeContent {
  /**
   * 内容检索ID
   */
  seekId?: string;

  /**
   * X轴位置坐标
   */
  x: number;

  /**
   * Y轴位置坐标
   */
  y: number;

  /**
   * Z轴位置坐标
   */
  z: number;

  /**
   * X轴缩放比例
   * @default 1
   */
  XScale: number;

  /**
   * Y轴缩放比例
   * @default 1
   */
  YScale: number;

  /**
   * Z轴缩放比例
   * @default 1
   */
  ZScale: number;

  /**
   * X轴原始长度（未缩放）
   */
  XLength: number;

  /**
   * Y轴原始长度（未缩放）
   */
  YLength: number;

  /**
   * Z轴原始长度（未缩放）
   */
  ZLength: number;

  /**
   * X轴旋转角度（度）
   * @default 0
   */
  XRotation: number;

  /**
   * Y轴旋转角度（度）
   * @default 0
   */
  YRotation: number;

  /**
   * Z轴旋转角度（度）
   * @default 0
   */
  ZRotation: number;

  /**
   * 翻转标志
   * @default 0
   */
  flip: number;

  /**
   * 内容类型
   */
  contentType?: ContentType;

  /**
   * 内容元数据
   */
  metadata?: ContentMetadata;

  /**
   * 自定义标签
   */
  tag?: string;

  /**
   * 唯一标识符
   */
  readonly id: string;

  /**
   * 内部边界对象
   * @internal
   */
  private boundInternal: HSCore.Util.BrepBound;

  /**
   * 2D轮廓点数组（4个顶点）
   */
  outline: Point2D[];

  /**
   * 获取Z轴旋转角度（rotation的别名）
   * @returns Z轴旋转角度（度）
   */
  get rotation(): number;

  /**
   * 获取X轴缩放后的实际尺寸
   * @returns XLength * XScale
   */
  get XSize(): number;

  /**
   * 获取Y轴缩放后的实际尺寸
   * @returns YLength * YScale
   */
  get YSize(): number;

  /**
   * 获取Z轴缩放后的实际尺寸
   * @returns ZLength * ZScale
   */
  get ZSize(): number;

  /**
   * 获取内容的边界包围盒
   * @returns 边界包围盒对象
   */
  get bound(): HSCore.Util.BrepBound;

  /**
   * 构造函数
   * 初始化一个位于原点、无旋转、单位缩放的假内容对象
   */
  constructor();

  /**
   * 从内容盒子转储数据创建FakeContent实例
   * @param dump - 序列化的内容盒子数据
   * @returns 新的FakeContent实例
   */
  static fromContentBoxDump(dump: ContentBoxDump): FakeContent;

  /**
   * 从内容元信息创建FakeContent实例
   * @param meta - 内容元信息
   * @returns 新的FakeContent实例
   */
  static fromContentMeta(meta: ContentMeta): FakeContent;

  /**
   * 从楼层数据创建FakeContent实例
   * 将楼层的2D边界转换为3D内容对象
   * @param floor - 楼层数据
   * @returns 新的FakeContent实例
   */
  static fromFloor(floor: FloorData): FakeContent;

  /**
   * 刷新内部边界包围盒
   * 根据当前的位置、尺寸、旋转重新计算边界和轮廓点
   */
  refreshBoundInternal(): void;

  /**
   * 围绕指定点旋转内容对象
   * @param center - 旋转中心点
   * @param angle - 旋转角度（度）
   */
  rotateAround(center: Point2D, angle: number): void;

  /**
   * 克隆当前内容对象
   * @returns 深拷贝的新FakeContent实例
   */
  clone(): FakeContent;
}

/**
 * X轴缩放比例（导出别名）
 */
export type XScale = number;

/**
 * Y轴缩放比例（导出别名）
 */
export type YScale = number;

/**
 * Z轴缩放比例（导出别名）
 */
export type ZScale = number;

/**
 * X轴长度（导出别名）
 */
export type XLength = number;

/**
 * Y轴长度（导出别名）
 */
export type YLength = number;

/**
 * Z轴长度（导出别名）
 */
export type ZLength = number;

/**
 * X轴旋转角度（导出别名）
 */
export type XRotation = number;

/**
 * Y轴旋转角度（导出别名）
 */
export type YRotation = number;

/**
 * Z轴旋转角度（导出别名）
 */
export type ZRotation = number;