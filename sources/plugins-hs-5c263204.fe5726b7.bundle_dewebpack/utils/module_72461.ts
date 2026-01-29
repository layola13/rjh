namespace HSW.Plugin.FaceMaterial {
  
  interface MetaData {
    contentType: ContentType;
    contextmenu?: ContextMenu;
  }

  interface ContentType {
    isTypeOf(type: string): boolean;
  }

  interface ContextMenu {
    name: string;
    items: MenuItem[];
  }

  interface MenuItem {
    id: string;
    name: string;
    icon: string;
    onclick: (data: ProductData) => void;
  }

  interface ProductData {
    id: string;
    contentType: ContentType;
    isUserUpload?: boolean;
  }

  interface Plugin {
    deleteProduct(id: string): Promise<unknown>;
  }

  interface PluginManager {
    getPlugin(pluginType: string): Plugin | null;
  }

  interface App {
    pluginManager: PluginManager;
  }

  interface LiveHintOptions {
    status: 'loading' | 'completed' | 'warning';
  }

  declare const HSApp: {
    Util: {
      Core: {
        define(namespace: string): unknown;
      };
    };
    App: {
      getApp(): App;
    };
  };

  declare const HSCatalog: {
    ContentTypeEnum: {
      CustomizedMaterial: string;
    };
  };

  declare const ResourceManager: {
    getString(key: string): string;
  };

  declare const adskUser: {
    isLogin(): boolean;
  };

  declare const LiveHint: {
    show(message: string, duration?: number, callback?: null, options?: LiveHintOptions): void;
  };

  declare const HSFPConstants: {
    PluginType: {
      Catalog: string;
    };
  };

  const HINT_DURATION = 6000;

  HSApp.Util.Core.define('hsw.plugin.facematerial');

  export const MetaProcess = HSApp.Util.Core.define('hsw.plugin.facematerial.MetaProcess') as {
    process(metadata: MetaData, productData: ProductData): MetaData;
    miniProcess(metadata: MetaData, productData: ProductData): void;
    action: {
      delete(productData: ProductData): void;
    };
  };

  MetaProcess.process = function(metadata: MetaData, productData: ProductData): MetaData {
    if (!metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedMaterial)) {
      return metadata;
    }

    const editLabel = ResourceManager.getString('catalog_menu_edit');
    const deleteLabel = ResourceManager.getString('catalog_menu_delete');

    if (productData.isUserUpload) {
      metadata.contextmenu = {
        name: editLabel,
        items: [
          {
            id: 'delete',
            name: deleteLabel,
            icon: 'res/svgs/tiles_delete.svg',
            onclick: MetaProcess.action.delete
          }
        ]
      };
    }

    return metadata;
  };

  MetaProcess.miniProcess = function(metadata: MetaData, productData: ProductData): void {
    if (metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedMaterial) && !productData.isUserUpload) {
      const editLabel = ResourceManager.getString('catalog_menu_edit');
      const deleteLabel = ResourceManager.getString('catalog_menu_delete');

      if (productData.isUserUpload) {
        metadata.contextmenu = {
          name: editLabel,
          items: [
            {
              id: 'delete',
              name: deleteLabel,
              icon: 'res/svgs/tiles_delete.svg',
              onclick: MetaProcess.action.delete
            }
          ]
        };
      }
    }
  };

  MetaProcess.action = {
    delete(productData: ProductData): void {
      if (!adskUser.isLogin()) {
        return;
      }

      LiveHint.show(
        ResourceManager.getString('plugin_customtails_delete'),
        undefined,
        null,
        { status: 'loading' }
      );

      const catalogPlugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);

      if (catalogPlugin) {
        catalogPlugin.deleteProduct(productData.id)
          .then(() => {
            LiveHint.show(
              ResourceManager.getString('plugin_customtails_delete_success'),
              HINT_DURATION,
              null,
              { status: 'completed' }
            );
          })
          .catch(() => {
            LiveHint.show(
              ResourceManager.getString('plugin_customtails_delete_error'),
              HINT_DURATION,
              null,
              { status: 'warning' }
            );
          });
      }
    }
  };
}