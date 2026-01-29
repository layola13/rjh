import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface Picture {
  loading: boolean;
  url: string;
  id: number;
  error?: boolean;
}

interface ModelApplyPanelState {
  pictures: Picture[];
  form_name: string;
  form_describe: string;
  form_connect: string;
  upload_picture_fail_size_large: boolean;
  upload_picture_fail_type_error: boolean;
}

interface ModelApplyPanelProps {}

interface ClientInfo {
  [key: string]: unknown;
}

interface FeedbackData {
  clientInfo: ClientInfo;
  source: string;
  description: string;
  imageUrls: string[];
  modelName: string;
}

interface FileWithType extends File {
  type: string;
  size: number;
}

interface UploadError {
  errMsg: string;
  isInValid: boolean;
}

const MAX_PICTURES = 6;
const MAX_FILE_SIZE_MB = 5;
const FILE_SIZE_BYTES = 1048576;
const IMAGE_TYPE_REGEX = /jpeg|jpg|png/;
const SUCCESS_HINT_DURATION = 5000;
const ERROR_HINT_DURATION = 3000;
const MAX_NAME_LENGTH = 50;
const MAX_DESCRIBE_LENGTH = 50;

class ModelApplyPanel extends Component<ModelApplyPanelProps, ModelApplyPanelState> {
  private count: number;

  constructor(props: ModelApplyPanelProps) {
    super(props);
    this.state = {
      pictures: [],
      form_name: '',
      form_describe: '',
      form_connect: '',
      upload_picture_fail_size_large: false,
      upload_picture_fail_type_error: false
    };
    this.count = 0;
  }

  /**
   * Close the model apply panel
   */
  closePanel(): void {
    const panelElement = document.querySelector('#catalog_popup_panel_collection');
    if (panelElement) {
      ReactDOM.unmountComponentAtNode(panelElement);
      $('#catalog_popup_panel_collection').addClass('hide');
    }
  }

  /**
   * Add pictures to the panel
   */
  async addPicture(): Promise<void> {
    const pictures = this.state.pictures;

    try {
      const files = await (window as any).NWTK.api.design.openFile();

      for (let index = 0; index < files.length; index++) {
        if (pictures.length >= MAX_PICTURES) {
          return;
        }

        const file: FileWithType = files[index];

        if (file && file.size / FILE_SIZE_BYTES > MAX_FILE_SIZE_MB) {
          throw {
            errMsg: 'upload_picture_fail_size_large',
            isInValid: true
          };
        }

        if (file && !IMAGE_TYPE_REGEX.test(file.type)) {
          throw {
            errMsg: 'upload_picture_fail_type_error',
            isInValid: true
          };
        }

        const newPicture: Picture = {
          loading: true,
          url: (window as any).ResourceManager.getDefaultImageUrl?.() ?? '',
          id: this.count++
        };

        pictures.push(newPicture);
        this.setState({
          pictures,
          upload_picture_fail_size_large: false,
          upload_picture_fail_type_error: false
        });

        this.loadPicture(file).then((uploadedUrl: string) => {
          newPicture.loading = false;
          newPicture.url = uploadedUrl;
          this.setState({ pictures });
        });
      }
    } catch (error) {
      const uploadError = error as UploadError;
      if (uploadError.errMsg === 'upload_picture_fail_size_large') {
        this.setState({
          pictures,
          upload_picture_fail_size_large: true
        });
      } else if (uploadError.errMsg === 'upload_picture_fail_type_error') {
        this.setState({
          pictures,
          upload_picture_fail_type_error: true
        });
      }
    }
  }

  /**
   * Upload picture file to server
   */
  async loadPicture(file: FileWithType): Promise<string> {
    const response = await (window as any).NWTK.api.design.uploadReportFile(file, {
      headers: {
        acl: 'public-read',
        'content-type': file.type
      },
      contentType: file.type
    });
    return response.split('?')[0];
  }

  /**
   * Delete picture by id
   */
  deletePicture(pictureId: number, event: React.MouseEvent): void {
    let pictures = this.state.pictures;
    pictures = pictures.filter((picture) => picture.id !== pictureId);
    this.setState({ pictures });
  }

  /**
   * Submit the model apply form
   */
  async onSubmit(): Promise<void> {
    try {
      const clientInfo: ClientInfo = await (window as any).HSApp.Util.Feedback.collectFeedbackInfo();

      const validPictures = this.state.pictures.filter(
        (picture) => !picture.error && !picture.loading
      );
      const imageUrls = validPictures.reduce<string[]>((urls, picture) => {
        urls.push(picture.url);
        return urls;
      }, []);

      const feedbackData: FeedbackData = {
        clientInfo,
        source: (window as any).HSApp.Util.Url.getQueryStrings().env ?? 'sjj',
        description: this.state.form_describe,
        imageUrls,
        modelName: this.state.form_name
      };

      await (window as any).NWTK.api.design.addApplyData(feedbackData);

      const successMessage = (window as any).ResourceManager.getString('model_apply_submit_success');
      (window as any).LiveHint.show(successMessage, SUCCESS_HINT_DURATION, undefined, {
        status: (window as any).LiveHint.statusEnum.completed
      });
    } catch (error) {
      console.error(error);

      const errorMessage = (window as any).ResourceManager.getString('model_apply_submit_fail');
      (window as any).LiveHint.show(errorMessage, ERROR_HINT_DURATION, null, {
        status: (window as any).LiveHint.statusEnum.warning,
        canclose: true
      });

      const errorDescription = 'Category plugin: model apply submit fail';
      (window as any).HSApp.App.getApp().errorLogger.push(errorDescription, {
        errorStack: new Error(errorDescription),
        description: errorDescription,
        errorInfo: {
          info: error,
          path: {
            file: 'homestyler-tools-web/web/plugin/catalogpopup/modelapply/modelapplypanel.js',
            functionName: 'onSubmit()'
          }
        }
      });
    } finally {
      this.closePanel();
    }
  }

