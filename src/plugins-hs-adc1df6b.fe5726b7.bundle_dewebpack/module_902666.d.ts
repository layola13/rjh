/**
 * Props for the NoChoiceView component
 */
export interface NoChoiceViewData {
  /** CSS class name to apply to the root element */
  className?: string;
  /** Hint text to display when there are no results */
  hint?: string;
  /** Image source URL for the no-result illustration */
  src?: string;
}

/**
 * Component props for NoChoiceView
 */
export interface NoChoiceViewProps {
  /** Configuration data for the component */
  data: NoChoiceViewData;
}

/**
 * A component that displays a "no results" view with an image and hint text.
 * Typically used when a search or filter operation returns no matches.
 * 
 * @param props - Component props containing display data
 * @returns A React element displaying the no-result state
 * 
 * @example
 *