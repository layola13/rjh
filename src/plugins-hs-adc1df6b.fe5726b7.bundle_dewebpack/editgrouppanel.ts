interface EditGroupPanelProps {
  meta: {
    id: string;
    name: string;
    thumbnail: string;
  };
  imgData?: File | Blob;
  onSave?: (data: GroupData) => void;
  onCancel: () => void;
}

interface EditGroupPanelState {
  pictureMaskEnum: PictureMaskType;
  picUrl: string;
  currentNameLength: number;
  nameLengthMessage: string;
  checkName: boolean;
  disableBtn: boolean;
}

interface GroupData {
  id: string;
  name: string;
  images: string[];
  thumbnail: string;
}

type PictureMaskType = 'none' | 'loading' | 'error' | 'hover';

class Uploader {
  uploadPicture(onStart: () => void): Promise<string> {
    // Implementation placeholder
    throw new Error('Method not implemented');
  }
}

export class EditGroupPanel extends React.Component<EditGroupPanelProps, EditGroupPanelState> {
  private _nameRef: React.RefObject<HTMLInputElement>;
  private _uploader: Uploader;

  constructor(props: EditGroupPanelProps) {
    super(props);
    
    this._nameRef = React.createRef();
    this._uploader = new Uploader();
    
    this.state = {
      pictureMaskEnum: 'none',
      picUrl: this.props.meta.thumbnail,
      currentNameLength: this._computedNameLength(this.props.meta.name) || 0,
      nameLengthMessage: ResourceManager.getString('plugin_mygroup_defaultTitle_tips'),
      checkName: true,
      disableBtn: false
    };
  }

  private _computedNameLength(name: string): number {
    let length = 0;
    
    for (const char of name) {
      if (char.charCodeAt(0) > 127 || char.charCodeAt(0) === 94) {
        length += 2;
      } else {
        length++;
      }
    }
    
    return length;
  }

  private _splitName(name: string): string {
    let length = 0;
    let result = '';
    
    for (const char of name) {
      result += char;
      
      if (char.charCodeAt(0) > 127 || char.charCodeAt(0) === 94) {
        length += 2;
      } else {
        length++;
      }
      
      if (length >= 20) {
        break;
      }
    }
    
    return result;
  }

  componentDidMount(): void {
    if (this.props.imgData) {
      const imageData = this.props.imgData;
      this.setState({ pictureMaskEnum: 'loading' });
      
      HSApp.Io.Request.Design.uploadFile(imageData, { resType: 'model' })
        .then((url: string) => {
          if (url) {
            this.props.meta.thumbnail = url;
            this.setState({
              picUrl: url,
              pictureMaskEnum: 'none'
            });
          }
        })
        .catch(() => {
          this.setState({ pictureMaskEnum: 'error' });
        });
    }
  }

  private _onBtnSaveClick(): void {
    this._onNameChanged();
    
    if (this.props.onSave && this.state.disableBtn === false) {
      const data: GroupData = {
        id: this.props.meta.id,
        name: this._splitName(this._nameRef.current!.value),
        images: [this.state.picUrl],
        thumbnail: this.state.picUrl
      };
      
      this.props.onSave(data);
    }
  }

  private _uploadImageFile(): void {
    this._uploader
      .uploadPicture(() => {
        this.setState({ pictureMaskEnum: 'loading' });
      })
      .then((url: string) => {
        if (url) {
          this.setState({
            picUrl: url,
            pictureMaskEnum: 'none'
          });
        }
      })
      .catch(() => {
        this.setState({ pictureMaskEnum: 'error' });
      });
  }

  private _onNameChanged(): void {
    const nameInput = this._nameRef.current;
    
    if (!nameInput) {
      return;
    }
    
    const nameLength = this._computedNameLength(nameInput.value);
    const hasWhitespace = /^\s+|\s+$/.test(nameInput.value);
    
    this.setState({
      currentNameLength: nameLength,
      checkName: nameLength < 21 && nameLength > 0 && !hasWhitespace,
      disableBtn: nameLength < 1 || hasWhitespace
    });
    
    this._onTitleTipsChanged(nameLength, hasWhitespace);
  }

  private _onTitleTipsChanged(length: number, hasWhitespace: boolean): void {
    if (hasWhitespace) {
      this.setState({
        nameLengthMessage: ResourceManager.getString('save_title_error_space_tips')
      });
    } else if (length < 1) {
      this.setState({
        nameLengthMessage: ResourceManager.getString('plugin_mygroup_title_error_less_tips')
      });
    } else if (length > 20) {
      this.setState({
        nameLengthMessage: ResourceManager.getString('plugin_mygroup_title_error_more_tips')
      });
    } else {
      this.setState({
        nameLengthMessage: ResourceManager.getString('plugin_mygroup_defaultTitle_tips')
      });
    }
  }

