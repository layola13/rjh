interface LoadingIconProps {
  show?: boolean;
  className?: string;
}

class LoadingIcon extends React.PureComponent<LoadingIconProps> {
  static defaultProps = {
    show: true
  };

  render(): JSX.Element {
    let className = "loading-icon";
    className += this.props.show ? " show-loading-icon" : " hide-loading-icon";
    className += this.props.className ? ` ${this.props.className}` : "";

    return React.createElement("div", {
      className: className
    }, React.createElement("img", {
      src: c.default
    }));
  }
}

export default LoadingIcon;