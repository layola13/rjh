import React, { Component } from 'react';

interface SignalChanged<T> {
  listen(callback: (event: { data: T }) => void): void;
}

interface DataModel {
  disabled?: boolean;
  getRenderItem(): React.ReactNode;
}

interface HeaderItemProps {
  dataModel: DataModel;
  signalChanged?: SignalChanged<unknown>;
}

interface HeaderItemState {
  [key: string]: unknown;
}

export class HeaderItem extends Component<HeaderItemProps, HeaderItemState> {
  constructor(props: HeaderItemProps) {
    super(props);

    if (props.signalChanged) {
      props.signalChanged.listen((event) => {
        this.setState(event.data as HeaderItemState);
      });
    }
  }

  render(): React.ReactElement {
    const dataModel = this.props.dataModel;
    let className = '';

    if (dataModel.disabled) {
      className += ' pageheader-item-disabled';
    }

    return (
      <li className={className}>
        {' '}
        {dataModel.getRenderItem()}
        {' '}
      </li>
    );
  }
}