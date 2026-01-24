import React from 'react';
import PropTypes from 'prop-types';

/**
 * Props for the PictureUpload component
 */
export interface PictureUploadProps {
  /** The seek ID for uploading pictures */
  seekId: string;
  /** The reason for the report */
  reason?: string;
  /** Callback when checked state changes */
  onChangeChecked?: (checked: boolean) => void;
  /** Whether the component is checked */
  checked?: boolean;
  /** Index of the component */
  index?: number;
  /** Flag indicating if this is the last item */
  isLastFlag?: boolean;
  /** Callback when text reason changes */
  onChangeTextReason?: number;
}

/**
 * State for the PictureUpload component
 */
export interface PictureUploadState {
  /** URL of the uploaded picture */
  pictureUrl: string;
  /** Flag indicating picture upload failed due to large size */
  upload_picture_fail_size_large?: boolean;
  /** Flag indicating picture upload failed due to wrong file type */
  upload_picture_fail_type_error?: boolean;
}

/**
 * Response from S3 picture upload
 */
export interface UploadPictureResponse {
  /** Whether the upload is invalid */
  isInValid?: boolean;
  /** Error message from upload */
  errMsg?: 'upload_picture_fail_size_large' | 'upload_picture_fail_type_error' | string;
}

/**
 * PictureUpload component for uploading and displaying pictures
 * Used in report panels to allow users to attach images
 */
export default class PictureUpload extends React.Component<PictureUploadProps, PictureUploadState> {
  /**
   * PropTypes validation for component props
   */
  static propTypes: {
    reason: PropTypes.Requireable<string>;
    onChangeChecked: PropTypes.Requireable<(...args: any[]) => any>;
    checked: PropTypes.Requireable<boolean>;
    index: PropTypes.Requireable<number>;
    isLastFlag: PropTypes.Requireable<boolean>;
    onChangeTextReason: PropTypes.Requireable<number>;
  };

  /**
   * Component state
   */
  state: PictureUploadState;

  /**
   * Creates an instance of PictureUpload
   * @param props - Component props
   */
  constructor(props: PictureUploadProps);

  /**
   * Handles picture upload to S3
   * Updates state with uploaded picture URL or error flags
   */
  uploadPicture(): void;

  /**
   * Renders the picture upload component
   * Displays either uploaded picture or empty upload placeholder
   * Shows error messages for size or type validation failures
   */
  render(): React.ReactElement;
}

/**
 * Export the component as default
 */
export { PictureUpload };