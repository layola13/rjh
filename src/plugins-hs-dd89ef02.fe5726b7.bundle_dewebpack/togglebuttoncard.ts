interface ToggleButtonCardData {
  title: string;
  subTitle?: string;
  className?: string;
  checkedChildren: string;
  unCheckedChildren: string;
  showText: boolean;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled: boolean;
  error: boolean;
  canChecked: boolean;
}

interface ToggleButtonCardProps {
  data: ToggleButtonCardData;
}

interface ToggleButtonCardState {
  checked: boolean;
  disabled: boolean;
  error: boolean;
  canChecked: boolean;
}

declare const HSApp: {
  Config: {
    EZHOME_EMAIL_NOTIFICATION_BIND?: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

export class ToggleButtonCard extends React.Component<ToggleButtonCardProps, ToggleButtonCardState> {
  static defaultProps: ToggleButtonCardProps = {
    data: {
      title: "欢迎窗口",
      subTitle: "设置邮件提醒可在渲染完成以后通知您",
      className: "",
      checkedChildren: "开",
      unCheckedChildren: "关",
      showText: true,
      checked: true,
      onChange: () => {},
      disabled: false,
      error: false,
      canChecked: true,
    },
  };

  constructor(props: ToggleButtonCardProps) {
    super(props);
    
    const { checked, disabled, error, canChecked } = props.data;
    
    this.state = {
      checked,
      disabled: disabled !== undefined ? disabled : false,
      error: error !== undefined ? error : false,
      canChecked: canChecked === undefined || canChecked,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ToggleButtonCardProps): void {
    const { disabled, error, canChecked, checked } = nextProps.data;
    
    this.setState({
      checked,
      disabled: disabled !== undefined ? disabled : false,
      error: error !== undefined ? error : false,
      canChecked: canChecked === undefined || canChecked,
    });
  }

  onValueChange = (): void => {
    const newChecked = !this.state.checked;
    
    if (this.state.canChecked) {
      this.setState({ checked: newChecked }, () => {
        this.props.data?.onChange?.(newChecked);
      });
    } else {
      this.setState({ error: true });
    }
  };

  openNewWindow = (): void => {
    const bindUrl = HSApp.Config.EZHOME_EMAIL_NOTIFICATION_BIND;
    if (bindUrl) {
      window.open(bindUrl, "_blank", "noopener=yes, noreferrer=yes");
    }
  };

  render(): React.ReactElement {
    const { className, title, subTitle, checkedChildren, unCheckedChildren, showText } = this.props.data;
    const { checked, disabled, error } = this.state;

    let wrapperClassName = "setting-window-toggle-button-card-wrapper ";
    if (className) {
      wrapperClassName += className;
    }

    const wrapperStyle = disabled ? { display: "none" } : {};

    let switchClassName = "toggle-button-card-switch ";
    if (checked) {
      switchClassName += "toggle-button-card-switch-checked";
    }

    return (
      <div className={wrapperClassName} style={wrapperStyle}>
        <div className="toggle-button-card-left-part">
          <div className="toggle-button-card-title">{title}</div>
          {subTitle && (
            <div className="toggle-button-card-sub-title">{subTitle}</div>
          )}
        </div>
        <div className="toggle-button-card-right-part">
          <div className={switchClassName} onClick={this.onValueChange}>
            <span className="toggle-button-card-switch-inner">
              {showText && (
                <span className="toggle-button-card-switch-inner-text">
                  {checked ? checkedChildren : unCheckedChildren}
                </span>
              )}
            </span>
          </div>
          {error && (
            <div className="toggle-button-card-errmsg">
              <span className="toggle-button-card-errmsg-label">
                {ResourceManager.getString("appSettings_notification_email_error_msg")}
              </span>
              <span className="toggle-button-card-errmsg-bind" onClick={this.openNewWindow}>
                {ResourceManager.getString("appSettings_notification_email_bind")}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}