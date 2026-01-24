/**
 * 坐标轴组件模块
 * 用于在3D场景中显示XYZ坐标轴的可视化组件
 */

import { Node, Vector3, Quaternion } from './367441';
import { Vector3 as MathVector3, Quaternion as MathQuaternion } from './815362';
import { HSCore } from './635589';
import { ActiveType } from './289659';
import { WFABase } from './122206';
import { AxisColorEnum, AxisScaleFactor } from './44182';

/**
 * 方向向量信息接口
 * 描述坐标轴在特定激活类型下的方向属性
 */
interface DirectionInfo {
  /** 零点方向向量 */
  zeroDir: MathVector3;
  /** 法线向量 */
  normal: MathVector3;
  /** 基础法线向量 */
  basicNormal: MathVector3;
}

/**
 * 坐标轴组件类
 * 继承自WFABase，提供三维坐标轴的渲染和交互功能
 * 
 * @remarks
 * 该类负责在3D场景中显示X、Y、Z三个坐标轴，
 * 并根据相机位置和类型动态调整坐标轴的显示状态
 */
export declare class WFACompsCoordinateAxis extends WFABase {
  /** X轴线节点 */
  private _linex: Node | undefined;
  
  /** Y轴线节点 */
  private _lineY: Node | undefined;
  
  /** Z轴线节点 */
  private _lineZ: Node | undefined;

  /**
   * 构造函数
   * 
   * @param param1 - 第一个参数（具体类型取决于WFABase）
   * @param param2 - 第二个参数
   * @param param3 - 第三个参数
   * @param param4 - 第四个参数
   * @param param5 - 第五个参数
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown
  );

  /**
   * 初始化坐标轴组件
   * 创建三个轴线节点并添加到场景中
   */
  init(): void;

  /**
   * 内容字段变化回调
   * 标记组件为脏状态，需要重新渲染
   * 
   * @protected
   */
  protected _onContentFieldChange(): void;

  /**
   * 激活状态变化回调
   * 根据激活状态控制坐标轴的可见性
   * 
   * @protected
   */
  protected _onActiveChange(): void;

  /**
   * 创建单个坐标轴线
   * 
   * @param startPoint - 起始点坐标
   * @param endPoint - 结束点坐标
   * @param color - 轴线颜色
   * @returns 创建的网格节点
   * 
   * @protected
   */
  protected _createLine(
    startPoint: MathVector3,
    endPoint: MathVector3,
    color: AxisColorEnum
  ): Node;

  /**
   * 更新节点变换
   * 根据相机位置和坐标系统更新坐标轴的位置、缩放和旋转
   * 
   * @protected
   */
  protected _updateNodeTransform(): void;

  /**
   * 更新坐标轴旋转
   * 根据相机视角调整各个轴线的朝向，确保始终面向相机
   * 
   * @protected
   */
  protected _updateAxisRotation(): void;

  /**
   * 获取Gizmo缩放比例
   * 根据相机类型和距离计算合适的坐标轴显示尺寸
   * 
   * @returns 三维缩放向量
   * 
   * @protected
   */
  protected _getGizmoScale(): MathVector3;

  /**
   * 获取指定激活类型的方向信息
   * 
   * @param activeType - 激活类型（near/far/top/bottom/left/right）
   * @returns 包含零点方向、法线和基础法线的方向信息对象
   * 
   * @protected
   */
  protected _getDirection(activeType: ActiveType): DirectionInfo;

  /**
   * 获取两个向量之间的角度
   * 
   * @param vector1 - 第一个向量
   * @param vector2 - 第二个向量
   * @param normalVector - 法线向量
   * @returns 角度值（弧度）
   * 
   * @protected
   */
  protected _getAngle(
    vector1: MathVector3,
    vector2: MathVector3,
    normalVector: MathVector3
  ): number;

  /**
   * 获取坐标系旋转四元数
   * 
   * @returns 旋转四元数
   * 
   * @protected
   */
  protected _getCoordRotation(): MathQuaternion;

  /**
   * 获取底部中心位置
   * 
   * @returns 底部中心点的三维坐标
   * 
   * @protected
   */
  protected getBottomCenterPos(): MathVector3;
}