import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'StoryBrowserWebPartStrings';
import StoryBrowser from './components/StoryBrowser';
import { IStoryBrowserProps } from './components/IStoryBrowserProps';
import * as story from './Story';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';

export interface IStoryBrowserWebPartProps {
  description: string;
}

export default class StoryBrowserWebPart extends BaseClientSideWebPart<IStoryBrowserWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IStoryBrowserProps> = React.createElement(
      StoryBrowser,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
  private isInternal :boolean = false;

  
  private _getSearchData(): Promise<story.Story>
  {

    let options :string = "?FilterField1=StoryType&FilterValue1=External%20Case%20Study";
    if(this.isInternal){
      options = "";
    }
    const restAPI = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists(guid'f5b9c35f-13e1-4444-bb9a-5a5556159c16')/RenderListDataAsStream${options}`;
    console.log(restAPI);
    
    return this.context.spHttpClient.post(restAPI, SPHttpClient.configurations.v1, {
      body: JSON.stringify({
        parameters: {          
          ViewXml: `
            <View>
              <RowLimit Paged="TRUE">5000</RowLimit>
            </View>
          `
        }
      })
    })
    .then((response: SPHttpClientResponse) => 
       {
       return response.json();
       });
  }
  private _renderSearchListAsync(): void
  {
       
    this._getSearchData()
      .then((response) => {
        this._renderSearchList(response['Row']);
      });
}

  private async _setInteralUserAsync() :Promise<void>
{
   this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/currentuser/groups",
         SPHttpClient.configurations.v1)
     .then((groupResponse: SPHttpClientResponse) => {
         groupResponse.json().then((groupsData: any) => {
             var groups = groupsData.value;

             groups.forEach(group => {
                 if (group.Title == "Internal Users") {
                     this.isInternal = true;
                 }
             });
         
             this._renderSearchListAsync();
             
         });
     });
 }


private _renderSearchList(items: story.Story[]): void 
{
let html: string = '<table border=2 width=100% style="font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;">';

html += `<div>
${story.GSPUSHelper._resultCount(items)}<br />
`;

items.forEach((item: story.Story) => {
  html += `
   <img src=${this.context.pageContext.web.absoluteUrl + item.Image['serverRelativeUrl']} width="100" /><br />
   <a href="${item.URL}">${item.Title}</a><br />
   <!--${item.Description}<br />-->
   ${story.GSPUSHelper._formatDate(item.PublishDate)}<br />
   <!--${story.GSPUSHelper._listAll(item.LinkType, '/')}<br />-->
   ${story.GSPUSHelper._listAll(item.Partner, '/')}<br />
   ${story.GSPUSHelper._listAll(item.Industry, '/')}<br />
   ${story.GSPUSHelper._listAll(item.SolutionArea, '/')}<br />
   <!--${story.GSPUSHelper._listAll(item.PartnerType, '/')}<br />-->
   ${item.StoryType}<br />
   <!--${story.GSPUSHelper._listAll(item.Tags, '/')}<br />-->
   <a href="${item.URL}">View Story &gt;</a><br />
      `;
});

/*html += '</div>';
const listContainer: Element = ReactDOM.('#BindspListItems');
listContainer.innerHTML = html;
}*/
}


}
