import React from 'react';

interface ClickStopperProps {
  className?: string;
  children?: React.ReactNode;
}

const ClickStopper: React.FC<ClickStopperProps> = ({ className, children }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export default ClickStopper;