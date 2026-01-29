const cssContent = `.hide {
    display: none !important;
}
.layersettingdialog {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: visible;
    top: 0;
    left: 0;
    z-index: 1130;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
}
.layersettingdialog .modal {
    background-color: #ffffff;
    color: #000;
    width: 900px;
    height: 550px;
    z-index: 100;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    flex-direction: column;
}
.layersettingdialog .modal .cad-setting-dialog-head {
    flex-grow: 0;
    flex-shrink: 0;
    width: 100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 40px 22px 30px;
    box-sizing: border-box;
    background-color: #ffffff;
    padding-bottom: 0px;
}
.layersettingdialog .modal .cad-setting-dialog-head .cad-setting-dialog-title {
    font-family: 'AlibabaPuHuiTi-Bold' !important;
    font-size: 20px;
    color: #33353B;
    height: 60px;
    line-height: 60px;
}
.layersettingdialog .modal .cad-setting-dialog-head .cad-setting-dialog-title .hover-icon-bg {
    line-height: 0;
    text-align: center;
    display: table;
}
.layersettingdialog .modal .cad-setting-dialog-content {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    height: auto;
    padding-left: 40px;
    padding-right: 40px;
    box-sizing: border-box;
    max-height: calc(100% - 150px);
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    background: #f4f4f4;
    padding-left: 2px;
    padding-right: 2px;
    height: 40px;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid #eaecf1;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item {
    height: 35px;
    width: auto;
    min-width: 70px;
    cursor: pointer;
    border: none;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item .common-tab-bg {
    background: #ffffff;
    height: 100%;
    display: flex;
    align-items: center;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item .c-s-t-i-txt {
    height: 20px;
    line-height: 20px;
    display: flex;
    border-right: 1px solid #e1e1e1;
    text-align: center;
    padding-right: 12px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item .c-s-t-i-txt .txt {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 12px;
    width: auto;
    flex-grow: 1;
    flex-shrink: 0;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item .c-s-t-i-txt .txt .icon-add {
    margin-right: 2px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item .c-s-t-i-txt .icon-close {
    display: flex;
    color: #969696;
    width: 18px;
    text-align: left;
    cursor: pointer;
    margin-right: 4px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item .c-s-t-i-txt .icon-close:hover {
    color: #363636;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item-active {
    border: 1px solid #eaecf1;
    border-bottom: 2px solid white;
    border-radius: 6px 6px 0 0;
    position: relative;
    bottom: -1px;
    background: #ffffff;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item-active .c-s-t-i-txt {
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    border-right: none !important;
    height: inherit;
    border-radius: 6px 6px 0 0;
    padding-right: 0;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item-active .c-s-t-i-txt .txt {
    width: auto;
    flex-grow: 1;
    flex-shrink: 0;
    font-weight: bold;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-common {
    width: 86px !important;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-item-noset {
    background: #f4f4f4;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-havenoset {
    cursor: not-allowed;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-havenoset .hoverTip {
    position: absolute;
    top: -40px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
    border-radius: 8px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-havenoset .hoverTip .ht-content {
    padding: 4px 8px;
    width: auto;
    min-width: 112px;
    white-space: nowrap;
    text-align: center;
    height: 24px;
    line-height: 24px;
    border-radius: 6px;
    font-weight: 300;
    font-size: 12px;
    color: #3f3f3f;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-havenoset .hoverTip .ht-triangle {
    position: absolute;
    top: 24px;
    left: calc(50% - 15px);
    border: 1px solid white;
    height: 0;
    width: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
    border-bottom: transparent;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .blue_hover {
    width: 110px !important;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .cad-setting-tab-havenoset {
    width: 110px !important;
    color: #cdcdcd !important;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .blue_hover:hover {
    color: #4175f8;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .without-spline {
    border-right: none !important;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .without-spline .c-s-t-i-txt {
    border-right: none !important;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-tab .nodisplay {
    display: none !important;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    height: calc(100% - 42px);
    max-height: calc(100% - 42px);
    justify-content: flex-start;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview {
    flex-shrink: 0;
    flex-grow: 0;
    height: 100%;
    width: 230px;
    padding-right: 20px;
    margin-top: 21px;
    box-sizing: border-box;
    border-right: 1px solid #f3f3f3;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview .cscp-select {
    height: 36px;
    line-height: 36px;
    margin-bottom: 21px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview .cscp-select .select {
    height: 36px;
    line-height: 36px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview .cscp-select .select .tp-select-container {
    height: 36px;
    line-height: 36px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview .cscp-select .select .tp-select-container-value {
    height: 36px;
    font-size: 14px;
    line-height: 36px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview .cscp-select .select .tp-select-downicon {
    height: 36px;
    line-height: 36px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview .cscp-select .select .select-dropdown {
    transform: translate(0px, 12px) !important;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview .cscp-select .select .select-dropdown .single {
    min-height: 36px;
    font-size: 14px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-preview .img_preview {
    width: 200px;
    height: 140px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-detailarea {
    flex-shrink: 0;
    flex-grow: 1;
    height: auto;
    width: auto;
    margin-top: 21px;
    display: flex;
    flex-direction: column;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-detailarea .cad-setting-content-commonnotice {
    height: 24px;
    width: 100%;
    padding-left: 16px;
    color: gray;
    flex-shrink: 0;
    flex-grow: 0;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .cad-setting-content-detailarea .cad-setting-content-detail {
    height: 340px;
    width: auto;
    padding: 0 20px;
}
.layersettingdialog .modal .cad-setting-dialog-content .cad-setting-content .noclick {
    pointer-events: none;
    cursor: default;
    filter: opacity(0.5);
}
.layersettingdialog .modal .cad-setting-dialog-bottom {
    flex-grow: 0;
    flex-shrink: 0;
    height: 70px;
    width: 100%;
    padding: 22px 40px 10px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
.layersettingdialog .modal .cad-setting-dialog-bottom .btn-cad-setting-cancel {
    color: black;
    background: #f1f1f1;
    width: auto;
    height: 36px;
    font-family: AlibabaPuHuiTi-Bold, sans-serif !important;
    font-size: 16px;
    font-weight: 400;
    min-width: 100px;
    padding: 0 12px;
    line-height: 36px;
    text-shadow: none;
    border-radius: 36px;
    border: none;
    margin-right: 20px;
}
.layersettingdialog .modal .cad-setting-dialog-bottom .btn-cad-setting-create {
    color: #FFF;
    background: #396EFE;
    width: 100px;
    height: 36px;
    font-family: AlibabaPuHuiTi-Bold, sans-serif !important;
    font-size: 16px;
    font-weight: 400;
    min-width: 100px;
    padding: 0 12px;
    line-height: 36px;
    text-shadow: none;
    border-radius: 36px;
    border: none;
}`;

interface CSSModule {
    push(content: [string, string]): void;
}

interface ModuleExports {
    id: string;
}

interface CSSLoaderFunction {
    (shouldSourceMap: boolean): CSSModule;
}

export function initializeCSSModule(
    moduleExports: ModuleExports,
    require: (id: number) => CSSLoaderFunction
): void {
    const cssLoader = require(986380);
    const cssModule = cssLoader(false);
    cssModule.push([moduleExports.id, cssContent]);
}