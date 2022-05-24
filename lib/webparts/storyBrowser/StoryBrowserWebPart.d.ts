import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IStoryBrowserWebPartProps {
    description: string;
}
export default class StoryBrowserWebPart extends BaseClientSideWebPart<IStoryBrowserWebPartProps> {
    private _isDarkTheme;
    private _environmentMessage;
    protected onInit(): Promise<void>;
    render(): void;
    private _getEnvironmentMessage;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private isInternal;
    private _getSearchData;
    private _renderSearchListAsync;
    private _setInteralUserAsync;
    private _renderSearchList;
}
//# sourceMappingURL=StoryBrowserWebPart.d.ts.map