export const rootDivId = "spark_pic_root";

export const TOOL_BAR_NEW_RED_ICON = "toolBarNewRedIcon";

export const userTrackId = "env.SparkPic";

export const roomTypeRelationFPUrl = "https://rs.homestyler.com/aigc/roomTypeRelation.json";

export const roomTypeRelationUrl = "https://rs.shejijia.com/aigc/internal/roomTypeRelation.json";

export const SPARK_PIC_RESIZE_WIDGET_EXTRA = "spark-pic-resize-widget-extra";

export const SPARK_PIC_RESIZE_WIDGET_CLASS_NAME = "spark-pic-resize-widget";

export const CHECK_ROOMS_INFO = "checkRoomsInfo";

export interface CameraConfig {
  MIN_ELEVATION: number;
  MAX_FOV: number;
  MIN_FOV: number;
  MAX_ANGLE: number;
  MIN_ANGLE: number;
  MAX_CLIP_VALUE: number;
  MIN_CLIP_VALUE: number;
  MAX_HORZ_ANGLE: number;
  MIN_HORZ_ANGLE: number;
}

export const CAMERA: CameraConfig = {
  MIN_ELEVATION: 0,
  MAX_FOV: 120,
  MIN_FOV: 10,
  MAX_ANGLE: 90,
  MIN_ANGLE: -90,
  MAX_CLIP_VALUE: 500,
  MIN_CLIP_VALUE: 1,
  MAX_HORZ_ANGLE: 359,
  MIN_HORZ_ANGLE: 0
};