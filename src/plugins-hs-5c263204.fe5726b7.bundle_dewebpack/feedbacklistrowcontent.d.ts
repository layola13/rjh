/**
 * Props for the FeedbackListRowContent component
 */
export interface FeedbackListRowContentProps {
  /** The text content to display in the feedback row */
  text: string;
  
  /** Whether to show the image icon indicator */
  showImageIcon?: boolean;
  
  /** Whether the row is currently in extended/expanded state */
  extended?: boolean;
  
  /** Callback function invoked when the extend/collapse icon is clicked */
  onExtend?: () => void;
}

/**
 * A React component that renders a feedback list row content with optional image icon
 * and expand/collapse functionality.
 * 
 * Features:
 * - Displays text content with overflow detection
 * - Shows image icon when content contains images
 * - Provides expand/collapse control for long content
 * 
 * @param props - Component props
 * @returns A React element representing the feedback row content
 */
export declare function FeedbackListRowContent(
  props: FeedbackListRowContentProps
): JSX.Element;