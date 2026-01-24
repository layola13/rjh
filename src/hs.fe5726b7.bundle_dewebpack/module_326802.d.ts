/**
 * 消息框选项配置接口
 */
interface MessageBoxOptions {
  /** 消息框标题 */
  title?: string;
  /** 是否禁用遮罩层 */
  disablemask?: boolean;
  /** 内容是否可选中 */
  contentsSelectable?: boolean;
  /** 是否显示"不再显示"选项 */
  dontShowAgain?: boolean;
  /** 复选框文本内容 */
  checkboxContent?: string;
  /** 复选框是否默认选中 */
  isChecked?: boolean;
  /** 额外内容配置 */
  extraContent?: ExtraContent;
}

/**
 * 链接内容配置接口
 */
interface LinkContent {
  /** 链接地址 */
  link: string;
  /** 链接文本 */
  str: string;
  /** 链接样式 */
  style?: React.CSSProperties;
  /** 链接点击回调 */
  onClick?: () => void;
}

/**
 * 额外内容配置接口
 */
interface ExtraContent {
  /** 额外内容样式 */
  style?: React.CSSProperties;
  /** 额外内容文本数组 */
  strs: string[];
}

/**
 * 消息框回调函数类型
 * @param buttonIndex - 按钮索引: 0=确定, 1=取消, 2=关闭, -1=复选框状态变化
 * @param data - 附加数据
 * @param checkState - 复选框选中状态（仅当buttonIndex为-1时有效）
 */
type MessageBoxCallback = (
  buttonIndex: number,
  data?: unknown,
  checkState?: boolean
) => void;

/**
 * 显示选项配置接口
 */
interface ShowOptions {
  /** 是否通过确定按钮关闭 */
  closeByOkButton?: boolean;
}

/**
 * 复选框配置接口
 */
interface CheckboxConfig {
  /** 复选框文本 */
  checkboxText: string;
  /** 复选框状态 */
  checkState: boolean;
  /** 复选框状态变化回调 */
  callback: (checkState: boolean) => void;
}

/**
 * 模态框配置接口
 */
interface ModalConfig {
  /** 模态框内容 */
  content: React.ReactElement;
  /** 确定按钮内容 */
  okButtonContent: string;
  /** 取消按钮内容 */
  cancelButtonContent: string;
  /** 是否隐藏取消按钮 */
  hideCancelButton: boolean;
  /** 是否显示遮罩层 */
  mask: boolean;
  /** 模态框标题 */
  title: string;
  /** 是否启用复选框 */
  enableCheckbox: string | boolean;
  /** 内容是否可选中 */
  contentsSelectable: boolean;
  /** 是否可关闭 */
  closable: boolean;
  /** 复选框配置 */
  checkbox: CheckboxConfig;
  /** 确定按钮回调 */
  onOk: () => void;
  /** 取消按钮回调 */
  onCancel: () => void;
  /** 关闭按钮回调 */
  onClose: () => void;
}

/**
 * 消息框类声明
 * 用于创建和显示自定义消息对话框
 */
declare class MessageBox {
  /** 消息内容（支持HTML） */
  msg: string;
  /** 按钮文本数组 */
  buttons: string[];
  /** 默认按钮索引 */
  defaultbtnIndex: number;
  /** 消息框标题 */
  title: string;
  /** 是否禁用遮罩层 */
  disablemask: boolean;
  /** 内容是否可选中 */
  contentsSelectable: boolean;
  /** 是否显示"不再显示"选项 */
  dontShowAgain: boolean;
  /** Tab键索引 */
  tabindex: number;
  /** 复选框文本内容 */
  checkboxContent: string;
  /** 复选框是否选中 */
  isChecked: boolean;
  /** 链接内容配置 */
  linkContent: LinkContent | null;
  /** 额外内容配置 */
  extraContent?: ExtraContent;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建消息框实例（静态工厂方法）
   * @param message - 消息内容（支持HTML）
   * @param buttons - 按钮文本数组，例如 ["取消", "确定"]
   * @param defaultButtonIndex - 默认按钮索引
   * @param options - 消息框选项配置
   * @param linkContent - 链接内容配置
   * @returns 消息框实例
   */
  static create(
    message?: string,
    buttons?: string[],
    defaultButtonIndex?: number,
    options?: MessageBoxOptions,
    linkContent?: LinkContent
  ): MessageBox;

  /**
   * 初始化消息框（内部方法）
   * @param message - 消息内容
   * @param buttons - 按钮文本数组
   * @param defaultButtonIndex - 默认按钮索引
   * @param options - 消息框选项配置
   * @param linkContent - 链接内容配置
   * @private
   */
  _init(
    message?: string,
    buttons?: string[],
    defaultButtonIndex?: number,
    options?: MessageBoxOptions,
    linkContent?: LinkContent
  ): void;

  /**
   * 显示消息框
   * @param callback - 按钮点击回调函数
   * @param showOptions - 显示选项配置
   */
  show(callback?: MessageBoxCallback, showOptions?: ShowOptions): void;

  /**
   * 关闭消息框
   * @returns 关闭操作的结果
   */
  close(): unknown;
}

/**
 * 全局消息框对象（挂载在window上）
 */
declare global {
  interface Window {
    MessageBox: typeof MessageBox;
  }
}

export { MessageBox, MessageBoxOptions, LinkContent, MessageBoxCallback };