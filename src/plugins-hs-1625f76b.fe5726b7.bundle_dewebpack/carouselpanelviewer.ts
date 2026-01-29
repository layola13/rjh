import React, { useRef, useState, useEffect } from 'react';
import { IconfontView } from './IconfontView';
import { EntitySelector } from './EntitySelector';
import { VIEWER_WIDTH, VIEWER_HEIGHT, CURSOR_NOT_ALLOWED_TIP_OFFSET_LEFT, CURSOR_NOT_ALLOWED_TIP_OFFSET_TOP, cursorStyles } from './constants';
import { carouselPanelToast } from './toast';
import { getOriginImgSize, getOriginImgUrl, fitImg2Container, getResizeImgUrl } from './imageUtils';

interface ImageData {
  id?: string;
  imageUrl: string;
  isPano: boolean;
  version: string;
}

interface PayInfo {
  needPay: boolean;
  paid: boolean;
  isVip: boolean;
}

interface TooltipState {
  key: 'default' | 'can_selected_single' | 'can_selected_multi' | 'cannot_selected' | 'cannot_selected_vip';
  left?: number;
  top?: number;
  reason?: string;
}

interface CarouselPanelViewerProps {
  img: ImageData;
  baseHouseDataUrl: string;
  payInfo?: PayInfo;
  handleUnlock: (source: string) => void;
}

