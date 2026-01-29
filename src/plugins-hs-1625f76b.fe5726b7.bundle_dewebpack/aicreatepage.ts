import { useState, useEffect, useRef } from 'react';
import { HSApp } from './HSApp';
import { IconfontView, Tooltip } from './components';
import { IconfontRadiusView, Loading } from './commonComponents';
import { MyAiPageDraggable } from './MyAiPageDraggable';
import './styles.css';

interface AICreatePageConfig {
  logoIcon: string;
  listEvent: string;
  listTitle: string;
  tutorialUrl: string;
  tutorialEvent: string;
  iframeUrl: string;
  pageId: string;
  contentComponent?: React.ComponentType<AIContentComponentProps>;
}

interface AICreatePageProps {
  closePanel: () => void;
  config: AICreatePageConfig;
}

interface AIContentComponentProps {
  handleOpenAIAlbum: () => void;
  startGenerateCallback: () => void;
}

interface MessageEventData {
  eType: string;
  eData?: {
    marketType?: string;
    sceneType?: string;
  };
}

interface PostMessageData {
  eType: string;
}

const POLLING_TIMEOUT_MS = 5000;
const LIVE_HINT_DURATION_MS = 3000;
const ICON_FONT_SIZE = '120px';
const SMALL_ICON_FONT_SIZE = '20px';
const ICON_BACKGROUND_SIZE = '30px';
const STORAGE_KEY_CREATE_AI_MODELER_TIP = 'create_ai_modeler_tip';

