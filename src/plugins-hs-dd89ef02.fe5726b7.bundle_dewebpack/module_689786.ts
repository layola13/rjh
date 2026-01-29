const cssContent = `.open-designs {
            
 display: flex;
            
 flex-direction: column;
            
 height: 100%;
            

        }
.open-designs .open-designs-header {
        
 display: flex;
        
 align-items: center;
        
 transition: all 0.5s;
        
 overflow: hidden;
        
 margin-left: 25px;
        

    }
.open-designs .open-designs-header.template {
    
 flex-direction: column;
    
 align-items: flex-start;
    

}
.open-designs .open-designs-header.design {

 justify-content: space-between;


}
.open-designs .open-designs-header.design .left-container {

 display: flex;

 align-items: center;


}
.open-designs .open-designs-header.design .recycle-bin {

 display: flex;

 align-items: center;

 font-size: 16px;

 color: #33353B;

 line-height: 20px;

 cursor: pointer;


}
.open-designs .open-designs-header.design .recycle-bin .hs-iconfont-view {

 transform: rotate(90deg);

 height: 14px;

 width: 14px;


}
.open-designs .open-designs-header.disable-show {

 height: 0px;


}
.open-designs .open-designs-header .open-designs-title {

 font-family: AlibabaPuHuiTi-Bold !important;

 color: #1C1C1C;

 font-size: 26px;

 line-height: 26px;


}
.open-designs .open-designs-header .special-second-tabs {

 width: 335px;

 margin-top: 25px;

 margin-bottom: 23px;


}
.open-designs .open-designs-header .special-second-tabs .homestyler-tabs-tab.homestyler-ui-components {

 padding: 0 18px;


}
.open-designs .open-designs-header .open-designs-search {

 width: 244px;

 height: 36px;

 position: relative;

 margin-left: 20px;


}
.open-designs .open-designs-header .open-designs-search .ant-input-affix-wrapper {

 border-color: #D4D7E1;

 height: 100%;

 border-radius: 18px;

 background-color: rgba(255, 255, 255, 0.6);

 box-sizing: border-box;


}
.open-designs .open-designs-header .open-designs-search .ant-input-affix-wrapper .ant-input {

 width: 172px;

 font-size: 12px;

 color: #9B9FAB;

 background-color: transparent;


}
.open-designs .open-designs-header .open-designs-search .ant-input-affix-wrapper .ant-input:focus {

 color: #33353B;


}
.open-designs .open-designs-header .open-designs-search .ant-input-affix-wrapper .ant-input-suffix {

 display: none;


}
.open-designs .open-designs-header .open-designs-search .ant-input-affix-wrapper-focused {

 border-color: #396EFE;

 background-color: rgba(236, 241, 255, 0.6);

 box-shadow: none;


}
.open-designs .open-designs-header .open-designs-search .clear-icon {

 position: absolute;

 top: 50%;

 transform: translateY(-50%);

 right: 36px;

 z-index: 1;


}
.open-designs .open-designs-header .open-designs-search .search-icon {

 position: absolute;

 top: 50%;

 transform: translateY(-50%);

 right: 11px;

 z-index: 1;


}
.open-designs .open-designs-contents {

 pointer-events: auto;

 position: relative;

 width: 100%;

 height: 365px;


}
.open-designs .open-designs-contents.template {

 display: block;

 height: 320px;


}
.open-designs .open-designs-contents .design-templates-carousel-wrapper {

 width: 200px;


}
.open-designs .open-designs-contents .design-templates-carousel-wrapper .design-templates-list-item {

 height: 120px;


}
.open-designs .open-designs-contents .design-templates-carousel-wrapper .design-templates-list-item-dots {

 top: 100px;


}
.open-designs .open-designs-contents .design-templates-carousel-wrapper:nth-child(3n) {

 margin-right: 24px;


}
.open-designs .open-designs-contents .design-templates-carousel-wrapper:nth-child(5n) {

 margin-right: 0;


}
.open-designs .open-designs-contents .design-templates-carousel-wrapper:nth-child(5n+1) {

 margin-left: 25px;


}
.open-designs .open-designs-contents .listItem {

 float: left;

 position: relative;

 box-sizing: border-box;

 width: 200px;

 margin: 16px 0 12px 25px;


}
.open-designs .open-designs-contents .listItem .version-tag {

 position: absolute;

 z-index: 1;

 left: 10px;

 height: 22px;

 padding: 5px 7px;

 border-radius: 0 0 6px 6px;

 font-size: 12px;

 box-sizing: border-box;


}
.open-designs .open-designs-contents .listItem .v3-tag-color {

 background-color: #1C1C1C;

 color: #E0C6AE;


}
.open-designs .open-designs-contents .listItem .list-item-bottom {

 display: flex;

 margin-top: 2px;


}
.open-designs .open-designs-contents .listItem .item-name-container {

 display: flex;

 flex-grow: 1;

 flex-direction: column;

 align-items: flex-start;


}
.open-designs .open-designs-contents .listItem .item-name-container .modified-time {

 font-size: 12px;

 margin-left: 8px;

 color: #9B9FAB;


}
.open-designs .open-designs-contents .listItem .item-edit-container {

 display: flex;

 margin-top: 8px;

 transition: all 0.5s;


}
.open-designs .open-designs-contents .listItem .item-edit-container .item-lock, 

.open-designs .open-designs-contents .listItem .item-edit-container .more-btn {

 width: 16px;

 height: 16px;

 margin-left: 8px;

 color: #9b9fab;

 font-size: 16px;

 cursor: pointer;


}
.open-designs .open-designs-contents .listItem .item-edit-container .item-lock:hover, 

.open-designs .open-designs-contents .listItem .item-edit-container .more-btn:hover, 

.open-designs .open-designs-contents .listItem .item-edit-container .item-lock:active, 

.open-designs .open-designs-contents .listItem .item-edit-container .more-btn:active {

 color: #396EFE;


}
.open-designs .open-designs-contents .listItem .item-img {

 width: 200px;

 height: 120px;

 border-radius: 10px;

 cursor: pointer;


}
.open-designs .open-designs-contents .listItem .item-img:hover {

 transform: scale(1.01);

 box-shadow: 0px 5px 20px 5px rgba(86, 95, 121, 0.1);

 transition: transform 0.3s;

}
.open-designs .open-designs-contents .nodesigncontainer {

 display: flex;
 flex-direction: column;
 align-items: center;

 height: 180px;

 justify-content: center;

 transition: height 0.5s;

 top: 50%;

 position: relative;

 transform: translateY(-50%);


}
.open-designs .open-designs-contents .nodesigncontainer .nodesign-picture {

 height: 100px;

 width: 100px;


}
.open-designs .open-designs-contents .nodesigncontainer .nodesigntext {

 margin-top: 20px;

 width: 225px;

 height: 18px;

 font-size: 13px;

 color: #33353B;

 line-height: 18px;


}
.open-designs .hidden-v1-list-design {

 display: none;


}
@media (max-height: 540px) {

 #welcome-frame-container #welcomeframe .welcome-rightpanel .welcome-extend-btn {
    
 bottom: 160px !important;
    

}
 .open-designs-contents .nodesigncontainer {

 height: 366px;


}
 .open-designs-scroll-container {

 height: 366px !important;


}


}
@media (min-height: 540px) and (max-height: 655px) {

 .open-designs-contents .nodesigncontainer {
    
 height: 454px;
    

}
 .open-designs-scroll-container {

 height: 454px !important;


}


}
@media (min-height: 655px) {

 .open-designs-contents .nodesigncontainer {
    
 height: 565px;
    

}
 .open-designs-scroll-container {

 height: 565px !important;


}


}
`;

interface CSSModule {
  push: (data: [string, string]) => void;
}

interface ModuleExports {
  id: string;
}

export default function initializeModule(
  moduleExports: ModuleExports,
  _t: unknown,
  requireFn: (id: number) => (sourceMap: boolean) => CSSModule
): void {
  const cssLoader = requireFn(986380);
  const cssModule = cssLoader(false);
  
  cssModule.push([moduleExports.id, cssContent]);
  
  (moduleExports as any) = cssModule;
}