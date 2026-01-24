/**
 * Component factory module for creating and retrieving property bar components by type.
 * Provides utilities to instantiate React components based on PropertyBarType enum values.
 */

import type React from 'react';

/**
 * Base interface for component item configuration
 */
interface ComponentItem {
  /** Unique identifier for the component instance */
  id: string;
  /** Component type from HSFPConstants.PropertyBarType enum */
  type: string;
  /** Component-specific configuration data */
  data?: unknown;
  /** Optional custom render function */
  getRenderItem?(): React.ReactElement;
}

/**
 * Props interface for second-level node components
 */
interface SecondLevelNodeProps {
  item: ComponentItem;
  key: string;
}

/**
 * Props interface for third-level node components
 */
interface ThirdLevelNodeProps {
  item: ComponentItem;
}

/**
 * Standard props interface for most property bar components
 */
interface StandardComponentProps {
  id: string;
  data: unknown;
}

/**
 * Creates a React component instance based on the provided item's type.
 * 
 * @param item - Configuration object containing component type and data
 * @returns React element for the specified component type, or empty string if item is null/undefined
 * 
 * @example
 *