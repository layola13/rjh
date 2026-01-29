import styleTagTransform from './935';
import setAttributes from './38';
import insert from './317';
import domAPI from './823';
import insertStyleElement from './762';
import addStylesClient from './230';
import styles from './885';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransform,
  setAttributes: setAttributes,
  insert: insert.bind(null, 'head'),
  domAPI: domAPI,
  insertStyleElement: insertStyleElement
};

addStylesClient(styles, options);

const exportedLocals: Record<string, string> | undefined = 
  styles && styles.locals ? styles.locals : undefined;

export default exportedLocals;