interface CSSExports {
  push(item: [string, string]): void;
}

function createCSSModule(cssFactory: (isProduction: boolean) => CSSExports): CSSExports {
  const module = cssFactory(false);
  
  module.push([
    "module_649406",
    `.autostyler .btn {
  border-radius: 2px;
  padding: 4px 7px;
  margin: 0 5px;
}

.autostyler .btn.btn-primary {
  background: #4d9bd6;
}

.autostyler .btn.btn-primary:hover {
  background: #4d9bd6;
}

.autostyler .btn.btn-default {
  background: #fff;
  border: solid 1px #d9dbdf;
}

.autostyler .btn.btn-default:hover {
  background: #fff;
  border: solid 1px #4d9bd6;
}

.autostyler .modalCover {
  position: fixed;
  left: 0px;
  top: 0px;
  display: block;
  border: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  cursor: auto;
}

.autostyler .autostylerWarningShow {
  border-color: red;
}

.autostyler .model-input {
  height: 36px !important;
  font-size: 14px !important;
  line-height: 36px !important;
}

.autostyler .model-select {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  width: 340px !important;
}

.autostyler .model-select .tp-select-container,
.autostyler .model-select .tp-select-container-value {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
}

.autostyler .model-select .tp-select-downicon {
  top: 12px;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container {
  position: relative;
  left: 0px;
  bottom: 0px;
  display: inline-flex;
  cursor: pointer;
  width: 160px;
  box-sizing: border-box;
  height: 90px;
  margin: 0px;
  padding: 0px;
  border: 1px solid #d9dbdf;
  border-radius: 4px;
  z-index: 1;
  user-select: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #F2F2F2;
  margin: 0px 0px 0px 10px;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container.add-picture-button-container-hover {
  border: 1px solid #4d9bd6;
  background: rgba(50, 125, 255, 0.15);
}

.autostyler .createStylerTemplatePanel .add-picture-button-container.add-picture-button-container-hover .add-picture-button-content .add-picture-button {
  background: #327DFF;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container.add-picture-button-container-hover .add-picture-button-content .add-picture-button-label {
  color: #327DFF;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container.pictureRedLine {
  border: 1px solid red;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container.pictureRedLine .add-picture-button-content .add-picture-button {
  background: #F74C4C;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container.pictureRedLine .add-picture-button-content .add-picture-button-label {
  color: #F74C4C;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container .pictureView {
  position: absolute;
  margin: auto;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0px;
  border-radius: 2px;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container .add-picture-button-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  z-index: 2;
  visibility: visible;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container .add-picture-button-content .add-picture-button {
  width: 20px;
  height: 20px;
  background: #000000;
  border-radius: 20px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container .add-picture-button-content .add-picture-button::before {
  position: relative;
  content: '';
  width: 10px;
  height: 2px;
  left: 1px;
  background: #fff;
  display: inline-flex;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container .add-picture-button-content .add-picture-button::after {
  position: relative;
  content: '';
  width: 2px;
  height: 10px;
  background: #fff;
  display: inline-flex;
  left: -5px;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container .add-picture-button-content .add-picture-button-label {
  font-family: PingFangSC-Regular !important;
  color: #19191E;
  font-size: 12px;
  display: inline-flex;
  position: relative;
  top: 12px;
  padding: 0 12px;
}

.autostyler .createStylerTemplatePanel .add-picture-button-container .add-picture-button-content.add-picture-button-content-hide {
  visibility: hidden;
}`
  ]);
  
  return module;
}

export default createCSSModule;