import styleTagTransform from './935';
import setAttributes from './38';
import insert from './317';
import domAPI from './823';
import insertStyleElement from './762';
import injectStylesIntoStyleTag from './230';
import styles from './781';

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
  styleTagTransform: styleTagTransform,
  setAttributes: setAttributes,
  insert: insert.bind(null, 'head'),
  domAPI: domAPI,
  insertStyleElement: insertStyleElement
};

injectStylesIntoStyleTag((styles as StyleModule).A, options);

const exportedLocals: Record<string, string> | undefined = 
  (styles as StyleModule).A?.locals ?? undefined;

export default exportedLocals;