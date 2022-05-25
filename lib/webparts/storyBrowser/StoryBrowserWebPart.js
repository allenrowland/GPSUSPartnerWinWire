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
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneButton, PropertyPaneButtonType, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'StoryBrowserWebPartStrings';
import StoryBrowser from './components/StoryBrowser';
import { SPHttpClient } from '@microsoft/sp-http';
import { sp } from "@pnp/sp/presets/all";
var StoryBrowserWebPart = /** @class */ (function (_super) {
    __extends(StoryBrowserWebPart, _super);
    function StoryBrowserWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isInternal = false;
        return _this;
    }
    StoryBrowserWebPart.prototype.onInit = function () {
        return _super.prototype.onInit.call(this);
    };
    StoryBrowserWebPart.prototype.render = function () {
        var _this = this;
        //Get User Permissions
        this._getInteralUser().then(function (internalPermission) {
            _this.isInternal = internalPermission;
            console.log('hi');
            //Get Filter Choices
            _this._getfieldChoices().then(function (fieldResponse) {
                console.log(_this._industryFilters);
                //Get Initial List
                _this._getSearchData().then(function (response) {
                    console.log('hi2');
                    _this._stories = response;
                    var element = React.createElement(StoryBrowser, {
                        stories: _this._stories,
                        tagsFilters: _this._tagsFilters,
                        industryFilters: _this._industryFilters,
                        partnerTypeFilters: _this._partnerTypeFilters,
                        solutionAreaFilters: _this._solutionAreaFilters,
                        storyTypeFilters: _this._storyTypeFilters
                    });
                    ReactDom.render(element, _this.domElement);
                });
            });
            return true;
        })
            .catch(function (err) { return console.log('There was an error:' + err); });
    };
    StoryBrowserWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(StoryBrowserWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    StoryBrowserWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneButton('ClickHere', {
                                    text: "ClickHere",
                                    buttonType: PropertyPaneButtonType.Normal,
                                    onClick: this.onPropertyPaneFieldChanged.bind(this)
                                }),
                                PropertyPaneTextField('ListGUID', {
                                    label: 'List ID (GUID)',
                                    value: strings.ListGUID,
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    StoryBrowserWebPart.prototype.onPropertyPaneFieldChanged = function (propertyPath, oldValue, newValue) {
        if (propertyPath === 'ListGUID' && newValue) {
            // push new list value
            _super.prototype.onPropertyPaneFieldChanged.call(this, propertyPath, oldValue, newValue);
            // refresh the item selector control by repainting the property pane
            this.context.propertyPane.refresh();
            // re-render the web part as clearing the loading indicator removes the web part body
            this.render();
        }
        else {
            _super.prototype.onPropertyPaneFieldChanged.call(this, propertyPath, oldValue, oldValue);
        }
    };
    StoryBrowserWebPart.prototype._getfieldChoices = function () {
        var _this = this;
        sp.setup({
            spfxContext: this.context
        });
        return new Promise(function (resolve) {
            var list = sp.web.lists.getById(_this.properties.ListGUID);
            var tags = list.fields.getByInternalNameOrTitle('Tags');
            tags.select('Choices').get().then(function (tgoptions) {
                _this._tagsFilters = tgoptions['Choices'];
                var industry = list.fields.getByInternalNameOrTitle('Industry');
                industry.select('Choices').get().then(function (idoptions) {
                    _this._industryFilters = idoptions['Choices'];
                    var partnerType = list.fields.getByInternalNameOrTitle('PartnerType');
                    partnerType.select('Choices').get().then(function (ptoptions) {
                        _this._partnerTypeFilters = ptoptions['Choices'];
                        var solutionArea = list.fields.getByInternalNameOrTitle('SolutionArea');
                        solutionArea.select('Choices').get().then(function (saoptions) {
                            _this._solutionAreaFilters = saoptions['Choices'];
                            var storyType = list.fields.getByInternalNameOrTitle('StoryType');
                            storyType.select('Choices').get().then(function (stoptions) {
                                _this._storyTypeFilters = stoptions['Choices'];
                                resolve(true);
                            });
                        });
                    });
                });
            });
        });
    };
    StoryBrowserWebPart.prototype._getSearchData = function (Industry) {
        var _this = this;
        if (Industry === void 0) { Industry = ""; }
        sp.setup({
            spfxContext: this.context
        });
        return new Promise(function (resolve) {
            sp.web.lists.getById(_this.properties.ListGUID).renderListDataAsStream({
                ViewXml: "\n              <View>\n                <RowLimit Paged=\"TRUE\">5000</RowLimit>\n              </View>",
            }).then(function (items) {
                var filteredResults = items.Row;
                if (!_this.isInternal) {
                    //USER DOES NOT HAVE PERMISSION TO VIEW INTERNAL STORIES        
                    filteredResults = filteredResults.filter(function (item) { return item['StoryType'] == 'External Case Study'; });
                }
                resolve(JSON.parse(JSON.stringify(filteredResults)));
            });
        });
    };
    StoryBrowserWebPart.prototype._getInteralUser = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.context.spHttpClient.get(_this.context.pageContext.web.absoluteUrl + "/_api/web/currentuser/groups", SPHttpClient.configurations.v1)
                .then(function (groupResponse) {
                groupResponse.json().then(function (groupsData) {
                    var groups = groupsData.value;
                    var internal = false;
                    groups.forEach(function (group) {
                        if (group.Title == "Internal Users") {
                            internal = true;
                        }
                    });
                    resolve(internal);
                });
            });
        });
    };
    return StoryBrowserWebPart;
}(BaseClientSideWebPart));
export default StoryBrowserWebPart;
//# sourceMappingURL=StoryBrowserWebPart.js.map