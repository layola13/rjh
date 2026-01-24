/**
 * CSS Module Definition
 * Module: module_976908
 * Original ID: 976908
 * 
 * This module exports CSS styles for statusbar container components,
 * including checkbox, text, and button elements for PNG-related operations.
 */

/**
 * Type definition for the webpack css-loader module function
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns A CSS loader instance with a push method for adding CSS rules
 */
type CSSLoaderModule = (useSourceMap: boolean) => {
    push: (rule: [string | number, string]) => void;
};

/**
 * Module exports interface
 * Represents the structure of a webpack module with CSS content
 */
interface CSSModuleExports {
    /** Unique identifier for this module */
    id: string | number;
    /** The exported CSS loader instance */
    exports: ReturnType<CSSLoaderModule>;
}

/**
 * Webpack module parameters
 * @param exports - The module exports object
 * @param module - The current module metadata
 * @param require - The webpack require function for loading dependencies
 */
declare function module_976908(
    exports: CSSModuleExports,
    module: CSSModuleExports,
    require: (moduleId: number) => CSSLoaderModule
): void;

export default module_976908;

/**
 * CSS Class Names exported by this module
 */
export interface StatusbarContainerStyles {
    /** Container for statusbar elements */
    statusbarContainer: string;
    /** Checkbox component for showing PNG files */
    checkboxShowPng: string;
    /** Text color class for normal state display */
    txtColorShowNormal: string;
    /** Text element for delete PNG action */
    txtDeletePng: string;
    /** Button component for delete PNG action */
    buttonDeletePng: string;
    /** Image button wrapper class */
    imagebtn: string;
    /** Image button element class */
    imagebutton: string;
}

/**
 * CSS Content
 * Contains styles for:
 * - .statusbarContainer .checkboxShowPng - Checkbox with 2px top padding
 * - .statusbarContainer .checkboxShowPng .txtColorShowNormal - Black text color
 * - .statusbarContainer .txtDeletePng - Delete text with 1px top padding
 * - .statusbarContainer .txtDeletePng span - Span with specific spacing and positioning
 * - .statusbarContainer .buttonDeletePng .imagebtn - Image button positioning
 * - .statusbarContainer .buttonDeletePng .imagebtn .imagebutton - Button element styling
 * - .statusbarContainer .buttonDeletePng .imagebtn .imagebutton svg - SVG icon dimensions (13px × 15px)
 */