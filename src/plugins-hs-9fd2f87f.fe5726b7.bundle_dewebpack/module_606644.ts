const styles = `.progressBarContainer {
            
 width: 100%;
 padding: 0px 20px 20px;

        }
.progressBarContainer .progressBarContent {
        
 flex-direction: row;
 display: flex;
 align-items: center;
 align-content: center;
 vertical-align: middle;
        
    }
.progressBarContainer .progressBar {
    
 height: 6px;
 background-color: #f3f3f3;
 box-shadow: inset 0px 1px 1px 0px rgba(74, 77, 83, 0.51);
 border-radius: 3px;
 width: 95%;
 
}
.progressBarContainer .progressBar .percent {

 background-color: #55acee;
 border-radius: 3px;
 height: 100%;
 width: 0;

}
.progressBarContainer .hint {

 display: flex;
 align-content: center;
 align-items: center;
 justify-content: center;
 margin: 20px 0px;

}
.progressBarContainer .uploadSuccessIcon {

 margin-left: 5px;
 padding-top: 1px;

}
.progressBarContainer .uploadSuccessIcon span {

 width: 12px;
 height: 12px;
 border-radius: 6px;
 border: 1px solid #55acee;
 display: inline-block;
 box-sizing: border-box;
 background: #55acee;
 position: relative;

}
.progressBarContainer .uploadSuccessIcon span:after {

 box-sizing: content-box;
 content: "";
 border: 1px solid #fff;
 border-left: 0;
 position: absolute;
 border-top: 0;
 height: 7px;
 left: 3px;
 transform: rotate(45deg) scaleY(1);
 width: 3px;
 transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6) 0.05s;
 transform-origin: center;

}
`;

export default styles;