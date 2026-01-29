export function advanceStringIndex(str: string, index: number, unicode: boolean): number {
  const charAt = (s: string, pos: number): string => {
    const size = s.length;
    if (pos < 0 || pos >= size) return '';
    const first = s.charCodeAt(pos);
    if (first < 0xd800 || first > 0xdbff || pos + 1 === size) {
      return s.charAt(pos);
    }
    const second = s.charCodeAt(pos + 1);
    if (second < 0xdc00 || second > 0xdfff) {
      return s.charAt(pos);
    }
    return s.slice(pos, pos + 2);
  };

  return index + (unicode ? charAt(str, index).length : 1);
}