/**
 * CSS module loader configuration for task view name input component
 * @module TaskViewNameInputStyles
 */

/**
 * Webpack CSS module loader function type
 * @param exports - The module exports object
 * @param require - The module require/import function
 * @param moduleId - The unique module identifier
 */
type CSSModuleLoader = (
  exports: CSSModuleExports,
  cssLoader: CSSLoaderFunction,
  moduleId: number
) => void;

/**
 * CSS module exports interface
 */
interface CSSModuleExports {
  /** The module's unique identifier */
  id: number;
  /** The exported CSS content array */
  exports: CSSContent[];
  /** Push method to add CSS content to the module */
  push: (content: CSSContent) => void;
}

/**
 * CSS loader function that processes CSS content
 * @param sourceMap - Whether to include source maps
 * @returns A function that pushes CSS content
 */
type CSSLoaderFunction = (sourceMap: boolean) => {
  push: (content: [number, string, string]) => void;
};

/**
 * CSS content tuple structure
 * [moduleId, cssString, sourceMapUrl?]
 */
type CSSContent = [number, string, string?];

/**
 * Task view name input component CSS styles
 * 
 * Includes styles for:
 * - Main container layout (.task-view-name-input)
 * - Input field with Ant Design wrapper (.name-input)
 * - Focus and hover states
 * - Error state styling
 * - Icon wrapper with primary color background
 * - Responsive sizing and border radius
 */
declare const taskViewNameInputStyles: CSSModuleLoader;

export default taskViewNameInputStyles;

/**
 * CSS class names exported by this module
 */
export interface TaskViewNameInputClassNames {
  /** Main container class for the task view name input component */
  'task-view-name-input': string;
  /** Input field class with custom styling */
  'name-input': string;
  /** Icon wrapper class for the submit/action button */
  'iconWrapper': string;
  /** Icon class for SVG/font icon styling */
  'icon': string;
  /** Error state class for invalid input */
  'error': string;
}

/**
 * Style configuration constants
 */
export const STYLE_CONSTANTS = {
  /** Primary brand color */
  PRIMARY_COLOR: '#396EFE',
  /** Error/danger color */
  ERROR_COLOR: '#EB5D46',
  /** Placeholder text color */
  PLACEHOLDER_COLOR: '#CDCFD5',
  /** Input width in pixels */
  INPUT_WIDTH: 290,
  /** Input/icon height in pixels */
  COMPONENT_HEIGHT: 24,
  /** Border radius in pixels */
  BORDER_RADIUS: 4,
  /** Primary color background opacity */
  BACKGROUND_OPACITY: 0.2,
} as const;