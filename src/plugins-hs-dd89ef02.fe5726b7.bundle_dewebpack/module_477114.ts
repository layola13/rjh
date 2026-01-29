const styles = `.setting-window-item-select-card-wrapper {
            
 display: flex;
            
 height: 54px;
            
 width: 100%;
            
 flex-direction: row;
            
 justify-content: space-between;
            
 align-items: center;
            
 box-sizing: border-box;
            

        }
.setting-window-item-select-card-wrapper .item-select-card-left-part {
        
 display: inline-flex;
        
 font-size: 14px;
        
 flex-direction: column;
        
 align-self: center;
        

    }
.setting-window-item-select-card-wrapper .item-select-card-left-part .item-select-card-title {
    
 font-size: 14px;
    
 color: #33353B;
    
 font-weight: bold;
    

}
.setting-window-item-select-card-wrapper .item-select-card-left-part .item-select-card-sub-title {

 font-size: 12px;

 color: #60646F;

 margin-top: 9px;


}
.setting-window-item-select-card-wrapper .item-select-card-right-part {

 display: inline-flex;


}
.setting-window-item-select-card-wrapper .item-select-card-right-part .item-select-card-items-wrapper .item-select-card-items {

 display: inline-flex;

 align-items: center;

 justify-content: flex-start;

 flex-direction: row;

 flex-wrap: wrap;


}
.setting-window-item-select-card-wrapper .item-select-card-right-part .item-select-card-items-wrapper .item-select-card-items .item-select-card-item {

 width: 18px;

 height: 18px;

 margin-right: 6px;

 box-sizing: border-box;

 background-repeat: no-repeat;

 position: relative;

 border-radius: 3px;

 cursor: pointer;


}
.setting-window-item-select-card-wrapper .item-select-card-right-part .item-select-card-items-wrapper .item-select-card-items .item-select-card-item:not(.item-select-card-item-li) {

 border: 1px solid #E8EBF2;


}
.setting-window-item-select-card-wrapper .item-select-card-right-part .item-select-card-items-wrapper .item-select-card-items .item-select-card-item.item-select-card-item-li {

 height: 100%;

 width: 100%;


}
.setting-window-item-select-card-wrapper .item-select-card-right-part .item-select-card-items-wrapper .item-select-card-items .item-select-card-item.item-select-card-item-selected {

 border-color: #327DFF;

 padding: 1px;


}
.setting-window-item-select-card-wrapper .item-select-card-right-part .item-select-card-items-wrapper .item-select-card-items .item-select-card-item .item-select-card-check-button {

 position: absolute;

 width: 12px;

 height: 12px;

 background: #327DFF;

 border-radius: 6px;

 display: inline-flex;

 align-items: center;

 justify-content: center;

 top: -5px;

 right: -7px;

 z-index: 1;


}
.setting-window-item-select-card-wrapper .item-select-card-right-part .item-select-card-items-wrapper .item-select-card-items .item-select-card-item .item-select-card-check-button:after {

 content: "";

 display: inline-flex;

 position: relative;

 width: 4px;

 height: 5px;

 top: -2px;

 border-bottom: 1px solid #fff;

 border-right: 1px solid #fff;

 transform: rotate(45deg);

 -webkit-transform: rotate(45deg);


}
`;

export default styles;