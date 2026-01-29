export * from './module_130211';

import styleLoader from './module_661004';
import apiLoader from './module_385301';
import insertLoader from './module_476535';
import setAttributesLoader from './module_988772';
import insertStyleLoader from './module_469696';
import styleTagTransformLoader from './module_127021';
import styles from './module_130211';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (element: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransformLoader(),
  setAttributes: setAttributesLoader(),
  insert: insertLoader().bind(null, 'head'),
  domAPI: apiLoader(),
  insertStyleElement: insertStyleLoader()
};

styleLoader()(styles, options);

const defaultExport = styles?.locals ?? undefined;

export default defaultExport;