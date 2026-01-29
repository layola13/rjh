import { useRef, useState, useEffect, ReactElement } from 'react';
import classNames from 'classnames';
import { getNavOffset } from './utils';
import { IconfontView } from './IconfontView';

interface CarouselItem {
  imageUrl: string;
  label: string;
  isPano?: boolean;
}

interface CarouselPanelNavProps {
  items?: CarouselItem[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  showAnimation?: boolean;
}

export const CarouselPanelNav = ({
  items = [],
  activeIndex = 0,
  onChange = () => {},
  showAnimation = false
}: CarouselPanelNavProps): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    setOffset(getNavOffset(activeIndex, containerRef.current, navRef.current));
  });

  return (
    <div className="carousel-panel-nav-container" ref={containerRef}>
      <div
        className="carousel-panel-nav"
        ref={navRef}
        style={{
          transform: `translate(${offset}px)`,
          transition: showAnimation ? 'transform 0.3s ease-in-out' : 'none'
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames({
              'carousel-panel-nav-item': true,
              'carousel-panel-nav-item--active': index === activeIndex
            })}
          >
            <div
              className="carousel-panel-nav-item-img"
              style={{
                backgroundImage: `url(${item.imageUrl})`
              }}
              onClick={() => onChange(index)}
            >
              {item.isPano && (
                <IconfontView
                  showType="hs_mian_quanjing"
                  customStyle={{
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                />
              )}
            </div>
            <div className="carousel-panel-nav-item-label">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};