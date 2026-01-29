const styles = `.action_container {
            
 display: flex;
            
 justify-content: flex-end;
            
 align-items: flex-end;
            
 height: 200px;
            

        }
.action_container .itemWrapper {
        
 position: relative;
        

    }
.action_container .itemWrapper .vipIcon {
    
 width: 23px;
    
 height: 18px;
    
 position: absolute;
    
 top: -4px;
    
 right: 2px;
    
 z-index: 1;
    

}
.action_container .itemWrapper .action_item {

 display: flex;

 align-items: center;

 justify-content: center;

 min-width: 36px;

 height: 36px;

 padding: 0 8px;

 box-sizing: border-box;

 margin-right: 12px;

 border-radius: 18px;

 background-color: white;

 pointer-events: fill;

 opacity: 0.6;


}
.action_container .itemWrapper .action_item:hover {

 opacity: 0.8;


}
.action_container .itemWrapper .action_item .action_item_icon {

 width: 16px;

 margin-left: 8px;

 height: 100%;

 display: flex;

 align-items: center;


}
.action_container .itemWrapper .unable {

 opacity: 0.3;


}
.action_container .itemWrapper .unable:hover {

 opacity: 0.3;


}
.containerTip.homestyler-ui-components.homestyler-popover-item .homestyler-popover-content {

 padding: 0;


}
`;

export default styles;