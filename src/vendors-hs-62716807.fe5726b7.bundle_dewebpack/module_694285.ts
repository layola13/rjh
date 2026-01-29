import React, { useRef, useImperativeHandle, forwardRef, Ref, RefObject } from 'react';
import Typography from './Typography';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  ellipsis?: boolean | object;
  rel?: string;
  navigate?: unknown;
  component?: string;
}

interface TypographyRef {
  contentRef: RefObject<HTMLElement>;
}

const Link = forwardRef<HTMLElement, LinkProps>((props, ref: Ref<HTMLElement>) => {
  const { ellipsis, rel, ...restProps } = props;

  if (typeof ellipsis === 'object') {
    console.warn('Typography.Link', '`ellipsis` only supports boolean value.');
  }

  const typographyRef = useRef<TypographyRef>(null);

  useImperativeHandle(ref, () => {
    return typographyRef.current?.contentRef.current ?? null;
  });

  const linkProps: LinkProps = {
    ...restProps,
    rel: rel ?? (restProps.target === '_blank' ? 'noopener noreferrer' : undefined)
  };

  delete linkProps.navigate;

  return (
    <Typography
      {...linkProps}
      ref={typographyRef}
      ellipsis={!!ellipsis}
      component="a"
    />
  );
});

export default Link;