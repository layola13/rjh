const cssContent = `.fullScreenLoading {
            
 position: fixed;
 left: 0px;
 top: 0px;
 display: block;
 border: none;
 background-color: rgba(25, 25, 30, 0.65);
 width: 100%;
 height: 100%;
 margin: 0px;
 padding: 0px;
 cursor: default;
 z-index: 9999;
 -moz-user-select: none;
 -webkit-user-select: none;
 -ms-user-select: none;

}
.fullScreenLoading .loadingIcon {
        
 position: absolute;
 display: block;
 margin: auto;
 left: 0px;
 right: 0px;
 top: 0px;
 bottom: 0px;
 width: 144px;
 height: 180px;
 padding: 0px 0px 64px 0px;
 border: none;
 cursor: inherit;
 z-index: 0;

    }
.fullScreenLoading .loadingText {
    
 position: absolute;
 display: block;
 margin: auto;
 left: 0px;
 right: 0px;
 top: -120px;
 bottom: 0px;
 width: 100%;
 height: 24px;
 padding: 190px 0px 0px 5px;
 border: none;
 cursor: inherit;
 background: rgba(0, 0, 0, 0);
 color: black;
 font-size: 16px;
 font-family: inherit;
 font-weight: normal;
 text-align: center;
 white-space: nowrap;
 z-index: 1;

}
.fullScreenLoading .container {

 width: auto;
 height: 111px;
 margin: 0;
 top: 50%;
 left: 50%;
 border-radius: 10px;
 position: absolute;
 transform: translate(-50%, -50%);
 text-align: center;
 background: #FFFFFF;
 box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);

}
.fullScreenLoading .container .info {

 top: 0px;
 left: 8px;
 height: 76px;
 position: relative;
 display: inline-block;

}
.fullScreenLoading .container .info .main {

 margin-bottom: 10px;
 text-align: left;
 font-size: 18px;
 font-weight: 600;
 font-family: 'AlibabaPuHuiTi-Bold';
 color: #33353B;

}
.fullScreenLoading .container .info .extra {

 height: 12px;
 font-size: 12px;
 font-family: 'AlibabaPuHuiTi-Regular';
 color: #888888;
 text-align: left;

}
.global-en .fullScreenLoading .container .info .extra {

 max-width: 320px;

}
.fullScreenLoading .container .info .loading-bar {

 position: relative;
 bottom: -15px;

}
.fullScreenLoading .container .info .loading-bar .loading-progress {

 width: 100px;
 display: inline-block;
 margin-right: 8px;

}
.fullScreenLoading .container .icon {

 width: 76px;
 height: 76px;
 display: inline-block;
 position: relative;
 top: 17px;

}
.global-en .fullScreenLoading .container .icon {

 overflow: hidden;

}
`;

export default cssContent;