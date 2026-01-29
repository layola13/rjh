export * from './module_103457';

import styleInject from './module_661004';
import domAPI from './module_385301';
import insertStyleElement from './module_469696';
import styleTagTransform from './module_127021';
import setAttributes from './module_988772';
import insertFn from './module_476535';
import styles from './module_103457';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (element: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransform(),
  setAttributes: setAttributes(),
  insert: insertFn().bind(null, 'head'),
  domAPI: domAPI(),
  insertStyleElement: insertStyleElement()
};

styleInject(styles(), options);

const defaultExport = styles()?.locals ?? undefined;

export default defaultExport;