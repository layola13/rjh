import { anObject } from './an-object';
import { definePropertiesModule } from './object-define-properties';
import { enumBugKeys } from './enum-bug-keys';
import { hiddenKeys } from './hidden-keys';
import { html } from './html';
import { documentCreateElement } from './document-create-element';
import { sharedKey } from './shared-key';

const PROTOTYPE = 'prototype';
const SCRIPT = 'script';
const IE_PROTO = sharedKey('IE_PROTO');

let activeXObjectInstance: any;

const emptyConstructor = function (): void {};

const createScriptTag = (content: string): string => {
  return `<${SCRIPT}>${content}</${SCRIPT}>`;
};

const createIFrameDocument = (activeXObject: any): ObjectConstructor => {
  activeXObject.write(createScriptTag(''));
  activeXObject.close();
  const objectConstructor = activeXObject.parentWindow.Object;
  return objectConstructor;
};

const createNullProtoObject = (): any => {
  try {
    activeXObjectInstance = new ActiveXObject('htmlfile');
  } catch (error) {
    // Ignore ActiveXObject errors in non-IE environments
  }

  let iframeDocument: any;
  let iframe: HTMLIFrameElement;
  let protocol: string;

  if (typeof document !== 'undefined') {
    if (document.domain && activeXObjectInstance) {
      return createIFrameDocument(activeXObjectInstance);
    } else {
      iframe = documentCreateElement('iframe');
      protocol = `java${SCRIPT}:`;
      iframe.style.display = 'none';
      html.appendChild(iframe);
      iframe.src = String(protocol);
      iframeDocument = iframe.contentWindow!.document;
      iframeDocument.open();
      iframeDocument.write(createScriptTag('document.F=Object'));
      iframeDocument.close();
      return iframeDocument.F;
    }
  } else {
    return createIFrameDocument(activeXObjectInstance);
  }
};

const nullProtoObject = createNullProtoObject();

for (let i = enumBugKeys.length; i--;) {
  delete nullProtoObject[PROTOTYPE][enumBugKeys[i]];
}

hiddenKeys[IE_PROTO] = true;

export const objectCreate = Object.create || function create(
  prototype: object | null,
  properties?: PropertyDescriptorMap
): any {
  let result: any;

  if (prototype !== null) {
    emptyConstructor[PROTOTYPE] = anObject(prototype);
    result = new (emptyConstructor as any)();
    emptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO] = prototype;
  } else {
    result = nullProtoObject();
  }

  return properties === undefined 
    ? result 
    : definePropertiesModule.f(result, properties);
};