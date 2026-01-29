import React, { useState } from 'react';
import defaultErrorImage from './default-error-image';

interface PicRenderProps {
  picUrl?: string;
  fileType?: string;
}

interface MediaComponentProps {
  type: string;
  className: string;
  src: string;
  onError: () => void;
}

type MediaComponent = React.ComponentType<MediaComponentProps> | string;

interface MediaTypeConfig {
  component: MediaComponent;
}

const MEDIA_TYPE_MAP: Record<string, MediaTypeConfig> = {
  'image/png': {
    component: 'img'
  },
  'image/jpeg': {
    component: 'img'
  },
  'image/gif': {
    component: 'img'
  },
  'video/mp4': {
    component: (props: MediaComponentProps) => (
      <video
        className={props.className}
        controls={true}
        loop={true}
        preload="auto"
        onError={props.onError}
      >
        <source src={props.src} type="video/mp4" />
      </video>
    )
  }
};

export const PicRender: React.FC<PicRenderProps> = ({ picUrl, fileType }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  let MediaComponent: MediaComponent | undefined;

  if (picUrl && fileType && MEDIA_TYPE_MAP[fileType]) {
    MediaComponent = MEDIA_TYPE_MAP[fileType].component;
  }

  const handleError = (): void => {
    setHasError(true);
  };

  return (
    <div className="image-modal-player">
      {MediaComponent && !hasError && (
        <MediaComponent
          type={fileType!}
          className="pic-render"
          src={picUrl!}
          onError={handleError}
        />
      )}
      {hasError && (
        <img className="pic-render" src={defaultErrorImage} />
      )}
    </div>
  );
};