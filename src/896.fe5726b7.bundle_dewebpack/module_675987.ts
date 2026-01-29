import { HSApp, HSFPConstants } from './518193';
import type { IPlugin, PluginContext, PluginRegistry } from './518193';

interface AppSettings {
  defaultDisplayLengthUnit: HSCore.Util.Unit.LengthUnitTypeEnum;
  defaultDisplayLengthDigits: number;
  defaultDisplayAreaUnit: HSCore.Util.Unit.AreaUnitTypeEnum;
  defaultDisplayAreaDigits: number;
  defaultGlobalWallWidth: number;
}

interface Application {
  appSettings: AppSettings;
  appParams: {
    langSwitch?: boolean;
  };
}

interface PluginMetadata {
  name: string;
  description: string;
  dependencies: string[];
}

interface HelpItem {
  add(config: HelpItemConfig): void;
}

interface HelpItemConfig {
  label: string;
  name: string;
  type: string;
  order: number;
  onclick: () => void;
}

interface PageHeaderPlugin {
  getHelpItem(itemName: string): HelpItem | null;
}

interface AutostylerPlugin {
  // Define based on actual autostyler plugin interface
}

class EZHomeCustomizationPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    const metadata: PluginMetadata = {
      name: "EZHome customiation",
      description: "customize the global core/plugins behavior for EZHome brand",
      dependencies: [
        HSFPConstants.PluginType.Catalog,
        HSFPConstants.PluginType.PageHeader,
        HSFPConstants.PluginType.Autostyler
      ]
    };
    super(metadata);
  }

  onActive(context: PluginContext, pluginRegistry: PluginRegistry): void {
    const app: Application = context.app;

    // Configure render settings
    HSApp.Config.RENDER_JOB_MANAGEMENT_SERVER = HSApp.PartnerConfig.EZHOME_RENDER_JOB_MANAGEMENT_SERVER;
    HSApp.Config.RENDER_INTENSITYMULTIPLIER_THRESHOLD = HSApp.PartnerConfig.EZHOME_RENDER_INTENSITYMULTIPLIER_THRESHOLD;
    HSApp.Config.RENDER_EXPOSURE_CALIBRATION_ENABLE = HSApp.PartnerConfig.EZHOME_RENDER_EXPOSURE_CALIBRATION_ENABLE;
    
    // Configure viewer URLs
    HSApp.Config.PANOVIEWER_URL = HSApp.PartnerConfig.EZHOME_PANOVIEWER_URL;
    HSApp.Config.VIDEOEDITOR_URL = HSApp.PartnerConfig.EZHOME_VIDEOEDITOR_URL;
    HSApp.Config.PANO_LIGHTMIX_URL = HSApp.PartnerConfig.EZHOME_PANO_LIGHTMIX_URL;
    HSApp.Config.RAYTRACE_URL = HSApp.PartnerConfig.EZHOME_RAYTRACE_URL;
    
    // Configure currency
    HSApp.Config.CURRENCY_SYMBOL = HSApp.PartnerConfig.EZHOME_CURRENCY_SYMBOL;

    // Configure app display settings
    app.appSettings.defaultDisplayLengthUnit = HSCore.Util.Unit.LengthUnitTypeEnum.millimeter;
    app.appSettings.defaultDisplayLengthDigits = 0;
    app.appSettings.defaultDisplayAreaUnit = HSCore.Util.Unit.AreaUnitTypeEnum.meter;
    app.appSettings.defaultDisplayAreaDigits = 2;
    app.appSettings.defaultGlobalWallWidth = 0.24;

    // Add language switch if enabled
    if (HSApp.PartnerConfig.HELP_LANGUAGE_SWITCH || HSApp.App.getApp().appParams.langSwitch) {
      const pageHeaderPlugin = pluginRegistry[HSFPConstants.PluginType.PageHeader] as PageHeaderPlugin;
      const helpItem = pageHeaderPlugin.getHelpItem("toolBar_help");
      
      if (helpItem) {
        helpItem.add({
          label: ResourceManager.getString("toolbar_help_language_switch"),
          name: "toolBar_language_switch",
          type: "button",
          order: 900,
          onclick: () => {
            const currentUrl = window.location.href;
            const currentLang = HSApp.Util.Url.getQueryStrings().lang;
            
            const newUrl = currentLang && currentLang !== "zh_CN"
              ? HSApp.Util.Url.replaceParamsInUrl({ lang: "zh_CN" })
              : HSApp.Util.Url.replaceParamsInUrl({ lang: "en_US" });
            
            window.location.href = newUrl;
          }
        });
      }
    }

    // Initialize autostyler plugin
    const autostylerPlugin = pluginRegistry[HSFPConstants.PluginType.Autostyler] as AutostylerPlugin;
    this.initializeAutostyler(app, autostylerPlugin);
    
    // Set catalog manager app config
    HSApp.Catalog.Manager.setAppConfig();
  }

  onDeactive(): void {
    // Cleanup when plugin is deactivated
  }

  private initializeAutostyler(app: Application, autostylerPlugin: AutostylerPlugin): void {
    // Autostyler initialization logic (extracted from original (0, c.default)(n, t[...]))
    // Implementation depends on what c.default does
  }
}

// Register the plugin
HSApp.Plugin.registerPlugin("hsw.brand.ezhome.customization.Plugin", EZHomeCustomizationPlugin);