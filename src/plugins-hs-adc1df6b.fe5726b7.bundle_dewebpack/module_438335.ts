import BaseComponent from './BaseComponent';
import ComponentType from './ComponentType';

interface DividerData {
  [key: string]: unknown;
}

interface DividerProps {
  name: string;
  [key: string]: unknown;
}

/**
 * Divider component class
 * Represents a visual divider element in the UI
 */
export default class Divider extends BaseComponent {
  constructor(props: DividerProps, context?: unknown) {
    const { name, ...restProps } = props;
    
    super(name, context);
    
    this.setData(restProps as DividerData);
  }

  get type(): ComponentType {
    return ComponentType.divider;
  }
}