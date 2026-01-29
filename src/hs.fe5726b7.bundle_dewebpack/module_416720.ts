import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

interface BoxButtonProps {
  className?: string;
  icon?: string;
  id?: string;
  changed?: (active: boolean) => void;
}

interface BoxButtonState {
  hover: boolean;
  active: boolean;
}

class BoxButton extends React.Component<BoxButtonProps, BoxButtonState> {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string,
    changed: PropTypes.func
  };

  static defaultProps = {
    className: "",
    icon: "",
    changed: undefined
  };

  constructor(props: BoxButtonProps) {
    super(props);
    this.state = {
      hover: false,
      active: false
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver(): void {
    this.setState({
      hover: true
    });
  }

  onMouseOut(): void {
    this.setState({
      hover: false
    });
  }

  setIsActive(isActive: boolean): void {
    this.setState({
      active: isActive
    });
    this.props.changed?.(isActive);
  }

  render(): React.ReactElement {
    let className = `box_button ${this.props.className}`;
    if (this.state.active) {
      className += " active";
    } else if (this.state.hover) {
      className += " hover";
    }

    const { icon, id } = this.props;

    return (
      <div
        className={className}
        id={id}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <PinButton
          className="pinbtn"
          icon={icon}
          changed={this.setIsActive.bind(this)}
        />
      </div>
    );
  }
}

interface PinBoxConfig {
  left?: boolean;
  icon?: string;
  id?: string;
  changed?: (active: boolean) => void;
}

export default class PinBox {
  private newDiv: HTMLDivElement;
  private pinBox: React.ReactElement;
  private instance: BoxButton;

  constructor(config: PinBoxConfig, container: HTMLElement) {
    this.newDiv = document.createElement("div");
    container.appendChild(this.newDiv);
    
    this.pinBox = React.createElement(BoxButton, {
      className: `box_pin_button ${config.left ? "left" : "right"}`,
      icon: config.icon,
      id: config.id,
      changed: config.changed
    });
    
    this.instance = ReactDOM.render(this.pinBox, this.newDiv) as BoxButton;
  }

  static create(config: PinBoxConfig, container: HTMLElement): PinBox {
    return new PinBox(config, container);
  }

  update(data: unknown): void {
    this.instance.update(data);
  }

  destroy(): void {
    ReactDOM.unmountComponentAtNode(this.newDiv);
  }

  destory(): void {
    console.warn("deprecated, use destroy instead!");
    this.destroy();
  }
}