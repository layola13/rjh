const charAt = String.prototype.charAt;

function stringAt(this: string, index: number): string | undefined {
  const str: string = String(this);
  const length: number = str.length;
  const relativeIndex: number = Math.trunc(index);
  const actualIndex: number = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
  
  return actualIndex < 0 || actualIndex >= length 
    ? undefined 
    : charAt.call(str, actualIndex);
}

if (!String.prototype.at) {
  String.prototype.at = stringAt;
}

export { stringAt };