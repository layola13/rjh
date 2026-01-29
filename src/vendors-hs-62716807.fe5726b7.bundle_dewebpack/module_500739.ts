import React, { useState, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import ResizeObserver from '../_util/resizeObserver';
import Breadcrumb from '../breadcrumb';
import Avatar, { AvatarProps } from '../avatar';
import TransButton from '../_util/transButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

type Direction = 'ltr' | 'rtl';

interface BreadcrumbConfig {
  routes?: Array<{ path: string; breadcrumbName: string }>;
  [key: string]: unknown;
}

interface PageHeaderProps {
  prefixCls?: string;
  style?: CSSProperties;
  footer?: ReactNode;
  children?: ReactNode;
  breadcrumb?: BreadcrumbConfig;
  className?: string;
  ghost?: boolean;
  title?: ReactNode;
  avatar?: AvatarProps;
  subTitle?: ReactNode;
  tags?: ReactNode;
  extra?: ReactNode;
  onBack?: (e: React.MouseEvent<HTMLDivElement>) => void;
  backIcon?: ReactNode;
}

interface PageHeaderConfig {
  ghost?: boolean;
}

interface LocaleData {
  back: string;
}

const renderBackIcon = (props: PageHeaderProps, direction: Direction): ReactNode => {
  if (props.backIcon !== undefined) {
    return props.backIcon;
  }
  return direction === 'rtl' 
    ? React.createElement(ArrowRightOutlined) 
    : React.createElement(ArrowLeftOutlined);
};

const renderBack = (
  prefixCls: string,
  backIcon: ReactNode,
  onBack?: (e: React.MouseEvent<HTMLDivElement>) => void
): ReactNode => {
  if (!backIcon || !onBack) {
    return null;
  }

  return React.createElement(LocaleReceiver, {
    componentName: 'PageHeader'
  }, (locale: LocaleData) => {
    return React.createElement('div', {
      className: `${prefixCls}-back`
    }, React.createElement(TransButton, {
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        if (onBack) {
          onBack(e);
        }
      },
      className: `${prefixCls}-back-button`,
      'aria-label': locale.back
    }, backIcon));
  });
};

const renderHeading = (
  prefixCls: string,
  props: PageHeaderProps,
  direction: Direction = 'ltr'
): ReactNode => {
  const { title, avatar, subTitle, tags, extra, onBack } = props;
  const headingPrefixCls = `${prefixCls}-heading`;
  const hasHeading = title || subTitle || tags || extra;

  if (!hasHeading) {
    return null;
  }

  const backIcon = renderBackIcon(props, direction);
  const backIconNode = renderBack(prefixCls, backIcon, onBack);
  const hasLeft = backIconNode || avatar || hasHeading;

  return React.createElement('div', {
    className: headingPrefixCls
  }, 
    hasLeft && React.createElement('div', {
      className: `${headingPrefixCls}-left`
    },
      backIconNode,
      avatar && React.createElement(Avatar, avatar),
      title && React.createElement('span', {
        className: `${headingPrefixCls}-title`,
        title: typeof title === 'string' ? title : undefined
      }, title),
      subTitle && React.createElement('span', {
        className: `${headingPrefixCls}-sub-title`,
        title: typeof subTitle === 'string' ? subTitle : undefined
      }, subTitle),
      tags && React.createElement('span', {
        className: `${headingPrefixCls}-tags`
      }, tags)
    ),
    extra && React.createElement('span', {
      className: `${headingPrefixCls}-extra`
    }, extra)
  );
};

const renderBreadcrumb = (breadcrumbConfig: BreadcrumbConfig): ReactNode => {
  return React.createElement(Breadcrumb, breadcrumbConfig);
};

const renderContent = (prefixCls: string, children: ReactNode): ReactNode => {
  return React.createElement('div', {
    className: `${prefixCls}-content`
  }, children);
};

const renderFooter = (prefixCls: string, footer?: ReactNode): ReactNode => {
  if (!footer) {
    return null;
  }
  return React.createElement('div', {
    className: `${prefixCls}-footer`
  }, footer);
};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const [compact, setCompact] = useState<boolean>(false);

  const handleResize = (size: { width: number }): void => {
    const { width } = size;
    setCompact(width < 768);
  };

  return React.createElement(ConfigConsumer, null, (config: ConfigConsumerProps) => {
    const { getPrefixCls, pageHeader, direction } = config;
    const {
      prefixCls: customizePrefixCls,
      style,
      footer,
      children,
      breadcrumb,
      className
    } = props;

    let ghost = true;
    if ('ghost' in props) {
      ghost = props.ghost!;
    } else if (pageHeader && 'ghost' in pageHeader) {
      ghost = (pageHeader as PageHeaderConfig).ghost!;
    }

    const prefixCls = getPrefixCls('page-header', customizePrefixCls);
    
    const breadcrumbNode = breadcrumb && breadcrumb.routes 
      ? renderBreadcrumb(breadcrumb) 
      : null;

    const rootClassName = classNames(prefixCls, className, {
      'has-breadcrumb': breadcrumbNode,
      'has-footer': footer,
      [`${prefixCls}-ghost`]: ghost,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-compact`]: compact
    });

    return React.createElement(ResizeObserver, {
      onResize: handleResize
    }, React.createElement('div', {
      className: rootClassName,
      style: style
    },
      breadcrumbNode,
      renderHeading(prefixCls, props, direction),
      children && renderContent(prefixCls, children),
      renderFooter(prefixCls, footer)
    ));
  });
};

export default PageHeader;