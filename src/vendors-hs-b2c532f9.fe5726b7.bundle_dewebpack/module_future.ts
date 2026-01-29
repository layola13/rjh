function addArticle(text: string): string {
  const firstWord = text.substring(0, text.indexOf(" "));
  return startsWithVowelSound(firstWord) ? `a ${text}` : `an ${text}`;
}

function startsWithVowelSound(word: string): boolean {
  // Implementation depends on the original 'n' function
  // Placeholder - replace with actual vowel detection logic
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return vowels.includes(word.charAt(0).toLowerCase());
}