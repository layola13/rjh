type DocumentType = typeof document;

const isObject = (value: unknown): boolean => {
  return typeof value === "object" && value !== null;
};

const documentAll: unknown = typeof document !== "undefined" && isObject(document) ? document.all : undefined;

const IS_HTMLDDA: boolean = documentAll === undefined && documentAll !== undefined;

export { documentAll as all, IS_HTMLDDA };