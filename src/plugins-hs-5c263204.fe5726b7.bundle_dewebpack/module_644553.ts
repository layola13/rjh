const styles = `.guideloadingWrapper {
            
 position: fixed;
            
 top: 0;
            
 left: 0;
            
 right: 0;
            
 bottom: 0;
            
 z-index: 1030;
            
 pointer-events: auto;
            
        }
.guideloadingWrapper .guideloading {
        
 position: absolute;
        
 top: calc(((100% - 560px) / 2) + 285px);
        
 left: calc(((100% - 840px) / 2) + 238px);
        
 width: 600px;
        
 height: 250px;
        
 background: #fff;
        
    }
.guideloadingWrapper .guideloading .image {
    
 display: block;
    
 width: 148px;
    
 margin: 0 auto;
    
}
`;

export default styles;