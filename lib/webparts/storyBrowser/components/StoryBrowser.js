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
import * as story from '../../Story';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import FilterGroup from '../components/FilterGroup';
initializeIcons();
var ChevronDownIcon = function () { return React.createElement(Icon, { iconName: "ChevronDown" }); };
var SearchIcon = function () { return React.createElement(Icon, { iconName: "Search" }); };
var ChevronRightIcon = function () { return React.createElement(Icon, { iconName: "ChevronRight" }); };
var inputStyle = {
    fontFamily: "Segoe UI, Arial, sans-serif",
    placeholder: "Search by partner name <SearchIcon />"
};
var StoryBrowser = /** @class */ (function (_super) {
    __extends(StoryBrowser, _super);
    function StoryBrowser(props, state) {
        var _this = _super.call(this, props) || this;
        _this.handleSearchChange = function (event) {
            var searchValue = event.target.value;
            _this.setState({ _storyBrowserStateSearchTerm: searchValue });
        };
        _this.handleSortChange = function (event) {
            var sortValue = event.target.value;
            _this.setState({ _storyBrowserStateSort: sortValue });
        };
        _this.onSubmissionTypeFilterChange = function (filter, isActive) {
            var currentFilters = _this.state._storyBrowserStateFilters.filter(function (item) { return item !== filter; });
            if (isActive) {
                currentFilters.push(filter);
            }
            _this.setState({ _storyBrowserStateFilters: currentFilters });
        };
        _this.onClearAllClick = function () {
            _this.setState({
                _storyBrowserStateFilters: []
            });
        };
        _this.state = {
            _storyBrowserStateFilters: [],
            _storyBrowserStateSearchTerm: '',
            _storyBrowserStateSort: '0',
        };
        return _this;
    }
    StoryBrowser.prototype.render = function () {
        var _a = this.props, stories = _a.stories, filters = _a.filters;
        var filteredStories = this.filterStories(this.props.stories);
        var featuredStories = filteredStories.filter(function (item) { return item.Featured == "Yes"; });
        var otherStories = filteredStories.filter(function (item) { return item.Featured != "Yes"; });
        console.log(this.props.filters);
        return (React.createElement("section", { id: "storyBrowser", className: styles.storyBrowser, onClick: this.hideFilters },
            React.createElement("div", { id: "filters", className: styles.filtersContainer },
                React.createElement("div", { className: styles.filtersDropdown },
                    React.createElement("div", { onClick: this.toggleFilters, className: styles.activate },
                        "Filter your results ",
                        React.createElement(ChevronDownIcon, null)),
                    React.createElement("div", { className: styles.filters },
                        React.createElement("button", { type: "button", className: styles.uncheck, onClick: this.onClearAllClick }, "Uncheck All"),
                        React.createElement("div", { className: styles.filterOptions },
                            React.createElement("div", null,
                                React.createElement(FilterGroup, { title: 'Industry', groupName: 'Industry', filterOptions: this.props.filters.filter(function (item) { return item.Field == 'Industry'; }), onChange: this.onSubmissionTypeFilterChange, activeFilters: this.state._storyBrowserStateFilters }),
                                React.createElement(FilterGroup, { title: 'Solution Area', groupName: 'SolutionArea', filterOptions: this.props.filters.filter(function (item) { return item.Field == 'SolutionArea'; }), onChange: this.onSubmissionTypeFilterChange, activeFilters: this.state._storyBrowserStateFilters })),
                            React.createElement("div", null,
                                React.createElement(FilterGroup, { title: 'Partner Type', groupName: 'PartnerType', filterOptions: this.props.filters.filter(function (item) { return item.Field == 'PartnerType'; }), onChange: this.onSubmissionTypeFilterChange, activeFilters: this.state._storyBrowserStateFilters }),
                                React.createElement(FilterGroup, { title: 'Story Type', groupName: 'StoryType', filterOptions: this.props.filters.filter(function (item) { return item.Field == 'StoryType'; }), onChange: this.onSubmissionTypeFilterChange, activeFilters: this.state._storyBrowserStateFilters }),
                                React.createElement(FilterGroup, { title: 'Tags', groupName: 'Tags', filterOptions: this.props.filters.filter(function (item) { return item.Field == 'Tags'; }), onChange: this.onSubmissionTypeFilterChange, activeFilters: this.state._storyBrowserStateFilters }))))),
                React.createElement("div", { className: styles.filtersSearch },
                    React.createElement("input", { style: inputStyle, placeholder: "Search by partner name", type: "text", name: "namesearch", onChange: this.handleSearchChange, value: this.state._storyBrowserStateSearchTerm != '' ? this.state._storyBrowserStateSearchTerm : null }),
                    " ",
                    React.createElement(SearchIcon, null),
                    " "),
                React.createElement("div", { className: styles.sortResults },
                    React.createElement("select", { className: styles.sortBtn, value: this.state._storyBrowserStateSort, onChange: this.handleSortChange },
                        React.createElement("option", { value: "0" }, "Sort Publish Date Desc"),
                        React.createElement("option", { value: "1" }, "Sort Publish Date Asc"),
                        React.createElement("option", { value: "2" }, "Sort A-Z"),
                        React.createElement("option", { value: "3" }, "Sort Z-A")),
                    React.createElement("p", null, story.GSPUSStoryHelper._resultCount(filteredStories)))),
            this.stories(featuredStories, true),
            this.stories(otherStories)));
    };
    StoryBrowser.prototype.compareString = function (story1, story2, key) {
        if (story1[key] < story2[key])
            return -1;
        if (story1[key] > story1[key])
            return 1;
        return 0;
    };
    StoryBrowser.prototype.compareDate = function (story1, story2, key) {
        console.log('story1: ' + Date.parse(story1[key]) + ' story2: ' + Date.parse(story2[key]));
        if (Date.parse(story1[key]) > Date.parse(story2[key]))
            return 1;
        if (Date.parse(story1[key]) < Date.parse(story2[key]))
            return -1;
        return 0;
    };
    StoryBrowser.prototype.filterStories = function (stories) {
        var _this = this;
        switch (this.state._storyBrowserStateSort) {
            case '1':
                //Sort by publish date ascending
                stories = stories.sort(function (a, b) { return _this.compareDate(a, b, 'PublishDate'); });
                break;
            case '2':
                //Sort by title A-Z
                stories = stories.sort(function (a, b) { return _this.compareString(a, b, 'Title'); });
                break;
            case '3':
                //Sort by title Z-A
                stories = stories.sort(function (a, b) { return _this.compareString(b, a, 'Title'); });
                break;
            default:
                //Sort by publish date descending
                stories = stories.sort(function (b, a) { return _this.compareDate(a, b, 'PublishDate'); });
        }
        if (this.state._storyBrowserStateSearchTerm != null && this.state._storyBrowserStateSearchTerm != '') {
            var queriedStories_1 = [];
            stories.forEach(function (storyItem) {
                var pushStory = false;
                var partners = typeof (storyItem['Partner']) == "string" ? ['Partner'] : (Object)(storyItem['Partner']);
                for (var i in partners) {
                    if (partners[i].toLowerCase().indexOf((_this.state._storyBrowserStateSearchTerm).toLowerCase()) > -1) {
                        pushStory = true;
                    }
                }
                if (pushStory) {
                    queriedStories_1.push(storyItem);
                }
            });
            stories = queriedStories_1;
        }
        if (this.state._storyBrowserStateFilters.length > 0) {
            var cfilters_1 = this.state._storyBrowserStateFilters;
            var filteredStories_1 = [];
            stories.forEach(function (storyItem) {
                var pushStory = false;
                cfilters_1.forEach(function (filterItem) {
                    var filter = filterItem.split('|')[0];
                    var group = filterItem.split('|')[1];
                    var storyFilters = typeof (storyItem[group]) == "string" ? [storyItem[group]] : (Object)(storyItem[group]);
                    for (var i in storyFilters) {
                        if (filter == storyFilters[i]) {
                            pushStory = true;
                        }
                    }
                });
                if (pushStory) {
                    filteredStories_1.push(storyItem);
                }
            });
            return filteredStories_1;
        }
        return stories;
    };
    StoryBrowser.prototype.stories = function (items, featured) {
        var _this = this;
        if (featured === void 0) { featured = false; }
        if (items == null || items.length < 1) {
            return (null);
        }
        return (React.createElement("div", null, featured ? (React.createElement("div", { id: "featuredItems", className: styles.featuredItems },
            React.createElement("h4", null, "Featured"),
            React.createElement("div", { className: styles.items }, items.map(function (value, index) {
                return _this.storyCard(value);
            })))) : (React.createElement("div", { className: styles.items }, items.map(function (value, index) {
            return _this.storyCard(value);
        })))));
    };
    StoryBrowser.prototype.storyCard = function (item) {
        console.log(item.URL);
        return (React.createElement("div", { className: styles.item },
            React.createElement("img", { src: item.Image['serverRelativeUrl'], alt: "" }),
            React.createElement("a", { className: styles.itemTitle, href: item.URL + (item.Download == "Yes" ? "&download=1" : ""), target: "_blank" }, item.Title),
            React.createElement("p", { className: styles.itemDate },
                React.createElement("strong", null, story.GSPUSStoryHelper._formatDate(item.PublishDate))),
            React.createElement("p", { className: styles.itemPartner },
                React.createElement("strong", null, "PARTNER:"),
                " ",
                story.GSPUSStoryHelper._listAll(item.Partner)),
            React.createElement("p", { className: styles.itemIndustry },
                React.createElement("strong", null, "INDUSTRY:"),
                " ",
                story.GSPUSStoryHelper._listAll(item.Industry)),
            React.createElement("p", { className: styles.itemSolution },
                React.createElement("strong", null, "SOLUTION:"),
                " ",
                story.GSPUSStoryHelper._listAll(item.SolutionArea)),
            React.createElement("p", { className: styles.itemType },
                React.createElement("strong", null, "STORY TYPE:"),
                " ",
                item.StoryType),
            React.createElement("div", { className: styles.viewBtn },
                " ",
                React.createElement("a", { className: styles.viewStory, href: item.URL + (item.Download == "Yes" ? "&download=1" : ""), target: "_blank" },
                    "View Story ",
                    React.createElement(ChevronRightIcon, null)))));
    };
    StoryBrowser.prototype.toggleFilters = function (e) {
        document.getElementById("filters").classList.toggle(styles.show);
    };
    StoryBrowser.prototype.hideFilters = function (e) {
        if (document.getElementById('filters').contains(e.target)) {
            // Clicked in box
            console.log('in box');
        }
        else {
            // Clicked outside the box
            console.log('outside box');
            document.getElementById("filters").classList.remove(styles.show);
        }
    };
    return StoryBrowser;
}(React.Component));
export default StoryBrowser;
//# sourceMappingURL=StoryBrowser.js.map