/**
 * 验证房间数据是否有效
 * 
 * @param roomData - 房间数据对象
 * @param callback - 验证失败后用户确认升级时的回调函数
 * @returns 如果房间数据有效返回true，否则返回false
 * 
 * @remarks
 * 此函数会检查房间数据是否为已废弃的空间类型。
 * 如果是废弃空间，会弹出确认对话框询问用户是否升级房间。
 * 用户确认后会触发空间重置请求。
 */
export function isRoomDataValid(
  roomData: unknown,
  callback?: () => void
): boolean;