const styles = `.nine-patch-container {
    display: inline-block;
    vertical-align: middle;
}
.nine-patch-container .nine-patch {
    display: flex;
    flex-direction: column;
}
.nine-patch-container .nine-patch .nine-patch-row {
    line-height: 9px;
    height: 9px;
    display: flex;
}
.nine-patch-container .nine-patch .nine-patch-row .nine-patch-block {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 0 1px 1px;
    box-sizing: border-box;
    border: 1px solid #dedede;
    background-color: #dedede;
}
.nine-patch-container .nine-patch .nine-patch-row .nine-patch-block:hover {
    background-color: #d2eafc;
    border-color: #55acee;
    cursor: pointer;
}
.nine-patch-container .nine-patch .nine-patch-row .nine-patch-block.active {
    background-color: #4d9bd6;
    border-color: #4d9bd6;
}`;

export default styles;