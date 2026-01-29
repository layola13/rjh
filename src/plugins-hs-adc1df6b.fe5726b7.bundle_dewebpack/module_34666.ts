const cssContent = `.property-bar-stairtypes-wrapper {
            
 margin-top: 10px;
            
 width: 224px;
            
 max-height: 204px;
            
 overflow-x: hidden;
            
 overflow-y: auto;
            
 background-color: #F8F8F8;
            
 padding: 8px;
            
 position: relative;
            
 left: -6px;
            
 border-radius: 6px;
            

        }
.property-bar-stairtypes-wrapper::-webkit-scrollbar-thumb {
        
 border-radius: 4px;
        
 background-color: rgba(0, 0, 0, 0.14);
        

    }
.property-bar-stairtypes-wrapper::-webkit-scrollbar {
    
 width: 4px;
    
 height: 5px;
    
 border-radius: 4px;
    
 padding-left: 1px;
    

}
.property-bar-stairtypes-wrapper::-webkit-scrollbar-track {

 border-radius: 20px;


}
.property-bar-stairtypes-container {

 display: flex;

 flex-wrap: wrap;

 width: 208px;


}
.property-bar-stairtypes-container > div {

 position: relative;

 width: 64px;

 height: 86px;

 margin-right: 8px;


}
.property-bar-stairtypes-container > div:nth-child(3n) {

 margin-right: 0px;


}
.property-bar-stairtypes-container > div .stair-img {

 width: 64px;

 height: 64px;

 box-sizing: border-box;

 border-radius: 8px;

 border: 1px solid #EAEBF0;


}
.property-bar-stairtypes-container > div img {

 width: 62px;

 height: 62px;

 cursor: pointer;

 border-radius: 5px;


}
.property-bar-stairtypes-container > div.active .stair-img {

 border: 2px solid #396efe;


}
.property-bar-stairtypes-container > div.active img {

 width: 60px;

 height: 60px;

 cursor: pointer;


}
.property-bar-stairtypes-container > div .stair-name {

 width: inherit;

 height: 12px;

 line-height: 12px;

 color: #60646F;

 text-align: center;

 margin-top: 4px;

 font-weight: 400;

 font-size: 12px;


}
.property-bar-stairtypes-container > div .stair-name.stair-name-mask {

 color: #A8A9AC;


}
.property-bar-stairtypes-container > div .text-ellipsis {

 width: 100%;

 overflow: hidden;

 white-space: nowrap;

 text-overflow: ellipsis;


}
.property-bar-stairtypes-container > div .mask {

 position: absolute;

 width: 64px;

 height: 64px;

 box-sizing: border-box;

 border-radius: 4px;

 top: 0;

 left: 0;

 cursor: no-drop;

 background: rgba(248, 248, 248, 0.7);


}
.property-bar-stairtypes-container > div .stair-vip {

 position: absolute;

 top: -5px;

 left: 44px;


}
.property-bar-stairtypes-container > div .stair-vip img {

 width: 23px;

 height: 18px;


}
.property-bar-stairtypes-container .stair-more {

 text-align: unset;

 height: -moz-fit-content;

 height: fit-content;


}
.property-bar-stairtypes-container .stair-more .stair-name {

 position: absolute;

 top: 22px;


}
.property-bar-stairtypes-container .stair-more .stair-name .name {

 display: inline-block;

 color: #fff;


}
.property-bar-stairtypes-container .stair-more .stair-name .name:hover {

 cursor: pointer;


}
.property-bar-stairtypes-container .stair-more .stair-name .arrow {

 position: relative;

 top: 0px;

 left: 2px;

 color: #fff;


}
.stair-type-tip-txt-warp-2 {

 max-width: 220px;


}
.stair-type-tip-txt-warp-0 {

 max-width: 130px;


}
.step-edge-light-band-popover .hs-popover-context {

 background: rgba(0, 0, 0, 0.8);


}
.step-edge-light-band-popover .hs-popover-caret {

 border-bottom: 5px solid rgba(0, 0, 0, 0.8);


}
`;

export default cssContent;