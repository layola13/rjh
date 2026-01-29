import React from 'react';
import Cropper from 'react-cropper';

interface ImageCropperProps {
  data: {
    src: string;
  };
}

/**
 * ImageCropper component for displaying and cropping images
 */
export class ImageCropper extends React.Component<ImageCropperProps> {
  private cropper: Cropper | null = null;

  render(): React.ReactElement {
    return (
      <div className="cropper-bg-wrapper">
        <Cropper
          style={{
            height: 428,
            width: 840
          }}
          guides={false}
          ref={(cropperInstance: Cropper) => {
            this.cropper = cropperInstance;
          }}
          src={this.props.data.src}
          autoCrop={true}
          viewMode={1}
          scalable={false}
          zoomable={false}
          autoCropArea={1}
          dragMode="none"
          zoomOnTouch={false}
          modal={true}
        />
      </div>
    );
  }
}