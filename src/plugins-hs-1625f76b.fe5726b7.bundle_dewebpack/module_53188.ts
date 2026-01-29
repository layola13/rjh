export * from './module_939867';

const styleTagTransform = await import('./module_127021');
const setAttributes = await import('./module_988772');
const insertFunction = await import('./module_476535');
const domAPI = await import('./module_385301');
const insertStyleElement = await import('./module_469696');
const styleContent = await import('./module_939867');
const styleLoader = await import('./module_661004');

interface StyleLoaderConfig {
  styleTagTransform: unknown;
  setAttributes: unknown;
  insert: unknown;
  domAPI: unknown;
  insertStyleElement: unknown;
}

const config: StyleLoaderConfig = {
  styleTagTransform: styleTagTransform.default(),
  setAttributes: setAttributes.default(),
  insert: insertFunction.default().bind(null, 'head'),
  domAPI: domAPI.default(),
  insertStyleElement: insertStyleElement.default()
};

styleLoader.default(styleContent.default(), config);

const exportedLocals = styleContent.default()?.locals ?? undefined;

export default exportedLocals;