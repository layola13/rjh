/**
 * STL模型加载和渲染管理器
 * 负责3D场景中STL模型的加载、材质管理、边缘渲染和辅助轴显示
 */
declare module "module_103" {
  import * as BABYLON from "babylonjs";

  /**
   * STL模型数据接口
   */
  interface STLModelData {
    /** 模型名称 */
    name?: string;
    /** 模型文件URL */
    url: string;
    /** 模型宽度 */
    width: number;
    /** 模型高度 */
    height: number;
    /** 模型深度 */
    depth: number;
    /** 辅助轴中心位置 */
    axis_center?: BABYLON.Vector3;
    /** 辅助轴旋转角度 */
    axis_rot?: BABYLON.Vector3;
  }

  /**
   * 绘制模式枚举
   */
  enum DrawMode {
    /** 实体+边缘模式（默认） */
    SolidWithEdges = 0,
    /** 仅实体模式（无边缘） */
    SolidOnly = 1,
    /** 半透明+边缘模式 */
    TransparentWithEdges = 2,
  }

  /**
   * STL模型管理器
   * 提供模型加载、材质切换、边缘渲染、辅助轴显示等功能
   */
  export default class STLModelManager {
    /** 当前Babylon.js场景实例 */
    private static scene: BABYLON.Scene;

    /** 已加载的模型容器数组 */
    private static models: BABYLON.TransformNode[];

    /** 当前STL模型数据 */
    private static stlModel: STLModelData;

    /** 白色材质 */
    private static mat_white: BABYLON.StandardMaterial;

    /** 黑色材质（RGB: 70/255） */
    private static mat_black: BABYLON.StandardMaterial;

    /** 当前是否使用白色材质 */
    private static isWhite: boolean;

    /** 辅助坐标轴容器 */
    private static auxiliaryAxis?: BABYLON.TransformNode;

    /** 边缘渲染精度值（0-1之间） */
    private static readonly EdgesRenderingValue: number;

    /**
     * 初始化STL管理器
     * @param scene - Babylon.js场景实例
     */
    static Init(scene: BABYLON.Scene): void;

    /**
     * 切换模型颜色（黑白互换）
     * 同时反转边缘颜色以保持对比度
     */
    static ChangeColor(): void;

    /**
     * 清理所有已加载的模型
     * 释放内存并重置状态
     */
    static Clean(): void;

    /**
     * 清理辅助坐标轴
     */
    static CleanAuxiliaryAxis(): void;

    /**
     * 创建并显示辅助坐标轴
     * @param modelData - 包含轴心位置和旋转信息的模型数据
     */
    static CreateAuxiliaryAxis(modelData: STLModelData): void;

    /**
     * 加载STL模型
     * @param modelData - STL模型数据配置
     */
    static Load(modelData: STLModelData): void;

    /**
     * 同步加载STL模型（内部方法）
     * 处理模型导入、材质应用和边缘渲染
     */
    private static LoadSTLSync(): void;

    /**
     * 设置模型绘制模式
     * @param mode - 绘制模式：0=实体+边缘, 1=仅实体, 2=半透明+边缘
     */
    static DrawMode(mode?: DrawMode): void;

    /**
     * 清理Alpha线条（预留方法）
     */
    static CleanAlphaLine(): void;

    /**
     * 绘制Alpha线条（预留方法）
     * @param data - 线条数据（待定义）
     */
    static DrawAlphaLine(data: unknown): void;

    /**
     * 为网格模型启用边缘渲染
     * @param transformNode - 要应用边缘渲染的变换节点
     * @param edgesWidth - 边缘线宽度（默认0.08）
     * @param edgesColor - 边缘颜色（默认黑色）
     */
    private static edgesRender_Mesh(
      transformNode: BABYLON.TransformNode,
      edgesWidth?: number,
      edgesColor?: BABYLON.Color4
    ): void;
  }
}