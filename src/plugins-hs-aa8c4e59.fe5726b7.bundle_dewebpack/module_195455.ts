class ImportDesignHandler {
  public readonly signalImportDesignCanceled: HSCore.Util.Signal;
  public readonly signalRoomDesignApplied: HSCore.Util.Signal;

  constructor() {
    this.signalImportDesignCanceled = new HSCore.Util.Signal();
    this.signalRoomDesignApplied = new HSCore.Util.Signal();
  }

  /**
   * Handles success logic after importing design
   */
  public dealWithSuccessLogicAfterImport(
    callback: (param1: unknown, param2: unknown, param3: unknown) => void,
    param1: unknown,
    param2: unknown,
    param3: unknown
  ): void {
    if (HSApp.UI.FullScreenLoading.isShowing()) {
      HSApp.UI.FullScreenLoading.hide();
      callback(param1, param2, param3);

      if (AutomationTestUtil.isAutomationTest()) {
        const AUTOMATION_TEST_DELAY = 8000;
        const IMAGE_GENERATION_DELAY = 1000;

        setTimeout(() => {
          const imageConfig = {
            width: 800,
            height: 800,
            factor: 1.2,
            environment: HSApp.App.getApp().defaultEnvironmentId,
            viewMode: HSApp.View.ViewModeEnum.Plane
          };

          AutomationTestUtil.get2DImage(imageConfig).then((base64Image: string) => {
            AutomationTestUtil.saveBase64ToPng(base64Image, imageConfig.viewMode);
            imageConfig.viewMode = HSApp.View.ViewModeEnum.RCP;

            setTimeout(() => {
              AutomationTestUtil.get2DImage(imageConfig).then((rcpBase64Image: string) => {
                AutomationTestUtil.saveBase64ToPng(rcpBase64Image, imageConfig.viewMode);
              });
            }, IMAGE_GENERATION_DELAY);
          });
        }, AUTOMATION_TEST_DELAY);
      }

      this.signalRoomDesignApplied.dispatch();
    }
  }

  /**
   * Handles failure logic after importing design
   */
  public dealWithFailLogicAfterImport(errorData: unknown, errorMessage: string): void {
    const HINT_DISPLAY_DURATION = 4500;

    HSApp.UI.FullScreenLoading.hide();

    const hintOptions = {
      status: LiveHint.statusEnum.warning,
      canclose: true
    };

    LiveHint.show(errorMessage, HINT_DISPLAY_DURATION, undefined, hintOptions);
    this.signalImportDesignCanceled.dispatch(errorData);
  }
}

export default ImportDesignHandler;