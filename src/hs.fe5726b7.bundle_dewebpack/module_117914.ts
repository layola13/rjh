interface ToggleButtonProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  onLabel: string;
  offLabel: string;
  positionClass?: string;
}

interface ToggleButtonState {
  isOnActive: boolean;
  onValueChange: (value: boolean) => void;
  hover: boolean;
  label?: string;
  hidden?: boolean;
}

class ToggleButton extends React.Component<ToggleButtonProps, ToggleButtonState> {
  private isMouseIn: boolean = false;

  constructor(props: ToggleButtonProps) {
    super(props);
    this.state = {
      isOnActive: props.value,
      onValueChange: props.onValueChange,
      hover: false,
      label: props.label
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ToggleButtonProps): void {
    this.update(nextProps);
  }

  private update(props: ToggleButtonProps): void {
    const { onValueChange, value } = props;
    if (value !== this.state.isOnActive) {
      this.setState({
        isOnActive: value,
        onValueChange
      });
    }
  }

  private onMouseIn = (): void => {
    if (!this.isMouseIn) {
      this.isMouseIn = true;
      this.setState({ hover: true });
    }
  };

  private onMouseOut = (): void => {
    if (this.isMouseIn) {
      this.setState({ hover: false });
      this.isMouseIn = false;
    }
  };

  private handleItemClick = (event: React.MouseEvent<HTMLLIElement>): boolean => {
    const currentState = this.state.isOnActive ?? this.state.isOnActive;
    const isOnTrigger = (event.target as HTMLElement).id === "triggerOn";
    let newState = isOnTrigger;
    
    if (isOnTrigger === currentState) {
      newState = !currentState;
    }
    
    this.setState({ isOnActive: newState });
    this.state.onValueChange(newState);
    return true;
  };

  render(): React.ReactElement {
    const isHovering = this.state.hover;
    const hoverClass = isHovering ? "ToggleButtonHover" : "";
    const hiddenClass = this.state.hidden ? " hidden" : "";
    const activeClass = this.state.isOnActive 
      ? " active liactive ToggleButtonLiRight" 
      : " inactive ToggleButtonLiRight";
    const inactiveClass = this.state.isOnActive ? " inactive" : " activeno";
    const onLabelText = this.state.isOnActive ? this.props.onLabel : " ";
    const offLabelText = this.state.isOnActive ? " " : this.props.offLabel;
    const toggleActiveClass = this.state.isOnActive ? " ToggleButtonActive" : "";
    const leftHoverClass = `ToggleButtonHoverLeft ${hoverClass}`;
    const titleText = this.state.label ? `${this.state.label}` : "";

    return (
      <span className={this.props.positionClass}>
        <span className="toggleButtonTitle">{titleText}</span>
        <ul
          className={`list-inline ToggleBtn${hiddenClass}${toggleActiveClass}`}
          onMouseEnter={this.onMouseIn}
          onMouseLeave={this.onMouseOut}
        >
          <li
            id="triggerOn"
            className={`left${activeClass} ${leftHoverClass}`}
            onClick={this.handleItemClick}
          >
            {onLabelText}
          </li>
          <li
            id="triggerOff"
            className={`right${inactiveClass} ${hoverClass}`}
            onClick={this.handleItemClick}
          >
            {offLabelText}
          </li>
        </ul>
      </span>
    );
  }
}

export default ToggleButton;