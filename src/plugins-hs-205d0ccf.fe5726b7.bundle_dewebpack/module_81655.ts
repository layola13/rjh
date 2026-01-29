interface PluginDependency {
  name: string;
  description: string;
  dependencies: string[];
}

interface SnapshotData {
  file: Blob;
  type: string;
}

interface SaveDocumentOptions {
  format: string;
  width: number;
  height: number;
  forground: boolean;
}

interface ClientRect {
  width: number;
  height: number;
  left?: number;
  top?: number;
}

interface ToolbarMenuItem {
  name: string;
  type: string;
  label: string;
  order: number;
  onclick: () => void;
  icon: string;
}

enum RatioKeyEnum {
  FREE = "FREE",
  ORIGIN = "ORIGIN",
  R_1_1 = "R_1_1",
  R_4_3 = "R_4_3",
  R_16_9 = "R_16_9"
}

enum RatioEnum {
  FREE = -1,
  ORIGIN = 1.5,
  R_1_1 = 1,
  R_4_3 = 1.3333333333333333,
  R_16_9 = 1.7777777777777777
}

const MODULE_NAME = "hsw.plugin.screenshot";

class ScreenshotPlugin extends HSApp.Plugin.IPlugin {
  public signalSavingSnapshot: HSCore.Util.Signal;

  constructor() {
    super([
      {
        name: "Clip Screenshot",
        description: "clip screenshot",
        dependencies: [HSFPConstants.PluginType.Toolbar, "hsw.plugin.persistence.Plugin"]
      }
    ]);
  }

  public onActive(context: { app: any }, plugins: Record<string, any>): void {
    const { app } = context;
    ScreenshotHandler.init(app, plugins);
    this.signalSavingSnapshot = ScreenshotHandler.signalSavingSnapshot;
  }

  public onDeactive(): void {
    // Cleanup logic if needed
  }
}

HSApp.Plugin.registerPlugin(`${MODULE_NAME}.Plugin`, ScreenshotPlugin);

const ScreenshotEnum = {
  RATIO_KEY_ENUM: {
    FREE: RatioKeyEnum.FREE,
    ORIGIN: RatioKeyEnum.ORIGIN,
    R_1_1: RatioKeyEnum.R_1_1,
    R_4_3: RatioKeyEnum.R_4_3,
    R_16_9: RatioKeyEnum.R_16_9
  },
  RATIO_ENUM: {
    FREE: RatioEnum.FREE,
    ORIGIN: RatioEnum.ORIGIN,
    R_1_1: RatioEnum.R_1_1,
    R_4_3: RatioEnum.R_4_3,
    R_16_9: RatioEnum.R_16_9
  }
};

