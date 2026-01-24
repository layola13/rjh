/**
 * Image wrapper component with loading state
 * @module ImageWrapper
 */

import React from 'react';

/**
 * Props for the ImageWrapper component
 */
export interface ImageWrapperProps {
  /**
   * URL or path to the image to display
   */
  picture: string;

  /**
   * Custom styles to apply to the img element
   */
  imgStyle?: React.CSSProperties;

  /**
   * Callback invoked when the image has finished loading
   */
  onPictureLoad: () => void;
}

/**
 * Internal state for the ImageWrapper component
 */
export interface ImageWrapperState {
  /**
   * Whether the image is currently loading
   */
  loading: boolean;

  /**
   * Whether to center the loading icon
   */
  loadingIconCenter: boolean;
}

/**
 * Component that wraps an image with a loading indicator
 * Displays a loading spinner while the image is being fetched,
 * then hides it once the image has loaded.
 */
export default class ImageWrapper extends React.Component<ImageWrapperProps, ImageWrapperState> {
  state: ImageWrapperState;

  constructor(props: ImageWrapperProps);

  /**
   * Handler called when the image has successfully loaded
   * Updates state to hide the loading indicator and triggers parent callback
   */
  onPictureLoad(): void;

  /**
   * Renders the image wrapper with loading indicator
   * @returns The rendered component
   */
  render(): React.ReactElement;
}