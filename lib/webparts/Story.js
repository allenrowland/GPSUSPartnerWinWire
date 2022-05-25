import * as moment from 'moment';
var GSPUSStoryHelper = /** @class */ (function () {
    function GSPUSStoryHelper() {
    }
    GSPUSStoryHelper._listAll = function (items, spacer) {
        if (spacer === void 0) { spacer = ', '; }
        console.log(items);
        var res = '';
        var i = 0;
        if (items != null) {
            for (var j in items) {
                if (i > 0) {
                    res += spacer;
                }
                res += items[j];
                i++;
            }
        }
        return res;
    };
    GSPUSStoryHelper._formatDate = function (date) {
        return moment(date).format('MMMM YYYY');
    };
    GSPUSStoryHelper._resultCount = function (stories) {
        var res = '';
        var count = stories.length;
        if (count >= 5000) {
            res = '5,000+ Results';
        }
        else if (count == 0) {
            res = 'No Results';
        }
        else {
            res = count.toLocaleString() + ' Results';
        }
        return res;
    };
    return GSPUSStoryHelper;
}());
export { GSPUSStoryHelper };
//# sourceMappingURL=Story.js.map