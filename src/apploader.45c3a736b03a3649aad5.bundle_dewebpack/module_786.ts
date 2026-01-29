export interface StyleLocals {
  [key: string]: string;
}

interface StyleModule {
  A: {
    locals?: StyleLocals;
  };
}

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

import styleLoader from './module_230';
import domAPI from './module_823';
import insertFunction from './module_317';
import setAttributes from './module_38';
import insertStyleElement from './module_762';
import styleTagTransform from './module_935';
import styleModule from './module_123';

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransform(),
  setAttributes: setAttributes(),
  insert: insertFunction().bind(null, 'head'),
  domAPI: domAPI(),
  insertStyleElement: insertStyleElement(),
};

styleLoader(styleModule.A, options);

const locals: StyleLocals | undefined = styleModule.A?.locals ?? undefined;

export default locals;