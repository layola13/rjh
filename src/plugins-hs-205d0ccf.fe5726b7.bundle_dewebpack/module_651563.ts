const styles = `
.underlayimg-setting-wrapper {
    width: auto;
    height: 30px;
    cursor: pointer;
}

.underlayimg-setting-wrapper .underlayimg-setting-text {
    width: -moz-max-content;
    width: max-content;
    height: 20px;
    border-radius: 2px;
    margin: 5px 8px 0 2px;
    padding: 0 4px;
    position: relative;
}

.underlayimg-setting-wrapper .underlayimg-setting-text .underlayimg-setting-label {
    color: #33353B;
    font-size: 12px;
    font-weight: normal;
    line-height: 20px;
    text-align: center;
}

.underlayimg-setting-wrapper .underlayimg-setting-text .underlayimg-setting-arrow {
    position: absolute;
    right: -4px;
    bottom: 2px;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup {
    bottom: 37px;
    position: absolute;
    height: 180px;
    background: #fff;
    box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 14px 15px 12px;
    box-sizing: border-box;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-title {
    font-size: 14px;
    font-weight: 500;
    color: #33353B;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background {
    position: relative;
    width: 100%;
    margin-top: 18px;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .wall-opacity-label {
    font-size: 12px;
    color: #888888;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting {
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper {
    width: 130px;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper .slider-circle {
    border: 2px solid #327dff;
    width: 8px;
    height: 8px;
    box-shadow: none;
    top: -4px;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper .slider-circle::before {
    content: '';
    display: block;
    position: absolute;
    top: -4px;
    left: -4px;
    bottom: -4px;
    right: -4px;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index: 5;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .length-input-outer .length-input-wrapper .length-input .input-wrapper {
    margin: 0;
    width: 64px;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .length-input-outer .length-input-wrapper .length-input .input-wrapper .input {
    width: 40px;
    border-right: none;
    color: #343A40;
    border-radius: 4px 0 0 4px;
    border-color: #C3C6D1;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group {
    margin: 0;
    width: 24px;
    background: #fff;
    border-color: #C3C6D1;
    border-radius: 0 4px 4px 0;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group .arrow-up-wrapper {
    border-bottom: none;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group.focus-input {
    background: rgba(50, 125, 255, 0.1);
    border-color: #C3C6D1;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .length-input-outer .length-input-wrapper .length-input .input-wrapper .unit {
    width: 24px;
    background-color: #fff;
    font-weight: 300;
    border-radius: 0 4px 4px 0;
    color: #33353B;
    border-color: #C3C6D1;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .length-input-outer .length-input-wrapper .length-input .input-wrapper .unit.focus-input {
    background: rgba(50, 125, 255, 0.1);
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .wall-opacity-background .bottom-bar-wall-opacity-setting .length-input-outer .length-input-wrapper .length-input .input-wrapper.disabled .unit {
    background-color: #F0F0F5;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-action {
    display: flex;
    align-items: center;
    height: 40px;
    margin: 17px 0 0 -10px;
    justify-content: space-evenly;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-part {
    position: relative;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-part .underlayimg-check-box .checkbtn {
    width: 12px;
    height: 12px;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-part .underlayimg-check-box .checkbtn::after {
    width: 4px;
    height: 7px;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-part .underlayimg-check-box .inputlabel {
    color: #888888;
    margin-left: 6px;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-check-box {
    position: relative;
    padding: 0px;
    line-height: 0;
    height: 12px;
    display: inline-block;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-check-box .inputlabel {
    font-size: 12px;
    font-weight: normal;
    color: #19191e;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-button-label {
    flex: 1;
    min-width: unset;
    height: 36px;
    font-size: 13px;
    box-sizing: border-box;
    margin-left: 11px;
    font-weight: bold;
}

.underlayimg-setting-wrapper .underlayimg-setting-popup .underlayimg-button-label:hover {
    background: #396efe;
    color: #fff;
}

.global-en .underlayimg-setting-wrapper .underlayimg-setting-text:hover {
    font-weight: normal;
}

.global-en .underlayimg-setting-wrapper .underlayimg-setting-triangle {
    margin-left: 123px;
}

.underlayimg-popup-container {
    z-index: 3000;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 0;
    left: 0;
}
`;

interface CSSLoaderModule {
  (sourceMap: boolean): Array<[string, string]>;
}

interface ModuleExports {
  id: string;
  exports: {
    push: (entry: [string, string]) => void;
  };
}

export default function (
  moduleExports: ModuleExports,
  _t: unknown,
  require: (id: number) => CSSLoaderModule
): void {
  const cssLoader = require(986380);
  moduleExports.exports = cssLoader(false);
  moduleExports.exports.push([moduleExports.id, styles]);
}