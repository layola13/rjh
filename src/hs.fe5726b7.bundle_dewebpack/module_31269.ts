export * from './module_637958';

import styleInject from './module_661004';
import insertStyleElement from './module_469696';
import styleTagTransform from './module_127021';
import setAttributes from './module_988772';
import { insertFactory } from './module_476535';
import applyStyles from './module_385301';
import * as styles from './module_637958';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransform(),
  setAttributes: setAttributes(),
  insert: insertFactory().bind(null, 'head'),
  domAPI: applyStyles(),
  insertStyleElement: insertStyleElement()
};

styleInject(styles, options);

const cssModules = styles?.locals ?? undefined;

export default cssModules;