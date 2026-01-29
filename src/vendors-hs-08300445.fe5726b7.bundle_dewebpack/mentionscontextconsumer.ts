import { createContext } from 'react';

interface MentionsContextValue {
  // Define the actual shape of your context value here
  // This is a placeholder - update based on actual usage
  [key: string]: unknown;
}

const MentionsContext = createContext<MentionsContextValue | null>(null);

export const MentionsContextProvider = MentionsContext.Provider;
export const MentionsContextConsumer = MentionsContext.Consumer;