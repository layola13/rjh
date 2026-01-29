interface PropertyDescriptor {
  get?: () => any;
  set?: (value: any) => void;
  value?: any;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
}

interface DefinePropertyOptions {
  getter?: boolean;
  setter?: boolean;
}

interface PropertyDefiner {
  f(target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void;
}

type SetFunctionName = (func: Function, name: string | symbol, options: DefinePropertyOptions) => void;

declare const setFunctionName: SetFunctionName;
declare const propertyDefiner: PropertyDefiner;

/**
 * Defines a property on an object with custom getter/setter and automatically names them.
 * 
 * @param target - The target object to define the property on
 * @param propertyKey - The name of the property to define
 * @param descriptor - Property descriptor containing optional getter/setter
 */
function definePropertyWithNamedAccessors(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  if (descriptor.get) {
    setFunctionName(descriptor.get, propertyKey, { getter: true });
  }

  if (descriptor.set) {
    setFunctionName(descriptor.set, propertyKey, { setter: true });
  }

  propertyDefiner.f(target, propertyKey, descriptor);
}

export default definePropertyWithNamedAccessors;