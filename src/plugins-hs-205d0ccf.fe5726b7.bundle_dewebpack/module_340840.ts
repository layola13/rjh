import Component from './Component';

enum ComponentType {
  button = 'button'
}

interface ButtonData {
  label: string;
  icon: string;
  iconhover: string;
  styleName: string;
  catagory: string;
  tooltip: string;
  lineType: string;
  width: number | undefined;
  onclick: () => void;
  isPressed: boolean;
  lock?: ButtonLock | boolean;
}

interface ButtonConfig {
  name: string;
  label?: string;
  icon?: string;
  iconhover?: string;
  styleName?: string;
  catagory?: string;
  tooltip?: string;
  lineType?: string;
  width?: number;
  onclick?: () => void;
  isPressed?: boolean;
  lock?: ButtonLock | boolean;
}

class ButtonLock {
  private readonly timeout: number;

  constructor(timeout?: number) {
    this.timeout = timeout ?? 5000;
  }

  public lock(button: Button | null): void {
    if (button?.disable) {
      button.disable();
      setTimeout(() => this.unlock(button), this.timeout);
    }
  }

  public unlock(button: Button | null): void {
    if (button?.enable) {
      button.enable();
    }
  }
}

class Button extends Component {
  protected data: ButtonData;

  constructor(config: ButtonConfig, context: unknown) {
    const { name, ...restConfig } = config;
    super(name, context);

    this.data = {
      label: '',
      icon: '',
      iconhover: '',
      styleName: '',
      catagory: '',
      tooltip: '',
      lineType: '',
      width: undefined,
      onclick: () => {},
      isPressed: false
    };

    this.setData(restConfig);
  }

  get type(): string {
    return ComponentType.button;
  }

  public setPressed(pressed: boolean): void {
    this.setData({ isPressed: pressed });
  }

  public setLabel(label: string): void {
    this.setData({ label });
  }

  public click(): void {
    if (!this.isEnabled()) {
      return;
    }

    if (this.data.lock) {
      if (this.data.lock === true) {
        this.data.lock = new ButtonLock();
      }
      this.data.lock.lock(this);
    }

    this.data.onclick();
    super.click?.();
  }
}

export default Button;