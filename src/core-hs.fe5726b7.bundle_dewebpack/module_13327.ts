import isCallable from './module_52530';
import defineProperty from './module_66484';
import setFunctionName from './module_98320';
import createNonEnumerableProperty from './module_58588';

interface ExportOptions {
  enumerable?: boolean;
  name?: string;
  global?: boolean;
  unsafe?: boolean;
  nonConfigurable?: boolean;
  nonWritable?: boolean;
}

export default function exportModule(
  target: any,
  key: string,
  value: any,
  options: ExportOptions = {}
): any {
  const enumerable = options.enumerable;
  const name = options.name !== undefined ? options.name : key;

  if (isCallable(value)) {
    setFunctionName(value, name, options);
  }

  if (options.global) {
    if (enumerable) {
      target[key] = value;
    } else {
      createNonEnumerableProperty(key, value);
    }
  } else {
    let shouldBeEnumerable = enumerable;

    try {
      if (options.unsafe) {
        if (target[key]) {
          shouldBeEnumerable = true;
        }
      } else {
        delete target[key];
      }
    } catch (error) {
      // Silent catch
    }

    if (shouldBeEnumerable) {
      target[key] = value;
    } else {
      defineProperty.f(target, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    }
  }

  return target;
}