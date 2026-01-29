const styles = `.task-card {
    height: 136px;
    margin-bottom: 15px;
    position: relative;
}
.task-card .box {
    width: 220px;
    height: 124px;
    border-radius: 10px;
    background: #323232;
}
.task-card.selected .box {
    border: 3px solid #396efe;
}
.task-card.selected::after {
    position: absolute;
    top: 66px;
    border-right: 12px solid #396EFE;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    content: '';
    left: -12px;
}
.task-card .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    top: 12px;
}
.task-card .image-container .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.task-card .image-container .img-num {
    position: absolute;
    top: 0;
    left: 0;
    background: #1C1C1C;
    border-radius: 10px 0 10px 0;
    color: white;
    padding: 6px 13px;
}
.task-card .image-container .progress-area {
    width: 80%;
}
.task-card .shadow {
    position: absolute;
    background: #616161;
    box-shadow: 2px -2px 6px 0px rgba(0, 0, 0, 0.1);
    top: 6px;
    left: 6px;
}
.task-card .shadow.index-1 {
    top: 0px;
    left: 12px;
    background: #3F3F3F;
}`;

export default styles;