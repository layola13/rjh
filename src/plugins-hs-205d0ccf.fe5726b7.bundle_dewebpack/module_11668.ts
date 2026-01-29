export * from './module_450969';

import styleInject from './module_127021';
import setAttributesFunction from './module_988772';
import insertFunction from './module_476535';
import domAPIFunction from './module_385301';
import insertStyleElementFunction from './module_469696';
import addStyleFunction from './module_661004';
import styles from './module_450969';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleInject(),
  setAttributes: setAttributesFunction(),
  insert: insertFunction().bind(null, 'head'),
  domAPI: domAPIFunction(),
  insertStyleElement: insertStyleElementFunction()
};

addStyleFunction()(styles, options);

const defaultExport = styles?.locals ?? undefined;

export default defaultExport;