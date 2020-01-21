/**
 * Calculates current SingleAxisModel state
 *
 * @param cs - cell size
 * @param cm - cell margin
 * @param offset - render window X offset
 * @param scale - render window scale
 * @param px - pivot point X
 * @param ic - model length (all items count)
 * @param sw - viewport width
 * @param sh - viewport height
 *
 * @returns recalculated cell model (null if input parameters are invalid)
 */
function calculateCellModel(cs, cm, offset, scale, px, ic, sw, sh) {
    // TODO check bounds
    const ts = cs * scale;
    const tm = cm * scale;
    const tOffset = offset * scale + px * scale - px;
    const contentSize = ic * ts * scale + (ic - 1) * tm * scale;
    const overflow = tOffset < 0 ? tOffset : 0;
    const rws = tOffset//  - overflow;
    const rwe = tOffset + sw// - overflow;
    const cellCount = Math.ceil(sw / (ts + tm));
    let startIndex = Math.floor(rws / (ts + tm));
    let endIndex = startIndex + cellCount;

    const result = {
        rws,
        cellWidth: ts,
        cellHeight: sh,
        scale,
        contentSize,
        overflow,
        startIndex: startIndex,
        endIndex: endIndex,
        coordinates: []
    };


    // relative coordinates for negative axis indices use whole offset, for positive modulius recycling
    for (let idx = startIndex; idx <= endIndex; idx++) {
        result.coordinates.push((ts + tm) * (idx - startIndex) - (tOffset < 0 ? tOffset : tOffset % (ts + tm)));
    }

    return result;
}