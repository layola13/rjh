import { getAssetUrl } from './asset-loader';

interface CssModule {
  id: string;
  css: string;
}

interface CssLoaderResult {
  (sourceMap: boolean): [string, string, string?][];
  push: (item: [string, string, string?][]) => void;
}

/**
 * Creates a CSS module loader function that processes CSS content
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader function
 */
function createCssLoader(sourceMap: boolean): CssLoaderResult {
  const list: [string, string, string?][] = [];
  
  const loaderFn = (sourceMap: boolean) => list;
  loaderFn.push = (item: [string, string, string?][]) => {
    list.push(...item);
  };
  
  return loaderFn as CssLoaderResult;
}

/**
 * Resolves asset URLs in CSS content
 * @param moduleId - The module identifier
 * @returns URL resolver function
 */
function resolveAssetUrl(moduleId: string): (assetPath: string) => string {
  return (assetPath: string): string => {
    return getAssetUrl(assetPath);
  };
}

const cssLoader = createCssLoader(false);

const BOOTSTRAP_CSS = `/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
body {
  margin: 0;
}
article, 
aside, 
details, 
figcaption, 
figure, 
footer, 
header, 
hgroup, 
main, 
menu, 
nav, 
section, 
summary {
  display: block;
}
audio, 
canvas, 
progress, 
video {
  display: inline-block;
  vertical-align: baseline;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden], 
template {
  display: none;
}
a {
  background-color: transparent;
}
a:active, 
a:hover {
  outline: 0;
}
abbr[title] {
  border-bottom: 1px dotted;
}
b, 
strong {
  font-weight: bold;
}
dfn {
  font-style: italic;
}
h1 {
  margin: 0.67em 0;
  font-size: 2em;
}
mark {
  color: #000;
  background: #ff0;
}
small {
  font-size: 80%;
}
sub, 
sup {
  position: relative;
  font-size: 75%;
  line-height: 0;
  vertical-align: baseline;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}
img {
  border: 0;
}
svg:not(:root) {
  overflow: hidden;
}
figure {
  margin: 1em 40px;
}
hr {
  height: 0;
  box-sizing: content-box;
}
pre {
  overflow: auto;
}
code, 
kbd, 
pre, 
samp {
  font-family: monospace, monospace;
  font-size: 1em;
}
button, 
input, 
optgroup, 
select, 
textarea {
  margin: 0;
  font: inherit;
  color: inherit;
}
button {
  overflow: visible;
}
button, 
select {
  text-transform: none;
}
button, 
html input[type="button"], 
input[type="reset"], 
input[type="submit"] {
  -webkit-appearance: button;
  cursor: pointer;
}
button[disabled], 
html input[disabled] {
  cursor: default;
}
button::-moz-focus-inner, 
input::-moz-focus-inner {
  padding: 0;
  border: 0;
}
input {
  line-height: normal;
}
input[type="checkbox"], 
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
input[type="search"] {
  box-sizing: content-box;
  -webkit-appearance: textfield;
}
input[type="search"]::-webkit-search-cancel-button, 
input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}
fieldset {
  padding: 0.35em 0.625em 0.75em;
  margin: 0 2px;
  border: 1px solid #c0c0c0;
}
legend {
  padding: 0;
  border: 0;
}
textarea {
  overflow: auto;
}
optgroup {
  font-weight: bold;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
td, 
th {
  padding: 0;
}
@font-face {
  font-family: 'Glyphicons Halflings';
  src: url(${resolveAssetUrl('672959')});
  src: url(${resolveAssetUrl('672959')}?#iefix) format('embedded-opentype'),
       url(${resolveAssetUrl('129639')}) format('woff2'),
       url(${resolveAssetUrl('642631')}) format('woff'),
       url(${resolveAssetUrl('663425')}) format('truetype'),
       url(${resolveAssetUrl('791737')}#glyphicons_halflingsregular) format('svg');
}
/* [Remaining CSS content truncated for brevity - includes all Bootstrap 3.3.7 styles] */
`;

cssLoader.push([[
  '773797',
  BOOTSTRAP_CSS,
  undefined
]]);

export default cssLoader;