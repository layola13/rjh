// @ts-nocheck
import { default as imageUrl } from './image-106806';

interface CSSModule {
  id: string;
  push: (entry: [string, string, string]) => void;
}

const cssContent = `.homeGPT-entry {
            
 position: absolute;
 z-index: 1010;
 border-radius: 19px;

}
.homeGPT-entry.homeGPT-floating {
 display: flex;
 align-items: center;
 justify-content: center;
 border: 1px solid #d0dcff;
 background: #FFFFFF;
 width: 188px;
 height: auto;
 right: 267px;
 bottom: 47px;
 transition: width 0.5s, border-radius 0.2s;

}
.homeGPT-entry.homeGPT-floating.multi {

 border-radius: 10px;

}
.homeGPT-entry.homeGPT-floating .homeGPT-dialog-upload-image {

 position: absolute;
 left: -25px;

}
.homeGPT-entry.homeGPT-floating .homeGPT-dialog-footer {

 width: 100%;

}
.homeGPT-entry.homeGPT-floating #homeGPT-textarea-widget {

 line-height: 14px;
 padding-top: 0px;
 padding-bottom: 0px;
 padding-left: 14px;
 line-break: anywhere;
 font-size: 12px;

}
.homeGPT-entry.homeGPT-floating #homeGPT-textarea-widget.bound-active {

 cursor: text;

}
.homeGPT-entry.homeGPT-floating #homeGPT-textarea-widget::-webkit-scrollbar-thumb {

 background: #DBDDE2;
 color: #DBDDE2;
 border-radius: 2px;

}
.homeGPT-entry.homeGPT-floating #homeGPT-textarea-widget::-webkit-scrollbar {

 width: 4px;

}
.homeGPT-entry.homeGPT-dialog-frame {

 height: 50px;
 width: auto;
 transition: height 0.5s;
 overflow: clip;
 visibility: hidden;
 border-radius: 10px;
 box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
 right: 259px;
 bottom: 43px;

}
.homeGPT-entry.homeGPT-dialog-frame.full {

 height: 442px;
 visibility: visible;

}
.homeGPT-entry .homeGPT-dialog-drag-handler {

 width: 100%;
 height: 17px;
 top: 0;
 border-radius: 8px 8px 0 0;
 cursor: move;
 display: flex;
 align-items: center;
 justify-content: center;
 text-align: center;
 background: transparent;

}
.homeGPT-entry .homeGPT-dialog-bg-decoration {

 position: absolute;
 right: 0px;
 top: 0px;
 -o-object-fit: scale-down;
 object-fit: scale-down;
 border-radius: inherit;
 overflow: hidden;
 pointer-events: none;

}
.homeGPT-entry .homeGPT-dialog-main {

 border-radius: 19px;
 height: 442px;

}
.homeGPT-entry .homeGPT-dialog {

 display: flex;
 flex-direction: column;
 justify-content: flex-end;
 height: 100%;
 border-radius: 10px;
 background-color: #FFFFFF;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title {

 padding: 0px 12px;
 line-height: 30px;
 z-index: 2;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .homeGPT-dialog-title-area {

 height: 18px;
 display: flex;
 justify-content: space-between;
 align-items: center;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .homeGPT-dialog-title-area .homeGPT-dialog-title-text {

 display: flex;
 flex-direction: column;
 align-items: flex-start;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .homeGPT-dialog-title-area .homeGPT-dialog-title-text .name {

 width: 120px;
 -o-object-fit: scale-down;
 object-fit: scale-down;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .homeGPT-dialog-title-area .homeGPT-dialog-title-privacy {

 display: flex;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .homeGPT-dialog-title-area .homeGPT-dialog-title-privacy .homeGPT-dialog-fold {

 cursor: pointer;
 display: flex;
 align-items: center;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .homeGPT-dialog-title-area .homeGPT-dialog-title-privacy .homeGPT-dialog-privacy {

 font-size: 11px;
 margin-right: 13px;
 cursor: pointer;
 text-decoration: underline;
 color: rgba(0, 0, 0, 0.3);

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .homeGPT-dialog-title-area .homeGPT-dialog-title-privacy .homeGPT-dialog-privacy:hover {

 color: #000000;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .subtitle-bg {

 display: flex;
 align-items: center;
 justify-content: space-between;
 line-height: 22px;
 background-color: rgba(0, 0, 0, 0.04);
 margin-top: 5px;
 height: 22px;
 border-radius: 11px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .subtitle-bg .upgrade-icon {

 display: flex;
 align-items: center;
 border-radius: 11px;
 padding: 0px 7px;
 background: #000000;
 cursor: pointer;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .subtitle-bg .upgrade-icon img {

 width: 14px;
 height: 14px;
 margin-right: 2px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .subtitle-bg .upgrade-icon .upgrade-text {

 font-size: 11px;
 font-weight: 600;
 color: #F7E8CE;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .subtitle-bg-memberGrade {

 background-color: unset;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .subtitle-bg-hidden {

 visibility: hidden;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-title .remaining-user-count {

 font-size: 12px;
 color: #60646F;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-body {

 overflow: hidden;
 height: 100%;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-body .overlay-container {

 position: absolute;
 top: 0px;
 left: 0;
 right: 0;
 height: 80px;
 background: url(${imageUrl});
 pointer-events: none;
 z-index: 1;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-empty-content {

 height: 100%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-empty-content .homeGPT-logo-center {

 width: 50px;
 height: 50px;
 margin-bottom: 12px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-empty-content .homeGPT-logo-text {

 color: #B9C4DF;
 text-align: center;
 font-size: 12px;
 line-height: 14px;
 margin: 0px 20px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-content-scroll .ps__thumb-y {

 background: #DBDDE2;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer {

 padding: 8px 8px 4px 8px;
 background: #F1F5FF;
 border-radius: 0px 0px 8px 8px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tip-bar {

 width: 100%;
 display: flex;
 align-items: center;
 margin-bottom: 8px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tip-bar .homeGPT-dialog-tip-block-l {

 position: absolute;
 left: 2px;
 width: 20px;
 height: 20px;
 display: flex;
 align-items: center;
 justify-content: center;
 background: linear-gradient(to right, #f1f5ff, rgba(241, 245, 255, 0.5));
 visibility: hidden;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tip-bar .homeGPT-dialog-tip-block-l.active {

 visibility: visible;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tip-bar .homeGPT-dialog-tip-block-r {

 position: absolute;
 right: 2px;
 width: 20px;
 height: 20px;
 display: flex;
 align-items: center;
 justify-content: center;
 background: linear-gradient(to right, rgba(241, 245, 255, 0.5), #f1f5ff);
 visibility: hidden;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tip-bar .homeGPT-dialog-tip-block-r.active {

 visibility: visible;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tips {

 width: 100%;
 display: inline-block;
 white-space: nowrap;
 overflow-x: auto;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tips::-webkit-scrollbar {

 display: none;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tips .tip-item {

 position: relative;
 display: inline-block;
 font-size: 12px;
 padding: 4px 5px;
 background: #fff;
 color: #396EFE;
 border-radius: 4px;
 margin-left: 6px;
 cursor: pointer;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tips .tip-item:first-child {

 margin-left: 0px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-dialog-tips .disable {

 cursor: not-allowed;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer .homeGPT-textarea-widget-placeholder {

 width: 100%;
 height: 100%;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer-grade .homeGPT-dialog-tip-bar {

 width: 100%;
 display: flex;
 align-items: end;
 height: 22px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer-grade .homeGPT-dialog-tip-bar .tip-grade-icon {

 position: absolute;
 display: inline-block;
 width: 18px;
 top: -10px;
 right: -8px;

}
.homeGPT-entry .homeGPT-dialog .homeGPT-dialog-footer-grade .homeGPT-dialog-tips {

 padding-top: 12px;

}
.homeGPT-entry .homeGPT-dialog-input {

 display: flex;
 align-items: center;
 border-radius: 19px;
 height: 38px;

}
.homeGPT-entry .homeGPT-dialog-input.multiline {

 height: 51px;

}
.homeGPT-entry .homeGPT-dialog-input .homeGPT-send-icon-area {

 position: relative;
 width: 32px;
 height: 32px;
 margin-right: 2px;
 align-content: center;
 border-radius: 16px;

}
.homeGPT-entry .homeGPT-dialog-input .homeGPT-send-icon-area .homeGPT-send-icon-bg {

 width: 100%;
 height: 100%;
 border-radius: 16px;
 align-content: center;
 transition: opacity 0.5s;
 opacity: 1;
 background: linear-gradient(to right, #E5E2FD 0%, #789EFF 100%);

}
.homeGPT-entry .homeGPT-dialog-input .homeGPT-send-icon-area .homeGPT-send-icon-bg.sleep {

 opacity: 0;

}
.homeGPT-entry .homeGPT-dialog-input .homeGPT-send-icon-area .homeGPT-send-icon-bg:hover {

 background: linear-gradient(to right, #789EFF 0%, #E5E2FD 100%);

}
.homeGPT-entry .homeGPT-dialog-input .homeGPT-send-icon-area .homeGPT-send-icon-bg .homeGPT-send-icon {

 display: flex;
 align-items: center;
 justify-content: center;

}
.homeGPT-entry .homeGPT-dialog-input textarea {

 background: #FFFFFF;
 border-radius: 19px;
 font-size: 12px;
 border: none;
 flex: 1;

}
.homeGPT-entry .homeGPT-dialog-input textarea::-webkit-input-placeholder {

 font-size: 12px;
 color: #d0dcff;

}
.homeGPT-entry .homeGPT-dialog-input textarea::-moz-placeholder {

 font-size: 12px;
 color: #d0dcff;

}
.homeGPT-entry .homestyler-ui-components.homestyler-popover-item.home-copilot-tool-tip {

 background: #396EFE;
 padding: 0;
 border-radius: 8px;
 width: -moz-max-content;
 width: max-content;

}
.homeGPT-entry .homestyler-ui-components.homestyler-popover-item.home-copilot-tool-tip .tool-tip-area {

 display: flex;
 justify-content: center;
 align-items: center;
 height: 30px;
 font-size: 14px;
 padding: 1.1px 0;

}
.homeGPT-entry .homestyler-ui-components.homestyler-popover-item.home-copilot-tool-tip .tool-tip-area .tool-tip-title {

 color: #FFFFFF;
 margin-right: 10px;
 font-family: AlibabaPuHuiTi-Bold !important;

}
.homeGPT-entry .homestyler-ui-components.homestyler-popover-item.home-copilot-tool-tip .homestyler-popover-caret {

 border-bottom-color: #396EFE;

}
.homeGPT-entry .debug-container {

 position: fixed;
 right: 490px;
 width: 300px;
 height: -moz-fit-content;
 height: fit-content;
 bottom: 40px;
 background: yellowgreen;
 padding: 10px;
 margin-right: 26px;
 border-radius: 8px;

}
#homegpt-container #homeGPT-logo-icon {

 z-index: 1002;
 position: absolute;
 width: 32px;
 height: 32px;
 left: 0px;
 top: 0px;
 opacity: 1;
 pointer-events: none;
 visibility: hidden;

}
#homegpt-container #homeGPT-logo-icon.button-logo-on {

 visibility: visible;
 opacity: 1;
 transition: opacity 0.5s;

}
#homegpt-container #homeGPT-logo-icon.button-logo-off {

 visibility: hidden;
 opacity: 0;

}
#homegpt-container #homeGPT-logo-icon.expand {

 visibility: visible;
 left: -107px;
 top: -243px;
 width: 50px;
 height: 50px;
 animation: copilot-logo-popout 0.5s forwards, copilot-logo-popout2 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0s forwards;

}
#homegpt-container #homeGPT-logo-icon.expand-and-fade {

 visibility: visible;
 animation: copilot-logo-fadeout 0.5s ease-out forwards;

}
@keyframes copilot-logo-popout {

 0% {
    
 width: 32px;
 height: 32px;
 left: 0px;

}
 100% {

 width: 50px;
 height: 50px;
 left: -102px;

}

}
@keyframes copilot-logo-popout2 {

 0% {
    
 top: 0px;

}
 100% {

 top: -233px;

}

}
@keyframes copilot-logo-fadeout {

 0% {
    
 opacity: 1;

}
 100% {

 opacity: 0;

}

}
#homegpt-container #homeGPT-logo-icon.fade-out {

 visibility: hidden;

}
#homegpt-container .homeGPT-voice-icon {

 position: absolute;
 top: 4px;
 right: 36px;

}
.homeGPT-scale-container {

 transform: scale(1);
 transition: transform 0.1s;

}
.homeGPT-scale-container.minSize {

 transform: scale(0.1);

}
.home-copilot-privacy-tip {

 width: 200px;

}`;

export default cssContent;