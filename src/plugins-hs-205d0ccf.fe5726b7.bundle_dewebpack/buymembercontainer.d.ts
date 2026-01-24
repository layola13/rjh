/**
 * 购买会员容器组件模块
 * 用于显示会员升级提示和水印移除相关信息
 */

import React from 'react';
import { AuthorizeManager } from './AuthorizeManager';
import { IconfontView } from './IconfontView';

/**
 * 组件属性接口
 */
export interface BuyMemberContainerProps {
  /** 来源页面标识 */
  sourcePage: string;
  /** 是否已有权益 */
  hasBenefit?: boolean;
}

/**
 * 用户权益数据结构
 */
interface UserBenefits {
  noWatermark?: {
    payload?: {
      /** 剩余水印移除次数 */
      amount?: number;
    };
  };
}

/**
 * 白标配置元数据
 */
interface BenefitMeta {
  renderWathermarkContrast?: {
    /** 是否隐藏水印对比 */
    hide?: boolean;
  };
}

/**
 * 全局用户对象类型声明
 */
declare global {
  const adskUser: {
    benefits?: UserBenefits;
    getBenefitMeta(category: string, key: string): BenefitMeta | undefined;
  };
  const ResourceManager: {
    getString(key: string): string;
  };
  const HSApp: {
    App: {
      getApp(): {
        pluginManager: {
          getPlugin(name: string): Plugin | null;
        };
      };
    };
  };
  const HSCore: {
    Util: {
      SignalHook: new () => SignalHook;
    };
  };
}

/**
 * 插件接口
 */
interface Plugin {
  /** 用户权益完成信号 */
  signalUserRightsCompleted?: unknown;
}

/**
 * 信号钩子接口
 */
interface SignalHook {
  listen(signal: unknown, callback: () => void): void;
  unlistenAll(): void;
}

/**
 * 购买会员容器组件
 * 根据来源页面显示不同的会员升级提示和水印移除信息
 * 
 * @param props - 组件属性
 * @returns React 组件
 */
export const BuyMemberContainer: React.FC<BuyMemberContainerProps> = (props) => {
  const { sourcePage, hasBenefit } = props;

  // 剩余水印移除次数
  const [remainingCount, setRemainingCount] = React.useState<number>(0);

  /**
   * 根据来源页面计算资源键和提示内容
   * @returns [资源键, 提示元素]
   */
  const [resourceKey, tipElement] = React.useMemo(() => {
    let key = "plugin_spark_pic_membership";
    let tip: React.ReactElement | null = null;

    if (["sparkpic_group_watermark", "sparkpic_all_watermark"].includes(sourcePage)) {
      // 分组或全部水印页面
      tip = (
        <p className="tips">
          * {ResourceManager.getString("watermark_remove_tip1")}
        </p>
      );
    } else if (sourcePage === "sparkpic_detail_watermark") {
      // 详情页水印
      key = "watermark_remove_tip2";
      const parts = ResourceManager.getString("watermark_remove_timeleft").split("{num}");
      tip = (
        <p className="tips">
          <span>{parts[0]}</span>
          <span className="num">{remainingCount}</span>
          <span>{parts[1]}</span>
        </p>
      );
    }

    return [key, tip];
  }, [sourcePage, remainingCount]);

  /**
   * 更新剩余水印移除次数
   */
  const updateRemainingCount = (): void => {
    const amount = adskUser.benefits?.noWatermark?.payload?.amount ?? 0;
    setRemainingCount(amount);
  };

  /**
   * 初始化效果：监听用户权益变化
   */
  React.useEffect(() => {
    // 初始化剩余次数
    const initialAmount = adskUser.benefits?.noWatermark?.payload?.amount ?? 0;
    setRemainingCount(initialAmount);

    // 监听用户权益完成信号
    const app = HSApp.App.getApp();
    const signalHook = new HSCore.Util.SignalHook();
    const plugin = app.pluginManager.getPlugin("hsw.brand.ezhome.firstlogin.Plugin");

    signalHook.listen(plugin?.signalUserRightsCompleted, updateRemainingCount);

    return () => {
      signalHook.unlistenAll();
    };
  }, []);

  /**
   * 是否显示水印对比图
   */
  const shouldShowDemo = React.useMemo(() => {
    const meta = adskUser.getBenefitMeta("whiteLabel", "hideHomestylerText");
    const contrast = meta?.renderWathermarkContrast;

    // 如果配置了隐藏，则不显示
    if (contrast?.hide) {
      return false;
    }

    return true;
  }, []);

  /**
   * 处理升级按钮点击
   */
  const handleUpgradeClick = (): void => {
    const authorizeManager = new AuthorizeManager();
    authorizeManager.authorize(sourcePage);
  };

  return (
    <div className="buyMemberContainer">
      {/* 未拥有权益时显示升级提示 */}
      {!hasBenefit && (
        <>
          <div className="content">
            <div className="leftArea">
              <IconfontView
                showType="hs_zhanshi_renderingmembership_black"
                customStyle={{ fontSize: "18px" }}
              />
              <span>{ResourceManager.getString(resourceKey)}</span>
            </div>
            <div className="updateBtn" onClick={handleUpgradeClick}>
              {ResourceManager.getString("plugin_spark_pic_upgrade")}
            </div>
          </div>
          {tipElement}
        </>
      )}

      {/* 水印对比演示图 */}
      {shouldShowDemo && (
        <div className="demoImg">
          <img src={require('./assets/watermark-before.png')} alt="With watermark" />
          <IconfontView
            customClass="wathermark-icon"
            showType="hs_xian_fanhui"
            customStyle={{ color: "#FFF", fontSize: "18px" }}
          />
          <img src={require('./assets/watermark-after.png')} alt="Without watermark" />
        </div>
      )}
    </div>
  );
};