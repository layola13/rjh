import { f as defineProperty } from './66484';
import hasOwnProperty from './98324';
import wellKnownSymbol from './46976';

const toStringTag = wellKnownSymbol('toStringTag');

export default function setToStringTag(
  target: any,
  tag: string,
  isStatic?: boolean
): void {
  let obj = target;
  
  if (obj && !isStatic) {
    obj = obj.prototype;
  }
  
  if (obj && !hasOwnProperty(obj, toStringTag)) {
    defineProperty(obj, toStringTag, {
      configurable: true,
      value: tag
    });
  }
}