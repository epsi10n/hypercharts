export default class TestRenderer {
    constructor() {
    }

    render(ctx, value, x, y, w, h) {
        if (value === undefined) {
            return;
        }

        ctx.clearRect(x, y, w, h);
        ctx.fillStyle = "green";
        ctx.font = "48px serif";

        const xText = x + w / 2 - 15;
        ctx.fillRect(x, 0, w, h);
        // adjust index for negative side
        ctx.strokeText(value, xText, 50);
    }
}