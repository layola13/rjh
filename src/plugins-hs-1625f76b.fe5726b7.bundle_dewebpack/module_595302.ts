const cssContent = `.hint-view {
    display: flex;
    line-height: 24px;
    padding: 0px 10%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    color: #19191E;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.hint-view .tooltipstext {
    width: 80%;
    font-size: 12px;
}
.hint-view .tooltipstext .questionIcon {
    vertical-align: sub;
}
.hint-view .icon {
    display: block;
    background-repeat: no-repeat;
    background-position: center;
    width: 140px;
    height: 140px;
    background-size: 140px 140px;
    margin-bottom: 5px;
    opacity: 0.7;
}
.hint-view .btn-style {
    padding: 0px 10px;
    margin-top: 10px;
    cursor: pointer;
    border: 0.5px solid #96969b;
    font-size: 12px;
}
.hint-view .btn-style:hover {
    color: #327DFF;
    background-color: #EBF0FF;
    border: 0.5px solid #327DFF;
}
.hint-view a {
    cursor: pointer;
    color: #4d9bd6;
    margin: 0px 2px;
}
.hint-view a:hover {
    text-decoration: none;
}
.hint-view.min-hight {
    padding-bottom: 20px;
}
.hint-view.min-hight .icon {
    margin-top: 0;
}`;

export default cssContent;