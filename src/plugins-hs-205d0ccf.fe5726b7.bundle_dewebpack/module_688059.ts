import * as module_661004 from './module_661004';
import * as module_385301 from './module_385301';
import * as module_476535 from './module_476535';
import * as module_988772 from './module_988772';
import * as module_469696 from './module_469696';
import * as module_127021 from './module_127021';
import * as module_987020 from './module_987020';

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

interface StyleModule {
  locals?: Record<string, string>;
}

const styleLoaderOptions: StyleLoaderOptions = {
  styleTagTransform: module_127021(),
  setAttributes: module_988772(),
  insert: module_476535().bind(null, 'head'),
  domAPI: module_385301(),
  insertStyleElement: module_469696()
};

module_661004()(module_987020(), styleLoaderOptions);

const defaultExport: Record<string, string> | undefined = 
  module_987020() && module_987020().locals 
    ? module_987020().locals 
    : undefined;

export default defaultExport;
export * from './module_987020';