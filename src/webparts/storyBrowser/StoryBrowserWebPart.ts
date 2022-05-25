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
import * as story from '../Story';
import * as wwfilters from '../Filters';

import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
import { filteredAssign } from 'office-ui-fabric-react';
import { filter } from 'lodash';

export interface IStoryBrowserWebPartProps {
  description: string;
}

import { sp } from "@pnp/sp/presets/all";  
import { useControlledState } from 'office-ui-fabric-react/lib/Foundation';

export default class StoryBrowserWebPart extends BaseClientSideWebPart<IStoryBrowserWebPartProps> {

  private _stories: story.Story[];

  protected onInit(): Promise<void> {

    return super.onInit();
  }

  public render(): void {
    this._setInteralUserAsync();
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

  private _setfieldChoices(){
    sp.setup({
      spfxContext: this.context
    });    

    let list = sp.web.lists.getById('f5b9c35f-13e1-4444-bb9a-5a5556159c16');
    
    let tags = list.fields.getByInternalNameOrTitle('Tags');
    tags.select('Choices').get().then((options) => {  
      //RENDER FILTERS
      console.log(options['Choices']); 
    });
    
    let industry = list.fields.getByInternalNameOrTitle('Industry');
    industry.select('Choices').get().then((options) => {  
      //RENDER FILTERS
      console.log(options['Choices']); 
    });
    
    let partnerType = list.fields.getByInternalNameOrTitle('PartnerType');
    partnerType.select('Choices').get().then((options) => {  
      //RENDER FILTERS
      console.log(options['Choices']); 
    });
    
    let solutionArea = list.fields.getByInternalNameOrTitle('SolutionArea');
    solutionArea.select('Choices').get().then((options) => {  
      //RENDER FILTERS
      console.log(options['Choices']); 
    });
    
    let storyType = list.fields.getByInternalNameOrTitle('StoryType');
    storyType.select('Choices').get().then((options) => {  
      //RENDER FILTERS
      console.log(options['Choices']); 
    });

  }

  
  private async _getSearchData(Industry: string = ""): Promise<story.Story[]>
  {
    sp.setup({
      spfxContext: this.context
    });

    this._setfieldChoices();

    return sp.web.lists.getById('f5b9c35f-13e1-4444-bb9a-5a5556159c16').renderListDataAsStream(
      {
        ViewXml: `
            <View>
              <RowLimit Paged="TRUE">5000</RowLimit>
            </View>`,
      }).then(items => {
        
        let filteredResults = items.Row;
        if(!this.isInternal){  
          //USER DOES NOT HAVE PERMISSION TO VIEW INTERNAL STORIES        
          filteredResults = filteredResults.filter(item => item['StoryType'] == 'External Case Study');
        }
        return JSON.parse(JSON.stringify(filteredResults));

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

            this._getSearchData().then(response => {
              this._stories = response;
              
              const element: React.ReactElement<IStoryBrowserProps> = React.createElement(StoryBrowser, {
                stories: this._stories
              });
              ReactDom.render(element, this.domElement);
            });
         });
     });
 }


}
