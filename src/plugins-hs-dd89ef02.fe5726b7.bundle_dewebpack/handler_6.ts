interface SettingStatus {
  default3DView: boolean;
  firstPersonCameraRotationType: boolean;
  mouseLeftAndRightButtonSetting: boolean;
}

interface UserSettingData {
  visible: boolean;
}

interface InitOptions {
  app: any;
}

interface SettingStatusOptions {
  default3DView?: boolean;
  firstPersonCameraRotationType?: boolean;
  mouseLeftAndRightButtonSetting?: boolean;
}

interface UserSettingDialogComponent {
  show(param1: any, param2: any): void;
  setState(state: { visible: boolean }): void;
}

interface ViewSettingComponent {
  hide(): void;
}

export class Handler {
  viewSetting?: ViewSettingComponent;
  userSettingDialog!: UserSettingDialogComponent;
  private _app: any;
  signalUserSettingToLog: HSCore.Util.Signal;
  settingStatus: SettingStatus;

  constructor() {
    this.viewSetting = undefined;
    this.settingStatus = {
      default3DView: false,
      firstPersonCameraRotationType: false,
      mouseLeftAndRightButtonSetting: false
    };
    this.signalUserSettingToLog = new HSCore.Util.Signal();
  }

  handleSubmit = (data: any): void => {
    this.signalUserSettingToLog.dispatch({ data });
  };

  init(options: InitOptions): void {
    this._app = options.app;
    const pluginContainer = document.querySelector("#plugin-container");
    const dialogElement = document.createElement("div");
    
    if (dialogElement) {
      dialogElement.className = "user-setting-dialog";
    }
    
    const mountedElement = pluginContainer?.appendChild(dialogElement);
    
    this.userSettingDialog = ReactDOM.render(
      React.createElement(UserSettingDialog, {
        handleSubmit: this.handleSubmit,
        userData: { visible: false }
      }),
      mountedElement
    ) as UserSettingDialogComponent;
  }

  initSettingStatus(options: SettingStatusOptions): void {
    const { default3DView, firstPersonCameraRotationType, mouseLeftAndRightButtonSetting } = options;
    
    if (default3DView !== undefined) {
      this.settingStatus.default3DView = default3DView;
    }
    
    if (firstPersonCameraRotationType !== undefined) {
      this.settingStatus.firstPersonCameraRotationType = firstPersonCameraRotationType;
    }
    
    if (mouseLeftAndRightButtonSetting !== undefined) {
      this.settingStatus.mouseLeftAndRightButtonSetting = mouseLeftAndRightButtonSetting;
    }
  }

  getSettingStatus(): SettingStatus {
    return this.settingStatus;
  }

  showViewSetting(): void {
    const uiContainer = document.querySelector("#ui-container");
    const settingElement = document.createElement("div");
    settingElement.className = "view-setting-container";
    const mountedElement = uiContainer?.appendChild(settingElement);
    
    if (mountedElement) {
      this.viewSetting = ReactDOM.render(
        React.createElement(ViewSetting, null),
        mountedElement
      ) as ViewSettingComponent;
    }
  }

  hideViewSetting(): void {
    this.viewSetting?.hide();
  }

  show(param1: any, param2: any): void {
    this.userSettingDialog.show(param1, param2);
  }

  hide(): void {
    this.userSettingDialog.setState({ visible: false });
  }
}