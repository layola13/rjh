interface RestoreData {
  parentEle?: HTMLElement;
  style?: string;
}

interface AppSetting {
  cameraVisible: boolean;
  gridVisible: boolean;
  dimensionVisiable: boolean;
}

interface RestoreDataUpdate {
  appSetting: AppSetting;
}

interface ViewSettingItem {
  key: string;
  value: boolean;
}

interface Active2DView {
  resize(width: number, height: number): void;
  fit(): void;
}

interface AppSettings {
  getViewItem(key: string): boolean;
  setViewSetting(settings: ViewSettingItem[]): void;
}

interface App {
  getActive2DView(): Active2DView;
  appSettings: AppSettings;
  updateDocumentWithViewOptions(): void;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const e: {
  en: {
    restoreData: RestoreData;
    updateRestoreData(data: RestoreDataUpdate): void;
  };
};

export function initializeEditorContainer(targetElement: HTMLElement | null): void {
  if (!targetElement) return;

  const editorContainer = document.querySelector<HTMLElement>(".editor2dContainer");
  if (!editorContainer) return;

  e.en.restoreData = {
    parentEle: editorContainer.parentElement ?? undefined,
    style: editorContainer.getAttribute("style") ?? undefined
  };

  editorContainer.removeAttribute("style");
  targetElement.appendChild(editorContainer);

  const containerRect = targetElement.getBoundingClientRect();
  const app = HSApp.App.getApp();
  
  app.getActive2DView().resize(containerRect.width, containerRect.height);
  app.getActive2DView().fit();

  e.en.updateRestoreData({
    appSetting: {
      cameraVisible: app.appSettings.getViewItem("cameraVisible"),
      gridVisible: app.appSettings.getViewItem("gridVisible"),
      dimensionVisiable: app.appSettings.getViewItem("dimensionVisiable")
    }
  });

  app.appSettings.setViewSetting([
    {
      key: "cameraVisible",
      value: false
    },
    {
      key: "gridVisible",
      value: false
    },
    {
      key: "dimensionVisiable",
      value: false
    }
  ]);

  app.updateDocumentWithViewOptions();
}