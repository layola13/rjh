/**
 * CSS模块类型定义
 * 此模块导出收藏夹分组面板的样式类名
 */

/**
 * 收藏夹分组面板样式类名映射接口
 */
export interface FavGroupPanelStyles {
  /** 面板遮罩层 - 全屏覆盖，z-index: 200 */
  favGroup_panel_mask: string;
  
  /** 主面板容器 - 宽度400px，居中定位 */
  favGroup_panel: string;
  
  /** 滚动容器包装器 - 最大高度85px */
  scroll_wrapper: string;
  
  /** 滚动条容器 - 相对定位，最大高度84px */
  'scrollbar-container': string;
  
  /** 所有分组列表容器 */
  allGroup: string;
  
  /** 单选按钮输入 - 12x12px圆形边框 */
  radio_input: string;
  
  /** 单选按钮内部指示器 - 4x4px圆形，默认透明 */
  radio_input_inner: string;
  
  /** 选中状态的单选按钮 - 蓝色背景 #499ef7 */
  radio_input_checked: string;
  
  /** 分组文本标签 - 支持文本溢出省略 */
  text: string;
  
  /** 文本输入框 - 默认隐藏 */
  textInput: string;
  
  /** 添加分组区域容器 */
  add_group: string;
  
  /** 添加分组图标 - 10x10px，绝对定位 */
  add_group_img: string;
  
  /** 添加分组文本输入框 - 最大宽度115px */
  add_group_text: string;
  
  /** 错误状态红色边框 */
  redBorder: string;
  
  /** 悬停面板样式 - 带三角形指示器 */
  hoverPanel: string;
  
  /** 右侧收藏夹定位修饰符 */
  rightfavorite: string;
  
  /** 弹出面板样式 - 半透明黑色背景 rgba(0,0,0,0.3) */
  popupPanel: string;
  
  /** 面板头部 - 28px高度，带关闭按钮 */
  header: string;
  
  /** 关闭按钮容器 */
  closeBtn: string;
}

/**
 * 默认导出：CSS模块样式对象
 * 
 * @remarks
 * 这是一个CSS-in-JS模块，由webpack的css-loader处理
 * 包含以下主要功能区域：
 * 
 * 1. **遮罩层** (.favGroup_panel_mask)
 *    - 全屏覆盖，z-index: 200
 *    - 支持悬停模式和弹出模式
 * 
 * 2. **主面板** (.favGroup_panel)
 *    - 宽度：400px（悬停模式）/ 178px（弹出模式）
 *    - 居中定位，圆角边框
 * 
 * 3. **分组列表** (.allGroup)
 *    - 可滚动区域，最大高度85px/172px
 *    - 单选按钮 + 文本标签布局
 *    - 悬停高亮效果
 * 
 * 4. **添加分组** (.add_group)
 *    - 文本输入框支持
 *    - 错误状态红色边框提示
 * 
 * 5. **弹出模式** (#favGroup_panel_collection, .popupPanel)
 *    - 带标题栏和关闭按钮
 *    - 半透明遮罩背景
 * 
 * @example
 *