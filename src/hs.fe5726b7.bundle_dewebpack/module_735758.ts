interface VDividerProps {
  data?: {
    className?: string;
  };
}

const VDivider: React.FC<VDividerProps> = (props) => {
  const className = props.data?.className ?? '';
  
  return React.createElement('span', {
    className: `vdivider ${className}`
  });
};

export default VDivider;