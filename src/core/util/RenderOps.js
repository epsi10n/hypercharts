import {SCATTER_SHAPE_TYPES, ORIENTATION} from './HyperChartsContants';
import {Shape} from 'createjs-collection';
import {PaintSet} from '../paint';

const {HORIZONTAL} = ORIENTATION;

/**
 * Contains various draw routines
 */
export default class RenderOps {
    static drawVerticalTrendPart(shapes,
                                 prevHeight,
                                 height,
                                 nextHeight,
                                 fillPaint,
                                 strokePaint,
                                 width,
                                 margin,
                                 paintBounds) {
        let xStart = -width / 2 + margin / 2;
        let xEnd = xStart + width - margin;

        const ctx = shapes[0].graphics;

        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);

        const drawVeryFirstChunk = (strokeMode) => {
            ctx.mt(xStart, 0);
            (strokeMode ? ctx.lt(xStart, -height) : ctx.mt(xStart, -height))
                .lt(0, -height).lt(xEnd, -(height + nextHeight) / 2);
            strokeMode ? ctx.lt(xEnd, 0) : ctx.mt(xEnd, 0);
        };

        const drawOrdinaryChunk = (strokeMode) => {
            ctx.mt(xStart, 0);
            (strokeMode ? ctx.lt(xStart, -(prevHeight + height) / 2)
                        : ctx.mt(xStart, -(prevHeight + height) / 2))
                .lt(0, -height).lt(xEnd, -(height + nextHeight) / 2);
            strokeMode ? ctx.lt(xEnd, 0) : ctx.mt(xEnd, 0);
        };

        const drawLastChunk = (strokeMode) => {
            ctx.mt(xStart, 0);
            (strokeMode ? ctx.lt(xStart, -(prevHeight + height) / 2)
                        : ctx.mt(xStart, -(prevHeight + height) / 2))
                .lt(0, -height).lt(xEnd, -height);
            strokeMode ? ctx.lt(xEnd, 0) : ctx.mt(xEnd, 0);
        };

        if (prevHeight == null) {
            drawVeryFirstChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawVeryFirstChunk(false);
        } else if (nextHeight != null) {
            drawOrdinaryChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawOrdinaryChunk(false);
        } else {
            drawLastChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawLastChunk(false);
        }

