interface TaskContext {
  updateThumbnail?: boolean;
}

interface TaskResult {
  status: 'success';
}

interface ExportImageOptions {
  width: number;
  height: number;
  forground: boolean;
}

interface App {
  designMetadata: {
    set(key: string, value: string): void;
  };
}

interface HSAppStatic {
  App: {
    getApp(): App;
  };
}

declare const HSApp: HSAppStatic;

class CanvasExporter {
  static async exportImgFromCanvas(
    app: App,
    type: string,
    options: ExportImageOptions
  ): Promise<string> {
    throw new Error('Method not implemented');
  }
}

export class UploadThumbTask {
  async execute(context: TaskContext, _options?: unknown): Promise<TaskResult> {
    if (!context.updateThumbnail) {
      return { status: 'success' };
    }

    const app = HSApp.App.getApp();
    const thumbnailData = await CanvasExporter.exportImgFromCanvas(
      app,
      'thumbnail 3d',
      {
        width: 960,
        height: 540,
        forground: false
      }
    );

    app.designMetadata.set('threeDThumbnail', thumbnailData);

    return { status: 'success' };
  }
}