export const CarouselPanelViewer: React.FC<CarouselPanelViewerProps> = ({
  img,
  baseHouseDataUrl,
  payInfo,
  handleUnlock
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const toastShownRef = useRef<number>(0);
  const [viewerSize, setViewerSize] = useState<[number, number]>([VIEWER_WIDTH, VIEWER_HEIGHT]);
  const [tooltipState, setTooltipState] = useState<TooltipState>({ key: 'default' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<Error | undefined>();
  const [isEntityHovered, setIsEntityHovered] = useState<boolean>(false);
  const [isPickAllHovered, setIsPickAllHovered] = useState<boolean>(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = HSApp.App.getApp();
    const autostylerPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Autostyler);
    const strategyManager = autostylerPlugin?.getStrategyManager();
    const entitySelector = new EntitySelector();

    entitySelector.on('load-start', () => {
      setIsLoading(true);
      setLoadError(undefined);
    });

    entitySelector.on('load-end', (error?: Error) => {
      setIsLoading(false);
      setLoadError(error);
      
      if (error) {
        console.error(error);
      } else if (toastShownRef.current === 0) {
        toastShownRef.current = 1;
        carouselPanelToast.show();
      }
    });

    entitySelector.on('enter', () => {
      setIsEntityHovered(true);
    });

    entitySelector.on('leave', () => {
      setIsEntityHovered(false);
    });

    entitySelector.on('hover', (event: MouseEvent, entityIds: string[], flatIds: string[], selectedIds?: string[]) => {
      const updateTooltip = (key: TooltipState['key'], hoverIds: string[], reason?: string) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const left = event.pageX - rect.x + CURSOR_NOT_ALLOWED_TIP_OFFSET_LEFT;
        const top = event.pageY - rect.y - CURSOR_NOT_ALLOWED_TIP_OFFSET_TOP;
        
        setTooltipState({ key, left, top, reason });
        entitySelector.setHoverIds(entityIds, hoverIds);
      };

      updateTooltip('default', []);

      if (!strategyManager) return;

      const flatResult = strategyManager.getFlatEntityIds(flatIds, img.version);
      const validIds = flatResult.ids;
      const invalidReason = flatResult.reason;

      if (validIds.length > 0) {
        if (selectedIds && selectedIds.toString() === validIds.toString()) {
          updateTooltip('can_selected_multi', validIds);
          return;
        }

        if (selectedIds && selectedIds.length > 0) {
          const combinedIds = [...selectedIds, ...validIds];
          if (strategyManager.isOnlyCanSelectOne(combinedIds)) {
            updateTooltip('cannot_selected', [], 'carousel_panel_viewer_entity_not_highlightable_with_others');
            return;
          }
        }

        const key = selectedIds ? 'can_selected_multi' : 'can_selected_single';
        updateTooltip(key, validIds);
      } else {
        const reason = invalidReason || (selectedIds 
          ? 'carousel_panel_viewer_entity_not_highlightable_with_others' 
          : 'carousel_panel_viewer_entity_not_highlightable_itself');
        updateTooltip('cannot_selected', [], reason);
      }
    });

    entitySelector.on('create', (entityIds: string[]) => {
      app.userTrackLogger.push('catalog.templateRoom.CarouselPanel', {
        activeSection: 'templateRoom',
        activeSectionName: '灵感库',
        description: '点击画布上模型',
        clicksRatio: {
          id: 'canvasModel',
          name: '拾取画布模型'
        }
      }, {});

      if (!payInfo || !payInfo.needPay || payInfo.paid || payInfo.isVip) {
        autostylerPlugin?.createPickupModel(entityIds, img.version);
        setTooltipState({ key: 'default' });
        entitySelector.resetState();
      } else {
        handleUnlock('canvasModel');
      }
    });

    const initViewer = async () => {
      try {
        const originImgUrl = getOriginImgUrl(img.imageUrl);
        const [originWidth, originHeight] = await getOriginImgSize(originImgUrl);
        const fittedSize = fitImg2Container(VIEWER_WIDTH, VIEWER_HEIGHT, originWidth, originHeight);
        setViewerSize(fittedSize);

        await strategyManager?.initData(baseHouseDataUrl, img.version);

        entitySelector.load(canvasRef.current!, {
          imageUrl: img.imageUrl,
          isPano: img.isPano,
          width: fittedSize[0],
          height: fittedSize[1]
        });
      } catch (error) {
        setLoadError(error as Error);
        console.error(error);
      }
    };

    initViewer();

    return () => {
      entitySelector.unmount();
    };
  }, [img, baseHouseDataUrl, payInfo, handleUnlock]);

  const [displayWidth, displayHeight] = img.isPano ? [VIEWER_WIDTH, VIEWER_HEIGHT] : viewerSize;
  const offsetX = 0.5 * (VIEWER_WIDTH - displayWidth);
  const offsetY = 0.5 * (VIEWER_HEIGHT - displayHeight);
  const tooltipLeft = offsetX + (tooltipState.left || 0);
  const tooltipTop = offsetY + (tooltipState.top || 0);
  const imageOffsetX = 0.5 * (VIEWER_WIDTH - viewerSize[0]);
  const imageOffsetY = 0.5 * (VIEWER_HEIGHT - viewerSize[1]);
  const showVipMark = payInfo?.needPay && payInfo?.isVip;

  const hasBackground = Math.abs(viewerSize[0] - VIEWER_WIDTH) > 2 || Math.abs(viewerSize[1] - VIEWER_HEIGHT) > 2;

  const handlePickAll = () => {
    const app = HSApp.App.getApp();
    app.userTrackLogger.push('catalog.templateRoom.CarouselPanel', {
      activeSection: 'templateRoom',
      activeSectionName: '灵感库',
      description: '点击拾取全部',
      clicksRatio: {
        id: 'pickAllmodel',
        name: '拾取全部'
      }
    }, {});

    if (!payInfo || !payInfo.needPay || payInfo.paid || payInfo.isVip) {
      const autostylerPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Autostyler);
      autostylerPlugin?.createPickupModelByRoomId(img.id!, img.version);
    } else {
      handleUnlock('pickAllmodel');
    }
  };

  return (
    <div
      className="carousel-panel-viewer"
      style={{
        width: VIEWER_WIDTH,
        height: VIEWER_HEIGHT,
        background: hasBackground ? 'rgba(0, 0, 0, 0.8)' : 'none'
      }}
    >
      <div
        className="carousel-panel-viewer-canvas-container"
        ref={canvasRef}
        style={{
          cursor: cursorStyles[tooltipState.key],
          left: offsetX,
          top: offsetY,
          width: displayWidth,
          height: displayHeight
        }}
      />

      {isLoading && (
        <div className="carousel-panel-viewer-loading">
          <div className="carousel-panel-viewer-loading-text">
            {ResourceManager.getString(
              img.isPano ? 'carousel_panel_viewer_loading_pano' : 'carousel_panel_viewer_loading_normal'
            )}
          </div>
        </div>
      )}

      {!isLoading && loadError && (
        <div
          className="carousel-panel-viewer-img-container"
          style={{
            left: imageOffsetX,
            top: imageOffsetY,
            width: viewerSize[0],
            height: viewerSize[1]
          }}
        >
          <img src={getResizeImgUrl(img.imageUrl, viewerSize[0], viewerSize[1])} alt="" />
        </div>
      )}

      {!isLoading && !loadError && img.isPano && (
        <div className="carousel-panel-viewer-pano-mark">
          <IconfontView
            showType="hs_mian_quanjing"
            customStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
          />
          <span style={{ marginLeft: 4 }}>
            {ResourceManager.getString('carousel_panel_viewer_pano_mark')}
          </span>
        </div>
      )}

      {!isLoading && showVipMark && (
        <div className="carousel-panel-viewer-vip-mark">
          <IconfontView
            showType="hs_zhanshi_styler"
            customStyle={{ fontSize: '20px', opacity: 0.8 }}
          />
        </div>
      )}

      {!isLoading && !loadError && img.isPano && !isEntityHovered && (
        <div className="carousel-panel-viewer-pano-tip">
          {ResourceManager.getString('carousel_panel_viewer_pano_tip')}
        </div>
      )}

      {isEntityHovered && tooltipState.key === 'cannot_selected' && (
        <div
          className="carousel-panel-viewer-cursor-not-allowed-tip"
          style={{ left: tooltipLeft, top: tooltipTop }}
        >
          {ResourceManager.getString(tooltipState.reason!)}
        </div>
      )}

      {isEntityHovered && tooltipState.key === 'can_selected_multi' && (
        <div
          className="carousel-panel-viewer-cursor-add-tip"
          style={{ left: tooltipLeft, top: tooltipTop }}
        >
          {ResourceManager.getString('carousel_panel_viewer_entity_add_tip')}
        </div>
      )}

      {isEntityHovered && tooltipState.key === 'cannot_selected_vip' && (
        <div
          className="carousel-panel-viewer-vip-not-selected"
          style={{ left: tooltipLeft, top: tooltipTop }}
        >
          <div className="carousel-panel-viewer-tips">
            {ResourceManager.getString(tooltipState.reason!)}
          </div>
        </div>
      )}

      {img.id && !isLoading && !loadError && (
        <div
          className={`carousel-panel-viewer-pickall ${isPickAllHovered ? 'carousel-panel-viewer-pickall-hover' : ''}`}
          onMouseEnter={() => setIsPickAllHovered(true)}
          onMouseLeave={() => setIsPickAllHovered(false)}
          onClick={handlePickAll}
        >
          <IconfontView
            showType="hs_mian_yijianshiqu"
            customStyle={{
              fontSize: '16px',
              color: isPickAllHovered ? '#396EFE' : '#33353B'
            }}
          />
          <div className="text">
            {ResourceManager.getString('carousel_panel_viewer_pick_all_btn')}
          </div>
        </div>
      )}
    </div>
  );
};