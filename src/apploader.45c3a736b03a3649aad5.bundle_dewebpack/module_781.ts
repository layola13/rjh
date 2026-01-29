const styles = `#login-root-dom {
        
 position: fixed;
        
 top: 0;
        
 left: 0;
        
 right: 0;
        
 bottom: 0;
        
 z-index: 11000;
        
 background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), #ffffff);
        
 backdrop-filter: blur(6px);
        

    }
#login-root-dom #homestyler-body {
    
 z-index: 11001;
    
 display: block;
    
 min-height: 500px;
    
 width: 858px;
    
 position: absolute;
    
 overflow: hidden;
    
 border-radius: 10px;
    
 background-color: #fff;
    
 box-shadow: 0 5px 50px 0 rgba(0, 0, 0, 0.1);
    
 left: 50%;
    
 top: 50%;
    
 transform: translate(-50%, -50%);
    

}
#login-root-dom #homestyler-body .left {

 display: block;

 float: left;

 width: 394px;

 position: relative;

 font-size: 0;


}
#login-root-dom #homestyler-body .left img {

 height: 100%;

 width: 394px;


}
#login-root-dom #homestyler-body .left .get-more-a {

 color: #108CFF;

 position: absolute;

 bottom: 35px;

 right: 162px;


}
#login-root-dom #homestyler-body .left .get-more-a .get-more-span {

 font-size: 14px;

 color: #108CFF;

 line-height: 20px;


}
#login-root-dom #homestyler-body .left .get-more-a .get-more-img {

 width: 18px;

 height: 18px;

 position: relative;

 left: 5px;

 top: 4px;


}
#login-root-dom #homestyler-body .right {

 float: right;

 width: 360px;

 margin-left: 196px;

 padding-top: 64px;

 box-shadow: none;

 position: absolute;

 top: 50%;

 left: 50%;

 min-height: 450px;

 max-width: 100%;

 min-width: 365px;

 -webkit-transform: translate(-50%, -50%);

 transform: translate(-50%, -50%);

 text-align: center;

 background: #fff;


}
#login-root-dom #homestyler-body .login-iframe {

 border-style: none;


}
#login-root-dom #logining-popup {

 position: absolute;

 z-index: 11001;

 left: 50%;

 top: 50%;

 transform: translate(-50%, -50%);

 min-height: 500px;

 width: 390px;

 border-radius: 10px;

 background-color: #fff;

 box-shadow: #aaa 0 0 20px 0;


}
#login-root-dom #logining-popup #main .left .left-bg {

 height: 100%;

 width: 390px;


}
#login-root-dom #logining-popup #main .left .get-more-a {

 color: #108CFF;

 z-index: 11002;

 position: absolute;

 bottom: 35px;

 right: 162px;


}
#login-root-dom #logining-popup #main .left .get-more-a .get-more-span {

 font-size: 14px;

 color: #108CFF;

 line-height: 20px;


}
#login-root-dom #logining-popup #main .left .get-more-a .get-more-img {

 height: 18px;

 position: relative;

 left: 5px;

 top: 4px;


}
#login-root-dom #logining-popup #main .right {

 position: absolute;

 top: 50%;

 left: 50%;

 z-index: 11001;

 width: 360px;

 min-height: 477px;

 transform: translate(-50%, -50%);

 text-align: center;

 box-shadow: none;


}
#login-root-dom #logining-popup #main .right .title {

 margin-bottom: 22px;

 line-height: 32px;

 font-size: 20px;

 color: #333;

 font-weight: 500;


}
#login-root-dom #logining-popup #main .right .taobao-loginBtn {

 box-sizing: content-box;

 width: 242px;

 height: 17px;

 padding: 10px 14px;

 margin: 0 auto;

 cursor: pointer;

 border-radius: 4px;

 display: inline-block;

 font-size: 15px;

 transition: all 0.2s;

 color: #ff4300;

 background: #fff;

 border: 1px solid #ff4300;

 outline: none;


}
#login-root-dom #logining-popup #main .right .taobao-loginBtn:hover {

 transition: all 0.1s;

 color: #ffffff;

 background: #F52B00 !important;


}
#login-root-dom #logining-popup #main .right .taobao-login-content {

 padding: 10px 14px;

 margin: 0 auto;

 width: 280px;

 border-radius: 4px;

 display: inline-block;

 font-size: 15px;

 transition: all 0.2s;

 color: #ff4300;

 background: #fff;

 border: 1px solid #ff4300;

 outline: none;

 line-height: 25px;


}
#login-root-dom #logining-popup-tip {

 left: 50%;

 top: 50%;

 transform: translate(-50%, -50%);

 display: block;

 min-height: 330px;

 width: 505px;

 position: absolute;

 overflow: hidden;

 border-radius: 10px;

 background-color: #fff;

 box-shadow: #aaa 0 0 20px 0;


}
#login-root-dom #logining-popup-tip #main {

 text-align: center;

 padding: 76px 108px;


}
#login-root-dom #logining-popup-tip #main .img {

 margin-bottom: 16px;


}
#login-root-dom #logining-popup-tip #main .content {

 color: #3C3C3C;

 font-size: 14px;

 line-height: 20px;


}
`;

export default styles;