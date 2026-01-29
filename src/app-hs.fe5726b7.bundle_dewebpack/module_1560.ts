function cloneRegExp(regexp: RegExp): RegExp {
  const flags = /\w*$/.exec(regexp);
  const cloned = new regexp.constructor(regexp.source, flags);
  cloned.lastIndex = regexp.lastIndex;
  return cloned;
}

export default cloneRegExp;