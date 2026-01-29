import { CSSResult } from './types';

interface CSSModule {
  push: (entry: [string, string]) => void;
}

export function createDropdownStyles(id: string, cssModuleFactory: (sourceMap: boolean) => CSSModule): CSSModule {
  const module = cssModuleFactory(false);
  
  module.push([
    id,
    `.cdropdown {
  float: left;
  position: relative;
}

.cdropdown.disable {
  opacity: 0.5;
}

.cdropdown img,
.cdropdown svg {
  width: 24px;
  height: 24px;
  float: left;
}

.cdropdown button {
  height: 26px;
  width: 110px;
  font-size: 13px;
  text-align: left;
  padding-left: 0;
  outline: none;
  background: none;
  border: solid 1px #ccc;
}

.cdropdown button svg {
  margin: 5px 0 0 10px;
  width: 10px;
  height: 10px;
  float: left;
}

.cdropdown button .utext {
  margin-left: 10px;
}

.cdropdown button .caret {
  margin-left: 8px;
}

.cdropdown > ul {
  height: auto;
  max-height: 160px;
  display: none;
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  min-width: 0;
  bottom: auto;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 0;
  box-shadow: none;
  left: 0;
  z-index: 1000;
  position: absolute;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
}

.cdropdown > ul li {
  float: none;
  height: 28px;
  width: 100%;
  list-style: none;
}

.cdropdown > ul li.option-divider {
  margin-top: 5px;
  border-top: 1px solid #ccc;
  height: 0px;
  line-height: 0px;
}

.cdropdown > ul li svg {
  margin: 10px 0 0 10px;
  width: 10px;
  height: 10px;
  float: left;
}

.cdropdown > ul li:hover {
  cursor: pointer;
  background-color: rgba(85, 172, 238, 0.15);
}

.cdropdown > ul li input,
.cdropdown > ul li a {
  padding: 0;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  clear: none;
  padding-top: 5px;
  font-weight: 400;
  line-height: 1.43;
  color: #19191E;
  text-decoration: none;
}

.cdropdown > ul li .hotKey {
  float: right;
  margin: 5px 10px 0 0;
  line-height: 1.43;
  color: #19191E;
}

.cdropdown > ul li .right_image {
  float: right;
  margin-right: 20px;
}

.cdropdown > ul li .right_image svg {
  width: 14px;
  height: 18px;
  margin: 5px 0 0 5px;
}`
  ]);
  
  return module;
}