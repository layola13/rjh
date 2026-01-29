const PROPERTY_PATH_REGEX = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const ESCAPE_CHAR_REGEX = /\\(\\)?/g;
const DOT_CHAR_CODE = 46;

/**
 * Converts a property path string into an array of property keys.
 * Handles dot notation, bracket notation, and escaped characters.
 * 
 * @param path - The property path string to parse (e.g., "a.b[0].c['d']")
 * @returns An array of property keys extracted from the path
 */
function stringToPath(path: string): string[] {
    const result: string[] = [];
    
    if (path.charCodeAt(0) === DOT_CHAR_CODE) {
        result.push("");
    }
    
    path.replace(PROPERTY_PATH_REGEX, (
        match: string,
        numberValue: string | undefined,
        quoteChar: string | undefined,
        stringValue: string | undefined
    ): string => {
        if (quoteChar) {
            result.push(stringValue!.replace(ESCAPE_CHAR_REGEX, "$1"));
        } else {
            result.push(numberValue || match);
        }
        return match;
    });
    
    return result;
}

export default stringToPath;