const ScreenshotHandler = {
  signalSavingSnapshot: new HSCore.Util.Signal(),
  ratioKey: RatioKeyEnum.ORIGIN,
  app: null as any,
  persistPlugin: null as any,

  init(app: any, plugins: Record<string, any>): void {
    this.app = app;
    this.persistPlugin = plugins["hsw.plugin.persistence.Plugin"];
    ScreenshotUI.init(
      this.onTakeSnapshotBtnClk,
      this.onCancelBtnClk,
      this.onRatioSelectorHandler,
      this.onViewChangeHandler,
      this.end
    );
  },

  onRatioSelectorHandler(ratioKey: string): void {
    const ratio = ScreenshotEnum.RATIO_ENUM[ratioKey as keyof typeof ScreenshotEnum.RATIO_ENUM];
    ClipSelector.setRatio(ratio);
  },

  onCancelBtnClk(): void {
    ScreenshotHandler.end();
  },

  onTakeSnapshotBtnClk(): void {
    const handler = ScreenshotHandler;
    const clipWidth = Math.floor(ClipSelector.w);
    const clipHeight = Math.floor(ClipSelector.h);
    const clipLeft = Math.floor(ClipSelector.l);
    const clipTop = Math.floor(ClipSelector.t);
    const shouldSaveSnapshot = SnapshotSettings.getSnapshotSaveStatus();

    if (shouldSaveSnapshot && (!adskUser.isLogin() || !handler.app.designMetadata.get("designId"))) {
      ScreenshotHandler.end();
      handler.persistPlugin.ensureSaved();
      return;
    }

    const processClippedImage = (image: any): void => {
      let left = clipLeft;
      let top = clipTop;
      let width = clipWidth;
      let height = clipHeight;

      if (handler.app.is3DViewActive()) {
        left *= window.devicePixelRatio;
        top *= window.devicePixelRatio;
        width *= window.devicePixelRatio;
        height *= window.devicePixelRatio;
      }

      const clippedImage = HSApp.Util.Image.clip(image, left, top, width, height);
      image.xRelease();
      clippedImage.xAppendDbgInfo("Screenshot.Clip;");

      const dataURL = clippedImage.toDataURL("image/png");
      clippedImage.xRelease();

      const [mimeInfo, base64Data] = dataURL.split(";base64,");
      const mimeType = mimeInfo.replace("data:", "");
      const byteArray = new Uint8Array(HSApp.Util.Base64.decodeStringToByteArray(base64Data, false));
      const blob = new Blob([byteArray], { type: mimeType });

      if (shouldSaveSnapshot) {
        ScreenshotHandler.signalSavingSnapshot.dispatch({ file: blob, type: mimeType });
      }

      const timestamp = new Date().toUTCString();
      const fileName = `${HSApp.Io.ResourceManager.getInstance().getString("plugin_render_snapshot")}-${timestamp}`;
      saveAs(blob, `${fileName}.png`);
    };

    if (handler.app.is2DViewActive()) {
      const view2D = handler.app.getActive2DView();
      const boundingRect = view2D.context.getBoundingClientRect();
      const viewWidth = boundingRect.width;
      const viewHeight = boundingRect.height;

      handler.app.appSettings.cameraVisible = false;
      handler.app.saveDocument("thumbnail 2d", {
        format: "image/png",
        width: viewWidth,
        height: viewHeight,
        forground: false
      }, (imageUrl: string) => {
        handler.app.appSettings.cameraVisible = true;
        ResourceManager.load(imageUrl, HSApp.Io.Load.LoadTypeEnum.PluginImage).then((image: any) => {
          image.xAppendDbgInfo("Screenshot.2DImg;");
          processClippedImage(image);
        });
      });
    } else if (handler.app.is3DViewActive()) {
      const view3D = handler.app.getActive3DView();
      const clientRect = view3D.context.clientRect;
      const viewWidth = clientRect.width;
      const viewHeight = clientRect.height;

      handler.app.saveDocument("thumbnail 3d", {
        format: "image/png",
        width: viewWidth,
        height: viewHeight,
        forground: false
      }, (imageUrl: string) => {
        ResourceManager.load(imageUrl, HSApp.Io.Load.LoadTypeEnum.PluginImage).then((image: any) => {
          image.xAppendDbgInfo("Screenshot.3DImg;");
          processClippedImage(image);
        });
      });
    }
  },

  onViewChangeHandler(): void {
    const handler = ScreenshotHandler;
    if (handler.app.is2DViewActive()) {
      ScreenshotUI.onSwitchView("2d");
    } else if (handler.app.is3DViewActive()) {
      ScreenshotUI.onSwitchView("3d");
    }
  },

  start(): void {
    let viewMode: string;
    if (this.app.is3DViewActive()) {
      viewMode = "3d";
    } else if (this.app.is2DViewActive()) {
      viewMode = "2d";
    }
    ScreenshotUI.start(this.ratioKey, viewMode!);
  },

  end(): void {
    const handler = ScreenshotHandler;
    let viewMode: string;
    if (handler.app.is3DViewActive()) {
      viewMode = "3d";
    } else if (handler.app.is2DViewActive()) {
      viewMode = "2d";
    }
    handler.app.floorplan.active_camera.setFlagOff(HSCore.Model.CameraFlagEnum.toggleOff);
    ScreenshotUI.end(viewMode!);
  }
};

