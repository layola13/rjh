import BaseComponent from './BaseComponent';

enum ComponentType {
  button = 'button'
}

interface ButtonData {
  label: string;
  icon: string;
  width: number | undefined;
  onclick: () => void;
  isPressed: boolean;
}

interface ButtonOptions extends Partial<ButtonData> {
  name: string;
}

class Button extends BaseComponent {
  public data!: ButtonData;

  constructor(options: ButtonOptions, context?: unknown) {
    const { name, ...rest } = options;
    super(name, context);

    Object.assign(this.data, {
      label: '',
      icon: '',
      width: undefined,
      onclick: HSCore.Util.Object.nullFunction,
      isPressed: false
    });

    this.setData(rest);
  }

  get type(): ComponentType {
    return ComponentType.button;
  }

  public setPressed(isPressed: boolean): void {
    this.setData({ isPressed });
  }

  public setLabel(label: string): void {
    this.setData({ label });
  }

  public click(): void {
    this.data.onclick();
  }
}

export default Button;