import React from 'react';
import Box from './Box';

interface DivComponentProps {
  [key: string]: unknown;
}

export default function DivComponent(props: DivComponentProps): React.ReactElement {
  return React.createElement(Box, {
    ...props,
    component: 'div'
  });
}