export * from './499713';

const styleModule = await import('./499713');

const styleOptions = {
  styleTagTransform: (await import('./127021')).default,
  setAttributes: (await import('./988772')).default,
  insert: (await import('./476535')).default.bind(null, 'head'),
  domAPI: (await import('./385301')).default,
  insertStyleElement: (await import('./469696')).default
};

const styleLoader = (await import('./661004')).default;
styleLoader(styleModule.default, styleOptions);

const defaultExport = styleModule.default?.locals ?? undefined;

export default defaultExport;