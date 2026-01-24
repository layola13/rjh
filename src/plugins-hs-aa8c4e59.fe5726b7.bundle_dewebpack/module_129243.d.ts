import React from 'react';

/**
 * Props for the Image component
 */
interface ImageProps {
  /** CSS class name for the image element */
  className?: string;
  /** Image source URL */
  src: string;
  /** Callback function invoked when the image finishes loading */
  onLoad?: () => void;
}

/**
 * A simple React image component that wraps the native <img> element
 * and provides a load event callback.
 */
declare class ImageComponent extends React.Component<ImageProps> {
  /**
   * Reference to the underlying image DOM element
   */
  refs: {
    image: HTMLImageElement;
  };

  /**
   * Internal handler for the image load event
   * @private
   */
  private _onLoad(): void;

  /**
   * Renders the image element
   */
  render(): React.ReactElement;
}

/**
 * Default export of the Image component
 */
declare const _default: typeof ImageComponent;
export default _default;