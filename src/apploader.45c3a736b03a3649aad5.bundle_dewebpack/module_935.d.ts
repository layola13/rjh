/**
 * Sets CSS text content on a DOM element.
 * 
 * @remarks
 * This utility handles cross-browser CSS injection:
 * - For legacy IE: uses the `styleSheet.cssText` API
 * - For modern browsers: creates a text node with the CSS content
 * 
 * @param cssText - The CSS string to be injected into the element
 * @param element - The target DOM element (typically a <style> tag)
 * 
 * @example
 *