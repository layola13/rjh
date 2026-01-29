interface SvgModuleMap {
  [key: string]: number;
}

const svgModuleMap: SvgModuleMap = {
  "./components/changepicturebutton/res/editor.svg": 21435,
  "./components/changepicturebutton/res/upload.svg": 344115,
  "./components/pictureview/res/loading.svg": 430715,
  "./components/pictureview/res/picture.svg": 739877,
  "./components/pictureview/res/uploadfailed.svg": 356305,
  "./newwidgets/DraggableModal/res/toggle-btn.svg": 74824,
  "./newwidgets/blockalign/res/arrow135.svg": 595617,
  "./newwidgets/blockalign/res/arrow225.svg": 138941,
  "./newwidgets/blockalign/res/arrow315.svg": 396905,
  "./newwidgets/blockalign/res/arrow45.svg": 667069,
  "./newwidgets/blockalign/res/arrowdown.svg": 828160,
  "./newwidgets/blockalign/res/arrowleft.svg": 103183,
  "./newwidgets/blockalign/res/arrowright.svg": 345194,
  "./newwidgets/blockalign/res/arrowup.svg": 392499,
  "./newwidgets/blockalign/res/center.svg": 963510,
  "./newwidgets/dropdownlist/res/drop_down.svg": 115244,
  "./newwidgets/dropdownlist/res/drop_up.svg": 889223,
  "./newwidgets/imagebutton/res/img/mask.svg": 938608,
  "./newwidgets/scrolltip/res/arrow.svg": 28918,
  "./newwidgets/scrolltip/res/arrow_white.svg": 42248,
  "./propertybar/triangle.svg": 799120,
  "./walltype/brick_wall_hover_pattern.svg": 726434,
  "./walltype/brick_wall_loadbearing_pattern.svg": 341014,
  "./walltype/brick_wall_moving_pattern.svg": 508660,
  "./walltype/brick_wall_pattern.svg": 33561,
  "./walltype/brick_wall_selected_pattern.svg": 60981,
  "./walltype/concrete_hover_pattern.svg": 27585,
  "./walltype/concrete_loadbearing_pattern.svg": 893661,
  "./walltype/concrete_moving_pattern.svg": 870149,
  "./walltype/concrete_pattern.svg": 51682,
  "./walltype/concrete_selected_pattern.svg": 236564,
  "./walltype/gypsum_wall_hover_pattern.svg": 458544,
  "./walltype/gypsum_wall_loadbearing_pattern.svg": 530524,
  "./walltype/gypsum_wall_moving_pattern.svg": 47490,
  "./walltype/gypsum_wall_pattern.svg": 314287,
  "./walltype/gypsum_wall_selected_pattern.svg": 563731,
  "./widgets/bubbletooltips/res/colorTipIcon.svg": 542038,
  "./widgets/feedbackdialog/res/closed_normal.svg": 709774,
  "./widgets/feedbackdialog/res/thumbdown.svg": 595012,
  "./widgets/feedbackdialog/res/thumbdown_selected.svg": 194992,
  "./widgets/feedbackdialog/res/thumbup.svg": 588447,
  "./widgets/feedbackdialog/res/thumbup_selected.svg": 941349,
  "./widgets/imagebtn/mask.svg": 673173,
  "./widgets/livehint/res/icons/close.svg": 206583,
  "./widgets/livehint/res/icons/completed.svg": 376768,
  "./widgets/livehint/res/icons/information.svg": 221049,
  "./widgets/livehint/res/icons/loading.svg": 482451,
  "./widgets/livehint/res/icons/warning.svg": 115643,
  "./widgets/loadingfeedback/res/font/icomoon.svg": 943528,
  "./widgets/loadingfeedback/res/icons/homestyler.svg": 839014,
  "./widgets/loadingfeedback/res/icons/homestyler_icon.svg": 5463,
  "./widgets/loadingfeedback/res/icons/nothumnail.svg": 694160,
  "./widgets/loadingfeedback/res/icons/scrollloading.svg": 88128,
  "./widgets/messagebox/res/closed_hover.svg": 980784,
  "./widgets/messagebox/res/closed_normal.svg": 874887,
  "./widgets/notificationpopup/res/cancel.svg": 665784,
  "./widgets/popover/res/close.svg": 756228,
  "./widgets/popover/res/colorTipIcon.svg": 782939,
  "./widgets/sliderbar/res/hover.svg": 184419,
  "./widgets/sliderbar/res/normal.svg": 255226,
  "./widgets/sliderscale/res/hover.svg": 308922,
  "./widgets/sliderscale/res/normal.svg": 320781,
  "./widgets/styleSelector/res/close.svg": 249207,
  "./widgets/usersurvey/res/ImgUserSurvey/bottom.svg": 944530,
  "./widgets/usersurvey/res/ImgUserSurvey/top.svg": 224392,
  "./widgets/viewModeDropdown/select.svg": 505693
};

function resolveModuleId(modulePath: string): number {
  if (!svgModuleMap.hasOwnProperty(modulePath)) {
    const error = new Error(`Cannot find module '${modulePath}'`);
    (error as NodeJS.ErrnoException).code = "MODULE_NOT_FOUND";
    throw error;
  }
  return svgModuleMap[modulePath];
}

export function requireSvgModule(modulePath: string): number {
  const moduleId = resolveModuleId(modulePath);
  return moduleId;
}

export function getAvailableModuleKeys(): string[] {
  return Object.keys(svgModuleMap);
}

export { resolveModuleId, svgModuleMap };