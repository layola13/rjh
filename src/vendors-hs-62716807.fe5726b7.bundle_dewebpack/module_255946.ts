import React from 'react';

interface TextProps {
  ellipsis?: boolean | object;
  [key: string]: unknown;
}

interface InternalTextProps extends Omit<TextProps, 'ellipsis'> {
  ellipsis: boolean;
  component: string;
}

/**
 * Text component for Typography
 * @param props - Component props
 * @returns React element
 */
export default function Text(props: TextProps): React.ReactElement {
  const { ellipsis, ...restProps } = props;

  if (typeof ellipsis === 'object' && ellipsis !== null) {
    console.warn(
      'Typography.Text',
      '`ellipsis` only supports boolean value.'
    );
  }

  const internalProps: InternalTextProps = {
    ...restProps,
    ellipsis: !!ellipsis,
    component: 'span'
  };

  return React.createElement('span', internalProps);
}