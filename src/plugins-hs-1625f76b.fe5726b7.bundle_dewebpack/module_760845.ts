import React from 'react';
import { Button } from './Button';

interface FooterProps {
  cancel: () => void;
  uploadData: () => void;
}

interface FooterState {
  disabled: boolean;
}

export default class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      disabled: true
    };
  }

  render(): React.ReactElement {
    return React.createElement(
      'div',
      {
        className: 'footer'
      },
      React.createElement(
        Button,
        {
          className: 'report-panel-btn',
          type: 'default',
          onClick: this.props.cancel
        },
        ResourceManager.getString('cancel')
      ),
      React.createElement(
        Button,
        {
          className: 'report-panel-btn',
          type: 'primary',
          disabled: this.state.disabled,
          onClick: this.props.uploadData
        },
        ResourceManager.getString('report_panel_reportpanel_report_submit')
      )
    );
  }
}