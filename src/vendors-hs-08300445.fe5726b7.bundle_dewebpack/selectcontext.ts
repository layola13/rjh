import { createContext } from 'react';

interface SelectContextValue {
  // Add specific properties based on your Select component's needs
  // For example:
  // value?: unknown;
  // onChange?: (value: unknown) => void;
  // disabled?: boolean;
}

export const SelectContext = createContext<SelectContextValue | null>(null);