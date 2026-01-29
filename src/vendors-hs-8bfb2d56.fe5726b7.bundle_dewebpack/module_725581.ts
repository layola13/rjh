import getAssetUrl from './utils/getAssetUrl';

interface CSSModule {
  push: (item: [string, string, string]) => void;
}

const cssModule: CSSModule = require('./cssLoader')(false);

cssModule.push([
  module.id,
  `.aimaterial-cropper-container {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 24px 32px rgba(31, 35, 42, 0.08), 0 13px 22px rgba(37, 43, 54, 0.04);
  padding: 8px;
  width: 500px;
  /*!
   * Cropper.js v1.5.12
   * https://fengyuanchen.github.io/cropperjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2021-06-12T08:00:11.623Z
   */
}
.aimaterial-cropper-container.hidden {
  display: none;
}
.aimaterial-cropper-container .image-cropper-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px;
  margin-bottom: 2px;
}
.aimaterial-cropper-container .image-cropper-title {
  font-size: 14px;
  line-height: 14px;
  color: #000;
}
.aimaterial-cropper-container .close-button {
  background: transparent;
  border: none;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  color: #000;
  align-items: center;
  display: flex;
}
.aimaterial-cropper-container .cropper-wrapper {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #DCDFE6;
  background: #000;
  height: calc(100% - 280px);
  max-height: 680px;
}
.aimaterial-cropper-container .cropper-wrapper .cropper-container {
  width: 100%;
  height: 100%;
}
.aimaterial-cropper-container .action-buttons {
  display: flex;
  gap: 24px;
  justify-content: flex-end;
}
.aimaterial-cropper-container .action-buttons .reset-button {
  padding: 18px 46px;
  border: 1px solid #dcdfe6;
  background: #FFFFFF;
  color: #66686B;
  border-radius: 8px;
  cursor: pointer;
  font-size: 22px;
  font-weight: 550;
  transition: all 240ms cubic-bezier(0.645, 0.045, 0.355, 1);
}
.aimaterial-cropper-container .action-buttons .reset-button:hover {
  border-color: #1890ff;
  color: #096dd9;
}
.aimaterial-cropper-container .action-buttons .confirm-button {
  padding: 18px 55px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 111%);
  color: #FFFEFE;
  border-radius: 8px;
  cursor: pointer;
  font-size: 22px;
  font-weight: 650;
  transition: transform 260ms ease, box-shadow 230ms ease;
  box-shadow: 0 45px 65px rgba(76, 70, 124, 0.05);
}
.aimaterial-cropper-container .action-buttons .confirm-button:hover {
  transform: scale(1.03);
  box-shadow: 0 75px 105px rgba(67, 61, 117, 0.07);
}
.aimaterial-cropper-container.mobile {
  width: 100vw;
  height: 100vh;
  padding: 0;
  border-radius: 0;
  border: none;
  box-shadow: none;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
.aimaterial-cropper-container.mobile.hidden {
  display: none;
}
.aimaterial-cropper-container.mobile .cropper-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  border-radius: 0;
  border: none;
  background: transparent;
  height: auto;
  max-height: none;
}
.aimaterial-cropper-container.mobile .cropper-wrapper .cropper-container {
  width: 100%;
  height: 100%;
}
.aimaterial-cropper-container.mobile .mobile-action-buttons {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-bottom: calc(30px + env(safe-area-inset-bottom));
  position: relative;
  z-index: 10001;
}
.aimaterial-cropper-container.mobile .mobile-action-buttons .cancel-button,
.aimaterial-cropper-container.mobile .mobile-action-buttons .complete-button {
  height: 48px;
  line-height: 48px;
  text-align: center;
  flex: 0 0 auto;
  min-width: 100px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #232323;
  color: white;
  padding: 0 24px;
}
.aimaterial-cropper-container.mobile .mobile-action-buttons .cancel-button:hover,
.aimaterial-cropper-container.mobile .mobile-action-buttons .complete-button:hover,
.aimaterial-cropper-container.mobile .mobile-action-buttons .cancel-button:active,
.aimaterial-cropper-container.mobile .mobile-action-buttons .complete-button:active {
  background-color: #494949;
}
.aimaterial-cropper-container .cropper-container {
  direction: ltr;
  font-size: 0;
  line-height: 0;
  position: relative;
  touch-action: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.aimaterial-cropper-container .cropper-container img {
  display: block;
  height: 100%;
  image-orientation: 0deg;
  max-height: none !important;
  max-width: none !important;
  min-height: 0 !important;
  min-width: 0 !important;
  width: 100%;
}
.aimaterial-cropper-container .cropper-wrap-box,
.aimaterial-cropper-container .cropper-canvas,
.aimaterial-cropper-container .cropper-drag-box,
.aimaterial-cropper-container .cropper-crop-box,
.aimaterial-cropper-container .cropper-modal {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.aimaterial-cropper-container .cropper-wrap-box,
.aimaterial-cropper-container .cropper-canvas {
  overflow: hidden;
}
.aimaterial-cropper-container .cropper-drag-box {
  background-color: #fff;
  opacity: 0;
}
.aimaterial-cropper-container .cropper-modal {
  background-color: #000;
  opacity: 0.5;
}
.aimaterial-cropper-container .cropper-view-box {
  display: block;
  height: 100%;
  overflow: hidden;
  width: 100%;
  outline: unset;
  outline-color: unset;
}
.aimaterial-cropper-container .cropper-dashed {
  border: 0 dashed #eee;
  display: block;
  opacity: 0.5;
  position: absolute;
}
.aimaterial-cropper-container .cropper-dashed.dashed-h {
  border-bottom-width: 1px;
  border-top-width: 1px;
  height: calc(100% / 3);
  left: 0;
  top: calc(100% / 3);
  width: 100%;
}
.aimaterial-cropper-container .cropper-dashed.dashed-v {
  border-left-width: 1px;
  border-right-width: 1px;
  height: 100%;
  left: calc(100% / 3);
  top: 0;
  width: calc(100% / 3);
}
.aimaterial-cropper-container .cropper-center {
  display: block;
  height: 0;
  left: 50%;
  opacity: 0.75;
  position: absolute;
  top: 50%;
  width: 0;
}
.aimaterial-cropper-container .cropper-center::before,
.aimaterial-cropper-container .cropper-center::after {
  background-color: #eee;
  content: ' ';
  display: block;
  position: absolute;
}
.aimaterial-cropper-container .cropper-center::before {
  height: 1px;
  left: -3px;
  top: 0;
  width: 7px;
}
.aimaterial-cropper-container .cropper-center::after {
  height: 7px;
  left: 0;
  top: -3px;
  width: 1px;
}
.aimaterial-cropper-container .cropper-face,
.aimaterial-cropper-container .cropper-line,
.aimaterial-cropper-container .cropper-point {
  display: block;
  height: 100%;
  opacity: 0.1;
  position: absolute;
  width: 100%;
}
.aimaterial-cropper-container .cropper-face {
  background-color: #fff;
  left: 0;
  top: 0;
}
.aimaterial-cropper-container .cropper-line.line-e {
  cursor: ew-resize;
  right: -3px;
  top: 0;
  width: 5px;
}
.aimaterial-cropper-container .cropper-line.line-n {
  cursor: ns-resize;
  height: 5px;
  left: 0;
  top: -3px;
}
.aimaterial-cropper-container .cropper-line.line-w {
  cursor: ew-resize;
  left: -3px;
  top: 0;
  width: 5px;
}
.aimaterial-cropper-container .cropper-line.line-s {
  bottom: -3px;
  cursor: ns-resize;
  height: 5px;
  left: 0;
}
.aimaterial-cropper-container .cropper-point {
  background-color: transparent;
  height: 22px;
  width: 22px;
  opacity: 1;
}
.aimaterial-cropper-container .cropper-point.point-e {
  cursor: ew-resize;
  right: -11px;
  top: 50%;
  transform: translateY(-50%);
}
.aimaterial-cropper-container .cropper-point.point-e::before {
  position: absolute;
  display: block;
  content: '';
  width: 4px;
  height: 22px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
}
.aimaterial-cropper-container .cropper-point.point-n {
  cursor: ns-resize;
  left: 50%;
  top: -11px;
  transform: translateX(-50%);
}
.aimaterial-cropper-container .cropper-point.point-n::before {
  position: absolute;
  top: 50%;
  display: block;
  content: '';
  width: 22px;
  height: 4px;
  transform: translateY(-50%);
  background-color: white;
}
.aimaterial-cropper-container .cropper-point.point-w {
  cursor: ew-resize;
  left: -11px;
  top: 50%;
  transform: translateY(-50%);
}
.aimaterial-cropper-container .cropper-point.point-w::before {
  position: absolute;
  display: block;
  content: '';
  width: 4px;
  height: 22px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
}
.aimaterial-cropper-container .cropper-point.point-s {
  bottom: -11px;
  cursor: s-resize;
  left: 50%;
  transform: translateX(-50%);
}
.aimaterial-cropper-container .cropper-point.point-s::before {
  position: absolute;
  display: block;
  content: '';
  width: 22px;
  height: 4px;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
}
.aimaterial-cropper-container .cropper-point.point-ne {
  cursor: nesw-resize;
  right: -7px;
  top: -6px;
  height: 22px;
  width: 22px;
  background-image: url(${getAssetUrl('./corner-icon.png')});
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
}
.aimaterial-cropper-container .cropper-point.point-nw {
  cursor: nwse-resize;
  left: -6px;
  top: -7px;
  height: 22px;
  width: 22px;
  background-image: url(${getAssetUrl('./corner-icon.png')});
  background-color: transparent;
  transform: rotate(-90deg);
  background-repeat: no-repeat;
  background-size: contain;
}
.aimaterial-cropper-container .cropper-point.point-sw {
  bottom: -6px;
  cursor: nesw-resize;
  left: -7px;
  height: 22px;
  width: 22px;
  background-image: url(${getAssetUrl('./corner-icon.png')});
  background-color: transparent;
  transform: rotate(180deg);
  background-repeat: no-repeat;
  background-size: contain;
}
.aimaterial-cropper-container .cropper-point.point-se {
  bottom: -7px;
  cursor: nwse-resize;
  height: 22px;
  opacity: 1;
  right: -6px;
  width: 22px;
  background-image: url(${getAssetUrl('./corner-icon.png')});
  background-color: transparent;
  transform: rotate(90deg);
  background-repeat: no-repeat;
  background-size: contain;
}
.aimaterial-cropper-container .cropper-invisible {
  opacity: 0;
}
.aimaterial-cropper-container .cropper-bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}
.aimaterial-cropper-container .cropper-hide {
  display: block;
  height: 0;
  position: absolute;
  width: 0;
}
.aimaterial-cropper-container .cropper-hidden {
  display: none !important;
}
.aimaterial-cropper-container .cropper-move {
  cursor: move;
}
.aimaterial-cropper-container .cropper-crop {
  cursor: crosshair;
}
.aimaterial-cropper-container .cropper-disabled .cropper-drag-box,
.aimaterial-cropper-container .cropper-disabled .cropper-face,
.aimaterial-cropper-container .cropper-disabled .cropper-line,
.aimaterial-cropper-container .cropper-disabled .cropper-point {
  cursor: not-allowed;
}
.aimaterial-cropper-container .cropper-line {
  background-color: unset;
}`,
  ''
]);

export default cssModule;