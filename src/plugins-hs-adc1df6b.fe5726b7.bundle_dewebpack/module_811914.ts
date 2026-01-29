import React from 'react';
import PropTypes from 'prop-types';
import HelpbarComponent from './HelpbarComponent';

interface Helpbar {
  name: string;
  [key: string]: unknown;
}

interface HelpbarContainerProps {
  helpbar: Helpbar;
  signalRefreshHelpUi?: () => void;
}

export default function HelpbarContainer(props: HelpbarContainerProps): JSX.Element {
  const { helpbar, signalRefreshHelpUi } = props;

  return React.createElement(
    "div",
    {
      id: "floorplannerHelpbar",
      className: "unselectable"
    },
    React.createElement(HelpbarComponent, {
      key: helpbar.name,
      helpbar: helpbar,
      signalRefreshHelpUi: signalRefreshHelpUi
    })
  );
}

HelpbarContainer.propTypes = {
  helpbar: PropTypes.object.isRequired
};