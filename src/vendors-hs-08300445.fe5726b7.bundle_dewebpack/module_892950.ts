import React from 'react';

interface OptionData {
  key: string | number;
  value: string | number;
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface GroupData {
  key: string;
  label: React.Key;
  options: (OptionData | GroupData | null)[];
  [key: string]: unknown;
}

interface SelectOptionProps {
  children?: React.ReactNode;
  value?: string | number;
  [key: string]: unknown;
}

interface SelectOptGroupProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  [key: string]: unknown;
}

interface SelectOptionType extends React.ReactElement<SelectOptionProps> {
  type: {
    isSelectOptGroup?: boolean;
  };
}

const GROUP_KEY_PREFIX = '__RC_SELECT_GRP__';
const GROUP_KEY_SUFFIX = '__';

function createOptionData(element: SelectOptionType): OptionData {
  const { key, props } = element;
  const { children, value, ...restProps } = props;

  return {
    key: key ?? '',
    value: value !== undefined ? value : key ?? '',
    children,
    ...restProps,
  };
}

function createGroupData(
  element: SelectOptionType,
  index: number,
  children: React.ReactNode
): GroupData {
  const { key, props } = element;
  const { children: _, ...restProps } = props;

  return {
    key: `${GROUP_KEY_PREFIX}${key ?? index}${GROUP_KEY_SUFFIX}`,
    label: key ?? '',
    ...restProps,
    options: convertChildrenToData(children, false),
  };
}

export function convertChildrenToData(
  children: React.ReactNode,
  isTopLevel: boolean = true
): (OptionData | GroupData | null)[] {
  return React.Children.toArray(children)
    .map((child, index) => {
      if (!React.isValidElement(child) || !child.type) {
        return null;
      }

      const element = child as SelectOptionType;
      const isOptGroup = element.type.isSelectOptGroup === true;

      if (isTopLevel || !isOptGroup) {
        return createOptionData(element);
      }

      return createGroupData(element, index, element.props.children);
    })
    .filter((item): item is OptionData | GroupData => item !== null);
}