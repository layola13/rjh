import React from 'react';
import PropTypes from 'prop-types';

interface BubbleTipsProps {
  styles?: React.CSSProperties;
  text?: string;
  onGotIt: () => void;
  showLink?: boolean;
  linkUrl?: string;
  arrowDirection?: string;
  isShowBlue?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface BubbleTipsState {
  visible: boolean;
}

class BubbleTips extends React.Component<BubbleTipsProps, BubbleTipsState> {
  static propTypes = {
    styles: PropTypes.object,
    text: PropTypes.string,
    onGotIt: PropTypes.func,
    showLink: PropTypes.boolean
  };

  static defaultProps: Partial<BubbleTipsProps> = {
    styles: {},
    arrowDirection: 'right',
    isShowBlue: true
  };

  constructor(props: BubbleTipsProps) {
    super(props);
    
    this.state = {
      visible: true
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.onClickGotIt = this.onClickGotIt.bind(this);
  }

  onClickGotIt(event: React.MouseEvent<HTMLSpanElement>): void {
    event.stopPropagation();
    this.hide();
    this.props.onGotIt();
  }

  show(): void {
    this.setState({
      visible: true
    });
  }

  hide(): void {
    this.setState({
      visible: false
    });
  }

  render(): React.ReactNode {
    if (!this.state.visible) {
      return null;
    }

    const blueLineClass = this.props.isShowBlue ? 'show' : 'hide';

    const feedbackLink = React.createElement(
      'a',
      {
        href: this.props.linkUrl,
        className: 'link_url',
        target: '_blank'
      },
      '去反馈'
    );

    return React.createElement(
      'div',
      {
        className: `ui-bubbletips ${this.props.arrowDirection} ${this.props.className ?? ''}`,
        style: this.props.styles
      },
      React.createElement('div', {
        className: `blue_line ${blueLineClass}`
      }),
      React.createElement(
        'div',
        {
          className: 'ui-bubbletips-wrapper'
        },
        React.createElement(
          'div',
          {
            className: 'content'
          },
          React.createElement('span', {
            className: 'colorTipIcon'
          }),
          React.createElement('p', null, this.props.children)
        ),
        this.props.showLink ? feedbackLink : '',
        React.createElement(
          'span',
          {
            className: 'knowed',
            onClick: this.onClickGotIt
          },
          ResourceManager.getString('leftPanel_I_known')
        ),
        React.createElement('div', {
          className: 'iconArrow'
        })
      )
    );
  }
}

export default BubbleTips;