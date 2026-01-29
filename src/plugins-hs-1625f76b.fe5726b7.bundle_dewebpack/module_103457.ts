const cssContent = `.userguide {
            
 height: 100%;
            
 width: 100%;
            
 display: flex;
            
 flex-direction: column;
            

        }
.userguide .guideContainer {
        
 height: 400px;
        
 width: 100%;
        
 display: flex;
        
 flex-direction: row;
        
 justify-content: space-between;
        
 align-items: center;
        
 background-color: white;
        
 border: 1px solid #e3e3e3;
        
 padding: 20px 10px 10px;
        
 box-sizing: border-box;
        

    }
.userguide .guideContainer .guide {
    
 display: flex;
    
 flex-direction: column;
    
 align-items: center;
    
 width: 350px;
    

}
.userguide .guideContainer .guide .icon {

 height: 210px;

 width: 400px;

 margin-bottom: 10px;

 background-position: center;

 background-repeat: no-repeat;

 display: inline-block;

 background-color: transparent;

 background-size: 400px;


}
.userguide .guideContainer .guide .tip {

 margin-top: 20px;

 margin-bottom: 20px;

 min-height: 30px;


}
.userguide .guideContainer .guide .stateGroup {

 display: flex;

 flex-wrap: nowrap;


}
.userguide .guideContainer .guide .stateGroup > li {

 margin: 0px 2px;

 width: 6px;

 height: 6px;

 background-color: grey;

 border-radius: 50%;


}
.userguide .guideContainer .guide .stateGroup > li.active {

 background-color: #4d9bd6;


}
.userguide .guideContainer .arrow {

 width: 48px;

 height: 48px;


}
.userguide .footer {

 margin-top: 20px;


}
.userguide .footer .actionButton {

 width: 140px;


}
`;

export default cssContent;