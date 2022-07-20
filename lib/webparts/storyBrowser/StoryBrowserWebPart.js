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
import { PropertyPaneDropdown } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'StoryBrowserWebPartStrings';
import StoryBrowser from './components/StoryBrowser';
import { SPHttpClient } from '@microsoft/sp-http';
import { sp } from "@pnp/sp/presets/all";
var StoryBrowserWebPart = /** @class */ (function (_super) {
    __extends(StoryBrowserWebPart, _super);
    function StoryBrowserWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._filters = [];
        _this.version = '1.0.0.20';
        _this.appID = 'fd82a395-e968-65af-ba0a-36c4051fa5ca';
        _this.isInternal = false;
        return _this;
    }
    StoryBrowserWebPart.prototype.onInit = function () {
        return _super.prototype.onInit.call(this);
    };
    StoryBrowserWebPart.prototype.render = function (search) {
        var _this = this;
        if (search === void 0) { search = {
            Filters: [],
            Keyword: '',
            Sort: { Value: 0, Title: "Publish Date" }
        }; }
        //Get all Lists for configuration
        this.getLists().then(function (listResolve) {
            _this._lists = listResolve;
            //Get all groups for configuration
            _this.getGroups().then(function (groupResolve) {
                _this._groups = groupResolve;
                //Get User Permissions
                /*this._getInteralUser().then(internalPermission =>{
                  this.isInternal = internalPermission as boolean;*/
                //Get Filter Choices
                _this._getfieldChoices().then(function (fieldResponse) {
                    //Get Initial List
                    _this._getSearchData(search).then(function (response) {
                        _this._stories = response;
                        var element = React.createElement(StoryBrowser, {
                            stories: _this._stories,
                            filters: _this._filters
                        });
                        ReactDom.render(element, _this.domElement);
                    });
                });
                return true;
                //});
            });
        });
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
                                PropertyPaneDropdown('ListGUID', {
                                    label: 'List Name',
                                    options: this._lists,
                                    selectedKey: this.properties.ListGUID
                                }) /*,
                                PropertyPaneDropdown('GroupID', {
                                  label:'Internal Group Name',
                                  options: this._groups,
                                  selectedKey: this.properties.GroupID
                                })*/
                            ]
                        }
                    ]
                }
            ]
        };
    };
    StoryBrowserWebPart.prototype.getLists = function () {
        sp.setup({
            spfxContext: this.context,
            sp: {
                headers: {
                    "UserAgent": "NONISV|Microsoft|" + this.appID + "/" + this.version,
                    "X-ClientTag": "NONISV|Microsoft|" + this.appID + "/" + this.version
                }
            }
        });
        return new Promise(function (resolve) {
            sp.web.lists.get().then(function (result) {
                var options = [];
                result.forEach(function (item) {
                    var option = {
                        key: item.Id,
                        text: item.Title
                    };
                    options.push(option);
                });
                resolve(options);
            });
        });
    };
    StoryBrowserWebPart.prototype.getGroups = function () {
        sp.setup({
            spfxContext: this.context,
            sp: {
                headers: {
                    "UserAgent": "NONISV|Microsoft|" + this.appID + "/" + this.version,
                    "X-ClientTag": "NONISV|Microsoft|" + this.appID + "/" + this.version
                }
            }
        });
        return new Promise(function (resolve) {
            sp.web.siteGroups.get().then(function (result) {
                var options = [];
                result.forEach(function (item) {
                    var option = {
                        key: item.Id,
                        text: item.Title
                    };
                    options.push(option);
                });
                resolve(options);
            });
        });
    };
    StoryBrowserWebPart.prototype._getfieldChoices = function () {
        var _this = this;
        sp.setup({
            spfxContext: this.context,
            sp: {
                headers: {
                    "UserAgent": "NONISV|Microsoft|" + this.appID + "/" + this.version,
                    "X-ClientTag": "NONISV|Microsoft|" + this.appID + "/" + this.version
                }
            }
        });
        return new Promise(function (resolve) {
            var list = sp.web.lists.getById(_this.properties.ListGUID);
            var tags = list.fields.getByInternalNameOrTitle('Tags');
            tags.select('Choices').get().then(function (tgoptions) {
                tgoptions['Choices'].forEach(function (item) {
                    _this._filters.push({
                        Field: 'Tags',
                        Value: item,
                        IsChecked: true
                    });
                });
                var industry = list.fields.getByInternalNameOrTitle('Industry');
                industry.select('Choices').get().then(function (idoptions) {
                    idoptions['Choices'].forEach(function (item) {
                        _this._filters.push({
                            Field: 'Industry',
                            Value: item,
                            IsChecked: true
                        });
                    });
                    var partnerType = list.fields.getByInternalNameOrTitle('PartnerType');
                    partnerType.select('Choices').get().then(function (ptoptions) {
                        ptoptions['Choices'].forEach(function (item) {
                            _this._filters.push({
                                Field: 'PartnerType',
                                Value: item,
                                IsChecked: true
                            });
                        });
                        var solutionArea = list.fields.getByInternalNameOrTitle('SolutionArea');
                        solutionArea.select('Choices').get().then(function (saoptions) {
                            saoptions['Choices'].forEach(function (item) {
                                _this._filters.push({
                                    Field: 'SolutionArea',
                                    Value: item,
                                    IsChecked: true
                                });
                            });
                            var storyType = list.fields.getByInternalNameOrTitle('StoryType');
                            storyType.select('Choices').get().then(function (stoptions) {
                                stoptions['Choices'].forEach(function (item) {
                                    _this._filters.push({
                                        Field: 'StoryType',
                                        Value: item,
                                        IsChecked: true
                                    });
                                });
                                var linkType = list.fields.getByInternalNameOrTitle('LinkType');
                                linkType.select('Choices').get().then(function (ltoptions) {
                                    ltoptions['Choices'].forEach(function (item) {
                                        _this._filters.push({
                                            Field: 'LinkType',
                                            Value: item,
                                            IsChecked: true
                                        });
                                    });
                                    resolve(true);
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    StoryBrowserWebPart.prototype._getSearchData = function (search) {
        var _this = this;
        sp.setup({
            spfxContext: this.context
        });
        var searchURI = '?InplaceSearchQuery=' + encodeURIComponent(search.Keyword != null ? search.Keyword : '');
        var sortURI = '&SortField=PublishDate&SortDir=Desc';
        var filterURI = '&FilterField1=Hide&FilterValue1=0';
        /*if(search.Sort != null && search.Sort.Value == 1){
          sortURI = '&SortField=Title&SortDir=Asc';
        }*/
        return new Promise(function (resolve) {
            var restAPI = _this.context.pageContext.web.absoluteUrl + "/_api/web/lists(guid'" + _this.properties.ListGUID + "')/RenderListDataAsStream" + searchURI + sortURI + filterURI;
            return _this.context.spHttpClient.post(restAPI, SPHttpClient.configurations.v1, {
                body: JSON.stringify({
                    parameters: {
                        ViewXml: "\n              <View>\n                <Query>\n                  <Where>\n                      <Leq>\n                        <FieldRef Name='PublishDate' />\n                        <Value IncludeTimeValue='False' Type='DateTime'><Today /></Value>\n                      </Leq>\n                  </Where>\n                </Query>\n                <RowLimit Paged=\"TRUE\">5000</RowLimit>\n              </View>\n            "
                    }
                }),
                headers: {
                    "UserAgent": "NONISV|Microsoft|" + _this.appID + "/" + _this.version,
                    "X-ClientTag": "NONISV|Microsoft|" + _this.appID + "/" + _this.version
                }
            })
                .then(function (response) {
                response.json().then(function (items) {
                    var filteredResults = items.Row;
                    /*if(!this.isInternal){
                      //USER DOES NOT HAVE PERMISSION TO VIEW INTERNAL STORIES
                      console.log(items)
                      filteredResults = filteredResults.filter(item => item['StoryType'] == 'External Case Study');
                    }*/
                    resolve(JSON.parse(JSON.stringify(filteredResults)));
                });
            });
        });
    };
    StoryBrowserWebPart.prototype._getInteralUser = function () {
        var _this = this;
        var opts = {
            headers: {
                "UserAgent": "NONISV|Microsoft|" + this.appID + "/" + this.version,
                "X-ClientTag": "NONISV|Microsoft|" + this.appID + "/" + this.version
            }
        };
        return new Promise(function (resolve) {
            _this.context.spHttpClient.get(_this.context.pageContext.web.absoluteUrl + "/_api/web/currentuser/groups", SPHttpClient.configurations.v1, opts)
                .then(function (groupResponse) {
                groupResponse.json().then(function (groupsData) {
                    var groups = groupsData.value;
                    var internal = false;
                    groups.forEach(function (group) {
                        if (group.Id == _this.properties.GroupID) {
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