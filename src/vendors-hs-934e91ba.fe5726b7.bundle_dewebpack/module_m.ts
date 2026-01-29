function readValueFromPointer(address: number): unknown {
    return wt((vt(address, "_emval_take_value")).readValueFromPointer(address));
}