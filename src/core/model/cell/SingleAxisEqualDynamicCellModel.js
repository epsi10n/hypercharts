// TODO add vertical orientation support
export default class SingleAxisEqualDynamicCellModel {
    /**
     * Constructor
     * @param data array of values
     */
    constructor(renderModel, cs = 200, cm = 20, offset = 0, scale = 1, px = 0, data = [], sw, sh) {
        this.renderModel = renderModel;
        this.cs = cs;
        this.cm = cm;
        this.offset = offset;
        this.scale = scale;
        this.px = px;
        this.data = data;
        this.sw = sw;
        this.sh = sh;
    }

    /**
     * Calculates current SingleAxisModel state
     *
     * @param cs - cell size
     * @param cm - cell margin
     * @param offset - render window X offset
     * @param scale - render window scale
     * @param px - pivot point X
     * @param data - data array
     * @param sw - viewport width
     * @param sh - viewport height
     *
     * @returns {object} recalculated cell model
     */
    calculateCellModel(cs, cm, offset, scale, px, data, sw, sh) {
        const ic = data.length;
        const ts = cs * scale;
        const tm = cm * scale;
        const tOffset = offset * scale + px * scale - px;
        const contentSize = ic * ts * scale + (ic - 1) * tm * scale;
        const overflow = tOffset < 0 ? tOffset : 0;
        const rws = tOffset;
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
            coordinates: [],
        };


        // relative coordinates for negative axis indices use whole offset, for positive modulus recycling
        for (let idx = startIndex; idx <= endIndex; idx++) {
            result.coordinates.push((ts + tm) * (idx - startIndex) - (tOffset < 0 ? tOffset : tOffset % (ts + tm)));
        }

        return result;
    }

    /**
     * Change transform
     *
     * @param offsetDelta X offset delta
     * @param scaleDelta X scale delta
     * @param px X pivot coordinate
     */
    transform(offsetDelta = 1, scaleDelta = 1, px = 0) {
        this.offset += offsetDelta / this.scale;
        this.scale *= scaleDelta;
        this.px = px;
        const newCellModel = this.calculateCellModel(this.cs, this.cm,
            this.offset, this.scale, this.px, this.data, this.sw, this.sh);
        this._renderCellModel(newCellModel);
    }

    _renderCellModel(model) {
        let currentIndex;
        for (let idx = model.startIndex; idx <= model.endIndex; idx++) {
            currentIndex = model.startIndex < 0 ? (idx - model.startIndex) : idx;
            this.renderModel.renderValueAt(
                this.data[currentIndex],
                model.coordinates[idx - model.startIndex], 0, model.cellWidth, model.cellHeight);
        }
    }
}