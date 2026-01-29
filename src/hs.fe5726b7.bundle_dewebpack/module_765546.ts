import React from 'react';
import PropTypes from 'prop-types';

interface LinkButtonData {
  disabled?: boolean;
  text?: string;
  id?: string;
  className?: string;
  onclick: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

interface LinkButtonProps {
  data: LinkButtonData;
}

interface LinkButtonState {}

class LinkButton extends React.Component<LinkButtonProps, LinkButtonState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  constructor(props: LinkButtonProps) {
    super(props);
    this.state = {};
  }

  onItemClick(event: React.MouseEvent<HTMLSpanElement>, data: LinkButtonData): void {
    event.stopPropagation();
    data.onclick(event);
  }

  render(): React.ReactElement {
    const statusClass = this.props.data.disabled ? 'disable' : 'enable';
    const { text, id, className } = this.props.data;
    const identifierClass = id ?? className ?? '';

    return (
      <span
        className={`link-btn ${identifierClass} ${statusClass}`}
        onClick={(event) => {
          if (!this.props.data.disabled) {
            this.onItemClick(event, this.props.data);
          }
        }}
      >
        {text}
      </span>
    );
  }
}

export default LinkButton;