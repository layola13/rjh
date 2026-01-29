import { ButtonType } from './ButtonType';
import { BaseButton } from './BaseButton';

interface ButtonData {
  label: string;
  icon: string;
  tooltip: string;
  onclick: () => void;
  isPressed: boolean;
}

interface ButtonConfig extends Partial<ButtonData> {
  name: string;
}

export default class ImageButton extends BaseButton {
  protected data: ButtonData;

  constructor(config: ButtonConfig, context: unknown) {
    const { name, ...restConfig } = config;
    
    super(name, context);

    this.data = {
      label: '',
      icon: '',
      tooltip: '',
      onclick: HSCore.Util.Object.nullFunction,
      isPressed: false
    };

    this.setData(restConfig);
  }

  get type(): ButtonType {
    return ButtonType.image;
  }

  setPressed(pressed: boolean): void {
    this.setData({ isPressed: pressed });
  }

  click(): void {
    this.data.onclick();
    super.click();
  }
}