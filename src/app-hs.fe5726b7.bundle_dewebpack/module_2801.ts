const memoize = require('./module_3337');

const PROPERTY_PATH_REGEX = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const ESCAPE_CHAR_REGEX = /\\(\\)?/g;
const DOT_CHAR_CODE = 46;

/**
 * Converts a string path to an array of path segments.
 * Handles dot notation, bracket notation, and escaped characters.
 * 
 * @param path - The property path string to parse
 * @returns An array of property names/indices representing the path
 */
function stringToPath(path: string): string[] {
    const result: string[] = [];
    
    if (path.charCodeAt(0) === DOT_CHAR_CODE) {
        result.push('');
    }
    
    path.replace(PROPERTY_PATH_REGEX, (
        match: string,
        numberIndex: string | undefined,
        quote: string | undefined,
        quotedValue: string | undefined
    ): string => {
        if (quote && quotedValue !== undefined) {
            result.push(quotedValue.replace(ESCAPE_CHAR_REGEX, '$1'));
        } else {
            result.push(numberIndex ?? match);
        }
        return match;
    });
    
    return result;
}

const memoizedStringToPath = memoize(stringToPath);

export = memoizedStringToPath;