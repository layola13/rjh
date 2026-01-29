interface ButtonProps {
  className?: string;
  label: string;
  disabled?: boolean;
  visible?: boolean;
  showRedDot?: boolean;
}

export class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }

  render(): React.ReactElement {
    const { className, label, disabled, visible = true, showRedDot } = this.props;

    return (
      <div
        hidden={!visible}
        className={`${className ?? ''} ${disabled ? 'userinfo-button-disabled' : ''}`}
      >
        <a>
          <span>{ResourceManager.getString(label)}</span>
        </a>
        {showRedDot && (
          <div className="user-info-new-red-icon">
            <span className="new-red-icon-text">NEW</span>
          </div>
        )}
      </div>
    );
  }
}