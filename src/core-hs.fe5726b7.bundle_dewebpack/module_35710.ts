function getRegExpFlags(this: RegExp): string {
  const regex = this;
  let flags = "";
  
  if (regex.hasIndices) {
    flags += "d";
  }
  if (regex.global) {
    flags += "g";
  }
  if (regex.ignoreCase) {
    flags += "i";
  }
  if (regex.multiline) {
    flags += "m";
  }
  if (regex.dotAll) {
    flags += "s";
  }
  if (regex.unicode) {
    flags += "u";
  }
  if (regex.unicodeSets) {
    flags += "v";
  }
  if (regex.sticky) {
    flags += "y";
  }
  
  return flags;
}

export default getRegExpFlags;