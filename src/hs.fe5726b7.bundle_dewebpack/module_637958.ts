import { default as iconImage } from './icon-path';

interface CSSExports {
  push(item: [string, string]): void;
  id: string;
}

const cssContent = `
.ui-bubbletips {
  position: absolute;
  top: 3px;
  left: 127px;
  z-index: 3000;
  width: 174px;
  height: 52px;
  font-size: 12px;
  background: #fff;
  border: solid 1px #d9dbdf;
  -webkit-filter: drop-shadow(0px 0px 1px rgba(190, 190, 200, 0.5));
  cursor: default;
  filter: drop-shadow(0px 0px 1px rgba(190, 190, 200, 0.5));
}

.ui-bubbletips.show {
  display: block;
}

.ui-bubbletips.hide {
  display: hide;
}

.ui-bubbletips .blue_line {
  float: left;
  width: 5px;
  height: 52px;
  background: #c1dff6;
}

.ui-bubbletips .blue_line.show {
  display: inline-block;
}

.ui-bubbletips .blue_line.hide {
  display: none;
}

.ui-bubbletips .ui-bubbletips-wrapper {
  float: right;
  width: 100%;
  box-sizing: border-box;
  height: 52px;
  padding: 3px 6px;
  text-align: left;
}

.ui-bubbletips .ui-bubbletips-wrapper .colorTipIcon {
  display: block;
  float: left;
  width: 10px;
  height: 10px;
  margin: 2px 1px 0 0;
  background: url(${iconImage}) center center no-repeat;
}

.ui-bubbletips .ui-bubbletips-wrapper p {
  float: left;
  width: 90%;
  color: #808080;
  line-height: 1.4;
}

.ui-bubbletips .ui-bubbletips-wrapper .knowed {
  cursor: pointer;
  float: right;
  color: #4d9bd6;
  position: absolute;
  bottom: 3px;
  right: 5px;
}

.ui-bubbletips .ui-bubbletips-wrapper .iconArrow {
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: transparent transparent transparent #c1dff6;
  position: absolute;
  top: 20px;
  right: -8px;
}

.ui-bubbletips.right .blue_line {
  float: right;
  width: 5px;
  height: 52px;
  background: #c1dff6;
}

.ui-bubbletips.right .ui-bubbletips-wrapper .iconArrow {
  border-color: transparent transparent transparent #c1dff6;
  position: absolute;
  top: 20px;
  right: -8px;
}

.ui-bubbletips.left .blue_line {
  height: 100%;
}

.ui-bubbletips.left .ui-bubbletips-wrapper {
  width: 95%;
  padding: 3px 3px;
  padding-top: 5px;
}

.ui-bubbletips.left .ui-bubbletips-wrapper .content {
  width: 100%;
  height: 100%;
}

.ui-bubbletips.left .ui-bubbletips-wrapper .iconArrow {
  border-color: transparent #c1dff6 transparent transparent;
  position: absolute;
  top: 20px;
  left: -8px;
}

.ui-bubbletips.left .ui-bubbletips-wrapper .knowed {
  bottom: 7px;
  right: 6px;
}

.ui-bubbletips.top {
  border-top: none;
}

.ui-bubbletips.top .blue_line {
  width: 100%;
  height: 5px;
  background: #c1dff6;
}

.ui-bubbletips.top .ui-bubbletips-wrapper .iconArrow {
  border-color: transparent transparent #c1dff6 transparent;
  position: absolute;
  top: -8px;
  right: 50%;
  transform: translate(50%);
}

.ui-bubbletips.bottom {
  border-bottom: none;
}

.ui-bubbletips.bottom .blue_line {
  width: 100%;
  height: 5px;
  background: #c1dff6;
}

.ui-bubbletips.bottom .ui-bubbletips-wrapper .iconArrow {
  border-color: #c1dff6 transparent transparent transparent;
  position: absolute;
  bottom: -10px;
  right: 50%;
  transform: translate(50%);
}

.ui-bubbletips .link_url {
  text-decoration: none;
  position: absolute;
  left: 13px;
  bottom: 4px;
}
`;

export default cssContent;