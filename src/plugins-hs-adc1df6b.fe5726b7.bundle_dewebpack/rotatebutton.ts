import React from 'react';
import { SmartText } from './SmartText';
import { Icons } from './Icons';

interface RotateButtonProps {
  data: {
    rotateValue: number;
    label: string;
    icon?: string;
    onIconClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  };
}

export class RotateButton extends React.Component<RotateButtonProps> {
  constructor(props: RotateButtonProps) {
    super(props);
  }

  private handleIconClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    const { onIconClick } = this.props.data;
    if (onIconClick) {
      onIconClick(event);
    }
  };

  render(): React.ReactElement {
    const { rotateValue, label, icon = 'hs_shuxingmianban_xuanzhuan90' } = this.props.data;

    return (
      <div className="rotate-align-container">
        <SmartText className="rotate-align-label">
          {label}
        </SmartText>
        <span className="rotate-value-label">
          <SmartText className="rotate-align-label">
            {rotateValue}
          </SmartText>
        </span>
        <span
          className="rotate-image-button-icon"
          onClick={this.handleIconClick}
        >
          <Icons type={icon} />
        </span>
      </div>
    );
  }
}