const CSS_CONTENT = `.block-align-container {
            
 display: flex;
            
 justify-content: space-between;
            
 align-items: center;
            

        }
.block-align-container .block-align-label {
        
 color: #888888;
        
 font-size: 12px;
        

    }
.block-align-container .block-align {
    
 position: relative;
    
 border-radius: 4px;
    

}
.block-align-container .block-align .block {

 background-color: #F5F8FD;

 border: 1px solid #DCDCE1;

 width: 33%;

 height: 33%;

 overflow: hidden;

 position: absolute;

 color: #396EFE;

 font-size: 11px;


}
.block-align-container .block-align .block span {

 position: absolute;


}
.block-align-container .block-align .disabled {

 opacity: 0.3;


}
.block-align-container .block-align .leftTop {

 left: 0;

 top: 0;

 border-top-left-radius: 4px;


}
.block-align-container .block-align .centerTop {

 left: 33%;

 top: 0;


}
.block-align-container .block-align .rightTop {

 left: 66%;

 top: 0;

 border-top-right-radius: 4px;


}
.block-align-container .block-align .leftMiddle {

 left: 0;

 top: 33%;


}
.block-align-container .block-align .centerMiddle {

 left: 33%;

 top: 33%;


}
.block-align-container .block-align .rightMiddle {

 left: 66%;

 top: 33%;


}
.block-align-container .block-align .leftBottom {

 left: 0;

 top: 66%;

 border-bottom-left-radius: 4px;


}
.block-align-container .block-align .centerBottom {

 left: 33%;

 top: 66%;


}
.block-align-container .block-align .rightBottom {

 left: 66%;

 top: 66%;

 border-bottom-right-radius: 4px;


}
.block-align-container .block-align .center-box {

 width: 100%;

 height: 100%;

 background-color: #396EFE;


}
.block-align-container__small .block-align {

 height: 40px;

 width: 40px;

 margin-right: 10px;


}
.block-align-container__large {

 height: 72px;


}
.block-align-container__large .block-align {

 height: 64px;

 width: 64px;

 margin-right: 0px;


}
`;

export default CSS_CONTENT;