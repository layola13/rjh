/**
 * 参数化背景墙单元自定义线条编辑请求
 * 用于处理背景墙单元左右两侧线条的开启、关闭、替换和重置操作
 */

import { HSCore } from 'HSCore';

/**
 * 线条类型：左侧或右侧
 */
type MoldingType = 'left' | 'right';

/**
 * 线条消息类型
 */
type MoldingMessage =
  | 'onSelfMoldingOpen'           // 开启线条
  | 'onSelfMoldingClose'          // 关闭线条
  | 'onSelfMoldingReplaceProfile' // 替换线条样式
  | 'onSelfMoldingReplaceMaterial'// 替换线条材质
  | 'onSelfMoldingReset';         // 重置线条

/**
 * 线条信息接口
 */
interface MoldingInfo {
  /** 线条配置参数 */
  [key: string]: unknown;
}

/**
 * 线条元数据
 */
interface MoldingMeta {
  /** 元数据字段 */
  [key: string]: unknown;
}

/**
 * 请求参数接口
 */
interface EditMoldingRequestParam {
  /** 线条类型（左侧/右侧） */
  moldingType?: MoldingType;
  /** 线条信息 */
  moldingInfo?: MoldingInfo;
  /** 线条元数据 */
  meta?: MoldingMeta;
}

/**
 * 参数化背景墙单元自定义线条编辑请求类
 * 继承自状态请求基类，负责处理背景墙单元线条的各种编辑操作
 */
export declare class EditNCPBackgroundWallUnitSelfMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 背景墙单元内容对象
   * @private
   */
  private _content: HSCore.Model.NCPBackgroundWallUnit;

  /**
   * 消息类型
   * @private
   */
  private _msg: MoldingMessage;

  /**
   * 请求参数
   * @private
   */
  private _param: EditMoldingRequestParam;

  /**
   * 构造函数
   * @param content - 背景墙单元对象
   * @param msg - 消息类型
   * @param param - 请求参数
   */
  constructor(
    content: HSCore.Model.NCPBackgroundWallUnit,
    msg: MoldingMessage,
    param: EditMoldingRequestParam
  );

  /**
   * 执行请求
   * 根据不同的消息类型执行相应的线条编辑操作
   */
  doRequest(): void;

  /**
   * 提交操作
   * 执行请求并调用父类的提交方法
   */
  onCommit(): void;

  /**
   * 根据线条变化自动适配相邻背景墙单元位置
   * 当开启或关闭线条时，自动调整相邻单元的位置以保持合理间距
   * @param msg - 消息类型
   * @param moldingType - 线条类型（左侧/右侧）
   */
  autoAdaptBySelfMolding(msg: MoldingMessage, moldingType: MoldingType): void;

  /**
   * 撤销操作
   * 调用父类的撤销方法
   */
  onUndo(): void;

  /**
   * 重做操作
   * 调用父类的重做方法
   */
  onRedo(): void;

  /**
   * 是否可以事务化字段
   * @returns 始终返回 true
   */
  canTransactField(): boolean;

  /**
   * 获取操作分类
   * @returns 返回参数化背景墙单元的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 获取操作描述
   * 根据消息类型和参数返回相应的中文描述
   * @returns 操作描述文本
   */
  getDescription(): string;
}