enum PropertyBarType {
  FirstLevelNode = 'FirstLevelNode'
}

declare const HSFPConstants: {
  PropertyBarType: typeof PropertyBarType;
};

interface FloatItem {
  [key: string]: unknown;
}

interface FirstLevelNodeOptions {
  defaultSelect: unknown;
  floatItems?: FloatItem[];
}

abstract class BasePropertyBar {
  type?: string;
}

class FirstLevelNodePropertyBar extends BasePropertyBar {
  defaultSelect: unknown;
  floatItems: FloatItem[];
  type: string;

  constructor(options: FirstLevelNodeOptions) {
    super(options);
    this.type = HSFPConstants.PropertyBarType.FirstLevelNode;
    this.defaultSelect = options.defaultSelect;
    this.floatItems = options.floatItems ?? [];
  }

  setFloatItems(items: FloatItem[]): void {
    this.floatItems = items;
  }
}

export default FirstLevelNodePropertyBar;