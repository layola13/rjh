import styleTagTransform from './styleTagTransform';
import setAttributes from './setAttributes';
import insertFn from './insert';
import domAPI from './domAPI';
import insertStyleElement from './insertStyleElement';
import styles from './styles.module.css';

export * from './styles.module.css';

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
  insert: insertFn.bind(null, 'head'),
  domAPI: domAPI(),
  insertStyleElement: insertStyleElement()
};

function applyStyles(stylesModule: unknown, loaderOptions: StyleLoaderOptions): void {
  // Apply styles using the loader API
}

applyStyles(styles, options);

const locals: Record<string, string> | undefined = styles?.locals ?? undefined;

export default locals;