import React, { useContext, useEffect } from 'react';
import { updateCSS } from './updateCSS';
import { generate as generateColor } from './colors';
import { camelCase } from './camelCase';
import warning from './warning';
import IconContext from './IconContext';

interface IconAttrs {
  class?: string;
  className?: string;
  [key: string]: any;
}

interface IconNode {
  tag: string;
  attrs: IconAttrs;
  children?: IconNode[];
}

interface IconDefinition {
  name: string;
  theme: string;
  icon: IconNode | (() => IconNode);
}

export const svgBaseProps = {
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  focusable: "false"
} as const;

export const iconStyles = `
.anticon {
  display: inline-flex;
  alignItems: center;
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

export function normalizeAttrs(attrs: IconAttrs = {}): Record<string, any> {
  return Object.keys(attrs).reduce((normalized, key) => {
    const value = attrs[key];
    if (key === "class") {
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
  extraProps?: Record<string, any>
): React.ReactElement {
  if (!extraProps) {
    return React.createElement(
      node.tag,
      { key, ...normalizeAttrs(node.attrs) },
      (node.children || []).map((child, index) =>
        generate(child, `${key}-${node.tag}-${index}`)
      )
    );
  }
  
  return React.createElement(
    node.tag,
    { key, ...normalizeAttrs(node.attrs), ...extraProps },
    (node.children || []).map((child, index) =>
      generate(child, `${key}-${node.tag}-${index}`)
    )
  );
}

export function getSecondaryColor(primaryColor: string): string {
  return generateColor(primaryColor)[0];
}

export function isIconDefinition(value: unknown): value is IconDefinition {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as IconDefinition).name === "string" &&
    typeof (value as IconDefinition).theme === "string" &&
    (typeof (value as IconDefinition).icon === "object" ||
      typeof (value as IconDefinition).icon === "function")
  );
}

export function normalizeTwoToneColors(
  twoToneColor?: string | [string, string]
): string[] {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}

export function warning(condition: boolean, message: string): void {
  warning(condition, `[@ant-design/icons] ${message}`);
}

export function useInsertStyles(styles: string = iconStyles): void {
  const { csp } = useContext(IconContext);
  
  useEffect(() => {
    updateCSS(styles, "@ant-design-icons", {
      prepend: true,
      csp
    });
  }, []);
}