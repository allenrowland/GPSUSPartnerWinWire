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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'StoryBrowserWebPartStrings';
import StoryBrowser from './components/StoryBrowser';
import * as story from './Story';
import { SPHttpClient } from '@microsoft/sp-http';
var StoryBrowserWebPart = /** @class */ (function (_super) {
    __extends(StoryBrowserWebPart, _super);
    function StoryBrowserWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = '';
        _this.isInternal = false;
        return _this;
    }
    StoryBrowserWebPart.prototype.onInit = function () {
        this._environmentMessage = this._getEnvironmentMessage();
        return _super.prototype.onInit.call(this);
    };
    StoryBrowserWebPart.prototype.render = function () {
        var element = React.createElement(StoryBrowser, {
            description: this.properties.description,
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            userDisplayName: this.context.pageContext.user.displayName
        });
        ReactDom.render(element, this.domElement);
    };
    StoryBrowserWebPart.prototype._getEnvironmentMessage = function () {
        if (!!this.context.sdks.microsoftTeams) { // running in Teams
            return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
        }
        return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
    };
    StoryBrowserWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
        this.domElement.style.setProperty('--link', semanticColors.link);
        this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);
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
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    StoryBrowserWebPart.prototype._getSearchData = function () {
        var options = "?FilterField1=StoryType&FilterValue1=External%20Case%20Study";
        if (this.isInternal) {
            options = "";
        }
        var restAPI = this.context.pageContext.web.absoluteUrl + "/_api/web/lists(guid'f5b9c35f-13e1-4444-bb9a-5a5556159c16')/RenderListDataAsStream" + options;
        console.log(restAPI);
        return this.context.spHttpClient.post(restAPI, SPHttpClient.configurations.v1, {
            body: JSON.stringify({
                parameters: {
                    ViewXml: "\n            <View>\n              <RowLimit Paged=\"TRUE\">5000</RowLimit>\n            </View>\n          "
                }
            })
        })
            .then(function (response) {
            return response.json();
        });
    };
    StoryBrowserWebPart.prototype._renderSearchListAsync = function () {
        var _this = this;
        this._getSearchData()
            .then(function (response) {
            _this._renderSearchList(response['Row']);
        });
    };
    StoryBrowserWebPart.prototype._setInteralUserAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/currentuser/groups", SPHttpClient.configurations.v1)
                    .then(function (groupResponse) {
                    groupResponse.json().then(function (groupsData) {
                        var groups = groupsData.value;
                        groups.forEach(function (group) {
                            if (group.Title == "Internal Users") {
                                _this.isInternal = true;
                            }
                        });
                        _this._renderSearchListAsync();
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    StoryBrowserWebPart.prototype._renderSearchList = function (items) {
        var _this = this;
        var html = '<table border=2 width=100% style="font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;">';
        html += "<div>\n" + story.GSPUSHelper._resultCount(items) + "<br />\n";
        items.forEach(function (item) {
            html += "\n   <img src=" + (_this.context.pageContext.web.absoluteUrl + item.Image['serverRelativeUrl']) + " width=\"100\" /><br />\n   <a href=\"" + item.URL + "\">" + item.Title + "</a><br />\n   <!--" + item.Description + "<br />-->\n   " + story.GSPUSHelper._formatDate(item.PublishDate) + "<br />\n   <!--" + story.GSPUSHelper._listAll(item.LinkType, '/') + "<br />-->\n   " + story.GSPUSHelper._listAll(item.Partner, '/') + "<br />\n   " + story.GSPUSHelper._listAll(item.Industry, '/') + "<br />\n   " + story.GSPUSHelper._listAll(item.SolutionArea, '/') + "<br />\n   <!--" + story.GSPUSHelper._listAll(item.PartnerType, '/') + "<br />-->\n   " + item.StoryType + "<br />\n   <!--" + story.GSPUSHelper._listAll(item.Tags, '/') + "<br />-->\n   <a href=\"" + item.URL + "\">View Story &gt;</a><br />\n      ";
        });
        /*html += '</div>';
        const listContainer: Element = ReactDOM.('#BindspListItems');
        listContainer.innerHTML = html;
        }*/
    };
    return StoryBrowserWebPart;
}(BaseClientSideWebPart));
export default StoryBrowserWebPart;
//# sourceMappingURL=StoryBrowserWebPart.js.map