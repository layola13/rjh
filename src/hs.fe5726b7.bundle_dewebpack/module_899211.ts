import type { CSSResult } from './types';

interface CSSExport {
  push: (entry: [string, string]) => void;
}

const cssModule: CSSExport = require('./986380')(false);

cssModule.push([
  module.id,
  `.helptipContainer {
  height: 16px;
  margin-top: 5px;
  z-index: 2;
}

.helptipContainer .tooltipContainer {
  position: absolute;
  width: 120px;
  top: 78px;
  left: 81px;
  border: solid 1px #717171;
  border-radius: 4px;
}

.helptipContainer .tipArrow {
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: #717171 transparent transparent transparent;
  position: absolute;
  left: 55px;
  top: 75px;
  filter: drop-shadow(1px 0px 1px rgba(52, 58, 64, 0.38));
}

.helptipContainer .tooltipStyle {
  font-size: 11px;
  padding: 5px 5px;
  color: white;
  background-color: #717171;
  line-height: 16px;
}`,
]);

export default cssModule;