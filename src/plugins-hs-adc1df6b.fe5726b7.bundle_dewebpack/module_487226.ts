export const styles = `#header header {
            
 font-size: 16px;
            
 padding: 0 30px 0 0px;
            
 margin: 0;
            
 top: 0;
            
 left: 0;
            
 right: 0;
            
 position: absolute;
            
 min-width: 720px;
            
 z-index: 1000;
            
 background: rgba(255, 255, 255, 0.9);
            
 box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
            
 height: 42px;
            
 border-radius: 0 0 10px 10px;
            

        }
#header header.in-default-env {
        
 background: unset;
        
 box-shadow: unset;
        
 height: 42px;
        
 backdrop-filter: unset;
        
 border-bottom: unset !important;
        
 border-left: unset !important;
        
 border-right: unset !important;
        

    }
#header header .operates {
    
 position: absolute;
    
 display: inline-flex;
    
 height: 100%;
    

}
#header header .operates > li .compelete-env-btn {

 display: inline-flex;

 align-items: center;

 justify-content: center;

 height: 100%;

 margin-left: 12px;


}
#header header .operates > li .compelete-env-btn .complete-subname {

 font-family: AlibabaPuHuiTi-Bold !important;

 color: #33353b;

 font-size: 14px;


}
#header header .operates.left {

 left: 0;


}
#header header .operates.left > li:first-child {

 margin-right: 16px;


}
#header header .operates.right {

 right: 0px;


}
#header header .operates.right > li .user-info {

 margin: 0px 4px 0 12px;


}
#header header .operates.middle-right {

 left: 50%;


}
#header header .operates.middle-left {

 right: 50%;


}
#header header .operates.offset-right {

 margin-right: 165px;


}
#header header .operates.offset-left {

 margin-left: -165px;


}
#header header .disable {

 cursor: not-allowed;

 filter: opacity(0.4);


}
#header header .disable > div {

 pointer-events: none;


}
#header header > ul > li {

 display: flex;

 justify-content: flex-start;

 height: 100%;

 align-items: center;


}
#header header > ul > li .switch-language {

 margin-top: 18px;

 margin-right: 15px;

 font-size: 12px;


}
#header header > ul > li .switch-language .lang-list {

 top: 6px !important;


}
#header header .shejijia {

 float: left;

 margin-left: 14px;

 left: 8px;

 height: 100%;

 box-sizing: content-box;


}
#header header .shejijia a {

 display: inline-flex;

 align-items: center;

 height: 32px;

 padding: 9px 0;


}
#header header .shejijia a .icon {

 height: 28px;

 width: 28px;


}
#header header .shejijia a .mix-icon {

 width: 8px;

 height: 8px;

 padding: 0 10px;


}
#header header .shejijia a .large-icon {

 height: inherit;

 width: 113px;

 margin-top: -2px;


}
#header header .shejijia a img:not([src]) {

 opacity: 0;


}
#header header .shejijia a .outer-image {

 height: 26px;


}
#header header .shejijia a .fp-outer-block {

 text-align: center;


}
#header header .shejijia a .fp-outer-image {

 height: 30px;

 width: auto;

 max-width: 150px;


}
#header header .shejijia a .poweredby {

 font-size: 12px;

 line-height: 7px;

 color: #76787a;

 transform: scale(0.6);

 margin-top: 2px;

 transform-origin: top;
 white-space: nowrap;

}
#header header .shejijia.yunshejijia a .icon {

 width: 150px;
 margin-left: 2px;
 cursor: default;

}
#header header .menu-item.selected .privacy-option::after {

 left: 75%;
 top: 4%;
 content: '';

 width: 0;

 height: 0;

 content: url(IMAGE_URL_151302);

 position: absolute;

 transform: scale(0.8);

 margin-left: 8px;

 margin-bottom: 3px;

 padding: 0 2px;


}
#header header .menus.disable .menu-item.selected .privacy-option::after {

 content: url(IMAGE_URL_178697);


}
#header header .settings-content {

 display: flex;

 align-items: center;

 justify-content: center;

 height: 100%;


}
#header header .settings-content .settings-icons {

 height: 30px;

 width: 30px;

 display: flex;

 align-items: center;

 justify-content: center;

 border-radius: 15px;


}
#header header .settings-content .settings-icons:hover {

 background: rgba(255, 255, 255, 0.9);


}
#header header .notification-content {

 display: flex;

 align-items: center;

 justify-content: center;

 height: 100%;

 margin-left: 14px;

 position: relative;


}
#header header .notification-content .notification-icons {

 height: 30px;

 width: 30px;

 display: flex;

 align-items: center;

 justify-content: center;

 cursor: pointer;

 border-radius: 15px;


}
#header header .notification-content .notification-icons:hover {

 background: rgba(255, 255, 255, 0.9);


}
#header header .unrend-num {

 padding: 1px 7px;

 border-radius: 12px;

 background-color: #eb5d46;

 color: #fff;

 font-size: 12px;

 position: absolute;

 transform: scale(0.9);

 top: 4px;

 right: -8px;


}
#header header .edit-design-case {

 padding: 0 5%;

 margin-right: 10px;

 margin-top: 7px;

 height: 24px;

 width: 76px;

 line-height: 24px;

 font-size: 14px;

 text-align: center;

 border: 1px solid #c8c8cd;

 border-radius: 3px;

 color: #666666;


}
#header header .edit-design-case:hover {

 cursor: pointer;

 color: #3184c2 !important;

 border-color: #3085c4 !important;


}
#header header .full-screen-content {

 height: 100%;

 display: inline-flex;

 align-items: center;

 justify-content: center;

 width: 38px;

 margin-right: 11px;


}
#header header .full-screen-content .full-screen {

 display: inline-flex;

 align-items: center;

 justify-content: center;

 width: 30px;

 height: 30px;


}
#header header .full-screen-content .full-screen:hover {

 background: rgba(255, 255, 255, 0.9);

 border-radius: 15px;


}
@media screen and (max-width: 1439px) {

 #header header #floorplannerHelpbar .topLevelLabel {
    
 display: none !important;
    

}

}
@media screen and (max-width: 1366px) {

 #header header .operates .ngmHeaderEntrance {
    
 display: none;
    

}

}
@media screen and (max-width: 1310px) {

 #header header .hs-design-info {
    
 display: none;
    

}

}
@media screen and (max-width: 1284px) {

 #header header .large .teaching-ability-button-container {
    
 display: none;
    

}

}
@media screen and (max-width: 1200px) {

 #header header .large .user-info {
    
 display: none;
    

}
 #header header .large .notification-content {

 display: none;


}

}
@media screen and (max-width: 1230px) {

 #header header .teaching-ability-button-container {
    
 display: none;
    

}

}
@media screen and (max-width: 1040px) {

 #header header .hs-privacy {
    
 display: none;
    

}

}
@media screen and (max-width: 1020px) {

 #header header .large .full-screen-content {
    
 display: none;
    

}

}
@media screen and (max-width: 1000px) {

 #header header .operates.right > li .user-info {
    
 display: none;
    

}
 #header header .notification-content {

 display: none;


}

}
@media screen and (max-width: 930px) {

 #header header .large #floorplannerHelpbar {
    
 display: none;
    

}

}
#header header .fp-version-switch .fp-version-switch-btn {

 height: 30px;

 width: 76px;

 min-width: 76px;

 padding: 0 4px;

 margin-right: 10px;

 line-height: 30px;

 font-size: 12px;

 background: rgba(255, 255, 255, 0.4);


}
#header header .readonly-pageheader-btn {

 height: 30px;

 width: 76px;

 min-width: 76px;

 padding: 0px;

 margin-right: 10px;

 line-height: 30px;

 font-size: 12px;


}
.global-en #header header .operates.right {

 margin-right: 4px;


}
.global-en #header header .operates.right #floorplannerHelpbar .helpbar > li.helpitem, 
.global-en #header header .operates.right .teaching-ability-button-container .teaching-ability-button-wrapper .button {

 margin: 0;

 padding: 0 5px;


}
.global-en #header header .operates.right .readonly-pageheader {

 height: 100%;

 display: flex;

 align-items: center;


}
.global-en #header header .operates.right .readonly-pageheader .readonly-pageheader-btn {

 margin-right: 0;


}
.global-en #header header .operates.right > li > div {

 margin: 0 7px;


}
.global-en #header header .operates.right .full-screen-content {

 width: 30px;


}
#header header.ysjj #floorplannerHelpbar {

 background-color: unset;


}
#header header.ysjj #floorplannerHelpbar li .topLevelLabel {

 color: #19191e;


}
#header header.ysjj #floorplannerHelpbar li.hover .topLevelLabel {

 color: #327dff;


}
#header header.ysjj .edit-design-case {

 padding: 0 5%;

 margin-right: 10px;

 margin-top: 7.5px;

 height: 25px;

 width: 60px;

 line-height: 25px;

 font-size: 13px;

 text-align: center;

 border: 1px solid #e6e6eb;

 border-radius: 3px;

 color: #e6e6eb;


}
#header header.ysjj .edit-design-case:hover {

 cursor: pointer;

 color: #fafafa !important;

 border-color: #fafafa !important;


}
#header header.ysjj .ngmHeaderEntrance {

 color: #e6e6eb;


}
.compelete-env-btn-customized {

 display: inline-flex;

 align-items: center;

 justify-content: center;

 height: 100%;

 margin-left: 4px;


}
.compelete-env-btn-customized .compelete-btn {

 display: inline-flex;

 align-items: center;

 justify-content: center;

 flex-direction: row;

 padding: 0px 13px;

 height: 30px;

 border-radius: 30px;

 cursor: pointer;

 border: 1px solid #000;

 background: #FFF;

 color: #000;

 max-width: 200px;


}
.compelete-env-btn-customized .compelete-btn:hover {

 color: #fff;

 background: #396EFE;

 border: 1px solid #396EFE;


}
.compelete-env-btn-customized .compelete-btn:active .complete-name {

 color: #ffffff;


}
.compelete-env-btn-customized .compelete-btn:active .arrow-icon {

 color: #ffffff;


}
.compelete-env-btn-customized .compelete-btn .complete-arrow {

 display: inline-flex;

 align-items: center;

 justify-content: center;

 flex: none;


}
.compelete-env-btn-customized .compelete-btn .complete-arrow img {

 width: 20px;

 position: relative;


}
.compelete-env-btn-customized .compelete-btn .complete-name {

 font-family: AlibabaPuHuiTi-Bold !important;

 font-size: 14px;

 margin-left: 6px;

 flex: auto;

 overflow: hidden;

 text-overflow: ellipsis;

 white-space: nowrap;


}
.compelete-env-btn-customized .vdivider {

 margin: 0 8px;

 height: 20px;

 border-left: 1px solid rgba(0, 0, 0, 0.3);


}
.compelete-env-btn-customized .complete-second-name {

 font-family: AlibabaPuHuiTi-Bold !important;

 color: #33353b;

 font-size: 14px;


}
.compelete-env-btn-customized .customized_second_name {

 font-family: AlibabaPuHuiTi !important;

 color: #33353b;

 font-size: 12px;


}
`;