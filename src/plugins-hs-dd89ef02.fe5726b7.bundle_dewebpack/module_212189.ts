const cssContent = `.setting-window-toggle-button-card-wrapper {
            
 display: flex;
            
 height: 54px;
            
 width: 100%;
            
 flex-direction: row;
            
 justify-content: space-between;
            
 align-items: center;
            
 box-sizing: border-box;
            

        }
.setting-window-toggle-button-card-wrapper .toggle-button-card-left-part {
        
 display: inline-flex;
        
 flex-direction: column;
        
 align-self: center;
        
    
}
.setting-window-toggle-button-card-wrapper .toggle-button-card-left-part .toggle-button-card-title {
    
 font-size: 14px;
    
 font-weight: bold;
    

}
.setting-window-toggle-button-card-wrapper .toggle-button-card-left-part .toggle-button-card-sub-title {

 font-size: 12px;

 margin-top: 6px;

 transform: scale(0.85);

 margin-left: -15px;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part {

 display: inline-flex;

 font-size: 12px;

 justify-content: flex-end;

 position: relative;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-switch {

 width: 30px;

 height: 18px;

 position: relative;

 display: inline-flex;

 box-sizing: border-box;

 line-height: 20px;

 vertical-align: middle;

 border-radius: 20px;

 border: 1px solid transparent;

 background-color: rgba(0, 0, 0, 0.25);

 cursor: pointer;

 transition: all 0.36s;

 -webkit-user-select: none;

 -moz-user-select: none;

 user-select: none;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-switch .toggle-button-card-switch-inner {

 color: #fff;

 font-size: 12px;

 margin-left: 34px;

 margin-right: 6px;

 display: block;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-switch .toggle-button-card-switch-inner:after {

 position: absolute;

 width: 14px;

 height: 14px;

 left: 1px;

 top: 1px;

 border-radius: 14px;

 background-color: #fff;

 content: " ";

 cursor: pointer;

 transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-switch.toggle-button-card-switch-checked {

 background-color: #396EFE;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-switch.toggle-button-card-switch-checked .toggle-button-card-switch-inner {

 margin-left: 5px;

 margin-right: 24px;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-switch.toggle-button-card-switch-checked .toggle-button-card-switch-inner:after {

 margin-left: 12px;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-errmsg {

 position: absolute;

 bottom: -15px;

 display: inline-flex;

 align-items: center;

 justify-content: flex-end;

 flex-direction: row;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-errmsg .toggle-button-card-errmsg-label {

 white-space: nowrap;

 color: #ff0000;

 font-size: 12px;

 display: inline-block;

 transform: scale(0.85);

 margin-right: -11px;


}
.setting-window-toggle-button-card-wrapper .toggle-button-card-right-part .toggle-button-card-errmsg .toggle-button-card-errmsg-bind {

 white-space: nowrap;

 color: #ff0000;

 text-decoration: underline;

 font-size: 12px;

 display: inline-block;

 cursor: pointer;

 transform: scale(0.85);


}
`;

export default cssContent;