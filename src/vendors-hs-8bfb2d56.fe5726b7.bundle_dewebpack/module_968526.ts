import { useRef, useState, useEffect, RefObject } from 'react';
import Cropper from 'react-cropper';
import Icon from '@/components/Icon';
import i18n from '@/utils/i18n';
import 'cropperjs/dist/cropper.css';

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CropResult {
  base64Data: string;
  blob: Blob | null;
  cropData: CropData;
  mimeType: string;
}

type OutputType = 'png' | 'jpeg' | 'webp';

interface ImageCropperProps {
  imageSrc: string;
  parentContainerClass?: string;
  onCropComplete?: (result: CropResult) => void;
  onClose?: () => void;
  quality?: number;
  outputType?: OutputType;
  showCropper?: boolean;
  isMobile?: boolean;
}

interface PositionStyle {
  position: 'fixed';
  top?: string | number;
  left?: string | number;
  right?: string;
  zIndex: number;
  transform?: string;
  width?: string;
}

const MIME_TYPE_MAP: Record<OutputType, string> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  webp: 'image/webp'
};

const DEFAULT_QUALITY = 0.95;
const DEFAULT_OUTPUT_TYPE: OutputType = 'png';
const DEFAULT_AUTO_CROP_AREA = 0.6;
const MIN_CROP_BOX_WIDTH_MOBILE = 48;
const MIN_CROP_BOX_HEIGHT_MOBILE = 48;
const MIN_CROP_BOX_WIDTH_DESKTOP = 24;
const MIN_CROP_BOX_HEIGHT_DESKTOP = 24;
const CONTAINER_OFFSET = 12;
const BASE_Z_INDEX = 20989;
const MOBILE_Z_INDEX = 10000;
const FALLBACK_Z_INDEX = 10990;

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  parentContainerClass,
  onCropComplete,
  onClose,
  quality = DEFAULT_QUALITY,
  outputType = DEFAULT_OUTPUT_TYPE,
  showCropper = false,
  isMobile = false
}) => {
  const cropperRef = useRef<Cropper>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positionStyle, setPositionStyle] = useState<PositionStyle>({
    position: 'fixed',
    zIndex: BASE_Z_INDEX
  });

  useEffect(() => {
    if (isMobile) {
      setPositionStyle({
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: MOBILE_Z_INDEX
      });
    } else if (parentContainerClass) {
      const parentElement = document.querySelector<HTMLElement>(`.${parentContainerClass}`);
      
      if (parentElement) {
        const updatePosition = (): void => {
          const rect = parentElement.getBoundingClientRect();
          setPositionStyle({
            position: 'fixed',
            top: `${rect.top}px`,
            left: `${rect.right + CONTAINER_OFFSET}px`,
            zIndex: BASE_Z_INDEX
          });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);

        return () => {
          window.removeEventListener('resize', updatePosition);
        };
      } else {
        setPositionStyle({
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: FALLBACK_Z_INDEX
        });
      }
    } else {
      setPositionStyle({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: FALLBACK_Z_INDEX
      });
    }
  }, [parentContainerClass, isMobile]);

  useEffect(() => {
    if (showCropper && isMobile) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
      };
    }
  }, [showCropper, isMobile]);

  const generateCropResult = async (
    canvas: HTMLCanvasElement,
    cropData: Cropper.Data
  ): Promise<CropResult> => {
    return new Promise((resolve) => {
      const mimeType = MIME_TYPE_MAP[outputType];
      const base64Data = canvas.toDataURL(mimeType, quality);

      canvas.toBlob(
        (blob) => {
          resolve({
            base64Data,
            blob,
            cropData: {
              x: cropData.x,
              y: cropData.y,
              width: cropData.width,
              height: cropData.height
            },
            mimeType
          });
        },
        mimeType,
        quality
      );
    });
  };

  const handleCropEnd = (): void => {
    const cropper = cropperRef.current?.cropper;
    
    if (cropper && onCropComplete) {
      const canvas = cropper.getCroppedCanvas();
      const data = cropper.getData();

      if (canvas) {
        generateCropResult(canvas, data).then(onCropComplete);
      }
    }
  };

  const handleComplete = async (): Promise<void> => {
    const cropper = cropperRef.current?.cropper;
    
    if (!cropper) {
      return;
    }

    const canvas = cropper.getCroppedCanvas();
    const data = cropper.getData();

    if (canvas && onCropComplete) {
      const result = await generateCropResult(canvas, data);
      onCropComplete(result);
    }

    onClose?.();
  };

  const handleCancel = (event: React.MouseEvent | React.TouchEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    onClose?.();
  };

  const handleConfirm = async (event: React.MouseEvent | React.TouchEvent): Promise<void> => {
    event.preventDefault();
    event.stopPropagation();
    await handleComplete();
  };

  const handleTouchStart = (event: React.TouchEvent): void => {
    event.stopPropagation();
  };

  const containerClassName = `aimaterial-cropper-container ${showCropper ? 'show' : 'hidden'} ${isMobile ? 'mobile' : 'desktop'}`;

  return (
    <div
      ref={containerRef}
      style={positionStyle}
      className={containerClassName}
    >
      {!isMobile && (
        <div className="image-cropper-header">
          <div className="image-cropper-title">
            {i18n.t('inspiration_image_search_recognize_region')}
          </div>
          <div
            onClick={onClose}
            className="close-button"
            aria-label="关闭裁剪器"
          >
            <Icon
              type="iconhs_xian_guanbimulu"
              style={{ fontSize: '16px', marginRight: '4px' }}
            />
            {i18n.t('inspiration_image_search_shrink_panel')}
          </div>
        </div>
      )}

      <div className="cropper-wrapper">
        <Cropper
          ref={cropperRef}
          src={imageSrc}
          viewMode={1}
          background={false}
          autoCropArea={DEFAULT_AUTO_CROP_AREA}
          guides={false}
          center={false}
          cropend={handleCropEnd}
          ready={handleCropEnd}
          minCropBoxWidth={isMobile ? MIN_CROP_BOX_WIDTH_MOBILE : MIN_CROP_BOX_WIDTH_DESKTOP}
          minCropBoxHeight={isMobile ? MIN_CROP_BOX_HEIGHT_MOBILE : MIN_CROP_BOX_HEIGHT_DESKTOP}
        />
      </div>

      {isMobile && (
        <div className="mobile-action-buttons">
          <div
            onClick={handleCancel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleCancel}
            className="cancel-button"
          >
            {i18n.t('operate_cancel')}
          </div>
          <div
            onClick={handleConfirm}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleConfirm}
            className="complete-button"
          >
            {i18n.t('imageSelect.confirmButton')}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;