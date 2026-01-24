/**
 * Image viewer component with zoom and pan functionality
 * Displays an image in a draggable modal with mouse wheel zoom and drag-to-pan support
 */

import React, { useState } from 'react';
import { DraggableModal } from './DraggableModal';
import type { DraggableModalProps } from './DraggableModal';

/**
 * Position coordinates for image panning
 */
interface Position {
  /** Horizontal offset in pixels */
  x: number;
  /** Vertical offset in pixels */
  y: number;
}

/**
 * Props for the ImageView component
 */
interface ImageViewProps {
  /** Source URL of the image to display */
  imageSrc: string;
  /** Callback invoked when the modal is closed */
  onClose?: () => void;
}

/**
 * ImageView component - Displays an image with zoom and pan capabilities
 * 
 * Features:
 * - Mouse wheel zoom (scale range: 0.33x to 4x)
 * - Click and drag to pan the zoomed image
 * - Draggable and resizable modal container
 * - Automatic bounds limiting for pan offset
 * 
 * @param props - Component properties
 * @returns React component rendering an interactive image viewer
 */
export const ImageView: React.FC<ImageViewProps> = (props) => {
  const { imageSrc, onClose } = props;

  // Modal content height state (adjusts with modal resize)
  const [contentHeight, setContentHeight] = useState<number>(350);
  
  // Image zoom scale (0.33 to 4.0)
  const [scale, setScale] = useState<number>(1);
  
  // Pan offset position
  const [panOffset, setPanOffset] = useState<Position>({ x: 0, y: 0 });
  
  // Mouse drag active state
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Modal configuration constants
  const INITIAL_WIDTH = 500;
  const INITIAL_HEIGHT = 410;
  const DEFAULT_POSITION_X = window.innerWidth - 510;
  const DEFAULT_POSITION_Y = 42;
  const MIN_MODAL_WIDTH = 240;
  const MIN_MODAL_HEIGHT = 180;
  const HEIGHT_TO_CONTENT_RATIO = 0.9;
  const ASPECT_RATIO = 1.4;
  const MAX_SCALE = 4;
  const MIN_SCALE = 0.33;
  const ZOOM_THROTTLE_MS = 20;
  const RESIZE_THROTTLE_MS = 5;
  const MOVEMENT_MULTIPLIER = 1.3;

  /**
   * Calculates zoom delta from mouse wheel movement
   * @param wheelDelta - Raw wheel delta value
   * @returns Calculated scale increment
   */
  const calculateZoomDelta = (wheelDelta: number): number => {
    if (wheelDelta === 0) return 0;
    const halfDelta = wheelDelta / 2;
    return halfDelta > 0 ? halfDelta * 0.01 : halfDelta * 0.005;
  };

  /**
   * Handles mouse wheel zoom event (throttled)
   */
  const handleWheel = _.throttle((event: React.WheelEvent<HTMLDivElement>) => {
    const delta = calculateZoomDelta(-1 * event.deltaY);
    let newScale = scale + delta;
    
    // Clamp scale within bounds
    if (delta > 0) {
      newScale = Math.min(newScale, MAX_SCALE);
    } else {
      newScale = Math.max(newScale, MIN_SCALE);
    }
    
    setScale(newScale);
  }, ZOOM_THROTTLE_MS);

  /**
   * Handles mouse move for panning (when dragging)
   */
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;

    const { x: currentX, y: currentY } = panOffset;
    const newX = currentX + Math.ceil(MOVEMENT_MULTIPLIER * event.movementX);
    const newY = currentY + Math.ceil(MOVEMENT_MULTIPLIER * event.movementY);

    // Calculate maximum allowed offset based on scaled image dimensions
    const maxOffsetX = (imageWidth * scale) / 2;
    const maxOffsetY = (contentHeight * scale) / 2;

    // Clamp offsets within bounds
    const clampedX = Math.max(-maxOffsetX, Math.min(maxOffsetX, newX));
    const clampedY = Math.max(-maxOffsetY, Math.min(maxOffsetY, newY));

    setPanOffset({ x: clampedX, y: clampedY });
  };

  /**
   * Handles modal resize to adjust content dimensions
   */
  const handleModalResize = _.throttle((dimensions: { height: number }) => {
    setContentHeight(HEIGHT_TO_CONTENT_RATIO * dimensions.height);
  }, RESIZE_THROTTLE_MS);

  // Calculate image dimensions
  const imageWidth = ASPECT_RATIO * contentHeight;

  // Modal configuration
  const modalConfig: DraggableModalProps = {
    initialWidth: INITIAL_WIDTH,
    initialHeight: INITIAL_HEIGHT,
    defaultPositionX: DEFAULT_POSITION_X,
    defaultPositionY: DEFAULT_POSITION_Y,
    titleSetting: {
      enableCloseBtn: true,
    },
    onCloseModal: () => {
      onClose?.();
    },
    zoomable: {
      used: true,
      borderWidth: 10,
      width: () => ({ min: MIN_MODAL_WIDTH }),
      height: () => ({ min: MIN_MODAL_HEIGHT }),
      direction: ['left-bottom'],
      onZooming: handleModalResize,
    },
  };

  return (
    <DraggableModal {...modalConfig}>
      <div
        className="underlayimg-pop-img"
        onWheel={handleWheel}
        onMouseLeave={() => setIsDragging(false)}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        style={{
          height: contentHeight,
          width: imageWidth,
        }}
      >
        <img
          src={imageSrc}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${scale})`,
          }}
        />
      </div>
    </DraggableModal>
  );
};