interface CharacterClass {
  parts: Array<string | [string, string]>;
  inverted: boolean;
}

function formatCharacterClass(characterClass: CharacterClass): string {
  let result = "";
  
  for (let index = 0; index < characterClass.parts.length; index++) {
    const part = characterClass.parts[index];
    
    if (part instanceof Array) {
      result += escapeCharacter(part[0]) + "-" + escapeCharacter(part[1]);
    } else {
      result += escapeCharacter(part);
    }
  }
  
  return "[" + (characterClass.inverted ? "^" : "") + result + "]";
}

function escapeCharacter(char: string): string {
  // Implementation needed based on context
  return char;
}