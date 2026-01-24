/**
 * CAD用户引导组件模块
 * 提供定制化建模CAD功能的分步引导界面
 * 
 * @module CustomizedModelingGuide
 * @originalId 135841
 */

/**
 * 引导数据项的结构
 */
export interface GuideDataItem {
  /** 引导图标的文件名 */
  icon: string;
  /** 引导提示文本的国际化键名 */
  tip: string;
}

/**
 * 组件的属性接口
 */
export interface DiyUserGuideProps {
  /** 
   * 完成引导后的回调函数
   * @required
   */
  next: () => void;
}

/**
 * 组件的状态接口
 */
export interface DiyUserGuideState {
  /** 当前显示的引导页索引 */
  currentGuideIndex: number;
}

/**
 * CAD定制化建模用户引导组件
 * 
 * 功能：
 * - 展示4页引导内容，每页包含图标和提示文本
 * - 支持前后翻页导航
 * - 显示当前页面指示器
 * - 使用国际化资源管理器加载文本
 * 
 * @class DiyUserGuide
 * @extends React.Component<DiyUserGuideProps, DiyUserGuideState>
 * 
 * @example
 *