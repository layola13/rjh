// @ts-nocheck
import { trackLog } from './tracking';
import { OperationId, BaseOperation } from './base-operation';

interface AIGCBenefits {
  totalCount?: number;
  aiModelerCount?: number;
}

interface AdskUser {
  aigcBeifits?: AIGCBenefits;
}

interface SelectionOption {
  index: number;
  label: string;
  isConfirmUploadBtn?: boolean;
}

interface LinkOption {
  type: string;
  text: string;
  url: string;
}

interface OperationContext {
  result?: {
    actionType: string;
  };
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const adskUser: AdskUser | null | undefined;

export class OpImageTo3DModelControl extends BaseOperation {
  static getId(): string {
    return OperationId.ImageTo3DModel;
  }

  async onExecute(context: OperationContext): Promise<void> {
    const user = adskUser;
    const totalCount = user?.aigcBeifits?.totalCount ?? 0;
    const aiModelerCount = user?.aigcBeifits?.aiModelerCount ?? 0;

    const tipMessage = ResourceManager.getString("homegpt_Image_To_Model_tip")
      .replace(/{totalCount}/g, String(totalCount))
      .replace(/{aiModelerCount}/g, String(aiModelerCount));

    const selectionOptions: SelectionOption[] = [
      {
        index: 1,
        label: ResourceManager.getString("homegpt_Image_To_Model_upload_btn"),
        isConfirmUploadBtn: true
      },
      {
        index: 0,
        label: ResourceManager.getString("homegpt_render_cam_point_cancel_tip")
      }
    ];

    const linkOption: LinkOption = {
      type: "link",
      text: ResourceManager.getString("homegpt_Image_To_Model_link_tip"),
      url: "https://www.homestyler.com/forum/view/1867520537999974402"
    };

    const handleSelection = (selectedIndex: number): void => {
      if (selectedIndex === 1) {
        trackLog("Home.Copilot.ImageTo3DModel.Upload", "点击图片上传生成3D模型");
      } else {
        context.result = {
          actionType: "cancel"
        };
        this.onFinish(
          "success",
          ResourceManager.getString("homegpt_Image_To_Model_cancel_tip"),
          context
        );
        trackLog("Home.Copilot.ImageTo3DModel.Cancel", "取消点击图片上传生成3D模型");
      }
    };

    this.onQuerySelection(tipMessage, selectionOptions, handleSelection, linkOption);
  }
}