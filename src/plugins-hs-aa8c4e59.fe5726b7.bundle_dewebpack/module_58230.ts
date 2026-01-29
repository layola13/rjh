export * from './module_353089';

const styleModule = await import('./module_353089');

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const styleLoader = await import('./module_661004');
const domAPI = await import('./module_385301');
const insertBySelector = await import('./module_476535');
const setAttributesWithoutAttributes = await import('./module_988772');
const insertStyleElement = await import('./module_469696');
const styleTagTransformFactory = await import('./module_127021');

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransformFactory.default(),
  setAttributes: setAttributesWithoutAttributes.default(),
  insert: insertBySelector.default.bind(null, 'head'),
  domAPI: domAPI.default(),
  insertStyleElement: insertStyleElement.default()
};

styleLoader.default(styleModule.default(), options);

const defaultExport = styleModule.default()?.locals ?? undefined;

export default defaultExport;