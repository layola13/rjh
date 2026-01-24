/**
 * Image panel component for image recognition and region selection
 * @module ImagePanel
 */

import { useRef, useState, useEffect, ReactElement } from 'react';
import { Icons } from './Icons';
import { ReCognitionLoading } from './ReCognitionLoading';
import { ReCognitionError } from './ReCognitionError';
import { recognizeImage } from './recognizeImage';
import { ImgAnchorPicker } from './ImgAnchorPicker';
import './ImagePanel.css';

/**
 * Bounding box coordinates for recognized image regions
 */
interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Clipping position data
 */
interface ClipPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Props for the ImagePanel component
 */
interface ImagePanelProps {
  /** URL of the original image to analyze */
  originImageUrl: string;
  
  /** Original image width in pixels */
  originImageWidth: number;
  
  /** Original image height in pixels */
  originImageHeight: number;
  
  /** Callback when panel should be hidden */
  onHidePanel: () => void;
  
  /** Callback when panel should be shown */
  onShowPanel: () => void;
  
  /** Callback when user cancels the operation */
  onCancel: () => void;
  
  /** Callback to adjust panel position */
  changeImagePanelPosition: () => void;
  
  /** Callback when user searches a picture region */
  searchPicture: (
    box: BoundingBox,
    position: ClipPosition,
    capturedImage: string
  ) => void;
}

/**
 * Command types that trigger panel visibility changes
 */
const enum CommandType {
  PlaceProduct = 'PlaceProduct',
  Decoration = 'Decoration'
}

/**
 * Command event data structure
 */
interface CommandEvent {
  data?: {
    cmd?: {
      type: string;
    };
  };
}

/**
 * Image panel component for AI-powered image recognition and region selection.
 * Allows users to select regions of an image for further analysis.
 */
export const ImagePanel = ({
  originImageUrl,
  originImageWidth,
  originImageHeight,
  onHidePanel,
  onShowPanel,
  onCancel,
  changeImagePanelPosition,
  searchPicture
}: ImagePanelProps): ReactElement => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  /**
   * Listen to command manager events to show/hide panel during operations
   */
  useEffect(() => {
    const commandManager = HSApp.App.getApp().cmdManager;

    const handleCommandStarting = (event: CommandEvent): void => {
      const commandType = event?.data?.cmd?.type;
      if (
        commandType === HSFPConstants.CommandType.PlaceProduct ||
        commandType === HSFPConstants.CommandType.Decoration
      ) {
        onHidePanel();
      }
    };

    const handleCommandTerminated = (event: CommandEvent): void => {
      const commandType = event?.data?.cmd?.type;
      if (
        commandType === HSFPConstants.CommandType.PlaceProduct ||
        commandType === HSFPConstants.CommandType.Decoration
      ) {
        onShowPanel();
      }
    };

    commandManager.signalCommandStarting.listen(handleCommandStarting);
    commandManager.signalCommandTerminated.listen(handleCommandTerminated);

    return () => {
      commandManager.signalCommandStarting.unlisten(handleCommandStarting);
      commandManager.signalCommandTerminated.unlisten(handleCommandTerminated);
    };
  }, [onHidePanel, onShowPanel]);

  /**
   * Adjust panel position on mount and updates
   */
  useEffect(() => {
    changeImagePanelPosition();
  });

  /**
   * Re-run recognition when image URL changes
   */
  useEffect(() => {
    performRecognition();
  }, [originImageUrl]);

  /**
   * Perform image recognition and setup the anchor picker
   */
  const performRecognition = async (): Promise<void> => {
    setHasError(false);
    setIsLoading(true);

    try {
      const recognitionResult = await recognizeImage(originImageUrl);
      setIsLoading(false);

      const { boxList } = recognitionResult;
      const container = canvasContainerRef.current;

      if (!container) return;

      // Clear previous content
      container.innerHTML = '';

      // Initialize image anchor picker
      const picker = new ImgAnchorPicker(originImageUrl, boxList, {
        maxWidth: container.clientWidth,
        maxHeight: container.clientHeight
      });

      container.appendChild(picker.container);

      let debounceTimer: ReturnType<typeof setTimeout>;

      // Handle region selection with debouncing
      picker.onClipBoxDraw = (position: ClipPosition): void => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const capturedImage = picker.captureImage();
          searchPicture(picker.currentBox, position, capturedImage);
        }, 300);
      };
    } catch (error) {
      setHasError(true);
    }
  };

  // Panel dimensions based on image aspect ratio
  const LANDSCAPE_DIMENSIONS = { width: 684, height: 384 };
  const PORTRAIT_DIMENSIONS = { width: 384, height: 512 };
  const panelDimensions =
    originImageWidth > originImageHeight
      ? LANDSCAPE_DIMENSIONS
      : PORTRAIT_DIMENSIONS;

  return (
    <div className="image-panel">
      <div className="image-panel-header">
        <div className="image-panel-title">
          {ResourceManager.getString('inspiration_image_search_recognize_region')}
        </div>
        <div className="image-panel-button" onClick={onHidePanel}>
          <Icons
            type="hs_xian_guanbimulu"
            style={{ fontSize: '14px' }}
            className="arrow-icon"
          />
          <div className="image-panel-button-text">
            {ResourceManager.getString('inspiration_image_search_shrink_panel')}
          </div>
        </div>
      </div>

      <div className="image-panel-content" style={panelDimensions}>
        {hasError && <ReCognitionError onRetry={performRecognition} />}
        {!hasError && isLoading && <ReCognitionLoading onCancel={onCancel} />}
        {!hasError && !isLoading && (
          <div className="image-panel-canvas-container" ref={canvasContainerRef} />
        )}
      </div>
    </div>
  );
};