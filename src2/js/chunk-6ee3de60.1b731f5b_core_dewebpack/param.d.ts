/**
 * 型材参数配置模块
 * 管理窗户各组件的尺寸参数
 */

import { ShapeType } from './ShapeType';

/**
 * 型材尺寸配置接口
 */
export interface ProfileSizes {
  /** 框架尺寸 (mm) */
  frame: number;
  /** 框中梃尺寸 (mm) */
  frameMullion: number;
  /** 大框中梃尺寸 (mm) */
  frameMullionLg: number;
  /** 扇型材尺寸 (mm) */
  sash: number;
  /** 上扇尺寸 (mm) */
  upSash: number;
  /** 下扇尺寸 (mm) */
  downSash: number;
  /** 互锁尺寸 (mm) */
  interlock: number;
  /** 扇中梃尺寸 (mm) */
  sashMullion: number;
  /** 纱窗尺寸 (mm) */
  screen: number;
  /** 开启腰尺寸 (mm) */
  kfcWaist: number;
  /** 压条尺寸 (mm) */
  bead: number;
  /** 防盗尺寸 (mm) */
  antiTheft: number;
  /** 防盗中梃尺寸 (mm) */
  antiTheftMullion: number;
  /** 防盗孔高度 (mm) */
  antiTheftHoleHeight: number;
  /** 防盗间隙 (mm) */
  antiTheftGap: number;
  /** 防盗把手宽度 (mm) */
  antiTheftHandleW: number;
  /** 装饰条尺寸 (mm) */
  decorationBar: number;
  /** 角连接件尺寸 (mm) */
  cornerJoiner: number;
  /** 连接件尺寸 (mm) */
  connector: number;
  /** 框铣削尺寸 (mm) */
  millingFrame: number;
  /** 扇铣削尺寸 (mm) */
  millingSash: number;
  /** 玻璃间隙 (mm) */
  glassGap: number;
  /** 遮阳扇尺寸 (mm) */
  shadeSash: number;
  /** 遮阳中梃尺寸 (mm) */
  shadeMullion: number;
}

/**
 * 型材参数管理类
 * 提供窗户各组件的尺寸参数配置和查询功能
 */
export declare class Param {
  /** 框架型材宽度 (mm) */
  frame: number;
  
  /** 框中梃型材宽度 (mm) */
  frameMullion: number;
  
  /** 大框中梃型材宽度 (mm) */
  frameMullionLg: number;
  
  /** 加强框中梃型材宽度 (mm) */
  reinforcedFrameMullion: number;
  
  /** 扇中梃型材宽度 (mm) */
  sashMullion: number;
  
  /** 扇型材宽度 (mm) */
  sash: number;
  
  /** 护栏扇宽度 (mm) */
  guardSash: number;
  
  /** 上扇型材宽度 (mm) */
  upSash: number;
  
  /** 下扇型材宽度 (mm) */
  downSash: number;
  
  /** 互锁型材宽度 (mm) */
  interlock: number;
  
  /** 纱窗型材宽度 (mm) */
  screen: number;
  
  /** 压条宽度 (mm) */
  bead: number;
  
  /** 防盗型材宽度 (mm) */
  antiTheft: number;
  
  /** 防盗中梃宽度 (mm) */
  antiTheftMullion: number;
  
  /** 防盗孔高度 (mm) */
  antiTheftHoleHeight: number;
  
  /** 防盗间隙 (mm) */
  antiTheftGap: number;
  
  /** 防盗把手宽度 (mm) */
  antiTheftHandleW: number;
  
  /** 遮阳扇宽度 (mm) */
  shadeSash: number;
  
  /** 遮阳扇中梃宽度 (mm) */
  shadeSashMullion: number;
  
  /** 遮阳中梃宽度 (mm) */
  shadeMullion: number;
  
  /** 开启腰高度 (mm) */
  kfcWaist: number;
  
  /** 角连接件长度 (mm) */
  cornerJoiner: number;
  
  /** 连接件长度 (mm) */
  connector: number;
  
  /** 额外尺寸 (mm) */
  extraDim: number;
  
  /** 额外尺寸吸附距离 (mm) */
  extraDimSnapDist: number;
  
  /** 角度长度 (mm) */
  angleLength: number;
  
  /** 装饰条宽度 (mm) */
  decorationBar: number;
  
  /** 框铣削深度 (mm) */
  millingFrame: number;
  
  /** 扇铣削深度 (mm) */
  millingSash: number;
  
  /** 玻璃间隙 (mm) */
  glassGap: number;
  
  /** 形状类型与参数获取器映射表 */
  private readonly sobj: Map<ShapeType, () => number>;

  /**
   * 构造函数
   * 初始化所有默认参数值并建立形状类型映射
   */
  constructor();

  /**
   * 根据形状类型获取对应的尺寸参数
   * @param shapeType - 形状类型枚举值
   * @returns 对应的尺寸值(mm)，如果类型不存在则返回undefined
   */
  get(shapeType: ShapeType): number | undefined;

  /**
   * 输出所有型材尺寸配置
   * @returns 包含所有型材尺寸的配置对象
   */
  outputProfileSizes(): ProfileSizes;
}