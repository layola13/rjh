function cloneRegExp(regexp: RegExp): RegExp {
  const flagsPattern = /\w*$/;
  const flags = flagsPattern.exec(regexp);
  const cloned = new regexp.constructor(regexp.source, flags as string);
  cloned.lastIndex = regexp.lastIndex;
  return cloned;
}

export default cloneRegExp;