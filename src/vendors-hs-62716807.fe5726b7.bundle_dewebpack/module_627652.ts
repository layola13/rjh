import React, { Component, createRef, RefObject } from 'react';
import type { ReactNode, CSSProperties, MouseEvent } from 'react';
import classNames from 'classnames';
import Tooltip from '../tooltip';
import TransButton from '../_util/transButton';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import ResizeObserver from 'rc-resize-observer';
import { isStyleSupport } from '../_util/styleChecker';
import copy from '../_util/copy';
import omit from 'rc-util/lib/omit';
import warning from '../_util/warning';
import raf from 'rc-util/lib/raf';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import Editable from './Editable';
import Typography from './Typography';
import measure from './util';
import toArray from 'rc-util/lib/Children/toArray';

interface CopyConfig {
  text?: string;
  onCopy?: () => void;
  icon?: [ReactNode, ReactNode];
  tooltips?: [ReactNode, ReactNode] | false;
}

interface EditConfig {
  editing?: boolean;
  icon?: ReactNode;
  tooltip?: ReactNode | false;
  onStart?: () => void;
  onChange?: (value: string) => void;
  maxLength?: number;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
}

interface EllipsisConfig {
  rows?: number;
  expandable?: boolean;
  suffix?: string;
  symbol?: ReactNode;
  onExpand?: (event: MouseEvent<HTMLElement>) => void;
  onEllipsis?: (ellipsis: boolean) => void;
}

interface BaseTypographyProps {
  prefixCls?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  component?: string;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  editable?: boolean | EditConfig;
  copyable?: boolean | CopyConfig;
  ellipsis?: boolean | EllipsisConfig;
  mark?: boolean;
  code?: boolean;
  delete?: boolean;
  underline?: boolean;
  strong?: boolean;
  keyboard?: boolean;
  title?: string;
  direction?: 'ltr' | 'rtl';
}

interface BaseTypographyState {
  edit: boolean;
  copied: boolean;
  ellipsisText: string;
  ellipsisContent: ReactNode | null;
  isEllipsis: boolean;
  expanded: boolean;
  clientRendered: boolean;
}

interface LocaleReceiverData {
  edit?: string;
  copy?: string;
  copied?: string;
  expand?: string;
}

const WEBKIT_LINE_CLAMP_SUPPORT = isStyleSupport('webkitLineClamp');
const TEXT_OVERFLOW_SUPPORT = isStyleSupport('textOverflow');

class Base extends Component<BaseTypographyProps, BaseTypographyState> {
  static contextType = ConfigContext;
  static defaultProps: Partial<BaseTypographyProps> = {
    children: ''
  };

  context!: React.ContextType<typeof ConfigContext>;
  contentRef: RefObject<HTMLElement> = createRef();
  editIcon?: HTMLElement | null;
  copyId?: number;
  rafId?: number;
  editStr?: string;
  copyStr?: string;
  copiedStr?: string;
  expandStr?: string;

  state: BaseTypographyState = {
    edit: false,
    copied: false,
    ellipsisText: '',
    ellipsisContent: null,
    isEllipsis: false,
    expanded: false,
    clientRendered: false
  };

  static getDerivedStateFromProps(nextProps: BaseTypographyProps): Partial<BaseTypographyState> | null {
    const { children, editable } = nextProps;
    warning(
      !editable || typeof children === 'string',
      'Typography',
      'When `editable` is enabled, the `children` should use string.'
    );
    return null;
  }

  componentDidMount(): void {
    this.setState({ clientRendered: true });
    this.resizeOnNextFrame();
  }

  componentDidUpdate(prevProps: BaseTypographyProps): void {
    const { children } = this.props;
    const currentEllipsis = this.getEllipsis();
    const prevEllipsis = this.getEllipsis(prevProps);

    if (children !== prevProps.children || currentEllipsis.rows !== prevEllipsis.rows) {
      this.resizeOnNextFrame();
    }
  }

  componentWillUnmount(): void {
    if (this.copyId) {
      window.clearTimeout(this.copyId);
    }
    if (this.rafId) {
      raf.cancel(this.rafId);
    }
  }

  getPrefixCls = (): string => {
    const { prefixCls } = this.props;
    return this.context.getPrefixCls('typography', prefixCls);
  };

  getEditable(props?: BaseTypographyProps): EditConfig {
    const { edit } = this.state;
    const { editable } = props || this.props;

    if (!editable) {
      return { editing: edit };
    }

    return {
      editing: edit,
      ...(typeof editable === 'object' ? editable : {})
    };
  }

  getEllipsis(props?: BaseTypographyProps): EllipsisConfig {
    const { ellipsis } = props || this.props;

    if (!ellipsis) {
      return {};
    }

    return {
      rows: 1,
      expandable: false,
      ...(typeof ellipsis === 'object' ? ellipsis : {})
    };
  }

