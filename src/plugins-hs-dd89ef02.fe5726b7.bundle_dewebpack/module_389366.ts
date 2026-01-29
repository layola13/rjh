interface CSSModule {
  push: (content: [string, string]) => void;
}

interface CSSLoaderFunction {
  (sourceMap: boolean): CSSModule;
}

interface WebpackModule {
  id: string;
  exports: CSSModule;
}

const cssContent = `.match-layer-dialog-wrapper .match-layer-dialog-overLay {
            
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
.match-layer-dialog-wrapper .match-layer-dialog-main {
        
 background-color: #FFF;
        
 color: #000;
        
 width: 900px;
        
 height: 550px;
        
 z-index: 1140;
        
 top: 50%;
        
 left: 50%;
        
 position: absolute;
        
 transform: translate(-50%, -50%);
        
 box-sizing: content-box;
        
 display: flex;
        
 justify-content: start;
        
 border-radius: 10px;
        
 flex-direction: column;
        

    }
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-head {
    
 width: 100%;
    
 border-radius: 10px;
    
 display: flex;
    
 align-items: center;
    
 justify-content: space-between;
    
 padding: 28px 36px 10px 40px;
    
 box-sizing: border-box;
    
 background-image: linear-gradient(#FFF, #FDFDFD);
    

}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-head .match-layer-dialog-title {

 font-family: 'AlibabaPuHuiTi-Bold', sans-serif !important;

 font-size: 20px;

 color: #33353B;

 height: 24px;

 line-height: 24px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content {

 width: 100%;

 background-color: #FDFDFD;

 border-radius: 10px;

 position: relative;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content.disabled {

 filter: grayscale(1);


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header {

 padding: 0 40px 0 40px;

 display: flex;

 justify-content: space-between;

 align-items: center;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select {

 width: 330px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select .select-layer {

 display: inline-flex;

 justify-content: space-between;

 align-items: center;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select .select-layer > span {

 font-size: 14px;

 min-width: 78px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select .select-layer.lowest {

 margin-bottom: 5px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select .select-layer .select {

 width: 100px;

 height: 24px;

 margin-left: 8px;

 margin-right: 20px;

 display: flex;

 align-items: center;

 justify-content: center;

 background-color: white;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select .select-layer .select.disabled-cursor .hs-iconfont-view {

 cursor: not-allowed !important;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select .select-layer .select .tp-select-container-value {

 align-content: center;

 font-size: 12px;

 letter-spacing: 0;

 font-weight: 400;

 padding-left: 5px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select .select-layer .select .tp-select-downicon {

 top: 6px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-layer-select .select-layer .select .select-dropdown .single {

 min-height: 36px;

 font-size: 14px;

 padding: 0 0 0 10px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-validator {

 display: flex;

 line-height: 1.4;

 align-items: center;

 justify-content: center;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-validator .validator-col {

 display: flex;

 flex-direction: column;

 align-items: start;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-validator .validator-icon {

 width: 16px;

 height: 16px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-validator span {

 font-size: 12px;

 color: #60646F;

 line-height: 12px;

 font-weight: 400;

 margin-left: 4px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-validator .indicator {

 margin-left: 20px;

 margin: 0 20px 8px 0;

 display: flex;

 align-items: center;

 justify-content: center;

 height: 20px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-validator .indicator-default img {

 background-color: #D1D1D1;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-validator .indicator-valid img {

 background-color: #48CAB3;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-header .match-layer-validator .indicator-invalid img {

 border-radius: unset;

 width: 14px;

 height: 14px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .hint {

 padding: 10px 0 5px 40px;

 font-size: 12px;

 color: rgba(51, 53, 59, 0.5);

 line-height: 12px;

 font-weight: 400;

 height: 12px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-scrollbar {

 height: 315px;

 width: 880px;

 padding: 0 0 0 40px;

 display: flex;

 align-content: flex-start;

 flex-wrap: wrap;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-content .match-layer-content-footer {

 margin: 40px 80px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom {

 height: 75px;

 width: 900px;

 border-radius: 0 0 10px 10px;

 box-sizing: border-box;

 display: flex;

 flex-direction: row-reverse;

 position: absolute;

 bottom: 0;

 padding: 0 33px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .match-layer-dialog-button {

 min-width: 146px;

 height: 42px;

 background: #F2F2F2;

 border-radius: 21px;

 margin-top: 21px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .match-layer-dialog-button span {

 font-size: 16px;

 font-family: 'AlibabaPuHuiTi-Bold', sans-serif !important;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .match-layer-dialog-button-save {

 color: #FFF;

 background: #396EFE;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .match-layer-dialog-button-save:hover {

 color: #F2F2F2;

 background: #305DD7;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .match-layer-dialog-button-cancel {

 margin-right: 12px;

 color: #000;

 background: #F2F2F2;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .match-layer-dialog-button-cancel:hover {

 color: #396EFE;

 background: #E9E9E9;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .ant-btn-primary[disabled] {

 background-color: #C4D2FF;

 opacity: 1;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership {

 width: 100%;

 height: 60px;

 display: flex;

 align-items: center;

 color: #60646F;

 box-sizing: border-box;

 background: #1C1C1C;

 border-radius: 8px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .left {

 display: inline-block;

 width: 470px;

 font-size: 14px;

 color: white;

 margin-left: 19px;

 margin-right: 26px;

 line-height: 1.3;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .upgrade {

 display: inline-block;

 width: 308px;

 line-height: 38px;

 border-radius: 4px;

 background-color: linear;

 background: linear-gradient(to right, #0b51ff, #e318b4);

 padding: 0 9px;

 box-sizing: border-box;

 display: flex;

 align-items: center;

 color: white;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .upgrade .crown-4-upgrade {

 display: inline-flex;

 width: 18px;

 height: 18px;

 margin-right: 2px;

 margin-top: -3px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .upgrade .desc {

 font-size: 14px;

 color: white;

 font-weight: bold;

 margin-left: 3px;


}
.match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .upgrade .upgrade-btn {

 background: white;

 line-height: 22px;

 display: inline-block;

 border-radius: 11px;

 padding: 0 11px;

 color: #C633BF;

 margin-left: auto;

 cursor: pointer;


}
.match-layer-dialog-wrapper .match-layer-matching-card {

 width: 260px;

 height: 220px;

 display: flex;

 align-items: center;

 flex-direction: column;

 background: #F0F2F5;

 border-radius: 6px;

 margin: 0 20px 20px 0;

 border: 3px solid transparent;


}
.match-layer-dialog-wrapper .match-layer-matching-card-selected {

 border: 3px solid #396efe;

 transition: border 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select {

 display: flex;

 align-items: center;

 justify-content: space-between;

 margin: 8px 12px;

 width: 236px;


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .checkbox {

 display: flex;

 align-items: center;

 margin: 0;


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .checkbox span.check-box {

 width: 18px;

 height: 18px;

 margin: 0 6px 0 0;


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .checkbox span.check-box:not(.checked) {

 background-color: #fff;


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .checkbox .filename {

 width: 104px;

 height: 13px;

 font-size: 12px;

 color: #33353B;

 line-height: 12px;

 font-weight: 400;


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .checkbox .floor-plan-name {

 display: block;

 margin-top: 2px;

 height: 12px;

 font-size: 11px;

 color: #60646F;

 line-height: 12px;

 font-weight: 400;


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .select {

 background-color: white;

 width: 100px;


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .select .select-dropdown .single {

 padding: 0 0 0 5px;


}
.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .select:focus, 

.match-layer-dialog-wrapper .match-layer-matching-card .matching-select .select:hover {

 border: 1px solid rgba(57, 110, 254, 0.8);

 background-color: #ecf1ff;


}
.match-layer-dialog-wrapper .match-layer-matching-card .floor-thumbnail {

 width: 236px;

 height: 165px;


}
.match-layer-dialog-wrapper .match-layer-matching-card:nth-last-child(4) {

 margin-bottom: 100px;


}
.match-layer-dialog-wrapper .ant-image-preview-mask {

 z-index: 1150;


}
.match-layer-dialog-wrapper .ant-image-preview-wrap {

 z-index: 1160;


}
.homestyler-smart-text-popover-container .homestyler-smart-text-popover {

 font-family: 'AlibabaPuHuiTi', sans-serif !important;


}
.global-en .match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .left {

 color: #FFDDA9;


}
.global-en .match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .upgrade {

 background: linear-gradient(to right, #FEDE9D, #89aef8);

 color: black;


}
.global-en .match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .upgrade .desc {

 color: #33353b;


}
.global-en .match-layer-dialog-wrapper .match-layer-dialog-main .match-layer-dialog-bottom .none-membership .upgrade-btn {

 background: #1C1C1C;

 color: white;


}
`;

export function initializeStyleModule(
  module: WebpackModule,
  cssLoader: CSSLoaderFunction
): void {
  const cssModule = cssLoader(false);
  module.exports = cssModule;
  cssModule.push([module.id, cssContent]);
}