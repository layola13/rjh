const styles = `
.toggleButtonMargin .toggleButtonTitle {
    margin-right: 29px;
}

.toggleButtonTitle {
    margin-right: 5px;
    font-size: 12px;
    color: #808080;
}

ul.ToggleBtn {
    margin: 0px;
    border-radius: 2px;
    border: 1px solid #ccc;
    display: inline-block;
}

.ToggleButtonActive {
    border: 0px;
}

.ToggleBtn {
    margin: 0px;
    padding: 0px;
    border-radius: 2px;
    font-size: 12px;
    color: #808080;
}

.ToggleBtn span {
    font-size: 13px;
    cursor: default;
    margin: 0 10px 0 10px;
}

.ToggleBtn li {
    padding-left: 18px;
    padding-right: 18px;
    font-size: 14px;
    line-height: 20px;
    background-color: #fafafa;
    cursor: pointer;
    height: 20px;
    vertical-align: middle;
}

.ToggleButtonLiRight {
    border-right: 1px solid #ccc;
}

.ToggleBtn li#triggerOn {
    padding-left: 18px;
    padding-right: 18px;
}

.ToggleBtn li#triggerOff {
    padding-left: 18px;
    padding-right: 18px;
}

.ToggleButtonHover {
    background-color: #d9eaf8 !important;
    color: black !important;
}

.ToggleButtonHoverLeft {
    border-right: 1px solid #ccc !important;
}

.ToggleBtn li.active {
    border: 0px;
    background-color: #4d9bd6;
    color: white;
    line-height: 20px;
    height: 20px;
    vertical-align: middle;
}

.ToggleBtn li.activeno {
    background-color: #fafafa;
    border: 0px;
}

.ToggleBtn li.inactive {
    width: 12px;
    padding-right: 0px !important;
    padding-left: 0px !important;
    height: 20px;
    background-color: #fafafa;
    border: 0px;
}
`;

export default styles;