/**
 * 登录弹窗模块
 * 用于显示登录界面或未授权提示
 */

/**
 * 登录弹窗配置选项
 */
export interface LoginPopupOptions {
  /** 登录URL，如果提供则显示登录按钮，否则显示提示信息 */
  loginUrl?: string;
}

/**
 * 在指定容器元素中渲染登录弹窗
 * 
 * @param containerElement - 用于承载弹窗HTML的容器DOM元素
 * @param loginUrl - 可选的登录URL。如果提供，将显示带有"工作台帐号登录"按钮的登录界面；
 *                   如果不提供，将显示"未知领域"的提示信息
 * 
 * @remarks
 * - 当提供loginUrl时，点击登录按钮会在居中的弹出窗口中打开登录页面
 * - 弹出窗口尺寸：1120x620像素
 * - 弹出窗口会根据屏幕大小自动居中显示
 * 
 * @example
 *