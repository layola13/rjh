import { carouselPanelViewerLoadingBg } from './assets/carousel-panel-viewer-loading-bg';

const cssContent = `.carousel-panel-viewer {
            
 position: relative;
            
 border-radius: 10px;
            

        }
.carousel-panel-viewer-canvas-container, 
.carousel-panel-viewer-img-container {
        
 position: absolute;
        
 border-radius: 10px;
        
 overflow: hidden;
        

    }
.carousel-panel-viewer-loading {
    
 position: absolute;
    
 width: 100%;
    
 height: 100%;
    
 display: flex;
    
 align-items: center;
    
 justify-content: center;
    
 background: url(${carouselPanelViewerLoadingBg}) no-repeat;
    
 background-size: 100% 100%;
    
 z-index: 1;
    

}
.carousel-panel-viewer-loading-text {

 font-size: 14px;

 color: #fff;


}
.carousel-panel-viewer-vip-mark {

 position: absolute;

 top: 10px;

 right: 10px;


}
.carousel-panel-viewer-pano-mark {

 position: absolute;

 top: 9px;

 left: 9px;

 width: 80px;

 height: 24px;

 display: flex;

 align-items: center;

 justify-content: center;

 font-family: PingFangSC-Semibold;

 font-size: 12px;

 color: #fff;

 border-radius: 15px;

 background: rgba(0, 28, 28, 0.7);

 z-index: 1;

 pointer-events: none;


}
.carousel-panel-viewer-pano-tip {

 position: absolute;

 left: 50%;

 top: 50%;

 transform: translate(-50%, -50%);

 font-family: PingFangSC-Semibold;

 font-size: 14px;

 color: #fff;

 z-index: 1;

 pointer-events: none;


}
.carousel-panel-viewer-cursor-not-allowed-tip, 
.carousel-panel-viewer-cursor-add-tip {

 position: absolute;

 padding: 0 6px;

 height: 24px;

 line-height: 24px;

 text-align: center;

 white-space: nowrap;

 font-family: PingFangSC-Regular;

 font-size: 12px;

 color: #fff;

 background: rgba(28, 28, 28, 0.7);

 border-radius: 4px;

 z-index: 1;

 pointer-events: none;


}
.carousel-panel-viewer-vip-not-selected {

 position: absolute;

 padding: 10px 8px;

 width: 224px;

 background: rgba(0, 0, 0, 0.9);

 border-radius: 4px;

 box-sizing: border-box;


}
.carousel-panel-viewer-tips {

 opacity: 0.86;

 font-size: 12px;

 color: #FFF;

 line-height: 16px;

 font-weight: 200;


}
.carousel-panel-viewer-exclusive-block {

 height: 30px;

 background-image: linear-gradient(-52deg, #E0FFA2 0%, #FCFFB3 52%, #FFDF77 100%);

 border-radius: 17px;

 display: flex;

 align-items: center;

 justify-content: space-between;

 padding: 0 4px 0 10px;

 margin-bottom: 8px;


}
.carousel-panel-viewer-exclusive-block .exclusive-icon {

 margin-top: -2px;


}
.carousel-panel-viewer-exclusive-block .exclusive-prev {

 display: flex;

 align-items: center;


}
.carousel-panel-viewer-exclusive-block .exclusive-content {

 color: #33353B;

 font-size: 12px;

 font-weight: bold;

 padding-left: 6px;


}
.carousel-panel-viewer-exclusive-block .exclusive-upgrade {

 line-height: 22px;

 padding: 0 10px;

 font-size: 12px;

 background-color: #1C1C1C;

 color: #fff;

 border-radius: 11px;

 cursor: pointer;


}
.carousel-panel-viewer-exclusive-block .exclusive-upgrade:hover {

 background-color: #333;


}
.carousel-panel-viewer-pickall {

 display: flex;

 justify-content: center;

 align-items: center;

 position: absolute;

 bottom: 10px;

 right: 10px;

 height: 28px;

 min-width: 70px;

 padding: 0 10px;

 border-radius: 14px;

 background: rgba(255, 255, 255, 0.6);

 backdrop-filter: blur(15px);

 cursor: pointer;


}
.carousel-panel-viewer-pickall .text {

 color: #33353B;

 display: inline-block;

 margin-left: 6px;

 font-size: 12px;


}
.carousel-panel-viewer-pickall :hover {

 color: #396EFE;


}
.carousel-panel-viewer-pickall-hover .text {

 color: #396EFE;


}
`;

export default cssContent;