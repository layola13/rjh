export const DEFAULT_PREFIX = getPrefix();

const BROWSER_PREFIXES = ["Moz", "Webkit", "O", "ms"] as const;

type BrowserPrefix = typeof BROWSER_PREFIXES[number] | "";

/**
 * Converts a CSS property name to camelCase with browser prefix
 * @param propertyName - CSS property name (e.g., 'transform')
 * @param prefix - Browser prefix (e.g., 'Webkit')
 * @returns Prefixed property name in camelCase (e.g., 'WebkitTransform')
 */
export function browserPrefixToKey(propertyName: string, prefix?: string): string {
    if (!prefix) return propertyName;
    
    return `${prefix}${toCamelCase(propertyName)}`;
}

/**
 * Converts a CSS property name to kebab-case with browser prefix
 * @param propertyName - CSS property name (e.g., 'transform')
 * @param prefix - Browser prefix (e.g., 'Webkit')
 * @returns Prefixed property name in kebab-case (e.g., '-webkit-transform')
 */
export function browserPrefixToStyle(propertyName: string, prefix?: string): string {
    return prefix ? `-${prefix.toLowerCase()}-${propertyName}` : propertyName;
}

/**
 * Detects the browser-specific prefix needed for a CSS property
 * @param propertyName - CSS property name to check (defaults to 'transform')
 * @returns Browser prefix string or empty string if no prefix needed
 */
export function getPrefix(propertyName: string = "transform"): BrowserPrefix {
    if (typeof window === "undefined") return "";
    
    const documentStyle = window.document?.documentElement?.style;
    if (!documentStyle) return "";
    
    if (propertyName in documentStyle) return "";
    
    for (const prefix of BROWSER_PREFIXES) {
        if (browserPrefixToKey(propertyName, prefix) in documentStyle) {
            return prefix;
        }
    }
    
    return "";
}

/**
 * Converts kebab-case or regular string to camelCase
 * @param str - Input string
 * @returns camelCase string
 */
function toCamelCase(str: string): string {
    let result = "";
    let capitalizeNext = true;
    
    for (let i = 0; i < str.length; i++) {
        if (capitalizeNext) {
            result += str[i].toUpperCase();
            capitalizeNext = false;
        } else if (str[i] === "-") {
            capitalizeNext = true;
        } else {
            result += str[i];
        }
    }
    
    return result;
}

export default DEFAULT_PREFIX;