/**
 * Props for the Bottomline component
 */
export interface BottomlineProps {
  /**
   * Controls the visibility of the bottomline element
   * When false, adds 'hidden' class to hide the element
   */
  visible: boolean;
}

/**
 * Renders a bottomline list item element with conditional visibility
 * 
 * @param props - Component properties
 * @returns A React list item element with dynamic className based on visibility
 */
export default function Bottomline(props: BottomlineProps): React.ReactElement<HTMLLIElement>;