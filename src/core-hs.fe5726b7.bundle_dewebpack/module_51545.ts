export default !(() => {
  try {
    return Object.isExtensible(Object.preventExtensions({}));
  } catch {
    return true;
  }
})();