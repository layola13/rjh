/**
 * UI component type definitions
 * Defines the available component types in the system
 */

/**
 * Enumeration of supported UI component types
 */
export type ComponentType = 'folder' | 'button' | 'image' | 'checkbox' | 'radio' | 'divider';

/**
 * Component types configuration object
 * Maps component type names to their string identifiers
 */
export interface ComponentTypes {
  /** Folder/container component type */
  readonly folder: 'folder';
  
  /** Interactive button component type */
  readonly button: 'button';
  
  /** Image display component type */
  readonly image: 'image';
  
  /** Checkbox input component type */
  readonly checkbox: 'checkbox';
  
  /** Radio button input component type */
  readonly radio: 'radio';
  
  /** Visual divider/separator component type */
  readonly divider: 'divider';
}

/**
 * Frozen object containing all available component types
 * This object is immutable and can be used for type checking and validation
 */
declare const componentTypes: Readonly<ComponentTypes>;

export default componentTypes;