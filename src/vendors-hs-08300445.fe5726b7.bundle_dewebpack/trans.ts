import { ReactNode, ReactElement, createElement, cloneElement, isValidElement, useContext } from 'react';
import { I18nContext, getI18n, getDefaults } from './i18n-context';
import { warnOnce, warn } from './utils';
import htmlParser from 'html-parse-stringify';

interface TransProps {
  children?: ReactNode;
  count?: number;
  parent?: React.ElementType;
  i18nKey?: string;
  context?: string;
  tOptions?: Record<string, unknown>;
  values?: Record<string, unknown>;
  defaults?: string;
  components?: readonly ReactElement[] | Record<string, ReactElement>;
  ns?: string | readonly string[];
  i18n?: I18n;
  t?: TFunction;
  shouldUnescape?: boolean;
  [key: string]: unknown;
}

interface I18n {
  t: TFunction;
  options?: {
    react?: ReactOptions;
    defaultNS?: string | readonly string[];
  };
  services: {
    interpolator: {
      interpolate: (text: string, values: Record<string, unknown>, language: string) => string;
    };
  };
  language: string;
}

interface TFunction {
  (key: string, options?: Record<string, unknown>): string;
  ns?: string | readonly string[];
}

interface ReactOptions {
  hashTransKey?: (text: string) => string;
  transEmptyNodeValue?: string;
  transKeepBasicHtmlNodesFor?: readonly string[];
  transSupportBasicHtmlNodes?: boolean;
  transWrapTextNodes?: React.ElementType;
  unescape?: (text: string) => string;
  defaultTransParent?: React.ElementType;
}

interface ParsedNode {
  type: 'tag' | 'text';
  name: string;
  content?: string;
  attrs: Record<string, unknown>;
  children: ParsedNode[];
  voidElement?: boolean;
  dummy?: boolean;
}

/**
 * Trans component for rendering translated content with embedded React components
 */
export function Trans(props: TransProps): ReactNode {
  const {
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions = {},
    values,
    defaults,
    components,
    ns,
    i18n,
    t,
    shouldUnescape,
    ...restProps
  } = props;

  const contextValue = useContext(I18nContext) || {};
  const i18nInstance = i18n || contextValue.i18n || getI18n();

  if (!i18nInstance) {
    warnOnce('You will need to pass in an i18next instance by using i18nextReactModule');
    return children;
  }

  const tFunction = t || i18nInstance.t?.bind(i18nInstance) || ((key: string) => key);

  const options = { ...tOptions };
  if (context) {
    options.context = context;
  }

  const reactOptions: ReactOptions = {
    ...getDefaults(),
    ...(i18nInstance.options?.react || {}),
  };

  const namespaces = ns || tFunction.ns || contextValue.defaultNS || i18nInstance.options?.defaultNS;
  const namespacesArray = typeof namespaces === 'string' 
    ? [namespaces] 
    : (namespaces as string[]) || ['translation'];

  const defaultValue = defaults || nodesToString(children, reactOptions) || reactOptions.transEmptyNodeValue || i18nKey;
  const hashTransKey = reactOptions.hashTransKey;
  const translationKey = i18nKey || (hashTransKey ? hashTransKey(defaultValue) : defaultValue);

  const interpolationOptions = values
    ? options
    : {
        ...options,
        interpolation: {
          ...options.interpolation,
          prefix: '#$?',
          suffix: '?$#',
        },
      };

  const finalOptions = {
    ...interpolationOptions,
    count,
    ...values,
    defaultValue,
    ns: namespacesArray,
  };

  const translatedString = translationKey ? tFunction(translationKey, finalOptions) : defaultValue;

  const renderedNodes = renderNodes(
    components || children,
    translatedString,
    i18nInstance,
    reactOptions,
    finalOptions,
    shouldUnescape
  );

  const parentElement = parent !== undefined ? parent : reactOptions.defaultTransParent;

  return parentElement ? createElement(parentElement, restProps, renderedNodes) : renderedNodes;
}

/**
 * Convert React nodes to a string representation for translation keys
 */
