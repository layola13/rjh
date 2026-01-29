import React from 'react';
import Button from './Button';

interface SmallPrimaryButtonProps {
  [key: string]: unknown;
}

export default function SmallPrimaryButton(props: SmallPrimaryButtonProps): React.ReactElement {
  return React.createElement(Button, {
    size: "small",
    type: "primary",
    ...props
  });
}