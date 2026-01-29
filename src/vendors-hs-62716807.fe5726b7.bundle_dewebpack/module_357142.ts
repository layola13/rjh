import getClassOf from './getClassOf';
import isCallable from './isCallable';
import objectToString from './objectToString';
import wellKnownSymbol from './wellKnownSymbol';

const TO_STRING_TAG = wellKnownSymbol('toStringTag');
const ObjectConstructor = Object;

const isArgumentsObject = 'Arguments' === objectToString(function() {
  return arguments;
}());

function tryGetProperty(object: unknown, property: symbol): unknown {
  try {
    return (object as any)[property];
  } catch {
    return undefined;
  }
}

export default function classof(value: unknown): string {
  if (value === undefined) {
    return 'Undefined';
  }
  
  if (value === null) {
    return 'Null';
  }

  const objectValue = ObjectConstructor(value);
  const tagValue = tryGetProperty(objectValue, TO_STRING_TAG);

  if (typeof tagValue === 'string') {
    return tagValue;
  }

  if (isArgumentsObject) {
    return objectToString(objectValue);
  }

  const classOfResult = objectToString(objectValue);

  if (classOfResult === 'Object' && isCallable((objectValue as any).callee)) {
    return 'Arguments';
  }

  return classOfResult;
}