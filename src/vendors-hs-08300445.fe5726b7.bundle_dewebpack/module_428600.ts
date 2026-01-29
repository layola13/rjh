import { useState, useEffect, useRef, useContext, isValidElement, cloneElement, createElement, useRef as UseRef } from 'react';
import classNames from 'classnames';
import { getOffset } from './utils/offset';
import { warning } from './utils/warning';
import { addEventListener } from './utils/dom';
import { calculatePosition } from './utils/position';
import { useMergedState } from './hooks/useMergedState';
import Dialog from './Dialog';
import { context } from './PreviewGroup';

interface Position {
  x: number;
  y: number;
}

interface DragState {
  originX: number;
  originY: number;
  deltaX: number;
  deltaY: number;
}

interface Icons {
  rotateLeft?: React.ReactNode;
  rotateRight?: React.ReactNode;
  zoomIn?: React.ReactNode;
  zoomOut?: React.ReactNode;
  close?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

interface Operation {
  icon: React.ReactNode;
  onClick: () => void;
  type: string;
  disabled?: boolean;
}

interface WheelState {
  wheelDirection: number;
}

interface PreviewProps {
  prefixCls: string;
  src: string;
  alt?: string;
  onClose: () => void;
  afterClose?: () => void;
  visible: boolean;
  icons?: Icons;
}

const INITIAL_POSITION: Position = { x: 0, y: 0 };

export default function Preview(props: PreviewProps): JSX.Element {
  const {
    prefixCls,
    src,
    alt,
    onClose,
    afterClose,
    visible,
    icons = {},
    ...restProps
  } = props;

  const {
    rotateLeft,
    rotateRight,
    zoomIn,
    zoomOut,
    close,
    left,
    right
  } = icons;

  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useMergedState<Position>(INITIAL_POSITION);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStateRef = useRef<DragState>({
    originX: 0,
    originY: 0,
    deltaX: 0,
    deltaY: 0
  });
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const previewGroupContext = useContext(context);
  const {
    previewUrls,
    current,
    isPreviewGroup,
    setCurrent
  } = previewGroupContext;

  const urlCount = previewUrls.size;
  const urlKeys = Array.from(previewUrls.keys());
  const currentIndex = urlKeys.indexOf(current);
  const currentSrc = isPreviewGroup ? previewUrls.get(current) : src;
  const hasMultipleImages = isPreviewGroup && urlCount > 1;

  const [wheelState, setWheelState] = useState<WheelState>({ wheelDirection: 0 });

  const handleZoomIn = (): void => {
    setScale((prevScale) => prevScale + 1);
    setPosition(INITIAL_POSITION);
  };

  const handleZoomOut = (): void => {
    if (scale > 1) {
      setScale((prevScale) => prevScale - 1);
    }
    setPosition(INITIAL_POSITION);
  };

  const handleRotateRight = (): void => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleRotateLeft = (): void => {
    setRotation((prevRotation) => prevRotation - 90);
  };

  const wrapperClassName = classNames({
    [`${prefixCls}-moving`]: isMoving
  });

  const operationClassName = `${prefixCls}-operations-operation`;
  const operationIconClassName = `${prefixCls}-operations-icon`;

  const operations: Operation[] = [
    {
      icon: close,
      onClick: onClose,
      type: 'close'
    },
    {
      icon: zoomIn,
      onClick: handleZoomIn,
      type: 'zoomIn'
    },
    {
      icon: zoomOut,
      onClick: handleZoomOut,
      type: 'zoomOut',
      disabled: scale === 1
    },
    {
      icon: rotateRight,
      onClick: handleRotateRight,
      type: 'rotateRight'
    },
    {
      icon: rotateLeft,
      onClick: handleRotateLeft,
      type: 'rotateLeft'
    }
  ];

  const handleMouseUp = (): void => {
    if (visible && isMoving) {
      const imageElement = imageRef.current;
      if (!imageElement) return;

      const scaledWidth = imageElement.offsetWidth * scale;
      const scaledHeight = imageElement.offsetHeight * scale;
      const offset = getOffset(imageElement);
      const { left, top } = offset;
      const isRotated = rotation % 180 !== 0;

      setIsMoving(false);

      const calculatedPosition = calculatePosition(
        isRotated ? scaledHeight : scaledWidth,
        isRotated ? scaledWidth : scaledHeight,
        left,
        top
      );

      if (calculatedPosition) {
        setPosition({ ...calculatedPosition });
      }
    }
  };

  const handleMouseMove = (event: MouseEvent): void => {
    if (visible && isMoving) {
      setPosition({
        x: event.pageX - dragStateRef.current.deltaX,
        y: event.pageY - dragStateRef.current.deltaY
      });
    }
  };

  const handleWheel = (event: WheelEvent): void => {
    if (visible) {
      event.preventDefault();
      const { deltaY } = event;
      setWheelState({ wheelDirection: deltaY });
    }
  };

  useEffect(() => {
    const { wheelDirection } = wheelState;
    if (wheelDirection > 0) {
      handleZoomOut();
    } else if (wheelDirection < 0) {
      handleZoomIn();
    }
  }, [wheelState]);

  useEffect(() => {
    const mouseUpListener = addEventListener(window, 'mouseup', handleMouseUp, false);
    const mouseMoveListener = addEventListener(window, 'mousemove', handleMouseMove, false);
    const wheelListener = addEventListener(window, 'wheel', handleWheel, { passive: false });

    let topMouseUpListener: { remove: () => void } | undefined;
    let topMouseMoveListener: { remove: () => void } | undefined;

    try {
      if (window.top !== window.self) {
        topMouseUpListener = addEventListener(window.top, 'mouseup', handleMouseUp, false);
        topMouseMoveListener = addEventListener(window.top, 'mousemove', handleMouseMove, false);
      }
    } catch (error) {
      warning(false, `[rc-image] ${error}`);
    }

    return () => {
      mouseUpListener.remove();
      mouseMoveListener.remove();
      wheelListener.remove();
      topMouseUpListener?.remove();
      topMouseMoveListener?.remove();
    };
  }, [visible, isMoving]);

  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current.deltaX = event.pageX - position.x;
    dragStateRef.current.deltaY = event.pageY - position.y;
    dragStateRef.current.originX = position.x;
    dragStateRef.current.originY = position.y;
    setIsMoving(true);
  };

