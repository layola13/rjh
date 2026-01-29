import { HSApp } from './518193';
import { Handler } from './340923';
import { MarketTypeEnum } from './785274';

/**
 * User VIP Plugin
 * Manages user VIP membership information and marketing modals
 */
class UserVipPlugin extends HSApp.Plugin.IPlugin {
    private handler: Handler;

    constructor() {
        super({
            name: "User Vip Plugin",
            description: "User Vip"
        });
        
        this.handler = new Handler();
    }

    onActive(event: unknown, context: unknown): void {
        super.onActive(event, context);
        
        if (HSApp.Config.TENANT === "ezhome" && HSApp.Config.VERSION !== "ea") {
            this.handler.init();
        }
    }

    getVipInfo(): unknown {
        return this.handler.getVipInfo();
    }

    getVipInfoChangedSignal(): unknown {
        return this.handler.vipInfoChangedSignal;
    }

    showMarketModal(
        marketType: MarketTypeEnum = MarketTypeEnum.Member,
        param1?: unknown,
        param2?: unknown
    ): void {
        this.handler.showMarketModal(marketType, param1, param2);
    }

    closeMarketModal(): void {
        this.handler.closeMarketModal();
    }

    refreshBenefits(): void {
        this.handler.refreshBenefits();
    }

    getMemberInfo(): unknown {
        return this.handler.getVipInfo();
    }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.MarketingBadge, UserVipPlugin);