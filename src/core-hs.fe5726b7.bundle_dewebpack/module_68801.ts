const SetPrototype = Set.prototype;

export const SetUtils = {
  Set,
  add: Function.prototype.call.bind(SetPrototype.add) as <T>(set: Set<T>, value: T) => Set<T>,
  has: Function.prototype.call.bind(SetPrototype.has) as <T>(set: Set<T>, value: T) => boolean,
  remove: Function.prototype.call.bind(SetPrototype.delete) as <T>(set: Set<T>, value: T) => boolean,
  proto: SetPrototype,
  $has: SetPrototype.has,
  $keys: SetPrototype.keys
};

export const { add, has, remove, proto, $has, $keys } = SetUtils;
export { Set };
export default SetUtils;