import React from 'react';
import DefaultComponent from './632644';

interface ComponentProps {
  color?: string;
  [key: string]: unknown;
}

export default function BlueComponent(props: ComponentProps): React.ReactElement {
  return React.createElement(DefaultComponent, {
    color: "blue",
    ...props
  });
}