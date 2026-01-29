import { useState, useEffect, useRef, ReactNode, CSSProperties, MouseEvent } from 'react';

interface Position {
  x: number;
  y: number;
}

interface DraggableProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  defaultPosition?: Position;
  onPositionChange?: (position: Position) => void;
  style?: CSSProperties;
}

export const Draggable = ({
  children,
  className = '',
  onClick,
  defaultPosition,
  onPositionChange,
  style
}: DraggableProps): JSX.Element => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState<boolean>(false);
  const mouseDownPosition = useRef<Position>({ x: 0, y: 0 });

  const MOVEMENT_THRESHOLD = 10;

  useEffect(() => {
    setPosition(defaultPosition ?? { x: 0, y: 0 });
  }, [defaultPosition?.x, defaultPosition?.y]);

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: globalThis.MouseEvent): void => {
    if (!isDragging) return;

    const deltaX = Math.abs(mouseDownPosition.current.x - event.pageX);
    const deltaY = Math.abs(mouseDownPosition.current.y - event.pageY);

    if (deltaX > MOVEMENT_THRESHOLD || deltaY > MOVEMENT_THRESHOLD) {
      setHasMoved(true);
    }

    const newPosition: Position = {
      x: event.pageX - dragOffset.x,
      y: event.pageY - dragOffset.y
    };

    setPosition(newPosition);
    onPositionChange?.(newPosition);
    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, position]);

  const handleClick = (): void => {
    if (hasMoved) {
      setHasMoved(false);
    } else {
      onClick?.();
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.button !== 0) return;

    mouseDownPosition.current = {
      x: event.pageX,
      y: event.pageY
    };

    const offset: Position = {
      x: event.pageX - position.x,
      y: event.pageY - position.y
    };

    setIsDragging(true);
    setDragOffset(offset);
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div
      className={`draggable ${className}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      {children}
    </div>
  );
};