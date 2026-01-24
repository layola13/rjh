/**
 * 只读按钮模块
 * 提供只读状态下的操作按钮组件和配置类
 */

/**
 * 只读按钮组件的属性接口
 */
export interface ReadonlyBtnComProps {
  /**
   * 按钮点击事件回调
   */
  onClick?: () => void;
  
  /**
   * 按钮显示文本
   */
  text: string;
  
  /**
   * 按钮提示信息（可选）
   * 当提供时，按钮将包裹在 Tooltip 组件中
   */
  tips?: string;
}

/**
 * 只读按钮配置类的构造参数接口
 */
export interface ReadonlyBtnOptions {
  /**
   * 按钮显示文本
   */
  text: string;
  
  /**
   * 按钮点击事件回调
   */
  onClick?: () => void;
  
  /**
   * 按钮提示信息（可选）
   */
  tips?: string;
}

/**
 * 只读按钮 React 函数组件
 * 
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @remarks
 * - 如果提供了 tips，按钮将显示工具提示
 * - 使用 HSFPConstants.PluginType.EditStatus 作为插件类型
 * - 工具提示存储键为 "readonly-btn-tip"
 */
export declare const ReadonlyBtnCom: React.FC<ReadonlyBtnComProps>;

/**
 * 只读按钮配置类
 * 用于封装按钮的配置并提供渲染方法
 * 
 * @example
 *