  /**
   * Handle name input change
   */
  addName(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ form_name: event.target.value });
  }

  /**
   * Handle description input change
   */
  addDescribe(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    this.setState({ form_describe: event.target.value });
  }

  /**
   * Handle contact input change
   */
  addConnect(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ form_connect: event.target.value });
  }

  render(): JSX.Element {
    const { pictures, form_name, upload_picture_fail_size_large, upload_picture_fail_type_error, form_describe, form_connect } = this.state;
    const pictureCount = pictures.length;
    const pictureElements: JSX.Element[] = [];
    let uploadHideClass = '';
    let submitDisabled = 'disabled';

    if (pictureCount > 0 && form_name.length > 0) {
      submitDisabled = '';
    }

    if (pictures.length >= MAX_PICTURES) {
      uploadHideClass = ' hideUpload';
    }

    pictures.forEach((picture) => {
      pictureElements.push(
        <div className="thumbnail-item" key={picture.id}>
          <div className="picture_wrapper">
            <PictureComponent picture={picture} />
            <div className="delete_wrapper" onClick={(e) => this.deletePicture(picture.id, e)}>
              <div className="delete_wrapper_span">
                <img src={(window as any).NWTK.api.design.parseURL('delete_picture.svg')} alt="delete" />
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div id="model_apply_mask" className="common_mask">
        <div className="catalog_popup_panel_collection_body">
          <div className="header">
            <label>{(window as any).ResourceManager.getString('model_apply_title')}</label>
            <span className="closeBtn" onClick={() => this.closePanel()}>
              <img src={(window as any).closeButtonIcon} alt="closeButton" />
            </span>
          </div>
          <div className="subtitle">
            <img src={(window as any).subtitleIcon} alt="subtitle" />
            <label>{(window as any).ResourceManager.getString('model_apply_subtitle')}</label>
          </div>
          <ul className="model_apply_content">
            <li className="wrapper name">
              <img src={(window as any).nameIcon} alt="name" />
              <label>{(window as any).ResourceManager.getString('model_apply_content_name')}</label>
              <input
                onChange={(e) => this.addName(e)}
                className="userinput"
                maxLength={MAX_NAME_LENGTH}
                type="text"
                value={form_name}
                placeholder={(window as any).ResourceManager.getString('model_apply_content_name_tips')}
              />
            </li>
            <li className="wrapper describe">
              <img />
              <label>{(window as any).ResourceManager.getString('model_apply_content_describe')}</label>
              <textarea
                maxLength={MAX_DESCRIBE_LENGTH}
                onChange={(e) => this.addDescribe(e)}
                className="userinput"
                value={form_describe}
                placeholder={(window as any).ResourceManager.getString('model_apply_content_describe_tips')}
              />
            </li>
            <li className="wrapper picture">
              <img src={(window as any).nameIcon} alt="picture" />
              <label>
                {(window as any).ResourceManager.getString('model_apply_content_picture')}
                <span className="picture_upload_tips">
                  <img src={(window as any).tipsIcon} alt="tips" />
                  <label>{(window as any).ResourceManager.getString('model_apply_content_picture_tips')}</label>
                </span>
              </label>
              <div className="picture_upload_wrapper">
                <div className={`picture_list_wrapper${uploadHideClass}`}>
                  <div className="picture_list">
                    {pictureElements}
                    <div className="picture_upload" onClick={() => this.addPicture()}>
                      <div className="picture_upload_span">
                        <img src={(window as any).NWTK.api.design.parseURL('model_apply_upload.svg')} alt="upload" />
                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
              <label className={`error_tips ${upload_picture_fail_size_large || upload_picture_fail_type_error ? 'show' : 'hide'}`}>
                <img src={(window as any).errorIcon} alt="error" />
                <span>
                  {upload_picture_fail_size_large
                    ? (window as any).ResourceManager.getString('model_apply_content_picture_error')
                    : (window as any).ResourceManager.getString('model_apply_content_picture_type_error')}
                </span>
              </label>
            </li>
            <li className="wrapper connect">
              <img />
              <label>{(window as any).ResourceManager.getString('model_apply_content_connect')}</label>
              <input
                className="userinput"
                type="text"
                value={form_connect}
                onChange={(e) => this.addConnect(e)}
                placeholder={(window as any).ResourceManager.getString('model_apply_content_connect_tips')}
              />
            </li>
          </ul>
          <div className="footer">
            <input
              type="submit"
              disabled={submitDisabled === 'disabled'}
              onClick={() => this.onSubmit()}
              value={(window as any).ResourceManager.getString('report_panel_reportpanel_report_submit')}
            />
          </div>
        </div>
      </div>
    );
  }
}

const PictureComponent: React.FC<{ picture: Picture }> = ({ picture }) => {
  return <img src={picture.url} alt="preview" />;
};

export default ModelApplyPanel;