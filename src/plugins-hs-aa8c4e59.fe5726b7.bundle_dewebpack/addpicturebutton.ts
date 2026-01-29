import React, { Component, MouseEvent } from 'react';
import PictureView from './PictureView';
import PictureMaskEnum from './PictureMaskEnum';

interface PictureInfo {
  url?: string;
  [key: string]: unknown;
}

interface AddPictureButtonProps {
  initialPictureInfo?: PictureInfo;
  pictureRedLine?: string;
  onPictureClick?: () => void;
  onIconClick?: () => void;
}

interface AddPictureButtonState {
  mouseEnterPicture: boolean;
}

export class AddPictureButton extends Component<AddPictureButtonProps, AddPictureButtonState> {
  private picInfo?: PictureInfo;
  private refs!: {
    picView: PictureView;
  };

  constructor(props: AddPictureButtonProps) {
    super(props);
    this.picInfo = this.props.initialPictureInfo;
    this.state = {
      mouseEnterPicture: false
    };
  }

  private _onMouseEnterPicture = (event: MouseEvent<HTMLDivElement>): void => {
    const pictureView = this.refs.picView;
    const currentMask = pictureView.getPictureMaskEnum_();
    
    switch (currentMask) {
      case PictureMaskEnum.Error:
      case PictureMaskEnum.None:
        pictureView.changePictureMask_(PictureMaskEnum.Empty);
        break;
    }
    
    this.setState({
      mouseEnterPicture: true
    });
  };

  private _onMouseLeavePicture = (): void => {
    const pictureView = this.refs.picView;
    
    if (pictureView.getPictureMaskEnum_() === PictureMaskEnum.Empty) {
      pictureView.changePictureMask_(PictureMaskEnum.None);
    }
    
    this.setState({
      mouseEnterPicture: false
    });
  };

  private _onPictureClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    
    if (this.props.onPictureClick) {
      this.props.onPictureClick();
    }
  };

  private _onIconClick = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    
    if (this.props.onIconClick) {
      this.props.onIconClick();
    }
  };

  public getCurrentPicInfo_ = (): PictureInfo | undefined => {
    return this.refs.picView.getCurrentPicInfo_();
  };

  public changePicture_ = (pictureInfo: PictureInfo, param?: unknown): void => {
    this.refs.picView.changePicture_(pictureInfo, param);
    this.picInfo = pictureInfo;
  };

  public changePictureMask_ = (mask: PictureMaskEnum): void => {
    const pictureView = this.refs.picView;
    let effectiveMask = mask;
    
    if (mask === PictureMaskEnum.None && this.state.mouseEnterPicture) {
      effectiveMask = PictureMaskEnum.Empty;
    }
    
    pictureView.changePictureMask_(effectiveMask);
  };

  render(): JSX.Element {
    const pictureRedLine = this.props.pictureRedLine ?? '';
    const pictureInfo = this.picInfo;
    const { mouseEnterPicture } = this.state;

    let containerClassName = 'add-picture-button-container ';
    let contentClassName = 'add-picture-button-content ';

    if (pictureInfo?.url && !mouseEnterPicture) {
      contentClassName += 'add-picture-button-content-hide ';
    }

    if (mouseEnterPicture) {
      containerClassName += 'add-picture-button-container-hover ';
    }

    if (pictureRedLine) {
      containerClassName += pictureRedLine;
    }

    let pictureViewClassName = 'pictureView ';
    if (!pictureInfo?.url) {
      pictureViewClassName += 'hide';
    }

    return (
      <div
        className={containerClassName}
        onMouseEnter={this._onMouseEnterPicture}
        onMouseLeave={this._onMouseLeavePicture}
        onClick={this._onPictureClick}
      >
        <PictureView
          className={pictureViewClassName}
          initialPictureInfo={pictureInfo}
          maskSizePercent={50}
          ref="picView"
        />
        <div className={contentClassName}>
          <div
            className="add-picture-button"
            onClick={(event) => this._onIconClick(event)}
          />
          <div className="add-picture-button-label">
            {ResourceManager.getString('autoStyler_select_cover')}
          </div>
        </div>
      </div>
    );
  }
}