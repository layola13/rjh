const cssContent = `.pageHeader .hs-privacy {
            
 align-items: normal;
            

        }
.hs-privacy {
        
 box-sizing: content-box;
        
 display: flex;
        
 align-items: center;
        
 position: relative;
        
 height: 100%;
        

    }
.hs-privacy.darkTheme {
    
 color: #FFFFFF;
    

}
.hs-privacy .privacy {

 box-sizing: content-box;

 display: flex;

 align-items: center;

 height: 100%;

 float: left;

 position: relative;

 height: 24px;

 padding: 13px 0;

 margin-left: 8px;


}
.hs-privacy .privacy .menu {

 box-sizing: content-box;

 max-width: 170px;

 height: 24px;

 text-decoration: none;

 font-size: 12px;

 padding: 0;

 display: inline-flex;

 align-items: center;

 justify-content: flex-start;

 cursor: pointer;

 position: relative;

 border-radius: 24px;

 padding: 0 8px;


}
.hs-privacy .privacy .menu .hs-iconfont-view {

 display: inline-flex;


}
.hs-privacy .privacy .menu.hoverMenu {

 background: rgba(255, 255, 255, 0.9);

 font-family: PingFangSC-Regular !important;

 color: #396efe;


}
.hs-privacy .privacy .menu.hoverMenu.darkTheme {

 color: #FFFFFF;

 background-color: #3d3e40;


}
.hs-privacy .privacy .menu.hoverMenu ul {

 display: block;


}
.hs-privacy .privacy .menu.darkTheme:hover {

 background-color: #3d3e40;


}
.hs-privacy .privacy .menu:hover {

 background: rgba(255, 255, 255, 0.9);


}
.hs-privacy .privacy .menu .menu-name {

 box-sizing: content-box;

 max-width: 89px;

 display: inline-block;

 padding: 0px 5px;

 overflow: hidden;

 text-overflow: ellipsis;

 white-space: nowrap;

 vertical-align: middle;

 min-width: 20px;


}
.hs-privacy .privacy .menu .popup-arrow {

 font-Size: 8px;


}
.hs-privacy .privacy .menus {

 box-sizing: content-box;

 left: 0px;

 top: 45px;

 display: none;

 float: none;

 min-width: 283px;

 height: auto;

 position: absolute;

 border: 1px solid #d9dbdf;

 background: #ffffff;

 box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);

 border-radius: 10px;


}
.hs-privacy .privacy .menus.right {

 left: auto;

 right: 0px;


}
.hs-privacy .privacy .menus.darkTheme {

 background-color: #2B2C2E;

 border-color: #3f3f3f;


}
.hs-privacy .privacy .menus.ul-content {

 display: block;


}
.hs-privacy .privacy .menus .privacy-checkbox {

 margin: 12px 12px;


}
.hs-privacy .privacy .menus .privacy-checkbox .ant-radio-group .ant-radio-wrapper {

 margin-right: 30px;


}
.hs-privacy .privacy .menus .privacy-checkbox .ant-radio-group .ant-radio-wrapper .ant-radio .ant-radio-inner {

 width: 14px;

 height: 14px;


}
.hs-privacy .privacy .menus .privacy-checkbox .ant-radio-group .ant-radio-wrapper .ant-radio .ant-radio-inner::after {

 top: 2px;

 left: 2px;


}
.hs-privacy .privacy .menus .privacy-checkbox .ant-radio-group .ant-radio-wrapper > span {

 font-family: PingFangSC-Regular !important;

 color: #33353b;

 font-size: 12px;


}
.hs-privacy .privacy .menus li:hover {

 background: #38a0ef;

 color: #fff;


}
.hs-privacy .privacy .menus.disable li:hover {

 background: #fafafa;

 color: #b4b4b9;


}
.public-buttons {

 display: flex;

 width: 100%;

 font-size: 12px;


}
.public-buttons .public-button {

 flex: 1;

 overflow: hidden;

 display: flex;

 align-items: center;

 background-color: #fff;

 border: 1px solid rgba(151, 151, 151, 0.34);

 border-radius: 6px;

 padding: 5px 6px;

 cursor: pointer;

 color: #33353B;

 position: relative;


}
.public-buttons .public-button:not(:last-child) {

 margin-right: 8px;


}
.public-buttons .public-button .shanshuo {

 box-sizing: content-box;

 width: 4px;

 height: 4px;

 border-radius: 2px;

 background-color: #37DFBA;

 animation: blink 1.5s infinite;

 margin-right: 8px;

 flex: none;


}
.public-buttons .public-button .button-text {

 margin-right: 4px;

 flex: auto;

 white-space: wrap;

 font-size: 12px;

 line-height: 1;

 overflow-wrap: break-word;

 word-break: break-all;


}
.public-buttons .public-button:hover {

 color: #396EFE;


}
.public-buttons .public-button.disabled {

 pointer-events: none;

 background: #E5E8EB;

 border: 1px solid #d9dbde;

 color: #AEB1B6;


}
.public-buttons .public-button.disabled .shanshuo {

 background-color: #AEB1B6;

 animation: none;


}
.public-buttons .public-button .public-share-page-btn-loading-wrapper {

 position: absolute;

 left: 50%;

 top: 50%;

 transform: translate(-50%, -50%);


}
.public-buttons .public-button .public-share-page-btn-loading-wrapper .public-share-page-btn-loading {

 animation: rotateit 1s ease-in-out infinite;


}
.privacy-checkbox-item {

 line-height: 16px;

 background: #F0F2F5;

 border-radius: 6px;

 padding: 0px 0px;

 margin-bottom: 8px;


}
.privacy-checkbox-item.darkTheme {

 background-color: #3d3e40;


}
.privacy-checkbox-item.darkTheme .radio-container {

 color: #FFFFFF;


}
.privacy-checkbox-item.darkTheme .radio-container .radio {

 background-color: #FFFFFF;


}
.privacy-checkbox-item.public-item {

 padding-bottom: 0;


}
.privacy-checkbox-item.public-item .description {

 margin-bottom: 8px;


}
.privacy-checkbox-item.public-item .radio-container {

 padding-bottom: 6px;


}
.privacy-checkbox-item > *:last-child {

 margin-bottom: 0;


}
.privacy-checkbox-item .radio-container {

 box-sizing: content-box;

 width: 100%;

 height: 100%;

 padding: 12px 0px 12px 5px;

 font-size: 14px;

 font-family: AlibabaPuHuiTi-Bold !important;

 color: #33353B;


}
.privacy-checkbox-item .radio-container .radio {

 margin-left: 0;


}
.privacy-checkbox-item .radio-container > span {

 font-family: AlibabaPuHuiTi-Bold !important;

 font-size: 14px;


}
.privacy-checkbox-item .description {

 font-family: PingFangSC-Regular;

 color: #9B9FAB;

 font-size: 12px;

 line-height: 1;

 margin-left: 28px;


}
.privacy-checkbox-item .privacy-checkbox-item-submit {

 position: relative;

 color: #33353B;

 font-size: 12px;

 font-family: PingFangSC-Regular !important;


}
.privacy-checkbox-item .privacy-checkbox-item-submit.darkTheme {

 color: #FFFFFF;


}
.privacy-checkbox-item .privacy-checkbox-item-submit.darkTheme::after {

 border-top-color: #535457;


}
.privacy-checkbox-item .privacy-checkbox-item-submit::after {

 position: absolute;

 top: 0;

 left: 10px;

 right: 10px;

 content: '';

 border-top: 1px solid #dbdde3;


}
.privacy-checkbox-item .privacy-checkbox-item-submit .privacy-checkbox-item-submit-item {

 box-sizing: border-box;

 min-height: 36px;

 padding: 8px 0 8px 28px;

 display: flex;

 align-items: center;

 cursor: pointer;


}
.privacy-checkbox-item .privacy-checkbox-item-submit .privacy-checkbox-item-submit-item.darkTheme:hover {

 background-color: #444547;


}
.privacy-checkbox-item .privacy-checkbox-item-submit .privacy-checkbox-item-submit-item:hover {

 background-color: #E7E9EC;


}
.privacy-checkbox-item .privacy-checkbox-item-submit .privacy-checkbox-item-submit-item .publish-to-community {

 display: flex;

 align-items: center;


}
.privacy-checkbox-item .privacy-checkbox-item-submit .privacy-checkbox-item-submit-item .publish-to-community .publish-to-community-text {

 white-space: nowrap;


}
.privacy-checkbox-item .privacy-checkbox-item-submit .privacy-checkbox-item-submit-item .publish-to-community .publish-to-community-title {

 margin-left: 4px;

 margin-right: 4px;

 padding: 4px 6px 4px 6px;

 background: linear-gradient(to right, #FF960C, #FE5D05);

 border-top-left-radius: 12px;

 border-bottom-left-radius: 2px;

 border-top-right-radius: 10px;

 border-bottom-right-radius: 10px;

 color: #fff;

 font-size: 12px;

 line-height: 12px;

 font-family: AlibabaPuHuiTi-Bold !important;

 white-space: nowrap;


}
.privacy-checkbox-item .privacy-checkbox-item-submit .privacy-checkbox-item-submit-item .publish-to-community .publish-to-community-title::first-letter {

 margin-right: 1px;


}
.share-loading-content {

 display: flex;

 flex-direction: column;

 justify-content: center;

 align-items: center;

 height: 236px;


}
.share-loading-content .loading-img-wrapper {

 width: 110px;

 height: 138px;

 position: relative;


}
.share-loading-content .loading-img-wrapper .share-loading-img {

 width: 110px;

 height: 138px;


}
.share-loading-content .loading-img-wrapper .loading-text {

 position: absolute;

 bottom: 2px;

 left: 50%;

 transform: translate(-50%);

 color: #33353B;

 white-space: nowrap;


}
.share-viewer {

 display: flex;

 justify-content: center;

 align-items: center;

 height: 236px;


}
.share-viewer .share-viewer-img {

 width: 460px;

 height: 236px;


}
@keyframes blink {

 0% {
    
 opacity: 1;
    

}
 50% {

 opacity: 0;


}
 100% {

 opacity: 1;


}


}
.share-loading-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-outer .homestyler-modal-bottom-container {

 flex-wrap: wrap;

 margin-bottom: -8px;


}
.share-loading-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-outer .homestyler-modal-bottom-container > * {

 margin-left: 12px;

 margin-bottom: 11px;


}
.share-loading-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-outer .homestyler-modal-bottom-container > *:first-child {

 margin-right: 0;


}
.privacy .share-tips {

 margin: 0 14px 14px 14px;

 font-size: 12px;

 line-height: 1;

 color: #9B9FAB;


}
`;

interface CSSLoaderExports {
    push(data: [string, string]): void;
}

interface ModuleExports {
    id: string;
}

export default function (exports: ModuleExports, cssLoaderFactory: (useSourceMap: boolean) => CSSLoaderExports): void {
    const cssLoader = cssLoaderFactory(false);
    cssLoader.push([exports.id, cssContent]);
}