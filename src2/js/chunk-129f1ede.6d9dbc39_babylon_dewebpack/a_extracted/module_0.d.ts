/**
 * MeshWriter - 3D文字网格生成库
 * 用于在 Babylon.js 场景中创建可自定义的3D文字网格
 */

declare module 'meshwriter' {
  import * as BABYLON from 'babylonjs';

  /**
   * 字体系列名称类型
   */
  type FontFamily =
    | 'HirukoPro-Book'
    | 'HelveticaNeue-Medium'
    | 'Helvetica'
    | 'Arial'
    | 'sans-serif'
    | 'Comic'
    | 'comic'
    | 'ComicSans'
    | 'Jura'
    | 'jura'
    | 'WebGL-Dings'
    | 'Web-dings';

  /**
   * 锚点定位类型
   */
  type AnchorType = 'left' | 'right' | 'center';

  /**
   * 网格原点类型
   */
  type MeshOriginType = 'fontOrigin' | 'letterCenter';

  /**
   * 位置配置接口
   */
  interface PositionConfig {
    /** X轴坐标 */
    x?: number;
    /** Y轴坐标 */
    y?: number;
    /** Z轴坐标 */
    z?: number;
  }

  /**
   * 颜色配置接口
   */
  interface ColorsConfig {
    /** 漫反射颜色 (十六进制字符串, 如 "#F0F0F0") */
    diffuse?: string;
    /** 镜面反射颜色 (十六进制字符串) */
    specular?: string;
    /** 环境光颜色 (十六进制字符串) */
    ambient?: string;
    /** 自发光颜色 (十六进制字符串) */
    emissive?: string;
  }

  /**
   * 字母渲染选项接口
   */
  interface LetterOptions {
    /** 位置配置 */
    position?: PositionConfig;
    /** 颜色配置 */
    colors?: ColorsConfig;
    /** 字体系列 */
    'font-family'?: FontFamily;
    /** 锚点位置 */
    anchor?: AnchorType;
    /** 字母高度 (默认: 100) */
    'letter-height'?: number;
    /** 字母厚度 (默认: 1) */
    'letter-thickness'?: number;
    /** 基础颜色 (十六进制字符串, 默认: "#808080") */
    color?: string;
    /** 透明度 (0-1, 默认: 1) */
    alpha?: number;
  }

  /**
   * 字母包围盒数组类型 [minX, maxX, minY, maxY]
   */
  type LetterBoundingBox = [number, number, number, number];

  /**
   * 字母原点数组类型 [offsetX, scaleX, scaleY]
   */
  type LetterOrigin = [number, number, number];

  /**
   * MeshWriter构造函数配置接口
   */
  interface MeshWriterConfig {
    /** 默认字体 */
    'default-font'?: FontFamily;
    /** 默认字体 (替代写法) */
    defaultFont?: FontFamily;
    /** 网格原点类型 */
    'mesh-origin'?: MeshOriginType;
    /** 网格原点类型 (替代写法) */
    meshOrigin?: MeshOriginType;
    /** 缩放比例 (默认: 1) */
    scale?: number;
    /** 调试模式 */
    debug?: boolean;
  }

  /**
   * Writer类 - 表示单个文字网格实例
   */
  class Writer {
    /**
     * 创建Writer实例
     * @param text - 要渲染的文字内容
     * @param options - 字母渲染选项
     */
    constructor(text: string, options?: LetterOptions);

    /**
     * 获取固体粒子系统
     * @returns SolidParticleSystem实例
     */
    getSPS(): BABYLON.SolidParticleSystem;

    /**
     * 获取生成的网格对象
     * @returns Mesh实例
     */
    getMesh(): BABYLON.Mesh;

    /**
     * 获取材质对象
     * @returns StandardMaterial实例
     */
    getMaterial(): BABYLON.StandardMaterial;

    /**
     * 获取X轴偏移量
     * @returns 偏移值
     */
    getOffsetX(): number;

    /**
     * 获取每个字母的包围盒数组
     * @returns 包围盒数组
     */
    getLettersBoxes(): LetterBoundingBox[];

    /**
     * 获取每个字母的原点信息数组
     * @returns 原点数组
     */
    getLettersOrigins(): LetterOrigin[];

    /**
     * 设置颜色 (自发光颜色)
     * @param color - 十六进制颜色字符串 (如 "#FF0000")
     */
    setColor(color: string): void;

    /**
     * 设置透明度
     * @param alpha - 透明度值 (0-1)
     */
    setAlpha(alpha: number): void;

    /**
     * 覆盖当前透明度 (不保存到内部状态)
     * @param alpha - 透明度值 (0-1)
     */
    overrideAlpha(alpha: number): void;

    /**
     * 重置透明度到初始值
     */
    resetAlpha(): void;

    /**
     * 获取字母中心坐标
     * @param index - 字母索引
     * @returns 2D向量坐标
     */
    getLetterCenter(index: number): BABYLON.Vector2;

    /**
     * 释放资源并清理网格
     */
    dispose(): void;

    /**
     * 清理所有内部引用
     * @internal
     */
    clearall(): void;

    /**
     * 获取或设置颜色
     * @param color - 可选颜色值
     * @returns 当前颜色 (如果未传参)
     */
    color(color?: string): string | void;

    /**
     * 获取或设置透明度
     * @param alpha - 可选透明度值
     * @returns 当前透明度 (如果未传参)
     */
    alpha(alpha?: number): number | void;
  }

  /**
   * MeshWriter主类 - 3D文字网格生成器
   */
  class MeshWriter {
    /**
     * 创建MeshWriter实例
     * @param scene - Babylon.js场景对象
     * @param config - 配置选项
     * @example
     *