interface CSSExports {
  push(item: [string, string]): void;
  id: string;
}

const cssContent: string = `.autostyler .btn {
            
 border-radius: 2px;
            
 padding: 4px 7px;
            
 margin: 0 5px;
            

        }
.autostyler .btn.btn-primary {
        
 background: #4d9bd6;
        

    }
.autostyler .btn.btn-primary:hover {
    
 background: #4d9bd6;
    

}
.autostyler .btn.btn-default {

 background: #fff;

 border: solid 1px #d9dbdf;


}
.autostyler .btn.btn-default:hover {

 background: #fff;

 border: solid 1px #4d9bd6;


}
.autostyler .modalCover {

 position: fixed;

 left: 0px;

 top: 0px;

 display: block;

 border: 0px;

 background-color: rgba(0, 0, 0, 0.3);

 width: 100%;

 height: 100%;

 margin: 0px;

 padding: 0px;

 cursor: auto;


}
.autostyler .autostylerWarningShow {

 border-color: red;


}
.autostyler .model-input {

 height: 36px !important;

 font-size: 14px !important;

 line-height: 36px !important;


}
.autostyler .model-select {

 height: 36px;

 line-height: 36px;

 font-size: 14px;

 width: 340px !important;


}
.autostyler .model-select .tp-select-container, 

.autostyler .model-select .tp-select-container-value {

 height: 36px;

 line-height: 36px;

 font-size: 14px;


}
.autostyler .model-select .tp-select-downicon {

 top: 12px;


}
.autostyler .pickImagePanel {

 position: fixed;

 z-index: 900;


}
.autostyler .pickImagePanel-footer {

 height: 100px;

 width: 100%;

 display: flex;

 box-sizing: border-box;

 padding: 20px 20px 10px 20px;

 align-items: center;

 justify-content: space-between;

 background: linear-gradient(to top, #ffffff 40%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));


}
.autostyler .pickImagePanel-footer-upload {

 width: 600px;


}
.autostyler .pickImagePanel-footer-buttons {

 width: 220px;

 display: flex;


}
.autostyler .pickImagePanel-footer-buttons .upload-picture-button {

 box-sizing: border-box;


}
.autostyler .pickImagePanel-footer-buttons .upload-picture-button-submit {

 margin-left: 20px;


}
.autostyler .pickImagePanel .mainPanel {

 overflow: hidden;

 position: fixed;

 margin: auto;

 left: 0px;

 right: 0px;

 top: 0px;

 bottom: 0px;

 width: 900px;

 height: 600px;

 background-color: #fff;

 color: #808080;

 display: block;

 cursor: auto;

 border: none;

 border-radius: 4px;

 box-shadow: 0px 1px 24px 0px rgba(74, 77, 83, 0.32);


}
.autostyler .pickImagePanel .mainPanel .headerwrap {

 background-color: #fff;

 height: 50px;

 line-height: 50px;

 padding: 0px;

 border-radius: 4px 4px 0px 0px;


}
.autostyler .pickImagePanel .mainPanel .headerwrap .title {

 font-size: 16px;

 color: #1c1c1c;

 display: block;

 padding-left: 20px;

 font-weight: 600;

 border-radius: 2px;


}
.autostyler .pickImagePanel .mainPanel .headerwrap .btn-close {

 background-color: rgba(0, 0, 0, 0);

 cursor: pointer;

 position: absolute;

 width: 16px;

 height: 16px;

 right: 15px;

 top: 18px;


}
.autostyler .pickImagePanel .mainPanel .headerwrap .btn-close svg {

 position: absolute;

 width: 15px;

 height: 15px;


}
.autostyler .pickImagePanel .mainPanel .waiting {

 display: block;

 position: absolute;

 margin: auto;

 border: 0px;

 width: 40px;

 height: 40px;

 padding: 0;

 left: 0px;

 right: 0px;

 top: 0px;

 bottom: 0px;

 animation: rotateit 1.1s linear infinite;


}
.autostyler .pickImagePanel .mainPanel .emptyShow {

 position: relative;

 height: 414px;

 display: flex;

 flex-direction: column;

 align-items: center;

 justify-content: center;

 padding: 18px;

 background-color: #fff;


}
.autostyler .pickImagePanel .mainPanel .emptyShow .emptyIcon {

 display: flex;

 width: 120px;

 height: 120px;

 position: relative;


}
.autostyler .pickImagePanel .mainPanel .emptyShow .emptyText {

 display: flex;

 position: relative;

 font-size: 12px;

 font-family: inherit;

 font-weight: 400;

 top: 21px;

 color: #808080;


}
.autostyler .pickImagePanel .mainPanel .emptyShow .emptyText .emptyHighlight {

 color: #4d9bd6;

 text-decoration: underline;

 cursor: pointer;


}
.autostyler .pickImagePanel .mainPanel .upload-picture {

 position: relative;

 left: 40px;

 display: inline-block;


}
.autostyler .pickImagePanel .mainPanel .upload-picture .upload-icon {

 background: url(UPLOAD_ICON_PATH);

 background-size: 20px 20px;

 width: 20px;

 height: 20px;

 position: absolute;


}
.autostyler .pickImagePanel .mainPanel .upload-picture .upload-name {

 font-weight: bold;

 color: #1c1c1c;

 font-size: 12px;

 margin-left: 30px;

 line-height: 20px;


}
`;

export default cssContent;