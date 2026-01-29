import { useRef, useState, useEffect, useMemo, Fragment } from 'react';
import { HSCatalog } from './HSCatalog';
import { Button, SmartText, IconfontView } from './UIComponents';
import { CarouselPanelViewer } from './CarouselPanelViewer';
import { SimpleViewer } from './SimpleViewer';
import { CarouselPanelNav } from './CarouselPanelNav';
import { carouselPanelToast } from './ToastManager';
import badgeSymbolIcon from './assets/badge-symbol.png';

interface ImageItem {
  version: string;
  imageUrl: string;
  miniImageUrl: string;
  isPano: boolean;
  label?: string;
  copyright?: string;
}

interface PayInfo {
  needPay: boolean;
  paid: boolean;
  isVip: boolean;
}

interface ColorItem {
  color: string;
}

interface ButtonConfig {
  label: string;
  key: string;
  eventKey: string;
  click: (event: React.MouseEvent) => void;
}

interface CarouselData {
  name: string;
  contentType?: {
    isTypeOf: (type: unknown) => boolean;
  };
  payInfo?: PayInfo;
}

interface CarouselPanelProps {
  imgList: ImageItem[];
  data: CarouselData;
  top: number;
  buttons: ButtonConfig[];
  colorList: ColorItem[];
  type: string;
  abRAutostyler: 'A' | 'B' | '';
  baseHouseDataUrl?: string;
  jumpToModelPage: () => void;
  onClose: () => void;
}

const CAROUSEL_PANEL_LEFT_OFFSET = 342;
const CAROUSEL_PANEL_TOP_OFFSET = 10;
const CAROUSEL_PANEL_MIN_TOP = 52;
const MOUSE_MOVE_THRESHOLD = 2;

