export interface StyleLocals {
  [key: string]: string;
}

const styleLocals: StyleLocals | undefined = (() => {
  // Since the original imports are not available, this would need to be
  // populated with actual style module exports
  return undefined;
})();

export default styleLocals;

export * from './style-module';