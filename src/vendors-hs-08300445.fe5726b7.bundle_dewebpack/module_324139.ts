import { createContext } from 'react';

interface ContextValue {}

const defaultContext = createContext<ContextValue>({});

export default defaultContext;