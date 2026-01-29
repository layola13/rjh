import React from 'react';
import PropTypes from 'prop-types';

type CheckboxStatus = 'checked' | 'unchecked';

type CheckboxType = 'single-line' | 'default';

interface CheckboxData {
  status: CheckboxStatus;
  disabled: boolean;
  className?: string;
  text?: string;
  type?: CheckboxType;
  onclick: (event: React.MouseEvent<HTMLSpanElement>, state: { checked: boolean }) => void;
}

interface CheckboxProps {
  data: CheckboxData;
}

interface CheckboxState {
  status: CheckboxStatus;
  disabled: boolean;
}

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps: CheckboxProps = {
    data: {
      status: 'unchecked',
      disabled: false,
      onclick: () => {}
    }
  };

  constructor(props: CheckboxProps) {
    super(props);
    const { data } = props;
    this.state = {
      status: data.status,
      disabled: data.disabled
    };
  }

  onItemClick = (
    event: React.MouseEvent<HTMLSpanElement>,
    data: CheckboxData,
    isChecked: boolean
  ): void => {
    if (!this.state.disabled) {
      const clickState = { checked: isChecked };
      const newStatus: CheckboxStatus = isChecked ? 'checked' : 'unchecked';
      this.setState({ status: newStatus });
      data.onclick(event, clickState);
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps: CheckboxProps): void {
    const { data } = nextProps;
    const { status, disabled } = data;
    this.setState({
      status,
      disabled
    });
  }

  render(): React.ReactElement {
    const { data } = this.props;
    const { status, disabled } = this.state;

    const containerClassName = data.className
      ? `checkboxContainer ${data.className}`
      : 'checkboxContainer';

    let checkButtonClassName = 'checkbtn ';
    const isChecked = status === 'checked';

    if (isChecked) {
      checkButtonClassName += 'checkbtn-checked ';
    }

    const enabledClassName = disabled ? 'disable' : 'enable';
    const checkboxType = data.type ?? 'default';

    return (
      <span
        className={`${enabledClassName} ${containerClassName} ${checkboxType}`}
        onClick={(event) => this.onItemClick(event, data, !isChecked)}
      >
        {checkboxType !== 'single-line' && (
          <input
            type="checkbox"
            disabled={disabled}
            className={checkButtonClassName}
            defaultChecked={isChecked}
            checked={isChecked}
          />
        )}
        <span className="inputlabel">{data.text}</span>
        {checkboxType === 'single-line' && (
          <input
            type="checkbox"
            disabled={disabled}
            className={checkButtonClassName}
            defaultChecked={isChecked}
            checked={isChecked}
          />
        )}
      </span>
    );
  }
}

export default Checkbox;