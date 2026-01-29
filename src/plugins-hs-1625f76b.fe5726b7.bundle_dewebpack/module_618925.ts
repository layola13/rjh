interface CSSExports {
  push(data: [string, string, string]): void;
}

interface WebpackRequire {
  (moduleId: number): any;
}

interface WebpackModule {
  id: string;
  exports: CSSExports;
}

const CSS_CONTENT = `.drop-image-button {
  position: relative;
  margin-right: 12px;
}
.drop-image-button .current-item {
  width: 73px;
  padding: 6px 0 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.drop-image-button .current-item.hover {
  background: #F5F5F5;
  border-radius: 4px;
}
.drop-image-button .current-item .icon-wrapper {
  width: 44px;
  height: 44px;
  position: relative;
}
.drop-image-button .current-item .icon-wrapper .tuozhan {
  position: absolute;
  bottom: 0px;
  left: 100%;
}
.drop-image-button .current-item .text-description {
  margin-top: 4px;
  line-height: 12px;
  align-self: center;
  text-align: center;
  color: #60646f;
}
.drop-image-button .current-item .buyVip {
  position: absolute;
  top: 0px;
  right: 0px;
}
.drop-image-button .sub-items {
  display: none;
  position: absolute;
  background-color: #fff;
  flex-direction: column;
  z-index: 5000;
  box-shadow: 0px 5px 20px 0px rgba(86, 95, 121, 0.2);
  border: 8px;
  margin-top: 4px;
  width: -moz-max-content;
  width: max-content;
  border-radius: 4px;
}
.drop-image-button .sub-items::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  top: -8px;
  left: 0;
  z-index: 0;
}
.drop-image-button .sub-items.left {
  left: 0;
}
.drop-image-button .sub-items.right {
  right: 0;
}
.drop-image-button .sub-items .show {
  display: flex;
}
.drop-image-button .sub-items .sub-item {
  display: flex;
  min-width: 100px;
  max-width: 200px;
  padding: 5px 8px;
  min-height: 36px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  z-index: 10;
  position: relative;
  cursor: pointer;
}
.drop-image-button .sub-items .sub-item:first-of-type {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.drop-image-button .sub-items .sub-item:last-of-type {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.drop-image-button .sub-items .sub-item .icon {
  width: 26px;
  height: 26px;
  flex: none;
  margin-right: 6px;
}
.drop-image-button .sub-items .sub-item .text-description {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  line-height: 12px;
  align-self: center;
  text-align: left;
  color: #60646f;
  flex: auto;
  white-space: wrap;
}
.drop-image-button .sub-items .sub-item .text-description.by-row {
  flex-direction: row;
  align-items: center;
}
.drop-image-button .sub-items .sub-item .text-description.by-column {
  flex-direction: column;
  align-items: flex-start;
  align-content: flex-start;
}
.drop-image-button .sub-items .sub-item .hotkey {
  margin-left: 6px;
}
.drop-image-button .sub-items .sub-item.hover {
  background: #F5F5F5;
}
.drop-image-button .sub-items .sub-item.current {
  background: #ECF1FF;
}
.drop-image-button .catalog-image-new-icon {
  position: absolute;
  top: 0px;
  right: -7px;
  width: 30px;
  height: 12px;
  z-index: 1;
}
.drop-image-button .catalog-image-new-icon img {
  margin-top: 5px;
  width: 30px;
  height: 12px;
}
.drop-image-button .benifit-background {
  border-radius: 9px 2px 9px 2px;
  width: -moz-max-content;
  width: max-content;
  height: 18px;
  background-size: 100% 18px;
  text-align: center;
  line-height: 18px;
  padding: 0px 5px 0px 5px;
  font-weight: 600;
  box-sizing: content-box !important;
  cursor: pointer;
}
.drop-image-button .freeTrailCurrentItem {
  border-radius: 9px 2px 9px 2px;
  width: -moz-max-content;
  width: max-content;
  height: 18px;
  background-size: 100% 18px;
  text-align: center;
  line-height: 18px;
  padding: 0px 5px 0px 5px;
  font-weight: 600;
  box-sizing: content-box !important;
  cursor: pointer;
  background: linear-gradient(to right, #0b51ff, #e318b4);
  color: white;
  position: absolute;
  top: -11px;
  left: 2px;
}
.drop-image-button .freeTrailSubItem {
  border-radius: 9px 2px 9px 2px;
  width: -moz-max-content;
  width: max-content;
  height: 18px;
  background-size: 100% 18px;
  text-align: center;
  line-height: 18px;
  padding: 0px 5px 0px 5px;
  font-weight: 600;
  box-sizing: content-box !important;
  cursor: pointer;
  background: linear-gradient(to right, #0b51ff, #e318b4);
  flex: none;
  margin: 4px 0px 4px 0px;
  color: white;
}
.drop-image-button .buyVip {
  flex: none;
  width: 23px;
  height: 18px;
  margin-left: 5px;
  cursor: pointer;
}`;

export function initializeDropImageButtonStyles(
  module: WebpackModule,
  require: WebpackRequire
): void {
  const assetUrlHelper = require(992716);
  const cssLoader = require(986380);
  
  const styles = cssLoader(false);
  
  const globalEnStyles = `
.global-en .drop-image-button .freeTrailSubItem {
  background: url(${assetUrlHelper(require(592953))}) center no-repeat;
  color: black;
}
.global-en .drop-image-button .freeTrailCurrentItem {
  background: url(${assetUrlHelper(require(592953))}) center no-repeat;
  color: black;
}`;

  styles.push([module.id, CSS_CONTENT + globalEnStyles, '']);
  
  module.exports = styles;
}