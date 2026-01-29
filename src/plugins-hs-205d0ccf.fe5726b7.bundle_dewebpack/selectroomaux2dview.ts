import { useRef, useEffect } from 'react';
import React from 'react';

interface SelectRoomAux2DViewProps {
  handler: {
    setSelectRoomAux2DContainer(container: HTMLDivElement | null): void;
    destroySelectRoomAux2DView(): void;
    resizeSelectRoomAux2DView(): void;
  };
}

export const SelectRoomAux2DView: React.FC<SelectRoomAux2DViewProps> = ({ handler }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handler.setSelectRoomAux2DContainer(containerRef.current);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      handler.destroySelectRoomAux2DView();
    };
  }, [handler]);

  const handleResize = (): void => {
    if (containerRef.current) {
      handler.resizeSelectRoomAux2DView();
    }
  };

  return (
    <div ref={containerRef} className="selectroom-aux2d" />
  );
};