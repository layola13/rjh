import React, { Component, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from './ConfigConsumer';
import AnchorContext, { AnchorContextProps } from './AnchorContext';

interface AnchorLinkProps {
  prefixCls?: string;
  href: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  target?: string;
}

interface ClickEventData {
  title: ReactNode;
  href: string;
}

class AnchorLink extends Component<AnchorLinkProps> {
  static defaultProps = {
    href: '#'
  };

  static contextType = AnchorContext;
  
  declare context: AnchorContextProps;

  componentDidMount(): void {
    this.context.registerLink(this.props.href);
  }

  componentDidUpdate(prevProps: AnchorLinkProps): void {
    const { href: prevHref } = prevProps;
    const { href: currentHref } = this.props;
    
    if (prevHref !== currentHref) {
      this.context.unregisterLink(prevHref);
      this.context.registerLink(currentHref);
    }
  }

  componentWillUnmount(): void {
    this.context.unregisterLink(this.props.href);
  }

  handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    const { scrollTo, onClick } = this.context;
    const { href, title } = this.props;
    
    if (onClick) {
      onClick(event, { title, href });
    }
    
    scrollTo(href);
  };

  renderAnchorLink = ({ getPrefixCls }: ConfigConsumerProps): JSX.Element => {
    const { prefixCls, href, title, children, className, target } = this.props;
    const prefix = getPrefixCls('anchor', prefixCls);
    const isActive = this.context.activeLink === href;
    
    const linkClassName = classNames(
      `${prefix}-link`,
      {
        [`${prefix}-link-active`]: isActive
      },
      className
    );
    
    const titleClassName = classNames(`${prefix}-link-title`, {
      [`${prefix}-link-title-active`]: isActive
    });

    return (
      <div className={linkClassName}>
        <a
          className={titleClassName}
          href={href}
          title={typeof title === 'string' ? title : ''}
          target={target}
          onClick={this.handleClick}
        >
          {title}
        </a>
        {children}
      </div>
    );
  };

  render(): JSX.Element {
    return <ConfigConsumer>{this.renderAnchorLink}</ConfigConsumer>;
  }
}

export default AnchorLink;