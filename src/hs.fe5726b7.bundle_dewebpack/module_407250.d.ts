import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 位置方向枚举
 */
type PositionDirection = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

/**
 * 浮动输入框位置配置
 */
interface Position {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 显示方向 */
  direction: PositionDirection;
}

/**
 * 渲染位置（CSS 样式）
 */
interface RenderPosition {
  left: number;
  top: number;
}

/**
 * 数值范围规则
 */
interface RangeRule {
  min: number;
  max: number;
}

/**
 * 输入框选项配置
 */
interface InputOptions {
  /** 显示小数位数 */
  displayDigits: number;
  /** 验证规则 */
  rules: {
    range: RangeRule;
  };
  /** 单位类型（可选） */
  unitType?: unknown;
}

/**
 * 浮动输入框数据项
 */
interface FloatInputData {
  /** 标签文本 */
  label: string;
  /** 唯一标识 */
  id: string;
  /** 当前值 */
  value: number;
  /** 配置选项 */
  options: InputOptions;
  /** 值变化回调（可选） */
  onValueChange?: (value: number) => void;
  /** 值变化结束回调（可选） */
  onValueChangeEnd?: (value: number) => void;
  /** Tab 键按下回调（可选） */
  onTabDown?: (value: number) => void;
  /** 键盘按下回调（可选） */
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

/**
 * 浮动输入框组件状态
 */
interface FloatInputState {
  /** 是否显示 */
  show: boolean;
  /** 是否禁用变化 */
  disableChange: boolean;
  /** 位置信息 */
  position: Position;
  /** 数据列表 */
  data: FloatInputData[];
  /** 当前选中索引 */
  selectedIndex: number;
}

/**
 * 长度输入框组件属性
 */
interface LengthInputProps {
  data: {
    className: string;
    label: string;
    labelPosition: string;
    value: number;
    options: InputOptions;
    onValueChange?: (value: number) => void;
    onValueChangeEnd?: (value: number) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    disableChange: boolean;
  };
}

/**
 * 长度输入框组件引用接口
 */
interface LengthInputRef {
  isIntegerCheck(value: string): boolean;
  isValueMatchRules(value: number): boolean;
}

/**
 * 默认位置偏移量
 */
const DEFAULT_OFFSET = 10;

/**
 * 默认容器宽度
 */
const DEFAULT_CONTAINER_WIDTH = 150;

/**
 * 默认容器高度
 */
const DEFAULT_CONTAINER_HEIGHT = 50;

/**
 * 浮动输入框 React 组件
 */
class FloatInputComponent extends React.Component<Record<string, never>, FloatInputState> {
  private refs: LengthInputRef[] = [];
  private lengthInputs: React.ReactElement[] = [];

