interface SaveFormCheckTaskOptions {
  showSaveDialog: (params: ExecuteParams) => Promise<ExecuteResult>;
}

interface ExecuteParams {
  silent?: boolean;
  isSaveas?: boolean;
}

interface ExecuteResult {
  status: 'success' | 'failure';
}

interface App {
  getApp(): unknown;
}

interface HSApp {
  App: App;
}

declare const HSApp: HSApp;

class DesignUtils {
  static getDesignId(app: unknown): string | null {
    // Implementation depends on actual logic
    return null;
  }

  static getDesignName(app: unknown): string | null {
    // Implementation depends on actual logic
    return null;
  }
}

export class SaveFormCheckTask {
  private readonly showSaveDialog: (params: ExecuteParams) => Promise<ExecuteResult>;

  constructor(options: SaveFormCheckTaskOptions) {
    this.showSaveDialog = options.showSaveDialog.bind(options);
  }

  execute(params: ExecuteParams, _context?: unknown): Promise<ExecuteResult> {
    if (params.silent) {
      return Promise.resolve({ status: 'success' });
    }

    const app = HSApp.App.getApp();
    const designId = DesignUtils.getDesignId(app);
    const designName = DesignUtils.getDesignName(app);

    if (designId && designName && !params.isSaveas) {
      return Promise.resolve({ status: 'success' });
    }

    return this.showSaveDialog(params);
  }
}