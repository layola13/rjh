import React from 'react';

/**
 * 数据接口，定义了 SizeLimitWidget 组件所需的数据结构
 */
interface ISizeLimitData {
  /**
   * 获取当前值
   * @returns 当前的值状态
   */
  getValue(): boolean;

  /**
   * 点击事件处理
   */
  onClick(): void;

  /**
   * 获取图标字符串
   * @returns 图标类型标识
   */
  getImgStr(): string;

  /**
   * 获取文本内容
   * @returns 显示的文本
   */
  getText(): string;
}

/**
 * SizeLimitWidget 组件的 Props 接口
 */
interface ISizeLimitWidgetProps {
  /**
   * 组件数据对象
   */
  data: ISizeLimitData;
}

/**
 * SizeLimitWidget 组件的 State 接口
 */
interface ISizeLimitWidgetState {
  /**
   * 当前值状态
   */
  value: boolean;
}

/**
 * 模态框配置选项
 */
interface IModalOptions {
  /**
   * 模态框标题
   */
  title: string;

  /**
   * 模态框内容
   */
  content: React.ReactNode;

  /**
   * 确认按钮文本
   */
  okButtonContent: string;

  /**
   * 是否隐藏取消按钮
   */
  hideCancelButton: boolean;

  /**
   * 确认回调
   */
  onOk: () => void;

  /**
   * 复选框配置
   */
  checkbox?: {
    /**
     * 复选框文本
     */
    checkboxText: string;

    /**
     * 复选框状态变化回调
     */
    callback: (checked: boolean) => void;
  };
}

/**
 * 模态框管理器
 */
declare class ModalManager {
  /**
   * 显示基础模态框
   * @param options - 模态框配置选项
   */
  static basic(options: IModalOptions): void;

  /**
   * 关闭指定类型的模态框
   * @param type - 模态框类型
   */
  static close(type: string): void;
}

/**
 * 工具提示组件的 Props 接口
 */
interface ITooltipProps {
  /**
   * 提示框位置
   */
  placement: 'top' | 'bottom' | 'left' | 'right';

  /**
   * 触发方式
   */
  trigger: 'hover' | 'click' | 'focus';

  /**
   * 提示内容
   */
  title: string;

  /**
   * 颜色主题
   */
  color: 'dark' | 'light';

  /**
   * 子元素
   */
  children: React.ReactNode;
}

/**
 * 工具提示组件
 */
declare class Tooltip extends React.Component<ITooltipProps> {}

/**
 * 图标组件的 Props 接口
 */
interface IIconsProps {
  /**
   * 图标类型
   */
  type: string;
}

/**
 * 图标组件
 */
declare class Icons extends React.Component<IIconsProps> {}

/**
 * 存储工具类
 */
declare class Storage {
  /**
   * 创建存储实例
   * @param namespace - 存储命名空间
   */
  constructor(namespace: string);

  /**
   * 获取存储值
   * @param key - 存储键
   * @returns 存储的值
   */
  get(key: string): any;

  /**
   * 设置存储值
   * @param key - 存储键
   * @param value - 要存储的值
   */
  set(key: string, value: any): void;
}

/**
 * 资源管理器
 */
declare class ResourceManager {
  /**
   * 获取国际化字符串
   * @param key - 资源键
   * @returns 对应的本地化字符串
   */
  static getString(key: string): string;
}

/**
 * 大小限制小部件组件
 * 用于在状态栏中显示和管理大小限制功能
 */
export declare class SizeLimitWidget extends React.Component<
  ISizeLimitWidgetProps,
  ISizeLimitWidgetState
> {
  /**
   * 是否禁用提示
   * @private
   */
  private _isDisableTip: boolean;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: ISizeLimitWidgetProps);

  /**
   * 点击事件处理器
   * 处理组件点击，根据配置显示确认对话框或直接执行操作
   * @param event - 鼠标事件对象
   */
  onClick(event: React.MouseEvent): void;

  /**
   * 确认点击处理器
   * 执行实际的操作并更新组件状态
   */
  onSureClick(): void;

  /**
   * 渲染组件
   * @returns React 元素
   */
  render(): React.ReactElement;
}

/**
 * 全局声明扩展
 */
declare global {
  /**
   * HSApp 全局对象
   */
  const HSApp: {
    Util: {
      Storage: typeof Storage;
    };
  };

  /**
   * 资源管理器全局对象
   */
  const ResourceManager: typeof ResourceManager;

  /**
   * 模态框命名空间
   */
  namespace Modal {
    const basic: typeof ModalManager.basic;
    const close: typeof ModalManager.close;
  }
}

export { Tooltip, Icons };