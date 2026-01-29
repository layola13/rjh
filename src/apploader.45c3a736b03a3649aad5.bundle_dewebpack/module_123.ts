const cssContent = `.wrapper_check_internal_network_box {
        
 position: fixed;
        
 justify-content: center;
        
 top: 0px;
        
 margin-left: -209px;
        
 z-index: 10000000;
        

    }
.wrapper_check_internal_network_box .message_content {
    
 display: flex;
    
 align-items: center;
    
 padding: 0 8px;
    
 min-height: 42px;
    
 min-width: 160px;
    
 color: #ffffff;
    
 background: #ff5300;
    
 border-radius: 8px;
    
 pointer-events: all;
    
 position: relative;
    
 box-shadow: 0px 4px 16px 0px rgba(51, 53, 59, 0.15);
    

}
.wrapper_check_internal_network_box .message_content .msg_content_tip {

 display: inline-block;

 color: #ffffff;

 min-width: 10px;

 font-size: 14px;

 margin-left: 8px;


}
.wrapper_check_internal_network_box .animation {

 -webkit-animation: twinkling 2.1s infinite ease-in-out;

 animation: twinkling 2.1s infinite ease-in-out;

 -webkit-animation-fill-mode: both;

 animation-fill-mode: both;


}
@-webkit-keyframes twinkling {

 0% {
    
 opacity: 1;
    
 filter: alpha(opacity=20);
    
 -webkit-transform: scale(1);
    

}

 50% {

 opacity: 1;

 filter: alpha(opacity=50);

 -webkit-transform: scale(1.12);


}

 100% {

 opacity: 1;

 filter: alpha(opacity=20);

 -webkit-transform: scale(1);


}


}
@keyframes twinkling {

 0% {
    
 opacity: 1;
    
 filter: alpha(opacity=20);
    
 -webkit-transform: scale(1);
    

}

 50% {

 opacity: 1;

 filter: alpha(opacity=50);

 -webkit-transform: scale(1.12);


}

 100% {

 opacity: 1;

 filter: alpha(opacity=20);

 -webkit-transform: scale(1);


}


}
.fix_tips {

 margin-left: -88px;

 animation-name: circle-roll, small;

 animation-duration: 1000ms;

 animation-timing-function: cubic-bezier(0.38, 0, 0.25, 1);

 animation-delay: 0s, 5s;

 animation-iteration-count: 5, 1;

 transition: all ease 0.5s;


}
.fix_tips .message_content {

 min-height: 29px;

 min-width: 143px;

 border-radius: 4px;


}
.fix_tips .message_content #msg_content_internalnet_left {

 cursor: pointer;

 font-size: 15px;

 color: #fff;

 font-size: 12px;

 padding: 0 5px;

 border-radius: 8px;


}
.fix_tips .message_content #msg_content_internalnet_left:hover {

 background: #da6d38;


}
.fix_tips .message_content .msg_content_tip {

 font-size: 12px;

 margin-left: 0px;

 padding: 0px 4px;


}
.fix_tips .message_content #msg_content_internalnet_right {

 cursor: pointer;

 font-size: 15px;

 color: #fff;

 font-size: 12px;

 padding: 0 5px;

 border-radius: 8px;


}
.fix_tips .message_content #msg_content_internalnet_right:hover {

 background: #da6d38;


}
`;

export default cssContent;