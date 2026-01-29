import * as React from 'react';

interface FooterExtraProps {
  prefixCls: string;
  context: unknown;
  renderExtra: ((context: unknown) => React.ReactNode) | null | undefined;
}

/**
 * Renders the footer extra content for a component
 * @param prefixCls - CSS class prefix
 * @param context - Context data passed to the render function
 * @param renderExtra - Function to render the extra content
 * @returns React element or null if no renderExtra provided
 */
export default function renderFooterExtra(
  prefixCls: string,
  context: unknown,
  renderExtra: ((context: unknown) => React.ReactNode) | null | undefined
): React.ReactElement | null {
  if (!renderExtra) {
    return null;
  }

  return React.createElement(
    'div',
    {
      className: `${prefixCls}-footer-extra`
    },
    renderExtra(context)
  );
}