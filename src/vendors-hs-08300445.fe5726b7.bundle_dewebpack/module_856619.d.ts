/**
 * Track component props interface
 * Represents a visual track/segment in a slider component
 */
interface TrackProps {
  /** CSS class name for styling */
  className?: string;
  /** Whether this track segment should be rendered */
  included: boolean;
  /** Whether the slider is oriented vertically */
  vertical?: boolean;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Length of the track as a percentage (0-100) */
  length: number;
  /** Starting position offset as a percentage (0-100) */
  offset: number;
  /** Whether the track direction is reversed */
  reverse?: boolean;
}

/**
 * Renders a track segment for a slider component
 * The track represents the filled portion between handles or from the start to a handle
 * 
 * @param props - Track configuration properties
 * @returns A div element representing the track, or null if not included
 */
declare function Track(props: TrackProps): React.ReactElement | null;

export default Track;