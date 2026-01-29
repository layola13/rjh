import React, { forwardRef, ReactNode, RefObject } from 'react';

interface ExtraCommonProps {
  [key: string]: unknown;
}

interface IconfontOptions {
  scriptUrl?: string | string[];
  extraCommonProps?: ExtraCommonProps;
}

interface IconfontProps extends ExtraCommonProps {
  type?: string;
  children?: ReactNode;
  ref?: RefObject<unknown>;
}

const loadedScripts = new Set<string>();

function loadScripts(urls: string[], index: number = 0): void {
  const currentUrl = urls[index];
  
  if (!isValidScriptUrl(currentUrl)) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('src', currentUrl);
  script.setAttribute('data-namespace', currentUrl);

  if (urls.length > index + 1) {
    script.onload = () => {
      loadScripts(urls, index + 1);
    };
    script.onerror = () => {
      loadScripts(urls, index + 1);
    };
  }

  loadedScripts.add(currentUrl);
  document.body.appendChild(script);
}

function isValidScriptUrl(url: string): boolean {
  return typeof url === 'string' && url.length > 0 && !loadedScripts.has(url);
}

export default function createIconfont(options: IconfontOptions = {}) {
  const { scriptUrl, extraCommonProps = {} } = options;

  if (
    scriptUrl &&
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function'
  ) {
    const urls = Array.isArray(scriptUrl) ? scriptUrl.reverse() : [scriptUrl];
    loadScripts(urls);
  }

  const Iconfont = forwardRef<unknown, IconfontProps>((props, ref) => {
    const { type, children, ...restProps } = props;

    let iconContent: ReactNode = null;

    if (type) {
      iconContent = React.createElement('use', {
        xlinkHref: `#${type}`,
      });
    }

    if (children) {
      iconContent = children;
    }

    return React.createElement(
      'svg',
      {
        ...extraCommonProps,
        ...restProps,
        ref,
      },
      iconContent
    );
  });

  Iconfont.displayName = 'Iconfont';

  return Iconfont;
}