  const handleAfterClose = (): void => {
    setScale(1);
    setRotation(0);
    setPosition(INITIAL_POSITION);
  };

  const handlePrevious = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    if (currentIndex > 0) {
      setCurrent(urlKeys[currentIndex - 1]);
    }
  };

  const handleNext = (event: React.MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    if (currentIndex < urlCount - 1) {
      setCurrent(urlKeys[currentIndex + 1]);
    }
  };

  const isFirstImage = currentIndex === 0;
  const isLastImage = currentIndex === urlCount - 1;

  return createElement(Dialog, {
    ...restProps,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    closable: false,
    keyboard: true,
    prefixCls,
    onClose,
    afterClose: handleAfterClose,
    visible,
    wrapClassName: wrapperClassName
  },
    createElement('ul', { className: `${prefixCls}-operations` },
      operations.map((operation) => {
        const { icon, onClick, type, disabled } = operation;
        return createElement('li', {
          className: classNames(operationClassName, {
            [`${prefixCls}-operations-operation-disabled`]: !!disabled
          }),
          onClick,
          key: type
        },
          isValidElement(icon)
            ? cloneElement(icon, { className: operationIconClassName })
            : icon
        );
      })
    ),
    createElement('div', {
      className: `${prefixCls}-img-wrapper`,
      style: {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }
    },
      createElement('img', {
        onMouseDown: handleMouseDown,
        ref: imageRef,
        className: `${prefixCls}-img`,
        src: currentSrc,
        alt,
        style: {
          transform: `scale3d(${scale}, ${scale}, 1) rotate(${rotation}deg)`
        }
      })
    ),
    hasMultipleImages && createElement('div', {
      className: classNames(`${prefixCls}-switch-left`, {
        [`${prefixCls}-switch-left-disabled`]: isFirstImage
      }),
      onClick: handlePrevious
    }, left),
    hasMultipleImages && createElement('div', {
      className: classNames(`${prefixCls}-switch-right`, {
        [`${prefixCls}-switch-right-disabled`]: isLastImage
      }),
      onClick: handleNext
    }, right)
  );
}