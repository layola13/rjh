function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function camelCase(str: string): string {
  const words = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
  
  return words.reduce((result: string, word: string, index: number): string => {
    const lowerWord = word.toLowerCase();
    return result + (index > 0 ? capitalize(lowerWord) : lowerWord);
  }, '');
}

export default camelCase;