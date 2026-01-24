/**
 * CSS模块导出类型定义
 * 用于浏览器兼容性检查提示框的样式
 */

/**
 * CSS样式字符串数组类型
 * 第一个元素：模块ID
 * 第二个元素：CSS内容字符串
 * 第三个元素：Source map（可选）
 */
type CSSExport = [string, string, string?];

/**
 * CSS模块默认导出
 * 包含浏览器检查提示框的样式定义
 * 
 * @remarks
 * 样式包括：
 * - `.wrapper_check_browser_box`: 固定定位的主容器
 * - `.message_content`: 消息内容容器，带阴影和圆角
 * - `.msg_icon_warning`: 警告图标样式
 * - `.msg_content_tip`: 提示文本样式
 * - `.wrapper_check_browser_box_network`: 网络状态提示框变体
 */
export declare const A: CSSExport;

export default A;