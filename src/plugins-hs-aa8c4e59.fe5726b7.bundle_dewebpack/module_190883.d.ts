/**
 * 背景设置状态管理器的类型定义
 * 用于管理背景PNG图像显示、固定和删除等功能
 */

/**
 * 属性栏弹出框接口
 * 用于显示和管理属性配置弹出框
 */
interface IPropertyBarPopup {
  /**
   * 销毁弹出框实例，清理相关资源
   */
  destroy(): void;

  /**
   * 设置失去焦点时的处理函数
   * @param handler - 失去焦点时触发的回调函数
   */
  setLoseFocusHandler(handler: (force?: boolean) => void): void;

  /**
   * 更新弹出框位置
   * @param bound - 目标元素的边界信息
   */
  updatePosition(bound: IBoundingRect | undefined): void;

  /**
   * 添加边界区域
   * @param config - 边界配置对象
   */
  addBound(config: { id: string; bound: IBoundingRect }): void;
}

/**
 * 边界矩形信息
 */
interface IBoundingRect {
  /** 左边距（像素） */
  left: number;
  /** 上边距（像素） */
  top: number;
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
}

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  /** 状态按钮 */
  statusBtn = 'statusBtn',
  /** 标签 */
  label = 'label',
  /** 颜色复选框 */
  colorCheckbox = 'colorCheckbox',
  /** 图片按钮 */
  imageButton = 'imageButton',
  /** 普通按钮 */
  button = 'button'
}

/**
 * 颜色复选框状态枚举
 */
declare enum ColorCheckboxStatusEnum {
  /** 选中状态 */
  checked = 'checked',
  /** 未选中状态 */
  unchecked = 'unchecked'
}

/**
 * 属性栏控件配置项
 */
type PropertyBarControl =
  | IStatusButtonControl
  | ILabelControl
  | IColorCheckboxControl
  | IImageButtonControl
  | IButtonControl;

/**
 * 状态按钮控件配置
 */
interface IStatusButtonControl {
  id: string;
  type: PropertyBarControlTypeEnum.statusBtn;
  data: {
    /** 图标路径 */
    icon: string;
    /** 是否靠左对齐 */
    left: boolean;
    /** 状态变化回调函数 */
    changed: (status: boolean) => void;
  };
}

/**
 * 标签控件配置
 */
interface ILabelControl {
  id: string;
  type: PropertyBarControlTypeEnum.label;
  data: {
    /** 标签文本内容 */
    text: string;
  };
}

/**
 * 颜色复选框控件配置
 */
interface IColorCheckboxControl {
  id: string;
  type: PropertyBarControlTypeEnum.colorCheckbox;
  data: {
    /** 复选框文本 */
    text: string;
    /** 复选框状态 */
    status: ColorCheckboxStatusEnum;
    /** 是否禁用 */
    disabled: boolean;
    /** 点击事件处理函数 */
    onclick: () => void;
  };
}

/**
 * 图片按钮控件配置
 */
interface IImageButtonControl {
  id: string;
  type: PropertyBarControlTypeEnum.imageButton;
  data: {
    /** 图片源路径 */
    src: string;
    /** 点击事件处理函数 */
    onclick: () => void;
  };
}

/**
 * 普通按钮控件配置
 */
interface IButtonControl {
  id: string;
  type: PropertyBarControlTypeEnum.button;
  data: {
    /** 是否禁用 */
    disabled: boolean;
    /** 按钮文本 */
    text: string;
    /** 点击事件处理函数 */
    onclick: () => void;
  };
}

/**
 * 图层底图对象接口
 */
interface IUnderlay {
  /** 是否显示背景 */
  show: boolean;

  /**
   * 设置背景显示状态
   * @param visible - 是否显示背景
   */
  showBackground(visible: boolean): void;
}

/**
 * 图层对象接口
 */
interface ILayer {
  /** 底图对象（可能不存在） */
  underlay?: IUnderlay | null;
}

/**
 * 背景设置弹出框状态管理器
 * 负责管理背景PNG的显示、隐藏、固定和删除操作
 */
declare class BackgroundSettingPopupState {
  /**
   * 属性栏弹出框实例（可能未初始化）
   */
  propertyBarPopup: IPropertyBarPopup | undefined;

  /**
   * 弹出框是否显示
   */
  isShow: boolean;

  /**
   * 背景PNG是否选中显示
   */
  bgPngChecked: boolean;

  /**
   * 背景PNG是否已删除
   */
  bgPngDelete: boolean;

  /**
   * 触发目标的边界信息
   */
  triggerTargetBound: IBoundingRect | undefined;

  /**
   * 弹出框是否固定（钉住）
   */
  isPin: boolean;

  /**
   * 切换弹出框显示/隐藏状态
   * @param targetBound - 触发元素的边界信息
   * @returns 切换后的显示状态
   */
  toggle(targetBound: IBoundingRect): boolean;

  /**
   * 隐藏弹出框
   * @param force - 是否强制隐藏（忽略固定状态）
   */
  hide(force?: boolean): void;

  /**
   * 背景显示切换处理（内部方法）
   * 切换背景PNG的显示/隐藏状态
   * @private
   */
  _onShowBackgroundToggle(): void;

  /**
   * 设置背景显示复选框的选中状态
   * 根据当前底图状态更新复选框状态
   */
  onShowBackgroundToggleSetChecked(): void;

  /**
   * 删除背景PNG点击处理（内部方法）
   * 处理删除背景PNG的逻辑，包括登录检查
   * @private
   */
  _onDeleteBackgroundPngClk(): void;

  /**
   * 状态栏执行删除操作（内部方法）
   * 执行实际的删除底图命令
   * @private
   */
  _statusBarExcuteDelete(): void;

  /**
   * 更新弹出框内容和位置
   * 重新构建弹出框的控件并更新其位置
   */
  updatePopup(): void;
}

/**
 * 导出默认的背景设置弹出框状态管理器类
 */
export default BackgroundSettingPopupState;