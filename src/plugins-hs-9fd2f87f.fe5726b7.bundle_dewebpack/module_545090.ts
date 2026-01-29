interface CSSModule {
  id: string;
  push: (content: [string, string, string]) => void;
}

const imageUrl1 = require('./assets/temperature-gradient.png');
const imageUrl2 = require('./assets/slider-thumb.png');

const cssContent = `.light-band-settings-panel .panel-wrap {
  background-color: #fafafa;
  position: absolute;
  top: 35%;
  left: 35%;
  z-index: 99;
  padding: 0px;
  cursor: default;
  color: #808080;
}

.light-band-settings-panel .panel-wrap .panel-title {
  color: #848084;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
  text-align: center;
  letter-spacing: 1px;
  width: 100%;
  padding: 0px;
  margin: 0px;
  vertical-align: baseline;
  font-family: 'Frutiger Next LT W1G', Calibri, Arial, Helvetica, sans-serif !important;
}

.light-band-settings-panel .panel-wrap .panel-title .closeBtn {
  border-left: 1px solid #cfcfcf;
  line-height: 30px;
  padding-left: 5px;
  position: absolute;
  top: 20px;
  transform: translateY(-50%);
  font-weight: normal;
  right: 5px;
}

.light-band-settings-panel .panel-wrap .panel-body {
  width: 400px;
  height: 150px;
  padding: 0px;
  margin: 0px;
  background-color: #ffffff;
}

.light-band-settings-panel .panel-wrap .panel-body .reminder-text {
  padding-left: 20px;
  font-size: 6px;
  font-weight: 600;
  padding-bottom: 5px;
}

.light-band-settings-panel .panel-wrap .panel-body .reminder-text-top {
  padding-left: 20px;
  font-size: 6px;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 5px;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls {
  width: 280px;
  height: 40px;
  padding-left: 60px;
  padding-top: 10px;
  margin: 0px;
  background-color: #ffffff;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls .temperatureLabel {
  padding-left: 20px;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector {
  position: relative;
  margin: 15px 20px 35px 20px;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div.imglabel {
  display: none;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div.imgdiv {
  position: absolute;
  height: auto;
  width: auto;
  top: 64px;
  left: 120px;
  border-width: 0px;
  margin-left: 10px;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div.imgdiv div.imgbtn {
  height: 25px;
  width: 25px;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector {
  background: #f5f5fa;
  width: 100%;
  height: 100px;
  z-index: 19;
  top: 65px;
  border-radius: 2px;
  left: 5px;
  border: solid 1px transparent;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector .temperSelector .selectorname {
  color: #96969b;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"] {
  background: transparent;
  height: 42px;
  -webkit-appearance: none;
  margin: 10px auto 0 auto;
  width: 94%;
  border: 0px !important;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector .numerInput.temperSelector {
  left: 5px;
  position: absolute;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]:focus {
  outline: none;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]:focus::-webkit-slider-runnable-track {
  background-image: url(${imageUrl1});
  background-size: 100% 100%;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]::-webkit-slider-runnable-track {
  width: 196px;
  height: 20px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background-image: url(${imageUrl1});
  background-size: 100% 100%;
  border-radius: 2px;
  border: 1px solid #d9dbdf;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]::-moz-range-track {
  width: 196px;
  height: 20px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background-image: url(${imageUrl1});
  background-size: 100% 100%;
  border-radius: 2px;
  border: 1px solid #d9dbdf;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]::-ms-track {
  width: 196px;
  height: 20px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]::-ms-fill-lower {
  background-image: url(${imageUrl1});
  background-size: 100% 100%;
  border: 1px solid #d9dbdf;
  border-radius: 4px;
  box-shadow: 0px 0px 0px #000000;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]::-ms-fill-upper {
  background-image: url(${imageUrl1});
  background-size: 100% 100%;
  border: 1px solid #d9dbdf;
  border-radius: 4px;
  box-shadow: 0px 0px 0px #000000;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]::-webkit-slider-thumb {
  height: 5px;
  width: 1px;
  background-image: url(${imageUrl2});
  cursor: pointer;
  -webkit-appearance: none;
  transform: translateY(6px) scale(7);
  background-repeat: no-repeat;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]::-moz-range-thumb {
  height: 34px;
  width: 7px;
  background-image: url(${imageUrl2});
  cursor: pointer;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]::-ms-thumb {
  margin-top: 1px;
  height: 34px;
  width: 7px;
  background-image: url(${imageUrl2});
  cursor: pointer;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]:focus::-ms-fill-lower {
  background: #3071a9;
}

.light-band-settings-panel .panel-wrap .panel-body .settings-controls div.imageselector div#temperSelector input[type="range"]:focus::-ms-fill-upper {
  background: #3071a9;
}

.light-band-settings-panel .panel-wrap .panel-body .numerInput {
  height: 45px;
  display: inline-block;
  line-height: 45px;
  min-width: 55px;
}

.light-band-settings-panel .panel-wrap .panel-body .numerInput .selectorname {
  font-size: 14px;
  color: #19191e;
  padding-left: 0;
  padding: 0 2px 0 0;
}

.light-band-settings-panel .panel-wrap .panel-body .numerInput .inputBox {
  margin-left: 20px;
  width: 40px;
  height: 22px;
  background: #fafafa;
  border: 1px solid #c3c3c3;
  border-radius: 2px;
  color: #343a40;
  text-indent: 4px;
  padding: 1px 0;
  font-size: 11px;
}

.light-band-settings-panel .panel-wrap .panel-body div.slider-item {
  margin-left: 20px;
  margin-bottom: 30px;
  margin-right: 20px;
}

.light-band-settings-panel .panel-wrap .panel-body div.slider-item .slider-name {
  font-size: 16px;
  color: #19191e;
  line-height: 22px;
  font-weight: 200;
  width: 90px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.light-band-settings-panel .panel-wrap .panel-bottom {
  height: 50px;
}

.light-band-settings-panel .panel-wrap .panel-bottom .resetbutton {
  width: 80px;
  height: 35px;
  margin-left: 200px;
  background: #4d9bd6;
  color: white;
  margin-top: 8px;
  border-radius: 3px;
  border: 1px solid #3085c4 !important;
}

.light-band-settings-panel .panel-wrap .panel-bottom .resetbutton:hover {
  background: #36a1f0 !important;
}

.light-band-settings-panel .panel-wrap .panel-bottom .confirmbutton {
  width: 80px;
  height: 35px;
  margin-left: 10px;
  margin-top: 8px;
  background: white;
  border-radius: 3px;
  border: 1px solid #d9dbdf;
}

.light-band-settings-panel .panel-wrap .panel-bottom .confirmbutton:hover {
  border: 1px solid #3085c4 !important;
}`;

export default cssContent;