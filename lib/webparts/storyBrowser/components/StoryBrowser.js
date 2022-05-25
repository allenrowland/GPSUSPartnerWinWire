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
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
initializeIcons();
var ChevronDownIcon = function () { return React.createElement(Icon, { iconName: "ChevronDown" }); };
var SearchIcon = function () { return React.createElement(Icon, { iconName: "Search" }); };
var inputStyle = {
    fontFamily: "Sego UI, Arial, sans-serif",
    placeholder: "Search by partner name <SearchIcon />"
};
var StoryBrowser = /** @class */ (function (_super) {
    __extends(StoryBrowser, _super);
    function StoryBrowser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StoryBrowser.prototype.render = function () {
        var _a = this.props, stories = _a.stories, tagsFilters = _a.tagsFilters, industryFilters = _a.industryFilters, partnerTypeFilters = _a.partnerTypeFilters, solutionAreaFilters = _a.solutionAreaFilters, storyTypeFilters = _a.storyTypeFilters;
        console.log(this.props.stories);
        var featuredStories = this.props.stories.filter(function (item) { return item.Featured == "Yes"; });
        var otherStories = this.props.stories.filter(function (item) { return item.Featured != "Yes"; });
        return (React.createElement("section", { id: "storyBrowser" },
            React.createElement("div", { id: "filters" },
                React.createElement("div", { className: styles.filtersDropdown },
                    React.createElement("div", { onClick: this.toggleFilters, className: styles.activate },
                        "Filter your results ",
                        React.createElement(ChevronDownIcon, null)),
                    React.createElement("div", { className: styles.filters },
                        React.createElement("div", null,
                            React.createElement("p", { className: styles.uncheck }, "Uncheck All"),
                            React.createElement("strong", null, "Industry:"),
                            React.createElement("ul", null, this.props.industryFilters.map(function (value, index) {
                                return React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " ",
                                    value);
                            })),
                            React.createElement("br", null),
                            React.createElement("strong", null, "Solution area:"),
                            React.createElement("ul", null, this.props.solutionAreaFilters.map(function (value, index) {
                                return React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " ",
                                    value);
                            }))),
                        React.createElement("div", null,
                            React.createElement("strong", null, "Partner Type:"),
                            React.createElement("ul", null, this.props.partnerTypeFilters.map(function (value, index) {
                                return React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " ",
                                    value);
                            })),
                            "   ",
                            React.createElement("br", null),
                            React.createElement("strong", null, "Story Type:"),
                            React.createElement("ul", null, this.props.storyTypeFilters.map(function (value, index) {
                                return React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " ",
                                    value);
                            })),
                            "   ",
                            React.createElement("br", null),
                            React.createElement("strong", null, "Keyword/tag filter:"),
                            React.createElement("ul", null, this.props.tagsFilters.map(function (value, index) {
                                return React.createElement("li", null,
                                    React.createElement("input", { type: "checkbox", value: "", checked: true }),
                                    " ",
                                    value);
                            })))))),
            React.createElement("div", { className: styles.filtersSearch },
                React.createElement("input", { style: inputStyle, placeholder: "Search by partner name", type: "text", name: "namesearch" }),
                " ",
                React.createElement(SearchIcon, null),
                " "),
            React.createElement("div", { className: styles.sortResults },
                React.createElement("button", { className: styles.sortBtn },
                    React.createElement("span", null, "Sort A-Z")),
                React.createElement("span", null, story.GSPUSStoryHelper._resultCount(this.props.stories))),
            this.stories(featuredStories, true),
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
            })))) : (React.createElement("div", { className: styles.items }, items.map(function (value, index) {
            return _this.storyCard(value);
        })))));
    };
    StoryBrowser.prototype.storyCard = function (item) {
        return (React.createElement("div", { className: styles.item },
            React.createElement("img", { src: "https://via.placeholder.com/320x179", alt: "" }),
            React.createElement("a", { className: "itemTitle", href: "${item.URL}" }, item.Title),
            React.createElement("p", { className: "itemDate" },
                React.createElement("strong", null, story.GSPUSStoryHelper._formatDate(item.PublishDate))),
            React.createElement("p", { className: "itemPartner" },
                "PARTNER: ",
                story.GSPUSStoryHelper._listAll(item.Partner)),
            React.createElement("p", { className: "itemIndusty" },
                "INDUSTRY: ",
                story.GSPUSStoryHelper._listAll(item.Industry)),
            React.createElement("p", { className: "itemSolution" },
                "SOLUTION: ",
                story.GSPUSStoryHelper._listAll(item.SolutionArea)),
            React.createElement("p", { className: "itemType" },
                "STORY TYPE: ",
                item.StoryType)));
    };
    StoryBrowser.prototype.sayHello = function () {
        console.log('Leave me alone');
    };
    StoryBrowser.prototype.toggleFilters = function () {
        document.getElementById("filters").classList.toggle(styles.show);
    };
    return StoryBrowser;
}(React.Component));
export default StoryBrowser;
//# sourceMappingURL=StoryBrowser.js.map
