export * from './module_41817';

const styleModule = await import('./module_41817');

interface StyleLoaderAPI {
  styleTagTransform: unknown;
  setAttributes: unknown;
  insert: (target: string) => void;
  domAPI: unknown;
  insertStyleElement: unknown;
}

interface StyleModule {
  (): unknown;
  locals?: Record<string, string>;
}

const styleLoaderConfig: StyleLoaderAPI = {
  styleTagTransform: (await import('./module_127021')).default,
  setAttributes: (await import('./module_988772')).default,
  insert: (await import('./module_476535')).default.bind(null, 'head'),
  domAPI: (await import('./module_385301')).default,
  insertStyleElement: (await import('./module_469696')).default,
};

const applyStyles = (await import('./module_661004')).default;
applyStyles(styleModule.default, styleLoaderConfig);

const moduleExports: Record<string, string> | undefined = 
  styleModule.default?.locals ?? undefined;

export default moduleExports;