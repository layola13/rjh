import React from 'react';
import { useTheme } from './hooks/useTheme';
import { contentConfig } from './config/contentConfig';

interface RemindContentProps {
  type: string;
  data: unknown;
}

export function RemindContent({ type, data }: RemindContentProps): React.ReactElement | null {
  const config = contentConfig[type];
  const Component = config?.Component;

  if (!Component) {
    return null;
  }

  const theme = useTheme();

  return (
    <div className={`remind-content-wrapper ${theme}`}>
      <Component type={type} data={data} />
    </div>
  );
}