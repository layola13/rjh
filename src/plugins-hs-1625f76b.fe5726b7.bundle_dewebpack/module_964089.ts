import React from 'react';
import { Button } from './Button';

interface WatchModelCollocationButtonProps {
  data: unknown;
  onClick: (data: unknown) => void;
}

class WatchModelCollocationButton extends React.Component<WatchModelCollocationButtonProps> {
  constructor(props: WatchModelCollocationButtonProps) {
    super(props);
  }

  private watchModelCollocationClicked = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    this.props.onClick(this.props.data);
  };

  render(): React.ReactElement {
    const buttonText = ResourceManager.getString("catalog_check_collocation");
    
    return React.createElement(Button, {
      type: "default",
      onClick: this.watchModelCollocationClicked
    }, buttonText);
  }
}

export default WatchModelCollocationButton;