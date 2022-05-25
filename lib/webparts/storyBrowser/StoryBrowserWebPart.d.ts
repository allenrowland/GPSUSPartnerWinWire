import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IStoryBrowserWebPartProps {
    description: string;
}
export default class StoryBrowserWebPart extends BaseClientSideWebPart<IStoryBrowserWebPartProps> {
    private _stories;
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private isInternal;
    private _getSearchData;
    private _setInteralUserAsync;
}
//# sourceMappingURL=StoryBrowserWebPart.d.ts.map