  canUseCSSEllipsis(): boolean {
    const { clientRendered } = this.state;
    const { editable, copyable } = this.props;
    const { rows, expandable, suffix, onEllipsis } = this.getEllipsis();

    if (suffix) return false;
    if (editable || copyable || expandable || !clientRendered || onEllipsis) {
      return false;
    }

    if (rows === 1) {
      return TEXT_OVERFLOW_SUPPORT;
    }

    return WEBKIT_LINE_CLAMP_SUPPORT;
  }

  syncEllipsis(): void {
    const { ellipsisText, isEllipsis, expanded } = this.state;
    const { rows, suffix, onEllipsis } = this.getEllipsis();
    const { children } = this.props;

    if (!rows || rows < 0 || !this.contentRef.current || expanded || this.canUseCSSEllipsis()) {
      return;
    }

    warning(
      toArray(children).every((child) => typeof child === 'string'),
      'Typography',
      '`ellipsis` should use string as children only.'
    );

    const { content, text, ellipsis } = measure(
      this.contentRef.current,
      { rows, suffix },
      children,
      this.renderOperations(true),
      '...'
    );

    if (ellipsisText !== text || isEllipsis !== ellipsis) {
      this.setState({
        ellipsisText: text,
        ellipsisContent: content,
        isEllipsis: ellipsis
      });

      if (isEllipsis !== ellipsis && onEllipsis) {
        onEllipsis(ellipsis);
      }
    }
  }

  onExpandClick = (event: MouseEvent<HTMLElement>): void => {
    const { onExpand } = this.getEllipsis();
    this.setState({ expanded: true });
    if (onExpand) {
      onExpand(event);
    }
  };

  onEditClick = (): void => {
    this.triggerEdit(true);
  };

  onEditChange = (value: string): void => {
    const { onChange } = this.getEditable();
    if (onChange) {
      onChange(value);
    }
    this.triggerEdit(false);
  };

  onEditCancel = (): void => {
    this.triggerEdit(false);
  };

  onCopyClick = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();

    const { children, copyable } = this.props;
    const copyConfig: CopyConfig = typeof copyable === 'object' ? { ...copyable } : {};

    if (copyConfig.text === undefined) {
      copyConfig.text = String(children);
    }

    copy(copyConfig.text || '');

