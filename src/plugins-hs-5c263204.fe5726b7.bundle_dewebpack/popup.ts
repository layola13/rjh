import React, { useMemo } from 'react';
import { Button, IconfontView } from './components';
import './styles.css';

type MediaType = 'image' | 'video';

interface MediaComponentProps {
  src: string;
  className: string;
  key?: number;
}

interface PopupProps {
  mediaType: MediaType;
  src: string;
  stepNumber: number;
  stepTotal: number;
  moreUrl: string;
  title: string;
  desc: string;
  onNext: () => void;
  onSkipAll: () => void;
  onFinish: () => void;
  onLearnMore?: () => void;
}

const ImageComponent: React.FC<MediaComponentProps> = ({ src, className }) => {
  return <img src={src} className={className} />;
};

const VideoComponent: React.FC<MediaComponentProps> = ({ src, className }) => {
  return (
    <video
      src={src}
      className={className}
      muted={true}
      autoPlay={true}
      controls={false}
      loop={true}
    />
  );
};

const mediaComponents: Record<MediaType, React.FC<MediaComponentProps>> = {
  image: ImageComponent,
  video: VideoComponent,
};

export const Popup: React.FC<PopupProps> = ({
  mediaType,
  src,
  stepNumber,
  stepTotal,
  moreUrl,
  title,
  desc,
  onNext,
  onSkipAll,
  onFinish,
  onLearnMore,
}) => {
  const isLastStep = stepNumber + 1 === stepTotal;

  const mediaElement = useMemo(() => {
    const MediaComponent = mediaComponents[mediaType];
    return MediaComponent ? (
      <MediaComponent key={stepNumber} className="img" src={src} />
    ) : null;
  }, [stepNumber, mediaType, src]);

  const handleLearnMoreClick = (): void => {
    window.open(moreUrl, '_blank');
    onLearnMore?.();
  };

  const handleActionButtonClick = (): void => {
    if (isLastStep) {
      onFinish();
    } else {
      onNext();
    }
  };

  const isFpTenant = HSApp.Config.TENANT === 'fp';

  return (
    <div className="popup-wrapper">
      {mediaElement}
      <div className="title">
        <span className="title-step-number">{stepNumber + 1}</span>
        <span className="title-step-total">/{stepTotal}</span>
        <span className="title-text">{title}</span>
      </div>
      <div className="desc">{desc}</div>
      {isFpTenant && (
        <Button
          className="learn-more-btn"
          type="text"
          onClick={handleLearnMoreClick}
        >
          <div className="learn-more-btn-text">
            <span>{ResourceManager.getString('new_guide_learn_more')}</span>
            <IconfontView
              showType="hs_xiao_danjiantou_you"
              customStyle={{
                fontSize: '10px',
                color: 'inherit',
              }}
              bgExtendSize={10}
            />
          </div>
        </Button>
      )}
      <div className="bottoms">
        <Button className="skip-all-btn" type="text" onClick={onSkipAll}>
          {ResourceManager.getString('new_guide_skip_all')}
        </Button>
        <Button
          key={stepNumber}
          className="next-btn"
          type="primary"
          onClick={handleActionButtonClick}
        >
          {isLastStep
            ? ResourceManager.getString('new_guide_finish')
            : ResourceManager.getString('new_guide_next')}
        </Button>
      </div>
    </div>
  );
};