export const AICreatePage: React.FC<AICreatePageProps> = ({ closePanel, config }) => {
  const [isAlbumOpen, setIsAlbumOpen] = useState<boolean>(false);
  const [isRefreshModeler, setIsRefreshModeler] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pollingTimeoutRef = useRef<number | null>(null);

  const isWhiteLabelHideTutorial = adskUser.checkBenefit('whiteLabel', 'hideNewTutorial')?.useful;
  const ContentComponent = config.contentComponent;

  const stopPolling = (): void => {
    iframeRef.current?.contentWindow?.postMessage(
      { eType: 'stopPolling' } as PostMessageData,
      '*'
    );
  };

  const startPollingTimeout = (): void => {
    pollingTimeoutRef.current = window.setTimeout(() => {
      setIsRefreshModeler(true);
      setIsGenerating(false);
      stopPolling();
    }, POLLING_TIMEOUT_MS);
  };

  const handleStartGenerate = (pageName: string): void => {
    setIsGenerating(true);
    setIsAlbumOpen(true);

    const storage = new HSApp.Util.Storage(HSFPConstants.PluginType.Catalog);
    const hasShownTip = storage.get(STORAGE_KEY_CREATE_AI_MODELER_TIP);

    if (hasShownTip !== 'true') {
      const tipMessage = ResourceManager.getString('close_ai_page_tips').replace('{page}', pageName);
      const actionText = ResourceManager.getString('update_design_not_remind');
      const fullMessage = `${tipMessage} <span class='action'>${actionText}</span>`;

      LiveHint.show(
        fullMessage,
        LIVE_HINT_DURATION_MS,
        () => {
          storage.set(STORAGE_KEY_CREATE_AI_MODELER_TIP, 'true');
        },
        { canclose: true }
      );
    }
  };

  const handleShowAIMarket = (eventData: MessageEventData['eData']): void => {
    if (!eventData) return;

    const marketingBadgePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.MarketingBadge
    );

    if (marketingBadgePlugin) {
      marketingBadgePlugin.showMarketModal(
        eventData.marketType,
        eventData.sceneType ?? 'ai_modeler',
        {
          onClose: () => {
            iframeRef.current?.contentWindow?.postMessage(
              { eType: 'closeMarket' } as PostMessageData,
              '*'
            );
          }
        }
      );
    }
  };

  const handleMessage = (event: MessageEvent<MessageEventData>): void => {
    if (!event.data) return;

    const { eType, eData } = event.data;

    switch (eType) {
      case 'showAIMarket':
        handleShowAIMarket(eData);
        break;
      case 'openAIAlbum':
        startPollingTimeout();
        break;
      case 'aigcIdentifyFail':
        setIsGenerating(false);
        break;
      case 'generateAI':
        const pageName = eData?.sceneType === 'ai_moodboard' ? 'AI Moodboard' : 'AI Modeler';
        handleStartGenerate(pageName);
        break;
    }
  };

  const handleOpenList = (): void => {
    setIsAlbumOpen(true);
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      config.listEvent
    );
  };

  const handleOpenTutorial = (): void => {
    window.open(config.tutorialUrl, '_blank');
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      config.tutorialEvent
    );
  };

  const searchModel = (query: string): Promise<unknown> => {
    const apiManager = HSApp.Catalog.BaseApiManager.getInstance();
    return adskUser.enterpriseId
      ? apiManager.dataManager.enterpriseProductsSearch(query)
      : Promise.resolve([]);
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, [isAlbumOpen]);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        setIsIframeLoading(false);
      };
    }

    return () => {
      if (pollingTimeoutRef.current) {
        clearTimeout(pollingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="ai-create-page" ref={containerRef}>
        <div className="ai-create-page-header">
          <div className="ai-top">
            <div className="ai-logo">
              <IconfontView
                showType={config.logoIcon}
                customStyle={{ fontSize: ICON_FONT_SIZE }}
              />
            </div>
            <div className="ai-icons">
              <div className="ai-icon" onClick={handleOpenList}>
                <Tooltip
                  title={ResourceManager.getString(config.listTitle)}
                  placement="top"
                  color="dark"
                >
                  <div>
                    <IconfontRadiusView
                      showType="hs_xian_liebiao"
                      customStyle={{
                        fontSize: SMALL_ICON_FONT_SIZE,
                        color: 'white'
                      }}
                      background={{
                        width: ICON_BACKGROUND_SIZE,
                        height: ICON_BACKGROUND_SIZE,
                        borderRadius: ICON_BACKGROUND_SIZE,
                        background: 'rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </div>
                </Tooltip>
              </div>
              <div className="ai-icon" onClick={closePanel}>
                <IconfontRadiusView
                  showType="hs_xian_guanbi"
                  customStyle={{
                    fontSize: SMALL_ICON_FONT_SIZE,
                    color: 'white'
                  }}
                  background={{
                    width: ICON_BACKGROUND_SIZE,
                    height: ICON_BACKGROUND_SIZE,
                    borderRadius: ICON_BACKGROUND_SIZE,
                    background: 'rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
            </div>
            {!isWhiteLabelHideTutorial && (
              <div className="ai-tutorial" onClick={handleOpenTutorial}>
                {ResourceManager.getString('page_header_3D_video_course_tip')}
              </div>
            )}
          </div>
        </div>

        {ContentComponent ? (
          <ContentComponent
            handleOpenAIAlbum={startPollingTimeout}
            startGenerateCallback={() => handleStartGenerate('AI Texturer')}
          />
        ) : (
          <>
            {isIframeLoading && <Loading />}
            <iframe
              ref={iframeRef}
              style={{
                width: '100%',
                height: 'calc(100% - 80px)',
                marginTop: '-15px'
              }}
              src={`https://${HSApp.Config.EZHOME_HOST}${config.iframeUrl}`}
            />
          </>
        )}
      </div>

      <div style={{ display: isAlbumOpen ? 'block' : 'none' }}>
        <MyAiPageDraggable
          pageId={config.pageId}
          pageRef={containerRef}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
          closePanel={() => setIsAlbumOpen(false)}
          isRefreshModeler={isRefreshModeler}
          setRefreshModeler={setIsRefreshModeler}
          searchModel={adskUser.enterpriseId ? searchModel : undefined}
          stopPolling={stopPolling}
          noResultHint={ResourceManager.getString('inspiration_image_search_no_result')}
        />
      </div>
    </>
  );
};