import React, { useRef, useState, useEffect } from 'react';
import { Icons } from './icons';

interface CommunityShareProps {
  onShareFinished: () => void;
  designId: string;
}

interface MessageEventData {
  eType?: string;
  eData?: {
    isSuccess?: boolean;
    disableClose?: boolean;
  };
}

interface CustomMessageEvent {
  data?: MessageEventData;
}

interface PanelLoadingOptions {
  ispanelcenter: boolean;
}

declare class PanelLoading {
  constructor(element: Element | null, options: PanelLoadingOptions);
  show(): void;
  hide(): void;
}

declare const HSApp: {
  App: {
    getApp(): {
      appParams: {
        locale?: string;
      };
    };
  };
  PartnerConfig: {
    USERCENTER_URL: string;
  };
};

let panelLoadingInstance: PanelLoading | undefined = undefined;

export const CommunityShare: React.FC<CommunityShareProps> = ({
  onShareFinished,
  designId
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [disableClose, setDisableClose] = useState<boolean>(false);

  const handleMessage = (event: CustomMessageEvent): void => {
    if (!iframeRef?.current) {
      return;
    }

    const eventType = event.data?.eType;
    const eventData = event.data?.eData;

    if (eventType === 'publish_join_contest' && eventData?.isSuccess) {
      onShareFinished();
    }

    if (eventType === 'publish_close') {
      setDisableClose(eventData?.disableClose ?? false);
    }
  };

  const toggleLoading = (show: boolean): void => {
    const container = document.querySelector('.community-share-frame-container');

    if (!panelLoadingInstance) {
      panelLoadingInstance = new PanelLoading(container, {
        ispanelcenter: true
      });
    }

    if (show) {
      panelLoadingInstance.show();
    } else {
      panelLoadingInstance.hide();
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    toggleLoading(true);

    return () => {
      window.removeEventListener('message', handleMessage);
      toggleLoading(false);
      panelLoadingInstance = undefined;
    };
  }, []);

  const app = HSApp.App.getApp();
  const locale = app.appParams.locale || 'en_US';
  const iframeSrc = `${HSApp.PartnerConfig.USERCENTER_URL}/publish/post/?id=${designId}&t=1&chooseContest=true&source=3d&lang=${locale}`;

  const closeAreaClassName = `close-share-area ${disableClose ? 'disable-access' : ''}`;

  return (
    <div id="community-share-div">
      <div className="community-share-frame-container">
        <div className="community-share-frame-mask" />
        <iframe
          className="community-share-frame"
          src={iframeSrc}
          ref={iframeRef}
          onLoadStart={() => toggleLoading(false)}
          onLoad={() => toggleLoading(false)}
          title="Homestyler Community"
        />
        <div className={closeAreaClassName} onClick={onShareFinished}>
          <div className="close-share">
            <Icons type="hs_xian_guanbi" />
          </div>
        </div>
      </div>
    </div>
  );
};