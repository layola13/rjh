export const styles = `/** main color, the color for all the highlight */
/* for some container border color */
.imgplaceholder {
            
 background-position: center;
 background-repeat: no-repeat;
 background-color: #e3e3e3;
 display: inline-block;
        }
.flexCenter {
        
 display: flex;
 align-content: center;
 align-items: center;
 justify-content: center;
    }
.saveConfirmGuideWindow .popupwindows .windowWrapper .windowContents .contentsWrapper::after {
    
 height: 15px;
}
.saveConfirmGuideWindow .featureUserGuide .guideContainer .guide {

 width: 450px;
}
.featureUserGuide {

 height: 100%;
 width: 100%;
 display: flex;
 flex-direction: column;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;
}
.featureUserGuide .guideContainer {

 display: flex;
 height: 380px;
 width: 100%;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 background-color: #fff;
 border: 1px solid #e3e3e3;
 padding: 20px 10px 10px;
 background-size: 100% 100%;
 border: none;
 box-sizing: border-box;
 -moz-box-sizing: border-box;
 -webkit-box-sizing: border-box;
}
.featureUserGuide .guideContainer .guide {

 display: flex;
 flex-direction: column;
 align-items: center;
 width: 350px;
}
.featureUserGuide .guideContainer .guide .spaceHolder {

 height: 300px;
 width: 400px;
 margin-bottom: 40px;
}
.featureUserGuide .guideContainer .guide .icon {

 height: 210px;
 width: 400px;
 margin-bottom: 10px;
 background-position: center;
 background-repeat: no-repeat;
 background-color: #e3e3e3;
 display: inline-block;
 background-color: transparent;
 background-size: 400px;
}
.featureUserGuide .guideContainer .guide .tip {

 margin-top: 10px;
 margin-bottom: 20px;
 min-height: 30px;
 line-height: 30px;
 color: #343a40;
}
.featureUserGuide .guideContainer .guide .stateGroup {

 display: flex;
 flex-wrap: nowrap;
}
.featureUserGuide .guideContainer .guide .stateGroup > li {

 margin: 0px 2px;
 width: 6px;
 height: 6px;
 background-color: grey;
 border-radius: 50%;
}
.featureUserGuide .guideContainer .guide .stateGroup > li.active {

 background-color: #4d9bd6;
}
.featureUserGuide .guideContainer .arrow {

 width: 37px;
 height: 37px;
 background-size: 100% 100%;
}
.featureUserGuide .footer {

 display: flex;
 align-content: center;
 align-items: center;
 justify-content: center;
 margin-top: 40px;
}
.featureUserGuide .footer .actionButton {

 width: 140px;
 text-indent: 0;
 text-align: center;
}
`;

export default styles;