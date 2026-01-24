/**
 * Props for the LinkComponent
 */
export interface LinkComponentProps {
  /** The URL to navigate to */
  url: string;
  /** The text content to display in the link */
  text: string;
  /** The target attribute for the anchor tag (e.g., '_blank', '_self') */
  target?: string;
  /** Optional click handler callback */
  onClick?: () => void;
}

/**
 * A functional component that renders a clickable link with custom behavior.
 * 
 * @param props - The component props
 * @returns A React element containing an anchor tag
 * 
 * @remarks
 * The component prevents default navigation and:
 * - Calls the onClick handler if provided
 * - Opens the URL in the specified target if target is provided
 * - Shows a teaching dialog otherwise
 */
export declare function LinkComponent(props: LinkComponentProps): React.ReactElement;