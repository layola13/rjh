import BaseComponent from './BaseComponent';
import ComponentType from './ComponentType';

interface CheckboxData {
  label: string;
  tooltip: string;
  isChecked: boolean;
  onchange: (checked: boolean) => void;
  onclick?: () => void;
}

interface CheckboxProps {
  name: string;
  isChecked?: boolean;
  label?: string;
  tooltip?: string;
  onchange?: (checked: boolean) => void;
  onclick?: () => void;
  [key: string]: unknown;
}

export default class Checkbox extends BaseComponent {
  declare data: CheckboxData;

  constructor(props: CheckboxProps, context: unknown) {
    const { name, ...restProps } = props;
    
    super(name, context);

    Object.assign(this.data, {
      label: '',
      tooltip: '',
      isChecked: props.isChecked ?? false,
      onchange: HSCore.Util.Object.nullFunction
    });

    this.setData(restProps);
  }

  get type(): string {
    return ComponentType.checkbox;
  }

  setChecked(checked: boolean): void {
    this.setData({
      isChecked: checked
    });
  }

  click(): void {
    if (this.data.onclick) {
      this.data.onclick();
    }
    
    this.setChecked(!this.data.isChecked);
    super.click();
  }

  setData(data: Partial<CheckboxData>): void {
    if (!data) {
      return;
    }

    const previousChecked = this.data.isChecked;
    
    super.setData(data);

    const parent = this.parent;
    if (parent && typeof parent.setChecked === 'function') {
      parent.setChecked(this.data.isChecked);
    }

    if (previousChecked !== this.data.isChecked) {
      this.data.onchange(this.data.isChecked);
    }
  }

  setDataOnly(data: Partial<CheckboxData>): void {
    if (data) {
      Object.assign(this.data, data);
    }
  }
}