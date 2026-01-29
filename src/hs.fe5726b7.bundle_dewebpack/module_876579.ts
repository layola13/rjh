export * from './module_61654';

import styleTagTransformFn from './module_127021';
import setAttributesFn from './module_988772';
import insertFn from './module_476535';
import domAPIFn from './module_385301';
import insertStyleElementFn from './module_469696';
import applyStylesFn from './module_661004';
import styleModule from './module_61654';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransformFn(),
  setAttributes: setAttributesFn(),
  insert: insertFn().bind(null, 'head'),
  domAPI: domAPIFn(),
  insertStyleElement: insertStyleElementFn()
};

applyStylesFn()(styleModule, options);

const defaultExport = styleModule?.locals ?? undefined;

export default defaultExport;