import moment from 'moment';

export default class ChartUtils {
    static applyPixelRatioToInsets(sourceInsets) {
        let _sourceInsets = sourceInsets || {top: 0, left: 0, right: 0, bottom: 0};
        let _pixelRatio   = window.devicePixelRatio || 1;
        return {
            top: _sourceInsets.top * _pixelRatio,
            left: _sourceInsets.left * _pixelRatio,
            right: _sourceInsets.right * _pixelRatio,
            bottom: _sourceInsets.bottom * _pixelRatio
        }
    }

    static getAxisCandlestickRange(data, _subDiv, inverted) {
        let convertedData = [];
        
        for (let idx = 0; idx < data.length; idx++) {
            convertedData.push({value: data[idx].low});
            convertedData.push({value: data[idx].open});
            convertedData.push({value: data[idx].close});
            convertedData.push({value: data[idx].high});
        }
        
        return this.getAxisRange(convertedData, _subDiv, inverted);
    }

    static getAxisRange(data, _subDiv, inverted) {
        let subDiv = (_subDiv < 1 ? 1 : (Math.abs(_subDiv) - 1) || 1);
        let result = {};
        let min = 0, max = 100;

        if (data) {
            min = 0;
            max = data[0].value;
            for (let idx = 1; idx < data.length; idx++) {
                if (data[idx].value > max) {
                    max = data[idx].value;
                }
                if (data[idx].value < min) {
                    min = data[idx].value;
                }
            }
        }

        let range = max - min;
        let unRoundedTickSize = range / subDiv;
        let x = Math.ceil(Math.log10(unRoundedTickSize)-1);
        let pow10x = Math.pow(10, x);
        let roundedTickRange = Math.ceil(unRoundedTickSize / pow10x) * pow10x;
        let resMin = roundedTickRange * Math.round(min / roundedTickRange);
        let resMax = roundedTickRange * Math.round(1 + max / roundedTickRange);
        
        return {
            min: isNaN(resMin) ? 0 : resMin,
            max: isNaN(resMax) ? 100: resMax,
            step: isNaN(roundedTickRange) ? 25: roundedTickRange
        };
    }

    static timeGroupingIndices(data, vals, periodTo, fmt) {
        let d1 = moment(vals[0], fmt).startOf(periodTo).format(fmt);
        let d2 = moment(vals[1], fmt).startOf(periodTo).format(fmt);

        let layerIdx = 0;

        if (periodTo === 'day') {
            layerIdx = 0;
        } if (periodTo === 'week') {
            layerIdx = 1;
        } else if (periodTo === 'month') {
            layerIdx = 2;
        }

        let lblData = data[layerIdx].map((e) => {return e.label;});

        let i1 = lblData.indexOf(d1);
        let i2 = lblData.indexOf(d2);

        if (i1 === -1) i1 = 0;
        if (i2 === -1) i2 = data[layerIdx].length - 1;

        return [i1, i2];
    }
}
