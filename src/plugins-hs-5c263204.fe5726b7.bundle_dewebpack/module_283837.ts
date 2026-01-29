import React from 'react';
import { IconfontView } from './IconfontView';
import './styles.css';

interface GuidePopupProps {
  exitGuide: () => void;
}

const GuidePopup: React.FC<GuidePopupProps> = ({ exitGuide }) => {
  const handleClose = (): void => {
    exitGuide();
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.NewUserGuide,
      "close_new_user_guide_event"
    );
  };

  const handleConfirm = (): void => {
    const renderPlugin = HSApp.App.getApp().pluginManager.getPlugin("hsw.plugin.render.Plugin");
    
    if (renderPlugin && HSApp.App.getApp().environmentManager.activeEnvironment.id === "render") {
      renderPlugin.exitRenderEnvironment();
    }

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    const updatedParams = Object.assign(queryStrings, {
      hasAssetId: "",
      guide: "",
      guidetype: "",
      assetId: ""
    });

    const updatedUrl = HSApp.Util.Url.replaceParamsInUrl(updatedParams);
    
    HSApp.Util.Url.addWindowHistoryState("hasAssetId", "", updatedUrl);
    HSApp.Util.Url.addWindowHistoryState("guide", "", updatedUrl);
    HSApp.Util.Url.addWindowHistoryState("guidetype", "", updatedUrl);
    HSApp.Util.Url.addWindowHistoryState("assetId", "", updatedUrl);
    
    HSApp.App.getApp().newDocument();
    handleClose();
  };

  const QR_CODE_IMAGE_URL = "https://img.alicdn.com/imgextra/i4/O1CN01EpqSxJ1KShdE0DXzj_!!6000000001163-0-tps-278-271.jpg";

  return (
    <div className="popup">
      <div className="guide-pop">
        <div className="guide-pop-top-header-label">
          {ResourceManager.getString("plugin_guide_end_popup_content")}
        </div>
        
        <div className="guide-pop-top-dialog-close" onClick={handleClose}>
          <IconfontView
            showType="hs_xian_guanbi"
            customStyle={{
              color: "black",
              fontSize: "18px"
            }}
          />
        </div>
        
        <div className="guide-pop-top-qrcode">
          <img src={QR_CODE_IMAGE_URL} alt="QR Code" />
        </div>
        
        <div className="guide-pop-bottom-chat">
          {ResourceManager.getString("plugin_guide_end_popup_contact")}
        </div>
        
        <div className="guide-pop-bottom-ok" onClick={handleConfirm}>
          {ResourceManager.getString("plugin_guide_end_popup_btn")}
        </div>
      </div>
    </div>
  );
};

export default GuidePopup;