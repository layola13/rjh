import { createContext } from 'react';

interface RadioGroupContextValue {
  // Add specific properties based on your radio group requirements
  value?: string | number;
  onChange?: (value: string | number) => void;
  name?: string;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;
export default RadioGroupContext;