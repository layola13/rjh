const styles = `.teaching-ability-button-container {
            
 height: 100%;
            
 margin-left: 4px;
            
 position: relative;
            

        }
.teaching-ability-button-container .teaching-ability-button-wrapper {
        
 position: relative;
        
 background-color: unset;
        
 pointer-events: auto;
        
 height: 100%;
        
 display: inline-flex;
        
 align-items: center;
        
 justify-content: center;
        
 box-sizing: border-box;
        

    }
.teaching-ability-button-container .teaching-ability-button-wrapper .button {
    
 cursor: pointer;
    
 height: 30px;
    
 border-radius: 15px;
    
 line-height: 30px;
    
 padding: 0 6px;
    
 display: flex;
    
 align-items: center;
    
 justify-content: center;
    

}
.teaching-ability-button-container .teaching-ability-button-wrapper .button .title {

 font-size: 12px;

 margin-left: 4px;

 transition: all 300ms linear;


}
.teaching-ability-button-container .teaching-ability-button-wrapper.teaching-light .button:hover {

 background-color: #f5f5f5;


}
.teaching-ability-button-container .teaching-ability-button-wrapper.teaching-light .button .menu-arrow {

 color: #1c1c1c;


}
.teaching-ability-button-container .teaching-ability-button-wrapper.teaching-light .button .title {

 color: #33353b;


}
.teaching-ability-button-container .teaching-ability-button-wrapper.teaching-black .button:hover {

 background-color: rgba(255, 255, 255, 0.04);


}
.teaching-ability-button-container .teaching-ability-button-wrapper.teaching-black .button:hover .title {

 color: #fff;


}
.teaching-ability-button-container .teaching-ability-button-wrapper.teaching-black .button .menu-arrow {

 color: rgba(255, 255, 255, 0.86);


}
.teaching-ability-button-container .teaching-ability-button-wrapper.teaching-black .button .title {

 color: rgba(255, 255, 255, 0.66);


}
`;

export default styles;