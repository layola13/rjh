import React, { Component, MouseEvent } from 'react';

enum PictureMaskEnum {
  None,
  Empty,
  Error,
}

interface PictureInfo {
  url?: string;
  width?: number;
  height?: number;
}

interface PictureViewRef {
  getPictureMaskEnum_(): PictureMaskEnum;
  changePictureMask_(mask: PictureMaskEnum): void;
  getCurrentPicInfo_(): PictureInfo;
  changePicture_(info: PictureInfo, options?: unknown): void;
}

interface ChangePictureButtonProps {
  initialPictureInfo?: PictureInfo;
  onPictureClick?(): void;
}

interface ChangePictureButtonState {
  mouseEnterPicture: boolean;
}

interface Refs {
  picView: PictureViewRef;
  iconSvg: HTMLSpanElement;
}

declare const ResourceManager: {
  injectSVGImage(element: HTMLElement): void;
};

class PictureView extends Component<{
  className: string;
  initialPictureInfo?: PictureInfo;
  maskSizePercent: number;
  ref: string;
}> {}

class URLParser {
  static parseURL(path: string): string {
    return path;
  }
}

class ChangePictureButton extends Component<ChangePictureButtonProps, ChangePictureButtonState> {
  refs!: Refs;
  private _iconSvgUrl?: string;

  constructor(props: ChangePictureButtonProps) {
    super(props);
    this.state = {
      mouseEnterPicture: false,
    };
  }

  UNSAFE_componentWillMount(): void {
    this._iconSvgUrl = URLParser.parseURL('editor.svg');
  }

  componentDidMount(): void {
    ResourceManager.injectSVGImage(this.refs.iconSvg);
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
      mouseEnterPicture: true,
    });
  };

  private _onMouseLeavePicture = (event: MouseEvent<HTMLDivElement>): void => {
    const pictureView = this.refs.picView;

    if (pictureView.getPictureMaskEnum_() === PictureMaskEnum.Empty) {
      pictureView.changePictureMask_(PictureMaskEnum.None);
    }

    this.setState({
      mouseEnterPicture: false,
    });
  };

  private _onPictureClick = (event: MouseEvent<HTMLDivElement>): void => {
    this.props.onPictureClick?.();
  };

  public getCurrentPicInfo_ = (): PictureInfo => {
    return this.refs.picView.getCurrentPicInfo_();
  };

  public changePicture_ = (info: PictureInfo, options?: unknown): void => {
    this.refs.picView.changePicture_(info, options);
  };

  public changePictureMask_ = (mask: PictureMaskEnum): void => {
    const pictureView = this.refs.picView;
    let finalMask = mask;

    if (mask === PictureMaskEnum.None && this.state.mouseEnterPicture) {
      finalMask = PictureMaskEnum.Empty;
    }

    pictureView.changePictureMask_(finalMask);
  };

  render(): JSX.Element {
    return (
      <div
        className="changePictureButton"
        onMouseEnter={this._onMouseEnterPicture}
        onMouseLeave={this._onMouseLeavePicture}
        onClick={this._onPictureClick}
      >
        <PictureView
          className="pictureView"
          initialPictureInfo={this.props.initialPictureInfo}
          maskSizePercent={34}
          ref="picView"
        />
        <div
          className="icon"
          style={{
            display: this.state.mouseEnterPicture ? 'block' : 'none',
          }}
        >
          <span data-src={this._iconSvgUrl} ref="iconSvg" />
        </div>
      </div>
    );
  }
}

export default ChangePictureButton;