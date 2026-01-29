const cssContent = `.popover-container {
            
 width: 224px;
            
 background-color: #000000;
            
 box-sizing: border-box;
            
 position: absolute;
            
 top: 40px;
            
 right: -10px;
            
 border-radius: 6px;
            
 padding-bottom: 12px;
            

        }
.popover-container * {
        
 box-sizing: border-box;
        

    }
.popover-container .header {
    
 height: 6px;
    
 border-top-right-radius: 6px;
    
 border-top-left-radius: 6px;
    

}
.popover-container .header .angle {

 position: absolute;

 top: -11px;

 right: 18px;

 display: inline-block;

 border-width: 6px;

 border-style: solid;

 border-color: transparent transparent #F41855 transparent;


}
.popover-container .content-main {

 color: white;

 font-size: 12px;

 padding: 6px 10px 12px;


}
.popover-container .content-main .title-container {

 height: 25px;

 line-height: 25px;

 font-size: 16px;

 font-weight: bold;


}
.popover-container .content-main .title-container .title {

 display: inline-block;

 max-width: 170px;

 overflow: hidden;

 text-overflow: ellipsis;

 white-space: nowrap;


}
.popover-container .content-main .title-container .popover-container-close {

 float: right;

 margin-top: 4px;


}
.popover-container .content-main .content {

 line-height: 16px;

 color: #bebebe;

 margin-top: 4px;


}
.popover-container .content-main .btn-in-popover {

 min-width: 122px;

 padding: 0 9px;

 height: 22px;

 line-height: 22px;

 margin-top: 14px;

 text-align: center;

 border-radius: 11px;

 cursor: pointer;

 float: right;


}
`;

export default cssContent;