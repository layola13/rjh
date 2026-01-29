const styles = `.hsw-pinbtn {
    cursor: pointer;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 28px;
}
.hsw-pinbtn svg {
    width: 15px;
    height: 15px;
}
.hsw-pinbtn svg .select {
    display: none;
}
.hsw-pinbtn svg .normal {
    display: inline-block;
}
.hsw-pinbtn.active svg .selected {
    display: block !important;
}
.hsw-pinbtn.active svg .normal {
    display: none;
}`;

export default styles;