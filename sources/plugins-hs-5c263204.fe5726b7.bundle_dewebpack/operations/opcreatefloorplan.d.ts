/**
 * 户型创建操作模块
 * 提供基于模板的户型自动生成功能
 */

import { BaseOperation } from './BaseOperation';
import { OperationId } from './OperationId';
import { HSCore, HSFPConstants, HSApp } from './types/core';

/**
 * 长度单位类型枚举
 */
declare enum LengthUnitTypeEnum {
  meter = 'meter',
  feet = 'feet',
  // 其他单位...
}

/**
 * 房间类型枚举
 */
declare enum RoomTypeEnum {
  LivingDiningRoom = 'LivingDiningRoom',
  LivingRoom = 'LivingRoom',
  Bedroom = 'Bedroom',
  MasterBedroom = 'MasterBedroom',
  SecondBedroom = 'SecondBedroom',
  Bathroom = 'Bathroom',
  MasterBathroom = 'MasterBathroom',
  SecondBathroom = 'SecondBathroom',
}

/**
 * 户型模板设计数据
 */
interface TemplateDesign {
  /** 缩略图URL */
  thumbnailUrl: string;
  /** 设计JSON数据URL */
  designJsonUrl: string;
  /** 户型面积 */
  area: number | string;
  /** 其他设计元数据 */
  [key: string]: unknown;
}

/**
 * 创建户型操作参数
 */
interface CreateFloorPlanParams {
  /** 子类型标识 */
  subType: string;
  /** 户型面积 */
  area: number;
  /** 卧室数量 */
  Bedroom: number;
  /** 客厅数量 */
  LivingRoom: number;
  /** 卫生间数量 */
  Bathroom: number;
  /** 面积是否包含单位 */
  isAreaExitUnit?: boolean;
}

/**
 * 操作执行上下文
 */
interface ExecuteContext {
  /** 操作参数 */
  params: CreateFloorPlanParams;
  /** 回复处理函数 */
  reply: (message: string) => void;
  /** 功能完成标志 */
  isFuncDone?: boolean;
  /** 操作结果 */
  result?: {
    actionType: 'ok' | 'create' | 'cancel';
    [key: string]: unknown;
  };
  /** 推荐的后续操作类型列表 */
  recommendedOperationTypes?: string[];
}

/**
 * 选项块配置
 */
interface BlockOption {
  type: 'blockOption';
  /** 可选项列表 */
  options: Array<{ label: string; value: string }>;
  /** 当前选中值 */
  value: string | null;
  /** 点击回调 */
  onClick: (value: string) => void;
}

/**
 * 选择项配置
 */
interface SelectionOption {
  /** 选项索引 */
  index: number;
  /** 选项显示文本 */
  label: string;
}

/**
 * 房间数量统计结果
 */
interface RoomsCount {
  /** 卧室数量 */
  bedroomNum: number;
  /** 客厅数量 */
  livingroomNum: number;
  /** 卫生间数量 */
  bathroomNum: number;
}

/**
 * 户型创建操作类
 * 负责根据用户需求（面积、房间数量）从模板库中检索并创建户型
 */
export declare class OpCreateFloorPlan extends BaseOperation {
  /** 候选模板设计列表 */
  private _templateDesign: TemplateDesign[];
  
  /** 当前选中的模板索引 */
  private _templateIndex: number;

  constructor();

  /**
   * 执行户型创建操作
   * @param context - 操作执行上下文
   */
  onExecute(context: ExecuteContext): void;

  /**
   * 户型创建流程主逻辑
   * 根据参数检索合适的模板设计
   * @param context - 操作执行上下文
   */
  private createFloorPlanProcess(context: ExecuteContext): void;

  /**
   * 展示模板选择消息
   * 允许用户从检索到的模板中选择或重新生成
   * @param context - 操作执行上下文
   */
  private createFloorPlanMessage(context: ExecuteContext): void;

  /**
   * 执行户型创建动作
   * 处理当前设计保存逻辑后创建新户型
   * @param context - 操作执行上下文
   */
  private createFloorPlanAction(context: ExecuteContext): void;

  /**
   * 应用选中的模板创建户型
   * @param context - 操作执行上下文
   */
  private createFloorplan(context: ExecuteContext): void;

  /**
   * 处理创建成功的消息反馈
   * @param design - 应用的模板设计
   * @param context - 操作执行上下文
   */
  private successMessage(design: TemplateDesign, context: ExecuteContext): void;

  /**
   * 生成成功消息文本
   * 包含面积和房间数量信息
   * @param area - 户型面积
   * @returns 格式化的成功消息
   */
  private getSuccessMsg(area: number | string): string;

  /**
   * 处理创建失败的错误消息
   * @param context - 操作执行上下文
   */
  private errorMessage(context: ExecuteContext): void;

  /**
   * 统计当前场景中的房间数量
   * @returns 各类房间的数量统计
   */
  private rectifyRoomsCount(): RoomsCount;

  /**
   * 获取操作唯一标识符
   * @returns 操作ID
   */
  static getId(): OperationId;

  /**
   * 获取操作类型
   * @returns 操作类型标识
   */
  static getType(): string;
}