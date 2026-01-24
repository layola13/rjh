/**
 * Media loading event handler properties
 */
interface MediaLoadedProps {
  /**
   * Callback invoked when media has finished loading
   */
  onMediaLoaded: () => void;
}

/**
 * Component or context containing media loading properties
 */
interface MediaLoadComponent {
  props: MediaLoadedProps;
}

/**
 * Handles the onLoad event by triggering the media loaded callback
 * 
 * @remarks
 * This function is typically bound to a media element's load event
 * and delegates to the onMediaLoaded callback provided via props
 * 
 * @example
 *