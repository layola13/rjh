const styles = `.camera-setting-popup {
    position: fixed;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);
    border-radius: 10px;
    padding: 14px 15px 12px 15px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
}
.camera-setting-popup .camera-slider {
    width: 208px;
}
.camera-setting-popup .camera-slider .camera-z-position, 
.camera-setting-popup .camera-slider .camera-angle {
    display: flex;
    align-items: flex-end;
    width: 100%;
}
.camera-setting-popup .camera-slider .camera-z-position .slider-outer .slider-bar-wrapper .slider-bar, 
.camera-setting-popup .camera-slider .camera-angle .slider-outer .slider-bar-wrapper .slider-bar {
    display: block;
}
.camera-setting-popup .camera-slider .camera-z-position .slider-outer .slider-bar-wrapper .slider-bar .slider-label, 
.camera-setting-popup .camera-slider .camera-angle .slider-outer .slider-bar-wrapper .slider-bar .slider-label {
    color: #33353B;
    margin-bottom: 5px;
    display: inline-block;
}
.camera-setting-popup .camera-slider .camera-z-position .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper, 
.camera-setting-popup .camera-slider .camera-angle .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper {
    width: 136px;
}
.camera-setting-popup .camera-slider .camera-z-position .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper .slider-circle, 
.camera-setting-popup .camera-slider .camera-angle .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper .slider-circle {
    border: 2px solid #327dff;
    width: 8px;
    height: 8px;
    box-shadow: none;
    top: -4px;
}
.camera-setting-popup .camera-slider .camera-z-position .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper .slider-circle::before, 
.camera-setting-popup .camera-slider .camera-angle .slider-outer .slider-bar-wrapper .slider-bar .slider-wrapper .slider-circle::before {
    content: '';
    display: block;
    position: absolute;
    top: -4px;
    left: -4px;
    bottom: -4px;
    right: -4px;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index: 5;
}
.camera-setting-popup .camera-slider .camera-z-position .length-input-outer .length-input-wrapper .length-input .input-wrapper, 
.camera-setting-popup .camera-slider .camera-angle .length-input-outer .length-input-wrapper .length-input .input-wrapper {
    margin: 0;
    width: 64px;
}
.camera-setting-popup .camera-slider .camera-z-position .length-input-outer .length-input-wrapper .length-input .input-wrapper .input, 
.camera-setting-popup .camera-slider .camera-angle .length-input-outer .length-input-wrapper .length-input .input-wrapper .input {
    width: 40px;
    border-right: none;
    color: #343A40;
    border-radius: 4px 0 0 4px;
    border-color: #EAECF1;
}
.camera-setting-popup .camera-slider .camera-z-position .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group, 
.camera-setting-popup .camera-slider .camera-angle .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group {
    margin: 0;
    width: 24px;
    background: #fff;
    border-color: #EAECF1;
    border-radius: 0 4px 4px 0;
}
.camera-setting-popup .camera-slider .camera-z-position .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group .arrow-up-wrapper, 
.camera-setting-popup .camera-slider .camera-angle .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group .arrow-up-wrapper {
    border-bottom: none;
}
.camera-setting-popup .camera-slider .camera-z-position .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group.focus-input, 
.camera-setting-popup .camera-slider .camera-angle .length-input-outer .length-input-wrapper .length-input .input-wrapper .arrow-group.focus-input {
    background: rgba(50, 125, 255, 0.1);
    border-color: #EAECF1;
}
.camera-setting-popup .camera-slider .camera-z-position .length-input-outer .length-input-wrapper .length-input .input-wrapper .unit, 
.camera-setting-popup .camera-slider .camera-angle .length-input-outer .length-input-wrapper .length-input .input-wrapper .unit {
    width: 24px;
    background-color: #fff;
    font-weight: 300;
    border-radius: 0 4px 4px 0;
    color: #33353B;
    border-color: #EAECF1;
}
.camera-setting-popup .camera-slider .camera-z-position .length-input-outer .length-input-wrapper .length-input .input-wrapper .unit.focus-input, 
.camera-setting-popup .camera-slider .camera-angle .length-input-outer .length-input-wrapper .length-input .input-wrapper .unit.focus-input {
    background: rgba(50, 125, 255, 0.1);
}
.camera-setting-popup .camera-slider .camera-z-position .length-input-outer .length-input-wrapper .length-input .input-wrapper.disabled .unit, 
.camera-setting-popup .camera-slider .camera-angle .length-input-outer .length-input-wrapper .length-input .input-wrapper.disabled .unit {
    background-color: #F0F0F5;
}
.camera-setting-popup .reset-button {
    width: 100px;
    height: 36px;
    font-family: 'AlibabaPuHuiTi-Bold' !important;
    color: #33353B;
    box-sizing: border-box;
}`;

export default styles;