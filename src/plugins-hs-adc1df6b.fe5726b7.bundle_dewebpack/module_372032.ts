import { useState, useEffect, default as React } from 'react';

interface CardData {
  className: string;
  imgUrl: string | Promise<string>;
}

interface PropertyBarInputCardProps {
  data: CardData | null;
  hoverEle: HTMLElement | null;
  isHover: boolean;
}

interface Position {
  top: string;
  left: string;
  transform?: string;
}

const INITIAL_POSITION: Position = {
  top: '-9999px',
  left: '-9999px'
};

const HORIZONTAL_THRESHOLD = 370;
const RIGHT_OFFSET = 90;
const LEFT_OFFSET = 170;

export default function PropertyBarInputCard(props: PropertyBarInputCardProps): JSX.Element | null {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [position, setPosition] = useState<Position>(INITIAL_POSITION);

  const { data, hoverEle, isHover } = props;

  if (!data) {
    return null;
  }

  const { className, imgUrl } = data;

  useEffect(() => {
    if (imgUrl instanceof Promise) {
      imgUrl.then((resolvedUrl: string) => {
        setImageUrl(resolvedUrl);
      });
    } else {
      setImageUrl(imgUrl);
    }
  }, [imgUrl]);

  useEffect(() => {
    if (!hoverEle) {
      return;
    }

    const rect = hoverEle.getBoundingClientRect();
    const { top, left } = rect;

    const newPosition: Position = left < HORIZONTAL_THRESHOLD
      ? {
          top: `${top}px`,
          left: `${left + RIGHT_OFFSET}px`,
          transform: 'translate(0%, -50%)'
        }
      : {
          top: `${top}px`,
          left: `${left - LEFT_OFFSET}px`,
          transform: 'translate(-100%, -50%)'
        };

    setPosition(newPosition);
  }, [hoverEle]);

  return (
    <div
      hidden={!isHover}
      style={position}
      className={`property-bar-input-card ${className}`}
    >
      <div className="property-bar-input-card-content">
        <div>
          <img
            className="property-bar-input-card-content-img"
            src={imageUrl}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}