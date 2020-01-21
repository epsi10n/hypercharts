import moment from "moment";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
/**
 * Various utils for mock data generation
 */
export default class MockUtils {
    static createTimelineModelPlain(decades) {
        let layeredResult = [];
        let currentLayer = [];
        let startDate = new Date();
        let fmt = "DD.MM.YYYY";
        let start = "01.01.2017";
        let m = moment(start, fmt);

        startDate.setMonth(0);
        startDate.setDate(1);
        // Layer 0 - hours
        for (let idx = 0; idx < 365 * (decades || 1) * 10 * 24; idx++) {
            currentLayer.push({
                value: Math.round(Math.random() * 50) + 50,
                label: m.hour() + ":" + m.minute()
            });
            m.add(1, 'hours');
        }
        layeredResult.push(currentLayer);
        currentLayer = MockUtils._toDays(currentLayer, fmt);
        layeredResult.push(currentLayer);
        currentLayer = MockUtils._toWeeks(currentLayer, fmt);
        layeredResult.push(currentLayer);
        currentLayer = MockUtils._toMonths(currentLayer, fmt);
        layeredResult.push(currentLayer);
        currentLayer = MockUtils._toYears(currentLayer, fmt);
        layeredResult.push(currentLayer);
        currentLayer = MockUtils._toDecades(currentLayer, fmt);
        layeredResult.push(currentLayer);


        return layeredResult;
    }

    // hours -> days
    static _toDays(hoursModel, fmt) {
        let result = [];

        let m = moment("01.01.2017", fmt);

        for (let idx = 0; idx < hoursModel.length; idx += 24) {
            let days = hoursModel.slice(idx, idx + 24);
            let daySum = 0;
            days.forEach((item) => {daySum += item.value});
            result.push({
                value: Math.round(daySum / 24),
                label: m.format(fmt)
            });
            m.add(1, 'days');
        }

        return result;
    }

    // days -> weeks
    static _toWeeks(daysModel, fmt) {
        let result = [];

        let m = moment("01.01.2017", fmt);

        for (let idx = 0; idx < daysModel.length; idx += 7) {
            let weeks = daysModel.slice(idx, idx + 7);
            let weekSum = 0;
            weeks.forEach((item) => {weekSum += item.value});
            result.push({
                value: Math.round(weekSum / 7),
                label: m.format(fmt)
            });
            m.add(1, 'weeks');
        }

        return result;
    }

    // weeks -> months
    static _toMonths(weeksModel, fmt) {
        let result = [];

        let m = moment("01.01.2017", fmt);

        for (let idx = 0; idx < weeksModel.length; idx += 4) {
            let months = weeksModel.slice(idx, idx + 4);
            let monthSum = 0;
            months.forEach((item) => {monthSum += item.value});
            result.push({
                value: Math.round(monthSum / 7),
                label: m.format(fmt)
            });
            m.add(1, 'months');
        }

        return result;
    }

    // months -> years
    static _toYears(monthsModel, fmt) {
        let result = [];

        let m = moment("01.01.2017", fmt);

        for (let idx = 0; idx < monthsModel.length; idx += 12) {
            let years = monthsModel.slice(idx, idx + 4);
            let yearSum = 0;
            years.forEach((item) => {yearSum += item.value});
            result.push({
                value: Math.round(yearSum / 12),
                label: m.year()
            });
            m.add(1, 'years');
        }

        return result;
    }

    // years -> decades
    static _toDecades(yearsModel, fmt) {
        let result = [];

        let m = moment("01.01.2017", fmt);

        for (let idx = 0; idx < yearsModel.length; idx += 10) {
            let decades = yearsModel.slice(idx, idx + 10);
            let decadeSum = 0;
            decades.forEach((item) => {decadeSum += item.value});
            result.push({
                value: Math.round(decadeSum / 10),
                label: m.year() + "-" + (m.year() + 10)
            });
            m.add(10, 'years');
        }

        return result;
    }
};