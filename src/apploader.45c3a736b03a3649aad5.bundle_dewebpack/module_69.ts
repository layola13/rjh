import styleTagTransform from './module_935';
import setAttributes from './module_38';
import insert from './module_317';
import domAPI from './module_823';
import insertStyleElement from './module_762';
import applyStyles from './module_230';
import styles from './module_154';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

interface StyleModule {
  A?: {
    locals?: Record<string, string>;
  };
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransform(),
  setAttributes: setAttributes(),
  insert: insert().bind(null, "head"),
  domAPI: domAPI(),
  insertStyleElement: insertStyleElement()
};

applyStyles()(styles.A, options);

const exportedLocals: Record<string, string> | undefined = 
  styles.A?.locals ?? undefined;

export default exportedLocals;