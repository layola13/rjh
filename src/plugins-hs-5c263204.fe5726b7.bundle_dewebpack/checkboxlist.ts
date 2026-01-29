import React, { useMemo } from 'react';
import { Row, Col, Checkbox } from 'antd';
import { FeedbackBlock } from './FeedbackBlock';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';

interface SubOption {
  optionCode: string;
  optionName: string;
}

interface Option {
  optionName: string;
  sub: SubOption[];
}

interface CheckboxListData {
  options: Option[];
  type?: 'small' | 'default';
}

interface CheckboxListProps {
  label: string;
  required?: boolean;
  data: CheckboxListData;
}

interface CheckboxListState {
  value: string[];
}

interface CheckboxGroupOptionsProps {
  options: Option[];
  type?: 'small' | 'default';
}

const CheckboxGroupOptions: React.FC<CheckboxGroupOptionsProps> = ({ options, type }) => {
  const renderedOptions = useMemo(() => {
    return options.map((option) => {
      const { optionName, sub } = option;
      const subOptionsCount = Object.keys(sub).length;
      
      const containerStyle: React.CSSProperties = {
        marginTop: '24px'
      };
      
      let maxInlineCount = 5;
      let colSpan = 5;
      
      if (type === 'small') {
        maxInlineCount = 4;
        colSpan = 6;
      }
      
      if (subOptionsCount < maxInlineCount) {
        containerStyle.width = 153.8 * subOptionsCount;
        containerStyle.display = 'inline-flex';
        containerStyle.flexDirection = 'column';
        colSpan = 24 / subOptionsCount;
      }
      
      return (
        <Col style={containerStyle} key={optionName}>
          <div className="feedback-checkbox-group-title">{optionName}</div>
          <Row>
            {sub && sub.map((subOption) => {
              const { optionCode, optionName: subOptionName } = subOption;
              return (
                <Col span={colSpan} key={optionCode}>
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

export class CheckboxList extends FeedbackBlock<CheckboxListProps, CheckboxListState> {
  constructor(props: CheckboxListProps) {
    super(props);
    this.state = {
      value: []
    };
  }
  
  private onChange = (checkedValues: string[]): void => {
    const { value: currentValue } = this.state;
    this.setState({
      value: checkedValues.length > 3 ? currentValue : checkedValues
    });
  };
  
  public getValue(): string[] {
    return this.state.value;
  }
  
  public isEmpty(): boolean {
    return !!this.props.required && this.getValue().length === 0;
  }
  
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
              <CheckboxGroupOptions options={options} type={type} />
            </Checkbox.Group>
          </Row>
        </div>
      </FeedbackBlockWrapper>
    );
  }
}