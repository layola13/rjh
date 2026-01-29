import { forwardRef, createElement, ComponentType, ForwardedRef } from 'react';
import { useTranslation, UseTranslationOptions, UseTranslationResponse } from 'react-i18next';

interface WithTranslationOptions {
  keyPrefix?: string;
  withRef?: boolean;
}

interface WithTranslationProps {
  t: UseTranslationResponse[0];
  i18n: UseTranslationResponse[1];
  tReady: UseTranslationResponse[2];
  forwardedRef?: ForwardedRef<unknown>;
}

function getDisplayName(component: ComponentType<unknown>): string {
  return component.displayName || component.name || 'Component';
}

export function withTranslation<P extends object>(
  namespace?: string | string[],
  options: WithTranslationOptions = {}
) {
  return function <T extends ComponentType<P & WithTranslationProps>>(
    WrappedComponent: T
  ): ComponentType<Omit<P, keyof WithTranslationProps>> {
    
    function WithTranslationComponent(props: P & { forwardedRef?: ForwardedRef<unknown> }) {
      const { forwardedRef, ...restProps } = props;
      
      const translationOptions: UseTranslationOptions = {
        ...restProps,
        keyPrefix: options.keyPrefix
      };
      
      const [t, i18n, tReady] = useTranslation(namespace, translationOptions);
      
      const componentProps = {
        ...restProps,
        t,
        i18n,
        tReady
      } as P & WithTranslationProps;
      
      if (options.withRef && forwardedRef) {
        (componentProps as any).ref = forwardedRef;
      } else if (!options.withRef && forwardedRef) {
        componentProps.forwardedRef = forwardedRef;
      }
      
      return createElement(WrappedComponent, componentProps);
    }
    
    WithTranslationComponent.displayName = `withI18nextTranslation(${getDisplayName(WrappedComponent)})`;
    (WithTranslationComponent as any).WrappedComponent = WrappedComponent;
    
    if (options.withRef) {
      return forwardRef((props: P, ref: ForwardedRef<unknown>) => {
        return createElement(WithTranslationComponent, {
          ...props,
          forwardedRef: ref
        });
      }) as ComponentType<Omit<P, keyof WithTranslationProps>>;
    }
    
    return WithTranslationComponent as ComponentType<Omit<P, keyof WithTranslationProps>>;
  };
}