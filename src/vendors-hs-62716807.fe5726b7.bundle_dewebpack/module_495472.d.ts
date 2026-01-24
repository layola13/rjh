/**
 * Input component module with various input types and compositions.
 * Provides a unified Input component with specialized sub-components.
 * @module Input
 */

/**
 * Base input component interface
 */
interface InputComponent {
  /**
   * Input group component for combining inputs with addons
   */
  Group: typeof InputGroup;
  
  /**
   * Search input component with search-specific styling and behavior
   */
  Search: typeof SearchInput;
  
  /**
   * Multi-line textarea component
   */
  TextArea: typeof TextArea;
  
  /**
   * Password input component with visibility toggle
   */
  Password: typeof PasswordInput;
}

/**
 * Input group component for wrapping inputs with prefix/suffix addons
 */
declare class InputGroup {
  // Implementation from module 10115
}

/**
 * Search input component with search icon and clear functionality
 */
declare class SearchInput {
  // Implementation from module 702490
}

/**
 * Multi-line text area component with auto-resize support
 */
declare class TextArea {
  // Implementation from module 988528
}

/**
 * Password input component with show/hide password toggle
 */
declare class PasswordInput {
  // Implementation from module 278623
}

/**
 * Main Input component with sub-component attachments
 * @example
 *