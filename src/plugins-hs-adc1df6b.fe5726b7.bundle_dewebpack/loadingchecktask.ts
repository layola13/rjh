interface TaskOptions {
  hideLivehint?: boolean;
}

interface TaskResult {
  status: 'cancel' | 'success';
}

interface MessageBoxOptions {
  title: string;
  disablemask: boolean;
}

interface MessageBox {
  create(message: string, buttons: string[], defaultIndex: number, options: MessageBoxOptions): {
    show(): void;
  };
}

interface ResourceManager {
  getString(key: string): string;
}

interface OpenDesignHandler {
  loading: boolean;
}

declare const MessageBox: MessageBox;
declare const ResourceManager: ResourceManager;
declare const OpenDesignHandler: OpenDesignHandler;

export class LoadingCheckTask {
  private hideLivehint: boolean;

  constructor(options?: TaskOptions) {
    this.hideLivehint = options?.hideLivehint ?? false;
  }

  async execute(t: unknown, n: unknown): Promise<TaskResult> {
    if (OpenDesignHandler.loading) {
      if (!this.hideLivehint) {
        MessageBox.create(
          ResourceManager.getString("plugin_customtails_save_loading"),
          [ResourceManager.getString("setting_ok")],
          0,
          {
            title: "",
            disablemask: true
          }
        ).show();
      }
      return { status: "cancel" };
    }

    return { status: "success" };
  }
}