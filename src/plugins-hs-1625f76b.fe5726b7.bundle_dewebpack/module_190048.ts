const cssContent = `.whole-product-wrapper .whole-product-container {
            
 width: 244px;
            
 height: 197px;
            
 position: relative;
            
 overflow: visible;
            
 display: inline-block;
            
 border-radius: 3px;
            
 box-sizing: border-box;
            

        }
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper {
        
 height: 137px;
        
 width: 100%;
        
 position: relative;
        
 background-color: #ececec;
        
 border-radius: 10px;
        
 cursor: pointer;
        

    }
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper .whole-product-content-image {
    
 max-height: 100%;
    
 margin: auto;
    
 width: auto;
    
 border-radius: 8px;
    
 position: absolute;
    
 top: 0px;
    
 bottom: 0px;
    
 left: 0px;
    
 right: 0px;
    

}
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper .whole-product-favorite-icon {

 position: absolute;

 left: 8px;

 top: 8px;

 width: 18px;

 height: 18px;

 background: rgba(255, 255, 255, 0.8);

 border-radius: 9px;

 display: flex;

 align-items: center;

 justify-content: center;


}
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper .whole-product-icons-block {

 position: absolute;

 right: 8px;

 top: 8px;


}
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper .whole-product-icons-block > img {

 width: 20px;

 height: 20px;


}
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper:hover {

 animation: open_product_img 0.3s forwards;

}
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper .author-info {

 display: flex;
 align-items: center;
 position: absolute;
 bottom: 0;
 background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));

 width: 100%;

 height: 30px;

 padding: 4px 6px;


}
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper .author-info .avatar {

 width: 20px;

 height: 20px;

 border-radius: 50%;

 border: 1px solid white;

 margin-right: 4px;

 overflow: hidden;


}
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper .author-info .avatar img {

 width: inherit;

 height: inherit;


}
.whole-product-wrapper .whole-product-container .whole-product-content-image-wrapper .author-info .user-name {

 font-size: 12px;

 color: white;


}
.whole-product-wrapper .whole-product-content-info {

 display: flex;

 justify-content: space-between;

 align-items: center;

 height: 60px;


}
.whole-product-wrapper .whole-product-content-info .whole-product-text-content {

 overflow: hidden;


}
.whole-product-wrapper .whole-product-content-info .whole-product-text-container {

 display: flex;

 align-items: center;

 justify-content: flex-start;


}
.whole-product-wrapper .whole-product-content-info .whole-product-text-container > div {

 padding-left: 0px;

 overflow: hidden;

 text-overflow: ellipsis;

 white-space: nowrap;


}
.whole-product-wrapper .whole-product-content-info .whole-product-text-container .whole-product-title {

 font-family: PingFangSC-Semibold !important;

 color: #343a40;

 font-size: 14px;

 font-weight: bold;


}
.whole-product-wrapper .whole-product-content-info .whole-product-text-container .whole-product-second-title {

 font-family: PingFangSC-Light !important;

 color: #60646f;

 padding-top: 4px;

 line-height: 16px;


}
.whole-product-wrapper .whole-product-content-info .whole-product-icon-info {

 display: none;


}
.whole-product-wrapper .whole-product-content-info .whole-product-icon-info .sample-content:first-child {

 margin-right: 10px;


}
.whole-product-wrapper .whole-product-content-info .whole-product-icon-info .sample-content:hover .anticon {

 color: #396efe !important;


}
.whole-product-wrapper .whole-product-content-info .whole-product-icon-info .img-icon {

 margin-left: 12px;

 cursor: pointer;

 display: inline-block;

 height: 16px;

 width: 16px;


}
.whole-product-wrapper .whole-product-content-info .whole-product-icon-info .homestyler-ui-components {

 width: 88px;

 height: 28px;

 min-width: 88px;

 line-height: 28px;

 box-sizing: border-box;


}
.whole-product-wrapper:hover .whole-product-icon-info {

 display: flex;


}
.whole-product-wrapper .whole-product-no-selection {

 position: absolute;

 top: 50%;

 left: 50%;

 transform: translate(-50%, -50%);

 width: 234px;

 height: 24px;

 display: flex;

 align-items: center;

 justify-content: center;

 font-family: PingFangSC-Semibold;

 font-size: 12px;

 background: rgba(0, 0, 0, 0.7);

 border-radius: 2px;


}
.whole-product-wrapper .whole-product-no-selection-desc {

 color: #ffffff;


}
.whole-product-wrapper .whole-product-no-selection-link {

 color: rgba(50, 125, 255, 0.9);


}
.whole-product-wrapper .whole-product-no-selection-link:hover {

 cursor: pointer;

 color: #327dff;


}
@keyframes wholeProductHover {

 0% {
    
 transform: none;
 box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    

}
 100% {

 transform: scale(1.01);

 box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.28);


}

}
@keyframes open_product_img {

 100% {
    
 transform: scale(1.01);
    
 border-bottom: none;
    
 box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.24);
    

}

}
`;

interface CSSLoaderModule {
  push: (entry: [string, string]) => void;
}

interface ModuleExports {
  id: string;
}

export function initializeCSSModule(
  moduleExports: ModuleExports,
  _unusedParam: unknown,
  requireFunction: (moduleId: number) => CSSLoaderModule
): void {
  const cssLoader = requireFunction(986380)(false);
  cssLoader.push([moduleExports.id, cssContent]);
}