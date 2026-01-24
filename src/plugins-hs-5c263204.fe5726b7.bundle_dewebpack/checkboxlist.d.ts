/**
 * CheckboxList 组件模块
 * 用于反馈表单的多选列表组件，支持分组选项和最大选择限制
 */

import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { FeedbackBlock } from './FeedbackBlock';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';

/**
 * 子选项配置
 */
interface SubOption {
  /** 选项代码 */
  optionCode: string;
  /** 选项显示名称 */
  optionName: string;
}

/**
 * 选项组配置
 */
interface OptionGroup {
  /** 选项组名称 */
  optionName: string;
  /** 子选项列表 */
  sub: SubOption[];
}

/**
 * 组件尺寸类型
 */
type SizeType = 'small' | 'default';

/**
 * CheckboxList 数据配置
 */
interface CheckboxListData {
  /** 选项组列表 */
  options: OptionGroup[];
  /** 组件尺寸类型 */
  type?: SizeType;
}

/**
 * CheckboxList 组件属性
 */
interface CheckboxListProps {
  /** 字段标签 */
  label: string;
  /** 是否必填 */
  required?: boolean;
  /** 数据配置 */
  data: CheckboxListData;
}

/**
 * CheckboxList 组件状态
 */
interface CheckboxListState {
  /** 当前选中的值列表 */
  value: CheckboxValueType[];
}

/**
 * 选项渲染组件属性
 */
interface CheckboxOptionsProps {
  /** 选项组列表 */
  options: OptionGroup[];
  /** 组件尺寸类型 */
  type?: SizeType;
}

/**
 * 最大选择数量限制
 */
const MAX_SELECTION = 3;

/**
 * 小尺寸样式配置
 */
const SMALL_SIZE_CONFIG = {
  /** 每行最大选项数 */
  maxItemsPerRow: 4,
  /** 栅格列数 */
  colSpan: 6,
} as const;

/**
 * 默认尺寸样式配置
 */
const DEFAULT_SIZE_CONFIG = {
  /** 每行最大选项数 */
  maxItemsPerRow: 5,
  /** 栅格列数 */
  colSpan: 5,
} as const;

/**
 * 单个选项组宽度（像素）
 */
const OPTION_GROUP_WIDTH = 153.8;

/**
 * 选项组垂直间距（像素）
 */
const OPTION_GROUP_MARGIN_TOP = 24;

/**
 * 渲染复选框选项组
 * @param props - 组件属性
 */
const CheckboxOptions: React.FC<CheckboxOptionsProps> = ({ options, type }) => {
  const renderedOptions = React.useMemo(() => {
    return options.map((option) => {
      const { optionName, sub } = option;
      const subOptionCount = Object.keys(sub).length;

      const groupStyle: React.CSSProperties = {
        marginTop: `${OPTION_GROUP_MARGIN_TOP}px`,
      };

      // 根据尺寸类型选择配置
      const sizeConfig = type === 'small' ? SMALL_SIZE_CONFIG : DEFAULT_SIZE_CONFIG;
      const { maxItemsPerRow, colSpan: defaultColSpan } = sizeConfig;

      let colSpan = defaultColSpan;

      // 如果子选项数量少于最大值，调整布局为内联
      if (subOptionCount < maxItemsPerRow) {
        groupStyle.width = OPTION_GROUP_WIDTH * subOptionCount;
        groupStyle.display = 'inline-flex';
        groupStyle.flexDirection = 'column';
        colSpan = 24 / subOptionCount;
      }

      return (
        <Col key={optionName} style={groupStyle}>
          <div className="feedback-checkbox-group-title">{optionName}</div>
          <Row>
            {sub.map((subOption) => {
              const { optionCode, optionName: subOptionName } = subOption;
              return (
                <Col key={optionCode} span={colSpan}>
                  <Checkbox
                    className="checkbox-list-checkbox"
                    value={optionCode}
                  >
                    {subOptionName}
                  </Checkbox>
                </Col>
              );
            })}
          </Row>
        </Col>
      );
    });
  }, [options, type]);

  return <>{renderedOptions}</>;
};

/**
 * CheckboxList 组件
 * 多选列表组件，支持分组、必填校验和最大选择数量限制（最多3项）
 */
export class CheckboxList extends FeedbackBlock<CheckboxListProps, CheckboxListState> {
  constructor(props: CheckboxListProps) {
    super(props);
    this.state = {
      value: [],
    };
  }

  /**
   * 复选框变更事件处理
   * @param checkedValues - 新选中的值列表
   */
  private onChange = (checkedValues: CheckboxValueType[]): void => {
    const { value: currentValue } = this.state;

    // 限制最多选择3项
    this.setState({
      value: checkedValues.length > MAX_SELECTION ? currentValue : checkedValues,
    });
  };

  /**
   * 获取当前选中的值
   * @returns 选中值列表
   */
  public getValue(): CheckboxValueType[] {
    return this.state.value;
  }

  /**
   * 检查是否为空（用于必填校验）
   * @returns 如果必填且未选择任何项则返回 true
   */
  public isEmpty(): boolean {
    return !!this.props.required && this.getValue().length === 0;
  }

  /**
   * 渲染组件
   */
  public render(): React.ReactNode {
    const { value } = this.state;
    const { label, required, data } = this.props;
    const { options, type } = data;

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-checkbox-list ${this.context}`}>
          <FeedbackBlockLabel label={label} required={required} />
          <Row>
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={this.onChange}
              value={value}
            >
              <CheckboxOptions options={options} type={type} />
            </Checkbox.Group>
          </Row>
        </div>
      </FeedbackBlockWrapper>
    );
  }
}