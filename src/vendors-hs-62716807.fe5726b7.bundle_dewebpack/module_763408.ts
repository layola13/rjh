import React, { forwardRef, ForwardRefRenderFunction, ReactNode, ElementType, Ref } from 'react';
import classNames from 'classnames';
import { composeRef } from './composeRef';
import { ConfigConsumer } from './ConfigContext';
import warning from './warning';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  component?: ElementType;
  className?: string;
  'aria-label'?: string;
  setContentRef?: Ref<HTMLElement>;
  children?: ReactNode;
  direction?: 'ltr' | 'rtl';
}

interface ConfigConsumerProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  direction?: 'ltr' | 'rtl';
}

const Typography: ForwardRefRenderFunction<HTMLElement, TypographyProps> = (props, ref) => {
  const {
    prefixCls,
    component: Component = 'article',
    className,
    'aria-label': ariaLabel,
    setContentRef,
    children,
    ...restProps
  } = props;

  let composedRef = ref;

  if (setContentRef) {
    warning(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.');
    composedRef = composeRef(ref, setContentRef);
  }

  return (
    <ConfigConsumer>
      {(config: ConfigConsumerProps) => {
        const { getPrefixCls, direction } = config;
        const basePrefixCls = getPrefixCls('typography', prefixCls);
        const mergedClassName = classNames(
          basePrefixCls,
          {
            [`${basePrefixCls}-rtl`]: direction === 'rtl',
          },
          className
        );

        return (
          <Component
            className={mergedClassName}
            aria-label={ariaLabel}
            ref={composedRef}
            {...restProps}
          >
            {children}
          </Component>
        );
      }}
    </ConfigConsumer>
  );
};

const TypographyComponent = forwardRef(Typography);
TypographyComponent.displayName = 'Typography';

export default TypographyComponent;