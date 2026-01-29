import { Component, ReactNode } from 'react';

interface PassThroughProps {
  children: ReactNode;
}

export default class PassThrough extends Component<PassThroughProps> {
  render(): ReactNode {
    return this.props.children;
  }
}