/**
 * 数字键盘组件类型定义
 * 用于测量标注、角度编辑等场景的浮动计算器键盘
 */

/**
 * 键盘按钮项配置
 */
interface NumberListItem {
  /** 按钮显示的标签（数字或小数点） */
  label: number | string;
}

/**
 * 计算器位置坐标
 */
interface CalcPosition {
  /** 水平位置（px） */
  clientX?: number;
  /** 垂直位置（px） */
  clientY?: number;
}

/**
 * 确认结果数据
 */
interface ConfirmResult {
  /** 最终计算值 */
  value: number;
  /** 标注方向：1-顶部/左侧，2-底部/右侧，3-两侧 */
  direction: number;
}

/**
 * 计算模式枚举
 */
enum CalcMode {
  /** 加法模式 */
  ADD = 1,
  /** 减法模式 */
  SUBTRACT = 2
}

/**
 * 编辑类型
 */
type EditType = 'length' | 'degree';

/**
 * 组件属性定义
 */
interface KeyboardProps {
  /** 是否显示遮罩层 */
  overlay: boolean;
  /** 初始数值 */
  initValue: number;
  /** 计算器初始位置 */
  calcPosition: CalcPosition;
  /** 是否为中间标注 */
  isMiddleDim: boolean;
  /** 标注样式：0-无方向选择，1-单侧，2-双侧 */
  dimStyle: number;
  /** 是否为垂直标注 */
  isVertical: boolean;
  /** 编辑类型：长度或角度 */
  editType: EditType;
}

/**
 * 组件数据状态
 */
interface KeyboardData {
  /** 数字按钮列表 */
  numberList: NumberListItem[];
  /** 是否使用绝对定位 */
  absolute: boolean;
  /** 是否已编辑 */
  edited: boolean;
  /** 当前输入的主数值 */
  num: string;
  /** 计算操作的第二个数值 */
  calcNum: string;
  /** 当前计算模式：1-加法，2-减法，null-无 */
  calcMode: CalcMode | null;
  /** 拖拽起始X坐标 */
  startX: number | string;
  /** 拖拽起始Y坐标 */
  startY: number | string;
  /** 当前触摸X坐标 */
  curX: number | string;
  /** 当前触摸Y坐标 */
  curY: number | string;
  /** 键盘X轴位置 */
  positionX: number | string;
  /** 键盘Y轴位置 */
  positionY: number | string;
  /** 容器与键盘宽度差值 */
  deltaX: number | string;
  /** 容器与键盘高度差值 */
  deltaY: number | string;
  /** 是否显示方向选择面板 */
  show: boolean;
  /** 选中的标注方向类型 */
  choosedType: string;
}

/**
 * 组件方法定义
 */
interface KeyboardMethods {
  /**
   * 选择数字或小数点
   * @param value - 按钮值（数字或"."）
   */
  choose(value: number | string): void;

  /**
   * 删除最后一位字符
   */
  deleteThis(): void;

  /**
   * 取消编辑并关闭键盘
   */
  cancel(): void;

  /**
   * 清空所有输入
   */
  clear(): void;

  /**
   * 重置计算状态
   */
  reset(): void;

  /**
   * 确认输入并触发回调
   */
  confirm(): void;

  /**
   * 设置计算模式
   * @param mode - 计算模式（1-加法，2-减法）
   */
  calc(mode: CalcMode): void;

  /**
   * 开始拖拽
   * @param event - 触摸事件
   */
  dragStart(event: TouchEvent): void;

  /**
   * 拖拽移动
   * @param event - 触摸事件
   */
  dragMove(event: TouchEvent): void;

  /**
   * 获取计算结果
   */
  getResult(): void;

  /**
   * 防止双指缩放
   */
  preventScale(): void;

  /**
   * 获取容器尺寸信息
   */
  getBoxSize(): void;

  /**
   * 边界检测，限制键盘位置
   */
  boundryDetect(): void;

  /**
   * 标注方向类型改变
   * @param type - 方向类型字符串
   */
  typeChange(type: string): void;
}

/**
 * 计算属性定义
 */
interface KeyboardComputed {
  /**
   * 当前计算表达式显示
   * @returns 格式化的计算式（如 "+10" 或 "-5"）
   */
  calcResult: string | undefined;
}

/**
 * 组件事件定义
 */
interface KeyboardEmits {
  /**
   * 取消事件
   */
  cancel: () => void;

  /**
   * 确认事件
   * @param result - 包含最终值和方向的结果对象
   */
  confirm: (result: ConfirmResult) => void;
}

/**
 * Vue组件实例类型
 */
declare const KeyboardComponent: import('vue').Component<
  KeyboardData,
  KeyboardMethods,
  KeyboardComputed,
  KeyboardProps
>;

export default KeyboardComponent;
export type {
  KeyboardProps,
  KeyboardData,
  KeyboardMethods,
  KeyboardComputed,
  KeyboardEmits,
  CalcPosition,
  ConfirmResult,
  EditType,
  NumberListItem
};
export { CalcMode };