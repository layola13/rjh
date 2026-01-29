import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { IconfontView, Icons } from './IconComponents';
import { uploadFileToS3 } from './uploadUtils';
import { FeedbackBlock } from './FeedbackBlock';

interface FileItem {
  id: string;
  url: string;
}

interface FeedbackUploaderBlockProps {
  label?: string;
  required?: boolean;
  fileMaxSize?: number;
  maxLen?: number;
}

interface FeedbackUploaderBlockState {
  fileList: FileItem[];
}

const DEFAULT_FILE_MAX_SIZE = 20971520; // 20MB

export class FeedbackUploaderBlock extends FeedbackBlock<
  FeedbackUploaderBlockProps,
  FeedbackUploaderBlockState
> {
  private attachmentInputRef: HTMLInputElement | null = null;

  constructor(props: FeedbackUploaderBlockProps) {
    super(props);
    
    this.onFileChange = this.onFileChange.bind(this);
    this.onChooseFile = this.onChooseFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
    
    this.state = {
      fileList: []
    };
  }

  getValue(): string[] {
    return this.state.fileList.map((file) => file.url);
  }

  isEmpty(): boolean {
    return !!this.props.required && this.getValue().length === 0;
  }

  private toSize(bytes: number): string {
    const GB = Math.floor(bytes / 1024 / 1024 / 1024);
    const MB = Math.floor((bytes - GB * 1024 * 1024 * 1024) / 1024 / 1024);
    const KB = Math.floor((bytes - GB * 1024 * 1024 * 1024 - MB * 1024 * 1024) / 1024);
    const B = bytes - GB * 1024 * 1024 * 1024 - MB * 1024 * 1024 - KB * 1024;
    
    return `${GB ? GB + 'GB' : ''}${MB ? MB + 'MB' : ''}${KB ? KB + 'KB' : ''}${B ? B + 'byte' : ''}`;
  }

  private onFileChange(): void {
    if (!this.attachmentInputRef?.files || this.attachmentInputRef.files.length < 1) {
      return;
    }

    const file = this.attachmentInputRef.files[0];
    if (!file) {
      return;
    }

    const maxSize = this.props.fileMaxSize ?? DEFAULT_FILE_MAX_SIZE;
    
    if (file.size > maxSize) {
      const message = ResourceManager.getString('plugin_feedback_upload_max_file_size')?.replace(
        '%max%',
        this.toSize(maxSize)
      );
      LiveHint.show(message, 3000, null, {
        status: LiveHint.statusEnum.warning
      });
      return;
    }

    uploadFileToS3(file)
      .then((url: string) => {
        const newFileList = [...this.state.fileList];
        newFileList.push({
          id: this.generateUuid(),
          url
        });
        this.setState({
          fileList: newFileList
        });
      })
      .catch(() => {
        LiveHint.show('图片上传失败', 3000);
      })
      .finally(() => {
        if (this.attachmentInputRef) {
          this.attachmentInputRef.value = '';
        }
      });
  }

  private onChooseFile(): void {
    this.attachmentInputRef?.click();
  }

  private removeFile(fileId: string): void {
    const updatedFileList = [...this.state.fileList];
    this.setState({
      fileList: updatedFileList.filter((file) => file.id !== fileId)
    });
  }

  private generateUuid(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  render() {
    const { label, required, maxLen } = this.props;
    const { fileList } = this.state;
    
    const maxUploadText = maxLen
      ? ResourceManager.getString('plugin_feedback_max_upload')?.replace('%max%', maxLen.toString())
      : undefined;

    return (
      <FeedbackBlockWrapper>
        <div className={`feedback-uploader-block ${this.context}`}>
          <FeedbackBlockLabel label={label} required={required}>
            {maxLen && <span>{maxUploadText}</span>}
          </FeedbackBlockLabel>
          
          <div className="feedback-uploader-block-uploader">
            <input
              ref={(element) => {
                this.attachmentInputRef = element;
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
                  {file.url && <img src={file.url} alt="" />}
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
                <div
                  className="feedback-uploader-block-uploader-area"
                  onClick={this.onChooseFile}
                >
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