import { ReactNode, CSSProperties } from 'react';

/**
 * Props for the ScaleAble component
 */
export interface ScaleAbleProps {
  /**
   * Child elements to be scaled
   */
  children: ReactNode;
  
  /**
   * Scale factor to apply to the component
   * @example 1.0 (no scaling), 1.5 (150% size), 0.5 (50% size)
   */
  scale: number;
}

/**
 * Internal state for managing scaled dimensions
 */
interface ScaledDimensions {
  /**
   * Right margin adjustment in pixels
   */
  right: number;
  
  /**
   * Bottom margin adjustment in pixels
   */
  bottom: number;
}

/**
 * A React component that scales its children while adjusting margins
 * to prevent layout shifts. The component measures its content dimensions
 * and applies appropriate margin compensation based on the scale factor.
 * 
 * @param props - Component props
 * @returns A scaled container element
 * 
 * @example
 *