  constructor(props: Record<string, never>) {
    super(props);
    
    this.state = {
      show: false,
      disableChange: false,
      position: {
        x: 0,
        y: 0,
        direction: 'topright',
      },
      data: [
        {
          label: '',
          id: '',
          value: 0,
          options: {
            displayDigits: 0,
            rules: {
              range: {
                min: 0,
                max: 100,
              },
            },
          },
        },
      ],
      selectedIndex: 0,
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  /**
   * 显示浮动输入框
   * @param position - 显示位置
   * @param data - 输入框数据列表
   * @param focusIndex - 初始聚焦索引
   */
  public show(
    position: Position = this.state.position,
    data?: FloatInputData[],
    focusIndex: number = 0
  ): void {
    if (!data || data.length === 0) {
      return;
    }

    this.setState(
      {
        show: true,
        position,
        data,
        selectedIndex: 0,
        disableChange: false,
      },
      () => {
        this.setFocus(focusIndex);
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
        document.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);
      }
    );
  }

  /**
   * 隐藏浮动输入框
   */
  public hide(): void {
    this.setState({
      show: false,
      selectedIndex: 0,
    });

    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  /**
   * 更新指定输入框的值
   * @param value - 新值
   * @param targetId - 目标输入框 ID（可选）
   * @param position - 新位置（可选）
   */
  public update(value: number, targetId?: string, position: Position = this.state.position): void {
    if (!position.direction) {
      position.direction = this.state.position.direction;
    }

    const data = [...this.state.data];
    let selectedIndex = this.state.selectedIndex;

    if (targetId) {
      selectedIndex = data.findIndex((item) => item.id === targetId);
    }

    if (selectedIndex >= 0 && selectedIndex < data.length) {
      data[selectedIndex].value = value;
    }

    this.setState(
      {
        data,
        position,
      },
      () => {
        this.setFocus(this.state.selectedIndex);
      }
    );
  }

  /**
   * 设置焦点到指定输入框
   * @param index - 输入框索引
   */
  public setFocus(index?: number): void {
    const targetIndex = index ?? this.state.selectedIndex;
    const selector = `.float-input-container .float-input-${targetIndex} .input`;
    $(selector).select();
  }

  /**
   * 键盘按下事件处理
   */
  private onKeyDown(event: KeyboardEvent): void {
    if (event.keyCode !== (window as any).HSApp?.Util?.Keyboard?.KeyCodes?.TAB) {
      return;
    }

    const nextIndex = (this.state.selectedIndex + 1) % this.state.data.length;
    const data = [...this.state.data];
    const currentData = data[this.state.selectedIndex];
    const target = event.target as HTMLInputElement;

    const unitType = currentData.options.unitType ?? (window as any).HSCore?.Util?.Unit?.LengthUnitTypeEnum?.millimeter;
    const parsedValue = (window as any).HSApp?.Util?.ParseUtil?.tryGetLengthDatabaseUnitValue?.(
      Number.parseInt(target.value),
      unitType
    );

    const currentRef = this.refs[this.state.selectedIndex];
    const isValid =
      Number.isFinite(parsedValue) &&
      currentRef?.isIntegerCheck(target.value) &&
      currentRef?.isValueMatchRules(parsedValue);

    if (isValid) {
      data[this.state.selectedIndex].value = parsedValue;
      currentData.onTabDown?.(parsedValue);

      this.setState(
        {
          data,
          disableChange: true,
          selectedIndex: nextIndex,
        },
        () => {
          this.setFocus(nextIndex);
        }
      );
    } else {
      this.setFocus(this.state.selectedIndex);
    }

    event.preventDefault();
  }

  /**
   * 键盘释放事件处理
   */
  private onKeyUp(event: KeyboardEvent): void {
    if (event.keyCode === (window as any).HSApp?.Util?.Keyboard?.KeyCodes?.TAB) {
      this.setState({ disableChange: false });
    }
  }

  /**
   * 鼠标按下事件处理
   */
  private onMouseDown(event: MouseEvent): void {
    const activeView = (window as any).HSApp?.App?.getApp()?.getActive2DView();
    if (activeView?.domElement !== event.target) {
      this.setState({ disableChange: true });
    }
  }

  /**
   * 鼠标释放事件处理
   */
  private onMouseUp(): void {
    if (this.state.disableChange) {
      this.setState({ disableChange: false });
    }
  }

  /**
   * 计算渲染位置（CSS 样式值）
   * @param position - 逻辑位置
   * @returns 渲染位置
   */
  private getRenderPosition(position: Position): RenderPosition {
    let { x, y } = position;
    let width = DEFAULT_CONTAINER_WIDTH;
    let height = DEFAULT_CONTAINER_HEIGHT;

    const container = document.querySelector<HTMLElement>('.float-input-container');
    if (container) {
      width = container.offsetWidth || DEFAULT_CONTAINER_WIDTH;
      height = container.offsetHeight || DEFAULT_CONTAINER_HEIGHT;
    }

    switch (position.direction) {
      case 'topleft':
        x -= width + DEFAULT_OFFSET;
        y -= height + DEFAULT_OFFSET;
        break;
      case 'topright':
        x += DEFAULT_OFFSET;
        y -= height + DEFAULT_OFFSET;
        break;
      case 'bottomleft':
        x -= width + DEFAULT_OFFSET;
        y += DEFAULT_OFFSET;
        break;
      default:
        x += DEFAULT_OFFSET;
        y += DEFAULT_OFFSET;
    }

    return { left: x, top: y };
  }

  /**
   * 渲染组件
   */
  public render(): React.ReactElement {
    const { show, position, data, disableChange } = this.state;
    const renderPosition = this.getRenderPosition(position);

    // 动态导入 LengthInput 组件（假设存在）
    const LengthInput = (window as any).LengthInput;

    this.lengthInputs = data.map((item, index) => {
      const inputProps = {
        className: `float-input-${index}`,
        label: item.label,
        labelPosition: 'left',
        value: item.value,
        options: item.options,
        onValueChange: item.onValueChange,
        onValueChangeEnd: item.onValueChangeEnd,
        onKeyDown: item.onKeyDown,
        disableChange,
      };

      return React.createElement(LengthInput, {
        key: item.id || index,
        data: inputProps,
        ref: (ref: LengthInputRef) => {
          this.refs[index] = ref;
        },
      });
    });

    return React.createElement(
      'div',
      {
        className: `float-input-container${show ? '' : ' hide'}`,
        style: renderPosition,
      },
      this.lengthInputs
    );
  }
}

/**
 * 浮动输入框管理器
 * 提供单例模式的浮动输入框控制接口
 */
class FloatInputManager {
  private readonly element: HTMLDivElement;
  private readonly floatInputUi: FloatInputComponent;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'float-input';
    
    const uiContainer = document.querySelector('#ui-container');
    if (uiContainer) {
      uiContainer.appendChild(this.element);
    }

    this.floatInputUi = ReactDOM.render(
      React.createElement(FloatInputComponent),
      this.element
    ) as FloatInputComponent;
  }

  /**
   * 显示浮动输入框
   * @param position - 显示位置
   * @param data - 输入框数据列表
   */
  public show(position: Position, data: FloatInputData[]): void {
    this.floatInputUi.show(position, data);
  }

  /**
   * 隐藏浮动输入框
   */
  public hide(): void {
    this.floatInputUi.hide();
  }

  /**
   * 更新输入框值
   * @param value - 新值
   * @param targetId - 目标输入框 ID
   * @param position - 新位置（可选）
   */
  public update(value: number, targetId: string, position?: Position): void {
    this.floatInputUi.update(value, targetId, position);
  }

  /**
   * 设置焦点
   * @param index - 输入框索引
   */
  public setFocus(index: number): void {
    this.floatInputUi.setFocus(index);
  }
}

export default FloatInputManager;