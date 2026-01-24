/**
 * CSS模块导出类型定义
 * 
 * 该模块导出会员购买容器相关的CSS样式类名
 * 用于Webpack CSS-loader处理后的样式模块
 */

/**
 * CSS类名映射接口
 * 定义了buyMember组件中所有可用的CSS类名
 */
export interface BuyMemberStyles {
  /** 会员购买主容器样式 */
  buyMemberContainer: string;
  
  /** 内容区域样式（渐变背景区域） */
  content: string;
  
  /** 左侧区域样式（包含图标和文本） */
  leftArea: string;
  
  /** 升级/更新按钮样式 */
  updateBtn: string;
  
  /** 提示信息文本样式 */
  tips: string;
  
  /** 数字高亮样式（用于展示数量） */
  num: string;
  
  /** 演示图片容器样式 */
  demoImg: string;
  
  /** 水印图标样式 */
  'wathermark-icon': string;
}

/**
 * 默认导出的样式对象
 * 
 * @remarks
 * 该对象由css-loader生成，包含所有CSS类名的哈希映射
 * 在运行时，类名会被转换为唯一的哈希值以避免样式冲突
 * 
 * @example
 *