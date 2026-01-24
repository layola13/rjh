/**
 * 灯光计算模块 - L型衣柜灯光布局策略
 * 
 * 该模块负责为 L 型衣柜计算合适的灯光位置和参数。
 * 根据衣柜尺寸和渲染模板，动态生成单个或多个灯光配置。
 */

import { default as BaseLight } from './module_42288';

/**
 * 三维坐标位置
 */
interface Position {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** Z 坐标（高度） */
  z: number;
}

/**
 * 二维尺寸
 */
interface Size {
  /** 宽度 */
  x: number;
  /** 深度 */
  y: number;
  /** 高度 */
  z: number;
}

/**
 * 灯光配置
 */
interface LightConfig {
  /** 灯光位置 */
  position: Position;
  /** 光照强度 */
  intensity: number;
  /** 色温（开尔文） */
  temperature: number;
  /** IES 光域文件路径 */
  ies: string;
}

/**
 * 家具对象接口
 */
interface Furniture {
  /** 获取家具位置 */
  getPosition(): Position;
  /** 获取家具尺寸 */
  getSize(): Size;
  /** 前方向量 */
  frontForwardVec: THREE.Vector2;
  /** 后方向量 */
  backForwardVec: THREE.Vector2;
  /** 左方向量 */
  leftForwardVec: THREE.Vector2;
  /** 右方向量 */
  rightForwardVec: THREE.Vector2;
}

/**
 * 场景对象接口
 */
interface Scene {
  /** 判断天花板面是否隐藏 */
  isCeilingFaceHidden(): boolean;
  /** 获取天花板高度 */
  getCeilingHeight(): number;
}

/**
 * 渲染选项配置
 */
interface RenderOptions {
  /** 渲染模板键名 */
  templateKey: string;
}

/**
 * 对称灯光位置配置
 */
interface SymmetricLightPosition {
  /** 二维位置 */
  pos: THREE.Vector2;
  /** 方向向量名称 */
  direction: 'leftForwardVec' | 'rightForwardVec';
}

/**
 * L 型衣柜灯光计算类
 * 
 * 继承自基础灯光类，专门处理 L 型衣柜的灯光布局。
 * 根据衣柜尺寸自动选择单灯、双灯或多灯方案。
 */
declare class LShapedWardobeLightCalculator extends BaseLight {
  /** 灯光与边缘的偏移距离（米） */
  static readonly offset: number;
  
  /** L 型家具标识 */
  static readonly lShape: string;
  
  /** L 型衣柜宽度阈值（米） */
  static readonly lwidth: number;

  /**
   * 计算灯光配置的主方法
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param renderContext - 渲染上下文（可选）
   * @returns 灯光配置数组，如果不需要灯光则返回空数组
   */
  _compute(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    renderContext?: unknown
  ): LightConfig[];

  /**
   * 单灯方案 - 适用于宽度小于 2 米的衣柜
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含单个灯光的配置数组
   */
  _oneLightCase(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];

  /**
   * 双灯方案 - 适用于宽度 2 到 2.5 米的衣柜
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含两个灯光的配置数组
   */
  _twoLights2to2Point5(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];

  /**
   * 双灯方案 - 适用于宽度 2.5 到 3 米的衣柜
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含两个灯光的配置数组
   */
  _twoLights2Point5to3(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];

  /**
   * 多灯方案 - 适用于宽度大于 3 米的衣柜
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含多个灯光的配置数组
   */
  _manyLightsLargerThan3(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];

  /**
   * 单灯方案 - 适用于 L 型衣柜（深度方向）
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含单个灯光的配置数组
   */
  _oneLight4L(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];

  /**
   * 单灯方案 - 适用于小型 L 型衣柜（1-1.2米范围）
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含单个灯光的配置数组
   */
  _oneLight4SmallL(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];

  /**
   * 多灯方案 - 适用于大型 L 型衣柜（深度大于 1.5 米）
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含多个灯光的配置数组
   */
  _manyLights4L(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];

  /**
   * 生成两个对称的灯光
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param lateralOffset - 横向偏移距离（米）
   * @param forwardOffset - 前向偏移距离（米）
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含两个对称灯光的配置数组
   */
  _twoSymmetricLights(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    lateralOffset: number,
    forwardOffset: number,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];

  /**
   * 生成多个对称分布的灯光
   * 
   * @param furniture - 家具对象
   * @param scene - 场景对象
   * @param renderOptions - 渲染选项
   * @param leftPosition - 左侧灯光位置配置
   * @param rightPosition - 右侧灯光位置配置
   * @param count - 单侧灯光数量
   * @param intensity - 光照强度
   * @param temperature - 色温
   * @param ies - IES 光域文件
   * @returns 包含多个对称灯光的配置数组
   */
  _manySymmetricLights(
    furniture: Furniture,
    scene: Scene,
    renderOptions: RenderOptions,
    leftPosition: SymmetricLightPosition,
    rightPosition: SymmetricLightPosition,
    count: number,
    intensity: number,
    temperature: number,
    ies: string
  ): LightConfig[];
}

export default LShapedWardobeLightCalculator;