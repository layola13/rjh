import React from 'react';
import { Button } from './Button';

/**
 * Props for the ReportPanelFooter component
 */
export interface ReportPanelFooterProps {
  /**
   * Callback function invoked when the cancel button is clicked
   */
  cancel: () => void;

  /**
   * Callback function invoked when the submit button is clicked to upload data
   */
  uploadData: () => void;
}

/**
 * State for the ReportPanelFooter component
 */
export interface ReportPanelFooterState {
  /**
   * Controls whether the submit button is disabled
   * Possible values: "disabled" or undefined
   */
  disabled?: "disabled";
}

/**
 * Footer component for a report panel containing cancel and submit buttons
 * @extends React.Component
 */
export default class ReportPanelFooter extends React.Component<
  ReportPanelFooterProps,
  ReportPanelFooterState
> {
  /**
   * Creates an instance of ReportPanelFooter
   * @param props - Component properties
   */
  constructor(props: ReportPanelFooterProps);

  /**
   * Component state
   */
  state: ReportPanelFooterState;

  /**
   * Renders the footer with cancel and submit buttons
   * @returns React element containing the footer buttons
   */
  render(): React.ReactElement;
}