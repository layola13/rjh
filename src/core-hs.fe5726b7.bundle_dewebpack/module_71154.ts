import definePropertyModule from './module_63855';
import objectDefineProperty from './module_66484';
import createPropertyDescriptor from './module_34769';

export default definePropertyModule
  ? function setProperty<T extends object, K extends PropertyKey, V>(
      target: T,
      propertyKey: K,
      value: V
    ): T & Record<K, V> {
      objectDefineProperty.f(target, propertyKey, createPropertyDescriptor(1, value));
      return target as T & Record<K, V>;
    }
  : function setProperty<T extends object, K extends PropertyKey, V>(
      target: T,
      propertyKey: K,
      value: V
    ): T & Record<K, V> {
      (target as any)[propertyKey] = value;
      return target as T & Record<K, V>;
    };