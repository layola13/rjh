const cssContent = `.cardviewer {
            
 z-index: 1001;
            
 position: absolute;
            
 border-radius: 8px 8px 8px 8px;
            
 box-shadow: 0px 2px 4px 0px rgba(25, 25, 30, 0.15);
            
 background-color: #FFFFFF;
            
 color: #484848;
            
 width: 240px;
            

        }
.cardviewer.customearrow.right > .arrow, 
.cardviewer.customearrow.left > .arrow {
        
 top: 16px !important;
        

    }
.cardviewer .viewerheader .headerwrap {
    
 height: 20px;
    
 padding: 10px;
    
 display: flex;
    
 justify-content: space-between;
    

}
.cardviewer .viewerheader .headerwrap .titlewrap {

 font-size: 14px;

 line-height: 20px;

 color: #484848;

 font-family: 'PingFangSC-Medium';


}
.cardviewer .viewerheader .headerwrap .closecard {

 color: #808080;

 cursor: pointer;

 padding-top: 3px;


}
.cardviewer .viewerheader .headerwrap .closecard img {

 width: 16px;

 height: 16px;


}
.cardviewer .viewerheader .headerwrap .closecard .hover-img {

 display: none;


}
.cardviewer .viewerbody {

 position: relative;


}
.cardviewer .actionbuttons {

 display: block;

 margin-bottom: 10px;

 margin-top: 10px;


}
.cardviewer .actionbuttons button {

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
.cardviewer .actionbuttons button:hover {

 background-color: #55acee;


}
.cardviewer .actionbuttons button:active {

 color: #fff;


}
.cardviewer .actionbuttons a {

 font-size: 0.75em;

 color: #909090;

 cursor: pointer;

 margin-left: 15px;

 text-decoration: none;

 display: inline-block;

 height: 30px;

 line-height: 30px;


}
.cardviewer .actionbuttons a:hover {

 color: #4d9bd6;


}
.cardviewer .containerview {

 line-height: 1.25em;

 font-size: 1em;

 position: relative;

 overflow: hidden;

 min-height: 50px;

 max-height: 250px;

 padding: 0px;


}
.cardviewer .containerview .pitem {

 transition: all 0.5s ease-out;

 width: 240px;

 float: left;

 display: inline-block;

 position: relative;

 left: 0;


}
.cardviewer .containerview .strctn {

 margin: 8px 10px;

 font-size: 12px;

 font-family: 'PingFang-SC-Regular';


}
.cardviewer .containerview .imgctn, 
.cardviewer .containerview .videoctn {

 position: relative;

 padding: 0px 10px;


}
.cardviewer .containerview img, 
.cardviewer .containerview video {

 width: 100%;

 height: 130px;

 background-color: transparent !important;


}
.cardviewer .containerview .playbutton {

 display: none;


}
.cardviewer .containerview a.videobtns {

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
.cardviewer .containerview a.videobtns:hover {

 background-color: rgba(77, 155, 214, 0.8);


}
.cardviewer .paginationview {

 height: 20px;

 margin: 5px auto;


}
.cardviewer .paginationview ul {

 display: flex;

 align-content: center;

 align-items: center;

 justify-content: center;


}
.cardviewer .paginationview ul .paginationitem {

 padding: 0px 10px;

 float: left;

 overflow: hidden;

 cursor: pointer;

 margin: 0px 2px;


}
.cardviewer .paginationview ul .paginationitem .dotbutton {

 width: 8px;

 height: 8px;

 background-color: #808080;

 border-radius: 10px;

 display: inline-block;


}
.cardviewer .paginationview ul .paginationitem.actived .dotbutton {

 background-color: transparent;

 border: 2px solid #3085c4;


}
.cardviewer .paginationview ul .paginationitem:hover .dotbutton {

 background-color: #3085c4;


}
.cardviewer .paginationview ul .arrowbtn {

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
.cardviewer .paginationview ul .arrowbtn.prev-page {

 left: 0px;


}
.cardviewer .paginationview ul .arrowbtn.next-page {

 right: 0px;

 transform: rotate(180deg);


}
.cardviewer .paginationview ul .arrowbtn:hover {

 background-color: rgba(77, 155, 214, 0.8);


}
.cardviewer .paginationview ul .arrowbtn svg {

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