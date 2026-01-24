/**
 * CSS模块声明文件
 * 
 * 该模块导出推荐搭配对话框组件的样式定义
 * 包含对话框容器、头部、按钮区域等UI元素的样式类
 */

/**
 * 推荐搭配对话框的CSS类名映射
 */
export interface RecommendCollocationsDialogStyles {
  /** 推荐搭配对话框容器的根元素类名 */
  'recommend-collocations-dialog-container': string;
  
  /** 推荐搭配对话框主体类名 */
  'recommend-collocations-dialog': string;
  
  /** 无按钮状态的对话框样式类名 */
  'recommend-collocations-dialog__nobutton': string;
  
  /** 推荐搭配对话框头部区域类名 */
  'recommend-collocations-header': string;
  
  /** 推荐头部标题文本类名 */
  'recommend-header-title': string;
  
  /** 推荐头部"不再显示"链接类名 */
  'recommend-header-noShow': string;
  
  /** 推荐搭配按钮区域容器类名 */
  'recommend-collocations-buttons': string;
  
  /** 自动推荐按钮类名 */
  'recommend-collocations-header-auto-recommend': string;
  
  /** 推荐配件按钮类名 */
  'recommend-collocations-header-recommend-accessories': string;
  
  /** 推荐搭配图标类名 */
  'recommend-collocations-icon': string;
  
  /** Homestyler智能文本类名 */
  'homestyler-smart-text': string;
  
  /** 存在两个按钮时的样式类名 */
  'have-two-btns': string;
  
  /** 隐藏状态的对话框类名 */
  'recommend-collocations-dialog-hide': string;
  
  /** EZHome版本的定位样式类名 */
  'recommend-position-ezhome': string;
  
  /** 全局版本的定位样式类名 */
  'recommend-position-global': string;
}

/**
 * CSS模块默认导出
 * 
 * 在TypeScript中导入此CSS模块时，将获得样式类名的字符串映射对象
 */
declare const styles: RecommendCollocationsDialogStyles;

export default styles;

/**
 * CSS原始内容类型定义
 * 
 * 表示样式表的字符串内容数组，用于服务端渲染或样式注入
 */
export type CSSModuleContent = [string, string];

/**
 * CSS模块加载器返回类型
 * 
 * 包含样式内容和源映射信息的完整模块结构
 */
export interface CSSModuleExport {
  /** CSS内容数组 [模块ID, CSS字符串] */
  content: CSSModuleContent[];
  
  /** 模块标识符 */
  id: string | number;
  
  /** 是否为源映射模式 */
  sourceMap: boolean;
  
  /** 添加CSS内容的方法 */
  push(item: CSSModuleContent): void;
}