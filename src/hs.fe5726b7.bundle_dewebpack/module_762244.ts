interface ToggleButtonProps {
  value: boolean;
  label?: string;
  onLabel?: string;
  offLabel?: string;
  onValueChange?: (value: boolean) => void;
}

interface ToggleButtonState {
  isOnActive: boolean;
  hidden?: boolean;
}

class ToggleButtonComponent extends React.Component<ToggleButtonProps, ToggleButtonState> {
  static defaultProps: Partial<ToggleButtonProps> = {
    value: false,
    label: "",
    onValueChange: undefined
  };

  private onValueChange?: (value: boolean) => void;
  private _defaultOnLabel: string;
  private _defaultOffLabel: string;

  constructor(props: ToggleButtonProps) {
    super(props);
    
    this.state = {
      isOnActive: props.value
    };
    
    this.onValueChange = props.onValueChange;
    this._onItemClick = this._onItemClick.bind(this);
    this._defaultOnLabel = ResourceManager.getString("button_toggle_on");
    this._defaultOffLabel = ResourceManager.getString("button_toggle_off");
  }

  update(props: ToggleButtonProps): void {
    this.onValueChange = props.onValueChange;
    const value = props.value;
    
    if (value !== this.state.isOnActive) {
      this.setState({
        isOnActive: value
      });
    }
  }

  render(): React.ReactElement {
    const hiddenClass = this.state.hidden ? " hidden" : "";
    const onActiveClass = this.state.isOnActive ? " active" : "";
    const offActiveClass = this.state.isOnActive ? "" : " active";
    
    return React.createElement(
      "ul",
      {
        className: `list-inline ToggleButton${hiddenClass}`
      },
      this.props.label && React.createElement("span", null, " ", this.props.label, " "),
      React.createElement(
        "li",
        {
          id: "triggerOn",
          className: `left${onActiveClass}`,
          onClick: this._onItemClick
        },
        this.props.onLabel ?? this._defaultOnLabel
      ),
      React.createElement(
        "li",
        {
          id: "triggerOff",
          className: `right${offActiveClass}`,
          onClick: this._onItemClick
        },
        this.props.offLabel ?? this._defaultOffLabel
      )
    );
  }

  private _onItemClick(event: React.MouseEvent<HTMLLIElement>): boolean {
    const currentIsOnActive = this.state.isOnActive ?? true;
    const clickedOn = (event.target as HTMLElement).id === "triggerOn";
    
    if (clickedOn !== currentIsOnActive) {
      this.setState({
        isOnActive: clickedOn
      });
      
      this.onValueChange?.(clickedOn);
      return true;
    }
    
    return false;
  }
}

export default class ToggleButton {
  private newDiv: HTMLDivElement;
  private instance: ToggleButtonComponent;

  constructor(props: ToggleButtonProps, container: HTMLElement) {
    this.newDiv = document.createElement("div");
    container.appendChild(this.newDiv);
    
    this.instance = ReactDOM.render(
      React.createElement(ToggleButtonComponent, {
        value: props.value,
        label: props.label,
        onLabel: props.onLabel,
        offLabel: props.offLabel,
        onValueChange: props.onValueChange
      }),
      this.newDiv
    ) as ToggleButtonComponent;
  }

  static create(props: ToggleButtonProps, container: HTMLElement): ToggleButton {
    return new ToggleButton(props, container);
  }

  update(props: ToggleButtonProps): void {
    this.instance.update(props);
  }

  destroy(): void {
    ReactDOM.unmountComponentAtNode(this.newDiv);
  }

  /**
   * @deprecated Use destroy instead
   */
  destory(): void {
    console.warn("deprecated, use destroy instead!");
    this.destroy();
  }
}