export function nodesToString(children: ReactNode, options: ReactOptions): string {
  if (!children) return '';

  let result = '';
  const childrenArray = toArray(children);
  const basicHtmlNodes = options.transSupportBasicHtmlNodes && options.transKeepBasicHtmlNodesFor
    ? options.transKeepBasicHtmlNodesFor
    : [];

  childrenArray.forEach((child, index) => {
    if (typeof child === 'string') {
      result += child;
    } else if (isValidElement(child)) {
      const propsCount = Object.keys(child.props).length;
      const isBasicHtmlNode = basicHtmlNodes.indexOf(child.type as string) > -1;
      const childChildren = child.props.children;

      if (!childChildren && isBasicHtmlNode && propsCount === 0) {
        result += `<${String(child.type)}/>`;
      } else if (childChildren || (isBasicHtmlNode && propsCount === 0)) {
        if ((child.props as Record<string, unknown>).i18nIsDynamicList) {
          result += `<${index}></${index}>`;
        } else if (isBasicHtmlNode && propsCount === 1 && typeof childChildren === 'string') {
          result += `<${String(child.type)}>${childChildren}</${String(child.type)}>`;
        } else {
          const childString = nodesToString(childChildren, options);
          result += `<${index}>${childString}</${index}>`;
        }
      } else {
        result += `<${index}></${index}>`;
      }
    } else if (child === null) {
      warn('Trans: the passed in value is invalid - seems you passed in a null child.');
    } else if (typeof child === 'object') {
      const { format, ...values } = child as Record<string, unknown>;
      const keys = Object.keys(values);
      if (keys.length === 1) {
        const placeholder = format ? `${keys[0]}, ${format}` : keys[0];
        result += `{{${placeholder}}}`;
      } else {
        warn(
          'react-i18next: the passed in object contained more than one variable - the object should look like {{value, format}} where format is optional.',
          child
        );
      }
    } else {
      warn(
        'Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.',
        child
      );
    }
  });

  return result;
}

