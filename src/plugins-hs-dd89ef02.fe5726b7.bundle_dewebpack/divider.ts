import React, { Component } from 'react';

interface DividerProps {
  visible?: boolean;
}

export class Divider extends Component<DividerProps> {
  constructor(props: DividerProps) {
    super(props);
  }

  render(): JSX.Element {
    const { visible = true } = this.props;

    return (
      <div 
        className="header-divider" 
        hidden={!visible}
      />
    );
  }
}