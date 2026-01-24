/**
 * Module: module_future
 * Original ID: future
 * 
 * Adds the appropriate indefinite article ("a" or "an") before a given string.
 * The determination is based on checking if the first word requires "a" or "an".
 */

/**
 * Checks if a word should be preceded by the article "a" (as opposed to "an").
 * Typically returns true for words starting with consonant sounds.
 * 
 * @param word - The word to check
 * @returns True if the word should use "a", false if it should use "an"
 */
declare function shouldUseArticleA(word: string): boolean;

/**
 * Prepends the appropriate indefinite article ("a" or "an") to a given phrase.
 * The article is determined based on the first word of the phrase.
 * 
 * @param phrase - The input phrase to prepend an article to
 * @returns The phrase with "a " or "an " prepended
 * 
 * @example
 * addIndefiniteArticle("apple pie") // returns "an apple pie"
 * addIndefiniteArticle("beautiful day") // returns "a beautiful day"
 */
declare function addIndefiniteArticle(phrase: string): string;

export { shouldUseArticleA, addIndefiniteArticle };