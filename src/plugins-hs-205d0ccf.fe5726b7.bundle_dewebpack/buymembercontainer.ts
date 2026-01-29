import { useState, useEffect, useMemo } from 'react';
import { AuthorizeManager } from './AuthorizeManager';
import { IconfontView } from './IconfontView';
import demoImageLeft from './assets/demo-left.png';
import demoImageRight from './assets/demo-right.png';

interface UserBenefits {
  noWatermark?: {
    payload?: {
      amount?: number;
    };
  };
}

interface AdskUser {
  benefits?: UserBenefits;
  getBenefitMeta(category: string, key: string): BenefitMeta | undefined;
}

interface BenefitMeta {
  renderWathermarkContrast?: {
    hide?: boolean;
  };
}

interface Plugin {
  signalUserRightsCompleted?: unknown;
}

interface PluginManager {
  getPlugin(name: string): Plugin | null;
}

interface App {
  pluginManager: PluginManager;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface SignalHook {
  listen(signal: unknown, callback: () => void): void;
  unlistenAll(): void;
}

interface HSCore {
  Util: {
    SignalHook: new () => SignalHook;
  };
}

interface ResourceManager {
  getString(key: string): string;
}

declare const adskUser: AdskUser;
declare const HSApp: HSApp;
declare const HSCore: HSCore;
declare const ResourceManager: ResourceManager;
declare const React: typeof import('react');

interface BuyMemberContainerProps {
  sourcePage: string;
  hasBenefit?: boolean;
}

export const BuyMemberContainer: React.FC<BuyMemberContainerProps> = ({
  sourcePage,
  hasBenefit
}) => {
  const [remainingAmount, setRemainingAmount] = useState<number>(0);

  const [benefitKey, tipElement] = useMemo(() => {
    let key = "plugin_spark_pic_membership";
    let tip: React.ReactElement | null = null;

    if (["sparkpic_group_watermark", "sparkpic_all_watermark"].includes(sourcePage)) {
      tip = (
        <p className="tips">
          * {ResourceManager.getString("watermark_remove_tip1")}
        </p>
      );
    } else if (sourcePage === "sparkpic_detail_watermark") {
      key = "watermark_remove_tip2";
      const parts = ResourceManager.getString("watermark_remove_timeleft").split("{num}");
      tip = (
        <p className="tips">
          <span>{parts[0]}</span>
          <span className="num">{remainingAmount}</span>
          <span>{parts[1]}</span>
        </p>
      );
    }

    return [key, tip];
  }, [sourcePage, remainingAmount]);

  const updateRemainingAmount = (): void => {
    const amount = adskUser.benefits?.noWatermark?.payload?.amount ?? 0;
    setRemainingAmount(amount);
  };

  useEffect(() => {
    const amount = adskUser.benefits?.noWatermark?.payload?.amount ?? 0;
    setRemainingAmount(amount);

    const app = HSApp.App.getApp();
    const signalHook = new HSCore.Util.SignalHook();
    const firstLoginPlugin = app.pluginManager.getPlugin("hsw.brand.ezhome.firstlogin.Plugin");

    signalHook.listen(firstLoginPlugin?.signalUserRightsCompleted, updateRemainingAmount);

    return () => {
      signalHook.unlistenAll();
    };
  }, []);

  const shouldShowWatermarkContrast = useMemo(() => {
    const meta = adskUser.getBenefitMeta("whiteLabel", "hideHomestylerText");
    const contrastConfig = meta?.renderWathermarkContrast;
    
    if (contrastConfig?.hide) {
      return false;
    }
    
    return true;
  }, []);

  const handleUpgradeClick = (): void => {
    const authorizeManager = new AuthorizeManager();
    authorizeManager.authorize(sourcePage);
  };

  return (
    <div className="buyMemberContainer">
      {!hasBenefit && (
        <>
          <div className="content">
            <div className="leftArea">
              <IconfontView
                showType="hs_zhanshi_renderingmembership_black"
                customStyle={{ fontSize: "18px" }}
              />
              <span>{ResourceManager.getString(benefitKey)}</span>
            </div>
            <div className="updateBtn" onClick={handleUpgradeClick}>
              {ResourceManager.getString("plugin_spark_pic_upgrade")}
            </div>
          </div>
          {tipElement}
        </>
      )}
      {shouldShowWatermarkContrast && (
        <div className="demoImg">
          <img src={demoImageLeft} />
          <IconfontView
            customClass="wathermark-icon"
            showType="hs_xian_fanhui"
            customStyle={{ color: "#FFF", fontSize: "18px" }}
          />
          <img src={demoImageRight} />
        </div>
      )}
    </div>
  );
};