export default function CarouselPanel(props: CarouselPanelProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [hasNavigated, setHasNavigated] = useState<boolean>(false);

  const currentImage: ImageItem = props.imgList[currentImageIndex] || {
    version: '',
    imageUrl: '',
    isPano: false,
  };

  const isModelCollocation: boolean =
    props.data.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ModelCollocation) ?? false;

  const displayTitle: string =
    currentImage?.copyright
      ? `${props.data.name} — ${currentImage.copyright}`
      : props.data.name;

  const catalogLib = HSApp.Catalog.Manager.getHSCatalogLib();

  // Position adjustment effect
  useEffect(() => {
    const adjustPosition = (): void => {
      if (!containerRef.current) return;

      const windowHeight = window.innerHeight;
      let topPosition = props.top;

      if (topPosition + containerRef.current.clientHeight > windowHeight) {
        topPosition = windowHeight - containerRef.current.clientHeight - CAROUSEL_PANEL_TOP_OFFSET;
        if (topPosition < CAROUSEL_PANEL_MIN_TOP) {
          topPosition = CAROUSEL_PANEL_MIN_TOP;
        }
      }

      containerRef.current.style.top = `${topPosition}px`;
      containerRef.current.style.left = `${CAROUSEL_PANEL_LEFT_OFFSET}px`;
    };

    adjustPosition();
    window.addEventListener('resize', adjustPosition);

    return () => {
      window.removeEventListener('resize', adjustPosition);
    };
  }, [props.top]);

  // Click outside to close effect
  useEffect(() => {
    const notificationElement = document.querySelector('.homestyler-notification');
    const editor2dContainer = document.querySelector<HTMLElement>('#editor > .editor2dContainer');
    const editor3dContainer = document.querySelector<HTMLElement>('#editor > .editor3dContainer');
    const is2DMode = !!editor2dContainer;
    const editorContainer = is2DMode ? editor2dContainer : editor3dContainer;

    const handleMouseDown = (mouseDownEvent: MouseEvent): void => {
      const isClickInsidePanel = containerRef.current?.contains(mouseDownEvent.target as Node);
      const isClickInsideNotification = notificationElement?.contains(mouseDownEvent.target as Node);
      const isClickInsideEditor = editorContainer?.contains(mouseDownEvent.target as Node);

      if (isClickInsidePanel || isClickInsideNotification) return;

      if (isClickInsideEditor) {
        const canvasElement = editorContainer.querySelector<HTMLElement>(
          is2DMode ? 'svg' : 'canvas'
        );
        let hasDragged = false;

        const handleMouseMove = (mouseMoveEvent: MouseEvent): void => {
          if (
            !hasDragged &&
            (Math.abs(mouseMoveEvent.pageX - mouseDownEvent.pageX) > MOUSE_MOVE_THRESHOLD ||
              Math.abs(mouseMoveEvent.pageY - mouseDownEvent.pageY) > MOUSE_MOVE_THRESHOLD)
          ) {
            hasDragged = true;
            setIsVisible(false);
            carouselPanelToast.hide();
          }
        };

        const handleMouseUp = (): void => {
          if (hasDragged) {
            setIsVisible(true);
            carouselPanelToast.show();
          } else {
            props.onClose();
          }

          canvasElement?.removeEventListener('mousemove', handleMouseMove);
          canvasElement?.removeEventListener('mouseup', handleMouseUp);
          canvasElement?.removeEventListener('mouseleave', handleMouseUp);
        };

        canvasElement?.addEventListener('mousemove', handleMouseMove);
        canvasElement?.addEventListener('mouseup', handleMouseUp);
        canvasElement?.addEventListener('mouseleave', handleMouseUp);
      } else {
        props.onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isVisible, props]);

  // Command manager effect
  useEffect(() => {
    const commandManager = HSApp.App.getApp().cmdManager;

    const handleCommandStarting = (event: unknown): void => {
      const commandType = (event as any)?.data?.cmd?.type;
      if (
        commandType === HSFPConstants.CommandType.AddMultiProducts ||
        commandType === HSFPConstants.CommandType.MixPaint.PickMaterialToFaces
      ) {
        setIsVisible(false);
        carouselPanelToast.hide();
      }
    };

    const handleCommandTerminated = (event: unknown): void => {
      const commandType = (event as any)?.data?.cmd?.type;
      if (
        commandType === HSFPConstants.CommandType.AddMultiProducts ||
        commandType === HSFPConstants.CommandType.MixPaint.PickMaterialToFaces
      ) {
        setIsVisible(true);
        carouselPanelToast.show();
      }
    };

    commandManager.signalCommandStarting.listen(handleCommandStarting);
    commandManager.signalCommandTerminated.listen(handleCommandTerminated);

    return () => {
      commandManager.signalCommandStarting.unlisten(handleCommandStarting);
      commandManager.signalCommandTerminated.unlisten(handleCommandTerminated);
    };
  }, []);

  const handleUnlockPromotion = (buttonKey?: string, eventKey?: string): void => {
    props.onClose();

    const marketingBadgePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.MarketingBadge
    );

    if (marketingBadgePlugin) {
      const modalType = buttonKey ? `autostyler_${buttonKey}` : 'autostyler';
      marketingBadgePlugin.showMarketModal('model', modalType);
    }

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.AutoStyler,
      eventKey,
      { origin: 'public template' }
    );

    HSApp.App.getApp().userTrackLogger.push(
      'catalog.autostyler_member_promotion',
      {
        activeSection: 'autostyler_member_promotion',
        activeSectionName: '点击会员营销推广',
        description: '会员营销推广',
        clicksRatio: {
          id: 'public_autostyler_member_promotion',
          name: '点击会员营销推广',
        },
      },
      {}
    );
  };

  const footerButtonsLayoutA = useMemo(() => {
    const payInfo = props.data.payInfo;
    const shouldShowUnlock = payInfo?.needPay && !payInfo.paid && !payInfo.isVip && !window.isDev;

    if (!shouldShowUnlock) {
      return props.buttons.map((button, index) => (
        <Button
          key={index}
          type="default"
          onClick={(event) => {
            button.click(event);
            props.onClose();
          }}
        >
          {button.label}
        </Button>
      ));
    }

    return (
      <div className="unlock-block">
        <img className="icon-badge-symbol" src={badgeSymbolIcon} />
        <span className="unlock-text">
          {ResourceManager.getString('badge_symbol_unlock_text')}
        </span>
        {props.buttons.map((button, index) => (
          <span
            key={index}
            className="unlock-btn"
            onClick={() => handleUnlockPromotion(button.key, button.eventKey)}
          >
            {button.label}
          </span>
        ))}
      </div>
    );
  }, [props.buttons, props.data.payInfo]);

  const footerButtonsLayoutB = useMemo(() => {
    const payInfo = props.data.payInfo;
    const shouldShowUnlock = payInfo?.needPay && !payInfo.paid && !payInfo.isVip && !window.isDev;

    if (!shouldShowUnlock) {
      return props.buttons.map((button, index) => (
        <Button
          key={index}
          type="default"
          onClick={(event) => {
            button.click(event);
            props.onClose();
          }}
        >
          {button.label}
        </Button>
      ));
    }

    return (
      <div className="unlock-block unlock-block-a">
        <img className="icon-badge-symbol" src={badgeSymbolIcon} />
        {props.buttons.map((button, index) => (
          <span
            key={index}
            className="unlock-btn"
            onClick={() => handleUnlockPromotion(button.key, button.eventKey)}
          >
            {button.label}
          </span>
        ))}
      </div>
    );
  }, [props.buttons, props.data.payInfo]);

  const handleNavigateToModelPage = (): void => {
    props.jumpToModelPage();
    setIsVisible(false);
  };

  if (isModelCollocation) {
    return (
      <div
        className="carousel-panel-container"
        ref={containerRef}
        style={{
          display: isVisible ? 'block' : 'none',
          paddingTop: 15,
        }}
      >
        <SimpleViewer img={currentImage} />
      </div>
    );
  }

  return (
    <div
      className="carousel-panel-container"
      ref={containerRef}
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <div className="carousel-panel-header">
        <SmartText className="carousel-panel-title">{displayTitle}</SmartText>
        <IconfontView
          showType="hs_xian_guanbi"
          clickColor="#396EFE"
          hoverBgColor="#f5f5f5"
          bgExtendSize={10}
          iconOnclick={() => props.onClose()}
        />
      </div>

      <div className="carousel-panel-content">
        <CarouselPanelViewer
          img={currentImage}
          payInfo={props.data.payInfo}
          baseHouseDataUrl={props.baseHouseDataUrl}
          handleUnlock={handleUnlockPromotion}
        />
        {props.imgList.length > 1 && (
          <CarouselPanelNav
            items={props.imgList.map((img) => ({
              imageUrl: img.miniImageUrl,
              label: img.label,
              isPano: img.isPano,
            }))}
            activeIndex={currentImageIndex}
            onChange={(newIndex) => {
              if (newIndex !== currentImageIndex) {
                setCurrentImageIndex(newIndex);
                setHasNavigated(true);
              }
            }}
            showAnimation={hasNavigated}
          />
        )}
      </div>

      <div className={`carousel-panel-footer ${props.abRAutostyler} ${HSApp.Config.TENANT}`}>
        {props.abRAutostyler === 'A' ? (
          <Fragment>
            {props.colorList.length > 0 && props.type === 'public_styler_template_page' && (
              <div className="color-container color-container-a" onClick={handleNavigateToModelPage}>
                <div className="left">
                  <div className="text-container">
                    <div className="text">{ResourceManager.getString('colors_in_design')}</div>
                    <div className="text-right">
                      <div className="text">{ResourceManager.getString('models_inspiration')}</div>
                      <catalogLib.IconfontView
                        showType="hs_xiao_danjiantou_shang"
                        customStyle={{ fontSize: '12px' }}
                      />
                    </div>
                  </div>
                  <div className="color-list">
                    {props.colorList.map((colorItem, index) => (
                      <div
                        key={index}
                        className="color-block"
                        style={{ backgroundColor: colorItem.color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {footerButtonsLayoutB}
          </Fragment>
        ) : (
          footerButtonsLayoutA
        )}

        {props.abRAutostyler === 'B' &&
          props.colorList.length > 0 &&
          props.type === 'public_styler_template_page' && (
            <div className="color-container" onClick={handleNavigateToModelPage}>
              <div className="left">
                <div className="text">{ResourceManager.getString('community_model1')}</div>
                <div className="color-list">
                  {props.colorList.map((colorItem, index) => (
                    <div
                      key={index}
                      className="color-block"
                      style={{ backgroundColor: colorItem.color }}
                    />
                  ))}
                </div>
              </div>
              <div className="more">
                <div className="text">{ResourceManager.getString('community_try')}</div>
                <catalogLib.IconfontView
                  showType="hs_xian_go"
                  customStyle={{ fontSize: '14px' }}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
}