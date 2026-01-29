export * from './module_649406';

const styleModule = await import('./module_649406');

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: (await import('./module_127021')).default(),
  setAttributes: (await import('./module_988772')).default(),
  insert: (await import('./module_476535')).default().bind(null, 'head'),
  domAPI: (await import('./module_385301')).default(),
  insertStyleElement: (await import('./module_469696')).default()
};

const styleInserter = (await import('./module_661004')).default;
styleInserter(styleModule.default(), options);

const result: Record<string, unknown> | undefined = 
  styleModule.default()?.locals ?? undefined;

export default result;