export interface Store<T> {
  setState(partial: Partial<T>): void;
  getState(): T;
  subscribe(listener: () => void): () => void;
}

export function create<T extends Record<string, unknown>>(initialState: T): Store<T> {
  let state = initialState;
  const listeners: Array<() => void> = [];

  return {
    setState(partial: Partial<T>): void {
      state = { ...state, ...partial };
      for (let i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },

    getState(): T {
      return state;
    },

    subscribe(listener: () => void): () => void {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    }
  };
}