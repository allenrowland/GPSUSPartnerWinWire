declare interface IStoryBrowserWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'StoryBrowserWebPartStrings' {
  const strings: IStoryBrowserWebPartStrings;
  export = strings;
}
