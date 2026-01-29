export interface CSSModuleLocals {
  [className: string]: string;
}

export type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;
export type SetAttributesFunction = (styleElement: HTMLStyleElement) => void;
export type InsertFunction = (element: HTMLStyleElement) => void;
export type DOMAPIFunction = () => {
  update: (obj: { css: string; media?: string; sourceMap?: string }) => void;
  remove: () => void;
};
export type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

export interface StyleLoaderOptions {
  styleTagTransform: StyleTagTransformFunction;
  setAttributes: SetAttributesFunction;
  insert: InsertFunction;
  domAPI: DOMAPIFunction;
  insertStyleElement: InsertStyleElementFunction;
}

import styleTagTransformModule from './styleTagTransform';
import setAttributesModule from './setAttributes';
import insertModule from './insert';
import domAPIModule from './domAPI';
import insertStyleElementModule from './insertStyleElement';
import styleInjectAPI from './styleInject';
import * as cssModuleExports from './cssModule';

export * from './cssModule';

const options: StyleLoaderOptions = {
  styleTagTransform: styleTagTransformModule,
  setAttributes: setAttributesModule,
  insert: insertModule.bind(null, 'head'),
  domAPI: domAPIModule,
  insertStyleElement: insertStyleElementModule
};

styleInjectAPI(cssModuleExports, options);

const locals: CSSModuleLocals | undefined = cssModuleExports?.locals ?? undefined;

export default locals;