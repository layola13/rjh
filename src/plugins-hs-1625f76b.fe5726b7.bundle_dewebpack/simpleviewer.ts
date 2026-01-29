import { useState, useEffect, createElement } from 'react';
import { getOriginImgSize, getOriginImgUrl, fitImg2Container, getResizeImgUrl } from './imageUtils';
import { VIEWER_WIDTH, VIEWER_HEIGHT } from './constants';

interface ImageData {
  imageUrl: string;
}

interface SimpleViewerProps {
  img: ImageData;
}

export const SimpleViewer: React.FC<SimpleViewerProps> = ({ img }) => {
  const [dimensions, setDimensions] = useState<[number, number]>([VIEWER_WIDTH, VIEWER_HEIGHT]);

  useEffect(() => {
    const loadImageDimensions = async (): Promise<void> => {
      try {
        const originUrl = getOriginImgUrl(img.imageUrl);
        const [originalWidth, originalHeight] = await getOriginImgSize(originUrl);
        const fittedDimensions = fitImg2Container(
          VIEWER_WIDTH,
          VIEWER_HEIGHT,
          originalWidth,
          originalHeight
        );
        setDimensions(fittedDimensions);
      } catch (error) {
        // Error handling - keep default dimensions
      }
    };

    loadImageDimensions();
  }, [img]);

  const [imageWidth, imageHeight] = dimensions;
  const leftOffset = 0.5 * (VIEWER_WIDTH - imageWidth);
  const topOffset = 0.5 * (VIEWER_HEIGHT - imageHeight);

  const DIMENSION_TOLERANCE = 2;
  const shouldShowBackground =
    Math.abs(imageWidth - VIEWER_WIDTH) > DIMENSION_TOLERANCE ||
    Math.abs(imageHeight - VIEWER_HEIGHT) > DIMENSION_TOLERANCE;

  return createElement(
    'div',
    {
      className: 'carousel-panel-viewer',
      style: {
        width: VIEWER_WIDTH,
        height: VIEWER_HEIGHT,
        background: shouldShowBackground ? 'rgba(0, 0, 0, 0.8)' : 'none',
      },
    },
    createElement(
      'div',
      {
        className: 'carousel-panel-viewer-img-container',
        style: {
          left: leftOffset,
          top: topOffset,
          width: imageWidth,
          height: imageHeight,
        },
      },
      createElement('img', {
        src: getResizeImgUrl(img.imageUrl, imageWidth, imageHeight),
      })
    )
  );
};