function renderNodes(
  components: ReactNode,
  translatedString: string,
  i18n: I18n,
  options: ReactOptions,
  values: Record<string, unknown>,
  shouldUnescape?: boolean
): ReactNode {
  if (translatedString === '') return [];

  const keepBasicHtmlNodes = options.transKeepBasicHtmlNodesFor || [];
  const hasBasicHtmlNodes = translatedString && new RegExp(keepBasicHtmlNodes.join('|')).test(translatedString);

  if (!components && !hasBasicHtmlNodes) {
    return [translatedString];
  }

  const objectValues: Record<string, unknown> = {};

  function extractObjectValues(nodes: ReactNode): void {
    toArray(nodes).forEach((node) => {
      if (typeof node === 'string') return;
      if (hasChildren(node)) {
        extractObjectValues(getChildren(node));
      } else if (typeof node === 'object' && !isValidElement(node)) {
        Object.assign(objectValues, node);
      }
    });
  }

  extractObjectValues(components);

  const parsedNodes = htmlParser.parse(`<0>${translatedString}</0>`);
  const allValues = { ...objectValues, ...values };

  function mapNode(node: ReactElement, parsedNode: ParsedNode, ancestors: Record<string, unknown>[]): ReactNode {
    const children = getChildren(node);
    return processChildren(children, parsedNode.children, ancestors);
  }

  function wrapElement(
    element: ReactElement,
    children: ReactNode,
    result: ReactNode[],
    key: number,
    isVoid?: boolean
  ): void {
    if ((element as { dummy?: boolean }).dummy) {
      (element as { children?: ReactNode }).children = children;
    }
    result.push(
      cloneElement(element, { ...element.props, key }, isVoid ? undefined : children)
    );
  }

  function processChildren(
    components: ReactNode[],
    parsedChildren: ParsedNode[],
    ancestors: Record<string, unknown>[]
  ): ReactNode[] {
    const componentArray = toArray(components);

    return toArray(parsedChildren).reduce<ReactNode[]>((result, parsedChild, index) => {
      const interpolatedContent =
        parsedChild.children?.[0]?.content &&
        i18n.services.interpolator.interpolate(parsedChild.children[0].content, allValues, i18n.language);

      if (parsedChild.type === 'tag') {
        let component = componentArray[parseInt(parsedChild.name, 10)];

        if (!component && ancestors.length === 1 && ancestors[0][parsedChild.name]) {
          component = ancestors[0][parsedChild.name];
        }

        component = component || {};

        const hasAttrs = Object.keys(parsedChild.attrs).length !== 0;
        const elementWithProps = hasAttrs
          ? { ...component, props: { ...parsedChild.attrs, ...(component as ReactElement).props } }
          : component;

        const isReactElement = isValidElement(elementWithProps);
        const hasChildrenAndNotVoid = isReactElement && hasChildren(parsedChild, true) && !parsedChild.voidElement;
        const isDummyElement =
          hasBasicHtmlNodes &&
          typeof elementWithProps === 'object' &&
          (elementWithProps as { dummy?: boolean }).dummy &&
          !isReactElement;
        const isComponentMapping =
          typeof components === 'object' &&
          components !== null &&
          Object.hasOwnProperty.call(components, parsedChild.name);

        if (typeof elementWithProps === 'string') {
          const interpolated = i18n.services.interpolator.interpolate(elementWithProps, allValues, i18n.language);
          result.push(interpolated);
        } else if (hasChildren(elementWithProps) || hasChildrenAndNotVoid) {
          wrapElement(elementWithProps as ReactElement, mapNode(elementWithProps as ReactElement, parsedChild, ancestors), result, index);
        } else if (isDummyElement) {
          const children = processChildren(componentArray, parsedChild.children, ancestors);
          result.push(
            cloneElement(elementWithProps as ReactElement, { ...(elementWithProps as ReactElement).props, key: index }, children)
          );
        } else if (Number.isNaN(parseFloat(parsedChild.name))) {
          if (isComponentMapping) {
            wrapElement(elementWithProps as ReactElement, mapNode(elementWithProps as ReactElement, parsedChild, ancestors), result, index, parsedChild.voidElement);
          } else if (options.transSupportBasicHtmlNodes && keepBasicHtmlNodes.indexOf(parsedChild.name) > -1) {
            if (parsedChild.voidElement) {
              result.push(createElement(parsedChild.name, { key: `${parsedChild.name}-${index}` }));
            } else {
              const children = processChildren(componentArray, parsedChild.children, ancestors);
              result.push(createElement(parsedChild.name, { key: `${parsedChild.name}-${index}` }, children));
            }
          } else if (parsedChild.voidElement) {
            result.push(`<${parsedChild.name} />`);
          } else {
            const childString = processChildren(componentArray, parsedChild.children, ancestors);
            result.push(`<${parsedChild.name}>${childString}</${parsedChild.name}>`);
          }
        } else if (typeof elementWithProps !== 'object' || isReactElement) {
          if (parsedChild.children.length === 1 && interpolatedContent) {
            result.push(cloneElement(elementWithProps as ReactElement, { ...(elementWithProps as ReactElement).props, key: index }, interpolatedContent));
          } else {
            result.push(cloneElement(elementWithProps as ReactElement, { ...(elementWithProps as ReactElement).props, key: index }));
          }
        } else {
          const textContent = parsedChild.children[0] ? interpolatedContent : null;
          if (textContent) result.push(textContent);
        }
      } else if (parsedChild.type === 'text') {
        const wrapTextNodes = options.transWrapTextNodes;
        const interpolated = shouldUnescape && options.unescape
          ? options.unescape(i18n.services.interpolator.interpolate(parsedChild.content || '', allValues, i18n.language))
          : i18n.services.interpolator.interpolate(parsedChild.content || '', allValues, i18n.language);

        if (wrapTextNodes) {
          result.push(createElement(wrapTextNodes, { key: `${parsedChild.name}-${index}` }, interpolated));
        } else {
          result.push(interpolated);
        }
      }

      return result;
    }, []);
  }

  const processed = processChildren(
    [{ dummy: true, children: components || [] }],
    parsedNodes,
    toArray(components || []) as Record<string, unknown>[]
  );

  return getChildren(processed[0]);
}

function hasChildren(node: unknown, checkParsed = false): boolean {
  if (!node) return false;
  const children = (node as ReactElement).props 
    ? (node as ReactElement).props.children 
    : (node as ParsedNode).children;
  return checkParsed ? (children as ParsedNode[])?.length > 0 : !!children;
}

function getChildren(node: unknown): ReactNode[] {
  if (!node) return [];
  const children = (node as ReactElement).props 
    ? (node as ReactElement).props.children 
    : (node as ParsedNode).children;
  return children as ReactNode[];
}

function toArray<T>(value: T | readonly T[]): readonly T[] {
  return Array.isArray(value) ? value : [value];
}