import React, { useRef, useState } from 'react';
import { DraggableModal, IconfontView, Marquee } from './components';

interface EmergencyNoticeData {
  title: string;
  message: string;
  detailsUrl?: string;
}

interface EmergencyNoticeProps {
  data: EmergencyNoticeData;
  handleClose: () => void;
}

interface DraggableConfig {
  initialWidth: number;
  initialHeight: number;
  draggable: {
    handle: string;
    cancel: string;
    onStart: () => void;
    onStop: () => void;
    icon: React.ReactElement;
  };
  bounds: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
  barPosition: string;
  zoomable: {
    height: () => { min: number };
  };
  axis: string;
  contentAutoSize: boolean;
}

const INITIAL_WIDTH = 184;
const INITIAL_HEIGHT = 30;
const MIN_HEIGHT = 30;
const Z_INDEX = 1004;
const RIGHT_POSITION = 139;
const TOP_POSITION = 7;
const ICON_FONT_SIZE_LARGE = '16px';
const ICON_FONT_SIZE_MEDIUM = '14px';
const ICON_FONT_SIZE_SMALL = '12px';
const MARQUEE_SPEED = 25;
const MARQUEE_INTERVAL_PIXELS = 30;

export const EmergencyNotice: React.FC<EmergencyNoticeProps> = ({ data, handleClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const draggableConfig: DraggableConfig = {
    initialWidth: INITIAL_WIDTH,
    initialHeight: INITIAL_HEIGHT,
    draggable: {
      handle: 'zoom-content',
      cancel: 'notice-content',
      onStart: () => {
        setIsDragging(true);
      },
      onStop: () => {
        setIsDragging(false);
      },
      icon: (
        <IconfontView
          showType="hs_jinjigonggao_tuozhuai"
          customStyle={{ fontSize: ICON_FONT_SIZE_SMALL }}
          bgExtendSize={0}
        />
      ),
    },
    bounds: {
      top: 0,
      left: 0,
      bottom: document.documentElement.clientHeight,
      right: document.documentElement.clientWidth,
    },
    barPosition: 'left',
    zoomable: {
      height: () => ({ min: MIN_HEIGHT }),
    },
    axis: 'x',
    contentAutoSize: true,
  };

  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  const handleMouseOut = (): void => {
    setIsHovered(false);
  };

  const handleCloseClick = (event: React.MouseEvent): void => {
    handleClose();
    event.stopPropagation();
  };

  const handleDetailClick = (): void => {
    if (data.detailsUrl) {
      window.open(data.detailsUrl);
    }
  };

  const shouldShowContent = isHovered && !isDragging;

  return (
    <DraggableModal
      style={{
        position: 'absolute',
        zIndex: Z_INDEX,
        right: RIGHT_POSITION,
        top: TOP_POSITION,
        background: '#FFFBF9',
      }}
      {...draggableConfig}
    >
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className="drag-title">
          <IconfontView
            customStyle={{ fontSize: ICON_FONT_SIZE_LARGE }}
            showType="hs_shuxingmianban_xiangqing-copy"
          />
          <Marquee
            className="text"
            pauseOnHover={true}
            gradient={false}
            speed={MARQUEE_SPEED}
            intervalPixels={MARQUEE_INTERVAL_PIXELS}
          >
            {data.title}
          </Marquee>
          <IconfontView
            customStyle={{ fontSize: ICON_FONT_SIZE_MEDIUM }}
            showType="hs_shuidian_peidian_duanluqi1-copy"
            iconOnclick={handleCloseClick}
          />
        </div>
        <div
          ref={contentRef}
          className="notice-content"
          style={{ display: shouldShowContent ? 'block' : 'none' }}
        >
          <div className="notice-text">{data.message}</div>
          {data.detailsUrl && (
            <div className="notice-footer">
              <p onClick={handleDetailClick} className="detail-link">
                {ResourceManager.getString('check_detail')}
              </p>
            </div>
          )}
        </div>
      </div>
    </DraggableModal>
  );
};