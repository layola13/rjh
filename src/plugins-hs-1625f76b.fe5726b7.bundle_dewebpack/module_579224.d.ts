/**
 * Camera list component for displaying and managing camera positions
 * Module ID: 579224
 */

import React, { PureComponent, CSSProperties } from 'react';
import { List } from 'immutable';

/**
 * Represents a camera position with an ID and other properties
 */
interface CameraPosition {
  get(key: 'id'): string | number;
  get(key: string): unknown;
}

/**
 * Props for the CameraListSlider component
 */
interface CameraListSliderProps {
  /** Whether the component is in read-only mode */
  isReadonly: boolean;
  
  /** Immutable list of camera positions */
  positions: List<CameraPosition>;
  
  /** Index of the currently selected camera */
  selectedCamera: number;
  
  /** Handler called when a camera is clicked */
  clickCameraHandler: (index: number) => void;
  
  /** Handler called when a camera name is changed */
  onNameChange: (index: number, newName: string) => void;
  
  /** Handler called when a camera is deleted */
  deleteHandler: (index: number) => void;
  
  /** Starting index for rendering cameras */
  startIndex: number;
  
  /** Index at which to trigger next page loading */
  remainIdx: number;
  
  /** Handler called when next page should be loaded */
  nextpageHandler: () => void;
}

/**
 * Component for displaying a horizontal slider of camera items
 * Supports selection, editing, and pagination
 */
declare class CameraListSlider extends PureComponent<CameraListSliderProps> {
  /**
   * Default property values
   */
  static defaultProps: {
    clickCameraHandler: () => void;
    onNameChange: () => void;
  };

  /**
   * Container element reference
   */
  refs: {
    container: HTMLDivElement;
  };

  /**
   * Renders the camera list slider
   * @returns React element containing the camera slider UI
   */
  render(): React.ReactElement;
}

export default CameraListSlider;