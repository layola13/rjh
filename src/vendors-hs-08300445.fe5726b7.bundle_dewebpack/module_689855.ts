import React, { Component, MouseEvent, KeyboardEvent } from 'react';

interface StarProps {
  prefixCls: string;
  index: number;
  value: number;
  allowHalf: boolean;
  focused: boolean;
  disabled: boolean;
  character: React.ReactNode | ((props: StarProps) => React.ReactNode);
  characterRender?: (node: React.ReactNode, props: StarProps) => React.ReactNode;
  count: number;
  onHover: (event: MouseEvent<HTMLDivElement>, index: number) => void;
  onClick: (event: MouseEvent<HTMLDivElement>, index: number) => void;
}

export default class Star extends Component<StarProps> {
  onHover = (event: MouseEvent<HTMLDivElement>): void => {
    const { onHover, index } = this.props;
    onHover(event, index);
  };

  onClick = (event: MouseEvent<HTMLDivElement>): void => {
    const { onClick, index } = this.props;
    onClick(event, index);
  };

  onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const { onClick, index } = this.props;
    const ENTER_KEY_CODE = 13;
    
    if (event.keyCode === ENTER_KEY_CODE) {
      onClick(event as unknown as MouseEvent<HTMLDivElement>, index);
    }
  };

  getClassName(): string {
    const { prefixCls, index, value, allowHalf, focused } = this.props;
    const currentIndex = index + 1;
    let className = prefixCls;

    if (value === 0 && index === 0 && focused) {
      className += ` ${prefixCls}-focused`;
    } else if (allowHalf && value + 0.5 >= currentIndex && value < currentIndex) {
      className += ` ${prefixCls}-half ${prefixCls}-active`;
      if (focused) {
        className += ` ${prefixCls}-focused`;
      }
    } else {
      className += ` ${prefixCls}${currentIndex <= value ? '-full' : '-zero'}`;
      if (currentIndex === value && focused) {
        className += ` ${prefixCls}-focused`;
      }
    }

    return className;
  }

  render(): React.ReactNode {
    const { disabled, prefixCls, character, characterRender, index, count, value } = this.props;
    
    const characterNode = typeof character === 'function' ? character(this.props) : character;
    
    let starElement = (
      <li className={this.getClassName()}>
        <div
          onClick={disabled ? null : this.onClick}
          onKeyDown={disabled ? null : this.onKeyDown}
          onMouseMove={disabled ? null : this.onHover}
          role="radio"
          aria-checked={value > index ? 'true' : 'false'}
          aria-posinset={index + 1}
          aria-setsize={count}
          tabIndex={disabled ? -1 : 0}
        >
          <div className={`${prefixCls}-first`}>{characterNode}</div>
          <div className={`${prefixCls}-second`}>{characterNode}</div>
        </div>
      </li>
    );

    if (characterRender) {
      starElement = characterRender(starElement, this.props) as React.ReactElement;
    }

    return starElement;
  }
}