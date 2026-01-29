export enum TaskCode {
  panoramarender = "panoramarender",
  importfloorplan = "importfloorplan",
  inspirationlibraryapply = "inspirationlibraryapply"
}

interface TaskTemplateItem {
  taskCode: TaskCode;
  showHint?: () => void;
  listen: () => void;
  nextStep?: (step?: number) => void;
}

interface PanoramaRenderEventData {
  type?: string;
}

interface PanoramaRenderEvent {
  data?: PanoramaRenderEventData;
}

interface EnvironmentChangeEventData {
  newEnvironmentId: string;
  oldEnvironmentId: string;
}

interface EnvironmentChangeEvent {
  data: EnvironmentChangeEventData;
}

interface HintOptions {
  rec: DOMRect;
}

interface CatalogClickEventData {
  menuData: {
    id: string;
  };
}

interface CatalogClickEvent {
  data: CatalogClickEventData;
}

const HINT_TIMEOUT = 10000;
const POLL_INTERVAL = 200;

function uploadTask(taskCode: TaskCode): void {
  // Implementation from module 286285
}

function closeTips(): void {
  // Implementation from module 100
}

export const TaskTemplate: TaskTemplateItem[] = [
  {
    taskCode: TaskCode.panoramarender,
    listen: function (): void {
      const app = HSApp.App.getApp();
      const taskCenterPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.TaskCenter);
      
      taskCenterPlugin.panoramarenderSignal.listen((event: PanoramaRenderEvent) => {
        if (event.data?.type === "panorama") {
          uploadTask(TaskCode.panoramarender);
          closeTips();
        }
      });

      app.environmentManager.signalEnvironmentActivated.listen((event: EnvironmentChangeEvent) => {
        const { newEnvironmentId, oldEnvironmentId } = event.data;
        if (
          newEnvironmentId === HSFPConstants.Environment.Default &&
          oldEnvironmentId === HSFPConstants.Environment.Render
        ) {
          closeTips();
        }
      });
    }
  },
  {
    taskCode: TaskCode.importfloorplan,
    showHint: function (): void {
      const element = document.getElementById("catalog_import_flooplan");
      if (element) {
        const rect = element.getBoundingClientRect();
        const taskCenterPlugin = HSApp.App.getApp().pluginManager.getPlugin(
          HSFPConstants.PluginType.TaskCenter
        );
        taskCenterPlugin.showHint({ rec: rect });
      }
    },
    listen: function (): void {
      let hasTriggeredNextStep = false;
      const taskCenterPlugin = HSApp.App.getApp().pluginManager.getPlugin(
        HSFPConstants.PluginType.TaskCenter
      );

      taskCenterPlugin.importFloorplanSignal?.listen(() => {
        uploadTask(TaskCode.importfloorplan);
        closeTips();
      });

      hsw.plugin.underlayimg.UI.startSignal.listen(() => {
        if (!hasTriggeredNextStep) {
          taskCenterPlugin.nextStep(1);
          hasTriggeredNextStep = true;
        }
      });
    },
    nextStep: function (step: number = 0): void {
      closeTips();

      let targetButton: HTMLButtonElement | undefined;

      const pollInterval = setInterval(() => {
        const windowContent = document.getElementsByClassName("underlay-image-window-content")[0];
        const uploadButton = windowContent?.childNodes[1]
          ?.getElementsByClassName("option_imageupload")[0]
          ?.getElementsByTagName("button")[0];

        if (uploadButton) {
          targetButton = uploadButton;
          clearInterval(pollInterval);
          showHintForButton();
        }
      }, POLL_INTERVAL);

      const showHintForButton = (): void => {
        if (targetButton) {
          const rect = targetButton.getBoundingClientRect();
          const taskCenterPlugin = HSApp.App.getApp().pluginManager.getPlugin(
            HSFPConstants.PluginType.TaskCenter
          );
          taskCenterPlugin.showHint({ rec: rect }, step);
        }
      };

      setTimeout(() => {
        clearInterval(pollInterval);
      }, HINT_TIMEOUT);
    }
  },
  {
    taskCode: TaskCode.inspirationlibraryapply,
    showHint: function (): void {
      const menuItems = Array.from(document.getElementsByClassName("hsc-menu-content-fp"));
      const stylerRoomMenuItem = menuItems.find((element) => {
        const menuNameElement = element.getElementsByClassName("menu-name")[0];
        return menuNameElement?.innerText === ResourceManager.getString("catalog_styler_room");
      });

      if (stylerRoomMenuItem) {
        const rect = stylerRoomMenuItem.getBoundingClientRect();
        const taskCenterPlugin = HSApp.App.getApp().pluginManager.getPlugin(
          HSFPConstants.PluginType.TaskCenter
        );
        taskCenterPlugin.showHint({ rec: rect });
      }
    },
    listen: function (): void {
      let hasTriggeredNextStep = false;
      const taskCenterPlugin = HSApp.App.getApp().pluginManager.getPlugin(
        HSFPConstants.PluginType.TaskCenter
      );

      taskCenterPlugin.inspirationLibrarySignal?.listen(() => {
        uploadTask(TaskCode.inspirationlibraryapply);
        closeTips();
      });

      HSApp.Catalog.BaseApiManager.getInstance().catalogSignalManager.signalCatalogHeaderClick.listen(
        (event: CatalogClickEvent) => {
          if (!hasTriggeredNextStep) {
            if (event.data.menuData.id === HSApp.Catalog.DataConfig.MenuIdEnum.styler) {
              taskCenterPlugin.nextStep(1);
              hasTriggeredNextStep = true;
            }
          }
        }
      );
    },
    nextStep: function (step: number = 0): void {
      closeTips();

      let targetProductItem: ChildNode | undefined;

      const pollInterval = setInterval(() => {
        const productList = document.getElementsByClassName("product-list")[0];
        const firstProductItem = productList?.childNodes[0]?.childNodes[0]?.childNodes[0];

        if (firstProductItem) {
          targetProductItem = firstProductItem;
          clearInterval(pollInterval);
          showHintForProduct();
        }
      }, POLL_INTERVAL);

      const showHintForProduct = (): void => {
        if (targetProductItem && targetProductItem instanceof HTMLElement) {
          const rect = targetProductItem.getBoundingClientRect();
          const taskCenterPlugin = HSApp.App.getApp().pluginManager.getPlugin(
            HSFPConstants.PluginType.TaskCenter
          );
          taskCenterPlugin.showHint({ rec: rect }, step);
        }
      };

      setTimeout(() => {
        clearInterval(pollInterval);
      }, HINT_TIMEOUT);
    }
  }
];