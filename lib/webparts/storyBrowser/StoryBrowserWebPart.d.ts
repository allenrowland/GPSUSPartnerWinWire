import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IStoryBrowserWebPartProps {
    description: string;
    ListGUID: string;
}
export default class StoryBrowserWebPart extends BaseClientSideWebPart<IStoryBrowserWebPartProps> {
    private _stories;
    private _tagsFilters;
    private _industryFilters;
    private _partnerTypeFilters;
    private _solutionAreaFilters;
    private _storyTypeFilters;
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void;
    private isInternal;
    private _getfieldChoices;
    private _getSearchData;
    private _getInteralUser;
}
//# sourceMappingURL=StoryBrowserWebPart.d.ts.map