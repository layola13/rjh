import React, { Component } from 'react';
import { ImageCropper } from './ImageCropper';
import { IconfontView, Tooltip, Button } from './UIComponents';

interface AreaCropperProps {
  NS: {
    UI: {
      rotate: number;
      imgurl: string;
      imageCropper: ImageCropper | null;
      isAiDraw: boolean;
    };
  };
  onApplyUnderlay: () => void;
}

interface AreaCropperState {
  rotate: number;
}

interface ImageData {
  src: string;
}

export class AreaCropper extends Component<AreaCropperProps, AreaCropperState> {
  constructor(props: AreaCropperProps) {
    super(props);
    
    this.state = {
      rotate: this.props.NS.UI.rotate % 360
    };
    
    this.rotateImage = this.rotateImage.bind(this);
  }

  rotateImage(): void {
    this.setState({
      rotate: (this.state.rotate + 270) % 360
    });
  }

  applyImageUnderlay(isAiDraw: boolean): void {
    this.props.NS.UI.isAiDraw = isAiDraw;
    this.props.onApplyUnderlay();
  }

  render(): React.ReactElement {
    const { NS } = this.props;
    const { rotate } = this.state;
    
    const imageData: ImageData = {
      src: `${NS.UI.imgurl}?x-oss-process=image/resize,m_lfit,h_2000,w_2000,/rotate,${rotate}`
    };

    return (
      <div className="area-cropper-container">
        <ImageCropper
          data={imageData}
          ref={(instance: ImageCropper | null) => {
            NS.UI.imageCropper = instance;
          }}
        />
        <div className="area-cropper-footer">
          <span onClick={this.rotateImage}>
            <IconfontView
              showType="hs_shuxingmianban_xuanzhuan90"
              customStyle={{ color: '#000' }}
              customBgStyle={{ background: '#F2F2F2' }}
              hoverBgColor="#e9e9e9"
              hoverColor="#1C1C1C"
              clickColor="#396EFE"
              bgExtendSize={26}
            />
          </span>
          <Tooltip
            getPopupContainer={(element: HTMLElement) => element.parentElement as HTMLElement}
            animation={true}
            color="dark"
            placement="top"
            title={ResourceManager.getString('plugin_imageunderlay_import_tooltip')}
          >
            <Button
              className="area-cropper-btn"
              type="default"
              onClick={this.applyImageUnderlay.bind(this, false)}
            >
              {ResourceManager.getString('plugin_imageunderlay_import')}
            </Button>
          </Tooltip>
          <Tooltip
            getPopupContainer={(element: HTMLElement) => element.parentElement as HTMLElement}
            animation={true}
            color="dark"
            placement="top"
            title={ResourceManager.getString('plugin_imageunderlay_ai_import_tooltip')}
          >
            <Button
              className="area-cropper-btn"
              type="primary"
              onClick={this.applyImageUnderlay.bind(this, true)}
            >
              {ResourceManager.getString('plugin_imageunderlay_ai_import')}
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
}