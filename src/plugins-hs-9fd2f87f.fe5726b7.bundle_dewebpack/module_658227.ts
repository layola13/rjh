const cssContent = `.clearfloat:after {
            
 display: block;
 clear: both;
 content: "";
 visibility: hidden;
 height: 0;
 
        }
.clearfloat {
        
 zoom: 1;
        
    }
.fl {
    
 float: left;
    
}
.fr {

 float: right;

}
.box-sizing {

 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;

}
.diyFilesUploaderContainer {

 display: flex;
 align-content: center;
 align-items: center;
 justify-content: center;
 height: auto;
 padding-bottom: 34px;
 flex-direction: column;

}
.diyFilesUploaderContainer .fileProcesser {

 display: flex;
 align-content: center;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 height: 100%;
 width: 100%;
 padding-top: 200px;

}
.diyFilesUploaderContainer .fileProcesser .picture-name {

 margin-bottom: 10px;

}
.diyFilesUploaderContainer .removeFileProcesser {

 align-items: flex-start;
 justify-content: flex-start;
 width: 420px;
 height: 50px;

}
.diyFilesUploaderContainer .errorPage .questionIcon {

 display: inline-block;
 width: 14px;
 height: 14px;
 background-size: 14px 14px;

}
.diyFilesUploaderContainer .actionButton {

 width: 140px;

}
.diyFilesUploaderContainer .loaderProgress {

 padding-left: 15%;
 padding-right: 15%;
 box-sizing: border-box;

}
.diyFilesUploaderContainer .removeLoaderProgress {

 padding-left: 0px;
 padding-right: 0px;
 width: 400px;

}
.removeTilesUploaderContainerBottom {

 padding-bottom: 0px;
 align-items: flex-start;
 flex-direction: column;
 justify-content: flex-start;

}
.removeTilesUploaderContainerBottom .uploadFormWrapper {

 width: 657px;

}
.removeTilesUploaderContainerBottom .uploadReloadBtn {

 width: 100px;
 height: 30px;
 line-height: 30px;
 display: inline-block;
 float: left;
 color: #55acee;
 cursor: pointer;

}
.removeTilesUploaderContainerBottom .uploadReloadBtn svg {

 float: left;
 width: 30px;
 fill: #55acee;
 vertical-align: middle;

}
.removeTilesUploaderContainerBottom .uploadReloadBtn span {

 vertical-align: middle;

}
.removeTilesUploaderContainerBottom .uploadImg {

 width: 120px;
 height: 120px;
 display: inline-block;
 float: right;

}
.removeTilesUploaderContainerBottom .uploadImg img {

 height: 100px;
 width: 100px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv {

 margin-left: 20px;
 font-size: 14px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .errorTabs {

 color: red;
 text-align: left;
 margin-left: 81px;
 height: 30px;
 line-height: 30px;
 width: 300px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLi .required {

 color: red;
 float: left;
 margin-right: 5px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLi .uploadLi {

 height: 30px;
 line-height: 30px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLi .uploadLi label {

 float: left;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLi .uploadLi input {

 float: left;
 width: 200px;
 height: 26px;
 line-height: 30px;
 margin-left: 15px;
 margin-right: 20px;
 border-radius: 4px;
 -moz-border-radius: 4px;
 -webkit-border-radius: 4px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLi .uploadLi .errorInput {

 border: 1px solid red;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLi .uploadLi b {

 float: left;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd {

 height: 30px;
 line-height: 30px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd .errorDiv {

 border: 1px solid red;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd label {

 float: left;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd div {

 float: left;
 border: 1px solid #d9dbdf;
 width: 200px;
 border-radius: 4px;
 -moz-border-radius: 4px;
 -webkit-border-radius: 4px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd div label {

 float: left;
 width: 30px;
 text-align: center;
 line-height: 30px;
 display: inline-block;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd div input {

 border: none;
 float: left;
 width: 135px;
 height: 28px;
 line-height: 28px;
 border-left: 1px solid #d9dbdf;
 overflow: hidden;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd .lock {

 float: left;
 width: 42px;
 height: 32px;
 line-height: 32px;
 text-align: center;
 vertical-align: middle;
 border: none;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd .lock div {

 border: none;
 width: 42px;
 height: 32px;
 cursor: pointer;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd .lock div svg {

 width: 20px;
 height: 32px;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd .sizeRemarks {

 border: none;
 margin-left: 81px;
 text-align: left;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd .sizeRemarks p span {

 color: red;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd .sizeRemarks .errorSizeTabs {

 color: red;

}
.removeTilesUploaderContainerBottom .uploadFormDiv .uploadForm .uploadFormLiEnd .inputLength {

 margin-left: 42px;

}
.removeTilesUploaderContainerBottom .uploadFormFooter {

 margin-top: 110px;

}
.diyUserguideWrap {

 width: 100%;

}
.diyUserguide {

 height: 100%;
 width: 100%;
 display: flex;
 flex-direction: column;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;

}
.diyUserguide .guideContainer {

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
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;

}
.diyUserguide .guideContainer .guide {

 display: flex;
 flex-direction: column;
 align-items: center;
 width: 470px;

}
.diyUserguide .guideContainer .guide .icon {

 height: 220px;
 width: 470px;
 margin-bottom: 10px;
 background-position: center;
 background-repeat: no-repeat;
 background-color: #e3e3e3;
 display: inline-block;
 background-color: transparent;
 background-size: 470px;

}
.diyUserguide .guideContainer .guide .tip {

 margin-top: 20px;
 margin-bottom: 20px;
 min-height: 30px;
 line-height: 20px;
 text-align: left;

}
.diyUserguide .guideContainer .guide .stateGroup {

 display: flex;
 flex-wrap: nowrap;

}
.diyUserguide .guideContainer .guide .stateGroup > li {

 margin: 0px 2px;
 width: 6px;
 height: 6px;
 background-color: grey;
 border-radius: 50%;

}
.diyUserguide .guideContainer .guide .stateGroup > li.active {

 background-color: #4d9bd6;

}
.diyUserguide .guideContainer .arrow {

 width: 48px;
 height: 48px;

}
#msg-dialog-cancel-btn {

 border: 1px solid #DDD !important;
 background-color: #F5F5F5 !important;
 color: #ACA899 !important;

}
`;

export default cssContent;