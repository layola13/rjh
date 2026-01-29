const cssContent = `#page-header {
            
 color: #33353b;
            

        }
#page-header #floorplannerHelpbar {
        
 position: relative;
        
 background-color: unset;
        
 pointer-events: auto;
        
 height: 100%;
        
 display: inline-flex;
        

    }
#page-header #floorplannerHelpbar .helpbar {
    
 display: inline-flex;
    
 align-items: center;
    
 justify-content: center;
    

}
#page-header #floorplannerHelpbar .helpbar > li {

 list-style: none;

 cursor: pointer;

 color: #5f5f5f;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem {

 height: 30px;

 border-radius: 15px;

 position: relative;

 display: inline-flex;

 align-items: center;

 justify-content: center;

 margin-left: 4px;

 padding: 0 8px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions {

 display: none;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu {

 font-size: 12px;

 color: #19191e;

 top: 40px;

 z-index: 1;

 width: -moz-max-content;

 width: max-content;

 opacity: 1;

 padding: 4px 0px;

 min-width: 156px;

 display: flex;

 flex-direction: column;

 position: absolute;

 left: 50%;

 transform: translateX(-50%);

 background: #ffffff;

 box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);

 border-radius: 8px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu .haschild {

 display: none;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem {

 position: relative;

 background: rgba(255, 255, 255, 0.4);

 height: 36px;

 width: 100%;

 display: flex;

 justify-content: flex-start;

 align-items: center;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helptext {

 display: inline-flex;

 align-items: center;

 justify-content: center;

 padding: 0 16px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helptext .help-new {

 display: inline-flex;

 align-items: center;

 justify-content: center;

 position: relative;

 width: 36px;

 height: 14px;

 margin-left: 4px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helptext .textonly {

 position: relative;

 font-family: PingFangSC-Regular !important;

 color: #33353b;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helptext .hotkey {

 position: relative;

 display: block;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helptext:active .textonly {

 color: #396efe;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helptext:active .hotkey {

 color: #396efe;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helptext .help-red-dot {

 position: relative;

 width: 6px;

 height: 6px;

 border-radius: 50%;

 background: #eb5d46;

 margin-left: 2px;

 top: -6px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helptext .count-number {

 position: relative;

 background: #eb5d46;

 border-radius: 9px 9px 9px 3px;

 height: 14px;

 font-family: PingFangSC-Regular !important;

 color: #ffffff;

 display: inline-flex;

 align-items: center;

 justify-content: center;

 padding: 0 4px;

 box-sizing: border-box;

 font-size: 12px;

 min-width: 15px;

 max-width: 28px;

 margin-left: 4px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .texticon {

 position: absolute;

 top: 0px;

 right: 5px;

 cursor: pointer;

 vertical-align: middle;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .texticon svg {

 cursor: pointer;

 vertical-align: middle;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem .helpbar_popover {

 width: 100%;

 height: 100%;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem.helpsearchitem {

 padding: 0;

 width: 100%;

 height: 28px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem.helpsearchitem .helpsearch {

 position: absolute;

 left: 0px;

 width: inherit;

 height: 100%;

 background-color: #ffffff;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem.helpsearchitem .helpsearch .searchinput {

 width: 130px;

 height: 100%;

 border-style: none;

 padding: 0 10px;

 background-color: #ffffff;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem.helpsearchitem .helpsearch .clearBtn {

 position: absolute;

 top: 5px;

 right: 26px;

 height: 11px;

 width: 11px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem.helpsearchitem .helpsearch .searchicon {

 position: absolute;

 top: 4px;

 right: 3px;

 height: 20px;

 width: 20px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.helpitem.helpsearchitem .helpsearch .searchicon img {

 height: 15px;

 width: 15px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li .helpicon {

 display: none;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.hover {

 background: #f5f5f5;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li.hover.disabled {

 background-color: transparent;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li:active, 

#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li:focus, 

#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li:visited, 

#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li:focus-within, 

#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li:focus-visible {

 color: #396efe;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li:first-child {

 border-top-left-radius: 3px;

 border-top-right-radius: 3px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu > li:last-child {

 border-bottom-left-radius: 3px;

 border-bottom-right-radius: 3px;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions.expandmenu .expandmenu {

 top: 0px;

 left: 100%;


}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .moreoptions::before {

 position: absolute;
 top: -20px;
 right: 0;
 bottom: 0px;
 left: 0px;
 z-index: -9999;
 opacity: 0.0001;
 content: '';

}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .topLevelLabel {

 display: inline-flex;
 align-items: center;
 justify-content: center;
 margin-left: 6px;
 font-size: 12px;
 color: #33353b;
 position: relative;

}
#page-header #floorplannerHelpbar .helpbar > li.helpitem > .help-red-dot {

 position: absolute;
 border-radius: 50%;
 background: #eb5d46;
 top: 2px;
 width: 6px;
 height: 6px;
 right: 1px;

}
#page-header #floorplannerHelpbar .helpbar > li.helpitem > .count-number {

 position: absolute;
 background: #eb5d46;
 border-radius: 9px 9px 9px 3px;
 height: 14px;
 font-family: PingFangSC-Regular !important;
 color: #ffffff;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 padding: 0 4px;
 box-sizing: border-box;
 font-size: 12px;
 min-width: 15px;
 max-width: 28px;
 margin-left: 2px;
 right: -9px;
 top: 1px;
 z-index: 100;

}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .menu_arr {

 position: relative;
 top: 3px;
 margin-left: 5px;
 display: inline-block;
 border: 4px solid transparent;
 border-top-color: #3c3838;

}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .homestyler-ui-components.homestyler-popover-item.switch-language-tool-tip {

 background: #396EFE;
 padding: 0;
 border-radius: 8px;
 width: -moz-max-content;
 width: max-content;

}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .homestyler-ui-components.homestyler-popover-item.switch-language-tool-tip .tool-tip-area {

 display: flex;
 justify-content: center;
 align-items: center;
 height: 30px;
 font-size: 14px;
 padding: 1.1px 0;

}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .homestyler-ui-components.homestyler-popover-item.switch-language-tool-tip .tool-tip-area .tool-tip-title {

 color: #FFFFFF;
 margin-right: 10px;
 font-family: AlibabaPuHuiTi-Bold !important;

}
#page-header #floorplannerHelpbar .helpbar > li.helpitem .homestyler-ui-components.homestyler-popover-item.switch-language-tool-tip .homestyler-popover-caret {

 border-bottom-color: #396EFE;

}
#page-header #floorplannerHelpbar .helpbar > li.hover {

 background: rgba(255, 255, 255, 0.9);


}
#page-header #floorplannerHelpbar .helpbar > li.actived > .helpicon svg .normal, 

#page-header #floorplannerHelpbar .helpbar > li.actived > div .helpicon svg .normal {

 display: none;


}
#page-header #floorplannerHelpbar .helpbar > li.actived > .helpicon svg .selected, 

#page-header #floorplannerHelpbar .helpbar > li.actived > div .helpicon svg .selected {

 display: block !important;


}
#page-header #floorplannerHelpbar .helpbar > li.disabled {

 cursor: default;
 opacity: 0.4;


}
#page-header #floorplannerHelpbar .helpbar > li.disabled.hover {

 background-color: transparent;


}
#page-header #floorplannerHelpbar .helpbar > li.disabled.hover svg .normal {

 display: block !important;


}
#page-header #floorplannerHelpbar .helpbar > li.disabled.hover svg .selected {

 display: none !important;


}
#page-header .bottomline {

 display: inline-flex;
 align-items: center;
 justify-content: center;
 border-style: solid;
 border-top: 1px solid #eaecf1;
 margin: 0 12px;


}
#page-header ul.bottommoreoptions {

 top: 77px !important;


}
#page-header .ihomeversion.expandmenu {

 left: -106px !important;


}
.modal-content .about-us-content, 

.homestyler-modal-content .about-us-content {

 font-size: 15px;
 line-height: 24px;


}
.tooltip-full-screen {

 font-size: 12px;
 white-space: nowrap;


}
`;

interface CSSLoaderFunction {
  (includeSourceMap: boolean): CSSModule;
}

interface CSSModule {
  push(entry: [string, string]): void;
}

interface ModuleExports {
  id: string;
  exports: unknown;
}

interface RequireFunction {
  (moduleId: number): CSSLoaderFunction;
}

export default function initializeCSSModule(
  module: ModuleExports,
  exports: unknown,
  require: RequireFunction
): void {
  const cssLoader = require(986380);
  const cssModule = cssLoader(false);
  
  cssModule.push([module.id, cssContent]);
  
  module.exports = cssModule;
}