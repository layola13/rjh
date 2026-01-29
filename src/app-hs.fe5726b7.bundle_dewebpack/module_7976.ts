import baseGetTag from './baseGetTag';

const defineProperty = (() => {
  try {
    const func = baseGetTag(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (error) {
    return undefined;
  }
})();

export default defineProperty;