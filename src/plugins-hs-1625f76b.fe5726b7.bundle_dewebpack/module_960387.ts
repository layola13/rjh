export * from './module_708418';

import styleInjectFunction from './module_127021';
import setAttributesFunction from './module_988772';
import insertIntoTargetFunction from './module_476535';
import domAPIFunction from './module_385301';
import insertStyleElementFunction from './module_469696';
import styleLoaderAPI from './module_661004';
import styles from './module_708418';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleInjectFunction(),
  setAttributes: setAttributesFunction(),
  insert: insertIntoTargetFunction().bind(null, 'head'),
  domAPI: domAPIFunction(),
  insertStyleElement: insertStyleElementFunction()
};

styleLoaderAPI()(styles, options);

const defaultExport = styles?.locals ?? undefined;

export default defaultExport;