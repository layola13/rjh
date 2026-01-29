import { generate as generateColor } from './color-utils';
import { updateCSS } from './css-utils';
import { useContext, useEffect, createElement, ReactElement } from 'react';
import { camelCase } from './string-utils';
import { warning as warn } from './warning-utils';
import IconContext from './IconContext';

export interface IconAttrs {
  class?: string;
  className?: string;
  [key: string]: any;
}

export interface IconNode {
  tag: string;
  attrs: IconAttrs;
  children?: IconNode[];
}

export interface IconDefinition {
  name: string;
  theme: string;
  icon: IconNode | (() => IconNode);
}

export interface SVGBaseProps {
  width: string;
  height: string;
  fill: string;
  'aria-hidden': string;
  focusable: string;
}

export interface IconContextProps {
  csp?: {
    nonce?: string;
  };
}

export function normalizeAttrs(attrs: IconAttrs = {}): Record<string, any> {
  return Object.keys(attrs).reduce((normalized, key) => {
    const value = attrs[key];
    if (key === 'class') {
      normalized.className = value;
      delete normalized.class;
    } else {
      delete normalized[key];
      normalized[camelCase(key)] = value;
    }
    return normalized;
  }, {} as Record<string, any>);
}

export function generate(
  node: IconNode,
  key: string,
  additionalProps?: Record<string, any>
): ReactElement {
  if (!additionalProps) {
    return createElement(
      node.tag,
      {
        key,
        ...normalizeAttrs(node.attrs)
      },
      (node.children || []).map((child, index) =>
        generate(child, `${key}-${node.tag}-${index}`)
      )
    );
  }

  return createElement(
    node.tag,
    {
      key,
      ...normalizeAttrs(node.attrs),
      ...additionalProps
    },
    (node.children || []).map((child, index) =>
      generate(child, `${key}-${node.tag}-${index}`)
    )
  );
}

export function getSecondaryColor(primaryColor: string): string {
  return generateColor(primaryColor)[0];
}

export function isIconDefinition(obj: any): obj is IconDefinition {
  return (
    typeof obj === 'object' &&
    typeof obj.name === 'string' &&
    typeof obj.theme === 'string' &&
    (typeof obj.icon === 'object' || typeof obj.icon === 'function')
  );
}

export function normalizeTwoToneColors(
  colors?: string | string[]
): string[] {
  if (!colors) return [];
  return Array.isArray(colors) ? colors : [colors];
}

export function warning(condition: boolean, message: string): void {
  warn(condition, `[@ant-design/icons] ${message}`);
}

export const svgBaseProps: SVGBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false'
};

export const iconStyles = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;

export function useInsertStyles(styles: string = iconStyles): void {
  const { csp } = useContext<IconContextProps>(IconContext);

  useEffect(() => {
    updateCSS(styles, '@ant-design-icons', {
      prepend: true,
      csp
    });
  }, []);
}