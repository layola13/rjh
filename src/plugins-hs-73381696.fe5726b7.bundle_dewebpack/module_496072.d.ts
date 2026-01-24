/**
 * CSS样式模块类型定义
 * 用于多图层容器组件的样式声明
 */

/**
 * 样式导出函数类型
 * @param flag - 是否启用source map的标志
 * @returns 返回样式数组的函数
 */
type StyleExportFunction = (flag: boolean) => {
  push: (styles: [string, string]) => void;
};

/**
 * 资源加载器函数类型
 * 用于处理CSS中引用的图片等资源路径
 * @param resourceId - 资源模块ID
 * @returns 处理后的资源URL字符串
 */
type ResourceLoaderFunction = (resourceId: number) => string;

/**
 * 多图层容器模块导出
 * 包含完整的CSS样式定义，涵盖：
 * - 多图层容器的布局定位
 * - Ant Design下拉菜单样式覆盖
 * - 明暗主题切换样式
 * - 图层添加/删除交互样式
 * - 营销徽章和工具提示样式
 * - 国际化(全局英文)样式适配
 */
declare module 'module_496072' {
  /**
   * 模块导出接口
   * 继承自样式导出函数，提供push方法用于添加CSS规则
   */
  export interface MultiLayerStyleModule extends StyleExportFunction {
    /** 模块唯一标识符 */
    id: string;
  }

  const styles: MultiLayerStyleModule;
  export default styles;
}

/**
 * CSS类名命名空间
 * 定义所有可用的CSS类名常量
 */
declare namespace MultiLayerStyles {
  /** 多图层容器根类名 */
  export const multiLayerContainer: string;
  
  /** 禁用状态类名 */
  export const disable: string;
  
  /** 不允许点击的鼠标样式 */
  export const notAllowedCursor: string;
  
  /** 禁用指针事件 */
  export const pointEventsNone: string;
  
  /** 图层菜单列表 */
  export const layerMenuList: string;
  
  /** 暗色主题 */
  export const dark: string;
  
  /** 多图层包装器 */
  export const multiLayerWrapper: string;
  
  /** 多图层主体 */
  export const multiLayer: string;
  
  /** 皇冠图标（会员标识） */
  export const crown: string;
  
  /** 免费试用标签 */
  export const freeTrail: string;
  
  /** 用户提示气泡 */
  export const userTip: string;
  
  /** 添加图层按钮 */
  export const addLayer: string;
  
  /** 添加内容区域 */
  export const addContent: string;
  
  /** 禁用状态的添加内容 */
  export const addContentDisabled: string;
  
  /** 图层内容区 */
  export const layerContent: string;
  
  /** 图层列表 */
  export const layerList: string;
  
  /** 图层下拉按钮 */
  export const layerDropdownBtn: string;
  
  /** 禁用的图层下拉按钮 */
  export const layerDropdownBtnDisabled: string;
  
  /** 显示图层按钮 */
  export const showLayer: string;
  
  /** 选中项样式 */
  export const selectItem: string;
  
  /** 显示所有图层 */
  export const showAllLayer: string;
  
  /** 编辑楼层面板文本 */
  export const editFloorPanelText: string;
  
  /** 不再提示选项 */
  export const editFloorPanelNevernotice: string;
  
  /** 重置提示 */
  export const editFloorPanelResetnotice: string;
  
  /** 多图层工具提示图标 */
  export const multilayerTooltipIcon: string;
  
  /** 完全禁用状态 */
  export const allDisabled: string;
  
  /** 营销徽章 */
  export const marketingBadgeMultilayer: string;
  
  /** 添加图层下拉项 */
  export const addLayerItems: string;
  
  /** 隐藏添加图层项 */
  export const addLayerItemsHide: string;
}

/**
 * 资源ID常量
 * 用于引用图片等静态资源
 */
declare namespace ResourceIds {
  /** 选中状态图标 */
  export const CHOOSE_ICON: 229310;
  
  /** 未选中状态图标 */
  export const UN_CHOOSE_ICON: 69889;
  
  /** 关闭提示图标 */
  export const CLOSE_TIP_ICON: 600819;
  
  /** 免费试用背景图（国际化版本） */
  export const FREE_TRAIL_BG_EN: 592953;
}