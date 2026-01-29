export * from './module_688682';

const styleConfig = {
  styleTagTransform: styleTagTransformFunction(),
  setAttributes: setAttributesFunction(),
  insert: insertFunction('head'),
  domAPI: domAPIFunction(),
  insertStyleElement: insertStyleElementFunction()
};

applyStyles(styleContent, styleConfig);

export default styleContent?.locals ?? undefined;


function styleTagTransformFunction(): unknown {
  // Implementation needed
  return null;
}

function setAttributesFunction(): unknown {
  // Implementation needed
  return null;
}

function insertFunction(target: string): unknown {
  // Implementation needed
  return null;
}

function domAPIFunction(): unknown {
  // Implementation needed
  return null;
}

function insertStyleElementFunction(): unknown {
  // Implementation needed
  return null;
}

function applyStyles(content: unknown, config: typeof styleConfig): void {
  // Implementation needed
}

const styleContent: { locals?: Record<string, unknown> } | undefined = undefined;