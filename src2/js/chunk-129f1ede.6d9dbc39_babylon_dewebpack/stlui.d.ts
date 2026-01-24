/**
 * STL模型查看器UI模块
 * 提供3D模型的交互控制界面
 */

/**
 * 三维场景接口
 * 定义了场景的基本属性和方法
 */
interface IThreeScene {
  /** Babylon.js 场景实例 */
  scene: any;
  
  /**
   * 改变相机绘制模式
   * @param mode - 绘制模式 (0: 颜色+描边, 1: 仅颜色, 2: 仅描边)
   */
  ChangeCameraDraw(mode: number): void;
  
  /**
   * 改变相机位置
   * @param position - 预设位置名称（如 "LeftTopFront"）
   */
  ChangeCameraPos(position: string): void;
  
  /**
   * 切换相机模式（正交/透视）
   */
  ChangeCameraMode(): void;
}

/**
 * STL模型UI控制器类
 * 负责创建和管理3D模型查看器的用户界面
 */
export declare class StlUI {
  /**
   * 关联的三维场景实例
   */
  private readonly threeScene: IThreeScene;
  
  /**
   * 构造函数
   * @param threeScene - 三维场景实例，用于控制3D模型显示
   */
  constructor(threeScene: IThreeScene);
  
  /**
   * 初始化UI界面
   * 创建以下控制元素：
   * - 底部工具栏：包含重置视角、显示模式、相机模式、颜色切换按钮
   * - 显示模式面板：提供三种渲染模式切换（颜色+描边/颜色/描边）
   * - 工具提示：鼠标悬停时显示按钮功能说明
   */
  Init(): void;
}