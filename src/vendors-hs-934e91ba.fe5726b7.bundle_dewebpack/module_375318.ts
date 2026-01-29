type CaseTransformer = (str: string) => string;

function createCaseTransformer(caseMethod: 'toUpperCase' | 'toLowerCase'): CaseTransformer {
  return (input: string): string => {
    const sanitizedInput = toString(input);
    const characters = hasUnicodeCharacters(sanitizedInput) 
      ? stringToArray(sanitizedInput) 
      : undefined;
    
    const firstChar = characters ? characters[0] : sanitizedInput.charAt(0);
    const remainingChars = characters 
      ? baseSlice(characters, 1).join('') 
      : sanitizedInput.slice(1);
    
    return firstChar[caseMethod]() + remainingChars;
  };
}

function baseSlice<T>(array: T[], start: number): T[] {
  return array.slice(start);
}

function hasUnicodeCharacters(str: string): boolean {
  // Check if string contains unicode characters
  return /[^\x00-\x7F]/.test(str);
}

function stringToArray(str: string): string[] {
  return Array.from(str);
}

function toString(value: unknown): string {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(toString).join(',');
  }
  const result = String(value);
  return (result === '0' && 1 / (value as number) === -Infinity) ? '-0' : result;
}

export default createCaseTransformer;