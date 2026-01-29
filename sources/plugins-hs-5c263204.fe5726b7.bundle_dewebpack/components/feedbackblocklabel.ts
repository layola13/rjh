import React, { useContext, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';

interface FeedbackBlockLabelProps {
  label: string;
  required?: boolean;
  children?: ReactNode;
}

export const FeedbackBlockLabel: React.FC<FeedbackBlockLabelProps> = ({
  label,
  required,
  children
}) => {
  const theme = useContext(ThemeContext);

  return (
    <span className={`feedback-block-label ${theme}`}>
      {required && (
        <span className="feedback-block-label-required">*</span>
      )}
      {label}
      {children}
    </span>
  );
};