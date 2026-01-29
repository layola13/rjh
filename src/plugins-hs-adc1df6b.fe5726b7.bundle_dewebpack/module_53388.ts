const cssContent = `.roof-dialog-wrapper .roof-dialog-main {
            
 background-color: #fff;
            
 color: #000;
            

        }
.roof-dialog-wrapper .roof-dialog-main .roof-dialog-title {
        
 color: #33353B;
        

    }
.roof-dialog-wrapper .roof-dialog-main .roof-dialog-close-btn {
    
 font-size: 20px;
    

}
.roof-dialog-wrapper .roof-dialog-main .roof-dialog-close-btn .anticon {

 color: #000 !important;


}
.roof-dialog-wrapper .roof-dialog-main {

 width: 500px;

 height: 309px;

 z-index: 3050;

 top: 50%;

 left: 50%;

 position: absolute;

 transform: translate(-50%, -50%);

 box-sizing: content-box;

 display: flex;

 align-items: center;

 border-radius: 10px;

 flex-direction: column;


}
.roof-dialog-wrapper .roof-dialog-main .roof-dialog-head {

 display: flex;

 align-items: center;

 justify-content: space-between;

 width: calc(100% - 60px);

 padding: 11px 40px;

 margin-top: 10px;


}
.roof-dialog-wrapper .roof-dialog-main .roof-dialog-head .roof-dialog-title {

 font-weight: bold;

 font-size: 22px;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container {

 display: grid;

 grid-template-rows: auto 1fr;

 width: calc(100% - 60px);

 height: 168px;

 border-radius: 5px;

 border: #EAECF1 1px solid;

 margin-top: 4px;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container .roof-sub-title {

 display: flex;

 flex-direction: column;

 justify-content: center;

 background-color: #f2f2f2;

 width: 100%;

 height: 40px;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container .roof-sub-title .roof-choose-name {

 font-family: 'PingFangSC-Regular';

 font-size: 14px;

 margin-left: 14px;

 color: #60646f;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container .roof-checkbox-container {

 overflow: auto;

 width: 100%;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container .roof-checkbox-container::-webkit-scrollbar-thumb {

 border-radius: 4px;

 background-color: #dcdce1;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container .roof-checkbox-container::-webkit-scrollbar {

 width: 4px;

 height: 5px;

 border-radius: 4px;

 padding-left: 1px;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container .roof-checkbox-container::-webkit-scrollbar-track {

 border-radius: 20px;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container .roof-checkbox-container .checkbox-item {

 display: flex;

 flex-direction: column;

 justify-content: center;

 margin-left: 14px;

 width: calc(100% - 30px);

 height: 36px;

 border-bottom: #EAECF1 1px solid;


}
.roof-dialog-wrapper .roof-dialog-main .roof-choose-container .roof-checkbox-container .checkbox-item .roof-checkbox {

 width: 100%;

 margin-left: -6px;


}
.roof-dialog-wrapper .roof-dialog-main .roof-dialog-footer {

 display: flex;

 align-items: center;

 justify-content: flex-end;

 width: calc(100% - 60px);

 height: 36px;

 padding: 0 7px;

 margin-top: 17px;


}
.roof-dialog-wrapper .roof-dialog-main .roof-dialog-footer .roof-dialog-save-button {

 min-width: 100px;

 width: auto;

 height: 36px;

 font-weight: bold;

 font-size: 13px;

 border-radius: 18px;

 background-color: #007BFF;

 color: #fff;

 cursor: pointer;

 margin-top: 7px;

 margin-bottom: 7px;


}
.roof-dialog-wrapper .roof-dialog-overLay {

 position: fixed;

 width: 100%;

 height: 100%;

 visibility: visible;

 top: 0;

 left: 0;

 z-index: 3002;

 opacity: 1;

 background-color: rgba(0, 0, 0, 0.3);

 transition: all 0.3s;


}
.draw-roof-container {

 position: absolute;

 width: 100%;

 height: 100%;


}
`;

export default cssContent;