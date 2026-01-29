import { getFileUrl } from './utils/fileUtils';
import { stringStartsWith } from './utils/stringUtils';
import removeIconSrc from './assets/remove-icon.svg';
import loadingIconSrc from './assets/loading-icon.svg';
import errorIconSrc from './assets/error-icon.svg';

type FormState = 'add' | 'loading' | 'loaded' | 'fail';

interface AttachmentFormState {
  dataUrl: string;
  formState: FormState;
}

interface AttachmentFormRefs {
  fileElem: HTMLInputElement;
  [key: string]: HTMLElement;
}

interface AttachmentFile {
  name: string;
  dataUrl: string;
}

const FORM_STATE_ADD: FormState = 'add';
const FORM_STATE_LOADING: FormState = 'loading';
const FORM_STATE_LOADED: FormState = 'loaded';
const FORM_STATE_FAIL: FormState = 'fail';

const ACCEPTED_IMAGE_TYPES = 'image/png, image/jpeg';

export class AttachmentForm extends React.Component<Record<string, unknown>, AttachmentFormState> {
  refs: AttachmentFormRefs;

  constructor(props: Record<string, unknown>) {
    super(props);
    
    this.state = {
      dataUrl: '',
      formState: FORM_STATE_ADD
    };

    this.addFile = this.addFile.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.renderRemoveFileIcon = this.renderRemoveFileIcon.bind(this);
    this.resetState = this.resetState.bind(this);
    this.renderAddFileIcon = this.renderAddFileIcon.bind(this);
  }

  componentDidMount(): void {
    for (const refKey in this.refs) {
      if (stringStartsWith(refKey, 'svgIcon-')) {
        ResourceManager.injectSVGImage(this.refs[refKey]);
      }
    }
  }

  handleFile(): void {
    if (this.refs.fileElem.files.length < 1) {
      return;
    }

    const file = this.refs.fileElem.files[0];
    
    if (!file) {
      return;
    }

    this.setState({ formState: FORM_STATE_LOADING });

    getFileUrl(file)
      .then((dataUrl: string) => {
        this.setState({
          dataUrl,
          formState: FORM_STATE_LOADED
        });
      })
      .catch(() => {
        this.setState({ formState: FORM_STATE_FAIL });
      });
  }

  resetFileInput(): void {
    $(this.refs.fileElem).val('');
  }

  resetState(): void {
    this.resetFileInput();
    this.setState({
      dataUrl: undefined,
      formState: FORM_STATE_ADD
    });
  }

  addFile(): void {
    this.refs.fileElem.click();
  }

  getFile(): AttachmentFile | undefined {
    const hasFile = this.refs.fileElem?.files[0];
    const hasDataUrl = this.state.dataUrl;

    if (hasFile && hasDataUrl) {
      return {
        name: this.refs.fileElem.files[0].name,
        dataUrl: this.state.dataUrl
      };
    }

    return undefined;
  }

  renderAddFileIcon(): JSX.Element {
    return (
      <div className="feedback-circle" onClick={this.addFile}>
        <div className="feedback-camera" />
      </div>
    );
  }

  renderRemoveFileIcon(): JSX.Element {
    return (
      <div className="remove" onClick={this.resetState}>
        <img
          className="svgicon iconRemove"
          ref="svgIcon-removeFile"
          src={removeIconSrc}
        />
      </div>
    );
  }

  render(): JSX.Element {
    const fileName = this.refs.fileElem?.files[0]?.name ?? '';
    const hasFile = this.state.formState !== FORM_STATE_ADD;

    return (
      <div className="form-group form-group-feedback addFileForm">
        <input
          ref="fileElem"
          type="file"
          name="upload"
          id="upload"
          style={{ display: 'none' }}
          accept={ACCEPTED_IMAGE_TYPES}
          multiple={false}
          onChange={this.handleFile}
        />
        <div className="files">
          <div className={`fileBlock ${hasFile ? '' : 'hidden'}`}>
            {this.renderRemoveFileIcon()}
            <img
              className={this.state.formState === FORM_STATE_LOADED ? '' : 'hidden'}
              src={this.state.dataUrl}
              alt={fileName}
            />
            <img
              className={`loadingIcon ${this.state.formState === FORM_STATE_LOADING ? '' : 'hidden'}`}
              src={loadingIconSrc}
              alt={fileName}
            />
            <div className={`errorHint ${this.state.formState === FORM_STATE_FAIL ? '' : 'hidden'}`}>
              <img
                className="svgicon"
                ref="svgIcon-error"
                src={errorIconSrc}
              />
              <span>
                <a href="#" onClick={this.resetState}>
                  {ResourceManager.getString('plugin_feedback_read_file_error')}
                </a>
              </span>
            </div>
          </div>
          <div className={`feedback-camera-btn ${this.state.formState === FORM_STATE_ADD ? '' : 'hidden'}`}>
            {this.renderAddFileIcon()}
          </div>
        </div>
      </div>
    );
  }
}