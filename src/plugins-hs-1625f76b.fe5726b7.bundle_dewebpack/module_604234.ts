import React from 'react';

interface PictureData {
  id?: string;
  url: string;
  loading?: boolean;
  error?: boolean;
}

interface PictureComponentProps {
  picture: PictureData;
  isDefault?: boolean;
}

interface PictureComponentState {
  pictureMask: PictureMaskType;
}

type PictureMaskType = 'none' | 'error' | 'loading';

const PICTURE_MASK: Record<PictureMaskType, PictureMaskType> = {
  none: 'none',
  error: 'error',
  loading: 'loading'
};

Object.freeze(PICTURE_MASK);

const DEFAULT_PICTURE_URL = '/default-image.png';
const LOADING_IMAGE_URL = '/loading-spinner.gif';
const ERROR_IMAGE_URL = '/error-placeholder.png';

class PictureComponent extends React.Component<PictureComponentProps, PictureComponentState> {
  static defaultProps: Partial<PictureComponentProps> = {
    picture: {
      url: DEFAULT_PICTURE_URL
    }
  };

  constructor(props: PictureComponentProps) {
    super(props);
    this.state = {
      pictureMask: 'loading'
    };
  }

  private _renderPictureMask(maskType: PictureMaskType): React.ReactElement | undefined {
    switch (maskType) {
      case PICTURE_MASK.loading:
        return (
          <img
            className="pciture_info loading"
            src={LOADING_IMAGE_URL}
            alt="Loading"
          />
        );
      case PICTURE_MASK.error:
        return (
          <img
            className="pciture_info"
            src={ERROR_IMAGE_URL}
            alt="Error"
          />
        );
      default:
        return undefined;
    }
  }

  private handleOnload = (pictureId?: string, pictureUrl?: string): void => {
    this.setState({
      pictureMask: PICTURE_MASK.none
    });
  };

  render(): React.ReactElement {
    const { picture, isDefault } = this.props;
    let maskType: PictureMaskType = isDefault ? PICTURE_MASK.loading : PICTURE_MASK.none;

    if (picture.loading) {
      maskType = PICTURE_MASK.loading;
    } else if (picture.error) {
      maskType = PICTURE_MASK.error;
    }

    return (
      <div className="model_image_wrapper">
        <img
          className="picture_wrapper_img"
          src={picture.url}
          onLoad={() => this.handleOnload(picture.id, picture.url)}
          alt="Picture"
        />
        {this._renderPictureMask(maskType)}
      </div>
    );
  }
}

export default PictureComponent;