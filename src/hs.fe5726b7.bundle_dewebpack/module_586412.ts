import { requireAssetUrl } from './asset-loader';

interface CSSExport {
  push(item: [string, string]): void;
  id: string;
}

const cssModule: CSSExport = require('./css-loader')(false);

const closeIconDefault = requireAssetUrl('./assets/close-icon-default.png');
const closeIconHover = requireAssetUrl('./assets/close-icon-hover.png');

const cssContent = `.MsgBoxWrapper {
  position: absolute;
  pointer-events: auto;
  z-index: 10000;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}

.MsgBoxWrapper .MsgBoxOverLay {
  background: none repeat scroll 0 0 #000;
  height: 100%;
  left: 0;
  filter: alpha(opacity=30);
  -moz-opacity: 0.3;
  -khtml-opacity: 0.3;
  opacity: 0.3;
  position: fixed;
  width: 100%;
  z-index: 110;
}

@keyframes show-dialog {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.MsgBoxWrapper .MsgBoxMain {
  width: 500px;
  margin: -100px auto 0;
  top: 50%;
  position: relative;
  height: auto;
  overflow: hidden;
  z-index: 1001;
  background: #FFFFFF;
  box-shadow: 0px 4px 16px 0px rgba(25, 25, 30, 0.15);
  border-radius: 8px;
  animation: show-dialog 0.4s;
  -webkit-animation: show-dialog 0.4s;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxHeader {
  position: relative;
  top: 0px;
  overflow: hidden;
  background-color: #fff;
  padding-left: 40px;
  padding-top: 40px;
  padding-right: 40px;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxHeader .title {
  font-size: 20px;
  float: left;
  font-weight: normal;
  line-height: 30px;
  width: 100%;
  color: #19191E;
  padding-bottom: 10px;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxHeader .closebtn {
  position: absolute;
  background-image: url(${closeIconDefault});
  background-repeat: no-repeat;
  width: 14px;
  height: 14px;
  right: 38px;
  top: 16px;
  cursor: pointer;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxHeader .closebtn:hover {
  background-image: url(${closeIconHover});
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxContent {
  height: 100%;
  color: #a7a7a7;
  font-size: 15px;
  padding: 20px 40px 0 40px;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxContent p {
  text-align: left;
  font-size: 15px;
  line-height: 24px;
  color: #333;
  word-break: break-word;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxContent .selectable {
  -webkit-user-select: text;
  -moz-user-select: text;
  -o-user-select: text;
  user-select: text;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxContent .linkContent {
  display: inline;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter {
  height: 60px;
  padding-top: 20px;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns {
  float: right;
  padding-right: 39px;
  padding-top: 10px;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-button {
  box-sizing: border-box;
  min-width: 88px;
  font-size: 12px;
  box-shadow: none;
  margin-left: 40px;
  font-weight: 100;
  height: 30px;
  border: 0px;
  border-radius: 2px;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-default-button {
  color: #19191E;
  background-color: #fff;
  border: 1px solid #DCDCE1;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-default-button:hover,
.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-default-button:focus,
.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-default-button:active {
  border: 1px solid #327dff;
  color: #327DFF;
  outline: 0px none;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-primary-button {
  background: linear-gradient(to right, #327DFF, #4B96FF);
  color: #fff;
  font-weight: bold;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-primary-button:hover,
.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-primary-button:focus,
.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxBtns .msgbox-primary-button:active {
  box-shadow: none;
  outline: 0px none;
  background: linear-gradient(to right, #1763E6, #4B96FF);
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox {
  float: left;
  margin-left: 40px;
  margin-bottom: 22px;
  font-size: 14px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox .invisible {
  display: none;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox .dontShowInput {
  display: flex;
  align-items: center;
  justify-content: center;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox .dontShowInput .invisible {
  display: none;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox .isChkInput {
  display: flex;
  align-items: center;
  justify-content: center;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox .isChkInput .invisible {
  display: none;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox input[type=checkbox] {
  -moz-appearance: none;
  appearance: none;
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
  display: inline-block;
  background: #FFFFFF;
  border: 1px solid #dcdce1;
  margin: -1px 10px 0 0;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox input[type=checkbox]:checked {
  background: #327DFF;
  outline: none;
  border: 1px solid #327dff;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox input[type=checkbox]:focus {
  outline: none;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox input[type=checkbox]:hover {
  border: 1px solid #327dff;
  outline: none;
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox input[type=checkbox]:after {
  content: "";
  display: inline-block;
  position: relative;
  top: -6px;
  left: 2px;
  width: 4px;
  height: 7px;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.MsgBoxWrapper .MsgBoxMain .MsgBoxFooter .MsgBoxCheckBox label {
  font-size: 12px;
  color: #19191E;
}

.MsgBoxWrapper .MsgBoxMain.MsgBoxMainHide {
  transform: scale(0);
  -webkit-transform: scale(0);
  transition: transform 0.2s;
  -webkit-transition: -webkit-transform 0.2s;
}

.homestyler-ui-components .homestyler-modal-content {
  box-shadow: none;
  border: none;
}`;

cssModule.push([cssModule.id, cssContent]);

export default cssModule;