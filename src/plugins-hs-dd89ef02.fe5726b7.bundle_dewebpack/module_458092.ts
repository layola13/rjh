const styles = `.mgm-modal {
            
 position: fixed;
            
 top: 0;
            
 left: 0;
            
 width: 100%;
            
 height: 100%;
            
 display: flex;
            
 justify-content: center;
            
 align-items: center;
            
 z-index: 1000;
            
 background-color: rgba(0, 0, 0, 0.5);
            

        }
.mgm-modal .mgm-content {
        
 min-width: 900px;
        
 width: 900px;
        
 height: 550px;
        
 border-radius: 10px;
        
 overflow: hidden;
        
 position: relative;
        
 background: white;
        

    }
.mgm-modal .mgm-content .close-btn {
    
 position: absolute;
    
 right: 30px;
    
 top: 30px;
    
 background: black;
    
 width: 30px;
    
 height: 30px;
    
 border-radius: 50%;
    
 display: flex;
    
 align-items: center;
    
 justify-content: center;
    
 cursor: pointer;
    

}
.mgm-modal .mgm-content .mgm-iframe {

 width: 100%;

 height: 100%;

 border: none;


}
@media screen and (max-width: 648px) {

 .mgm-modal .mgm-content {
    
 width: 94%;
    
 min-width: 94%;
    

}

}
`;

export default styles;