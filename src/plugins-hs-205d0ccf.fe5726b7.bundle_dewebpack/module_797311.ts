import { BaseElement } from './BaseElement';
import { ElementType } from './ElementType';

interface DividerElementData {
  [key: string]: unknown;
}

interface DividerElementConfig extends DividerElementData {
  name: string;
}

/**
 * Divider element class representing a visual separator in the UI
 */
export default class DividerElement extends BaseElement {
  constructor(config: DividerElementConfig, context: unknown) {
    const { name, ...restData } = config;
    super(name, context);
    this.setData(restData);
  }

  get type(): ElementType {
    return ElementType.divider;
  }
}