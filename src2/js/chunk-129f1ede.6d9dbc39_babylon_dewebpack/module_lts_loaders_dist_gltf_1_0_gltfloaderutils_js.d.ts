/**
 * glTF 1.0 格式加载器的工具函数集
 * 提供矩阵设置、uniform处理、缓冲区操作等辅助功能
 */

import type { Scene, Camera, TransformNode, Effect, ShaderMaterial, Matrix, Vector2, Vector3, Vector4, Color4, Texture } from '@babylonjs/core';
import type { 
  IGLTFRuntime, 
  IGLTFTechniqueParameter, 
  IGLTFBufferView, 
  IGLTFAccessor,
  EParameterType, 
  ETextureWrapMode, 
  ETextureFilterType, 
  EComponentType 
} from './glTFLoaderInterfaces';

/**
 * glTF 1.0 加载器工具类
 * 包含用于解析和处理 glTF 1.0 资源的静态方法
 */
export declare class GLTFUtils {
  /**
   * 默认材质实例（延迟初始化）
   * @internal
   */
  private static _DefaultMaterial: ShaderMaterial | null;

  /**
   * 根据语义类型设置着色器矩阵参数
   * @param camera - 场景相机，用于获取视图和投影矩阵
   * @param transform - 变换节点，用于获取世界矩阵
   * @param parameter - glTF 技术参数定义
   * @param uniformName - uniform 变量名称
   * @param effect - Babylon.js 着色器效果对象
   * 
   * @remarks
   * 支持的语义类型：
   * - MODEL: 模型矩阵
   * - VIEW: 视图矩阵
   * - PROJECTION: 投影矩阵
   * - MODELVIEW: 模型视图矩阵
   * - MODELVIEWPROJECTION: 模型视图投影矩阵
   * - MODELINVERSE: 模型逆矩阵
   * - VIEWINVERSE: 视图逆矩阵
   * - PROJECTIONINVERSE: 投影逆矩阵
   * - MODELVIEWINVERSE: 模型视图逆矩阵
   * - MODELVIEWPROJECTIONINVERSE: 模型视图投影逆矩阵
   * - MODELINVERSETRANSPOSE: 模型逆转置矩阵
   * - MODELVIEWINVERSETRANSPOSE: 模型视图逆转置矩阵
   */
  static SetMatrix(
    camera: Camera,
    transform: TransformNode,
    parameter: IGLTFTechniqueParameter,
    uniformName: string,
    effect: Effect
  ): void;

  /**
   * 设置着色器 uniform 变量值
   * @param effect - Babylon.js 着色器效果对象
   * @param uniformName - uniform 变量名称
   * @param value - 要设置的值（数字或数组）
   * @param parameterType - glTF 参数类型枚举
   * @returns 是否成功设置（仅支持 FLOAT/VEC2/VEC3/VEC4 类型）
   * 
   * @example
   *