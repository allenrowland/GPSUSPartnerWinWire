var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
var FilterGroup = /** @class */ (function (_super) {
    __extends(FilterGroup, _super);
    function FilterGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            _storyBrowserStateFilters: [],
        };
        _this.onChange = function (event) {
            var onChange = _this.props.onChange;
            var filterValue = event.target.value;
            if (onChange) {
                onChange(filterValue, event.target.checked);
            }
        };
        return _this;
    }
    FilterGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, filterOptions = _a.filterOptions, groupName = _a.groupName, activeFilters = _a.activeFilters, title = _a.title;
        return (React.createElement("div", null,
            React.createElement("strong", null,
                title,
                ":"),
            React.createElement("ul", null, filterOptions.map(function (filterValue) { return (React.createElement("li", null,
                React.createElement("label", null,
                    React.createElement("input", { type: "checkbox", value: filterValue.Value + '|' + groupName, checked: activeFilters.indexOf(filterValue.Value + '|' + groupName) > -1, onChange: _this.onChange }),
                    React.createElement("span", null, filterValue.Value)))); }))));
    };
    return FilterGroup;
}(React.Component));
export default FilterGroup;
//# sourceMappingURL=FilterGroup.js.map