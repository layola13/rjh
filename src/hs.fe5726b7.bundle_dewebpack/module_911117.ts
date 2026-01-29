const css = `.slider-bar-wrapper {
            
 display: inline-block;

        }
.slider-bar-wrapper .slider-bar {
        
 display: flex;
 align-items: center;
 justify-content: center;

    }
.slider-bar-wrapper .slider-bar .slider-label {
    
 width: 48px;
 font-size: 12px;
 font-weight: 400;
 color: #96969b;
 padding: 0px;
 text-align: left;
 margin-right: 6px;

}
.slider-bar-wrapper .slider-bar .slider-wrapper {

 width: 77px;
 display: inline-block;
 vertical-align: middle;
 position: relative;

}
.slider-bar-wrapper .slider-bar .slider-wrapper .slider-track {

 height: 4px;
 width: 100%;

}
.slider-bar-wrapper .slider-bar .slider-wrapper .slider-track .slider-track-left-one {

 background-color: #eaeaed;
 height: 100%;
 width: 100%;
 left: 0;
 position: absolute;
 box-sizing: border-box;
 border: 1px solid #dcdce1;
 border-radius: 2px;

}
.slider-bar-wrapper .slider-bar .slider-wrapper .slider-track .slider-track-left-two {

 background: #327dff;
 height: 100%;
 width: 25%;
 position: absolute;
 border-radius: 2px;

}
.slider-bar-wrapper .slider-bar .slider-wrapper .slider-circle {

 top: -3px;
 margin-left: -5px;
 position: absolute;
 border-radius: 50%;
 left: 67.6%;
 width: 10px;
 height: 10px;
 background: #ffffff;
 box-shadow: rgba(25, 25, 50, 0.3) 0px 1px 4px 0px;
 cursor: pointer;

}
.slider-bar-wrapper .slider-bar .slider-wrapper .slider-disable-mask {

 position: absolute;
 width: 100%;
 height: 100%;
 right: 0;
 top: 0;
 background: #ffffff;
 opacity: 0.5;
 z-index: 5;
 cursor: no-drop;

}
.global-en .slider-bar-wrapper .slider-bar .slider-label {

 word-break: normal;

}
`;

export default css;