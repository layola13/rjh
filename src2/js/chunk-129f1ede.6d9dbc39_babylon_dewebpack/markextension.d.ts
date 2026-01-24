import { Color4, Vector3, TransformNode, Scene, Mesh, Quaternion } from '@babylonjs/core';

/**
 * 标注位置枚举
 */
export enum MarkPos {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
  Front = 'front',
  Back = 'back'
}

/**
 * 3D点坐标对象
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 标注创建配置参数
 */
export interface MarkCreateOptions {
  /** 标注位置方向 */
  markPos: MarkPos;
  /** 起始点坐标 */
  startPos: Vector3;
  /** 结束点坐标 */
  endPos: Vector3;
}

/**
 * 标注数据源（从模型解析）
 */
export interface MarkData {
  /** 起始点 */
  startPt: Point3D;
  /** 结束点 */
  endPt: Point3D;
}

/**
 * 文本标注创建参数
 */
export interface TextMarkOptions {
  /** 显示文本内容 */
  value?: string;
  /** 文字高度 */
  height?: number;
  /** 文字厚度 */
  thickness?: number;
  /** 字体名称 */
  font?: string;
  /** 文字颜色 */
  color?: string;
  /** 世界坐标位置 */
  pos?: Vector3;
}

/**
 * 3D文字书写器配置
 */
export interface WriterOptions {
  /** 锚点位置 */
  anchor: 'center' | 'left' | 'right';
  /** 字母高度 */
  'letter-height': number;
  /** 字母厚度 */
  'letter-thickness': number;
  /** 字母原点 */
  'letter-origin': 'letter-center' | 'letter-top' | 'letter-bottom';
  /** 字体系列 */
  'font-family': string;
  /** 颜色 */
  color: string;
  /** 位置 */
  position: Vector3;
}

/**
 * 3D文字书写器接口
 */
export interface IWriter {
  /** 获取文字网格 */
  getMesh(): Mesh;
  /** 释放资源 */
  dispose(): void;
}

/**
 * 文字书写器构造函数类型
 */
export type WriterConstructor = new (text: string, options: WriterOptions) => IWriter;

/**
 * 标注扩展管理器
 * 负责在3D场景中创建和管理尺寸标注
 */
export declare class MarkExtension {
  /** 单例实例 */
  private static instance?: MarkExtension;

  /** 整体缩放比例 */
  scale: number;
  /** 字母高度 */
  letter_height: number;
  /** 字母厚度 */
  letter_thickness: number;
  /** 字体系列 */
  font_family: string;
  /** 文字颜色 */
  color: string;
  /** 标注线颜色 */
  line_color: Color4;
  /** 数值标注最小宽度 */
  value_width_min: number;
  /** 数值标注最大宽度 */
  value_width_max: number;
  /** 法线长度（标注线端点长度） */
  normal_length: number;
  /** 标注节点集合 */
  marks: TransformNode[];
  /** 文字书写器集合 */
  writers: IWriter[];
  /** Babylon.js场景 */
  scene?: Scene;
  /** 文字书写器类 */
  Writer?: WriterConstructor;

  constructor();

  /**
   * 获取单例实例
   */
  static GetInstance(): MarkExtension;

  /**
   * 初始化标注系统
   * @param scene Babylon.js场景对象
   */
  Init(scene: Scene): void;

  /**
   * 清理所有标注
   */
  Clean(): void;

  /**
   * 关闭标注系统并释放资源
   */
  Close(): void;

  /**
   * 设置所有标注的显示状态
   * @param enabled 是否启用显示，默认true
   */
  DoSetStatus(enabled?: boolean): void;

  /**
   * 解析并批量创建标注
   * @param markDataList 标注数据列表
   * @param parent 父节点
   */
  AnalysisMarks(markDataList: MarkData[], parent: TransformNode): void;

  /**
   * 创建单个标注
   * @param options 标注创建配置
   * @param parent 父节点
   */
  Create(options: MarkCreateOptions, parent?: TransformNode): void;

  /**
   * 创建文字标注
   * @param options 文本标注配置
   * @returns 文字书写器实例或undefined
   */
  CreateMark(options: TextMarkOptions): IWriter | undefined;
}

/**
 * 标注元素类
 * 表示单个标注的数据结构
 */
export declare class MarkElement {
  // 预留扩展属性
}