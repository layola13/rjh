import { useContext, ReactNode, createElement } from 'react';
import { ThemeContext } from './ThemeContext';

interface FeedbackBlockWrapperProps {
  children: ReactNode;
}

export function FeedbackBlockWrapper({ children }: FeedbackBlockWrapperProps): JSX.Element {
  const theme = useContext(ThemeContext);
  
  return createElement('div', {
    className: `feedback-block-wrapper ${theme}`
  }, children);
}