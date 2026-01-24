/**
 * FeedbackUploaderBlock - 反馈上传组件
 * 用于在反馈表单中上传图片文件
 */

import React from 'react';
import { FeedbackBlock } from './FeedbackBlock';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import { IconfontView, Icons } from './IconComponents';
import { uploadFileToS3 } from './fileUploadUtils';
import { uuid } from './utils';

/**
 * 文件列表项接口
 */
interface FileListItem {
  /** 文件唯一标识 */
  id: string;
  /** 文件上传后的URL */
  url: string;
}

/**
 * 组件属性接口
 */
interface FeedbackUploaderBlockProps {
  /** 标签文本 */
  label: string;
  /** 是否必填 */
  required?: boolean;
  /** 最大上传文件数量 */
  maxLen?: number;
  /** 单个文件最大大小（字节） */
  fileMaxSize?: number;
}

/**
 * 组件状态接口
 */
interface FeedbackUploaderBlockState {
  /** 已上传的文件列表 */
  fileList: FileListItem[];
}

/**
 * 文件大小格式化结果
 */
interface FormattedSize {
  value: string;
  unit: string;
}

/**
 * 反馈上传组件类
 * 继承自FeedbackBlock，提供文件上传功能
 */
export class FeedbackUploaderBlock extends FeedbackBlock<
  FeedbackUploaderBlockProps,
  FeedbackUploaderBlockState
> {
  /** 文件输入元素引用 */
  private attachmentInputRef: HTMLInputElement | null = null;

  /** 默认文件最大大小：20MB */
  private readonly defaultFileMaxSize = 20 * 1024 * 1024;

  constructor(props: FeedbackUploaderBlockProps) {
    super(props);

    this.state = {
      fileList: [],
    };

    this.onFileChange = this.onFileChange.bind(this);
    this.onChooseFile = this.onChooseFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  /**
   * 获取已上传文件的URL列表
   * @returns 文件URL数组
   */
  getValue(): string[] {
    return this.state.fileList.map((file) => file.url);
  }

  /**
   * 检查是否为空（必填时无文件）
   * @returns 是否为空
   */
  isEmpty(): boolean {
    return !!this.props.required && this.getValue().length === 0;
  }

  /**
   * 将字节数转换为可读的文件大小格式
   * @param bytes - 字节数
   * @returns 格式化后的大小字符串（如 "1.5MB"）
   */
  private toSize(bytes: number): string {
    const gb = Math.floor(bytes / 1024 / 1024 / 1024);
    const mb = Math.floor((bytes - gb * 1024 * 1024 * 1024) / 1024 / 1024);
    const kb = Math.floor((bytes - gb * 1024 * 1024 * 1024 - mb * 1024 * 1024) / 1024);
    const b = bytes - gb * 1024 * 1024 * 1024 - mb * 1024 * 1024 - kb * 1024;

    return `${gb ? gb + 'GB' : ''}${mb ? mb + 'MB' : ''}${kb ? kb + 'KB' : ''}${b ? b + 'byte' : ''}`;
  }

  /**
   * 文件选择变化处理函数
   */
  private async onFileChange(): Promise<void> {
    const files = this.attachmentInputRef?.files;
    if (!files || files.length < 1) {
      return;
    }

    const file = files[0];
    if (!file) {
      return;
    }

    const maxSize = this.props.fileMaxSize ?? this.defaultFileMaxSize;

    if (file.size > maxSize) {
      const errorMessage = ResourceManager.getString('plugin_feedback_upload_max_file_size')?.replace(
        '%max%',
        this.toSize(maxSize)
      );
      LiveHint.show(errorMessage, 3000, null, {
        status: LiveHint.statusEnum.warning,
      });
      return;
    }

    try {
      const url = await uploadFileToS3(file);
      const newFileList = [...this.state.fileList];
      newFileList.push({
        id: uuid(),
        url,
      });
      this.setState({ fileList: newFileList });
    } catch (error) {
      LiveHint.show('图片上传失败', 3000);
    } finally {
      if (this.attachmentInputRef) {
        this.attachmentInputRef.value = '';
      }
    }
  }

  /**
   * 触发文件选择对话框
   */
  private onChooseFile(): void {
    this.attachmentInputRef?.click();
  }

  /**
   * 移除指定文件
   * @param fileId - 要移除的文件ID
   */
  private removeFile(fileId: string): void {
    const newFileList = [...this.state.fileList];
    this.setState({
      fileList: newFileList.filter((file) => file.id !== fileId),
    });
  }

  render(): React.ReactNode {
    const { label, required, maxLen } = this.props;
    const { fileList } = this.state;

    const maxUploadHint = maxLen
      ? ResourceManager.getString('plugin_feedback_max_upload')?.replace('%max%', maxLen.toString())
      : undefined;

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-uploader-block ${this.context}`}>
          <FeedbackBlockLabel label={label} required={required}>
            {maxLen && <span>{maxUploadHint}</span>}
          </FeedbackBlockLabel>

          <div className="feedback-uploader-block-uploader">
            <input
              ref={(ref) => {
                this.attachmentInputRef = ref;
              }}
              type="file"
              name="upload"
              id="upload"
              style={{ display: 'none' }}
              accept="image/png, image/jpeg"
              multiple={false}
              onChange={this.onFileChange}
            />

            <div className="feedback-uploader-block-uploader-list">
              {fileList.map((file) => (
                <div key={file.id} className="feedback-uploader-block-uploader-item">
                  {file.url && <img src={file.url} alt="uploaded" />}
                  <span
                    className="feedback-uploader-block-uploader-item-close"
                    onClick={() => this.removeFile(file.id)}
                  >
                    <IconfontView
                      showType="hs_xian_guanbi"
                      customStyle={{ fontSize: '16px' }}
                      hoverBgColor="#E1E1E6"
                      hoverColor="#1C1C1C"
                      clickColor="#396EFE"
                    />
                  </span>
                </div>
              ))}

              {(!maxLen || fileList.length < maxLen) && (
                <div className="feedback-uploader-block-uploader-area" onClick={this.onChooseFile}>
                  <Icons type="hs_line_shangchuan" />
                  <span className="feedback-uploader-block-uploader-area-tip">
                    {ResourceManager.getString('plugin_feedback_upload')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </FeedbackBlockWrapper>
    );
  }
}