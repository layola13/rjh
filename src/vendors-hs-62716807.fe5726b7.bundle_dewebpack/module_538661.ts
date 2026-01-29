interface TitleSkeletonProps {
  prefixCls?: string;
  className?: string;
  width?: number | string;
  style?: React.CSSProperties;
}

const TitleSkeleton: React.FC<TitleSkeletonProps> = ({ 
  prefixCls, 
  className, 
  width, 
  style 
}) => {
  const mergedClassName = [prefixCls, className].filter(Boolean).join(' ');
  
  const mergedStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {})
  };

  return React.createElement('h3', {
    className: mergedClassName,
    style: mergedStyle
  });
};

export default TitleSkeleton;