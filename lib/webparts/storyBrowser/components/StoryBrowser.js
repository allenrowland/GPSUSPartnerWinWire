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
import styles from './StoryBrowser.module.scss';
import * as story from '../Story';
import JQuery from 'jquery';
var inputStyle = {
    fontFamily: "Sego UI, FontAwesome, sans-serif",
    placeholder: "Search by partner name  &#xF002"
};
JQuery('.filters-dropdown  .activate').click(function () {
    JQuery('.filters-dropdown .filters').toggleClass('show');
});
var StoryBrowser = /** @class */ (function (_super) {
    __extends(StoryBrowser, _super);
    function StoryBrowser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StoryBrowser.prototype.render = function () {
        var _a = this.props, description = _a.description, isDarkTheme = _a.isDarkTheme, environmentMessage = _a.environmentMessage, hasTeamsContext = _a.hasTeamsContext, userDisplayName = _a.userDisplayName;
        var featuredStories;
        var otherStories;
        return (React.createElement("section", { id: "storyBrowser" },
            React.createElement("div", { id: "filters" },
                React.createElement("div", { className: styles.filtersDropdown },
                    React.createElement("div", { className: styles.activate },
                        "Filter your results ",
                        React.createElement("i", { className: "fa fa-chevron-down" })),
                    React.createElement("div", { className: styles.filters },
                        React.createElement("div", null,
                            React.createElement("p", { className: styles.uncheck }, "Uncheck All"),
                            React.createElement("strong", null, "Industry:"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Automotive"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Education"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Energy"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Financial Services"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Government")),
                            React.createElement("br", null),
                            React.createElement("strong", null, "Solution area:"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Azure Apps and Infra"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Azure Data & AI"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Modern Work (M365 + Surface)"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Security (Azure + M365) Business Apps"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " (Dynamics + Power Platform)"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Surface"))),
                        React.createElement("div", null,
                            React.createElement("strong", null, "Partner Type:"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " ISV"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Services"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Other")),
                            "   ",
                            React.createElement("br", null),
                            React.createElement("strong", null, "Story Type:"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Internal Win Wire"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " External Case Study")),
                            "   ",
                            React.createElement("br", null),
                            React.createElement("strong", null, "Keyword/tag filter:"),
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Compete"),
                                React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " Marketplace")))))),
            React.createElement("div", { className: styles.filtersSearch },
                React.createElement("input", { style: inputStyle, placeholder: "Search by partner name", type: "text", name: "namesearch" }),
                " "),
            React.createElement("div", { className: styles.sortResults },
                React.createElement("button", { className: styles.sortBtn },
                    React.createElement("span", null, "Sort A-Z")),
                React.createElement("span", null, "187 results")),
            this.stories(featuredStories),
            this.stories(otherStories)));
    };
    StoryBrowser.prototype.stories = function (items, featured) {
        var _this = this;
        if (featured === void 0) { featured = false; }
        if (items == null || items.length < 1) {
            return (null);
        }
        return (React.createElement("div", null, featured ? (React.createElement("div", { id: "featuredItems" },
            React.createElement("h4", null, "Featured"),
            React.createElement("div", { className: styles.items }, items.map(function (value, index) {
                return _this.storyCard(value);
            })))) : (React.createElement("div", { className: styles.items }))));
    };
    StoryBrowser.prototype.storyCard = function (item) {
        return (React.createElement("div", { className: styles.item },
            React.createElement("img", { src: "https://via.placeholder.com/320x179", alt: "" }),
            React.createElement("a", { className: "itemTitle", href: "${item.URL}" }, item.Title),
            React.createElement("p", { className: "itemDate" },
                React.createElement("strong", null, story.GSPUSHelper._formatDate(item.PublishDate))),
            React.createElement("p", { className: "itemPartner" },
                "PARTNER: ",
                story.GSPUSHelper._listAll(item.Partner)),
            React.createElement("p", { className: "itemIndusty" },
                "INDUSTRY: ",
                story.GSPUSHelper._listAll(item.Industry)),
            React.createElement("p", { className: "itemSolution" },
                "SOLUTION: ",
                story.GSPUSHelper._listAll(item.SolutionArea)),
            React.createElement("p", { className: "itemType" },
                "STORY TYPE: ",
                item.StoryType)));
    };
    StoryBrowser.prototype.sayHello = function () {
        console.log('Leave me alone');
    };
    return StoryBrowser;
}(React.Component));
export default StoryBrowser;
//# sourceMappingURL=StoryBrowser.js.map