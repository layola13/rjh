interface GuideStep {
  title: string;
  skip: string;
  btntext: string;
  contents: unknown;
}

interface GuideSteps {
  [key: string]: GuideStep;
}

interface CardViewerOptions {
  key: string;
  step?: GuideStep;
}

interface Position {
  right: number;
  bottom: number;
}

interface CardViewerProps {
  viewertitle: string;
  isfixedheight: boolean;
  skipmsg: string;
  btntext: string;
  keytype: string;
  position: Position;
  actioncall: () => void;
  contents: unknown;
  baseurl: string;
}

interface WorkflowGuideProps {
  steps: GuideStep[];
  keytype: string;
  baseurl: string;
}

interface StorageData {
  [key: string]: boolean;
}

interface SignalSkipData {
  key: string;
}

interface CommandStartData {
  cmd: {
    type: string;
    mode?: string;
    entity?: unknown;
    signalMoveSnapped?: {
      listen: (callback: (e: unknown) => void, context: unknown) => void;
      unlisten: (callback: (e: unknown) => void, context: unknown) => void;
    };
  };
}

interface CommandEndData {
  cmd: {
    type: string;
    signalMoveSnapped?: {
      unlisten: (callback: (e: unknown) => void, context: unknown) => void;
    };
  };
}

interface CommandTerminatedData {
  cmd: {
    type: string;
    isCommitted: boolean;
  };
}

interface ViewActivatedData {
  newView: {
    name: string;
  };
}

interface AppSettingsChangedData {
  fieldName: string;
  value: boolean;
}

interface SelectionChangedEvent {
  target: {
    selected: (param: boolean) => unknown[];
  };
}

interface PluginEvent<T = unknown> {
  data: T;
}

const CARD_TYPE_ENUM = {
  workflow: "workflow",
  command: "commandkeys"
} as const;

const STORAGE_NAME = "userGuideData";

class UserGuidePlugin extends HSApp.Plugin.IPlugin {
  private storageName: string = STORAGE_NAME;
  private signalSkipBtnClicked = HSApp.Util.Storage.signalSkipBtnClicked;
  private baseUrl: string;
  private locale?: string;
  private steps?: GuideSteps;
  private workflow?: { close: () => void };
  private key?: string;

  constructor() {
    super({
      name: "User Guide plugin",
      description: "provide user guide for floorplan",
      dependencies: []
    });

    this.baseUrl = HSApp.PartnerConfig?.RES_BASEPATH ?? HSApp.Config?.RES_BASEPATH ?? "";
    this.baseUrl += "v2/";
  }

  onActive(event: PluginEvent<{ app: unknown }>): void {
    super.onActive([event]);

    const app = event.data.app as any;
    const cmdManager = app.cmdManager;

    this.locale = app.appParams.locale;
    this.init();

    this.signalSkipBtnClicked.listen(this.skipbtnClicked, this);
    cmdManager.signalCommandStarted.listen(this.commandStart, this);
    cmdManager.signalCommandTerminated.listen(this.commandEnded, this);
    app.selectionManager.signalSelectionChanged.listen(this.onSelectionChanged, this);
    app.signalViewActivated.listen(this.updateView, this);
    app.appSettings.signalValueChanged.listen(this.onAppSettingsChanged, this);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }

  private init(): void {
    const tenant = HSApp.App.getApp().appParams.tenant;
    const defaultLocale = tenant === "fp" ? "en_US" : "zh_CN";
    const locale = this.locale ?? defaultLocale;
    const fileName = `guide_${locale}.json`;
    const url = `${this.baseUrl}userguide/${fileName}?rand=${Math.random()}`;

    NWTK.ajax.get(url).then((response: GuideSteps) => {
      this.steps = response;
    });
  }

  private updateView(event: PluginEvent<ViewActivatedData>): void {
    if (event.data.newView.name === "svg") {
      this.close();
    }
  }

  private onAppSettingsChanged(event: PluginEvent<AppSettingsChangedData>): void {
    if (event.data.fieldName === "boxSelectEnabled" && event.data.value) {
      this.showCardViewer({ key: "windowselect" });
    }
  }

  private onSelectionChanged(event: SelectionChangedEvent): void {
    const selected = event.target.selected(true);

    if (selected.length === 1) {
      const entity = selected[0];
      if (entity instanceof HSCore.Model.Door || entity instanceof HSCore.Model.Window) {
        this.showCardViewer({ key: "adddoorandwindow" });
      }
    }
  }

  private setStorage(key: string, value: StorageData): void {
    HSApp.Util.Storage.initStorage(key);
    HSApp.Util.Storage.storage[key].set(key, value);
  }

  private getStorage(key: string): StorageData | undefined {
    return HSApp.Util.Storage.getStorage(key);
  }

