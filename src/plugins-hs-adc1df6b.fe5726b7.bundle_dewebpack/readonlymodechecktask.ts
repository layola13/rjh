interface ExecuteContext {
  isSaveas?: boolean;
  silent?: boolean;
}

interface ExecuteResult {
  status: string;
  data?: {
    readonly: boolean;
  };
}

interface QueryStrings {
  editorMode?: string;
}

interface LiveHintOptions {
  status: number;
  canclose: boolean;
}

interface LiveHintStatusEnum {
  warning: number;
}

interface LiveHint {
  show(message: string, duration: number, arg: null, options: LiveHintOptions): void;
  statusEnum: LiveHintStatusEnum;
}

interface ResourceManager {
  getString(key: string): string;
}

interface HSAppUtil {
  Url: {
    getQueryStrings(): QueryStrings | null;
  };
}

interface HSApp {
  Util: HSAppUtil;
}

declare const LiveHint: LiveHint;
declare const ResourceManager: ResourceManager;
declare const HSApp: HSApp;

interface ReadonlyModeCheckTaskOptions {
  hideLivehint?: boolean;
}

export class ReadonlyModeCheckTask {
  private hideLivehint: boolean;

  constructor(options?: ReadonlyModeCheckTaskOptions) {
    this.hideLivehint = options?.hideLivehint ?? false;
  }

  execute(context: ExecuteContext, _t: unknown): Promise<ExecuteResult> {
    const queryStrings = HSApp.Util.Url.getQueryStrings();

    if (!context.isSaveas && queryStrings?.editorMode === "readOnly") {
      if (!this.hideLivehint && context.silent !== true) {
        const message = ResourceManager.getString("save_readonly_design_mode");
        LiveHint.show(message, 10000, null, {
          status: LiveHint.statusEnum.warning,
          canclose: true
        });
      }

      return Promise.reject({
        status: "cancel"
      });
    }

    return Promise.resolve({
      status: "success",
      data: {
        readonly: false
      }
    });
  }
}