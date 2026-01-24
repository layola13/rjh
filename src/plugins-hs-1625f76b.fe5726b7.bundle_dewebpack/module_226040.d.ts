import React from 'react';

/**
 * Props for the UploadFailureComponent
 */
export interface UploadFailureProps {
  /**
   * Controls the visibility of the error page
   */
  show: boolean;

  /**
   * Callback function triggered when user clicks to retry loading
   */
  loadAgain: () => void;

  /**
   * Callback function triggered when user clicks the question icon for help
   */
  question: () => void;

  /**
   * The error message to display to the user
   */
  errMsg: string;
}

/**
 * Component that displays an upload failure error page with retry and help options
 * 
 * @remarks
 * This component shows a formatted error message with:
 * - A primary error description from resource strings
 * - A clickable link to retry the operation
 * - A question mark icon for accessing help/guide
 * - The specific error message passed via props
 */
export default class UploadFailureComponent extends React.Component<UploadFailureProps> {
  /**
   * Renders the upload failure error page
   * 
   * @returns A React element containing the error page with all UI elements
   */
  render(): React.ReactElement;
}