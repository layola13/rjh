import { Scene, Vector3, Vector2, Quaternion, Angle, Mesh, MeshBuilder, TransformNode, Vector4 } from '@babylonjs/core';
import { Point, Vector as GeomVector } from './geometry';
import { ProfileTypesEnum } from './enums';
import { Guid } from './guid';

/**
 * 模型曲线点偏移配置
 */
interface CurveOffsetConfig {
  /** 起始点外侧偏移 */
  startOutPt: Vector2;
  /** 起始点内侧偏移 */
  startInPt: Vector2;
  /** 结束点外侧偏移 */
  endOutPt: Vector2;
  /** 结束点内侧偏移 */
  endInPt: Vector2;
  /** 可选名称 */
  name?: string;
}

/**
 * 新版曲线偏移配置（支持角度和位置偏移）
 */
interface CurveOffsetConfigNew {
  /** 起点外侧偏移位置 */
  offset0?: Vector2;
  /** 终点外侧偏移位置 */
  offset1?: Vector2;
  /** 起点内侧偏移位置 */
  offset0_in?: Vector2;
  /** 终点内侧偏移位置 */
  offset1_in?: Vector2;
  /** 起点偏移角度（度） */
  angle0?: number;
  /** 终点偏移角度（度） */
  angle1?: number;
}

/**
 * DXF路径数据结构
 */
interface DXFPathData {
  /** 连接件截面数据 */
  jts: Array<any>;
  /** 铝型材外侧截面 */
  lxc_outs: Array<any>;
  /** 铝型材外侧截面1 */
  lxc_out1as: Array<any>;
  /** 铝型材外侧截面2 */
  lxc_out2as: Array<any>;
  /** 铝型材内侧截面 */
  lxc_ins: Array<any>;
  /** 铝型材内侧截面1 */
  lxc_in1as: Array<any>;
  /** 铝型材内侧截面2 */
  lxc_in2as: Array<any>;
  /** 辅助截面 */
  lxc_as: Array<any>;
}

/**
 * 模型曲线生成器
 * 用于生成基于DXF路径的3D曲线模型
 */
declare class ModelCurveGenerator {
  /** 当前场景实例 */
  private static scene: Scene;

  /**
   * 初始化生成器
   * @param scene Babylon.js场景实例
   */
  static Init(scene: Scene): void;

  /**
   * 生成通用模型曲线（使用米制单位）
   * @param dxfData DXF路径数据
   * @param startPos 起始位置（米）
   * @param endPos 结束位置（米）
   * @param arcRadius 圆弧半径（米）
   * @param offsetConfig 偏移配置（米）
   * @returns 生成的模型变换节点，失败返回null
   */
  static GeneralModelCurveM(
    dxfData: DXFPathData,
    startPos: Vector3,
    endPos: Vector3,
    arcRadius: number,
    offsetConfig: CurveOffsetConfig
  ): TransformNode | null;

  /**
   * 生成通用模型曲线（内部单位）
   * @param dxfData DXF路径数据
   * @param startPos 起始位置
   * @param endPos 结束位置
   * @param arcRadius 圆弧半径
   * @param offsetConfig 偏移配置
   * @returns 生成的模型变换节点，失败返回null
   */
  static GeneralModelCurve(
    dxfData: DXFPathData,
    startPos: Vector3,
    endPos: Vector3,
    arcRadius: number,
    offsetConfig: CurveOffsetConfig
  ): TransformNode | null;

  /**
   * 加载DXF路径并生成3D网格
   * @param dxfData DXF路径数据
   * @param startPos 起始位置
   * @param rotationQuat 旋转四元数
   * @param distance 路径长度
   * @param arcRadius 圆弧半径
   * @param arcCenter 圆弧中心点
   * @param pathPoints 路径点数组
   * @param scene Babylon.js场景
   * @param offsetConfig 偏移配置
   * @returns 生成的模型变换节点，失败返回undefined
   */
  static LoadDXFPath(
    dxfData: DXFPathData,
    startPos: Vector3,
    rotationQuat: Quaternion,
    distance: number,
    arcRadius: number,
    arcCenter: Vector3,
    pathPoints: Vector3[],
    scene: Scene,
    offsetConfig: CurveOffsetConfig
  ): TransformNode | undefined;

  /**
   * 生成通用模型曲线（新版，支持角度偏移）
   * @param dxfData DXF路径数据
   * @param startPos 起始位置（米）
   * @param endPos 结束位置（米）
   * @param arcRadius 圆弧半径（米）
   * @param offsetConfig 新版偏移配置
   * @param curveType 曲线类型（如"3dArc"）
   * @returns 生成的模型变换节点，失败返回null
   */
  static GeneralModelCurveMNew(
    dxfData: DXFPathData,
    startPos: Vector3,
    endPos: Vector3,
    arcRadius: number,
    offsetConfig: CurveOffsetConfigNew,
    curveType?: string
  ): TransformNode | null;

  /**
   * 测试版通用模型曲线生成（支持3D圆弧）
   * @param dxfData DXF路径数据
   * @param startPos 起始位置
   * @param endPos 结束位置
   * @param arcRadius 圆弧半径
   * @param offsetConfig 新版偏移配置
   * @param curveType 曲线类型（如"3dArc"）
   * @returns 生成的模型变换节点，失败返回null
   */
  static TestGeneralModelCurve(
    dxfData: DXFPathData,
    startPos: Vector3,
    endPos: Vector3,
    arcRadius: number,
    offsetConfig: CurveOffsetConfigNew,
    curveType?: string
  ): TransformNode | null;

  /**
   * 测试版DXF路径加载（优化版布尔运算）
   * @param dxfData DXF路径数据
   * @param pathLength 路径长度
   * @param pathPoints 路径点数组
   * @param offsetConfig 新版偏移配置
   * @returns 生成的模型变换节点，失败返回undefined
   */
  static TestLoadDXFPath(
    dxfData: DXFPathData,
    pathLength: number,
    pathPoints: Vector3[],
    offsetConfig?: CurveOffsetConfigNew
  ): TransformNode | undefined;
}

export default ModelCurveGenerator;