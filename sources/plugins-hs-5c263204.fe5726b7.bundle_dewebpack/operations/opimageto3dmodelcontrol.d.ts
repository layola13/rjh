/**
 * 图片生成3D模型操作控制器
 * 提供图片上传并转换为3D模型的功能
 */

import { OperationId, BaseOperation } from './BaseOperation';
import { trackLog } from './TrackingService';

/**
 * AIGC权益信息接口
 */
interface AigcBenefits {
  /** 总次数 */
  totalCount?: number;
  /** AI建模器可用次数 */
  aiModelerCount?: number;
}

/**
 * 用户信息接口
 */
interface AdskUser {
  /** AIGC权益信息 */
  aigcBeifits?: AigcBenefits;
}

/**
 * 操作结果接口
 */
interface OperationResult {
  /** 操作类型 */
  actionType: 'cancel' | 'confirm' | 'upload';
}

/**
 * 操作上下文接口
 */
interface OperationContext {
  /** 操作结果 */
  result?: OperationResult;
}

/**
 * 选项按钮配置接口
 */
interface SelectionOption {
  /** 按钮索引 */
  index: number;
  /** 按钮文本 */
  label: string;
  /** 是否为确认上传按钮 */
  isConfirmUploadBtn?: boolean;
}

/**
 * 链接配置接口
 */
interface LinkConfig {
  /** 类型 */
  type: 'link';
  /** 链接文本 */
  text: string;
  /** 链接URL */
  url: string;
}

/**
 * 全局资源管理器声明
 */
declare const ResourceManager: {
  getString(key: string): string;
};

/**
 * 全局用户对象声明
 */
declare const adskUser: AdskUser | undefined;

/**
 * 图片转3D模型操作控制器
 * 继承自BaseOperation，实现图片上传并生成3D模型的交互流程
 */
export class OpImageTo3DModelControl extends BaseOperation {
  /**
   * 构造函数
   */
  constructor() {
    super();
  }

  /**
   * 获取操作ID
   * @returns 操作标识符
   */
  static getId(): OperationId {
    return OperationId.ImageTo3DModel;
  }

  /**
   * 执行操作
   * 显示图片转3D模型的确认对话框，处理用户选择
   * @param context - 操作上下文对象
   * @returns Promise，操作完成时resolve
   */
  async onExecute(context: OperationContext): Promise<void> {
    // 获取用户权益信息
    const totalCount = adskUser?.aigcBeifits?.totalCount;
    const aiModelerCount = adskUser?.aigcBeifits?.aiModelerCount;

    // 配置对话框按钮选项
    const options: SelectionOption[] = [
      {
        index: 1,
        label: ResourceManager.getString('homegpt_Image_To_Model_upload_btn'),
        isConfirmUploadBtn: true
      },
      {
        index: 0,
        label: ResourceManager.getString('homegpt_render_cam_point_cancel_tip')
      }
    ];

    // 配置帮助链接
    const linkConfig: LinkConfig = {
      type: 'link',
      text: ResourceManager.getString('homegpt_Image_To_Model_link_tip'),
      url: 'https://www.homestyler.com/forum/view/1867520537999974402'
    };

    // 构建提示消息（包含用户权益次数信息）
    const message = ResourceManager.getString('homegpt_Image_To_Model_tip')
      .replace(/{totalCount}/g, `${totalCount ?? ''}`)
      .replace(/{aiModelerCount}/g, `${aiModelerCount ?? ''}`);

    // 显示选择对话框并处理用户响应
    this.onQuerySelection(
      message,
      options,
      (selectedIndex: number) => {
        if (selectedIndex === 1) {
          // 用户点击上传按钮
          trackLog(
            'Home.Copilot.ImageTo3DModel.Upload',
            '点击图片上传生成3D模型'
          );
        } else {
          // 用户点击取消按钮
          context.result = {
            actionType: 'cancel'
          };
          this.onFinish(
            'success',
            ResourceManager.getString('homegpt_Image_To_Model_cancel_tip'),
            context
          );
          trackLog(
            'Home.Copilot.ImageTo3DModel.Cancel',
            '取消点击图片上传生成3D模型'
          );
        }
      },
      linkConfig
    );
  }

  /**
   * 查询用户选择（由父类BaseOperation提供）
   * @param message - 提示消息
   * @param options - 选项按钮数组
   * @param callback - 用户选择后的回调函数
   * @param linkConfig - 可选的链接配置
   */
  protected onQuerySelection(
    message: string,
    options: SelectionOption[],
    callback: (selectedIndex: number) => void,
    linkConfig?: LinkConfig
  ): void {
    // 由父类实现
  }

  /**
   * 完成操作（由父类BaseOperation提供）
   * @param status - 操作状态
   * @param message - 完成消息
   * @param context - 操作上下文
   */
  protected onFinish(
    status: 'success' | 'error',
    message: string,
    context: OperationContext
  ): void {
    // 由父类实现
  }
}