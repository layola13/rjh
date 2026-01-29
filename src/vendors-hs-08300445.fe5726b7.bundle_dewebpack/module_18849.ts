import isPlainObject from './isPlainObject';
import warning from './warning';

export default function assertReducerShape(
  reducers: unknown,
  reducerKey: string,
  actionType: string
): void {
  if (!isPlainObject(reducers)) {
    warning(
      `${actionType}() in ${reducerKey} must return a plain object. Instead received ${reducers}.`
    );
  }
}