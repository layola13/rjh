import React, { useRef, useEffect, forwardRef } from 'react';
import Cropper from 'cropperjs';

interface CropperProps {
  dragMode?: 'crop' | 'move' | 'none';
  src?: string;
  style?: React.CSSProperties;
  className?: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  scaleX?: number;
  scaleY?: number;
  enable?: boolean;
  zoomTo?: number;
  rotateTo?: number;
  alt?: string;
  ready?: (event: Cropper.ReadyEvent<HTMLImageElement>) => void;
  onInitialized?: (instance: Cropper) => void;
  [key: string]: unknown;
}

interface CropperState {
  scaleX?: number;
  scaleY?: number;
  enable?: boolean;
  zoomTo?: number;
  rotateTo?: number;
}

function applyCropperSettings(cropper: Cropper, settings: CropperState = {}): void {
  const {
    enable = true,
    scaleX = 1,
    scaleY = 1,
    zoomTo = 0,
    rotateTo
  } = settings;

  if (enable) {
    cropper.enable();
  } else {
    cropper.disable();
  }

  cropper.scaleX(scaleX);
  cropper.scaleY(scaleY);

  if (rotateTo !== undefined) {
    cropper.rotateTo(rotateTo);
  }

  if (zoomTo > 0) {
    cropper.zoomTo(zoomTo);
  }
}

function useMergedRefs<T>(...refs: Array<React.Ref<T> | null>): React.RefObject<T> {
  const mergedRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach(ref => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(mergedRef.current);
        } else {
          (ref as React.MutableRefObject<T | null>).current = mergedRef.current;
        }
      }
    });
  }, [refs]);

  return mergedRef;
}

const CropperComponent = forwardRef<HTMLImageElement, CropperProps>((props, ref) => {
  const {
    dragMode = 'crop',
    src,
    style,
    className,
    crossOrigin,
    scaleX,
    scaleY,
    enable,
    zoomTo,
    rotateTo,
    alt = 'picture',
    ready,
    onInitialized,
    ...restProps
  } = props;

  const cropperSettings: CropperState = {
    scaleX,
    scaleY,
    enable,
    zoomTo,
    rotateTo
  };

  const imageRef = useMergedRefs<HTMLImageElement>(ref, useRef<HTMLImageElement>(null));

  useEffect(() => {
    const imageElement = imageRef.current;
    if (imageElement?.cropper && typeof zoomTo === 'number') {
      imageElement.cropper.zoomTo(zoomTo);
    }
  }, [zoomTo]);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (imageElement?.cropper && src !== undefined) {
      imageElement.cropper.reset().clear().replace(src);
    }
  }, [src]);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (imageElement !== null) {
      const cropperInstance = new Cropper(imageElement, {
        dragMode,
        ...restProps,
        ready(event: Cropper.ReadyEvent<HTMLImageElement>) {
          if (event.currentTarget !== null) {
            applyCropperSettings(event.currentTarget.cropper, cropperSettings);
            ready?.(event);
          }
        }
      });

      onInitialized?.(cropperInstance);
    }

    return () => {
      const imageElement = imageRef.current;
      imageElement?.cropper?.destroy();
    };
  }, [imageRef]);

  return (
    <div style={style} className={className}>
      <img
        crossOrigin={crossOrigin}
        src={src}
        alt={alt}
        style={{
          opacity: 0,
          maxWidth: '100%'
        }}
        ref={imageRef}
      />
    </div>
  );
});

CropperComponent.displayName = 'Cropper';

export { CropperComponent as Cropper };
export default CropperComponent;