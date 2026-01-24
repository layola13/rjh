import React from 'react';
import PropTypes from 'prop-types';

/**
 * 单个按钮配置项
 */
interface RadioButtonItem {
  /** 按钮标签文本 */
  label?: string;
  /** 按钮图标数组 [未选中状态, 选中状态] */
  src?: [string, string];
  /** 自定义样式类名 */
  className?: string;
  /** 触发器类型 */
  trigger?: 'hover' | 'click';
  /** 提示文本 */
  text?: string;
  /** 提示框位置 */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** 提示框延迟显示时间(ms) */
  delay?: number;
}

/**
 * 帮助提示配置
 */
interface HelpTipData {
  /** 触发器类型 */
  trigger?: 'hover' | 'click';
  /** 提示文本内容 */
  text?: string;
  /** 提示框位置 */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /** 延迟显示时间(ms) */
  delay?: number;
}

/**
 * RadioGroup 组件数据配置
 */
interface RadioGroupData {
  /** 当前选中的索引 */
  selectedIndex: number;
  /** 按钮组配置数组 */
  btns: RadioButtonItem[];
  /** 选项变化时的回调函数 */
  onchange: (selectedIndex: number) => void;
  /** 组件标签 */
  label?: string;
  /** 提示文本 */
  tooltip?: string;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式类名 */
  className?: string;
  /** 帮助提示配置 */
  helptipData?: HelpTipData;
}

/**
 * RadioGroup 组件属性
 */
interface RadioGroupProps {
  /** 配置数据 */
  data: RadioGroupData;
}

/**
 * RadioGroup 组件状态
 */
interface RadioGroupState {
  /** 当前选中的索引 */
  selectedIndex: number;
}

/**
 * 自定义单选按钮组组件
 * 支持图片按钮、工具提示、禁用状态等功能
 */
export default class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps: RadioGroupProps = {
    data: {
      selectedIndex: 0,
      btns: [],
      onchange: () => {},
    },
  };

  constructor(props: RadioGroupProps) {
    super(props);
    this.state = {
      selectedIndex: props.data.selectedIndex,
    };
  }

  /**
   * 接收新属性时更新选中状态
   * @deprecated 使用 getDerivedStateFromProps 替代
   */
  UNSAFE_componentWillReceiveProps(nextProps: RadioGroupProps): void {
    const { data } = nextProps;
    this.setState({
      selectedIndex: data.selectedIndex,
    });
  }

  /**
   * 处理选项点击事件
   * @param event - 点击事件对象
   * @param data - 组件数据配置
   * @param clickedButton - 被点击的按钮配置
   * @param isDisabled - 是否禁用状态
   */
  private _onItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    data: RadioGroupData,
    clickedButton: RadioButtonItem,
    isDisabled?: boolean
  ): void => {
    if (isDisabled) {
      return;
    }

    const { btns, onchange } = data;
    const clickedIndex = btns.indexOf(clickedButton);

    if (clickedIndex !== -1) {
      this.setState(
        {
          selectedIndex: clickedIndex,
        },
        () => {
          onchange(this.state.selectedIndex);
        }
      );
    }
  };

  /**
   * 创建弹出提示组件
   * @param content - 提示内容
   * @param config - 提示配置
   * @returns React 元素或空字符串
   */
  private createPopover(
    content: React.ReactNode,
    config: HelpTipData
  ): React.ReactNode {
    if (!config.text) {
      return '';
    }

    // 假设 HSApp.UI.Popover.Tooltip 是全局可用的组件
    const TooltipComponent = (window as any).HSApp?.UI?.Popover?.Tooltip;

    if (!TooltipComponent) {
      return content;
    }

    return React.createElement(
      TooltipComponent,
      {
        trigger: config.trigger ?? 'hover',
        title: config.text,
        placement: config.placement ?? 'right',
        delay: config.delay ?? 200,
      },
      content
    );
  }

  /**
   * 渲染单个按钮项
   * @param button - 按钮配置
   * @param index - 按钮索引
   * @returns React 元素
   */
  private renderRadioItem(
    button: RadioButtonItem,
    index: number
  ): React.ReactElement {
    const { data } = this.props;
    const { selectedIndex } = this.state;
    const isSelected = selectedIndex === index;

    const children: React.ReactNode[] = [];

    // 添加标签
    if (button.label) {
      children.push(
        <span key="label" className="inputlabel">
          {button.label}
        </span>
      );
    }

    // 添加图标
    if (button.src) {
      const imageSrc = isSelected ? button.src[1] : button.src[0];
      if (imageSrc) {
        children.push(
          <img key="icon" className="img-btn" src={imageSrc} alt="" />
        );
      }
    }

    const itemClassName = `radio-item ${isSelected ? 'active-item ' : ''}${button.className ?? ''}`;

    return (
      <div
        key={index}
        className={itemClassName}
        onClick={(event) =>
          this._onItemClick(event, data, button, data.disabled)
        }
      >
        {children}
      </div>
    );
  }

  render(): React.ReactElement {
    const { data } = this.props;

    // 构建容器类名
    const containerClasses: string[] = ['react-radio'];
    if (data.hidden) {
      containerClasses.push('hide');
    }
    if (data.disabled) {
      containerClasses.push('disabled');
    }
    if (data.className) {
      containerClasses.push(data.className);
    }

    // 标签类名
    const labelClassName = data.tooltip ? '' : 'label-hidden';

    // 渲染所有按钮项
    const radioItems = data.btns.map((button, index) =>
      this.renderRadioItem(button, index)
    );

    // 渲染帮助提示
    let helpTipElement: React.ReactNode = null;
    if (data.helptipData) {
      const helpIcon = (
        <span className="imageButton">
          <img src={require('./help-icon.png')} alt="help" />
        </span>
      );
      helpTipElement = this.createPopover(helpIcon, data.helptipData);
    }

    // 渲染组件标题
    const titleElement = data.label ? (
      <span className="radio-title">{data.label}</span>
    ) : null;

    return (
      <div className={containerClasses.join(' ')}>
        {titleElement}
        <div className={`radio-label ${labelClassName}`}>
          <span className="label-tooltip">{data.tooltip}</span>
        </div>
        {helpTipElement}
        <div className="react-radio-btn">{radioItems}</div>
      </div>
    );
  }
}