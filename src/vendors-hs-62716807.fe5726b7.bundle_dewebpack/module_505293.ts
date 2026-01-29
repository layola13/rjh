import React from 'react';
import classNames from 'classnames';

interface SkeletonParagraphProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  rows?: number;
  width?: number | string | Array<number | string>;
}

/**
 * Skeleton Paragraph Component
 * Renders a list of placeholder lines for loading states
 */
const SkeletonParagraph: React.FC<SkeletonParagraphProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    rows = 2,
    width
  } = props;

  const getWidth = (index: number): number | string | undefined => {
    if (Array.isArray(width)) {
      return width[index];
    }
    
    // Last row uses the specified width, others use undefined (100%)
    return index === rows - 1 ? width : undefined;
  };

  const paragraphLines = Array.from({ length: rows }, (_, index) => (
    React.createElement('li', {
      key: index,
      style: {
        width: getWidth(index)
      }
    })
  ));

  return React.createElement('ul', {
    className: classNames(prefixCls, className),
    style
  }, paragraphLines);
};

export default SkeletonParagraph;