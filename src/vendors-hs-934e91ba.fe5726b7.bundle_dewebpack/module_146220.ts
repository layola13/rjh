import * as ReactIs from 'react-is';

interface PropertyMap {
  [key: string]: boolean;
}

const REACT_STATICS: PropertyMap = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};

const KNOWN_STATICS: PropertyMap = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

const FORWARD_REF_STATICS: PropertyMap = {
  $$typeof: true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};

const MEMO_STATICS: PropertyMap = {
  $$typeof: true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};

const TYPE_STATICS_MAP: Record<symbol, PropertyMap> = {
  [ReactIs.ForwardRef]: FORWARD_REF_STATICS,
  [ReactIs.Memo]: MEMO_STATICS
};

function getStatics(component: any): PropertyMap {
  if (ReactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS_MAP[component.$$typeof] || REACT_STATICS;
}

function hoistNonReactStatics<T extends object, S extends object>(
  targetComponent: T,
  sourceComponent: S,
  excludelist?: PropertyMap
): T {
  if (typeof sourceComponent !== 'string') {
    const objectPrototype = Object.prototype;

    if (objectPrototype) {
      const inheritedComponent = Object.getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, excludelist);
      }
    }

    let propertyNames = Object.getOwnPropertyNames(sourceComponent);
    
    if (Object.getOwnPropertySymbols) {
      propertyNames = propertyNames.concat(Object.getOwnPropertySymbols(sourceComponent) as any);
    }

    const targetStatics = getStatics(targetComponent);
    const sourceStatics = getStatics(sourceComponent);

    for (let index = 0; index < propertyNames.length; ++index) {
      const propertyKey = propertyNames[index];

      if (
        !KNOWN_STATICS[propertyKey] &&
        !(excludelist && excludelist[propertyKey]) &&
        !(sourceStatics && sourceStatics[propertyKey]) &&
        !(targetStatics && targetStatics[propertyKey])
      ) {
        const descriptor = Object.getOwnPropertyDescriptor(sourceComponent, propertyKey);
        try {
          Object.defineProperty(targetComponent, propertyKey, descriptor!);
        } catch (error) {
          // Ignore property copy errors
        }
      }
    }
  }

  return targetComponent;
}

export default hoistNonReactStatics;