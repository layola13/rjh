import { createContext } from 'react';

interface TreeContextValue {
  // Define the actual tree context value structure based on your application needs
  // This is a placeholder - update with actual properties
  [key: string]: unknown;
}

export const TreeContext = createContext<TreeContextValue | null>(null);