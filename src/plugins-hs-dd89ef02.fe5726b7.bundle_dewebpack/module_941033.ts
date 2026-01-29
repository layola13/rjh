const styles = `.setting-window-input-card-wrapper {
            
 display: flex;
            
 height: 76px;
            
 width: 100%;
            
 flex-direction: row;
            
 justify-content: space-between;
            
 align-items: center;
            
 border-bottom: 1px solid #e9e9e9;
            
 box-sizing: border-box;
            

        }
.setting-window-input-card-wrapper .input-card-left-part {
        
 display: inline-flex;
        
 color: #33353B;
        
 font-size: 14px;
        
 flex-direction: column;
        
 align-self: center;
        
 flex: auto;
        
 overflow: hidden;
        
 margin-right: 8px;
        

    }
.setting-window-input-card-wrapper .input-card-left-part .input-card-title {
    
 display: inline-flex;
    
 align-items: center;
    
 justify-content: flex-start;
    
 flex-direction: row;
    

}
.setting-window-input-card-wrapper .input-card-left-part .input-card-title .input-card-title-main {

 display: inline-flex;

 font-size: 14px;

 color: #33353B;

 font-weight: bold;


}
.setting-window-input-card-wrapper .input-card-left-part .input-card-title .input-card-title-additional {

 display: inline-flex;

 font-size: 12px;

 color: #60646F;

 padding-left: 5px;


}
.setting-window-input-card-wrapper .input-card-left-part .input-card-sub-title {

 font-size: 12px;

 color: #60646F;

 margin-top: 11px;


}
.setting-window-input-card-wrapper .input-card-right-part {

 position: relative;

 display: inline-flex;

 font-size: 12px;

 justify-content: flex-end;

 align-items: center;

 flex: none;


}
.setting-window-input-card-wrapper .input-card-right-part .input-card-range-tip {

 font-size: 12px;

 margin-right: 20px;

 white-space: nowrap;


}
.setting-window-input-card-wrapper .input-card-right-part .input-card-input-item {

 box-sizing: border-box;

 position: relative;

 white-space: nowrap;

 overflow: hidden;

 cursor: text;

 width: 90px;

 height: 24px;

 line-height: 24px;

 font-size: 12px;

 padding: 3px 8px;

 border-radius: 4px;

 background: #fff;

 border: 1px solid #EAECF1;

 color: #343A40;


}
.setting-window-input-card-wrapper .input-card-right-part .input-card-input-item:focus, 
.setting-window-input-card-wrapper .input-card-right-part .input-card-input-item:hover {

 border-color: #396EFE;


}
.setting-window-input-card-wrapper .input-card-right-part .input-card-input-item.input-car-input-item-invalid {

 border-color: #EB5D46;


}
.setting-window-input-card-wrapper .input-card-right-part .input-card-input-invalid-tips {

 position: absolute;

 color: #EB5D46;

 height: 20px;

 font-size: 12px;

 bottom: -25px;

 white-space: nowrap;


}
`;

export default styles;