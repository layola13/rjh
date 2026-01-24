/**
 * CSS样式模块定义
 * 提供登录页面的样式配置
 * @module LoginStyles
 */

/**
 * CSS样式字符串，包含登录根容器的完整样式定义
 * 
 * 主要样式包括：
 * - #login-root-dom: 登录页面根容器，使用背景封面模式
 * - .global-bg-mask: 全局背景遮罩层，固定定位覆盖整个视口
 * - .user-msg: 用户消息提示区域，半透明白色文字，左下角定位
 * - .decorate-img: 装饰图片容器，占据左侧50%宽度
 * - .right: 右侧内容区域，居中对齐
 * - #global-bg-image: 全局背景图片，全屏覆盖
 * - #global-iframe-popup: iframe弹窗，固定尺寸、圆角、阴影和模糊效果
 * 
 * @remarks
 * 响应式设计：在屏幕宽度 ≤720px 时，右侧区域扩展至100%宽度
 */
declare const styles: string;

export { styles as A };
export default styles;