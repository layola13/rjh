import { App } from './App';
import { PluginManager } from './PluginManager';
import { Floorplan } from './Floorplan';
import { DesignMetadata } from './DesignMetadata';
import { Request } from './Request';
import { ExportUtil } from './ExportUtil';
import { DesignUtil } from './DesignUtil';

declare const HSApp: {
  App: {
    getApp(): App;
  };
  Io: {
    Request: {
      Design: typeof Request;
    };
  };
  Util: {
    Design: typeof DesignUtil;
  };
};

declare const HSFPConstants: {
  PluginType: {
    CollaborateEdit: string;
  };
  Environment: {
    ManualLighting: string;
    Render: string;
  };
};

interface TaskContext {
  designId: string;
}

interface TaskData {
  data: unknown;
  ext: string;
}

interface TaskResult {
  status: 'success';
}

interface SaveResponse {
  versionId?: string;
  data?: unknown;
  error?: unknown;
}

interface ExportImageOptions {
  width: number;
  height: number;
  forground: boolean;
}

interface CollaboratePlugin {
  isCollaborate?: () => boolean;
}

interface PermissionUtil {
  isOwner(): boolean;
}

declare const PermissionUtil: PermissionUtil;

/**
 * Automatic remote persister task for saving design data
 */
export class AutoRemotePersisterTask {
  /**
   * Executes the auto-save task
   * @param context - Task context containing design ID
   * @param data - Task data containing design data and extension
   * @returns Promise resolving to task result
   */
  public execute(context: TaskContext, data: TaskData): Promise<TaskResult> {
    const app = HSApp.App.getApp();
    const plugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.CollaborateEdit) as CollaboratePlugin | null;

    const isOwner = PermissionUtil.isOwner();
    const isCollaborating = plugin?.isCollaborate?.() ?? false;

    if (!isOwner || isCollaborating) {
      return Promise.resolve({ status: 'success' });
    }

    const versionId = app.designMetadata.get('versionId');
    if (versionId) {
      return Promise.resolve({ status: 'success' });
    }

    return this._doSave(context, data).then(() => {
      return Promise.resolve({ status: 'success' });
    });
  }

  /**
   * Performs the actual save operation
   * @param context - Task context containing design ID
   * @param data - Task data containing design data and extension
   * @returns Promise resolving when save is complete
   */
  private async _doSave(context: TaskContext, data: TaskData): Promise<SaveResponse> {
    const app = HSApp.App.getApp();
    const activeEnvironmentId = app.activeEnvironmentId;
    const designJson = app.floorplan.jsonToString(data.data);

    let thumbnail: string | undefined;

    const isRenderEnvironment = [
      HSFPConstants.Environment.ManualLighting,
      HSFPConstants.Environment.Render
    ].includes(activeEnvironmentId);

    if (isRenderEnvironment) {
      const existingThumbnail = app.designMetadata.get('threeDThumbnail');
      if (existingThumbnail) {
        thumbnail = existingThumbnail;
      }
    } else {
      thumbnail = await ExportUtil.exportImgFromCanvas(app, 'thumbnail 3d', {
        width: 1920,
        height: 1080,
        forground: false
      }).catch(() => {
        return app.designMetadata.get('threeDThumbnail');
      });
    }

    const response = await Request.saveDesignJson(
      context.designId,
      designJson,
      data.ext,
      thumbnail
    );

    if (response?.versionId) {
      app.designMetadata.set('designVersion', response.versionId);
    } else {
      const existingVersion = app.designMetadata.get('designVersion');
      if (!existingVersion) {
        console.error('Save failed, no designVersion.');
        return Promise.reject({ error: response });
      }
    }

    response.data = DesignUtil.getRoomInfo();
    return await Request.extractDesignExtraInfo(response);
  }
}