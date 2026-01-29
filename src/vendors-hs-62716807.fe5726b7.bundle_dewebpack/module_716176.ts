import definePropertyDescriptor from './module_907253';
import objectDefineProperty from './module_656378';
import createPropertyDescriptor from './module_175931';

export default definePropertyDescriptor
  ? function<T extends object, K extends PropertyKey, V>(
      target: T,
      propertyName: K,
      value: V
    ): T & Record<K, V> {
      return objectDefineProperty.f(target, propertyName, createPropertyDescriptor(1, value));
    }
  : function<T extends object, K extends PropertyKey, V>(
      target: T,
      propertyName: K,
      value: V
    ): T & Record<K, V> {
      (target as any)[propertyName] = value;
      return target as T & Record<K, V>;
    };