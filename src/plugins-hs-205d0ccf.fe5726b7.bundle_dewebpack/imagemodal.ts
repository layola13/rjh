import React, { useState } from 'react';
import { useTheme } from './theme';
import { AwakeTypeEnum, useRemindModalContext } from './context';
import { Slider } from './Slider';
import { GotoTeaching } from './GotoTeaching';
import { PicRender } from './PicRender';
import IconComponent from './IconComponent';
import starIcon from './assets/star-icon.png';

interface ImageModalContent {
  picUrl: string;
  fileType: string;
  introduction: string;
  title: string;
  articleUrl?: string;
  marketUrl?: string;
}

interface ImageModalProps {
  type: AwakeTypeEnum;
  data: ImageModalContent[];
}

interface ModalConfig {
  width: number;
  height: number;
}

interface ImageModalItemProps {
  content: ImageModalContent;
  type: AwakeTypeEnum;
  onGotoTeachingMouseEnter?: () => void;
  onGotoTeachingMouseLeaver?: () => void;
}

interface StarsProps {
  count?: number;
}

const DEFAULT_MODAL_CONFIG: Record<AwakeTypeEnum, ModalConfig> = {
  [AwakeTypeEnum.ImageModal]: {
    width: 464,
    height: 394,
  },
  [AwakeTypeEnum.TitleModal]: {
    width: 464,
    height: 134,
  },
};

export function ImageModal(props: ImageModalProps): JSX.Element | null {
  const { type, data } = props;
  
  const config = DEFAULT_MODAL_CONFIG[type];
  if (!config) {
    return null;
  }

  const { width, height } = config;
  const theme = useTheme();
  const sliderTheme = theme === 'teaching-light' ? 'light' : 'black';
  const { close } = useRemindModalContext();
  const [autoSlider, setAutoSlider] = useState<boolean>(true);

  const handleGotoTeachingMouseEnter = (): void => {
    setAutoSlider(false);
  };

  const handleGotoTeachingMouseLeave = (): void => {
    setAutoSlider(true);
  };

  const handleClose = (): void => {
    close?.();
  };

  return (
    <div className={`image-modal-wrapper ${theme}`}>
      <div className="image-modal-top">
        <div className="image-modal-title">
          {ResourceManager.getString('plugin_teaching_heavy_update')}
        </div>
        <Stars />
        <div className="top-close" onClick={handleClose}>
          <IconComponent className="round-icon-o" type="hs_xian_guanbi" />
        </div>
      </div>
      <div className="image-modal-content">
        {data.length === 1 && (
          <div className="one-item-wrapper">
            <ImageModalItem content={data[0]} type={type} />
          </div>
        )}
        {data.length > 1 && (
          <Slider
            theme={sliderTheme}
            width={width}
            height={height}
            autoSlider={autoSlider}
          >
            {data.map((item, index) => (
              <ImageModalItem
                key={index}
                content={item}
                type={type}
                onGotoTeachingMouseEnter={handleGotoTeachingMouseEnter}
                onGotoTeachingMouseLeaver={handleGotoTeachingMouseLeave}
              />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

function ImageModalItem(props: ImageModalItemProps): JSX.Element {
  const { content, type, onGotoTeachingMouseEnter, onGotoTeachingMouseLeaver } = props;
  const { picUrl, fileType, introduction, title, articleUrl, marketUrl } = content;

  return (
    <div className="image-modal-item">
      {type === AwakeTypeEnum.ImageModal && (
        <PicRender fileType={fileType} picUrl={picUrl} />
      )}
      <div className="image-modal-word">
        <div className="image-modal-word-title">{title}</div>
        <div className="image-modal-word-introduction">{introduction}</div>
        {articleUrl && marketUrl && (
          <div
            className="goto-wrapper"
            onMouseEnter={onGotoTeachingMouseEnter}
            onMouseLeave={onGotoTeachingMouseLeaver}
          >
            <GotoTeaching className="image-modal-goto" content={content} />
          </div>
        )}
      </div>
    </div>
  );
}

function Stars(props: StarsProps): JSX.Element {
  const { count = 3 } = props;

  return (
    <div className="image-modal-xing-wrapper">
      {new Array(count).fill(1).map((_, index) => (
        <img key={index} src={starIcon} alt="star" />
      ))}
    </div>
  );
}