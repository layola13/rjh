interface ImageWrapperProps {
  picture: string;
  imgStyle?: React.CSSProperties;
  onPictureLoad: () => void;
}

interface ImageWrapperState {
  loading: boolean;
  loadingIconCenter: boolean;
}

class ImageWrapper extends React.Component<ImageWrapperProps, ImageWrapperState> {
  constructor(props: ImageWrapperProps) {
    super(props);
    this.state = {
      loading: true,
      loadingIconCenter: true
    };
  }

  onPictureLoad(): void {
    this.props.onPictureLoad();
    this.setState({
      loading: false,
      loadingIconCenter: false
    });
  }

  render(): React.ReactElement {
    const { picture, imgStyle } = this.props;
    
    return (
      <div className="image-wrapper">
        <LoadingIcon
          show={this.state.loading}
          center={this.state.loadingIconCenter}
          className="image-wrapper-loading"
        />
        <img
          className="image-wrapper-image"
          src={picture}
          style={imgStyle}
          onLoad={this.onPictureLoad.bind(this)}
        />
      </div>
    );
  }
}

export default ImageWrapper;