function normalizeKeyCode(e: KeyboardEvent): KeyboardEvent {
  return Qe.isGECKO() 
    ? et.normalizeGeckoKeyCode(e) 
    : Qe.isMAC() && Qe.isWEBKIT() 
      ? et.normalizeMacWebKitKeyCode(e) 
      : e;
}