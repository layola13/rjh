/**
 * React component property hoisting utility module.
 * Copies static properties from one React component to another while preserving
 * React-specific properties and avoiding conflicts.
 */

import * as ReactIs from 'react-is';

/**
 * Known React component static properties that should be preserved during hoisting.
 * These properties are inherent to React components and should not be overwritten.
 */
interface ReactComponentStaticProperties {
  /** Context types for legacy context API */
  childContextTypes: true;
  /** Type for new context API */
  contextType: true;
  /** Legacy context types */
  contextTypes: true;
  /** Default prop values */
  defaultProps: true;
  /** Component display name for debugging */
  displayName: true;
  /** Legacy method to get default props */
  getDefaultProps: true;
  /** Static method for error boundaries */
  getDerivedStateFromError: true;
  /** Static lifecycle method */
  getDerivedStateFromProps: true;
  /** Legacy mixins support */
  mixins: true;
  /** Runtime prop type validation */
  propTypes: true;
  /** Component type identifier */
  type: true;
}

/**
 * Known non-React function properties that should never be copied.
 * These are standard JavaScript function properties.
 */
interface NonHoistableStatics {
  /** Function name */
  name: true;
  /** Function parameter count */
  length: true;
  /** Function prototype */
  prototype: true;
  /** Function caller reference */
  caller: true;
  /** Arguments callee reference */
  callee: true;
  /** Function arguments */
  arguments: true;
  /** Function arity */
  arity: true;
}

/**
 * Static properties specific to React.memo components.
 */
interface MemoStaticProperties {
  /** React internal type marker */
  $$typeof: true;
  /** Comparison function for memo optimization */
  compare: true;
  /** Default prop values */
  defaultProps: true;
  /** Component display name */
  displayName: true;
  /** Prop type validation */
  propTypes: true;
  /** Wrapped component type */
  type: true;
}

/**
 * Static properties specific to React.forwardRef components.
 */
interface ForwardRefStaticProperties {
  /** React internal type marker */
  $$typeof: true;
  /** Render function */
  render: true;
  /** Default prop values */
  defaultProps: true;
  /** Component display name */
  displayName: true;
  /** Prop type validation */
  propTypes: true;
}

/**
 * Map of React element types to their respective static property definitions.
 */
type ReactTypeStaticPropertiesMap = {
  [key: symbol]: ReactComponentStaticProperties | MemoStaticProperties | ForwardRefStaticProperties;
};

/**
 * Gets the appropriate static property definition for a given React component.
 * 
 * @param component - The React component to inspect
 * @returns Object containing properties that should be preserved for this component type
 */
declare function getKnownStaticProperties(
  component: React.ComponentType<any>
): Partial<Record<string, true>>;

/**
 * Hoists non-React static properties from source component to target component.
 * Preserves React-specific statics and avoids copying function built-ins.
 * 
 * @param targetComponent - The component to copy properties to
 * @param sourceComponent - The component to copy properties from
 * @param excludeList - Optional object specifying additional properties to exclude from copying
 * @returns The target component with hoisted static properties
 * 
 * @example
 *