  private clearStorage(key: string): void {
    HSApp.Util.Storage.clearStorage(key);
  }

  resetGuideStorage(): void {
    this.clearStorage(this.storageName);
  }

  private isFirstTime(key: string): boolean {
    const storageData = this.getStorage(this.storageName);
    const commandType = CARD_TYPE_ENUM.command;

    return (!storageData || !storageData[commandType]) && (!storageData || !storageData[key]);
  }

  private skipbtnClicked(event: PluginEvent<SignalSkipData>): void {
    if (event.data.key === CARD_TYPE_ENUM.workflow) {
      return;
    }

    const data: StorageData = {
      [CARD_TYPE_ENUM.command]: true
    };

    HSApp.Util.Storage.initStorage(this.storageName);
    HSApp.Util.Storage.storage.userGuideData.set(this.storageName, data);
    this.workflow = undefined;
  }

  private moveSnap(event: unknown): void {
    if (!this.isFirstTime("movesnap")) {
      return;
    }

    this.showCardViewer({ key: "movesnap" });
  }

  private commandStart(event: PluginEvent<CommandStartData>): void {
    const cmd = event.data.cmd;
    let commandType = cmd.type;

    if (cmd.signalMoveSnapped) {
      cmd.signalMoveSnapped.listen(this.moveSnap, this);
    }

    if (cmd.mode) {
      commandType = `${commandType}.${cmd.mode}`;
    }

    const isEditCommand = [
      HSFPConstants.CommandType.EditMaterial,
      HSFPConstants.CommandType.Decoration
    ].includes(commandType);

    if (isEditCommand && !cmd.entity) {
      commandType = "hsw.plugin.wallstyle";
    }

    if (!this.isFirstTime(commandType)) {
      return;
    }

    this.showCardViewer({ key: commandType });
  }

  private commandEnd(event: PluginEvent<CommandEndData>): void {
    const cmd = event.data.cmd;
    const commandType = cmd.type;

    const isEditCommand = [
      HSFPConstants.CommandType.EditMaterial,
      HSFPConstants.CommandType.Decoration
    ].includes(commandType);

    if (isEditCommand) {
      this.close();
    }

    if (cmd.signalMoveSnapped) {
      cmd.signalMoveSnapped.unlisten(this.moveSnap, this);
    }
  }

  private commandEnded(event: PluginEvent<CommandTerminatedData>): void {
    const { type, isCommitted } = event.data.cmd;

    if (type === HSFPConstants.CommandType.CreateFreeformNGWall && !isCommitted) {
      this.close();
    }
  }

  close(): void {
    this.workflow?.close();
  }

  private getGuideMessage(key: string): GuideStep | undefined {
    return this.steps?.[key];
  }

  showCardViewer(options: CardViewerOptions): void {
    const app = HSApp.App.getApp();

    if (app.activeEnvironmentId !== HSFPConstants.Environment.CustomizedModeling) {
      return;
    }

    this.key = options.key ?? CARD_TYPE_ENUM.command;
    const step = options.step ?? this.getGuideMessage(this.key);

    if (!step || !this.key) {
      return;
    }

    const props: CardViewerProps = {
      viewertitle: step.title,
      isfixedheight: false,
      skipmsg: step.skip,
      btntext: step.btntext,
      keytype: this.key,
      position: {
        right: 10,
        bottom: 57
      },
      actioncall: () => {
        this.workflow?.close();
      },
      contents: step.contents,
      baseurl: this.baseUrl
    };

    const container = document.querySelector(".guidecontainer");
    this.workflow = ReactDOM.render(React.createElement(HSApp.Component.CardViewer, props), container);

    if (this.key === CARD_TYPE_ENUM.command) {
      return;
    }

    let storageData = this.getStorage(this.storageName);
    const newData: StorageData = { [this.key]: true };

    if (storageData) {
      storageData[this.key] = true;
    } else {
      storageData = newData;
    }

    this.setStorage(this.storageName, storageData);
  }

  showWorkFlowGuide(options: { key?: string; steps?: GuideStep[] }): void {
    this.key = options.key ?? CARD_TYPE_ENUM.workflow;
    const steps = options.steps ?? this.getGuideMessage(this.key);

    const props: WorkflowGuideProps = {
      steps: steps as GuideStep[],
      keytype: this.key,
      baseurl: this.baseUrl
    };

    const container = document.querySelector(".guidecontainer");
    ReactDOM.render(React.createElement(HSApp.Component.WorkflowGuide, props), container);
  }
}

HSApp.Util.Core.define("hsw.plugin.userguide").cardTypeEnum = CARD_TYPE_ENUM;
HSApp.Plugin.registerPlugin("hsw.plugin.userguide.Plugin", UserGuidePlugin);