    this.setState({ copied: true }, () => {
      if (copyConfig.onCopy) {
        copyConfig.onCopy();
      }

      this.copyId = window.setTimeout(() => {
        this.setState({ copied: false });
      }, 3000);
    });
  };

  setEditRef = (node: HTMLElement | null): void => {
    this.editIcon = node;
  };

  triggerEdit = (edit: boolean): void => {
    const { onStart } = this.getEditable();

    if (edit && onStart) {
      onStart();
    }

    this.setState({ edit }, () => {
      if (!edit && this.editIcon) {
        this.editIcon.focus();
      }
    });
  };

  resizeOnNextFrame = (): void => {
    if (this.rafId) {
      raf.cancel(this.rafId);
    }
    this.rafId = raf(() => {
      this.syncEllipsis();
    });
  };

  renderExpand(forceRender?: boolean): ReactNode {
    const { expandable, symbol } = this.getEllipsis();
    const { expanded, isEllipsis } = this.state;

    if (!expandable || (!forceRender && (expanded || !isEllipsis))) {
      return null;
    }

    const expandContent = symbol || this.expandStr;

    return (
      <a
        key="expand"
        className={`${this.getPrefixCls()}-expand`}
        onClick={this.onExpandClick}
        aria-label={this.expandStr}
      >
        {expandContent}
      </a>
    );
  }

  renderEdit(): ReactNode {
    const { editable } = this.props;

    if (!editable) {
      return null;
    }

    const config = typeof editable === 'object' ? editable : {};
    const { icon, tooltip } = config;
    const tooltipText = toArray(tooltip)[0] || this.editStr;
    const ariaLabel = typeof tooltipText === 'string' ? tooltipText : '';

    return (
      <Tooltip key="edit" title={tooltip === false ? '' : tooltipText}>
        <TransButton
          ref={this.setEditRef}
          className={`${this.getPrefixCls()}-edit`}
          onClick={this.onEditClick}
          aria-label={ariaLabel}
        >
          {icon || <EditOutlined role="button" />}
        </TransButton>
      </Tooltip>
    );
  }

  renderCopy(): ReactNode {
    const { copied } = this.state;
    const { copyable } = this.props;

    if (!copyable) {
      return null;
    }

    const prefixCls = this.getPrefixCls();
    const config = typeof copyable === 'object' ? copyable : {};
    const { tooltips, icon } = config;
    let tooltipNodes = toArray(tooltips);

    if (tooltipNodes.length === 0) {
      tooltipNodes = [this.copyStr, this.copiedStr];
    }

    const currentTooltip = copied ? tooltipNodes[1] : tooltipNodes[0];
    const ariaLabel = typeof currentTooltip === 'string' ? currentTooltip : '';
    const iconNodes = toArray(icon);

    return (
      <Tooltip key="copy" title={tooltips === false ? '' : currentTooltip}>
        <TransButton
          className={classNames(
            `${prefixCls}-copy`,
            copied && `${prefixCls}-copy-success`
          )}
          onClick={this.onCopyClick}
          aria-label={ariaLabel}
        >
          {copied ? iconNodes[1] || <CheckOutlined /> : iconNodes[0] || <CopyOutlined />}
        </TransButton>
      </Tooltip>
    );
  }

  renderEditInput(): ReactNode {
    const { children, className, style } = this.props;
    const { direction } = this.context;
    const { maxLength, autoSize } = this.getEditable();

    return (
      <Editable
        value={typeof children === 'string' ? children : ''}
        onSave={this.onEditChange}
        onCancel={this.onEditCancel}
        prefixCls={this.getPrefixCls()}
        className={className}
        style={style}
        direction={direction}
        maxLength={maxLength}
        autoSize={autoSize}
      />
    );
  }

  renderOperations(forceRenderExpand?: boolean): ReactNode[] {
    return [
      this.renderExpand(forceRenderExpand),
      this.renderEdit(),
      this.renderCopy()
    ].filter((node) => node);
  }

  wrapTextWithStyles(text: ReactNode): ReactNode {
    const { mark, code, underline, delete: del, strong, keyboard } = this.props;
    let wrapped = text;

    const wrap = (condition: boolean | undefined, tag: keyof JSX.IntrinsicElements): void => {
      if (condition) {
        wrapped = React.createElement(tag, {}, wrapped);
      }
    };

    wrap(strong, 'strong');
    wrap(underline, 'u');
    wrap(del, 'del');
    wrap(code, 'code');
    wrap(mark, 'mark');
    wrap(keyboard, 'kbd');

    return wrapped;
  }

  renderContent(): ReactNode {
    const { ellipsisContent, isEllipsis, expanded } = this.state;
    const {
      component,
      children,
      className,
      type,
      disabled,
      style,
      ...restProps
    } = this.props;
    const { direction } = this.context;
    const { rows, suffix } = this.getEllipsis();
    const prefixCls = this.getPrefixCls();

    const textProps = omit(restProps, [
      'prefixCls',
      'editable',
      'copyable',
      'ellipsis',
      'mark',
      'code',
      'delete',
      'underline',
      'strong',
      'keyboard',
      ...ConfigConsumerProps
    ]);

    const cssEllipsis = this.canUseCSSEllipsis();
    const cssTextOverflow = rows === 1 && cssEllipsis;
    const cssLineClamp = rows && rows > 1 && cssEllipsis;

    let renderNode: ReactNode = children;

    if (rows && isEllipsis && !expanded && !cssEllipsis) {
      const { title } = restProps;
      let restTitle = title || '';

      if (!title && (typeof children === 'string' || typeof children === 'number')) {
        restTitle = String(children);
      }

      restTitle = restTitle?.slice(String(ellipsisContent || '').length);

      renderNode = (
        <>
          {ellipsisContent}
          <span title={restTitle} aria-hidden="true">
            ...
          </span>
          {suffix}
        </>
      );
    } else {
      renderNode = (
        <>
          {children}
          {suffix}
        </>
      );
    }

    renderNode = this.wrapTextWithStyles(renderNode);

    return (
      <LocaleReceiver componentName="Text">
        {(locale: LocaleReceiverData) => {
          this.editStr = locale.edit;
          this.copyStr = locale.copy;
          this.copiedStr = locale.copied;
          this.expandStr = locale.expand;

          return (
            <ResizeObserver onResize={this.resizeOnNextFrame} disabled={!rows}>
              <Typography
                className={classNames(
                  {
                    [`${prefixCls}-${type}`]: type,
                    [`${prefixCls}-disabled`]: disabled,
                    [`${prefixCls}-ellipsis`]: rows,
                    [`${prefixCls}-ellipsis-single-line`]: cssTextOverflow,
                    [`${prefixCls}-ellipsis-multiple-line`]: cssLineClamp
                  },
                  className
                )}
                style={{
                  ...style,
                  WebkitLineClamp: cssLineClamp ? rows : undefined
                }}
                component={component}
                ref={this.contentRef}
                direction={direction}
                {...textProps}
              >
                {renderNode}
                {this.renderOperations()}
              </Typography>
            </ResizeObserver>
          );
        }}
      </LocaleReceiver>
    );
  }

  render(): ReactNode {
    const { editing } = this.getEditable();
    return editing ? this.renderEditInput() : this.renderContent();
  }
}

export default Base;