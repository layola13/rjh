/**
 * Helpbar component properties interface
 */
export interface HelpbarComponentProps {
  /** The helpbar object containing name and configuration */
  helpbar: {
    /** Unique identifier for the helpbar */
    name: string;
    [key: string]: unknown;
  };
  /** Signal callback to refresh help UI */
  signalRefreshHelpUi?: () => void;
}

/**
 * Props for the main Floorplanner Helpbar container component
 */
export interface FloorplannerHelpbarProps {
  /** The helpbar configuration object */
  helpbar: {
    /** Unique identifier for the helpbar */
    name: string;
    [key: string]: unknown;
  };
  /** Optional callback to signal help UI refresh */
  signalRefreshHelpUi?: () => void;
}

/**
 * Renders the Floorplanner helpbar container with an unselectable div wrapper
 * 
 * @param props - Component properties
 * @returns React element representing the helpbar UI
 */
export default function FloorplannerHelpbar(
  props: FloorplannerHelpbarProps
): React.ReactElement;