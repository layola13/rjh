import React from 'react';
import PropTypes from 'prop-types';
import uploadService from './uploadService';
import defaultPictureIcon from './defaultPictureIcon';
import { IconfontView } from './IconfontView';

interface UploadPictureProps {
  reason?: string;
  onChangeChecked?: () => void;
  checked?: boolean;
  index?: number;
  isLastFlag?: boolean;
  onChangeTextReason?: number;
  seekId: string;
}

interface UploadPictureState {
  pictureUrl: string;
  upload_picture_fail_size_large?: boolean;
  upload_picture_fail_type_error?: boolean;
}

interface UploadResult {
  isInValid?: boolean;
  errMsg?: string;
}

export default class UploadPicture extends React.Component<UploadPictureProps, UploadPictureState> {
  static propTypes = {
    reason: PropTypes.string,
    onChangeChecked: PropTypes.func,
    checked: PropTypes.bool,
    index: PropTypes.number,
    isLastFlag: PropTypes.bool,
    onChangeTextReason: PropTypes.number
  };

  constructor(props: UploadPictureProps) {
    super(props);
    this.state = {
      pictureUrl: ""
    };
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  uploadPicture(): void {
    uploadService.uploadPictureToS3(this.props.seekId, {}).then((response: UploadResult | string) => {
      if (response instanceof Object && response.isInValid) {
        if (response.errMsg === "upload_picture_fail_size_large") {
          this.setState({
            upload_picture_fail_size_large: true
          });
          return;
        }
        if (response.errMsg === "upload_picture_fail_type_error") {
          this.setState({
            upload_picture_fail_type_error: true
          });
          return;
        }
      }
      
      const uploadedUrl = response as string;
      this.setState({
        pictureUrl: uploadedUrl.split("?")[0],
        upload_picture_fail_size_large: false,
        upload_picture_fail_type_error: false
      });
    });
  }

  render(): React.ReactElement {
    let pictureClassName = "";
    let pictureSource = defaultPictureIcon;
    
    if (this.state.pictureUrl) {
      pictureClassName = "hasPicture";
      pictureSource = this.state.pictureUrl;
    }
    
    const hasError = this.state.upload_picture_fail_size_large || this.state.upload_picture_fail_type_error;

    return (
      <div className="upload_picture">
        <label>
          {ResourceManager.getString("report_panel_reportpanel_report_upload_picture")}
        </label>
        <div className="picture">
          {this.state.pictureUrl ? (
            <img
              className={pictureClassName}
              src={pictureSource}
              onClick={this.uploadPicture}
            />
          ) : (
            <div className="empty-picture" onClick={this.uploadPicture}>
              <IconfontView
                showType="hs_xian_tianjia"
                customStyle={{
                  color: "#1C1C1C",
                  fontSize: "16px"
                }}
              />
            </div>
          )}
          {hasError && (
            <span className="error_info">
              <IconfontView
                showType="hs_zhanshi_jingshi"
                customClass="error-info-icon"
              />
              <label>
                {ResourceManager.getString("model_apply_content_picture_tips")}
              </label>
            </span>
          )}
        </div>
      </div>
    );
  }
}