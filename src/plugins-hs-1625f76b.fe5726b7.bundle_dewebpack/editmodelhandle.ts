import { ModelHandle } from './ModelHandle';
import { HSApp } from './HSApp';

interface ChangeResult {
  state: 'change' | 'newDesign';
}

interface ModelChangeParams {
  title: string;
  content: string;
  okButtonContent: string;
  cancelButtonContent?: string;
}

interface ModelChangeResponse {
  state: 'ok' | 'cancel';
}

interface OperatorInfo {
  operator?: string;
  management?: string;
}

async function callModelChange(params: ModelChangeParams): Promise<ModelChangeResponse> {
  // Implementation would be injected or imported
  return Promise.resolve({ state: 'ok' });
}

export class EditModelHandle extends ModelHandle {
  public lock: boolean = true;
  public isHeartbeat: boolean = true;

  constructor() {
    super();
  }

  protected initChangeToMap(): Record<string, (info: OperatorInfo) => Promise<ChangeResult>> {
    return {
      [HSApp.EditStatus.ENUM_EDIT_MODEL.READONLY]: async (info: OperatorInfo): Promise<ChangeResult> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_model_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_readonly').replace(
          /{editor}/g,
          info.operator ?? ''
        );
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_check_design');
        const cancelButtonContent = ResourceManager.getString('plugin_collaborate_edit_new_design');

        const response = await callModelChange({
          title,
          content,
          okButtonContent,
          cancelButtonContent,
        });

        if (response.state === 'ok') {
          return { state: 'change' };
        } else if (response.state === 'cancel') {
          return { state: 'newDesign' };
        }
        return { state: 'change' };
      },

      [HSApp.EditStatus.ENUM_EDIT_MODEL.VIEWER]: async (info: OperatorInfo): Promise<ChangeResult> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_permission_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_viewer').replace(
          /{admin}/g,
          info.management ?? ''
        );
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_check_design');
        const cancelButtonContent = ResourceManager.getString('plugin_collaborate_edit_new_design');

        const response = await callModelChange({
          title,
          content,
          okButtonContent,
          cancelButtonContent,
        });

        if (response.state === 'ok') {
          return { state: 'change' };
        } else if (response.state === 'cancel') {
          return { state: 'newDesign' };
        }
        return { state: 'change' };
      },

      [HSApp.EditStatus.ENUM_EDIT_MODEL.NO_PERMISSION]: async (info: OperatorInfo): Promise<ChangeResult> => {
        const title = ResourceManager.getString('plugin_collaborate_edit_permission_change');
        const content = ResourceManager.getString('plugin_collaborate_edit_to_no_permission').replace(
          /{admin}/g,
          info.management ?? ''
        );
        const okButtonContent = ResourceManager.getString('plugin_collaborate_edit_new_design');

        await callModelChange({
          title,
          content,
          okButtonContent,
        });

        return { state: 'newDesign' };
      },
    };
  }
}