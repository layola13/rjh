import React from 'react';

enum PictureMaskEnum {
  None = 0,
  Loading = 1,
  Error = 2,
  Empty = 3
}

interface PictureInfo {
  id: string;
  url: string;
}

interface PictureViewProps {
  className?: string;
  initialPictureInfo?: PictureInfo;
  maskSizePercent?: number;
}

interface PictureViewState {
  pictureMaskEnum: PictureMaskEnum;
  pictureInfo: PictureInfo;
}

class PictureView extends React.Component<PictureViewProps, PictureViewState> {
  static defaultProps: Partial<PictureViewProps> = {
    className: '',
    initialPictureInfo: {
      id: '',
      url: ''
    },
    maskSizePercent: 50
  };

  private _isLoadingNewImg: boolean;
  private _pictureMaskEnum: PictureMaskEnum;

  constructor(props: PictureViewProps) {
    super(props);
    
    this._isLoadingNewImg = true;
    this._pictureMaskEnum = PictureMaskEnum.Loading;
    
    this.state = {
      pictureMaskEnum: PictureMaskEnum.Loading,
      pictureInfo: this.props.initialPictureInfo ?? { id: '', url: '' }
    };

    this._renderPictureMask = this._renderPictureMask.bind(this);
    this._onImgLoaded = this._onImgLoaded.bind(this);
    this.getCurrentPicInfo_ = this.getCurrentPicInfo_.bind(this);
    this.changePicture_ = this.changePicture_.bind(this);
    this.getPictureMaskEnum_ = this.getPictureMaskEnum_.bind(this);
    this.changePictureMask_ = this.changePictureMask_.bind(this);
    this._changingPicFinishCallback = this._changingPicFinishCallback.bind(this);
  }

  private _changingPicFinishCallback(): void {
    this._pictureMaskEnum = PictureMaskEnum.None;
    this.setState({
      pictureMaskEnum: PictureMaskEnum.None
    });
  }

  private _renderPictureMask(): React.ReactNode {
    if (this.state.pictureMaskEnum === PictureMaskEnum.None) {
      return null;
    }

    const sizePercent = `${(this.props.maskSizePercent ?? 50).toFixed(0)}%`;
    const style = {
      width: sizePercent,
      height: sizePercent
    };

    let maskContent: React.ReactNode = null;

    switch (this.state.pictureMaskEnum) {
      case PictureMaskEnum.Loading:
        maskContent = (
          <img
            className="loadingMaskSymbol"
            src="/assets/loading.svg"
            style={style}
          />
        );
        break;
      case PictureMaskEnum.Error:
        maskContent = (
          <img
            className="errorMaskSymbol"
            src="/assets/error.svg"
            style={style}
          />
        );
        break;
      case PictureMaskEnum.Empty:
      default:
        maskContent = null;
        break;
    }

    return (
      <div className="maskBkg">
        {maskContent}
      </div>
    );
  }

  private _onImgLoaded(): void {
    if (this._isLoadingNewImg) {
      this._isLoadingNewImg = false;
      if (this._pictureMaskEnum !== PictureMaskEnum.None) {
        this._changingPicFinishCallback();
      }
    }
  }

  public getCurrentPicInfo_(): PictureInfo {
    return this.state.pictureInfo;
  }

  public changePicture_(pictureInfo: PictureInfo, callback: () => void): void {
    if (
      this.state.pictureInfo.url === pictureInfo.url &&
      this.state.pictureInfo.id === pictureInfo.id
    ) {
      this._isLoadingNewImg = false;
      callback();
    } else {
      this._isLoadingNewImg = true;
      this._changingPicFinishCallback = callback;
      this.setState({
        pictureInfo: pictureInfo
      });
    }
  }

  public getPictureMaskEnum_(): PictureMaskEnum {
    return this._pictureMaskEnum;
  }

  public changePictureMask_(maskEnum: PictureMaskEnum): void {
    if (maskEnum !== this._pictureMaskEnum) {
      this._pictureMaskEnum = maskEnum;
      this.setState({
        pictureMaskEnum: maskEnum
      });
    }
  }

  render(): React.ReactNode {
    let imageUrl = this.state.pictureInfo.url;
    if (!imageUrl || imageUrl === '') {
      imageUrl = '/assets/default-picture.png';
    }

    let className = 'pictureView';
    const propsClassName = this.props.className;
    if (propsClassName && propsClassName !== '' && propsClassName !== 'pictureView') {
      className += ` ${propsClassName}`;
    }

    return (
      <div className={className}>
        <img
          className="img"
          src={imageUrl}
          onLoad={this._onImgLoaded}
        />
        {this._renderPictureMask()}
      </div>
    );
  }
}

export default PictureView;