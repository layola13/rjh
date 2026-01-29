const styles = `.setting-window-image-check-card-wrapper {
            
 display: flex;
            
 height: 108px;
            
 flex-direction: row;
            
 justify-content: space-between;
            
 align-items: center;
            
 width: 100%;
            
 box-sizing: border-box;
            
 padding: 0 18px;
            

        }
.setting-window-image-check-card-wrapper .image-check-card-left-part {
        
 display: inline-flex;
        
 color: #33353B;
        
 font-size: 14px;
        
 flex-direction: column;
        
 align-items: flex-start;
        
 position: relative;
        

    }
.setting-window-image-check-card-wrapper .image-check-card-left-part .image-check-card-title {
    
 font-size: 14px;
    
 line-height: 20px;
    
 font-weight: bold;
    

}
.setting-window-image-check-card-wrapper .image-check-card-left-part .image-check-card-sub-title {

 font-size: 12px;

 margin-top: 9px;

 line-height: 14px;

 position: relative;


}
.setting-window-image-check-card-wrapper .image-check-card-right-part {

 display: inline-flex;

 font-size: 12px;


}
.setting-window-image-check-card-wrapper .image-check-card-right-part .setting-image-check-group {

 position: relative;

 font-size: 12px;

 display: flex;

 align-items: center;

 box-sizing: border-box;

 height: 92px;

 flex-direction: column;

 border: 2px solid transparent;

 border-radius: 8px;

 width: 130px;

 cursor: pointer;


}
.setting-window-image-check-card-wrapper .image-check-card-right-part .setting-image-check-group .setting-image-check-button-image {

 width: 100%;

 height: 68px;

 border-top-left-radius: 8px;

 border-top-right-radius: 8px;


}
.setting-window-image-check-card-wrapper .image-check-card-right-part .setting-image-check-group .setting-image-check-button-text {

 width: 100%;

 height: 36px;

 position: absolute;

 bottom: 0;

 display: inline-flex;

 align-items: center;

 justify-content: center;

 background: linear-gradient(to top, #ffffff 50%, transparent 100%);

 border-radius: 0 0 8px 8px;


}
.setting-window-image-check-card-wrapper .image-check-card-right-part .setting-image-check-group .setting-image-check-button-text .setting-image-check-button-label {

 color: #33353B;

 font-size: 12px;


}
.setting-window-image-check-card-wrapper .image-check-card-right-part .setting-image-check-group.setting-image-check-group-checked {

 border-color: #327DFF;


}
.setting-window-image-check-card-wrapper .image-check-card-right-part .setting-image-check-group.setting-image-check-group-checked .setting-image-check-button {

 -moz-appearance: none;

 appearance: none;

 -webkit-appearance: none;

 position: absolute;

 right: 4px;

 top: 4px;

 width: 18px;

 height: 18px;

 background: #327DFF;

 border-radius: 9px;

 display: inline-flex;

 align-items: center;

 justify-content: center;


}
.setting-window-image-check-card-wrapper .image-check-card-right-part .setting-image-check-group.setting-image-check-group-checked .setting-image-check-button:after {

 content: "";

 display: inline-flex;

 position: relative;

 top: -1px;

 width: 6px;

 height: 9px;

 border-bottom: 2px solid #fff;

 border-right: 2px solid #fff;

 transform: rotate(45deg);

 -webkit-transform: rotate(45deg);


}
.setting-window-image-check-card-wrapper .image-check-card-right-part .setting-image-check-group.setting-image-check-group0 {

 margin-right: 20px;


}
`;

export default styles;