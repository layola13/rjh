const styles = `.opendesign-pagination {
            
 height: 25px;
            
 width: 100%;
            
 display: flex;
            
 justify-content: flex-end;
            
 align-items: center;
            
 box-sizing: border-box;
            
 position: relative;
            
 margin: 12px 0 0 0;
            
 padding: 0;
            

        }
.opendesign-pagination.hide {
        
 visibility: hidden;
        

    }
.opendesign-pagination .prev-button, 
.opendesign-pagination .next-button {
    
 position: relative;
    
 width: 20px;
    
 height: 20px;
    
 box-sizing: border-box;
    
 background: transparent;
    
 border-radius: 50%;
    
 margin: 0 6px;
    
 display: flex;
    
 align-items: center;
    
 justify-content: center;
    
 font-size: 12px;
    

}
.opendesign-pagination .prev-button:hover, 
.opendesign-pagination .next-button:hover {

 cursor: pointer;

 background: rgba(0, 0, 0, 0.04);


}
.opendesign-pagination .prev-button:active, 
.opendesign-pagination .next-button:active {

 color: #1C1C1C;

 background: rgba(0, 0, 0, 0.04);


}
.opendesign-pagination .page-item.current {

 color: #33353B;

 font-weight: 600;


}
.opendesign-pagination .prev-button.disable, 
.opendesign-pagination .next-button.disable {

 cursor: default;

 color: #d8d8d8;


}
.opendesign-pagination .prev-button.disable:hover, 
.opendesign-pagination .next-button.disable:hover {

 background: transparent;


}
.opendesign-pagination .prev-button.disable:active, 
.opendesign-pagination .next-button.disable:active {

 color: #d8d8d8;

 background: transparent;


}
.opendesign-pagination .page-item {

 height: 20px;

 border-radius: 50%;

 line-height: 20px;

 min-width: 20px;

 max-width: 42px;

 padding: 0 4px;

 margin: 1px 6px;

 background: transparent;

 box-sizing: border-box;

 font-size: 14px;

 font-weight: 200;

 color: #60646F;

 cursor: pointer;


}
.opendesign-pagination .page-item:hover {

 background: rgba(0, 0, 0, 0.04);


}
.opendesign-pagination .page-item:active {

 background: rgba(0, 0, 0, 0.04);

 font-weight: 600;

 color: #33353B;


}
.opendesign-pagination .ellipsis-icon {

 margin: 1px 6px;

 width: 14px;

 display: flex;

 justify-content: center;

 align-items: center;

 color: #60646F;

 font-size: 14px;


}
`;

export default styles;