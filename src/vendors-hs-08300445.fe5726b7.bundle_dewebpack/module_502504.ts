import React from 'react';
import { isValidElement } from 'react';

interface FlattenChildrenOptions {
  keepEmpty?: boolean;
}

function flattenChildren(
  children: React.ReactNode,
  options: FlattenChildrenOptions = {}
): React.ReactNode[] {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (child != null || options.keepEmpty) {
      if (Array.isArray(child)) {
        result.push(...flattenChildren(child, options));
      } else if (isValidElement(child) && child.props) {
        result.push(...flattenChildren(child.props.children, options));
      } else {
        result.push(child);
      }
    }
  });

  return result;
}

export default flattenChildren;