import React from 'react';
import DefaultComponent from './955773';

interface BackButtonProps {
  onClick?: () => void;
}

export default function BackButton(props: BackButtonProps): React.ReactElement {
  return React.createElement(DefaultComponent, {
    onClick: props.onClick,
    type: "hs_xian_fanhui",
    text: ResourceManager.getString("plugin_teaching_ability_back")
  });
}