const cssContent = `.walkthrough-container {
            
 top: 0;
            
 width: 100vw;
            
 height: 100%;
            
 position: absolute;
            
 transition: none;
            

        }
.walkthrough-container.hide-walkthrough {
        
 top: -100%;
        

    }
.walkthrough-container.animate-hide {
    
 transition: all 0.5s;
    

}
.walkthrough-popup {

 display: block;

 position: absolute;

 width: 100%;

 height: 100%;

 overflow: hidden;

 background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), #ffffff);

 backdrop-filter: blur(6px);

 z-index: 10499;


}
.walkthrough-popup .walkthrough-content {

 position: absolute;

 top: 50%;

 left: 50%;

 transform: translate(-50%, -50%);

 width: 950px;

 height: 596px;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper {

 position: absolute;

 top: 0;

 left: 50%;

 transform: translate(-50%, 0%);

 width: 900px;

 height: 584px;

 padding: 0;

 box-sizing: content-box;

 border-radius: 8px;

 display: flex;

 align-items: center;

 justify-content: center;

 flex-direction: column;

 overflow: hidden;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper {

 position: absolute;

 height: 600px;

 align-self: flex-start;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .slider-images {

 width: 900px;

 height: 584px;

 display: inline-block;

 position: relative;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .slider-images .slide-image-gif {

 position: absolute;

 left: 0;

 top: 0;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content {

 position: relative;

 width: 836px;

 height: 522px;

 margin: 20px auto;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content.function-interview {

 height: 484px;

 box-shadow: unset;

 margin: 20px auto 12px;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content.function-interview .slideImage {

 box-shadow: unset;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content .slideImage {

 border-radius: 12px;

 box-shadow: 6px 6px 20px 0px rgba(0, 0, 0, 0.2);


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content .text-in-image {

 position: absolute;

 top: 50%;

 left: 64px;

 text-align: left;

 transform: translateY(-50%);

 width: 484px;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content .text-in-image .little-tip {

 font-size: 14px;

 margin-bottom: 10px;

 font-style: italic;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content .text-in-image .title {

 font-size: 40px;

 line-height: 42px;

 margin-bottom: 20px;

 font-family: AlibabaPuHuiTi-Bold !important;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content .text-in-image .description {

 font-size: 18px;

 line-height: 24px;

 margin-bottom: 30px;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content .text-in-image .button {

 display: flex;

 padding: 14px 20px;

 width: -moz-fit-content;

 width: fit-content;

 font-size: 18px;

 font-family: AlibabaPuHuiTi-Bold !important;

 border-radius: 25px;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .image-content .text-in-image .button .text {

 margin-right: 6px;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .bottom {

 height: 52px;

 font-size: 20px;

 line-height: 26px;

 font-family: AlibabaPuHuiTi-Bold !important;

 text-align: center;


}
.walkthrough-popup .walkthrough-content .walkthrough-wrapper .image-wrapper .slideImageHover:hover {

 cursor: pointer;


}
.walkthrough-popup .walkthrough-content .walkthrough-arrows {

 pointer-events: none;

 position: absolute;

 width: 100%;

 top: 300px;

 transform: translate(0, -50%);

 display: flex;

 justify-content: space-between;

 transition: 0.6s;


}
.walkthrough-popup .walkthrough-content .walkthrough-arrows .arrow {

 position: relative;

 pointer-events: auto;

 width: 50px;

 height: 50px;

 border-radius: 50%;

 background-repeat: no-repeat;

 cursor: pointer;

 display: flex;

 justify-content: center;

 align-items: center;

 color: #1C1C1C;

 font-size: 20px;


}
.walkthrough-popup .walkthrough-content .walkthrough-arrows .arrow:hover {

 background-color: rgba(0, 0, 0, 0.04);


}
.walkthrough-popup .walkthrough-content .walkthrough-arrows .arrow:active {

 color: #396EFE;

 background-color: rgba(0, 0, 0, 0.04);


}
.walkthrough-popup .walkthrough-content .walkthrough-navigation {

 position: absolute;

 height: 12px;

 padding: 0 3px;

 left: 50%;

 transform: translate(-50%, 0%);

 bottom: 0px;

 border-radius: 20px;

 display: flex;

 justify-content: space-around;

 align-items: center;


}
.walkthrough-popup .walkthrough-content .walkthrough-navigation .bar {

 width: 8px;

 height: 8px;

 margin-left: 12px;

 background-color: #b1b1b1;

 border-radius: 4px;

 transition: 0.3s;


}
.walkthrough-popup .walkthrough-content .walkthrough-navigation .bar:first-child {

 margin-left: 0px;


}
.walkthrough-popup .walkthrough-content .walkthrough-navigation .bar:hover {

 background-color: #1C1C1C;

 cursor: pointer;


}
.walkthrough-popup .walkthrough-content .walkthrough-navigation .bar.current {

 width: 27px;

 background-color: #1C1C1C;


}
.walkthrough-popup .walkthrough-close-area {

 position: absolute;

 top: 0;

 right: 0;

 height: 130px;

 width: 140px;

 z-index: 2;

 cursor: pointer;


}
.walkthrough-popup .walkthrough-close-area .walkthrough-close-wrapper {

 position: absolute;

 display: inline-flex;

 align-items: center;

 justify-content: center;

 height: 60px;

 border-radius: 30px;

 right: 18px;

 top: 30px;

 background-color: transparent;

 cursor: pointer;

 font-size: 21px;

 padding: 0 18px;


}
.walkthrough-popup .walkthrough-close-area .walkthrough-close-wrapper .walkthrough-close-text {

 font-family: AlibabaPuHuiTi-Bold !important;

 font-size: 24px;

 color: #33353B;

 margin-right: 6px;


}
.walkthrough-popup .walkthrough-close-area:hover .walkthrough-close-wrapper, 
.walkthrough-popup .walkthrough-close-area:active .walkthrough-close-wrapper {

 background-color: rgba(0, 0, 0, 0.04);


}
`;

export default cssContent;