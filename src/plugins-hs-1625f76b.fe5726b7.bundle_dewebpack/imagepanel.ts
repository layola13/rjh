import { useRef, useState, useEffect } from 'react';
import React from 'react';
import { Icons } from './Icons';
import { ReCognitionLoading } from './ReCognitionLoading';
import { ReCognitionError } from './ReCognitionError';
import { recognizeImage } from './recognizeImage';
import { ImgAnchorPicker } from './ImgAnchorPicker';
import './ImagePanel.css';

interface ImagePanelProps {
  originImageUrl: string;
  originImageWidth: number;
  originImageHeight: number;
  onHidePanel: () => void;
  onShowPanel: () => void;
  onCancel: () => void;
  changeImagePanelPosition: () => void;
  searchPicture: (box: unknown, clipData: unknown, capturedImage: string) => void;
}

interface CommandEvent {
  data?: {
    cmd?: {
      type?: string;
    };
  };
}

interface RecognitionResult {
  boxList: unknown[];
}

export const ImagePanel: React.FC<ImagePanelProps> = ({
  originImageUrl,
  originImageWidth,
  originImageHeight,
  onHidePanel,
  onShowPanel,
  onCancel,
  changeImagePanelPosition,
  searchPicture
}) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const commandManager = HSApp.App.getApp().cmdManager;

    const handleCommandStarting = (event: CommandEvent): void => {
      const commandType = event.data?.cmd?.type;
      if (
        commandType === HSFPConstants.CommandType.PlaceProduct ||
        commandType === HSFPConstants.CommandType.Decoration
      ) {
        onHidePanel();
      }
    };

    const handleCommandTerminated = (event: CommandEvent): void => {
      const commandType = event.data?.cmd?.type;
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

  useEffect(() => {
    changeImagePanelPosition();
  });

  useEffect(() => {
    performImageRecognition();
  }, [originImageUrl]);

  const performImageRecognition = (): void => {
    setHasError(false);
    setIsLoading(true);

    recognizeImage(originImageUrl)
      .then((result: RecognitionResult) => {
        setIsLoading(false);
        const { boxList } = result;
        const container = canvasContainerRef.current;

        if (container) {
          container.innerHTML = '';

          const picker = new ImgAnchorPicker(originImageUrl, boxList, {
            maxWidth: container.clientWidth,
            maxHeight: container.clientHeight
          });

          container.appendChild(picker.container);

          let debounceTimer: ReturnType<typeof setTimeout>;
          picker.onClipBoxDraw = (clipData: unknown): void => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              const capturedImage = picker.captureImage();
              searchPicture(picker.currentBox, clipData, capturedImage);
            }, 300);
          };
        }
      })
      .catch(() => {
        setHasError(true);
      });
  };

  const contentStyle =
    originImageWidth > originImageHeight
      ? { width: 684, height: 384 }
      : { width: 384, height: 512 };

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
      <div className="image-panel-content" style={contentStyle}>
        {hasError && <ReCognitionError onRetry={performImageRecognition} />}
        {!hasError && isLoading && <ReCognitionLoading onCancel={onCancel} />}
        {!hasError && !isLoading && (
          <div className="image-panel-canvas-container" ref={canvasContainerRef} />
        )}
      </div>
    </div>
  );
};