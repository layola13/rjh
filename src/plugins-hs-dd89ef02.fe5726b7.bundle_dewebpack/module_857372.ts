const cssContent = `.failed-files-dialog-wrapper .failed-files-dialog-overLay {
            
 position: fixed;
            
 width: 100%;
            
 height: 100%;
            
 visibility: visible;
            
 top: 0;
            
 left: 0;
            
 z-index: 11130;
            
 opacity: 1;
            
 background-color: rgba(0, 0, 0, 0.3);
            
 transition: all 0.3s;
            

        }
.failed-files-dialog-wrapper .failed-files-dialog-main {
        
 background-color: #FFF;
        
 color: #000;
        
 width: 500px;
        
 z-index: 11140;
        
 top: 50%;
        
 left: 50%;
        
 position: absolute;
        
 transform: translate(-50%, -50%);
        
 box-sizing: content-box;
        
 display: flex;
        
 align-items: center;
        
 justify-content: center;
        
 border-radius: 10px;
        
 flex-direction: column;
        

    }
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-head {
    
 width: 440px;
    
 border-radius: 10px;
    
 display: flex;
    
 align-items: center;
    
 justify-content: space-between;
    
 box-sizing: border-box;
    
 background-image: linear-gradient(#FFF, #FDFDFD);
    
 height: 50px;
    
 margin: 15px 30px 12px 30px;
    

}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-head .failed-files-dialog-title {

 font-family: 'AlibabaPuHuiTi-Bold', sans-serif !important;

 font-size: 20px;

 color: #33353B;

 line-height: 28px;

 font-weight: 700;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content {

 width: 100%;

 background-color: #FDFDFD;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-content-all-failed {

 font-size: 14px;

 color: #60646F;

 line-height: 22px;

 font-weight: 400;

 margin: 0 30px 25px 30px;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-content-header {

 width: 440px;

 height: 80px;

 background: #F0F0F0;

 border-radius: 10px;

 display: flex;

 align-items: center;

 justify-content: start;

 margin: 0 30px;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-content-header .f-f-c-h-icon {

 margin: 8px 8px 8px 20px;

 width: 66px;

 height: 66px;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-content-header .f-f-c-h-content {

 display: flex;

 justify-content: center;

 flex-direction: column;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-content-header .f-f-c-h-content .f-f-c-h-title {

 font-size: 16px;

 color: #191919;

 line-height: 14px;

 font-weight: 700;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-content-header .f-f-c-h-content .f-f-c-h-subtitle {

 margin-top: 10px;

 font-size: 12px;

 color: #191919;

 line-height: 14px;

 font-weight: 400;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-scrollbar {

 width: 440px;

 height: 248px;

 margin: 0 30px 30px 30px;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-scrollbar .failed-files-dialog-items {

 display: flex;

 margin: 8px 0 8px 6px;

 align-items: center;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-scrollbar .failed-files-dialog-items .f-f-d-i-icon {

 display: inline-block;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-scrollbar .failed-files-dialog-items .f-f-d-i-item {

 margin-left: 6px;

 width: 360px;

 font-size: 12px;

 color: #191919;

 line-height: 12px;

 font-weight: 400;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-content .failed-files-scrollbar .failed-files-dialog-items:first-child {

 margin-top: 20px;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-bottom {

 height: 50px;

 width: 100%;

 padding: 0 30px 0 24px;

 margin-bottom: 10px;

 box-sizing: border-box;

 display: flex;

 flex-direction: row-reverse;

 align-items: center;

 justify-content: space-between;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-bottom .failed-files-dialog-button {

 width: 100px;

 height: 36px;

 font-size: 13px;

 font-family: 'AlibabaPuHuiTi-Bold';


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-bottom .failed-files-dialog-button-save {

 color: #FFF;

 background: #396EFE;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-bottom .failed-files-dialog-button-save:hover {

 color: #F2F2F2;

 background: #305DD7;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-bottom .failed-files-dialog-button-cancel {

 margin-right: 58px;

 color: #396EFE;


}
.failed-files-dialog-wrapper .failed-files-dialog-main .failed-files-dialog-bottom .failed-files-dialog-button-cancel:hover {

 color: #305DD7;


}
.failed-files-window-input-card-wrapper {

 display: flex;

 height: 72px;

 width: 100%;

 flex-direction: row;

 justify-content: space-between;

 align-items: center;

 padding: 0px 12px;

 margin-bottom: 12px;

 background-color: #FFF;


}
.failed-files-window-input-card-wrapper .input-card-left-part {

 display: inline-flex;

 color: #33353B;

 font-size: 14px;

 flex-direction: column;

 align-self: center;


}
.failed-files-window-input-card-wrapper .input-card-left-part .input-card-title {

 display: inline-flex;

 align-items: center;

 justify-content: flex-start;

 flex-direction: row;


}
.failed-files-window-input-card-wrapper .input-card-left-part .input-card-title .input-card-title-main {

 display: inline-flex;

 font-size: 14px;

 color: #33353B;

 font-weight: bold;


}
`;

interface CSSLoaderModule {
  (sourceMap: boolean): Array<[string, string]>;
}

interface ModuleExports {
  push(entry: [string, string]): void;
}

export function initializeStyleModule(
  moduleExports: ModuleExports,
  cssLoaderFactory: (sourceMap: boolean) => CSSLoaderModule,
  moduleId: string
): void {
  const cssLoader = cssLoaderFactory(false);
  cssLoader.push([moduleId, cssContent]);
  Object.assign(moduleExports, cssLoader);
}