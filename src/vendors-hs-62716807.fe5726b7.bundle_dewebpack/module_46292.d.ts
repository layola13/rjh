/**
 * Props interface for a component that passes through its children unchanged.
 * This is typically used for wrapper components that don't modify child elements.
 */
export interface PassThroughComponentProps {
  /** The child elements to be rendered */
  children: React.ReactNode;
}

/**
 * A pass-through component that returns its children without modification.
 * 
 * This is a common pattern for wrapper components that need to apply context,
 * styling, or other side effects without altering the child component tree.
 * 
 * @param props - The component props containing children
 * @returns The unmodified children elements
 * 
 * @example
 *