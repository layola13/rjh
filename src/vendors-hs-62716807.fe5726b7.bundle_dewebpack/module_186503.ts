import * as React from 'react';
import { Component, isValidElement } from 'react';
import createReactClassFactory from './createReactClassFactory';

if (typeof React === 'undefined') {
  throw new Error(
    'create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.'
  );
}

const updater = new Component({}).updater;

export default createReactClassFactory(Component, isValidElement, updater);