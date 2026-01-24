/**
 * EditNCPBackgroundWallBaseRequest - 编辑定制参数化背景墙基础请求类
 * 处理背景墙及背景墙单元的参数编辑、材质调整等操作
 */

import { HSCore } from 'hscore';
import { MaterialApi, PavingOptionApi } from 'material-sdk';
import { Plane } from 'geometry-utils';

/**
 * 消息类型枚举
 */
type MessageType =
  | 'onValueChange'
  | 'onValueChangeEnd'
  | 'onDistanceToWallValueChange'
  | 'onDistanceToWallValueChangeEnd'
  | 'onElevationValueChange'
  | 'onElevationValueChangeEnd'
  | 'onRedAxisValueChange'
  | 'onRedAxisValueChangeEnd'
  | 'onBlueAxisValueChange'
  | 'onBlueAxisValueChangeEnd'
  | 'onGreenAxisValueChange'
  | 'onGreenAxisValueChangeEnd'
  | 'onReset'
  | 'onBasicPropertyReset'
  | 'onBoolInputDataChange'
  | 'onMaterialRotateChange'
  | 'onMaterialHorizontalOffsetChange'
  | 'onMaterialVerticalOffsetChange'
  | 'onMaterialScaleXChange'
  | 'onMaterialScaleYChange'
  | 'onMaterialPositionReset'
  | 'onMaterialScaleReset';

/**
 * 参数节点接口
 */
interface IParameterNode {
  eId: string;
  name: string;
  type?: string;
  children?: IParameterNode[];
  onRightTitleClick?(node: IParameterNode): void;
}

/**
 * 消息参数接口
 */
interface IMessageParam {
  eId?: string;
  node?: IParameterNode;
  newValue?: number | boolean | string;
  faceTags?: IFaceTagInfo[];
  lockRatio?: boolean;
}

/**
 * 面标签信息接口
 */
interface IFaceTagInfo {
  faceTag: string;
  entity: HSCore.Model.Entity;
  isFaceSupportPaintMaterial: boolean;
}

/**
 * 材质缩放参数接口
 */
interface IMaterialScaleParams {
  scaleX?: number;
  scaleY?: number;
  lockRatio?: boolean;
}

/**
 * 材质铺贴选项参数接口
 */
interface IMaterialPavingParams {
  rotation?: number;
  sliderOffsetX?: number;
  sliderOffsetY?: number;
}

/**
 * 原始尺寸接口
 */
interface IOriginSize {
  W: number; // 宽度（毫米）
  D: number; // 深度（毫米）
  H: number; // 高度（毫米）
}

/**
 * 内容类型（背景墙或背景墙单元）
 */
type ContentType =
  | HSCore.Model.NCustomizedParametricBackgroundWall
  | HSCore.Model.NCPBackgroundWallUnit;

/**
 * 编辑定制参数化背景墙基础请求类
 * 继承自状态请求基类，处理背景墙编辑相关的各种消息
 */
export declare class EditNCPBackgroundWallBaseRequest extends HSCore.Transaction.Common.StateRequest {
  /** 当前编辑的内容对象（背景墙或背景墙单元） */
  private _content: ContentType;

  /** 最近接收的消息类型 */
  private _receiveMsg: MessageType | '';

  /**
   * 构造函数
   * @param content - 要编辑的背景墙内容对象
   */
  constructor(content: ContentType);

  /**
   * 转换角度到 [-180, 180] 范围
   * @param angle - 输入角度
   * @returns 标准化后的角度值
   */
  private convertAngle(angle: number): number;

  /**
   * 带日志记录的参数变更入口
   * @param node - 参数节点
   * @param value - 新值
   */
  private _enterWithLog(node: IParameterNode, value: number | boolean | string): void;

  /**
   * 接收并处理消息
   * @param message - 消息类型
   * @param params - 消息参数
   */
  onReceive(message: MessageType, params: IMessageParam): void;

  /**
   * 参数变更回调
   * @param node - 参数节点
   * @param value - 新值
   */
  onParamsChangedCallback(node: IParameterNode, value: number | boolean | string): void;

  /**
   * 设置材质缩放
   * @param faceTags - 面标签信息数组
   * @param scaleParams - 缩放参数
   */
  private _setMaterialScale(faceTags: IFaceTagInfo[], scaleParams: IMaterialScaleParams): void;

  /**
   * 设置材质铺贴选项
   * @param faceTags - 面标签信息数组
   * @param pavingParams - 铺贴参数（旋转、偏移等）
   */
  private _setMaterialPavingOption(faceTags: IFaceTagInfo[], pavingParams: IMaterialPavingParams): void;

  /**
   * 撤销操作
   */
  onUndo(): void;

  /**
   * 重做操作
   */
  onRedo(): void;

  /**
   * 更新内容（根据不同消息类型执行不同的更新逻辑）
   */
  private _contentUpdate(): void;

  /**
   * 是否可以处理字段事务
   * @returns 总是返回 true
   */
  canTransactField(): boolean;

  /**
   * 根据 ID 获取参数节点
   * @param nodeId - 节点 ID
   * @returns 找到的节点或 undefined
   */
  private _getNodeById(nodeId: string): IParameterNode | undefined;

  /**
   * 重置材质（包括位置和缩放）
   * @param faceTags - 面标签信息数组
   */
  private _resetMaterial(faceTags: IFaceTagInfo[]): void;

  /**
   * 重置材质位置（旋转、偏移归零）
   * @param faceTags - 面标签信息数组
   */
  private _resetMaterialPosition(faceTags: IFaceTagInfo[]): void;

  /**
   * 重置材质缩放（恢复为 1:1）
   * @param faceTags - 面标签信息数组
   */
  private _resetMaterialScale(faceTags: IFaceTagInfo[]): void;

  /**
   * 根据宿主获取定制背景墙
   * @param host - 宿主对象
   * @returns 找到的定制背景墙对象或 undefined
   */
  getNCustomizedBackgroundWallByHost(host: HSCore.Model.Entity): HSCore.Model.NCustomizedBackgroundWall | undefined;

  /**
   * 获取默认离墙距离
   * @returns 离墙距离值（单位：米）
   */
  getDefaultDistanceToWall(): number;

  /**
   * 获取日志分类
   * @returns 日志组类型
   */
  getCategory(): string;

  /**
   * 获取操作描述
   * @returns 操作描述字符串
   */
  getDescription(): string;

  /**
   * 异步解析接收的消息
   * @param messages - 消息数组（JSON 字符串）
   * @returns Promise<void>
   */
  static parseReceiveMsgsAsync(messages: string[]): Promise<void>;
}