import defineBuiltIn from './module_98320';
import objectDefineProperty from './module_66484';

interface PropertyDescriptor {
  get?: () => any;
  set?: (value: any) => void;
  value?: any;
  writable?: boolean;
  enumerable?: boolean;
  configurable?: boolean;
}

interface DefineBuiltInOptions {
  getter?: boolean;
  setter?: boolean;
}

/**
 * Defines a property on an object with optional getter/setter built-ins
 * @param target - The target object to define the property on
 * @param propertyKey - The property key to define
 * @param descriptor - The property descriptor with optional get/set methods
 * @returns The result of defining the property
 */
export default function defineProperty(
  target: object,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
): any {
  if (descriptor.get) {
    defineBuiltIn(descriptor.get, propertyKey, { getter: true });
  }

  if (descriptor.set) {
    defineBuiltIn(descriptor.set, propertyKey, { setter: true });
  }

  return objectDefineProperty.f(target, propertyKey, descriptor);
}