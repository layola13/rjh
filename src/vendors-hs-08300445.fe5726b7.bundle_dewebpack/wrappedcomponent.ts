import { createElement, ComponentType } from 'react';
import { useSSR } from './useSSR';
import { composeInitialProps } from './composeInitialProps';
import { getDisplayName } from './getDisplayName';

interface InitialI18nStore {
  [key: string]: unknown;
}

interface WithSSRProps {
  initialI18nStore?: InitialI18nStore;
  initialLanguage?: string;
  [key: string]: unknown;
}

interface WrappedComponentWithStatics<P = Record<string, unknown>> extends ComponentType<WithSSRProps & P> {
  getInitialProps?: (context: unknown) => Promise<Partial<WithSSRProps & P>>;
  displayName: string;
  WrappedComponent: ComponentType<P>;
}

export function withSSR<P extends Record<string, unknown> = Record<string, unknown>>() {
  return function (WrappedComponent: ComponentType<P>): WrappedComponentWithStatics<P> {
    function WithSSRComponent(props: WithSSRProps & P) {
      const { initialI18nStore, initialLanguage, ...restProps } = props;
      
      useSSR(initialI18nStore, initialLanguage);
      
      return createElement(WrappedComponent, restProps as P);
    }

    WithSSRComponent.getInitialProps = composeInitialProps(WrappedComponent);
    WithSSRComponent.displayName = `withI18nextSSR(${getDisplayName(WrappedComponent)})`;
    WithSSRComponent.WrappedComponent = WrappedComponent;

    return WithSSRComponent as WrappedComponentWithStatics<P>;
  };
}