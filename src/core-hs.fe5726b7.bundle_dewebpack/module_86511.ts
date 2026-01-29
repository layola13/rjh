type ReplacementGroups = string[];
type NamedGroups = Record<string, string>;

const charAt = (str: string, index: number): string => str.charAt(index);
const replace = (str: string, pattern: RegExp, replacer: (match: string, ...args: unknown[]) => string): string => str.replace(pattern, replacer);
const slice = (str: string, start: number, end?: number): string => str.slice(start, end);

const NAMED_GROUPS_REGEX = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
const NUMBERED_GROUPS_REGEX = /\$([$&'`]|\d{1,2})/g;

export function getSubstitution(
  matchedSubstring: string,
  originalString: string,
  position: number,
  captures: ReplacementGroups,
  namedCaptures: NamedGroups | undefined,
  replacement: string
): string {
  const tailPosition = position + matchedSubstring.length;
  const capturesLength = captures.length;
  const pattern = namedCaptures !== undefined 
    ? NAMED_GROUPS_REGEX 
    : NUMBERED_GROUPS_REGEX;

  const namedGroupsObject = namedCaptures !== undefined 
    ? Object(namedCaptures) 
    : undefined;

  return replace(replacement, pattern, (match: string, specifier: string): string => {
    let capturedValue: string | undefined;

    const firstChar = charAt(specifier, 0);
    
    switch (firstChar) {
      case "$":
        return "$";
      
      case "&":
        return matchedSubstring;
      
      case "`":
        return slice(originalString, 0, position);
      
      case "'":
        return slice(originalString, tailPosition);
      
      case "<":
        const groupName = slice(specifier, 1, -1);
        capturedValue = namedGroupsObject?.[groupName];
        break;
      
      default:
        const captureNumber = Number(specifier);
        
        if (captureNumber === 0) {
          return match;
        }
        
        if (captureNumber > capturesLength) {
          const tensDigit = Math.floor(captureNumber / 10);
          
          if (tensDigit === 0) {
            return match;
          }
          
          if (tensDigit <= capturesLength) {
            const tensCapture = captures[tensDigit - 1];
            return tensCapture === undefined 
              ? charAt(specifier, 1) 
              : tensCapture + charAt(specifier, 1);
          }
          
          return match;
        }
        
        capturedValue = captures[captureNumber - 1];
    }

    return capturedValue === undefined ? "" : capturedValue;
  });
}