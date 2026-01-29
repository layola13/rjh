import baseRest from './baseRest';
import eq from './eq';
import isIterateeCall from './isIterateeCall';
import keysIn from './keysIn';

const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * @param target - The destination object.
 * @param sources - The source objects.
 * @returns Returns the destination object.
 */
const defaults = baseRest((args: unknown[]): object => {
  let target: Record<string, unknown> = Object(args[0]);
  const sources = args.slice(1);
  
  let index = -1;
  let length = sources.length;
  const guard = length > 2 ? sources[2] : undefined;
  
  if (guard && isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }
  
  while (++index < length) {
    const source = sources[index];
    const props = keysIn(source);
    let propsIndex = -1;
    const propsLength = props.length;
    
    while (++propsIndex < propsLength) {
      const key = props[propsIndex];
      const value = target[key];
      
      if (value === undefined || (eq(value, objectProto[key]) && !hasOwnProperty.call(target, key))) {
        target[key] = (source as Record<string, unknown>)[key];
      }
    }
  }
  
  return target;
});

export default defaults;