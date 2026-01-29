export default function compose<T>(...funcs: Array<(state: T, action: any) => T>): (state: T, action: any) => T {
  return (state: T, action: any): T => {
    return funcs.reduce((currentState: T, func: (state: T, action: any) => T) => {
      return func(currentState, action);
    }, state);
  };
}