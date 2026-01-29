import { anObject } from './an-object';
import { definePropertiesModule } from './define-properties';
import { enumBugKeys } from './enum-bug-keys';
import { hiddenKeys } from './hidden-keys';
import { html } from './html';
import { documentCreateElement } from './document-create-element';
import { sharedKey } from './shared-key';

const PROTOTYPE = 'prototype';
const SCRIPT = 'script';
const IE_PROTO = sharedKey('IE_PROTO');

let activeXObjectInstance: any;

const EmptyConstructor = function(): void {};

const createScriptTag = (content: string): string => {
  return `<${SCRIPT}>${content}</${SCRIPT}>`;
};

const createIframeDocument = (instance: any): ObjectConstructor => {
  instance.write(createScriptTag(''));
  instance.close();
  const objectConstructor = instance.parentWindow.Object;
  instance = null;
  return objectConstructor;
};

const createNullProtoObject = (): any => {
  try {
    activeXObjectInstance = new ActiveXObject('htmlfile');
  } catch (error) {}

  let iframeDocument: any;
  let iframe: HTMLIFrameElement;
  let javascriptUrl: string;

  if (typeof document !== 'undefined') {
    if (document.domain && activeXObjectInstance) {
      return createIframeDocument(activeXObjectInstance);
    } else {
      iframe = documentCreateElement('iframe');
      javascriptUrl = `java${SCRIPT}:`;
      iframe.style.display = 'none';
      html.appendChild(iframe);
      iframe.src = String(javascriptUrl);
      iframeDocument = iframe.contentWindow!.document;
      iframeDocument.open();
      iframeDocument.write(createScriptTag('document.F=Object'));
      iframeDocument.close();
      return iframeDocument.F;
    }
  } else {
    return createIframeDocument(activeXObjectInstance);
  }
};

const createObjectWithNullPrototype = (): any => {
  const nullProtoObject = createNullProtoObject();
  for (let i = enumBugKeys.length; i--;) {
    delete nullProtoObject[PROTOTYPE][enumBugKeys[i]];
  }
  return nullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

export const objectCreate: typeof Object.create = Object.create || function(
  prototype: object | null,
  properties?: PropertyDescriptorMap
): any {
  let result: any;

  if (prototype !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(prototype);
    result = new (EmptyConstructor as any)();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO] = prototype;
  } else {
    result = createObjectWithNullPrototype();
  }

  return properties === undefined 
    ? result 
    : definePropertiesModule.f(result, properties);
};