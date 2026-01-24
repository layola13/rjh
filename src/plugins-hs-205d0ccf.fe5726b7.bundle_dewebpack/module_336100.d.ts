/**
 * 返回按钮组件模块
 * 提供带有"返回"文本的图标按钮组件
 */

/**
 * 按钮点击事件处理器类型
 */
export interface ButtonClickHandler {
  onClick?: () => void;
}

/**
 * 返回按钮组件属性
 */
export interface BackButtonProps {
  /**
   * 点击事件处理函数
   */
  onClick?: () => void;
}

/**
 * 创建返回按钮组件
 * @param props - 按钮属性配置
 * @returns React 元素
 */
export default function createBackButton(props: BackButtonProps): React.ReactElement;