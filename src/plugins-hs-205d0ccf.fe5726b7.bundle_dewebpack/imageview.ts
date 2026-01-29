import React, { useState } from 'react';
import { DraggableModal } from './DraggableModal';
import _ from 'lodash';

interface ImageViewProps {
  imageSrc: string;
  onClose?: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface ZoomDimensions {
  min: number;
}

interface ZoomingEvent {
  height: number;
}

interface ModalConfig {
  initialWidth: number;
  initialHeight: number;
  defaultPositionX: number;
  defaultPositionY: number;
  titleSetting: {
    enableCloseBtn: boolean;
  };
  onCloseModal: () => void;
  zoomable: {
    used: boolean;
    borderWidth: number;
    width: () => ZoomDimensions;
    height: () => ZoomDimensions;
    direction: string[];
    onZooming: _.DebouncedFunc<(event: ZoomingEvent) => void>;
  };
}

const INITIAL_CONTAINER_HEIGHT = 350;
const INITIAL_SCALE = 1;
const INITIAL_POSITION: Position = { x: 0, y: 0 };
const MIN_SCALE = 0.33;
const MAX_SCALE = 4;
const CONTAINER_ASPECT_RATIO = 1.4;
const MOVEMENT_MULTIPLIER = 1.3;
const MOUSE_WHEEL_SENSITIVITY_POSITIVE = 0.01;
const MOUSE_WHEEL_SENSITIVITY_NEGATIVE = 0.005;
const CONTAINER_HEIGHT_RATIO = 0.9;
const THROTTLE_WHEEL_DELAY = 20;
const THROTTLE_ZOOM_DELAY = 5;
const MODAL_INITIAL_WIDTH = 500;
const MODAL_INITIAL_HEIGHT = 410;
const MODAL_DEFAULT_OFFSET_X = 510;
const MODAL_DEFAULT_OFFSET_Y = 42;
const MODAL_MIN_WIDTH = 240;
const MODAL_MIN_HEIGHT = 180;
const ZOOM_BORDER_WIDTH = 10;

export const ImageView: React.FC<ImageViewProps> = ({ imageSrc, onClose }) => {
  const [containerHeight, setContainerHeight] = useState<number>(INITIAL_CONTAINER_HEIGHT);
  const [scale, setScale] = useState<number>(INITIAL_SCALE);
  const [position, setPosition] = useState<Position>(INITIAL_POSITION);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const calculateWheelDelta = (deltaY: number): number => {
    if (deltaY === 0) return 0;
    const halfDelta = deltaY / 2;
    return halfDelta > 0 
      ? MOUSE_WHEEL_SENSITIVITY_POSITIVE * halfDelta 
      : MOUSE_WHEEL_SENSITIVITY_NEGATIVE * halfDelta;
  };

  const handleMouseDown = (): void => {
    setIsDragging(true);
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleMouseLeave = (): void => {
    setIsDragging(false);
  };

  const handleWheel = _.throttle((event: React.WheelEvent<HTMLDivElement>): void => {
    const delta = calculateWheelDelta(-1 * event.deltaY);
    let newScale = scale + delta;

    if (delta > 0) {
      newScale = Math.min(newScale, MAX_SCALE);
    } else {
      newScale = Math.max(newScale, MIN_SCALE);
    }

    setScale(newScale);
  }, THROTTLE_WHEEL_DELAY);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;

    const { x: currentX, y: currentY } = position;
    const newX = currentX + Math.ceil(MOVEMENT_MULTIPLIER * event.movementX);
    const newY = currentY + Math.ceil(MOVEMENT_MULTIPLIER * event.movementY);

    const maxHorizontalOffset = (CONTAINER_ASPECT_RATIO * containerHeight * scale) / 2;
    const maxVerticalOffset = (containerHeight * scale) / 2;

    const clampedX = Math.abs(newX) > maxHorizontalOffset
      ? (newX < 0 ? -maxHorizontalOffset : maxHorizontalOffset)
      : newX;

    const clampedY = Math.abs(newY) > maxVerticalOffset
      ? (newY < 0 ? -maxVerticalOffset : maxVerticalOffset)
      : newY;

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleCloseModal = (): void => {
    onClose?.();
  };

  const handleZooming = _.throttle((event: ZoomingEvent): void => {
    setContainerHeight(CONTAINER_HEIGHT_RATIO * event.height);
  }, THROTTLE_ZOOM_DELAY);

  const modalConfig: ModalConfig = {
    initialWidth: MODAL_INITIAL_WIDTH,
    initialHeight: MODAL_INITIAL_HEIGHT,
    defaultPositionX: window.innerWidth - MODAL_DEFAULT_OFFSET_X,
    defaultPositionY: MODAL_DEFAULT_OFFSET_Y,
    titleSetting: {
      enableCloseBtn: true,
    },
    onCloseModal: handleCloseModal,
    zoomable: {
      used: true,
      borderWidth: ZOOM_BORDER_WIDTH,
      width: () => ({ min: MODAL_MIN_WIDTH }),
      height: () => ({ min: MODAL_MIN_HEIGHT }),
      direction: ['left-bottom'],
      onZooming: handleZooming,
    },
  };

  const containerWidth = CONTAINER_ASPECT_RATIO * containerHeight;

  return (
    <DraggableModal {...modalConfig}>
      <div
        className="underlayimg-pop-img"
        onWheel={handleWheel}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          height: containerHeight,
          width: containerWidth,
        }}
      >
        <img
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
          src={imageSrc}
          alt="Zoomed view"
        />
      </div>
    </DraggableModal>
  );
};