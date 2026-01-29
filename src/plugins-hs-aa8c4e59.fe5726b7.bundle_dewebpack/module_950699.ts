export * from './376754';

const styleModule = await import('./376754');

interface StyleLoaderOptions {
  styleTagTransform: () => void;
  setAttributes: () => void;
  insert: (target: string) => void;
  domAPI: () => void;
  insertStyleElement: () => void;
}

const options: StyleLoaderOptions = {
  styleTagTransform: styleModule.styleTagTransform(),
  setAttributes: styleModule.setAttributes(),
  insert: styleModule.insert.bind(null, 'head'),
  domAPI: styleModule.domAPI(),
  insertStyleElement: styleModule.insertStyleElement()
};

styleModule.applyStyles(styleModule.default, options);

const defaultExport = styleModule.default?.locals ?? undefined;

export default defaultExport;