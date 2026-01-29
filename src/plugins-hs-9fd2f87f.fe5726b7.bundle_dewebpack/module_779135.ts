enum PropertyBarControlTypeEnum {
  label = 'label',
  divider = 'divider',
  slider = 'slider',
  numberinput = 'numberinput',
  checkbox = 'checkbox',
  button = 'button',
  imageButton = 'imageButton'
}

namespace CCheckBox {
  export enum StatusEnum {
    checked = 'checked',
    unchecked = 'unchecked',
    indeterminate = 'indeterminate'
  }
}

interface Range {
  min: number;
  max: number;
}

interface SliderOptions {
  dimension?: {
    show: boolean;
  };
  showRangeline?: boolean;
  disabled?: boolean;
}

interface SliderConfig {
  range?: Range;
  options?: SliderOptions;
}

interface SliderData {
  range: Range;
  options: SliderOptions;
  value?: number;
  onValueChange?: (value: number) => void;
  onValueChangeEnd?: (value: number) => void;
}

interface NumberInputConfig {
  readOnly?: boolean;
  numberOnly?: boolean;
  range?: Range;
}

interface NumberInputData {
  label: string;
  value?: number;
  readOnly: boolean;
  numberOnly: boolean;
  range: Range;
  onValueChangeEnd?: (value: number) => void;
}

interface CheckBoxConfig {
  status?: CCheckBox.StatusEnum;
  disable?: boolean;
  popover?: unknown;
}

interface CheckBoxData {
  tooltip: string;
  text: string;
  status: CCheckBox.StatusEnum;
  disabled: boolean;
  onclick?: () => void;
  popover?: unknown;
}

interface ButtonConfig {
  disabled?: boolean;
  primary?: string;
}

interface ButtonData {
  text: string;
  disabled: boolean;
  primary: string;
  onclick?: () => void;
}

interface ImageButtonConfig {
  src: string;
  color?: number;
  disable?: boolean;
}

interface ImageButtonData {
  name: string;
  src: string;
  color: number;
  disable: boolean;
  tooltip: string;
  onclick?: () => void;
}

interface PropertyBarControl<T = unknown> {
  id?: string;
  type: PropertyBarControlTypeEnum;
  data: T;
}

interface LabelData {
  text: string;
}

interface DividerData {
  className: string;
}

declare const ResourceManager: {
  getString(key: string): string;
};

const PropertyBarControlFactory = {
  createLabel(id: string, resourceKey: string): PropertyBarControl<LabelData> {
    return {
      id,
      type: PropertyBarControlTypeEnum.label,
      data: {
        text: ResourceManager.getString(resourceKey)
      }
    };
  },

  createDivider(): PropertyBarControl<DividerData> {
    return {
      type: PropertyBarControlTypeEnum.divider,
      data: {
        className: 'plugin_customizedModeling_tool_divider'
      }
    };
  },

  createSlider(id: string, config: SliderConfig): PropertyBarControl<SliderData> {
    return {
      id,
      type: PropertyBarControlTypeEnum.slider,
      data: {
        range: config.range ?? {
          min: 6,
          max: 20
        },
        options: config.options ?? {
          dimension: {
            show: true
          },
          showRangeline: true,
          disabled: false
        },
        value: undefined,
        onValueChange: undefined,
        onValueChangeEnd: undefined
      }
    };
  },

  createNumberInput(id: string, config: NumberInputConfig): PropertyBarControl<NumberInputData> {
    return {
      id,
      type: PropertyBarControlTypeEnum.numberinput,
      data: {
        label: '',
        value: undefined,
        readOnly: config.readOnly ?? false,
        numberOnly: config.numberOnly ?? true,
        range: config.range ?? {
          min: 6,
          max: 20
        },
        onValueChangeEnd: undefined
      }
    };
  },

  createCheckBox(
    id: string,
    tooltipKey: string,
    textKey: string,
    config: CheckBoxConfig
  ): PropertyBarControl<CheckBoxData> {
    return {
      id,
      type: PropertyBarControlTypeEnum.checkbox,
      data: {
        tooltip: ResourceManager.getString(tooltipKey),
        text: ResourceManager.getString(textKey),
        status: config.status ?? CCheckBox.StatusEnum.checked,
        disabled: config.disable ?? false,
        onclick: undefined,
        popover: config.popover
      }
    };
  },

  createButton(
    id: string,
    textKey: string,
    config: ButtonConfig
  ): PropertyBarControl<ButtonData> {
    return {
      id,
      type: PropertyBarControlTypeEnum.button,
      data: {
        text: ResourceManager.getString(textKey),
        disabled: config.disabled ?? false,
        primary: config.primary ?? 'btn-default',
        onclick: undefined
      }
    };
  },

  createImgButton(
    id: string,
    name: string,
    tooltipKey: string,
    config: ImageButtonConfig
  ): PropertyBarControl<ImageButtonData> {
    return {
      id,
      type: PropertyBarControlTypeEnum.imageButton,
      data: {
        name,
        src: config.src,
        color: config.color ?? 0xffffff,
        disable: config.disable ?? true,
        tooltip: ResourceManager.getString(tooltipKey),
        onclick: undefined
      }
    };
  },

  findInputInPropertyPlane(elementId: string): HTMLInputElement | undefined {
    const element = document.getElementById(elementId);
    if (element) {
      const input = element.getElementsByTagName('input')[0];
      if (input) {
        return input;
      }
    }
    return undefined;
  }
};

export default PropertyBarControlFactory;