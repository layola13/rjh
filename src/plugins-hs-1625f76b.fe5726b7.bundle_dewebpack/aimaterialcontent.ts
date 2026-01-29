export enum MarketTypeEnum {
  AIGC = "aigc",
  RENDERAIGC = "render-aigc",
  TEAMAIGC = "team_aigc",
  MASTERAIGC = "render-master-aigc",
}

interface AigcCountData {
  totalCount: number;
  aigcCostRatio?: {
    aitexture?: string | number;
  };
  aigcDetailCount?: {
    aitexture?: string | number;
  };
}

interface AigcCountState {
  aigcCount: number;
  aigcCostCount: number;
  freeCostCount: number;
}

interface AIMaterialContentProps {
  handleOpenAIAlbum: () => void;
  startGenerateCallback: () => void;
}

interface MtopResponse<T> {
  data: T;
  ret?: string[];
}

interface MarketingBadgePlugin {
  showMarketModal: (
    marketType: MarketTypeEnum,
    category: string,
    options: { onClose: () => void }
  ) => void;
}

declare global {
  const NWTK: {
    mtop: {
      Catalog: {
        fetchAigcCount: (params: {
          data: { needLogin: boolean };
        }) => Promise<MtopResponse<AigcCountData>>;
      };
    };
  };
  const HSApp: {
    App: {
      getApp: () => {
        appParams: { locale: string };
        pluginManager: {
          getPlugin: (pluginType: string) => MarketingBadgePlugin | null;
        };
      };
    };
    Util: {
      EventTrack: {
        instance: () => {
          track: (group: string, event: string) => void;
        };
      };
      EventGroupEnum: {
        Catalog: string;
      };
    };
  };
  const HSFPConstants: {
    PluginType: {
      MarketingBadge: string;
    };
  };
  const adskUser: {
    isEnterprise: boolean;
    memberInfo: {
      memberType: number;
    };
  };
  const React: typeof import("react");
}

/**
 * Fetch AIGC count data from server
 */
const fetchAigcCount = async (): Promise<AigcCountData> => {
  try {
    const response = await NWTK.mtop.Catalog.fetchAigcCount({
      data: {
        needLogin: false,
      },
    });

    if (
      response?.ret?.[0]?.includes("SUCCESS") &&
      response.data
    ) {
      return response.data;
    }

    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Determine market type based on user membership
 */
const getMarketType = (): MarketTypeEnum => {
  if (adskUser.isEnterprise) {
    return MarketTypeEnum.TEAMAIGC;
  }

  switch (adskUser.memberInfo.memberType) {
    case 2:
      return MarketTypeEnum.MASTERAIGC;
    case 3:
      return MarketTypeEnum.AIGC;
    default:
      return MarketTypeEnum.RENDERAIGC;
  }
};

export const AIMaterialContent: React.FC<AIMaterialContentProps> = ({
  handleOpenAIAlbum,
  startGenerateCallback,
}) => {
  const [aigcCountState, setAigcCountState] = React.useState<AigcCountState>({
    aigcCount: 0,
    aigcCostCount: 0,
    freeCostCount: 0,
  });

  const [hasFetchCount, setHasFetchCount] = React.useState<boolean>(false);

  /**
   * Load AIGC count data and update state
   */
  const loadAigcCount = async (): Promise<void> => {
    try {
      const data = await fetchAigcCount();

      if (data) {
        const totalCount = data.totalCount;
        const aigcCostCount = Number(data.aigcCostRatio?.aitexture) || 0;
        const freeCostCount = Number(data.aigcDetailCount?.aitexture) || 0;

        setAigcCountState({
          aigcCount: totalCount,
          aigcCostCount,
          freeCostCount,
        });

        setHasFetchCount(true);
      }
    } catch (error) {
      console.error("mtop.aiModeler.aigcCount", error);
    }
  };

  /**
   * Handle buy more credits action
   */
  const handleBuyMore = (eventType: string): void => {
    const marketType = getMarketType();
    const marketingBadgePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.MarketingBadge
    );

    if (marketingBadgePlugin) {
      marketingBadgePlugin.showMarketModal(marketType, "ai_material", {
        onClose: loadAigcCount,
      });
    }

    const trackEvent =
      eventType === "eAILackOfCreditsClick"
        ? "ai_material_lack_of_credits_clk_event"
        : "ai_material_buy_credit_clk_event";

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      trackEvent
    );
  };

  /**
   * Handle before generate click event
   */
  const handleBeforeGenerateClick = (): boolean => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      "ai_material_generate_clk_event"
    );
    return false;
  };

  /**
   * Handle generate success callback
   */
  const handleGenerateSuccess = (): void => {
    handleOpenAIAlbum();
    loadAigcCount();
  };

  /**
   * Handle image upload success event
   */
  const handleImageUploadSuccess = (): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      "ai_material_upload_image_success_event"
    );
  };

  /**
   * Handle image upload error event
   */
  const handleImageUploadError = (): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      "ai_material_upload_image_fail_event"
    );
  };

  /**
   * Handle image upload change event
   */
  const handleImageChange = (): void => {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      "ai_material_img_upload_clk_event"
    );
  };

  React.useEffect(() => {
    loadAigcCount();
  }, []);

  const componentProps = {
    ...aigcCountState,
    hasSignin: true,
    hasFetchCount,
    imageUploadHeight: 116,
    parentContainerClass: "ai-create-page",
    lang: HSApp.App.getApp().appParams.locale,
    buyMore: handleBuyMore,
    startGenerateCallback,
    beforeGenerateClick: handleBeforeGenerateClick,
    generateSuccessCallback: handleGenerateSuccess,
    onImageUploadSuccess: handleImageUploadSuccess,
    onImageUploadError: handleImageUploadError,
    onChange: handleImageChange,
  };

  return React.createElement(React.Fragment, null, React.createElement("div", componentProps));
};