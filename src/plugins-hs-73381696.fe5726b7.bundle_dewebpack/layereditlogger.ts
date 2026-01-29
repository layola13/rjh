interface LogEventParams {
  description: string;
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
  group: string;
  [key: string]: unknown;
}

interface UserTrackLogger {
  push(eventName: string, params: LogEventParams, options: { sendNow: boolean }): void;
}

interface AppSettings {
  layoutDesignMode: boolean;
}

interface App {
  userTrackLogger: UserTrackLogger;
  appSettings: AppSettings;
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  LogGroupTypes: {
    LayerOperation: string;
  };
};

const EVENT_RENAME = "hsw.plugin.layeredit.rename";
const EVENT_REORDER = "hsw.plugin.layeredit.reorder";
const EVENT_INSERT = "hsw.plugin.layeredit.insert";
const EVENT_SWITCH = "hsw.plugin.layeredit.switch";
const EVENT_DELETE = "hsw.plugin.layeredit.delete";
const EVENT_SHOW_ALL_LAYER = "hsw.plugin.layeredit.showAllLayer";

function logEvent(
  eventName: string,
  description: string,
  clicksRatioId: string,
  additionalParams?: Record<string, unknown>
): void {
  const app = HSApp.App.getApp();
  
  const params: LogEventParams = {
    description,
    activeSection: "layerEdit",
    activeSectionName: "多层编辑",
    clicksRatio: {
      id: clicksRatioId,
      name: description,
    },
    group: HSFPConstants.LogGroupTypes.LayerOperation,
    ...(additionalParams ?? {}),
  };

  app.userTrackLogger.push(eventName, params, { sendNow: false });
}

export class LayerEditLogger {
  static renameLayerClicked(): void {
    const app = HSApp.App.getApp();
    logEvent(EVENT_RENAME, "点击重命名", "layer_edit_rename_layer_clicked", {
      isLayoutDesignMode: app.appSettings.layoutDesignMode,
    });
  }

  static renameLayerInput(commit: boolean): void {
    logEvent(EVENT_RENAME, "输入重命名", "layer_edit_rename_layer_input", {
      commit,
    });
  }

  static layerSelectionClicked(): void {
    logEvent(EVENT_SWITCH, "点击楼层button", "layer_edit_layer_selection_clicked");
  }

  static reorderLayerClicked(): void {
    logEvent(EVENT_REORDER, "点击拖拽楼层 button", "layer_edit_reorder_layer_clicked");
  }

  static reorderLayerCommitted(): void {
    logEvent(EVENT_REORDER, "完成楼层调整", "layer_edit_reorder_layer_committed");
  }

  static reorderLayerDialogConfirmed(dontShowAgain: boolean): void {
    logEvent(EVENT_REORDER, "弹窗提示-用户选择确认", "layer_edit_reorder_layer_dialog_confirmed", {
      dontShowAgain,
    });
  }

  static reorderLayerDialogCanceled(dontShowAgain: boolean): void {
    logEvent(EVENT_REORDER, "弹窗提示-用户选择取消", "layer_edit_reorder_layer_dialog_canceled", {
      dontShowAgain,
    });
  }

  static insertLayerAboveClicked(): void {
    logEvent(EVENT_INSERT, "", "layer_edit_insert_layer_above");
  }

  static insertLayerBelowClicked(): void {
    logEvent(EVENT_INSERT, "", "layer_edit_insert_layer_below");
  }

  static insertLayerDialogConfirmed(dontShowAgain: boolean): void {
    logEvent(EVENT_INSERT, "弹窗提示-用户选择确认", "layer_edit_insert_layer_dialog_confirmed", {
      dontShowAgain,
    });
  }

  static insertLayerDialogCanceled(dontShowAgain: boolean): void {
    logEvent(EVENT_INSERT, "弹窗提示-用户选择取消", "layer_edit_insert_layer_dialog_canceled", {
      dontShowAgain,
    });
  }

  static deleteLayerClicked(committed: boolean): void {
    logEvent(EVENT_DELETE, "点击删除楼层", "layer_edit_delete_layer_clicked", {
      committed,
    });
  }

  static layerSwitchClicked(): void {
    logEvent(EVENT_SWITCH, "点击切换当前楼层", "layer_edit_switch_layer_clicked");
  }

  static showAllLayerClicked(showAllLayer: boolean): void {
    logEvent(EVENT_SHOW_ALL_LAYER, "点击显示全层", "layer_edit_show_all_layer_clicked", {
      showAllLayer,
    });
  }
}