const ScreenshotUI = {
  onTakeSnapshotBtnClk: null as (() => void) | null,
  onCancelBtnClk: null as (() => void) | null,
  onRatioSelectorHandler: null as ((ratioKey: string) => void) | null,
  onViewChangeHandler: null as (() => void) | null,
  onEnd: null as (() => void) | null,

  init(
    takeSnapshotCallback: () => void,
    cancelCallback: () => void,
    ratioSelectorCallback: (ratioKey: string) => void,
    viewChangeCallback: () => void,
    endCallback: () => void
  ): void {
    this.onTakeSnapshotBtnClk = takeSnapshotCallback;
    this.onCancelBtnClk = cancelCallback;
    this.onRatioSelectorHandler = ratioSelectorCallback;
    this.onViewChangeHandler = viewChangeCallback;
    this.onEnd = endCallback;
    ClipSelector.init(ScreenshotHandler);
  },

  keydownHandler(event: KeyboardEvent): void {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;
    const TAB_KEY = 9;

    switch (event.keyCode) {
      case ESCAPE_KEY:
        ScreenshotUI.onEnd?.();
        break;
      case ENTER_KEY:
        ScreenshotUI.onTakeSnapshotBtnClk?.();
        break;
      case TAB_KEY:
        ScreenshotUI.onViewChangeHandler?.();
        break;
    }
  },

  onSwitchView(viewMode: string): void {
    const Z_INDEX_ACTIVE = "1000";
    if (viewMode === "2d") {
      $(".editor2dContainer").css({ zIndex: Z_INDEX_ACTIVE });
    } else if (viewMode === "3d") {
      $(".editor3dContainer").css({ zIndex: Z_INDEX_ACTIVE });
    }
    ViewSwitcher.switch();
  },

  onResetView(viewMode: string): void {
    const Z_INDEX_AUTO = "auto";
    if (viewMode === "2d") {
      $(".editor2dContainer").css({ zIndex: Z_INDEX_AUTO });
    } else if (viewMode === "3d") {
      $(".editor3dContainer").css({ zIndex: Z_INDEX_AUTO });
    }
  },

  start(ratioKey: string, viewMode: string): void {
    this.onSwitchView(viewMode);
    $(document).bind("keydown", this.keydownHandler);
    const ratio = ScreenshotEnum.RATIO_ENUM[ratioKey as keyof typeof ScreenshotEnum.RATIO_ENUM];
    ClipSelector.show(ratio);
    SnapshotSettings.show();
  },

  end(viewMode: string): void {
    this.onResetView(viewMode);
    $(document).unbind("keydown", this.keydownHandler);
    ClipSelector.hide();
    SnapshotSettings.hide();
  },

  initToolbarMenuItem(toolbar: any): void {
    toolbar.getItem("toolBar_assistant").add({
      name: "toolBar_snapshot_screenshot",
      type: "image",
      label: ResourceManager.getString("toolBar_snapshot_screenshot"),
      order: 800,
      onclick: () => {
        HSApp.Util.EventTrack.instance().track(
          HSApp.Util.EventGroupEnum.Toolbar,
          "toolBar_snapshot_screenshot_event"
        );
        ScreenshotHandler.start();
      },
      icon: "plugin/toolbar/res/ImgToolBar/snapshot.svg"
    });
  }
};

const ClipSelector = {
  w: 0,
  h: 0,
  l: 0,
  t: 0,

  init(handler: typeof ScreenshotHandler): void {
    // Initialize clip selector with handler
  },

  setRatio(ratio: number): void {
    // Set aspect ratio for clipping
  },

  show(ratio: number): void {
    // Show clip selector UI
  },

  hide(): void {
    // Hide clip selector UI
  }
};

const ViewSwitcher = {
  switch(): void {
    // Switch between views
  }
};

const SnapshotSettings = {
  getSnapshotSaveStatus(): boolean {
    // Get snapshot save status
    return false;
  },

  show(): void {
    // Show snapshot settings UI
  },

  hide(): void {
    // Hide snapshot settings UI
  }
};