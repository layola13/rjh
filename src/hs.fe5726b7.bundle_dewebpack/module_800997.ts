interface CSSExport {
  push(item: [string, string]): void;
}

interface CSSLoaderFunction {
  (sourceMap: boolean): CSSExport;
}

interface ModuleExports {
  id: string;
  exports: CSSExport;
}

const cssContent = `.dropdownlist {
            
 width: 210px;
            
 line-height: 22px;
            
 font-size: 12px;
            
 color: #808080;
            

        }
.dropdownlist img, 
.dropdownlist img {
        
 margin: 3px 0 0 4px;
        
 width: 40px;
        
 height: 15px;
        
 float: left;
        

    }
.dropdownlist .helpdiv img {
    
 float: unset;
    
 margin: unset;
    
 vertical-align: middle;
    
 cursor: pointer;
    

}
.dropdownlist button {

 height: 22px;

 width: 157px;

 font-size: 12px;

 text-align: left;

 padding: 0 0;

 outline: none;

 background-color: #ffffff;

 border: solid 1px #dcdce1;

 padding-right: 0px;

 border-radius: 2px;


}
.roomTypeDropdown button {

 width: 80px;


}
.roomTypeDropdown .button {

 border-color: #55acee;

 box-shadow: 0px 0px 3px 0px rgba(77, 155, 214, 0.6);


}
.roomTypeDropdown .dropdownitemspan {

 width: 9px;


}
.wallthickness .utitle {

 vertical-align: super;


}
.dropdownlist .utitle {

 font-size: 12px;

 margin-right: 10px;

 vertical-align: top;

 color: #96969b;


}
.dropdownlist button img {

 margin: 3px 0 0 4px;

 width: 40px;

 height: 15px;

 float: left;


}
.dropdownlist button .utext {

 margin-left: -5px;

 line-height: 22px;

 height: 22px;

 width: 83px;


}
.dropdownlist button .caret {

 float: right;

 margin: 10px 2px 0 0;

 border-top: 3px dashed;

 border-right: 3px solid transparent;

 border-left: 3px solid transparent;


}
.dropdownlist .ulcontainer {

 display: inline-block;


}
.hide {

 display: none;


}
.dropdownul {

 display: block;

 position: absolute;

 min-width: 127px;

 max-width: 170px;

 width: -moz-max-content;

 width: max-content;

 padding: 0px 0;

 border: 1px solid #dcdce1;

 border-radius: 2px;

 text-align: left;

 box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);

 background-color: #ffffff;

 z-index: 1000;

 max-height: 136px;

 overflow: auto;

 padding: 5px;

 padding-top: 2px;

 padding-bottom: 2px;

 overflow-x: hidden;


}
.dropdowneditul {

 display: block;

 position: absolute;

 margin-top: 4px;

 width: 58px;

 padding: 0px 0;

 border: 1px solid #dcdce1;

 text-align: left;

 box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);

 background-color: #ffffff;

 z-index: 1000;

 max-height: 136px;

 overflow: auto;

 padding-top: 2px;

 padding-bottom: 2px;


}
.dropdowneditul .dropdownli {

 text-align: center;


}
.dropdownli {

 height: 22px;

 line-height: 22px;

 font-size: 12px;

 cursor: pointer;

 position: relative;


}
.viewsel {

 height: 12px;

 width: 12px;

 background-size: 100%;

 position: absolute;

 left: 4px;

 top: 5px;


}
.dropdownli .utext {

 margin-left: 0px;


}
.highlight {

 background-color: rgba(83, 171, 238, 0.3);


}
.dropdownli:hover {

 cursor: pointer;

 background-color: rgba(83, 171, 238, 0.3);


}
.selectDropdownli {

 background: linear-gradient(90deg, #327dff 0%, #4b96ff 100%) !important;


}
.selectDropdownli .utext {

 font-weight: 500 !important;

 color: #ffffff !important;


}
.caretContainer {

 display: inline-block;

 width: 10px;

 float: right;

 height: 22px;


}
.caretContainerBorder {

 display: block;

 border: 1px solid #c3c3c3;

 border-left: none;

 width: 12px;

 float: right;

 background-color: #e4e4e4;

 height: 24px;

 margin-left: -0.2mm;


}
.dropdownitemspan {

 width: 16px;

 float: left;

 height: 22px;

 margin-left: 2px;


}
.global-en .dropdownitemspan {

 width: 13px;


}
.rightpropertybar .wallWidthDropdown {

 top: 65px;


}
.dropdownlist .right_length_input {

 margin-right: 1px;

 height: 26px;


}
.rightpropertybar .roomTypeDropdown .utext {

 display: inline-block;

 max-width: 114px;

 overflow: hidden;

 text-overflow: ellipsis;

 white-space: nowrap;


}
.rightpropertybar .roomTypeDropdown button .utext {

 max-width: 57px;


}
@media screen and (max-height: 720px) {

 .rightpropertybar .roomTypeDropdown {
    
 top: 70px;
    
 max-height: 255px;
    

}

}
@media screen and (min-height: 721px) and (max-height: 900px) {

 .rightpropertybar .roomTypeDropdown {
    
 top: 70px;
    
 max-height: 325px;
    

}

}
@media screen and (min-height: 901px) {

 .rightpropertybar .roomTypeDropdown {
    
 top: 70px;
    
 max-height: 425px;
    

}

}
.updownDropdown {

 position: relative;

 height: 45px;

 display: inline-block;

 margin-right: 4px;

 width: 60px;


}
.updownDropdown .cabinetLabel {

 position: absolute;

 color: #808080;

 font-size: 11px;

 line-height: 11px;

 bottom: 3px;

 text-align: center;

 width: 60px;


}
.updownDropdown .right_length_input .input {

 width: 45px;

 height: 22px;

 background: #ffffff;

 border: 1px solid #c3c3c3;

 border-radius: 2px;

 color: #343a40;

 display: block;

 text-indent: 4px;

 padding: 1px 0;

 font-size: 11px;


}
.updownDropdown .dropdowneditul {

 margin-top: -7px;


}
`;

export function initializeCSSModule(
  moduleExports: ModuleExports,
  _unusedParam: unknown,
  cssLoaderRequire: (id: number) => CSSLoaderFunction
): void {
  const cssLoader = cssLoaderRequire(986380);
  const cssExport = cssLoader(false);
  cssExport.push([moduleExports.id, cssContent]);
  moduleExports.exports = cssExport;
}