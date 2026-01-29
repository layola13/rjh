const styles = `
.export2d_mask {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: transparent;
    z-index: 51;
}

#export2d {
    font-family: 'Frutiger Next LT W1G', Calibri, Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-color: #5F5F5F;
}

#export2d .footer {
    display: none;
    z-index: 52;
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 50px;
    line-height: 50px;
    border-top: solid 1px #CCCCCC;
}

#export2d .closeBtn {
    position: absolute;
    background: #297bb7;
    color: #fff;
    cursor: pointer;
    padding: 12px 15px;
    right: 10px;
    top: 10px;
}

#export2d .brand {
    float: left;
    height: 100%;
    border-right: solid 1px #CCCCCC;
}

#export2d .brand img {
    margin: auto 15px auto 15px;
}

#export2d .title {
    float: left;
    height: 100%;
    margin: 0px;
    padding-left: 15px;
}

#export2d .unit {
    float: right;
    height: 100%;
    margin: 0px;
    padding: 0px 20px;
    border-left: solid 1px #CCCCCC;
}
`;

export default styles;