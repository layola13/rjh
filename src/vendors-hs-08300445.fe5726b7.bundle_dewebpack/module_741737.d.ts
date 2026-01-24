/**
 * Tree indent unit component props interface
 */
export interface IndentProps {
  /**
   * CSS class name prefix for styling
   */
  prefixCls: string;
  
  /**
   * The depth level of the tree node (determines number of indent units)
   */
  level: number;
  
  /**
   * Array indicating whether each level is the start of a branch
   * Index corresponds to depth level
   */
  isStart: boolean[];
  
  /**
   * Array indicating whether each level is the end of a branch
   * Index corresponds to depth level
   */
  isEnd: boolean[];
}

/**
 * Tree indent component
 * Renders visual indentation for tree structure nodes based on their depth level
 * 
 * @param props - Component properties
 * @returns React element representing the indent visualization
 */
export default function TreeIndent(props: IndentProps): React.ReactElement;