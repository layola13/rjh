interface CSSExports {
  push(item: [string, string, string]): void;
}

interface WebpackModule {
  id: string;
  exports: CSSExports;
}

interface ImageResolver {
  (path: string): string;
}

const CSS_CONTENT = `.hs-popover-item {
            
 position: absolute;
            
 top: 0;
            
 left: 0;
            
 margin: 0;
            
 background: #FFFFFF;
            
 display: none;
            
 font-family: 'Helvetica / Source Han Sans / PingFang SC / Microsoft YaHei / Heiti SC / "sans-serif"';
            
 z-index: 5000;
            
 border-radius: 4px;
            

        }
.hs-popover-item .tooltip-title {
        
 background-color: #fff;
        
 color: #fff;
        

    }
.hs-popover-item.hs-active {
    
 display: block !important;
    
 opacity: 1;
    

}
.hs-popover-context {

 position: relative;

 color: #19191E;

 padding: 8px;

 z-index: 110;

 font-weight: 200;

 font-size: 12px;

 border-radius: 4px;


}
.hs-popover-dot {

 display: inline-block;

 width: 6px;

 height: 6px;

 margin-right: 8px;

 border-radius: 50%;

 background-color: #396EFE;

 transform: translateY(-1px);


}
.hs-popover-remove {

 display: inline-flex;

 position: relative;

 width: 10px;

 height: 10px;

 margin-left: 16px;

 cursor: pointer;


}
.hs-popover-heavy {

 position: absolute;

 top: 0;

 left: 0;

 margin: 0;

 background: #FFFFFF;

 display: none;

 z-index: 1150;

 border-radius: 4px;

 width: 240px;


}
.hs-popover-heavy.hs-active {

 display: block !important;

 opacity: 1;


}
.hs-popover-heavy.camera-position {

 width: 200px;

 box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);


}
.hs-popover-heavy.camera-position .hs-popover-button-container {

 margin: 10px 0;


}
.hs-popover-context-heavy {

 position: relative;

 color: #19191E;

 padding: 10px;

 z-index: 110;

 font-weight: 200;

 font-size: 12px;

 font-family: 'Helvetica / Source Han Sans / PingFang SC / Microsoft YaHei / Heiti SC / "sans-serif"';


}
.hs-popover-context-heavy .hs-popover-text {

 padding: 10px;

 text-align: justify;

 line-height: 20px;


}
.hs-popover-context-heavy .hs-popover-image {

 width: 100%;


}
.hs-popover-context-heavy .hs-popover-video {

 width: 100%;


}
.hs-popover-context-heavy .hs-popover-video video {

 width: 100%;


}
.hs-popover-context-heavy .hs-popover-bottom {

 height: 20px;

 padding-bottom: 10px;


}
.hs-popover-context-heavy .hs-popover-bottom .hs-popover-link {

 float: left;

 padding: 4px 8px;


}
.hs-popover-context-heavy .hs-popover-bottom .hs-popover-link img {

 width: 30px;


}
.hs-popover-context-heavy .hs-popover-bottom .hs-popover-link span {

 color: #19191E;


}
.hs-popover-context-heavy .hs-popover-bottom .hs-popover-link span:hover {

 font-weight: 600;


}
.hs-popover-context-heavy .hs-popover-bottom .hs-popover-link a {

 text-decoration: none;


}
.hs-popover-context-heavy .hs-popover-bottom .hs-popover-btn {

 color: #4d9bd6;

 float: right;


}
.hs-popover-caret {

 position: absolute;

 top: 0;

 z-index: 100;

 display: inline-block;

 width: 0;

 height: 0;

 vertical-align: middle;

 border-bottom: 5px solid #FFFFFF;

 border-right: 5px solid transparent;

 border-left: 5px solid transparent;

 border-top: 0 dotted;

 transform: rotate(360deg);

 overflow: hidden;

 /*new direction*/

 /*top*/

 /*bottom*/

 /*left*/

 /*right*/

 /*end*/


}
.hs-popover-top .hs-popover-caret {

 top: auto;

 bottom: -5px;

 transform: rotate(180deg);


}
.hs-popover-bottom .hs-popover-caret {

 top: -5px;


}
.hs-popover-top .hs-popover-caret, 
.hs-popover-bottom .hs-popover-caret {

 left: 50%;

 margin-left: -5px;


}
.hs-popover-left .hs-popover-caret {

 top: auto;

 left: auto;

 right: -7px;

 transform: rotate(90deg);


}
.hs-popover-right .hs-popover-caret {

 right: auto;

 left: -7px;

 transform: rotate(-90deg);


}
.hs-popover-left .hs-popover-caret, 
.hs-popover-right .hs-popover-caret {

 top: 50%;

 margin-top: -2.5px;


}
.hs-popover-topR .hs-popover-caret {

 left: 80%;

 margin-top: -2.5px;


}
.hs-popover-topL .hs-popover-caret {

 left: 20%;

 margin-top: -2.5px;


}
.hs-popover-topR .hs-popover-caret, 
.hs-popover-topL .hs-popover-caret {

 top: auto;

 bottom: -5px;

 transform: rotate(180deg);


}
.hs-popover-bottomR .hs-popover-caret {

 left: 80%;


}
.hs-popover-bottomL .hs-popover-caret {

 left: 20%;


}
.hs-popover-bottomR .hs-popover-caret, 
.hs-popover-bottomL .hs-popover-caret {

 top: -5px;


}
.hs-popover-leftT .hs-popover-caret {

 top: 20%;


}
.hs-popover-leftB .hs-popover-caret {

 top: 80%;


}
.hs-popover-leftT .hs-popover-caret, 
.hs-popover-leftB .hs-popover-caret {

 left: auto;

 right: -7px;

 transform: rotate(90deg);


}
.hs-popover-rightT .hs-popover-caret {

 top: 20%;


}
.hs-popover-rightB .hs-popover-caret {

 top: 80%;


}
.hs-popover-rightT .hs-popover-caret, 
.hs-popover-rightB .hs-popover-caret {

 right: auto;

 left: -7px;

 transform: rotate(-90deg);


}
.hs-popover-caret .popover-color-light {

 border-color: #FFFFFF;


}
.hs-popover-caret .popover-color-light .hs-popover-inner {

 background: #FFFFFF;


}
.hs-popover-caret .popover-color-light .hs-popover-caret {

 border-bottom-color: #FFFFFF;


}
.hs-popover-caret .popover-color-dark {

 border-color: #666666;


}
.hs-popover-caret .popover-color-dark .hs-popover-inner {

 background: #666666;


}
.hs-popover-caret .popover-color-dark .hs-popover-caret {

 border-bottom-color: #666666;


}
.hs-popover-item.hs-popover-darkly {

 background: #575765;

 box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);

 border-radius: 2px;


}
.hs-popover-item.hs-popover-darkly .hs-popover-context {

 color: #ffffff;


}
.hs-popover-item.hs-popover-darkly .hs-popover-caret {

 border-bottom: 5px solid #575765;


}
.hs-popover-button-container {

 display: flex;

 flex-direction: row-reverse;


}
.hs-popover-button-container .hs-popover-button {

 border: 0.5px solid transparent;

 width: 60px;

 height: 26px;

 margin: 0 10px;

 border-radius: 2px;

 font-size: 12px;

 line-height: 26px;

 text-align: center;

 cursor: pointer;


}
.hs-popover-button-container .hs-popover-ok-button {

 color: white;

 background: linear-gradient(to right, #327DFF, #4B96FF);


}
.hs-popover-button-container .hs-popover-ok-button:hover {

 color: white;

 background: #1963E0;


}
.hs-popover-button-container .hs-popover-cancel-button {

 color: #19191E;

 background-color: transparent;

 border-color: #DCDCE1;


}
.hs-popover-button-container .hs-popover-cancel-button:hover {

 color: #327DFF;

 border-color: #327DFF;


}
.remove-box-shadow {

 box-shadow: none;


}
.cabinet-style-delete-confirm .hs-popover-context-heavy {

 font-size: 14px;


}
.cabinet-style-delete-confirm .hs-popover-button-container .hs-popover-button {

 font-weight: 400;


}
.global-en .hs-popover-context-heavy .hs-popover-text {

 text-align: unset;


}
`;

export function loadPopoverStyles(
  moduleExports: WebpackModule,
  imageResolver: ImageResolver,
  cssLoaderFactory: (sourceMaps: boolean) => CSSExports
): void {
  const iconImagePath = imageResolver('/path/to/icon/756228');
  const cssWithImage = CSS_CONTENT.replace(
    '.hs-popover-remove {',
    `.hs-popover-remove {
 background: url(${iconImagePath}) center / 10px no-repeat;`
  );
  
  const cssExports = cssLoaderFactory(false);
  cssExports.push([moduleExports.id, cssWithImage, '']);
  moduleExports.exports = cssExports;
}