/**
 * 单点登录UI管理模块
 * 提供登录/登出模态框的显示与交互功能
 */

/**
 * 模态框回调参数
 */
interface ModalCallbackParams {
  /** 模态框唯一标识 */
  key: string;
}

/**
 * 登出模态框回调参数
 */
interface LogoutCallbackParams extends ModalCallbackParams {
  /** 是否保存设计 */
  saveDesign: boolean;
}

/**
 * 复选框配置
 */
interface CheckboxConfig {
  /** 复选框文本 */
  checkboxText: string;
  /** 复选框状态 */
  checkState: boolean;
  /** 状态变化回调 */
  callback: (checked: boolean) => void;
}

/**
 * 登录对话框配置
 */
interface ShowLoginOptions {
  /** 禁用确定按钮 */
  disableOk?: boolean;
  /** 禁用取消按钮 */
  disableCancel?: boolean;
  /** 点击确定回调 */
  onOk?: (params: ModalCallbackParams) => void;
  /** 点击取消回调 */
  onCancel?: (params: ModalCallbackParams) => void;
}

/**
 * 登出对话框配置
 */
interface ShowLogoutOptions {
  /** 禁用确定按钮 */
  disableOk?: boolean;
  /** 禁用取消按钮 */
  disableCancel?: boolean;
  /** 点击确定回调 */
  onOk?: (params: LogoutCallbackParams) => void;
  /** 点击取消回调 */
  onCancel?: (params: LogoutCallbackParams) => void;
}

/**
 * 内部模态框配置
 */
interface InternalModalConfig {
  /** 标题 */
  title: string;
  /** 内容描述 */
  content: string;
  /** 确定按钮文本 */
  okButtonContent: string;
  /** 取消按钮文本 */
  cancelButtonContent: string;
  /** 是否可关闭 */
  closable: boolean;
  /** 复选框配置（可选） */
  checkbox?: CheckboxConfig;
  /** 禁用确定按钮 */
  disableOk?: boolean;
  /** 禁用取消按钮 */
  disableCancel?: boolean;
  /** 点击确定回调 */
  onOk?: (params: ModalCallbackParams | LogoutCallbackParams) => void;
  /** 点击取消回调 */
  onCancel?: (params: ModalCallbackParams | LogoutCallbackParams) => void;
}

/**
 * AuthPopup按钮配置
 */
interface AuthPopupButton {
  /** 按钮文本 */
  text: string;
  /** 按钮图标 */
  icon: string;
  /** 点击回调 */
  onClick: () => void;
}

/**
 * AuthPopup配置
 */
interface AuthPopupConfig {
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 复选框配置 */
  checkbox?: CheckboxConfig;
  /** 禁用上一步按钮 */
  diablePrev?: boolean;
  /** 禁用下一步按钮 */
  diableNext?: boolean;
  /** 上一步按钮配置 */
  prev: AuthPopupButton;
  /** 下一步按钮配置 */
  next: AuthPopupButton;
}

/**
 * AuthPopup实例接口
 */
interface IAuthPopup {
  show(): void;
  hide(): void;
}

/**
 * 资源管理器接口
 */
declare const ResourceManager: {
  getString(key: string): string;
};

/**
 * Modal模块接口
 */
declare namespace Modal {
  function close(key: string): void;
}

/**
 * HSApp全局接口
 */
declare const HSApp: {
  UI: {
    AuthPopup: new (config: AuthPopupConfig) => IAuthPopup;
  };
};

/**
 * 单点登录UI管理类
 * 负责处理单设备登录相关的用户界面交互
 */
export declare class UI {
  constructor();

  /**
   * 显示登录确认对话框
   * 当检测到其他设备登录时，提示用户是否继续登录
   * @param options - 登录对话框配置选项
   */
  showLogin(options: ShowLoginOptions): void;

  /**
   * 显示登出确认对话框
   * 当用户被其他设备登录挤下线时，提示用户是否保存设计并登出
   * @param options - 登出对话框配置选项
   */
  showLogout(options: ShowLogoutOptions): void;

  /**
   * 关闭指定模态框
   * @param key - 模态框唯一标识符
   */
  closeModal(key: string): void;

  /**
   * 内部方法：调用模态框
   * @param config - 模态框配置
   * @private
   */
  private callModal(config: InternalModalConfig): void;
}