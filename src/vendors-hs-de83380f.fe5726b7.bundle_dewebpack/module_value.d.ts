/**
 * Props for the track component
 */
interface TrackProps {
  /** Mouse enter event handler */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Mouse over event handler */
  onMouseOver?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Mouse leave event handler */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Inline styles for the track element */
  trackStyle?: React.CSSProperties;
  
  /** Child elements to render within the track */
  children?: React.ReactNode;
}

/**
 * Renders a carousel/slider track container with mouse event handlers
 * @returns A div element containing the track children
 */
declare function renderTrack(this: { props: TrackProps; handleRef: React.RefObject<HTMLDivElement> }): React.ReactElement<HTMLDivElement>;