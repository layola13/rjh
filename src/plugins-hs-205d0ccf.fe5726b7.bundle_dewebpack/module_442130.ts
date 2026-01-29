const styles = `.buyMemberContainer {
    width: 406px;
    min-height: 100px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    background-color: #000;
}
.buyMemberContainer .content {
    width: 382px;
    min-height: 30px;
    display: flex;
    background: linear-gradient(to right, #FEDE9D, #81ADFF);
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    font-size: 12px;
    margin-bottom: 12px;
    padding: 7px 0;
}
.buyMemberContainer .content .leftArea {
    display: flex;
    align-items: center;
    color: #33353B;
    margin-left: 10px;
}
.buyMemberContainer .content .leftArea span {
    font-family: AlibabaPuHuiTi-Bold !important;
    margin-left: 6px;
    line-height: 14px;
}
.buyMemberContainer .content .updateBtn {
    width: -moz-fit-content;
    width: fit-content;
    padding: 0 10px;
    height: 22px;
    line-height: 22px;
    background-color: #1C1C1C;
    border-radius: 11px;
    text-align: center;
    cursor: pointer;
    margin-right: 4px;
}
.buyMemberContainer .tips {
    width: 100%;
    color: #FFF;
    font-size: 12px;
    line-height: 12px;
    margin-bottom: 12px;
}
.buyMemberContainer .tips .num {
    font-family: AlibabaPuHuiTi-Medium;
    color: #FEDD03;
    font-size: 18px;
    line-height: 25px;
    padding: 0 4px;
}
.buyMemberContainer .demoImg {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.buyMemberContainer .demoImg img {
    width: 176px;
    height: 94px;
    border-radius: 8px;
}
.buyMemberContainer .demoImg .wathermark-icon {
    transform: rotate(180deg);
    cursor: none;
    margin: 0 8px;
}`;

export default styles;