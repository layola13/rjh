const cssContent = `.cardvieweritem {
            
 z-index: 1001;
            
 position: absolute;
            
 border-radius: 4px 4px 4px 4px;
            
 box-shadow: 0px 1px 8px rgba(38, 40, 43, 0.4);
            
 background-color: #fbfbfb;
            
 color: #808080;
            
 border: 1px solid #dddee3;
            
 width: 230px;
            

        }
.cardvieweritem.customearrow.right > .arrow, 
.cardvieweritem.customearrow.left > .arrow {
        
 top: 16px !important;
        

    }
.cardvieweritem .headerwrap {
    
 font-size: 0.875em;
    
 text-indent: 15px;
    
 height: 33px;
    
 line-height: 33px;
    
 border-bottom: 1px solid rgba(221, 219, 219, 0.42);
    

}
.cardvieweritem .viewerbody {

 position: relative;


}
.cardvieweritem .viewerbody:after {

 content: '';

 width: 100%;

 height: 100%;

 position: absolute;

 left: 0;

 top: 0;

 pointer-events: none;

 background-image: linear-gradient(0deg, #ffffff 0%, rgba(255, 255, 255, 0) 21px);


}
.cardvieweritem .closecard {

 position: absolute;

 right: 10px;

 top: 7px;

 color: #808080;

 cursor: pointer;


}
.cardvieweritem .actionbuttons {

 display: block;

 margin-bottom: 10px;

 margin-top: 10px;


}
.cardvieweritem .actionbuttons button {

 height: 28px;

 font-size: 0.75em;

 color: #fff;

 overflow: hidden;

 text-overflow: ellipsis;

 white-space: nowrap;

 width: 78px;

 border-radius: 2px 2px 2px 2px;

 background-color: #4d9bd6;

 border: 1px solid #3085c4;

 float: right;

 margin-right: 15px;

 margin-bottom: 10px;


}
.cardvieweritem .actionbuttons button:hover {

 background-color: #55acee;


}
.cardvieweritem .actionbuttons button:active {

 color: #fff;


}
.cardvieweritem .actionbuttons a {

 font-size: 0.75em;

 color: #909090;

 cursor: pointer;

 margin-left: 15px;

 text-decoration: none;

 display: inline-block;

 height: 30px;

 line-height: 30px;


}
.cardvieweritem .actionbuttons a:hover {

 color: #4d9bd6;


}
.cardvieweritem .containerview {

 line-height: 1.25em;

 font-size: 1em;

 position: relative;

 overflow: hidden;

 min-height: 50px;

 max-height: 250px;

 padding: 0px;

 margin-bottom: 10px;


}
.cardvieweritem .containerview .pitem {

 transition: all 0.5s ease-out;

 width: 230px;

 float: left;

 display: inline-block;

 position: relative;

 left: 0;


}
.cardvieweritem .containerview .strctn {

 margin: 10px 15px;

 font-size: 0.75em;


}
.cardvieweritem .containerview .imgctn, 
.cardvieweritem .containerview .videoctn {

 position: relative;


}
.cardvieweritem .containerview img, 
.cardvieweritem .containerview video {

 width: 100%;

 background-color: transparent !important;


}
.cardvieweritem .containerview .playbutton {

 display: none;


}
.cardvieweritem .containerview a.videobtns {

 position: absolute;

 top: 50%;

 width: 40px;

 height: 40px;

 left: 50%;

 margin-left: -20px;

 margin-top: -20px;

 background-color: rgba(52, 58, 64, 0.6);

 border: 1px solid rgba(255, 255, 255, 0.6);

 border-radius: 100% 100% 100% 100%;

 cursor: pointer;


}
.cardvieweritem .containerview a.videobtns:hover {

 background-color: rgba(77, 155, 214, 0.8);


}
.cardvieweritem .paginationview {

 height: 20px;

 margin: 5px auto;


}
.cardvieweritem .paginationview ul {

 display: flex;

 align-content: center;

 align-items: center;

 justify-content: center;


}
.cardvieweritem .paginationview ul .paginationitem {

 padding: 0px 10px;

 float: left;

 overflow: hidden;

 cursor: pointer;

 margin: 0px 2px;


}
.cardvieweritem .paginationview ul .paginationitem .dotbutton {

 width: 8px;

 height: 8px;

 background-color: #808080;

 border-radius: 10px;

 display: inline-block;


}
.cardvieweritem .paginationview ul .paginationitem.actived .dotbutton {

 background-color: transparent;

 border: 2px solid #3085c4;


}
.cardvieweritem .paginationview ul .paginationitem:hover .dotbutton {

 background-color: #3085c4;


}
.cardvieweritem .paginationview ul .arrowbtn {

 cursor: pointer;

 position: absolute;

 top: 45%;

 width: 15px;

 height: 20px;

 background-color: rgba(114, 114, 114, 0.8);

 color: #fff;

 line-height: 20px;

 text-align: center;

 margin-top: -7px;


}
.cardvieweritem .paginationview ul .arrowbtn.prev-page {

 left: 0px;


}
.cardvieweritem .paginationview ul .arrowbtn.next-page {

 right: 0px;

 transform: rotate(180deg);


}
.cardvieweritem .paginationview ul .arrowbtn:hover {

 background-color: rgba(77, 155, 214, 0.8);


}
.cardvieweritem .paginationview ul .arrowbtn svg {

 position: relative;

 top: 50%;

 transform: translateY(-50%);


}
.fixedheight .containerview {

 max-height: 260px;

 height: 260px;


}
.highlighticon svg path {

 fill: #4d9bd6 !important;


}
.highlightcontainer {

 box-sizing: border-box;

 -moz-box-sizing: border-box;

 -webkit-box-sizing: border-box;

 background-color: rgba(85, 172, 238, 0.149) !important;

 border: 1px solid #03a9f4 !important;

 border-radius: 2px 2px 2px 2px;


}
`;

export default cssContent;