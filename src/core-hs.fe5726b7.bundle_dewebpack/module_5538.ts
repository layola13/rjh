function validateNotRegExp(value: unknown): unknown {
  if (isRegExp(value)) {
    throw new TypeError("The method doesn't accept regular expressions");
  }
  return value;
}

function isRegExp(value: unknown): boolean {
  // Implementation depends on module 57983
  // Placeholder: typical RegExp check
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

export default validateNotRegExp;