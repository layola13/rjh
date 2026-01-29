import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';

interface ScaleAbleProps {
  children: ReactNode;
  scale: number;
}

interface Margins {
  right: number;
  bottom: number;
}

export const ScaleAble = ({ children, scale }: ScaleAbleProps): JSX.Element => {
  const [margins, setMargins] = useState<Margins>({
    right: 0,
    bottom: 0
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    setMargins({
      right: width * (scale - 1),
      bottom: height * (scale - 1)
    });
  }, [scale, children]);

  const style: CSSProperties = {
    transform: `scale(${scale})`,
    marginRight: margins.right,
    marginBottom: margins.bottom
  };

  return (
    <div ref={containerRef} className="scale-able" style={style}>
      {children}
    </div>
  );
};