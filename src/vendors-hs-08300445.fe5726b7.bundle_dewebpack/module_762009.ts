import React from 'react';

interface DivWrapperProps {
  className?: string;
  children?: React.ReactNode;
}

const DivWrapper: React.FC<DivWrapperProps> = ({ className, children }) => {
  return React.createElement('div', { className }, children);
};

export default DivWrapper;