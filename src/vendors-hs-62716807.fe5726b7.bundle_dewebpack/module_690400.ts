import React, { useContext, ReactNode, CSSProperties, ReactElement } from 'react';
import classNames from 'classnames';
import { cloneElement } from 'react';
import { ConfigContext } from './ConfigContext';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import Menu from './Menu';
import warning from './warning';
import toArray from './toArray';

interface Route {
  path?: string;
  breadcrumbName: string;
  children?: Route[];
}

interface BreadcrumbProps {
  prefixCls?: string;
  separator?: ReactNode;
  style?: CSSProperties;
  className?: string;
  routes?: Route[];
  children?: ReactNode;
  itemRender?: ItemRenderFunction;
  params?: Record<string, string>;
}

type ItemRenderFunction = (
  route: Route,
  params: Record<string, string>,
  routes: Route[],
  paths: string[]
) => ReactNode;

/**
 * Default item renderer for breadcrumb items
 */
function defaultItemRender(
  route: Route,
  params: Record<string, string>,
  routes: Route[],
  paths: string[]
): ReactNode {
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = interpolateRouteName(route, params);

  return isLastItem ? (
    <span>{name}</span>
  ) : (
    <a href={`#/${paths.join('/')}`}>{name}</a>
  );
}

/**
 * Interpolate route parameters into breadcrumb name
 */
function interpolateRouteName(
  route: Route,
  params: Record<string, string>
): string | null {
  if (!route.breadcrumbName) {
    return null;
  }

  const paramKeys = Object.keys(params).join('|');
  return route.breadcrumbName.replace(
    new RegExp(`:(${ paramKeys})`, 'g'),
    (_match: string, paramKey: string) => params[paramKey] || _match
  );
}

/**
 * Replace route parameters in path string
 */
function replacePathParams(
  path: string = '',
  params: Record<string, string>
): string {
  let result = path.replace(/^\//, '');
  
  Object.keys(params).forEach((paramKey) => {
    result = result.replace(`:${paramKey}`, params[paramKey]);
  });

  return result;
}

/**
 * Build accumulated paths array
 */
function buildPathsArray(
  currentPaths: string[],
  newPath: string = '',
  params: Record<string, string>
): string[] {
  const paths = [...currentPaths];
  const interpolatedPath = replacePathParams(newPath, params);
  
  if (interpolatedPath) {
    paths.push(interpolatedPath);
  }
  
  return paths;
}

/**
 * Omit specified keys from object
 */
function omit<T extends Record<string, unknown>>(
  obj: T,
  keysToOmit: string[]
): Partial<T> {
  const result: Record<string, unknown> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && keysToOmit.indexOf(key) < 0) {
      result[key] = obj[key];
    }
  }

  if (typeof Object.getOwnPropertySymbols === 'function') {
    const symbols = Object.getOwnPropertySymbols(obj);
    
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      if (
        keysToOmit.indexOf(symbol as unknown as string) < 0 &&
        Object.prototype.propertyIsEnumerable.call(obj, symbol)
      ) {
        result[symbol as unknown as string] = obj[symbol as unknown as string];
      }
    }
  }

  return result as Partial<T>;
}

const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
} = (props) => {
  const {
    prefixCls: customPrefixCls,
    separator = '/',
    style,
    className,
    routes,
    children,
    itemRender = defaultItemRender,
    params = {},
    ...restProps
  } = props;

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('breadcrumb', customPrefixCls);

  let breadcrumbItems: ReactNode;

  if (routes && routes.length > 0) {
    const paths: string[] = [];

    breadcrumbItems = routes.map((route) => {
      const path = replacePathParams(route.path, params);
      
      if (path) {
        paths.push(path);
      }

      let overlay: ReactNode = null;

      if (route.children && route.children.length) {
        overlay = (
          <Menu>
            {route.children.map((child) => (
              <Menu.Item key={child.path || child.breadcrumbName}>
                {itemRender(
                  child,
                  params,
                  routes,
                  buildPathsArray(paths, child.path, params)
                )}
              </Menu.Item>
            ))}
          </Menu>
        );
      }

      return (
        <BreadcrumbItem
          overlay={overlay}
          separator={separator}
          key={path || route.breadcrumbName}
        >
          {itemRender(route, params, routes, paths)}
        </BreadcrumbItem>
      );
    });
  } else if (children) {
    breadcrumbItems = toArray(children).map((child: ReactElement, index: number) => {
      if (!child) {
        return child;
      }

      warning(
        child.type &&
          (child.type.__ANT_BREADCRUMB_ITEM === true ||
            child.type.__ANT_BREADCRUMB_SEPARATOR === true),
        'Breadcrumb',
        'Only accepts Breadcrumb.Item and Breadcrumb.Separator as its children'
      );

      return cloneElement(child, {
        separator,
        key: index,
      });
    });
  }

  const classString = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  return (
    <div className={classString} style={style} {...restProps}>
      {breadcrumbItems}
    </div>
  );
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;