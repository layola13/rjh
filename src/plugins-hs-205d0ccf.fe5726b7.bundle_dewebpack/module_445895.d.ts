/**
 * 工具栏视图选项配置模块
 * 用于定义工具栏中需要排除和添加的视图选项项
 */

/**
 * 工具栏视图配置接口
 */
export interface ToolbarViewConfig {
  /**
   * 需要从工具栏中排除的视图选项项列表
   * 包含辅助线、区域、尺寸、房间类型、精度定位模式、背景、网格、无墙模式、屋顶、顶部天花板等选项
   */
  excludeItems: string[];

  /**
   * 需要添加到工具栏的视图选项项列表
   */
  addItems: string[];

  /**
   * 是否处于默认环境
   * @default true
   */
  isInDefaultEnv: boolean;
}

/**
 * 默认工具栏视图配置
 * 
 * 排除的项目包括：
 * - toolbar_toggleAuxiliaryLine: 辅助线开关
 * - toolbar_toggleArea: 区域显示开关
 * - toolbar_toggleDimension: 尺寸标注开关
 * - toolbar_toggleRoomType: 房间类型显示开关
 * - toolBar_toggle2DPrecisionLocationMode: 2D精度定位模式开关
 * - toolbar_toggleBackground: 背景显示开关
 * - toolbar_toggleGrid: 网格显示开关
 * - toolbar_toggleNoWallMode: 无墙模式开关
 * - toolbar_toggleRoof: 屋顶显示开关
 * - toolbar_toggleTopCeiling: 顶部天花板显示开关
 * - toolbar_viewOptions_divider2-5: 分隔线元素
 */
declare const toolbarViewConfig: ToolbarViewConfig;

export default toolbarViewConfig;