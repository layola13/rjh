interface AppCatalogManager {
  registerCategoryConfig(category: string, config: CategoryConfig): void;
}

interface CategoryConfig {
  productListNode: React.ReactElement;
  disabledSearch: boolean;
}

interface HSAppConfig {
  TENANT: string;
}

declare global {
  const HSApp: {
    Config: HSAppConfig;
  };
  const React: {
    createElement(component: unknown, props: null): React.ReactElement;
  };
}

export class UI {
  private appCatalogManager?: AppCatalogManager;

  /**
   * Initialize the UI with an app catalog manager
   * @param manager - The app catalog manager instance
   */
  init(manager: AppCatalogManager): void {
    this.appCatalogManager = manager;
    
    if (HSApp.Config.TENANT === "fp") {
      this.appCatalogManager.registerCategoryConfig("aimoodboard", {
        productListNode: React.createElement(EnterPriseAiMoodBoardPage, null),
        disabledSearch: true
      });
    }
  }
}

// Placeholder for the imported component
class EnterPriseAiMoodBoardPage {}