interface LoadingPanelProps {
  loadingcolor?: string;
  panelclass?: string;
  covercolor?: string;
}

interface LoadingPanelState {}

class LoadingPanelComponent extends React.Component<LoadingPanelProps, LoadingPanelState> {
  static defaultProps: LoadingPanelProps = {
    loadingcolor: "#237ab9",
    panelclass: "panelcenter",
    covercolor: "transparent"
  };

  render(): React.ReactElement {
    const coverStyle: React.CSSProperties = {
      backgroundColor: this.props.covercolor
    };

    const panelClassName = this.props.panelclass;

    return React.createElement(
      "div",
      {
        className: "fullcover",
        style: coverStyle
      },
      React.createElement(
        "div",
        {
          className: `rotatesvgtarget ${panelClassName}`
        },
        React.createElement("img", {
          src: "" // Replace with actual image import
        })
      )
    );
  }
}

export default class LoadingPanelFactory {
  static create(options?: LoadingPanelProps): void {
    // Implementation needed
  }

  static getReactElement(props?: LoadingPanelProps): React.ReactElement {
    return React.createElement(LoadingPanelComponent, props);
  }
}