        shapes[0].graphics.es();
    }

    static drawVerticalTrendPartAerial(shapes,
                                 prevHeightLow,
                                 heightLow,
                                 nextHeightLow,
                                 prevHeightHigh,
                                 heightHigh,
                                 nextHeightHigh,
                                 fillPaint,
                                 strokePaint,
                                 width,
                                 margin,
                                 paintBounds) {
        let xStart = -width / 2 + margin / 2;
        let xEnd = xStart + width - margin;

        const ctx = shapes[0].graphics;

        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);

        const drawVeryFirstChunk = (strokeMode) => {
            ctx.mt(xStart, -heightLow);
            (strokeMode ? ctx.lt(xStart, -heightHigh) : ctx.mt(xStart, -heightHigh))
                .lt(0, -heightHigh).lt(xEnd, -(heightHigh + nextHeightHigh) / 2);
            (strokeMode ? ctx.lt(xEnd, -(heightLow + nextHeightLow) / 2)
                : ctx.mt(xEnd, -(heightLow + nextHeightLow) / 2))
                .lt(0, -heightLow).lt(xStart, -heightLow);
        };

        const drawOrdinaryChunk = (strokeMode) => {
            ctx.mt(xStart, -(prevHeightLow + heightLow) / 2);
            (strokeMode ? ctx.lt(xStart, -(prevHeightHigh + heightHigh) / 2)
                : ctx.mt(xStart, -(prevHeightHigh + heightHigh) / 2))
                .lt(0, -heightHigh).lt(xEnd, -(heightHigh + nextHeightHigh) / 2);
            (strokeMode ? ctx.lt(xEnd, -(heightLow + nextHeightLow) / 2)
                : ctx.mt(xEnd, -(heightLow + nextHeightLow) / 2))
                .lt(0, -heightLow).lt(xStart, -(prevHeightLow + heightLow) / 2);
        };

        const drawLastChunk = (strokeMode) => {
            ctx.lt(xStart, -(prevHeightLow + heightLow) / 2);
            (strokeMode ? ctx.lt(xStart, -(prevHeightHigh + heightHigh) / 2)
                : ctx.mt(xStart, -(prevHeightHigh + heightHigh) / 2))
                .lt(0, -heightHigh).lt(xEnd, -heightHigh);
            (strokeMode ? ctx.lt(xEnd, -heightLow) : ctx.mt(xEnd, -heightLow))
                .lt(0, -heightLow).lt(xStart, -(prevHeightLow + heightLow) / 2);
        };

        if (prevHeightLow == null) {
            drawVeryFirstChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawVeryFirstChunk(false);
        } else if (nextHeightLow != null) {
            drawOrdinaryChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawOrdinaryChunk(false);
        } else {
            drawLastChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawLastChunk(false);
        }

        shapes[0].graphics.es();
    }

    static drawHorizontalTrendPart(shapes,
                                   prevWidth,
                                   width,
                                   nextWidth,
                                   fillPaint,
                                   strokePaint,
                                   height,
                                   margin,
                                   paintBounds) {
        let yStart = -height / 2 + margin / 2;
        let yEnd = yStart + height - margin;

        const ctx = shapes[0].graphics;

        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);

        const drawVeryFirstChunk = (strokeMode) => {
            ctx.mt(0, yStart);
            (strokeMode ? ctx.lt(width, yStart) : ctx.mt(width, yStart))
                .lt(width, 0).lt((width + nextWidth) / 2, yEnd);
            strokeMode ? ctx.lt(0, yEnd) : ctx.mt(0, yEnd);
        };

        const drawOrdinaryChunk = (strokeMode) => {
            ctx.mt(0, yStart);
            (strokeMode ? ctx.lt((prevWidth + width) / 2, yStart)
                        : ctx.mt((prevWidth + width) / 2, yStart))
                .lt(width, 0).lt((width + nextWidth) / 2, yEnd);
            strokeMode ? ctx.lt(0, yEnd) : ctx.mt(0, yEnd);
        };

        const drawLastChunk = (strokeMode) => {
            ctx.mt(0, yStart);
            (strokeMode ? ctx.lt((prevWidth + width) / 2, yStart)
                        :ctx.mt((prevWidth + width) / 2, yStart))
                .lt(width, 0).lt(width, yEnd);
            strokeMode ? ctx.lt(0, yEnd) : ctx.mt(0, yEnd);
        };

        if (prevWidth == null) {
            drawVeryFirstChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawVeryFirstChunk(false);
        } else if (nextWidth != null) {
            drawOrdinaryChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawOrdinaryChunk(false);
        } else { // very last point
            drawLastChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawLastChunk(false);
        }
        shapes[0].graphics.es();
    }

    static drawHorizontalTrendPartAerial(shapes,
                                       prevWidthLow,
                                       widthLow,
                                       nextWidthLow,
                                       prevWidthHigh,
                                       widthHigh,
                                       nextWidthHigh,
                                       fillPaint,
                                       strokePaint,
                                       height,
                                       margin,
                                       paintBounds) {
        let yStart = -height / 2 + margin / 2;
        let yEnd = yStart + height - margin;

        const ctx = shapes[0].graphics;

        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);

        const drawVeryFirstChunk = (strokeMode) => {
            ctx.mt(widthLow, yStart);
            (strokeMode ? ctx.lt(widthHigh, yStart) : ctx.mt(widthHigh, yStart))
                .lt(widthHigh, 0)
                .lt((widthHigh + nextWidthHigh) / 2, yEnd);
            (strokeMode ? ctx.lt((widthLow + nextWidthLow) / 2, yEnd)
                : ctx.mt((widthLow + nextWidthLow) / 2, yEnd))
                .lt(widthLow, 0)
                .lt(widthLow, yStart);
        };

        const drawOrdinaryChunk = (strokeMode) => {
            ctx.mt((prevWidthLow + widthLow) / 2, yStart);
            (strokeMode ? ctx.lt((prevWidthHigh + widthHigh) / 2, yStart)
                : ctx.mt((prevWidthHigh + widthHigh) / 2, yStart))
                .lt(widthHigh, 0)
                .lt((widthHigh + nextWidthHigh) / 2, yEnd);
            (strokeMode ? ctx.lt((widthLow + nextWidthLow) / 2, yEnd)
                : ctx.mt((widthLow + nextWidthLow) / 2, yEnd))
                .lt(widthLow, 0)
                .lt((prevWidthLow + widthLow) / 2, yStart);
        };

        const drawLastChunk = (strokeMode) => {
            ctx.lt((prevWidthLow + widthLow) / 2, yStart);
            (strokeMode ? ctx.lt((prevWidthHigh + widthHigh) / 2, yStart)
                : ctx.mt((prevWidthHigh + widthHigh) / 2, yStart))
                .lt(widthHigh, 0)
                .lt(widthHigh, yEnd);
            (strokeMode ? ctx.lt(widthLow, yEnd) : ctx.mt(widthLow, yEnd))
                .lt(widthLow, 0)
                .lt((prevWidthLow + widthLow) / 2, yStart);
        };

        if (prevWidthLow == null) {
            drawVeryFirstChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawVeryFirstChunk(false);
        } else if (nextWidthLow != null) {
            drawOrdinaryChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawOrdinaryChunk(false);
        } else {
            drawLastChunk(true);
            shapes[0].graphics.ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            drawLastChunk(false);
        }

        shapes[0].graphics.es();
    }

    static drawVerticalSplinePart(shapes, splinePoints, fillPaint, strokePaint, paintBounds) {
        const ctx = shapes[0].graphics;
        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);

        const drawSplineChunk = (strokeMode) => {
            ctx.mt(splinePoints[0], 0);
            strokeMode ? ctx.lt(splinePoints[0], -splinePoints[1])
                       : ctx.mt(splinePoints[0], -splinePoints[1]);
            for (let idx = 0; idx < splinePoints.length; idx += 2) {
                ctx.lt(splinePoints[idx], (-splinePoints[idx + 1] > 0 ? 0 : -splinePoints[idx + 1]));
            }
            strokeMode ? ctx.lt(splinePoints[splinePoints.length - 2], 0)
                       : ctx.mt(splinePoints[splinePoints.length - 2], 0);

        };

        drawSplineChunk(true);
        ctx.ef();
        strokePaint.applyStrokePaint(ctx, paintBounds);
        drawSplineChunk(false);
        ctx.es();
    }

    static drawVerticalSplinePartAerial(shapes, splinePointsLow, splinePointsHigh,
                                        fillPaint, strokePaint, paintBounds) {
        const ctx = shapes[0].graphics;
        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);

        const drawSplineChunk = (strokeMode) => {
            strokeMode ? ctx.lt(splinePointsLow[0], -splinePointsLow[1])
                : ctx.mt(splinePointsLow[0], -splinePointsLow[1]);
            for (let idx = 0; idx < splinePointsLow.length; idx += 2) {
                ctx.lt(splinePointsLow[idx], (-splinePointsLow[idx + 1] > 0 ? 0 : -splinePointsLow[idx + 1]));
            }
            // transition to high region drawing
            strokeMode
                ? ctx.lt(splinePointsHigh[splinePointsHigh.length - 2], -splinePointsHigh[splinePointsHigh.length - 1])
                : ctx.mt(splinePointsHigh[splinePointsHigh.length - 2], -splinePointsHigh[splinePointsHigh.length - 1]);
            for (let idx = splinePointsHigh.length - 4; idx >= 0; idx -= 2) {
                ctx.lt(splinePointsHigh[idx], (-splinePointsHigh[idx + 1] > 0 ? 0 : -splinePointsHigh[idx + 1]));
            }
            //close the shape
            strokeMode ? ctx.lt(splinePointsLow[0], -splinePointsLow[1])
                       : ctx.mt(splinePointsLow[0], -splinePointsLow[1]);
        };

        drawSplineChunk(true);
        ctx.ef();
        strokePaint.applyStrokePaint(ctx, paintBounds);
        drawSplineChunk(false);
        ctx.es();
    }

    static drawHorizontalSplinePart(shapes, splinePoints, fillPaint, strokePaint, paintBounds) {
        const ctx = shapes[0].graphics;

        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);

        const drawSplineChunk = (strokeMode) => {
            ctx.mt(0, splinePoints[0]);
            strokeMode ? ctx.lt(splinePoints[1], splinePoints[0])
                       : ctx.mt(splinePoints[1], splinePoints[0]);

            for (let idx = 0; idx < splinePoints.length; idx += 2) {
                ctx.lt((splinePoints[idx + 1] < 0 ? 0 : splinePoints[idx + 1]), splinePoints[idx]);
            }

            strokeMode ? ctx.lt(0, splinePoints[splinePoints.length - 2])
                       :ctx.mt(0, splinePoints[splinePoints.length - 2]);
        };

        drawSplineChunk(true);
        ctx.ef();
        strokePaint.applyStrokePaint(ctx, paintBounds);
        drawSplineChunk(false);
        ctx.es();
    }

    static drawHorizontalSplinePartAerial(shapes, splinePointsLow, splinePointsHigh,
                                        fillPaint, strokePaint, paintBounds) {
        const ctx = shapes[0].graphics;
        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);

        const drawSplineChunk = (strokeMode) => {
            strokeMode ? ctx.lt(splinePointsLow[1], splinePointsLow[0])
                : ctx.mt(splinePointsLow[1], splinePointsLow[0]);
            for (let idx = 0; idx < splinePointsLow.length; idx += 2) {
                ctx.lt((splinePointsLow[idx + 1] < 0 ? 0 : splinePointsLow[idx + 1]), splinePointsLow[idx]);
            }
            // transition to high region drawing
            strokeMode
                ? ctx.lt(splinePointsHigh[splinePointsHigh.length - 1], splinePointsHigh[splinePointsHigh.length - 2])
                : ctx.mt(splinePointsHigh[splinePointsHigh.length - 1], splinePointsHigh[splinePointsHigh.length - 2]);
            for (let idx = splinePointsHigh.length - 4; idx >= 0; idx -= 2) {
                ctx.lt((splinePointsHigh[idx + 1] < 0 ? 0 : splinePointsHigh[idx + 1]), splinePointsHigh[idx]);
            }
            //close the shape
            strokeMode ? ctx.lt(splinePointsLow[1], splinePointsLow[0])
                       : ctx.mt(splinePointsLow[1], splinePointsLow[0]);
        };

        drawSplineChunk(true);
        ctx.ef();
        strokePaint.applyStrokePaint(ctx, paintBounds);
        drawSplineChunk(false);
        ctx.es();
    }

    static drawCandlestick(shapes, points, fillPaint, strokePaint, orientation, figSize, paintBounds) {
        if (points.open >= points.close) {
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            if (orientation === HORIZONTAL) {
                shapes[0].graphics
                    .mt(0, points.low)
                    .lt(0, points.open)
                    .dr(-figSize / 2, points.open, figSize, points.close - points.open)
                    .mt(0, points.close)
                    .lt(0, points.high);
            } else {
                shapes[0].graphics
                    .mt(points.low, 0)
                    .lt(points.close, 0)
                    .mt(points.open, 0)
                    .lt(points.high, 0)
                    .dr(points.open, -figSize / 2, points.close - points.open, figSize);
            }
            shapes[0].graphics.es();
        } else {
            fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);
            if (orientation === HORIZONTAL) {
                shapes[0].graphics
                    .mt(0, points.low)
                    .lt(0, points.close)
                    .mt(0, points.open)
                    .lt(0, points.high)
                    .dr(-figSize / 2, points.close, figSize, points.open - points.close);
            } else {
                shapes[0].graphics
                    .mt(points.close, 0)
                    .lt(points.high, 0)
                    .mt(points.open, 0)
                    .lt(points.low, 0)
                    .dr(points.close, -figSize / 2, points.open - points.close, figSize);
            }
            shapes[0].graphics.ef().es();
        }
    }

    static drawScatterShape(shapes, shapeType, fillPaint, strokePaint, orientation, size) {
        let paintBounds = {x: -size / 2, y: -size / 2, width: size, height: size};
        fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);
        strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds);

        switch (shapeType) {
            case SCATTER_SHAPE_TYPES.CIRCLE:
                if (orientation === HORIZONTAL) {
                    shapes[0].graphics.drawCircle(0, 0, size / 2);
                } else {
                    shapes[0].graphics.drawCircle(0, 0, size / 2);
                }
                break;
            case SCATTER_SHAPE_TYPES.DIAMOND:
                if (orientation === HORIZONTAL) {
                    shapes[0].graphics.mt(0, -size / 2)
                        .lt(size / 2, 0)
                        .lt(0, size / 2)
                        .lt(-size / 2, 0)
                        .lt(0, -size / 2);
                } else {
                    shapes[0].graphics.mt(-size / 2, 0)
                        .lt(0, size / 2)
                        .lt(size / 2, 0)
                        .lt(0, -size / 2)
                        .lt(-size / 2, 0);
                }
                break;
            case SCATTER_SHAPE_TYPES.SQUARE:
                shapes[0].graphics.dr(-size / 2, -size / 2, size, size);
                break;
            case SCATTER_SHAPE_TYPES.TRIANGLE:
                if (orientation === HORIZONTAL) {
                    shapes[0].graphics.mt(0, -size / 2)
                        .lt(size / 2, size / 2)
                        .lt(-size / 2, size / 2)
                        .lt(0, -size / 2);
                } else {
                    shapes[0].graphics.mt(0, -size / 2)
                        .lt(size / 2, size / 2)
                        .lt(-size / 2, size / 2)
                        .lt(0, -size / 2);
                }
                break;
            default:
                console.warn("Unsupported shape type provided");
                break;
        }

        shapes[0].graphics.es().ef();
    }

    static drawBar(shapes, fillPaint, strokePaint, orientation, x, y, magnitude, size, paintBounds) {
        if (orientation === HORIZONTAL) {
            fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds)
                .dr(x, -magnitude, size, magnitude)
                .ef().es();
        } else {
            fillPaint.applyFillPaint(shapes[0].graphics, paintBounds)
                .dr(0, y, magnitude, size)
                .ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds)
                .dr(0, y, magnitude, size)
                .es();
        }
    }

    static drawBarAerial(shapes, fillPaint, strokePaint, orientation, x, y,
                         magnitudeLow, magnitudeHigh, size, paintBounds) {
        let diff = magnitudeHigh - magnitudeLow;
        if (orientation === HORIZONTAL) {
            fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds)
                .dr(x, -magnitudeHigh, size, diff)
                .ef().es();
        } else {
            fillPaint.applyFillPaint(shapes[0].graphics, paintBounds)
                .dr(magnitudeLow, y, diff, size)
                .ef();
            strokePaint.applyStrokePaint(shapes[0].graphics, paintBounds)
                .dr(magnitudeLow, y, diff, size)
                .es();
        }
    }

    static drawHeightBasedFunnel(shapes, fillPaint, strokePaint, orientation, x, y,
                                 magnitude, w, h, paintBounds) {
        let ctx;
        let isFillSet   = fillPaint instanceof PaintSet;
        let isStrokeSet = strokePaint instanceof PaintSet;

        ctx = fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);
        strokePaint.applyStrokePaint(ctx, paintBounds);

        if (orientation === HORIZONTAL) {
            let curXStart = x, curXEnd = x + w, curHeight = -h;
            for (let idx = 0; idx < magnitude.length; idx++) {
                if (isFillSet) {
                    fillPaint.setCurrentPaint(idx);
                    fillPaint.applyFillPaint(ctx, paintBounds);
                }
                if (isStrokeSet) {
                    strokePaint.setCurrentPaint(idx);
                    strokePaint.applyFillPaint(ctx, paintBounds);
                }
                ctx.mt(curXStart, curHeight).lt(curXEnd, curHeight);
                curHeight += h * magnitude[idx];
                let curOffsetX = (w / 4) * magnitude[idx];
                curXStart += curOffsetX;
                curXEnd -= curOffsetX;
                ctx.lt(curXEnd, curHeight)
                    .lt(curXStart, curHeight)
                    .lt(curXStart - curOffsetX, curHeight - h * magnitude[idx]).ef().es();
            }
        } else {
            let curYStart = y, curYEnd = y + h, curWidth = w;
            for (let idx = 0; idx < magnitude.length; idx++) {
                if (isFillSet) {
                    fillPaint.setCurrentPaint(idx);
                    fillPaint.applyFillPaint(ctx, paintBounds);
                }
                if (isStrokeSet) {
                    strokePaint.setCurrentPaint(idx);
                    strokePaint.applyFillPaint(ctx, paintBounds);
                }
                ctx.mt(curWidth, curYStart).lt(curWidth, curYEnd);
                curWidth -= w * magnitude[idx];
                let curOffsetY = (h / 4) * magnitude[idx];
                curYStart += curOffsetY;
                curYEnd -= curOffsetY;
                ctx.lt(curWidth, curYEnd)
                    .lt(curWidth, curYStart)
                    .lt(curWidth + w * magnitude[idx], curYStart - curOffsetY).ef().es();
            }
        }
    }

    static drawAreaBasedFunnel(shapes, fillPaint, strokePaint, orientation, x, y,
                                 magnitude, w, h, paintBounds) {
        let ctx;
        let isFillSet   = fillPaint instanceof PaintSet;
        let isStrokeSet = strokePaint instanceof PaintSet;

        ctx = fillPaint.applyFillPaint(shapes[0].graphics, paintBounds);
        strokePaint.applyStrokePaint(ctx, paintBounds);
        let funnelStepFraction = 1 / magnitude.length;

        if (orientation === HORIZONTAL) {
            let curXStart = x, curXEnd = x + w, curHeight = -h;
            ctx.mt(curXStart, curHeight).lt(curXEnd, curHeight)
                .lt(curXEnd, curHeight + h * funnelStepFraction)
                .lt(curXStart, curHeight + h * funnelStepFraction)
                .lt(curXStart,curHeight).ef().es();
            curHeight += h * funnelStepFraction;
            for (let idx = 1; idx < magnitude.length; idx++) {
                if (isFillSet) {
                    fillPaint.setCurrentPaint(idx);
                    fillPaint.applyFillPaint(ctx, paintBounds);
                }
                if (isStrokeSet) {
                    strokePaint.setCurrentPaint(idx);
                    strokePaint.applyFillPaint(ctx, paintBounds);
                }
                ctx.mt(curXStart, curHeight).lt(curXEnd, curHeight);
                curHeight += h * funnelStepFraction;
                let curOffsetX = (w - w * (magnitude[idx] / magnitude[idx - 1])) / 2;
                w -= w * (1 - (magnitude[idx] / magnitude[idx - 1]));
                curXStart += curOffsetX;
                curXEnd -= curOffsetX;
                ctx.lt(curXEnd, curHeight)
                    .lt(curXStart, curHeight)
                    .lt(curXStart - curOffsetX, curHeight - h * funnelStepFraction)
                    .ef().es();
            }
        } else {
            let curYStart = y, curYEnd = y + h, curWidth = w;
            ctx.mt(curWidth, curYStart).lt(curWidth, curYEnd)
                .lt(curWidth - w * funnelStepFraction, curYEnd)
                .lt(curWidth - w * funnelStepFraction, curYStart)
                .lt(curWidth, curYStart).ef().es();
            curWidth -= w * funnelStepFraction;
            for (let idx = 1; idx < magnitude.length; idx++) {
                if (isFillSet) {
                    fillPaint.setCurrentPaint(idx);
                    fillPaint.applyFillPaint(ctx, paintBounds);
                }
                if (isStrokeSet) {
                    strokePaint.setCurrentPaint(idx);
                    strokePaint.applyFillPaint(ctx, paintBounds);
                }
                ctx.mt(curWidth, curYStart).lt(curWidth, curYEnd);
                curWidth -= w * funnelStepFraction;
                let curOffsetY = (h - h * (magnitude[idx] / magnitude[idx - 1])) / 2;
                h -= h * (1 - (magnitude[idx] / magnitude[idx - 1]));
                curYStart += curOffsetY;
                curYEnd -= curOffsetY;
                ctx.lt(curWidth, curYEnd)
                    .lt(curWidth, curYStart)
                    .lt(curWidth - w * funnelStepFraction, curYStart + curOffsetY)
                    .ef().es();
            }
        }
    }
};