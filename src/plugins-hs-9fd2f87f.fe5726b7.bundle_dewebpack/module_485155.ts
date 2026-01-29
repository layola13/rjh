import { Component, ReactElement } from 'react';

interface PageDataItem {
  type: string;
  isSettingVisible: boolean;
  values: unknown;
}

interface MixpaintDrawPageProps {
  pageData: PageDataItem[];
}

interface CatalogPlugin {
  getHouseTypePanel(): React.ComponentType<HouseTypePanelProps>;
}

interface HouseTypePanelProps {
  type: string;
  isSettingVisible: boolean;
  values: unknown;
}

interface App {
  pluginManager: {
    getPlugin(pluginType: string): CatalogPlugin;
  };
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
  };
};

export default class MixpaintDrawPage extends Component<MixpaintDrawPageProps> {
  private readonly catalogPlugin: CatalogPlugin;

  constructor(props: MixpaintDrawPageProps) {
    super(props);
    
    const app = HSApp.App.getApp();
    this.catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
  }

  render(): ReactElement {
    const { pageData } = this.props;
    const HouseTypePanel = this.catalogPlugin.getHouseTypePanel();

    return (
      <div className="mixpaint-draw-page">
        <div className="scroll-area">
          <div className="panelContent">
            {pageData.map((item) => (
              <HouseTypePanel
                key={item.type}
                type={item.type}
                isSettingVisible={item.isSettingVisible}
                values={item.values}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}