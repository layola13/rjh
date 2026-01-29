const CSS_CONTENT = `.guide-global .stepTip {
            
 pointer-events: none;
 z-index: 4950;
 text-align: center;
 filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1)) !important;
 right: 0;
 position: absolute;
 width: 300px;
 transform: translate(-270px, 10px);

        }
.guide-global .stepTip:add-arrow .content::before {
        
 content: '';
 position: absolute;
 transform: rotate(45deg);
 border-bottom: 5px solid green;
 border-left: 5px solid green;
 border-right: 5px solid transparent;
 border-top: 5px solid transparent;
 left: -5px;
 top: 60px;

    }
.guide-global .stepTip .content {
    
 position: relative;
 width: 300px;
 box-sizing: border-box;
 margin: 0 auto;
 padding: 20px;
 background: #f6f9fa;
 border-radius: 0 0 5px 5px;

}
.guide-global .stepTip .content .title {

 font-size: 18px;
 color: #19191e;
 line-height: 22px;
 text-align: left;
 font-weight: bold;

}
.guide-global .stepTip .content .tipTxt {

 text-align: left;
 line-height: 18px;
 font-size: 12px;
 color: #78787d;
 padding: 10px 0 6px;

}
.guide-global .stepTip .content .nextBtn {

 font-weight: bold;
 pointer-events: auto;
 width: -moz-fit-content;
 width: fit-content;
 height: 36px;
 background: #396efe;
 border-radius: 18px;
 font-size: 18px;
 color: #fff;
 line-height: 36px;
 cursor: pointer;
 margin-left: auto;
 margin-top: 12px;
 font-family: 'AlibabaPuHuiTi-Bold' !important;
 padding: 0 8px;

}
.guide-global .stepTip .content .dialog-arrow {

 width: 0;
 height: 0;
 border-width: 6px;
 border-style: solid;
 position: absolute;
 border-color: transparent;

}
.guide-global .stepTip .content .dialog-arrow.left {

 border-color: transparent white transparent transparent;
 top: 60px;
 left: -11px;

}
.guide-global .stepTip .content .dialog-arrow.right {

 border-color: transparent transparent transparent white;
 top: 60px;
 right: -11px;

}
.guide-global .stepTip .no-img {

 border-radius: 5px;

}
.guide-global .stepTip .imageTip {

 width: 320px;
 height: 140px;
 border-radius: 5px 5px 0 0;
 margin-bottom: -4px;
 background-color: #f5f5f5;

}
.global-en .guide-global .stepTip .content {

 padding: 20px;

}
`;

export default CSS_CONTENT;