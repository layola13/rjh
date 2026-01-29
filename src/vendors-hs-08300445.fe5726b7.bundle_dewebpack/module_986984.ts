import React from 'react';
import isMobile from 'is-mobile';

export const menuAllProps = [
  'defaultSelectedKeys',
  'selectedKeys',
  'defaultOpenKeys',
  'openKeys',
  'mode',
  'getPopupContainer',
  'onSelect',
  'onDeselect',
  'onDestroy',
  'openTransitionName',
  'openAnimation',
  'subMenuOpenDelay',
  'subMenuCloseDelay',
  'forceSubMenuRender',
  'triggerSubMenuAction',
  'level',
  'selectable',
  'multiple',
  'onOpenChange',
  'visible',
  'focusable',
  'defaultActiveFirst',
  'prefixCls',
  'inlineIndent',
  'parentMenu',
  'title',
  'rootPrefixCls',
  'eventKey',
  'active',
  'onItemHover',
  'onTitleMouseEnter',
  'onTitleMouseLeave',
  'onTitleClick',
  'popupAlign',
  'popupOffset',
  'isOpen',
  'renderMenuItem',
  'manualRef',
  'subMenuKey',
  'disabled',
  'index',
  'isSelected',
  'store',
  'activeKey',
  'builtinPlacements',
  'overflowedIndicator',
  'motion',
  'attribute',
  'value',
  'popupClassName',
  'inlineCollapsed',
  'menu',
  'theme',
  'itemIcon',
  'expandIcon',
] as const;

export function noop(): void {}

/**
 * Generate key for menu item from children index
 */
export function getKeyFromChildrenIndex(
  element: React.ReactElement,
  prefix: string | undefined,
  index: number
): string {
  const keyPrefix = prefix || '';
  return element.key || `${keyPrefix}item_${index}`;
}

/**
 * Generate menu ID from submenu event key
 */
export function getMenuIdFromSubMenuEventKey(eventKey: string): string {
  return `${eventKey}-menu-`;
}

/**
 * Get element width with optional margin calculation
 */
export function getWidth(element: HTMLElement | null, includeMargin = false): number {
  if (!element || typeof element.getBoundingClientRect !== 'function') {
    return 0;
  }

  let width = element.getBoundingClientRect().width;

  if (width) {
    if (includeMargin) {
      const computedStyle = getComputedStyle(element);
      const marginLeft = computedStyle.marginLeft;
      const marginRight = computedStyle.marginRight;
      width += parseFloat(marginLeft.replace('px', '')) + parseFloat(marginRight.replace('px', ''));
    }
    width = parseFloat(width.toFixed(6));
  }

  return width || 0;
}

/**
 * Set inline style property on element
 */
export function setStyle(element: HTMLElement | null, property: string, value: string): void {
  if (element && typeof element.style === 'object') {
    element.style[property as any] = value;
  }
}

/**
 * Check if current device is mobile
 */
export function isMobileDevice(): boolean {
  return isMobile.any;
}

type MenuItemCallback = (child: React.ReactElement, index: number) => void;

/**
 * Loop through menu items, expanding MenuItemGroup children
 */
export function loopMenuItem(children: React.ReactNode, callback: MenuItemCallback): void {
  let currentIndex = -1;

  React.Children.forEach(children, (child) => {
    currentIndex += 1;

    if (child && (child as React.ReactElement).type && (child as any).type.isMenuItemGroup) {
      React.Children.forEach((child as React.ReactElement).props.children, (groupChild) => {
        currentIndex += 1;
        callback(groupChild as React.ReactElement, currentIndex);
      });
    } else {
      callback(child as React.ReactElement, currentIndex);
    }
  });
}

interface RecursiveSearchResult {
  find: boolean;
}

/**
 * Recursively search menu items by event keys
 */
export function loopMenuItemRecursively(
  children: React.ReactNode,
  eventKeys: string[],
  result: RecursiveSearchResult
): void {
  if (!children || result.find) {
    return;
  }

  React.Children.forEach(children, (child) => {
    if (!child) {
      return;
    }

    const childElement = child as React.ReactElement;
    const childType = childElement.type as any;

    if (!childType || !(childType.isSubMenu || childType.isMenuItem || childType.isMenuItemGroup)) {
      return;
    }

    if (eventKeys.indexOf(childElement.key as string) !== -1) {
      result.find = true;
    } else if (childElement.props.children) {
      loopMenuItemRecursively(childElement.props.children, eventKeys, result);
    }
  });
}