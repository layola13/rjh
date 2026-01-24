/**
 * 人物图像工具模块
 * 用于在视图中添加男性或女性人物图像
 */

import Vector from './Vector'; // 假设模块0导出Vector类
import { ToolType } from './ToolType'; // 假设模块5导出ToolType枚举
import { DragDrawTool } from './DragDrawTool'; // 假设模块45导出DragDrawTool基类
import { FillPatternType } from './FillPatternType'; // 假设模块2导出FillPatternType枚举

/**
 * 人物图像信息元组
 * [填充模式类型, 宽度, 高度, 缩放比例, 宽高比, 起始向量, 结束向量]
 */
type PersonImageInfo = [
  FillPatternType,
  number,
  number,
  number,
  number,
  Vector,
  Vector
];

/**
 * 人物图像配置数据
 * [宽度, 高度, 缩放值, 宽高比, 起始偏移向量, 结束偏移向量]
 */
type ImageConfigData = [number, number, number, number, Vector, Vector];

/**
 * 拖拽事件对象接口
 */
interface DragEvent {
  /** 拖拽区域的边界框 */
  box: {
    /** 边界框的中心点 */
    center: Vector;
  };
}

/**
 * 形状管理器接口
 */
interface ShapeManager {
  /**
   * 添加额外的人物图像到画布
   * @param fillPattern - 填充模式类型（男性/女性）
   * @param width - 图像宽度
   * @param height - 图像高度
   * @param startVector - 起始位置向量
   * @param aspectRatio - 宽高比
   * @param center - 中心位置向量
   * @param endVector - 结束位置向量
   * @param scale - 缩放比例
   */
  addExtraPersonImage(
    fillPattern: FillPatternType,
    width: number,
    height: number,
    startVector: Vector,
    aspectRatio: number,
    center: Vector,
    endVector: Vector,
    scale: number
  ): void;
}

/**
 * 工具管理器接口
 */
interface ToolManager {
  /**
   * 释放当前工具
   */
  releaseTool(): void;
}

/**
 * 视图参数接口
 */
interface ViewParams {
  /** 额外尺寸的吸附距离 */
  extraDimSnapDist: number;
}

/**
 * 视图接口
 */
interface View {
  /** 形状管理器实例 */
  shapeManager: ShapeManager;
  /** 工具管理器实例 */
  toolManager: ToolManager;
  /** 视图参数配置 */
  params: ViewParams;
}

/**
 * 额外人物图像工具类
 * 继承自拖拽绘制工具，用于添加男性或女性人物图像
 */
export declare class ExtraPersonImageTool extends DragDrawTool {
  /** 当前工具类型（男性或女性图像） */
  private readonly tool: ToolType;
  
  /** 关联的视图实例 */
  private readonly view: View;
  
  /** 虚拟形状数组 */
  private vshapes: unknown[];
  
  /** 吸附距离阈值 */
  private snapDist: number;

  /**
   * 构造函数
   * @param toolType - 工具类型（extraManImage 或 extraWomenImage）
   * @param view - 视图实例
   */
  constructor(toolType: ToolType, view: View);

  /**
   * 创建人物图像的配置信息
   * @returns 包含图像类型和配置参数的元组
   * @throws {Error} 当工具类型未知时抛出错误
   */
  protected createExtraPersonImage(): PersonImageInfo;

  /**
   * 获取预定义的人物图像信息映射表
   * @returns 包含男性和女性图像配置的Map对象
   * @static
   */
  static getImageInfo(): Map<FillPatternType, ImageConfigData>;

  /**
   * 完成拖拽操作，将人物图像添加到视图
   * @param event - 拖拽事件对象，包含边界框信息
   */
  protected finishDrag(event: DragEvent): void;
}