  private _renderPictureMask(): React.ReactNode {
    if (this.state.pictureMaskEnum === 'none') {
      return null;
    }

    const renderMaskContent = (): React.ReactNode => {
      switch (this.state.pictureMaskEnum) {
        case 'loading':
          return React.createElement(IconfontView, {
            showType: 'hs_zhanshi_jiazai',
            customClass: 'loadingMaskSymbol',
            customStyle: {
              color: '#ffffff',
              fontSize: '25px'
            }
          });
        case 'error':
          return React.createElement(IconfontView, {
            showType: 'hs_zhanshi_shibai',
            customClass: 'errorMaskSymbol',
            customStyle: {
              color: '#EB5D46',
              fontSize: '25px'
            }
          });
        case 'hover':
          return React.createElement(IconfontView, {
            showType: 'replace',
            customClass: 'errorMaskSymbol',
            customStyle: {
              color: '#ffffff',
              fontSize: '25px'
            }
          });
        default:
          return null;
      }
    };

    return React.createElement('div', { className: 'maskBkg' }, renderMaskContent());
  }

  render(): React.ReactNode {
    return React.createElement('div', { className: 'designform' },
      React.createElement('div', { className: 'mainfields' },
        React.createElement('div', { className: 'form-title form-row' },
          React.createElement('label', { className: 'form-label' },
            React.createElement('span', { className: 'label-required' }, '*'),
            ResourceManager.getString('save_defaultTitle')
          ),
          React.createElement('div', { className: 'form-row-content ' },
            React.createElement('input', {
              onBlur: () => this._onNameChanged(),
              onChange: () => this._onNameChanged(),
              placeholder: ResourceManager.getString('save_defaultTitle_placeholder'),
              className: this.state.checkName ? 'form-title-input' : 'form-title-input error',
              type: 'text',
              ref: this._nameRef,
              name: 'name',
              defaultValue: this.props.meta.name,
              autoComplete: 'off'
            }),
            React.createElement('div', {
              className: this.state.checkName ? 'design-name-length' : 'design-name-length error-hints'
            },
              React.createElement('span', null, this.state.nameLengthMessage),
              React.createElement('span', null, `${this.state.currentNameLength}/20`)
            )
          )
        ),
        React.createElement('div', { className: 'form-upload form-row' },
          React.createElement('label', { className: 'form-label' },
            ResourceManager.getString('plugin_mygroup_upload_image_title')
          ),
          React.createElement('div', { className: 'form-row-content' },
            React.createElement('div', {
              className: 'upload-zone',
              onClick: () => this._uploadImageFile(),
              onMouseEnter: () => {
                if (this.state.pictureMaskEnum === 'none') {
                  this.setState({ pictureMaskEnum: 'hover' });
                }
              },
              onMouseLeave: () => {
                if (this.state.pictureMaskEnum === 'hover') {
                  this.setState({ pictureMaskEnum: 'none' });
                }
              }
            },
              React.createElement('div', { className: 'hs-pictureView pictureView' },
                this.state.picUrl
                  ? React.createElement('img', { className: 'img', src: this.state.picUrl })
                  : React.createElement('div', { className: 'upload-placeholder' },
                      React.createElement(PlusOutlined, null)
                    ),
                this._renderPictureMask()
              )
            ),
            React.createElement('div', { className: 'upload-actions' },
              React.createElement('div', { className: 'upload-tips' },
                ResourceManager.getString('plugin_mygroup_image_format_tip')
              ),
              React.createElement('a', {
                className: this.state.picUrl === this.props.meta.thumbnail
                  ? 'restore disabled'
                  : 'restore',
                onClick: () => {
                  this.setState({ picUrl: this.props.meta.thumbnail });
                }
              },
                ResourceManager.getString('plugin_mygroup_restore_thumbnail')
              )
            )
          )
        )
      ),
      React.createElement('div', { className: 'actionbuttons' },
        React.createElement('div', {
          onClick: () => this.props.onCancel(),
          ref: 'cancelbutton',
          className: 'cancel-design'
        },
          ResourceManager.getString('cancel')
        ),
        React.createElement('div', {
          onClick: () => this._onBtnSaveClick(),
          ref: 'savebutton',
          className: this.state.disableBtn ? 'save-design disabled' : 'save-design'
        },
          ResourceManager.getString('save_save')
        )
      )
    );
  }
}