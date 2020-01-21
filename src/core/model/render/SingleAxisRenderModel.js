import TestRenderer from "../../renderer/TestRenderer";

// TODO add vertical orientation support
export default class SingleAxisRenderModel {
    /**
     * Constructor
     * @param ctx {CanvasRenderingContext2D} canvas rendering context
     * @param renderers any number of renderers
     */
    constructor(ctx, ...renderers) {
        this.ctx = ctx;
        this.renderers = renderers.length > 0 ? renderers : [new TestRenderer()];
    }

    /**
     * Renders value at given index
     * @param value - actual value
     * @param x - x
     * @param y - y
     * @param w - width
     * @param h - height
     */
    renderValueAt(value, x, y, w, h) {
        this.renderers.forEach(r => {
            r.render(this.ctx, value, x, y, w, h);
        })
    }
}