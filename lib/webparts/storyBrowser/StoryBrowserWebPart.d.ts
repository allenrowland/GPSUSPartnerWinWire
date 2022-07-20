import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as wwfilters from '../Filters';
export interface IStoryBrowserWebPartProps {
    description: string;
    ListGUID: string;
    GroupID: string;
}
export default class StoryBrowserWebPart extends BaseClientSideWebPart<IStoryBrowserWebPartProps> {
    private _stories;
    private _filters;
    private _lists;
    private _groups;
    private version;
    private appID;
    protected onInit(): Promise<void>;
    render(search?: wwfilters.Search): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private getLists;
    private getGroups;
    private isInternal;
    private _getfieldChoices;
    private _getSearchData;
    private _getInteralUser;
}
//# sourceMappingURL=StoryBrowserWebPart.d.ts.map