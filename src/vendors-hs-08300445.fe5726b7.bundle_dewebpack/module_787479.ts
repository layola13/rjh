import React from 'react';
import TransitionGroup from './TransitionGroup';
import CSSTransition from './CSSTransition';

interface CSSTransitionGroupProps {
  transitionName: string;
  transitionAppear?: boolean;
  transitionEnter?: boolean;
  transitionLeave?: boolean;
  transitionAppearTimeout?: number;
  transitionEnterTimeout?: number;
  transitionLeaveTimeout?: number;
  children?: React.ReactNode;
}

class CSSTransitionGroup extends React.Component<CSSTransitionGroupProps> {
  static displayName = 'CSSTransitionGroup';

  static defaultProps = {
    transitionAppear: false,
    transitionEnter: true,
    transitionLeave: true,
  };

  private _wrapChild = (child: React.ReactElement): React.ReactElement => {
    return React.createElement(
      CSSTransition,
      {
        name: this.props.transitionName,
        appear: this.props.transitionAppear,
        enter: this.props.transitionEnter,
        leave: this.props.transitionLeave,
        appearTimeout: this.props.transitionAppearTimeout,
        enterTimeout: this.props.transitionEnterTimeout,
        leaveTimeout: this.props.transitionLeaveTimeout,
      },
      child
    );
  };

  render(): React.ReactElement {
    return React.createElement(TransitionGroup, {
      ...this.props,
      childFactory: this._wrapChild,
    });
  }
}

export default CSSTransitionGroup;