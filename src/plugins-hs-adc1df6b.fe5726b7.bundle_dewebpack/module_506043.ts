import { ComponentType } from './ComponentType';
import { BaseComponent } from './BaseComponent';

interface SearchboxData {
  label?: string;
  isPressed?: boolean;
  [key: string]: unknown;
}

interface SearchboxProps extends SearchboxData {
  name: string;
}

export default class Searchbox extends BaseComponent {
  constructor(props: SearchboxProps, context?: unknown) {
    const { name, ...data } = props;
    super(name, context);
    this.setData(data);
  }

  get type(): ComponentType {
    return ComponentType.searchbox;
  }

  setPressed(isPressed: boolean): void {
    this.setData({ isPressed });
  }

  setLabel(label: string): void {
    this.setData({ label });
  }
}