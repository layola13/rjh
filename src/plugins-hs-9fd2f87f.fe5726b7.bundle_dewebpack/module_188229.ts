interface SwitchButtonProps {
  tooltip: string;
  normalIcon: string;
  hoverIcon: string;
  handleClick: () => void;
}

interface SwitchButtonState {
  hover: boolean;
}

class SwitchButton extends React.Component<SwitchButtonProps, SwitchButtonState> {
  constructor(props: SwitchButtonProps) {
    super(props);
    this.state = {
      hover: false
    };
    this._handleClick = this._handleClick.bind(this);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  private _handleClick(): void {
    this.props.handleClick();
  }

  private _onMouseEnter(): void {
    this.setState({
      hover: true
    });
  }

  private _onMouseLeave(): void {
    this.setState({
      hover: false
    });
  }

  render(): React.ReactElement {
    const { tooltip, normalIcon, hoverIcon } = this.props;
    const { hover } = this.state;

    return React.createElement(HSApp.UI.Popover.Tooltip, {
      className: "switch-popover",
      placement: "bottom",
      trigger: "hover",
      title: tooltip
    }, React.createElement("div", {
      className: `cube-switch ${hover ? "hover-cube-switch" : ""}`,
      onClick: () => this._handleClick(),
      onMouseEnter: () => this._onMouseEnter(),
      onMouseLeave: () => this._onMouseLeave()
    }, React.createElement("img", {
      className: hover ? "hover-img" : "",
      src: normalIcon
    }), React.createElement("img", {
      className: hover ? "" : "hover-img",
      src: hoverIcon
    })));
  }
}

interface ViewOption {
  normalIcon: string;
  hoverIcon: string;
  tooltip: string;
}

interface ViewSwitchData {
  defaultView: ViewOption;
  perspective: ViewOption;
  ortho: ViewOption;
}

type CurrentOptionType = "ortho" | "perspective";

interface ViewSwitchState {
  currentOption: CurrentOptionType;
}

export default class ViewSwitch extends React.Component<{}, ViewSwitchState> {
  private data: ViewSwitchData;

  constructor(props: {}) {
    super(props);
    
    this.data = {
      defaultView: {
        normalIcon: g.default,
        hoverIcon: f.default,
        tooltip: ResourceManager.getString("plugin_customizedmodeling_viewcube_default_view")
      },
      perspective: {
        normalIcon: c.default,
        hoverIcon: u.default,
        tooltip: ResourceManager.getString("plugin_customizedmodeling_viewcube_switch_to_perspective")
      },
      ortho: {
        normalIcon: d.default,
        hoverIcon: p.default,
        tooltip: ResourceManager.getString("plugin_customizedmodeling_viewcube_switch_to_ortho")
      }
    };

    this.state = {
      currentOption: "ortho"
    };

    this._onViewOptionChanged = this._onViewOptionChanged.bind(this);
    this._setDefaultView = this._setDefaultView.bind(this);
  }

  private _onViewOptionChanged(): void {
    const { currentOption } = this.state;
    
    if (currentOption === "perspective") {
      this.setState({
        currentOption: "ortho"
      });
      y.UI.start3DCamera();
      y.UI.focusEditFrame();
    } else if (currentOption === "ortho") {
      this.setState({
        currentOption: "perspective"
      });
      y.UI.startOrthoCamera();
      y.UI.focusEditFrame();
    }
  }

  private _setDefaultView(): void {
    y.UI.homeCamera();
    y.UI.focusEditFrame();
  }

  render(): React.ReactElement {
    const buttons = ["defaultView", this.state.currentOption].map((optionKey) => {
      const option = this.data[optionKey as keyof ViewSwitchData];
      const { tooltip, normalIcon, hoverIcon } = option;
      
      return React.createElement(SwitchButton, {
        tooltip,
        normalIcon,
        hoverIcon,
        handleClick: optionKey === "defaultView" ? this._setDefaultView : this._onViewOptionChanged
      });
    });

    return React.createElement("div", {
      className: "diy-viewswitch-container"
    }, buttons);
  }
}

const y = HSApp.Util.Core.define("hsw.plugin.customizedmodeling");