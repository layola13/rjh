/**
 * UI管理类
 * 负责屋顶绘制插件的用户界面交互和DOM操作
 * @module UI
 * @original-id 691447
 */

/**
 * 环境对象接口
 * 表示屋顶绘制的运行环境
 */
export interface Environment {
  // 根据实际使用情况补充具体属性
  [key: string]: unknown;
}

/**
 * 模态框配置选项
 */
export interface ModalConfirmOptions {
  /** 模态框标题 */
  title: string;
  /** 确认按钮文本内容 */
  okButtonContent: string;
  /** 取消按钮文本内容 */
  cancelButtonContent: string;
  /** 模态框内容 */
  content: string;
  /** 是否启用复选框 */
  enableCheckbox: boolean;
  /** 点击确认按钮的回调函数 */
  onOk: () => void;
  /** 点击取消按钮的回调函数 */
  onCancel: () => void;
  /** 关闭模态框的回调函数 */
  onClose: () => void;
}

/**
 * 模态框静态类
 */
export interface ModalStatic {
  /**
   * 显示确认对话框
   * @param options - 模态框配置选项
   */
  confirm(options: ModalConfirmOptions): void;
}

/**
 * 模态框模块
 */
export interface ModalModule {
  Modal: ModalStatic;
}

/**
 * UI类
 * 管理屋顶绘制插件的2D辅助容器和用户交互确认对话框
 */
export declare class UI {
  /** 运行环境实例 */
  private _environment: Environment;
  
  /** 2D辅助容器DOM元素 */
  private _aux2DContainer: HTMLDivElement | undefined;

  /**
   * 构造函数
   * @param environment - 运行环境对象
   */
  constructor(environment: Environment);

  /**
   * 获取2D辅助容器
   * @returns 2D辅助容器DOM元素（如果尚未创建则返回undefined）
   */
  get aux2DContainer(): HTMLDivElement | undefined;

  /**
   * 渲染2D辅助容器
   * 如果容器不存在，则创建一个新的div元素并添加到编辑器2D容器中
   * 容器类名为 "roofsdrawing-aux2d"
   */
  renderAux2D(): void;

  /**
   * 销毁UI实例
   * 移除2D辅助容器DOM元素并清理引用
   */
  destroy(): void;

  /**
   * 显示切换图层确认对话框
   * @returns Promise，用户确认时resolve(true)，取消或关闭时reject(false)
   */
  showSwitchLayerConfirm(): Promise<boolean>;

  /**
   * 显示自动生成平面屋顶确认对话框
   * @returns Promise，用户确认时resolve(true)，取消或关闭时reject(false)
   */
  showAutoGeneratePlaneRoofsConfirm(): Promise<boolean>;
}