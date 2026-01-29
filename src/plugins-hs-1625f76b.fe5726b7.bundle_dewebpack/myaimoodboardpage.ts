import React, { useRef, useState, useEffect, RefObject } from 'react';
import { Tooltip } from 'antd';
import { IconfontRadiusView, Loading } from './IconComponents';
import { AiMoodboardPage } from './AiMoodboardPage';
import refreshIcon from './assets/refresh.png';
import './MyAiMoodboardPage.css';

interface MyAiMoodboardPageProps {
  closePanel?: () => void;
  showBack?: boolean;
  backClick?: () => void;
  isRefreshModeler?: boolean;
  setRefreshModeler?: (value: boolean) => void;
  isGenerating?: boolean;
  setIsGenerating?: (value: boolean) => void;
  pageRef?: RefObject<HTMLDivElement>;
}

interface AiMoodboardPageRef {
  getInitData: () => Promise<void>;
}

type RefreshType = 'manual' | 'auto';

const PANEL_WIDTH = '280px';
const HEADER_HEIGHT = 60;
const ICON_SIZE = '30px';
const ICON_FONT_SIZE = '20px';
const BACKGROUND_COLOR = '#F5F5F5';
const MOUSE_DOWN_COLOR = '#396efe';
const MOUSE_UP_COLOR = '#1c1c1c';

export const MyAiMoodboardPage: React.FC<MyAiMoodboardPageProps> = ({
  closePanel,
  showBack,
  backClick,
  isRefreshModeler,
  setRefreshModeler,
  isGenerating,
  setIsGenerating,
  pageRef
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const moodboardRef = useRef<AiMoodboardPageRef>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  /**
   * Refresh the moodboard data
   * @param refreshType - Type of refresh operation ('manual' or 'auto')
   */
  const handleRefresh = (refreshType?: RefreshType): void => {
    if (refreshType === 'manual' && setIsGenerating) {
      setIsGenerating(false);
    }

    setIsRefreshing(true);
    moodboardRef.current?.getInitData().finally(() => {
      setIsRefreshing(false);
    });
  };

  /**
   * Get the height of the container element
   * @returns The calculated height minus header height
   */
  const getContainerHeight = (): number => {
    const targetRef = pageRef ?? containerRef;
    const element = targetRef?.current;
    
    if (!element) {
      return 0;
    }

    const rect = element.getBoundingClientRect();
    return rect.height - HEADER_HEIGHT;
  };

  useEffect(() => {
    if (isRefreshModeler) {
      handleRefresh();
      setRefreshModeler?.(false);
    }
  }, [isRefreshModeler, setRefreshModeler]);

  return (
    <div
      ref={containerRef}
      className="my-ai-moodboard-page"
      style={{
        width: PANEL_WIDTH,
        height: '100%',
        background: 'white'
      }}
    >
      <div className="my-ai-moodboard-page-header">
        <div className="left">
          {showBack && (
            <div onClick={backClick}>
              <IconfontRadiusView
                showType="hs_xian_fanhui"
                mouseDownColor={MOUSE_DOWN_COLOR}
                mouseUpColor={MOUSE_UP_COLOR}
                background={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  borderRadius: ICON_SIZE,
                  background: BACKGROUND_COLOR
                }}
              />
            </div>
          )}
          <div className="title">
            {ResourceManager.getString('toolbar_view_render_results')}
          </div>
        </div>

        <div className="right">
          <div
            className="refresh-container"
            onClick={() => handleRefresh('manual')}
          >
            {isRefreshing ? (
              <div className="refresh-icon">
                <img src={refreshIcon} alt="refreshing" />
              </div>
            ) : (
              <Tooltip
                title={ResourceManager.getString('model_charge_pay_refresh')}
                placement="top"
                color="dark"
              >
                <div>
                  <IconfontRadiusView
                    showType="hs_icon_chongshi"
                    customStyle={{
                      fontSize: ICON_FONT_SIZE
                    }}
                    background={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      borderRadius: '50%',
                      background: BACKGROUND_COLOR
                    }}
                  />
                </div>
              </Tooltip>
            )}
          </div>

          {closePanel && (
            <div onClick={closePanel}>
              <IconfontRadiusView
                showType="hs_xian_guanbi"
                customStyle={{
                  fontSize: ICON_FONT_SIZE,
                  color: 'black'
                }}
                mouseDownColor={MOUSE_DOWN_COLOR}
                mouseUpColor={MOUSE_UP_COLOR}
                background={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  borderRadius: ICON_SIZE,
                  background: BACKGROUND_COLOR
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="my-ai-moodboard-page-content">
        {isGenerating && (
          <div className="is-generating">
            <Loading />
          </div>
        )}
        <AiMoodboardPage
          ref={moodboardRef}
          getContainerHeight={getContainerHeight}
        />
      </div>
    </div>
  );
};