export * from './103123';

import styleInject from './127021';
import setAttributes from './988772';
import insertBySelector from './476535';
import domAPI from './385301';
import insertStyleElement from './469696';
import styles from './103123';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (element: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleInject(),
  setAttributes: setAttributes(),
  insert: insertBySelector().bind(null, 'head'),
  domAPI: domAPI(),
  insertStyleElement: insertStyleElement()
};

styles(options);

const locals: Record<string, string> | undefined = 
  styles && styles.locals ? styles.locals : undefined;

export default locals;