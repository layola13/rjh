const styles = `.length-input-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
}
.length-input-wrapper .length-input {
    text-align: center;
}
.length-input-wrapper .input-wrapper {
    display: block;
    width: 73px;
}
.length-input-wrapper .input-wrapper.top {
    display: block;
}
.length-input-wrapper .input-wrapper.right {
    position: relative;
    display: inline-block;
}
.length-input-wrapper .input-wrapper .input {
    border-radius: 2px 0px 0px 2px;
    box-sizing: border-box;
    width: 53px;
    height: 24px;
    border: 0.5px solid #DCDCE1;
    background: #ffffff;
    text-align: center;
    color: #343a40;
    font-size: 12px;
    font-weight: normal;
    vertical-align: middle;
}
.length-input-wrapper .input-wrapper .input:focus {
    border-color: #327DFF;
    background: rgba(50, 125, 255, 0.1);
}
.length-input-wrapper .input-wrapper .input.error, 
.length-input-wrapper .input-wrapper .input.error:focus {
    border-color: #ff0000;
}
.length-input-wrapper .input-wrapper .select {
    display: none;
    position: absolute;
    top: 24px;
    left: 0;
    overflow: hidden;
    width: 53px;
    list-style-type: none;
    font-size: 12px;
    color: #333333;
    background-color: #FFFFFF;
    z-index: 1;
    box-sizing: border-box;
    box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);
    font-weight: 400;
    line-height: 17px;
}
.length-input-wrapper .input-wrapper .select .options {
    height: 22px;
    width: 100%;
    line-height: 22px;
}
.length-input-wrapper .input-wrapper .select .options:hover {
    background: #327DFF;
    font-weight: bold;
    color: #FFFFFF;
}
.length-input-wrapper .input-wrapper:hover .select {
    display: inline-block;
}
.length-input-wrapper .input-wrapper .unit {
    border-width: 0.5px 0.5px 0.5px 0px;
    border-radius: 0px 2px 2px 0px;
    border-color: #DCDCE1;
    border-style: solid;
    box-sizing: border-box;
    position: static;
    width: 20px;
    height: 24px;
    white-space: nowrap;
    background-color: #FCFCFC;
    font-size: 10px;
    margin: 0px;
    padding: 0px;
    color: #19191E;
    font-weight: normal;
    line-height: 22px;
    display: inline-block;
    vertical-align: middle;
}
.length-input-wrapper .input-wrapper .unit.focus-input {
    border-color: #327DFF;
}
.length-input-wrapper .input-wrapper .arrow-group {
    border-width: 0.5px 0.5px 0.5px 0px;
    border-radius: 0px 2px 2px 0px;
    border-color: #DCDCE1;
    border-style: solid;
    box-sizing: border-box;
    position: static;
    width: 20px;
    height: 24px;
    display: inline-block;
    background: #FCFCFC;
    vertical-align: middle;
}
.length-input-wrapper .input-wrapper .arrow-group.focus-input {
    border-color: #327DFF;
}
.length-input-wrapper .input-wrapper .arrow-group .arrow-up-wrapper {
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
    height: 12px;
    border-bottom: 0.5px solid #DCDCE1;
}
.length-input-wrapper .input-wrapper .arrow-group .arrow-up-wrapper:hover .arrow-up {
    border-bottom: 3px solid #327DFF;
}
.length-input-wrapper .input-wrapper .arrow-group .arrow-up-wrapper .arrow-up {
    width: 6px;
    height: 6px;
    border-top: 3px solid transparent;
    border-right: 3px solid transparent;
    border-bottom: 3px solid #19191E;
    border-left: 3px solid transparent;
    box-sizing: border-box;
}
.length-input-wrapper .input-wrapper .arrow-group .arrow-down-wrapper {
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    box-sizing: border-box;
    height: 10px;
}
.length-input-wrapper .input-wrapper .arrow-group .arrow-down-wrapper:hover .arrow-down {
    border-top: 3px solid #327DFF;
}
.length-input-wrapper .input-wrapper .arrow-group .arrow-down-wrapper .arrow-down {
    width: 6px;
    height: 6px;
    border-top: 3px solid #19191E;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-left: 3px solid transparent;
    box-sizing: border-box;
}
.length-input-wrapper .input-wrapper.disabled {
    cursor: no-drop;
}
.length-input-wrapper .input-wrapper.disabled .input {
    background-color: #F0F0F5;
}
.length-input-wrapper .input-wrapper.disabled .unit {
    background-color: #F0F0F5;
}
.length-input-wrapper .label {
    color: #96969b;
    font-size: 12px;
    font-weight: normal;
    padding: 0;
}
.length-input-wrapper .label.left {
    margin-right: 8px;
}
.length-input-wrapper .label.bottom {
    display: inline-block;
    margin-top: 10px;
}
.length-input-outer .length-input-wrapper .input-wrapper:hover .unit {
    display: inline-block;
}`;

export default styles;